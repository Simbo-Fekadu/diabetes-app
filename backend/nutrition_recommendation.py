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
        if sex.lower() == "female":  # Female
            BMR = 655 + (bodyweight * 9.6) + (1.8 * height * 100) - (4.7 * age)  # Height in cm
        else:  # Male
            BMR = 66 + (bodyweight * 13.7) + (5 * height * 100) - (6.8 * age)  # Height in cm

        # Get TDEE based on activity level
        if activity.lower() == "low":
            TDEE = BMR * 1.2
        elif activity.lower() == "medium":
            TDEE = BMR * 1.55
        else:  # High
            TDEE = BMR * 1.9

        return round(TDEE, 2)

    def desired_nutrition(self, goal, TDEE, diabetic=False):
        """Calculate desired daily energy and macronutrient distribution."""
        # Adjust energy based on goal
        if goal.lower() == "cutting":
            energy = TDEE - 300
        elif goal.lower() == "bulking":
            energy = TDEE + 400
        else:  # Standard
            energy = TDEE

        # For diabetic users, reduce calories by 10-15% and adjust macros
        if diabetic:
            energy = energy * 0.85  # Reduce by 15%
            carb_ratio = 0.4  # Lower carbs for diabetics
            protein_ratio = 0.3  # Higher protein
            fat_ratio = 0.3  # Balanced fats
        else:
            # Standard ratios based on Taiwan Ministry of Health and Welfare
            carb_ratio = 0.5  # 50% carbs
            protein_ratio = 0.25  # 25% protein
            fat_ratio = 0.25  # 25% fat

        # Calculate macronutrients (carbs: 4 kcal/g, protein: 4 kcal/g, fat: 9 kcal/g)
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
        # Calculate BMI
        bmi = self.bmi_calculate(height, weight)

        # Calculate TDEE
        tdee = self.calculate_desire_TDEE(activity_level, weight, sex, age, height)

        # Calculate desired nutrition
        nutrition = self.desired_nutrition(goal, tdee, diabetic)

        return {
            "bmi": bmi,
            "tdee": tdee,
            "nutrition": nutrition
        }