from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256
import sqlite3
import numpy as np
import pandas as pd
import pickle
import os
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key-here'  # Change this in production!
jwt = JWTManager(app)

# Define the absolute path to users.db
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, 'users.db')

def init_db():
    with sqlite3.connect(DATABASE_PATH) as conn:
        c = conn.cursor()
        # Create users table
        c.execute('''CREATE TABLE IF NOT EXISTS users 
                     (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)''')
        # Create predictions table with sex field
        c.execute('''CREATE TABLE IF NOT EXISTS predictions 
                     (id INTEGER PRIMARY KEY, user_id INTEGER, prediction TEXT, 
                      glucose REAL, blood_pressure REAL, risk_percentage REAL, 
                      diet_suggestion TEXT, sex TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                      FOREIGN KEY(user_id) REFERENCES users(id))''')
        conn.commit()

init_db()

MODEL_PATH = 'model.pkl'

# Load and prepare data once
data = pd.read_csv('diabetes.csv')
X = data.drop('Outcome', axis=1)
y = data['Outcome']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

if not os.path.exists(MODEL_PATH):
    print("Training new model...")
    model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained. Test accuracy: {accuracy:.2f}")
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
else:
    model = pickle.load(open(MODEL_PATH, 'rb'))
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model loaded from {MODEL_PATH}. Test accuracy: {accuracy:.2f}")

# Load the model accuracy
try:
    with open("model_accuracy.txt", "r") as f:
        model_accuracy = float(f.read()) * 100  # Convert to percentage
except FileNotFoundError:
    model_accuracy = None

@app.route('/')
def home():
    return "Diabetes Prediction Backend"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400
    
    hashed_password = pbkdf2_sha256.hash(password)
    
    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            c = conn.cursor()
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            user_id = c.lastrowid
            conn.commit()
        # Convert user_id to string for JWT identity
        access_token = create_access_token(identity=str(user_id))
        return jsonify({'message': 'User registered successfully', 'token': access_token}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username already exists'}), 409

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    with sqlite3.connect(DATABASE_PATH) as conn:
        c = conn.cursor()
        c.execute("SELECT id, password FROM users WHERE username = ?", (username,))
        user = c.fetchone()
    
    if user and pbkdf2_sha256.verify(password, user[1]):
        # Convert user_id to string for JWT identity
        access_token = create_access_token(identity=str(user[0]))
        return jsonify({'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
@jwt_required(optional=True)  # Token is optional for prediction, required for saving to history
def predict():
    try:
        # Validate form data
        required_fields = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Sex'
        ]
        data = request.form
        print(f"Received form data: {dict(data)}")  # Debug log
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'message': f'Missing or empty field: {field}'}), 400

        # Convert form data to floats
        try:
            input_data = [
                float(data['Pregnancies']),
                float(data['Glucose']),
                float(data['BloodPressure']),
                float(data['SkinThickness']),
                float(data['Insulin']),
                float(data['BMI']),
                float(data['DiabetesPedigreeFunction']),
                float(data['Age'])
            ]
        except ValueError as e:
            return jsonify({'message': f'Invalid numeric value: {str(e)}'}), 400

        # Make prediction with probabilities
        input_array = np.asarray(input_data).reshape(1, -1)
        prob = model.predict_proba(input_array)[0][1]  # Probability of being diabetic (class 1)
        print(f"Prediction probability: {prob}")  # Debug log
        
        # Define thresholds for prediction
        if prob < 0.4:
            result = 'Not Diabetic'
            diet_suggestion = 'Continue with a balanced diet rich in vegetables and whole grains.'
        elif prob >= 0.4 and prob <= 0.6:
            result = 'Borderline Risk'
            diet_suggestion = 'You are at risk of developing diabetes. Reduce sugar and carb intake, increase physical activity, and monitor your health regularly.'
        else:  # prob > 0.6
            result = 'Diabetic'
            diet_suggestion = 'Adopt a low-sugar, low-carb diet and consult a doctor for monitoring.'
        
        # Use the prediction probability as the risk percentage (scaled to 0-100)
        risk_percentage = prob * 100  # Convert probability to percentage
        
        # Extract other fields
        glucose = float(data['Glucose'])
        blood_pressure = float(data['BloodPressure'])
        sex = data['Sex']
        
        # Attempt to save to history if user is authenticated
        user_id = None
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        print(f"Received token: {token}")  # Debug log
        try:
            user_id = get_jwt_identity()
            print(f"User ID: {user_id}")  # Debug log
        except Exception as e:
            print(f"Error getting user_id: {e}")  # Debug log
        
        if user_id:
            try:
                with sqlite3.connect(DATABASE_PATH) as conn:
                    c = conn.cursor()
                    c.execute(
                        "INSERT INTO predictions (user_id, prediction, glucose, blood_pressure, risk_percentage, diet_suggestion, sex) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        (int(user_id), result, glucose, blood_pressure, risk_percentage, diet_suggestion, sex)
                    )
                    conn.commit()
                    print(f"Prediction saved for user_id: {user_id}")  # Debug log
            except Exception as e:
                print(f"Error saving prediction to database: {e}")  # Debug log
                # Don't fail the prediction if database save fails
        
        return jsonify({
            'prediction': result,
            'glucose': glucose,
            'blood_pressure': blood_pressure,
            'risk_percentage': risk_percentage,
            'diet_suggestion': diet_suggestion,
            'probability': prob  # Included for debugging
        })
    except Exception as e:
        print(f"Error in predict endpoint: {e}")  # Debug log
        return jsonify({'message': f'Prediction failed: {str(e)}'}), 500

