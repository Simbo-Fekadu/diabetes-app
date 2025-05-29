#!/usr/bin/env python
# coding: utf-8

import pandas as pd

class DiabetesNutritionAdvisor:
    def __init__(self):
        pass

    def bmi_calculate(self, height, weight):
        """Calculate BMI given height (in meters) and weight (in kg)."""
        bmi = weight / (height ** 2)
        return round(bmi, 2)

    def calculate_desire_TDEE(self, activity, bodyweight, sex, age, height):
        """Calculate Total Daily Energy Expenditure (TDEE) using Harris-Benedict Equation."""
        BMR = 0.0
        TDEE = 0.0

        # Use Harris-Benedict equation to calculate BMR
        if sex.lower() == "female":
            BMR = 655 + (bodyweight * 9.6) + (1.8 * height * 100) - (4.7 * age)
        else:
            BMR = 66 + (bodyweight * 13.7) + (5 * height * 100) - (6.8 * age)

        # Map activity levels and validate
        activity = activity.lower()
        if activity == 'moderate' or activity == 'medium':
            activity = 'medium'  # Map 'Moderate' or 'Medium' to 'medium'
        activity_multipliers = {
            "low": 1.2,
            "medium": 1.55,
            "high": 1.9
        }
        if activity not in activity_multipliers:
            raise ValueError(f"Invalid activity level: {activity}. Expected 'low', 'medium', 'moderate', or 'high'.")
        TDEE = BMR * activity_multipliers[activity]
        return round(TDEE, 2)

    def desired_nutrition(self, goal, TDEE, diabetic=False):
        """Calculate desired daily energy and macronutrient distribution."""
        # Adjust energy based on goal
        if goal.lower() == "cutting":
            energy = TDEE - 300
        elif goal.lower() == "bulking":
            energy = TDEE + 400
        else:  # standard
            energy = TDEE

        # For diabetic users, reduce calories by 10-15% and adjust macros
        if diabetic:
            energy = energy * 0.85
            carb_ratio = 0.4
            protein_ratio = 0.3
            fat_ratio = 0.3
        else:
            carb_ratio = 0.5
            protein_ratio = 0.25
            fat_ratio = 0.25

        carbs = (energy * carb_ratio) / 4
        protein = (energy * protein_ratio) / 4
        fat = (energy * fat_ratio) / 9

        return {
            "energy": round(energy, 2),
            "carbs": round(carbs, 2),
            "protein": round(protein, 2),
            "fat": round(fat, 2)
        }

    def get_nutrition_recommendations(self, age, height, weight, sex, activity_level, goal, diabetic=False):
        """Generate nutrition recommendations based on user data."""
        bmi = self.bmi_calculate(height, weight)
        tdee = self.calculate_desire_TDEE(activity_level, weight, sex, age, height)
        nutrition = self.desired_nutrition(goal, tdee, diabetic)
        return {
            "bmi": bmi,
            "tdee": tdee,
            "nutrition": nutrition
        }