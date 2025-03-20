from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Model file path
MODEL_PATH = 'model.pkl'

# Train or load the model
if not os.path.exists(MODEL_PATH):
    print("Training new model...")
    # Load dataset (assumes diabetes.csv is in backend/)
    data = pd.read_csv('diabetes.csv')
    X = data.drop('Outcome', axis=1)  # Features
    y = data['Outcome']               # Target (0 = Not Diabetic, 1 = Diabetic)
    
    # Split and train
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained. Test accuracy: {accuracy:.2f}")
    
    # Save model
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
else:
    model = pickle.load(open(MODEL_PATH, 'rb'))
    print("Model loaded from", MODEL_PATH)

@app.route('/')
def home():
    return "Diabetes Prediction Backend"

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
    
    return jsonify({'prediction': result, 'diet_suggestion': diet_suggestion})

if __name__ == "__main__":
    app.run(debug=True, port=5000)