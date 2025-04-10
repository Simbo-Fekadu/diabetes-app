import pandas as pd
import numpy as np

class DiabetesNutritionAdvisor:
    def __init__(self, ml_model=None):
        self.ml_model = ml_model
        # Activity level multipliers (both numeric and string formats)
        self.activity_multipliers = {
            0: 1.2,      # low activity
            1: 1.55,     # medium activity
            2: 1.9,      # high activity
            "Low": 1.2,  # string equivalent
            "Moderate": 1.55,
            "High": 1.9
        }
        # Goal adjustments for calories
        self.goal_adjustments = {
            0: -300,  # cutting
            1: 0,     # standard
            2: 400    # bulking
        }
        # Macronutrient ratios for diabetes management
        self.diabetes_macros = {
            'carbs': 0.4,   # 40% of calories - lower carbs for diabetes management
            'protein': 0.3, # 30% of calories - higher protein for satiety
            'fat': 0.3      # 30% of calories - healthy fats for slower digestion
        }
        # Standard macronutrient ratios
        self.standard_macros = {
            'carbs': 0.5,   # 50% of calories
            'protein': 0.25, # 25% of calories
            'fat': 0.25     # 25% of calories
        }
        # Calories per gram
        self.calories_per_gram = {
            'carbs': 4,
            'protein': 4,
            'fat': 9
        }
        # Activity level descriptions
        self.activity_descriptions = {
            0: "Little to no exercise",
            1: "3-5 days of exercise per week",
            2: "Daily exercise or intense training",
            "Low": "Little to no exercise",
            "Moderate": "3-5 days of exercise per week",
            "High": "Daily exercise or intense training"
        }

    def bmi_calculate(self, height, weight):
        """Calculate BMI using weight (kg) and height (m)"""
        bmi = weight / (height ** 2)
        return bmi

    def ml_predict(self, input_data):
        """Predict diabetes risk using the provided ML model"""
        if self.ml_model is None:
            raise ValueError("ML model not provided")
        
        result = self.ml_model.predict(input_data)
        # Calculate accuracy if test data is available
        try:
            from sklearn.metrics import accuracy_score
            accuracy = accuracy_score(self.ml_model.y_test, self.ml_model.predict(self.ml_model.x_test))
        except:
            accuracy = None
            
        return result[0], accuracy  # 0 -> diabetes; 1 -> healthy

    def calculate_bmr(self, weight, height, age, sex):
        """Calculate Basal Metabolic Rate using Harris-Benedict equation
        
        Parameters:
        weight (float): Weight in kg
        height (float): Height in cm
        age (int): Age in years
        sex (int): 0 for female, 1 for male
        
        Returns:
        float: BMR in calories
        """
        if sex == 0:  # female
            bmr = 655 + (weight * 9.6) + (1.8 * height) - (4.7 * age)
        else:  # male
            bmr = 66 + (weight * 13.7) + (5 * height) - (6.8 * age)
        return bmr

    def calculate_tdee(self, bmr, activity_level):
        """Calculate Total Daily Energy Expenditure
        
        Parameters:
        bmr (float): Basal Metabolic Rate
        activity_level (int or str): Activity level (0/Low, 1/Moderate, 2/High)
        
        Returns:
        float: TDEE in calories
        """
        if activity_level in self.activity_multipliers:
            return bmr * self.activity_multipliers[activity_level]
        else:
            raise ValueError("Activity level must be 0 (low), 1 (medium), 2 (high) or 'Low', 'Moderate', 'High'")

    def calculate_desire_TDEE(self, activity, bodyweight, sex, age, height):
        """Legacy function for TDEE calculation - maintained for compatibility"""
        bmr = self.calculate_bmr(bodyweight, height, age, sex)
        return self.calculate_tdee(bmr, activity)

    def calculate_nutrition(self, tdee, goal, is_diabetic=False):
        """Calculate macronutrient recommendations
        
        Parameters:
        tdee (float): Total Daily Energy Expenditure
        goal (int): 0 for cutting, 1 for standard, 2 for bulking
        is_diabetic (bool): Whether the person has diabetes or is at high risk
        
        Returns:
        dict: Nutrition recommendations including calories and macronutrients
        """
        if goal not in self.goal_adjustments:
            raise ValueError("Goal must be 0 (cutting), 1 (standard), or 2 (bulking)")
        
        calories = tdee + self.goal_adjustments[goal]
        
        # Use diabetes-specific macros if the person is diabetic
        macros = self.diabetes_macros if is_diabetic else self.standard_macros
        
        nutrition = {
            'calories': calories,
            'carbs': (calories * macros['carbs']) / self.calories_per_gram['carbs'],
            'protein': (calories * macros['protein']) / self.calories_per_gram['protein'],
            'fat': (calories * macros['fat']) / self.calories_per_gram['fat']
        }
        return nutrition

    def desired_nutrition(self, goal, tdee, is_diabetic=False):
        """Legacy function for nutrition calculation - maintained for compatibility"""
        nutrition = self.calculate_nutrition(tdee, goal, is_diabetic)
        return nutrition['calories'], nutrition['carbs'], nutrition['protein'], nutrition['fat']

    def get_glycemic_index_category(self, gi_value):
        """Categorize foods based on glycemic index
        
        Parameters:
        gi_value (int): Glycemic index value
        
        Returns:
        str: Category (Low, Medium, High)
        """
        if gi_value <= 55:
            return "Low"
        elif gi_value <= 70:
            return "Medium"
        else:
            return "High"

    def get_diabetes_friendly_foods(self, category=None):
        """Get diabetes-friendly food recommendations
        
        Parameters:
        category (str, optional): Food category to filter by
        
        Returns:
        dict: Dictionary of food recommendations
        """
        foods = {
            "vegetables": [
                {"name": "Spinach", "gi": 0, "benefits": "Rich in vitamins A, C, K, iron, and folate", "portion": "2 cups raw"},
                {"name": "Broccoli", "gi": 0, "benefits": "High in fiber, vitamin C, and antioxidants", "portion": "1 cup cooked"},
                {"name": "Kale", "gi": 0, "benefits": "Excellent source of vitamins A, C, K and minerals", "portion": "2 cups raw"},
                {"name": "Bell Peppers", "gi": 15, "benefits": "High in vitamin C and antioxidants", "portion": "1 medium pepper"},
                {"name": "Cauliflower", "gi": 0, "benefits": "Low-carb alternative to grains, high in fiber", "portion": "1 cup cooked"},
                {"name": "Zucchini", "gi": 15, "benefits": "Low in carbs, good source of vitamin C", "portion": "1 cup cooked"}
            ],
            "proteins": [
                {"name": "Salmon", "gi": 0, "benefits": "Rich in omega-3 fatty acids, high-quality protein", "portion": "4 oz cooked"},
                {"name": "Chicken Breast", "gi": 0, "benefits": "Lean protein, low in fat", "portion": "4 oz cooked"},
                {"name": "Eggs", "gi": 0, "benefits": "Complete protein, vitamin D, choline", "portion": "2 whole eggs"},
                {"name": "Greek Yogurt", "gi": 35, "benefits": "High in protein, calcium, probiotics", "portion": "6 oz (plain, unsweetened)"},
                {"name": "Tofu", "gi": 15, "benefits": "Plant-based protein, calcium, iron", "portion": "4 oz"},
                {"name": "Lentils", "gi": 30, "benefits": "Plant protein, fiber, slow-digesting carbs", "portion": "1/2 cup cooked"}
            ],
            "fats": [
                {"name": "Avocado", "gi": 0, "benefits": "Healthy monounsaturated fats, fiber, potassium", "portion": "1/4 to 1/2 avocado"},
                {"name": "Olive Oil", "gi": 0, "benefits": "Monounsaturated fats, antioxidants", "portion": "1 tablespoon"},
                {"name": "Nuts (Almonds)", "gi": 0, "benefits": "Healthy fats, protein, fiber, magnesium", "portion": "1/4 cup"},
                {"name": "Seeds (Chia)", "gi": 0, "benefits": "Omega-3 fatty acids, fiber, protein", "portion": "2 tablespoons"},
                {"name": "Fatty Fish", "gi": 0, "benefits": "Omega-3 fatty acids, protein", "portion": "4 oz cooked"}
            ],
            "carbs": [
                {"name": "Sweet Potato", "gi": 55, "benefits": "Complex carbs, fiber, vitamins A and C", "portion": "1/2 cup cooked"},
                {"name": "Quinoa", "gi": 53, "benefits": "Complete protein, fiber, minerals", "portion": "1/3 cup cooked"},
                {"name": "Berries", "gi": 40, "benefits": "Low sugar fruits, antioxidants, fiber", "portion": "3/4 cup"},
                {"name": "Oats", "gi": 55, "benefits": "Soluble fiber, helps control blood sugar", "portion": "1/2 cup cooked"},
                {"name": "Beans", "gi": 40, "benefits": "Fiber, protein, resistant starch", "portion": "1/2 cup cooked"}
            ]
        }
        
        if category and category in foods:
            return {category: foods[category]}
        return foods

    def get_recommendations(self, weight, height, age, sex, activity_level, goal, glucose_level=None, prediction=None):
        """Get complete nutrition recommendations
        
        Parameters:
        weight (float): Weight in kg
        height (float): Height in cm
        age (int): Age in years
        sex (int): 0 for female, 1 for male
        activity_level (int or str): Activity level (0/Low, 1/Moderate, 2/High)
        goal (int): 0 for cutting, 1 for standard, 2 for bulking
        glucose_level (float, optional): Blood glucose level
        prediction (int, optional): ML prediction (0 for diabetic, 1 for healthy)
        
        Returns:
        dict: Complete nutrition recommendations
        """
        # Calculate BMI
        height_m = height / 100  # Convert cm to m
        bmi = self.bmi_calculate(height_m, weight)
        
        # Determine if the person is diabetic or at risk
        is_diabetic = False
        if prediction is not None:
            is_diabetic = (prediction == 0)
        elif glucose_level is not None:
            is_diabetic = (glucose_level > 125)  # Simplified check
        
        # Calculate BMR and TDEE
        bmr = self.calculate_bmr(weight, height, age, sex)
        tdee = self.calculate_tdee(bmr, activity_level)
        
        # Calculate nutrition needs
        nutrition = self.calculate_nutrition(tdee, goal, is_diabetic)
        
        # Get activity description
        activity_description = self.activity_descriptions.get(activity_level, "Unknown activity level")
        
        # Get food recommendations
        food_recommendations = self.get_diabetes_friendly_foods()
        
        # Calculate water needs (33ml per kg of body weight)
        water_needs = weight * 0.033  # liters per day
        
        # Calculate fiber needs (14g per 1000 calories)
        fiber_needs = (nutrition['calories'] / 1000) * 14
        
        return {
            'bmi': bmi,
            'is_diabetic': is_diabetic,
            'bmr': bmr,
            'tdee': tdee,
            'activity_level': activity_level,
            'activity_description': activity_description,
            'calories': nutrition['calories'],
            'carbs': nutrition['carbs'],
            'protein': nutrition['protein'],
            'fat': nutrition['fat'],
            'water_needs': water_needs,
            'fiber_needs': fiber_needs,
            'food_recommendations': food_recommendations
        }

    def generate_meal_plan(self, nutrition_data, days=1):
        """Generate a sample meal plan based on nutrition recommendations
        
        Parameters:
        nutrition_data (dict): Nutrition recommendations from get_recommendations
        days (int): Number of days to generate meal plan for
        
        Returns:
        dict: Meal plan
        """
        # This is a simplified meal plan generator
        # In a real application, this would be more sophisticated
        
        is_diabetic = nutrition_data.get('is_diabetic', False)
        calories = nutrition_data.get('calories', 2000)
        
        # Adjust meal distribution based on diabetes status
        if is_diabetic:
            # More frequent, smaller meals for diabetes management
            meal_distribution = {
                'breakfast': 0.2,
                'morning_snack': 0.1,
                'lunch': 0.25,
                'afternoon_snack': 0.1,
                'dinner': 0.25,
                'evening_snack': 0.1
            }
        else:
            # Standard meal distribution
            meal_distribution = {
                'breakfast': 0.25,
                'lunch': 0.35,
                'dinner': 0.3,
                'snack': 0.1
            }
        
        # Sample meal plans (very simplified)
        meal_plans = []
        
        for day in range(days):
            daily_plan = {
                'day': day + 1,
                'total_calories': calories,
                'meals': {}
            }
            
            for meal, percentage in meal_distribution.items():
                meal_calories = calories * percentage
                
                # Very simplified meal suggestion
                if meal == 'breakfast':
                    if is_diabetic:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Greek yogurt with berries and nuts, sprinkled with cinnamon"
                        }
                    else:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Oatmeal with fruit and nuts"
                        }
                elif meal == 'lunch':
                    if is_diabetic:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Grilled chicken salad with olive oil dressing and a small portion of quinoa"
                        }
                    else:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Sandwich with lean protein and vegetables"
                        }
                elif meal == 'dinner':
                    if is_diabetic:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Baked salmon with roasted non-starchy vegetables and a small sweet potato"
                        }
                    else:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Protein with vegetables and whole grains"
                        }
                else:  # snacks
                    if is_diabetic:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Apple slices with almond butter or vegetable sticks with hummus"
                        }
                    else:
                        daily_plan['meals'][meal] = {
                            'calories': meal_calories,
                            'suggestion': "Fruit or nuts"
                        }
            
            meal_plans.append(daily_plan)
        
        return meal_plans

    def get_exercise_recommendations(self, activity_level, is_diabetic=False):
        """Get exercise recommendations based on activity level and diabetes status
        
        Parameters:
        activity_level (int or str): Activity level (0/Low, 1/Moderate, 2/High)
        is_diabetic (bool): Whether the person has diabetes or is at high risk
        
        Returns:
        list: Exercise recommendations
        """
        # Convert string activity level to numeric if needed
        if activity_level == "Low":
            activity_numeric = 0
        elif activity_level == "Moderate":
            activity_numeric = 1
        elif activity_level == "High":
            activity_numeric = 2
        else:
            activity_numeric = activity_level
        
        # Base recommendations on activity level
        if activity_numeric == 0:  # Low
            recommendations = [
                {
                    "type": "Walking",
                    "frequency": "Daily",
                    "duration": "30 minutes",
                    "intensity": "Moderate pace",
                    "benefits": "Improves insulin sensitivity and helps manage blood sugar levels",
                    "tips": "Break it up into three 10-minute sessions if needed"
                },
                {
                    "type": "Swimming",
                    "frequency": "2-3 times per week",
                    "duration": "20-30 minutes",
                    "intensity": "Light to moderate",
                    "benefits": "Low-impact exercise that's gentle on joints while improving cardiovascular health",
                    "tips": "Focus on steady, consistent movement rather than speed"
                },
                {
                    "type": "Gentle Yoga",
                    "frequency": "2-3 times per week",
                    "duration": "20-30 minutes",
                    "intensity": "Low",
                    "benefits": "Improves flexibility, reduces stress, and may help lower blood sugar",
                    "tips": "Look for 'beginner', 'gentle', or 'diabetes-friendly' yoga classes or videos"
                }
            ]
        elif activity_numeric == 1:  # Moderate
            recommendations = [
                {
                    "type": "Brisk Walking or Jogging",
                    "frequency": "4-5 times per week",
                    "duration": "30-45 minutes",
                    "intensity": "Moderate to somewhat hard",
                    "benefits": "Improves cardiovascular health and helps maintain healthy blood sugar levels",
                    "tips": "Alternate between walking and jogging to build endurance"
                },
                {
                    "type": "Cycling",
                    "frequency": "3-4 times per week",
                    "duration": "30 minutes",
                    "intensity": "Moderate",
                    "benefits": "Improves leg strength and cardiovascular fitness without high impact",
                    "tips": "Indoor stationary bikes are great for consistent workouts regardless of weather"
                },
                {
                    "type": "Strength Training",
                    "frequency": "2-3 times per week",
                    "duration": "20-30 minutes",
                    "intensity": "Moderate",
                    "benefits": "Builds muscle mass which improves insulin sensitivity and glucose metabolism",
                    "tips": "Focus on major muscle groups with bodyweight exercises or light weights"
                }
            ]
        else:  # High
            recommendations = [
                {
                    "type": "Interval Training",
                    "frequency": "3-4 times per week",
                    "duration": "20-30 minutes",
                    "intensity": "Alternating between moderate and high",
                    "benefits": "Efficiently improves cardiovascular fitness and glucose metabolism",
                    "tips": "Always include proper warm-up and cool-down periods"
                },
                {
                    "type": "Strength Training",
                    "frequency": "3-4 times per week",
                    "duration": "30-45 minutes",
                    "intensity": "Moderate to high",
                    "benefits": "Increases muscle mass which improves insulin sensitivity and metabolic health",
                    "tips": "Include a mix of resistance exercises for all major muscle groups"
                },
                {
                    "type": "Active Recovery",
                    "frequency": "2-3 times per week",
                    "duration": "20-30 minutes",
                    "intensity": "Low",
                    "benefits": "Promotes recovery while maintaining activity levels",
                    "tips": "Try yoga, swimming, or light walking on rest days"
                }
            ]
        
        # Add diabetes-specific recommendations if needed
        if is_diabetic:
            recommendations.append({
                "type": "Blood Sugar Monitoring",
                "frequency": "Before and after exercise",
                "duration": "N/A",
                "intensity": "N/A",
                "benefits": "Helps understand how exercise affects your blood sugar levels",
                "tips": "Keep fast-acting carbohydrates handy in case of low blood sugar during exercise"
            })
        
        return recommendations

    def get_complete_health_plan(self, user_data):
        """Generate a complete health plan based on user data
        
        Parameters:
        user_data (dict): User data including weight, height, age, sex, activity_level, etc.
        
        Returns:
        dict: Complete health plan
        """
        # Extract user data
        weight = user_data.get('weight', 70)
        height = user_data.get('height', 170)
        age = user_data.get('age', 30)
        sex = user_data.get('sex', 1)  # Default to male
        activity_level = user_data.get('activity_level', 1)  # Default to moderate
        goal = user_data.get('goal', 1)  # Default to standard
        glucose = user_data.get('glucose', None)
        prediction = user_data.get('prediction', None)
        
        # Get nutrition recommendations
        nutrition = self.get_recommendations(
            weight, height, age, sex, activity_level, goal, glucose, prediction
        )
        
        # Generate meal plan
        meal_plan = self.generate_meal_plan(nutrition, days=7)
        
        # Get exercise recommendations
        exercise = self.get_exercise_recommendations(activity_level, nutrition['is_diabetic'])
        
        # Compile complete health plan
        health_plan = {
            'user_profile': {
                'weight': weight,
                'height': height,
                'age': age,
                'sex': 'Female' if sex == 0 else 'Male',
                'bmi': nutrition['bmi'],
                'activity_level': activity_level,
                'activity_description': nutrition['activity_description'],
                'diabetes_status': 'At Risk' if nutrition['is_diabetic'] else 'Low Risk'
            },
            'nutrition': {
                'tdee': nutrition['tdee'],
                'calories': nutrition['calories'],
                'carbs': nutrition['carbs'],
                'protein': nutrition['protein'],
                'fat': nutrition['fat'],
                'water_needs': nutrition['water_needs'],
                'fiber_needs': nutrition['fiber_needs']
            },
            'food_recommendations': nutrition['food_recommendations'],
            'meal_plan': meal_plan,
            'exercise_recommendations': exercise
        }
        
        return health_plan


# Example usage
if __name__ == "__main__":
    # Create an instance of the advisor
    advisor = DiabetesNutritionAdvisor()
    
    # Sample user data
    user_data = {
        'weight': 75,  # kg
        'height': 175,  # cm
        'age': 35,
        'sex': 1,  # male
        'activity_level': "Moderate",  # or 1
        'goal': 1,  # standard
        'glucose': 140,  # slightly elevated
    }
    
    # Get complete health plan
    health_plan = advisor.get_complete_health_plan(user_data)
    
    # Print some results
    print(f"BMI: {health_plan['user_profile']['bmi']:.1f}")
    print(f"Activity Level: {health_plan['user_profile']['activity_description']}")
    print(f"Daily Calories: {health_plan['nutrition']['calories']:.0f} kcal")
    print(f"Macros - Carbs: {health_plan['nutrition']['carbs']:.0f}g, Protein: {health_plan['nutrition']['protein']:.0f}g, Fat: {health_plan['nutrition']['fat']:.0f}g")
    print(f"Water Needs: {health_plan['nutrition']['water_needs']:.1f} liters per day")
    
    # Print sample meal
    print("\nSample Breakfast:")
    print(health_plan['meal_plan'][0]['meals']['breakfast']['suggestion'])