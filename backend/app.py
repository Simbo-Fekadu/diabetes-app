from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256
import sqlite3
import numpy as np
import pandas as pd
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key-here'  # Change this in production!
jwt = JWTManager(app)

# SQLite setup
def init_db():
    with sqlite3.connect('users.db') as conn:
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users 
                     (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)''')
        c.execute('''CREATE TABLE IF NOT EXISTS predictions 
                     (id INTEGER PRIMARY KEY, user_id INTEGER, prediction TEXT, diet_suggestion TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                      FOREIGN KEY(user_id) REFERENCES users(id))''')
        conn.commit()

init_db()

# Model setup
MODEL_PATH = 'model.pkl'
if not os.path.exists(MODEL_PATH):
    print("Training new model...")
    data = pd.read_csv('diabetes.csv')
    X = data.drop('Outcome', axis=1)
    y = data['Outcome']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained. Test accuracy: {accuracy:.2f}")
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
else:
    model = pickle.load(open(MODEL_PATH, 'rb'))
    print("Model loaded from", MODEL_PATH)

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
        with sqlite3.connect('users.db') as conn:
            c = conn.cursor()
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username already exists'}), 409

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    with sqlite3.connect('users.db') as conn:
        c = conn.cursor()
        c.execute("SELECT id, password FROM users WHERE username = ?", (username,))
        user = c.fetchone()
    
    if user and pbkdf2_sha256.verify(password, user[1]):
        access_token = create_access_token(identity=user[0])  # Use user ID as identity
        return jsonify({'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
def predict():
    data = request.form
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
    input_array = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_array)[0]
    
    if prediction == 0:
        result = 'Not Diabetic'
        diet_suggestion = 'Maintain a balanced diet with whole grains, vegetables, and regular exercise.'
    else:
        result = 'Diabetic'
        diet_suggestion = 'Adopt a low-sugar, low-carb diet and consult a doctor for monitoring.'
    
    # Save prediction if user is logged in
    user_id = None
    try:
        user_id = get_jwt_identity()  # Returns None if no valid token
    except:
        pass  # No token, proceed without saving
    
    if user_id:
        with sqlite3.connect('users.db') as conn:
            c = conn.cursor()
            c.execute("INSERT INTO predictions (user_id, prediction, diet_suggestion) VALUES (?, ?, ?)",
                      (user_id, result, diet_suggestion))
            conn.commit()
    
    return jsonify({'prediction': result, 'diet_suggestion': diet_suggestion})

@app.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    with sqlite3.connect('users.db') as conn:
        c = conn.cursor()
        c.execute("SELECT prediction, diet_suggestion, timestamp FROM predictions WHERE user_id = ? ORDER BY timestamp DESC", (user_id,))
        history = [{'prediction': row[0], 'diet_suggestion': row[1], 'timestamp': row[2]} for row in c.fetchall()]
    return jsonify({'history': history}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)