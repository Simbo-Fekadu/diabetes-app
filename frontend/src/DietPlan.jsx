import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DietPlan = ({ recommendationData, predictionData, darkMode }) => {
  const { nutrition } = recommendationData || {};
  const { prediction, ActivityLevel } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';
  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  // Pool of meal options (base macros before scaling)
  const mealOptions = {
    breakfast: {
      diabetic: [
        { name: 'Vegetable Omelette', portion: '2 eggs, 1 cup spinach, 1/4 cup tomatoes', calories: 160, carbs: 5, protein: 14, fat: 10 },
        { name: 'Greek Yogurt with Chia Seeds', portion: '1/2 cup yogurt, 1 tbsp chia seeds', calories: 150, carbs: 10, protein: 12, fat: 8 },
        { name: 'Avocado Toast (Low Carb)', portion: '1 slice low-carb bread, 1/2 avocado', calories: 180, carbs: 10, protein: 5, fat: 15 },
      ],
      nonDiabetic: [
        { name: 'Oatmeal with Berries', portion: '1/2 cup oats, 1/2 cup berries', calories: 200, carbs: 30, protein: 5, fat: 3 },
        { name: 'Banana Pancakes', portion: '2 pancakes, 1 banana', calories: 300, carbs: 50, protein: 8, fat: 5 },
        { name: 'Smoothie', portion: '1 banana, 1 cup milk, 1 tbsp peanut butter', calories: 300, carbs: 40, protein: 10, fat: 10 },
      ],
    },
    lunch: {
      diabetic: [
        { name: 'Grilled Chicken Salad', portion: '100g chicken, 2 cups greens, 1 tbsp olive oil', calories: 300, carbs: 10, protein: 25, fat: 15 },
        { name: 'Quinoa Salad', portion: '1/2 cup quinoa, 1 cup veggies, 1 tbsp dressing', calories: 250, carbs: 20, protein: 8, fat: 10 },
        { name: 'Tuna Salad', portion: '100g tuna, 2 cups greens', calories: 200, carbs: 5, protein: 25, fat: 5 },
      ],
      nonDiabetic: [
        { name: 'Turkey Sandwich', portion: '2 slices whole-grain bread, 100g turkey, lettuce', calories: 400, carbs: 40, protein: 20, fat: 5 },
        { name: 'Pasta Salad', portion: '1 cup pasta, 1/2 cup veggies, 1 tbsp dressing', calories: 350, carbs: 50, protein: 10, fat: 5 },
        { name: 'Chicken Wrap', portion: '1 wrap, 100g chicken, veggies', calories: 400, carbs: 35, protein: 20, fat: 8 },
      ],
    },
    dinner: {
      diabetic: [
        { name: 'Baked Salmon with Broccoli', portion: '120g salmon, 1 cup broccoli', calories: 350, carbs: 8, protein: 30, fat: 15 },
        { name: 'Grilled Tofu with Asparagus', portion: '100g tofu, 1 cup asparagus', calories: 250, carbs: 10, protein: 15, fat: 10 },
        { name: 'Steamed Fish with Zucchini', portion: '120g fish, 1 cup zucchini', calories: 250, carbs: 8, protein: 30, fat: 5 },
      ],
      nonDiabetic: [
        { name: 'Chicken Stir-Fry', portion: '100g chicken, 1 cup veggies, 1/2 cup rice', calories: 450, carbs: 45, protein: 25, fat: 8 },
        { name: 'Beef Stir-Fry', portion: '100g beef, 1 cup veggies, 1/2 cup noodles', calories: 500, carbs: 40, protein: 25, fat: 10 },
        { name: 'Pasta with Meat Sauce', portion: '1 cup pasta, 100g beef', calories: 500, carbs: 50, protein: 20, fat: 10 },
      ],
    },
  };

  // Function to scale meal macros based on target calories
  const scaleMeal = (meal, targetCalories) => {
    const scaleFactor = targetCalories / meal.calories;
    return {
      ...meal,
      calories: targetCalories,
      carbs: Math.round(meal.carbs * scaleFactor),
      protein: Math.round(meal.protein * scaleFactor),
      fat: Math.round(meal.fat * scaleFactor),
    };
  };

  // Function to randomly select a meal from the pool
  const getRandomMeal = (options) => {
    const index = Math.floor(Math.random() * options.length);
    return options[index];
  };

  // Generate the 7-day meal plan
  const mealPlan = useMemo(() => {
    if (!nutrition) return {};

    // Daily targets
    const dailyCalories = nutrition.energy || 2000;
    const dailyCarbs = nutrition.carbs || (isDiabetic ? 150 : 200);
    const dailyProtein = nutrition.protein || 100;
    const dailyFat = nutrition.fat || 60;

    // Adjust calories based on activity level
    const activityMultiplier = { Low: 0.9, Moderate: 1.0, High: 1.1 };
    const adjustedCalories = dailyCalories * (activityMultiplier[ActivityLevel] || 1.0);

    // Distribute calories across meals
    const breakfastCalories = adjustedCalories * 0.3; // 30%
    const lunchCalories = adjustedCalories * 0.4; // 40%
    const dinnerCalories = adjustedCalories * 0.3; // 30%

    const plan = {};
    for (let day = 1; day <= 7; day++) {
      // Select meals based on diabetic status
      const breakfastOptions = isDiabetic
        ? mealOptions.breakfast.diabetic
        : mealOptions.breakfast.nonDiabetic;
      const lunchOptions = isDiabetic
        ? mealOptions.lunch.diabetic
        : mealOptions.lunch.nonDiabetic;
      const dinnerOptions = isDiabetic
        ? mealOptions.dinner.diabetic
        : mealOptions.dinner.nonDiabetic;

      // Select and scale meals
      const breakfast = scaleMeal(getRandomMeal(breakfastOptions), breakfastCalories);
      const lunch = scaleMeal(getRandomMeal(lunchOptions), lunchCalories);
      const dinner = scaleMeal(getRandomMeal(dinnerOptions), dinnerCalories);

      plan[`Day ${day}`] = {
        breakfast,
        lunch,
        dinner,
      };
    }
    return plan;
  }, [nutrition, prediction, ActivityLevel]);

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>7-Day Meal Plan</h3>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Dynamically generated meal plan based on your {isDiabetic ? 'diabetic' : 'non-diabetic'} profile, nutrition goals, and {ActivityLevel || 'Low'} activity level.
      </p>

      {Object.keys(mealPlan).map((day) => (
        <div key={day} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => toggleDay(day)}
            className={`w-full flex justify-between items-center py-3 text-left text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {day}
            {expandedDay === day ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedDay === day && (
            <div className={`pl-4 pb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p><strong>Breakfast:</strong> {mealPlan[day].breakfast.name} ({mealPlan[day].breakfast.portion})</p>
              <p className="pl-2">Calories: {mealPlan[day].breakfast.calories.toFixed(0)} kcal, Carbs: {mealPlan[day].breakfast.carbs}g, Protein: {mealPlan[day].breakfast.protein}g, Fat: {mealPlan[day].breakfast.fat}g</p>
              <p><strong>Lunch:</strong> {mealPlan[day].lunch.name} ({mealPlan[day].lunch.portion})</p>
              <p className="pl-2">Calories: {mealPlan[day].lunch.calories.toFixed(0)} kcal, Carbs: {mealPlan[day].lunch.carbs}g, Protein: {mealPlan[day].lunch.protein}g, Fat: {mealPlan[day].lunch.fat}g</p>
              <p><strong>Dinner:</strong> {mealPlan[day].dinner.name} ({mealPlan[day].dinner.portion})</p>
              <p className="pl-2">Calories: {mealPlan[day].dinner.calories.toFixed(0)} kcal, Carbs: {mealPlan[day].dinner.carbs}g, Protein: {mealPlan[day].dinner.protein}g, Fat: {mealPlan[day].dinner.fat}g</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DietPlan;