@app.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    print(f"Fetching history for user_id: {user_id}")  # Debug log
    with sqlite3.connect(DATABASE_PATH) as conn:
        c = conn.cursor()
        c.execute(
            "SELECT prediction, glucose, blood_pressure, risk_percentage, diet_suggestion, timestamp FROM predictions WHERE user_id = ? ORDER BY timestamp DESC",
            (int(user_id),)  # Convert user_id back to int for database query
        )
        history = [
            {
                'prediction': row[0],
                'glucose': row[1],
                'blood_pressure': row[2],
                'risk_percentage': row[3],
                'diet_suggestion': row[4],
                'timestamp': row[5]
            } for row in c.fetchall()
        ]
        print(f"History fetched: {history}")  # Debug log
    return jsonify({'history': history}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.form
    age = float(data['Age'])
    height = float(data['Height'])  # Already in meters
    weight = float(data['Weight'])
    sex = data['Sex']
    activity_level = data['ActivityLevel']
    goal = data['Goal']
    diabetic = data['Diabetic'].lower() == 'true'

    # Calculate BMI
    bmi = weight / (height * height)

    # Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    if sex == "Male":
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161

    # Adjust for activity level
    activity_multipliers = {"Low": 1.2, "Moderate": 1.55, "High": 1.9}
    tdee = bmr * activity_multipliers[activity_level]

    # Adjust for goal
    goal_adjustments = {"Cutting": -300, "Standard": 0, "Bulking": 300}
    target_calories = tdee + goal_adjustments[goal]

    # Adjust nutrition for diabetic status
    if diabetic:
        # Lower carbs for diabetic patients
        carbs = (target_calories * 0.4) / 4  # 40% of calories from carbs
        protein = (target_calories * 0.3) / 4  # 30% from protein
        fat = (target_calories * 0.3) / 9  # 30% from fat
    else:
        # Standard macro split
        carbs = (target_calories * 0.5) / 4  # 50% of calories from carbs
        protein = (target_calories * 0.25) / 4  # 25% from protein
        fat = (target_calories * 0.25) / 9  # 25% from fat

    return jsonify({
        "bmi": round(bmi, 2),
        "tdee": round(tdee, 2),
        "nutrition": {
            "energy": round(target_calories, 2),
            "carbs": round(carbs, 2),
            "protein": round(protein, 2),
            "fat": round(fat, 2),
        }
    })

@app.route('/model_accuracy', methods=['GET'])
def get_model_accuracy():
    if model_accuracy is None:
        return jsonify({"error": "Model accuracy not available"}), 500
    return jsonify({"accuracy": f"{model_accuracy:.2f}%"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)