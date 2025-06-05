
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256
import sqlite3
import numpy as np
import pandas as pd
import joblib
import os
from nutrition_recommendation import DiabetesNutritionAdvisor

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
        c.execute('''CREATE TABLE IF NOT EXISTS users 
                     (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)''')
        c.execute('''CREATE TABLE IF NOT EXISTS predictions 
                     (id INTEGER PRIMARY KEY, user_id INTEGER, prediction TEXT, 
                      glucose REAL, blood_pressure REAL, risk_percentage REAL, 
                      diet_suggestion TEXT, sex TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                      FOREIGN KEY(user_id) REFERENCES users(id))''')
        conn.commit()

init_db()

MODEL_PATH = 'rmodel.pkl'

if not os.path.exists(MODEL_PATH):
    print("Model file not found. Please train and save the model first.")
    model = None
else:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded from {MODEL_PATH}")

if model:
    sample_input = np.array([[2, 120, 70, 20, 85, 32.5, 0.5, 25]])
    prediction = model.predict(sample_input)
    result = "Diabetic" if prediction[0] == 1 else "Non-Diabetic"
    print(f"Sample prediction: {prediction[0]} => {result}")

try:
    with open("model_accuracy.txt", "r") as f:
        model_accuracy = float(f.read()) * 100
except FileNotFoundError:
    model_accuracy = None


# CSV prediction endpoint for doctors
@app.route('/predict_csv', methods=['POST'])
def predict_csv():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        df = pd.read_csv(file)
        required_cols = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Name'
        ]

        if not all(col in df.columns for col in required_cols):
            return jsonify({'error': 'Missing required columns'}), 400

        names = df['Name'].tolist()
        X = df.drop(columns=['Name'])
        preds = model.predict(X)
        probs = model.predict_proba(X)

        result = []
        for name, pred, prob in zip(names, preds, probs):
            label = (
                "Diabetic" if pred == 1 else
                "Borderline Risk" if prob[1] > 0.35 else
                "Non-Diabetic"
            )
            result.append({
                'name': name,
                'prediction': label,
                'risk_percentage': prob[1] * 100
            })

        return jsonify({'predictions': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


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
        access_token = create_access_token(identity=str(user[0]))
        return jsonify({'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
@jwt_required(optional=True)
def predict():
    try:
        required_fields = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]

        data = request.form
        print(f"Received form data: {dict(data)}")
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'message': f'Missing or empty field: {field}'}), 400

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

        input_array = np.asarray(input_data).reshape(1, -1)
        prob = model.predict_proba(input_array)[0][1]
        print(f"Prediction probability: {prob}")
        
        if prob < 0.4:
            result = 'Not Diabetic'
            diet_suggestion = 'Continue with a balanced diet rich in vegetables and whole grains.'
        elif prob >= 0.4 and prob <= 0.6:
            result = 'Borderline Risk'
            diet_suggestion = 'You are at risk of developing diabetes. Reduce sugar and carb intake, increase physical activity, and monitor your health regularly.'
        else:
            result = 'Diabetic'
            diet_suggestion = 'Adopt a low-sugar, low-carb diet and consult a doctor for monitoring.'
        
        risk_percentage = prob * 100
        glucose = float(data['Glucose'])
        blood_pressure = float(data['BloodPressure'])
        sex = data['Sex']
        
        user_id = None
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        print(f"Received token: {token}")
        try:
            user_id = get_jwt_identity()
            print(f"User ID: {user_id}")
        except Exception as e:
            print(f"Error getting user_id: {e}")
        
        if user_id:
            try:
                with sqlite3.connect(DATABASE_PATH) as conn:
                    c = conn.cursor()
                    c.execute(
                        "INSERT INTO predictions (user_id, prediction, glucose, blood_pressure, risk_percentage, diet_suggestion, sex) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        (int(user_id), result, glucose, blood_pressure, risk_percentage, diet_suggestion, sex)
                    )
                    conn.commit()
                    print(f"Prediction saved for user_id: {user_id}")
            except Exception as e:
                print(f"Error saving prediction to database: {e}")
        
        return jsonify({
            'prediction': result,
            'glucose': glucose,
            'blood_pressure': blood_pressure,
            'risk_percentage': risk_percentage,
            'diet_suggestion': diet_suggestion,
            'probability': prob
        })
    except Exception as e:
        print(f"Error in predict endpoint: {e}")
        return jsonify({'message': f'Prediction failed: {str(e)}'}), 500

@app.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    print(f"Fetching history for user_id: {user_id}")
    with sqlite3.connect(DATABASE_PATH) as conn:
        c = conn.cursor()
        c.execute(
            "SELECT prediction, glucose, blood_pressure, risk_percentage, diet_suggestion, timestamp FROM predictions WHERE user_id = ? ORDER BY timestamp DESC",
            (int(user_id),)
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
        print(f"History fetched: {history}")
    return jsonify({'history': history}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.form
        age = float(data['Age'])
        height = float(data['Height'])
        weight = float(data['Weight'])
        sex = data['Sex']
        activity_level = data['ActivityLevel']
        goal = data['Goal']
        diabetic = data['Diabetic'].lower() == 'true'

        advisor = DiabetesNutritionAdvisor()
        recommendations = advisor.get_nutrition_recommendations(age, height, weight, sex, activity_level, goal, diabetic)

        return jsonify(recommendations)
    except ValueError as e:
        print(f"Validation error in recommend endpoint: {e}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error in recommend endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/model_accuracy', methods=['GET'])
def get_model_accuracy():
    if model_accuracy is None:
        return jsonify({"error": "Model accuracy not available"}), 500
    return jsonify({"accuracy": f"{model_accuracy:.2f}%"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)