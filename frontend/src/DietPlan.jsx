import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Utensils, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

const DietPlan = ({ recommendationData, predictionData, darkMode }) => {
  // Error boundary for missing props
  if (!recommendationData || !predictionData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-4 rounded-md flex items-center space-x-3 ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-50 text-red-800'}`}
      >
        <Utensils className="w-5 h-5" />
        <p>Missing required data for meal plan generation</p>
      </motion.div>
    );
  }

  const { nutrition } = recommendationData;
  const { prediction, ActivityLevel = 'Moderate' } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';
  const [expandedDay, setExpandedDay] = useState(null);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Full meal plans data structure with unique images
  const SAMPLE_MEAL_PLANS = useMemo(() => ({
    1200: {
      days: [
        { // Monday
          breakfast: { 
            name: 'Poached Egg & Avocado Toast', 
            portion: '1 egg, 1/2 avocado, Ezekiel bread, 1 orange',
            carbs: 39,
            calories: 300,
            protein: 14,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Mexican Bowl',
            portion: '2/3 cup pinto beans, 1 cup spinach, 1/4 cup tomatoes, 1/4 cup peppers, 1 oz cheese, 1 tbsp salsa',
            carbs: 30,
            calories: 350,
            protein: 18,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1511690078906-2c6293c06fcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Carrots & Hummus',
            portion: '20 baby carrots, 2 tbsp hummus',
            carbs: 21,
            calories: 150,
            protein: 5,
            fat: 8,
            image: 'https://images.unsplash.com/photo-1593965593607-1a2a4c9d6f72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Lentil Pasta with Turkey',
            portion: '1 cup lentil penne, 2 oz turkey, 1.5 cups veggie tomato sauce',
            carbs: 35,
            calories: 400,
            protein: 22,
            fat: 15,
            image: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Tuesday
          breakfast: {
            name: 'Blueberry Oatmeal',
            portion: '3/4 cup blueberries, 1 cup oatmeal, 1 oz almonds, 1 tsp chia seeds',
            carbs: 34,
            calories: 320,
            protein: 12,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1504382262782-7cc149e53c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Chicken Avocado Salad',
            portion: '1/2 cup chickpeas, 2 cups spinach, 2 oz chicken, 1/2 avocado, 1/2 cup strawberries',
            carbs: 52,
            calories: 380,
            protein: 24,
            fat: 18,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Peach Cottage Cheese',
            portion: '1 small peach, 1/3 cup 2% cottage cheese',
            carbs: 16,
            calories: 120,
            protein: 8,
            fat: 3,
            image: 'https://images.unsplash.com/photo-1623688440132-2c0d0c2b2f48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Mediterranean Couscous',
            portion: '2/3 cup couscous, 1/2 cup eggplant, sundried tomatoes, olives, cucumber',
            carbs: 38,
            calories: 380,
            protein: 15,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1519996529931-28324d484a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Wednesday
          breakfast: {
            name: 'Veggie Omelet with Black Beans',
            portion: '2 eggs, spinach, mushrooms, bell pepper, avocado, 1/2 cup black beans',
            carbs: 34,
            calories: 350,
            protein: 20,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1529006557810-06be7a41a2e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Tuna Sandwich',
            portion: '2 slices whole wheat bread, 2 oz tuna, veggies, 1/2 apple',
            carbs: 40,
            calories: 400,
            protein: 25,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Unsweetened Kefir',
            portion: '1 cup kefir',
            carbs: 12,
            calories: 110,
            protein: 9,
            fat: 2,
            image: 'https://images.unsplash.com/photo-1576092768241-d46814a7b662?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Pork with Asparagus',
            portion: '2 oz pork, 1/2 cup succotash, 1 cup asparagus, 1/2 cup pineapple',
            carbs: 34,
            calories: 380,
            protein: 22,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Thursday
          breakfast: {
            name: 'Sweet Potato Toast',
            portion: '2 slices sweet potato, 1 oz goat cheese, spinach, flaxseed',
            carbs: 44,
            calories: 300,
            protein: 12,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Chicken & Cauliflower',
            portion: '2 oz chicken, 1 cup cauliflower, 1 cup strawberries',
            carbs: 23,
            calories: 280,
            protein: 18,
            fat: 8,
            image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Yogurt with Banana',
            portion: '1 cup Greek yogurt, 1/2 banana',
            carbs: 15,
            calories: 150,
            protein: 12,
            fat: 2,
            image: 'https://images.unsplash.com/photo-1519733870-f96e3c731138?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Quinoa with Tofu',
            portion: '2/3 cup quinoa, 8 oz tofu, bok choy, broccoli, kiwi',
            carbs: 44,
            calories: 420,
            protein: 24,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1512058564366-3382a6daba0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Friday
          breakfast: {
            name: 'High Fiber Cereal',
            portion: '1/3 cup Grape-Nuts, 1/2 cup blueberries, almond milk',
            carbs: 41,
            calories: 300,
            protein: 8,
            fat: 6,
            image: 'https://images.unsplash.com/photo-1519940778793-c7c0d28669e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Spinach Salad',
            portion: '2 cups spinach, 1 oz cheese, boiled egg, grapes, chickpeas',
            carbs: 47,
            calories: 380,
            protein: 20,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Celery with Peanut Butter',
            portion: '1 cup celery, 1 tbsp peanut butter',
            carbs: 6,
            calories: 120,
            protein: 5,
            fat: 8,
            image: 'https://images.unsplash.com/photo-1612293518798-9b9f9f6a0e73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Salmon with Baked Potato',
            portion: '2 oz salmon, 1 medium baked potato, 1.5 cups asparagus',
            carbs: 39,
            calories: 400,
            protein: 25,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b1a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Saturday
          breakfast: {
            name: 'Greek Yogurt with Fruit',
            portion: '1 cup yogurt, 1/2 banana, 1 cup strawberries, chia seeds',
            carbs: 32,
            calories: 280,
            protein: 18,
            fat: 8,
            image: 'https://images.unsplash.com/photo-1490730141103-6fd004a053d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Black Bean Tacos',
            portion: '2 corn tortillas, 1/3 cup black beans, 1 oz cheese, avocado, coleslaw',
            carbs: 70,
            calories: 420,
            protein: 18,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1591351261199-d7d3d1c0a848?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Veggies with Hummus',
            portion: '1 cherry tomato, 10 baby carrots, 2 tbsp hummus',
            carbs: 14,
            calories: 120,
            protein: 5,
            fat: 6,
            image: 'https://images.unsplash.com/photo-1608032081698-45a9327697b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Beef with Broccoli',
            portion: '2 oz beef, 1/2 baked potato, 1.5 cups broccoli, 3/4 cup strawberries',
            carbs: 41,
            calories: 380,
            protein: 22,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1560717845-968823ef8671?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Sunday
          breakfast: {
            name: 'Chocolate Peanut Oatmeal',
            portion: '1/2 cup oatmeal, protein powder, 1 tbsp peanut butter, chia seeds',
            carbs: 21,
            calories: 320,
            protein: 20,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1517673400267-0251442c1699?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Lentil Pita Pocket',
            portion: '1 small pita, 1/2 cup lentils, veggies, 2 tbsp dressing',
            carbs: 30,
            calories: 350,
            protein: 18,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1593255485298-5c1654ab7838?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snack: {
            name: 'Grapefruit with Almonds',
            portion: '1 small grapefruit, 1 oz almonds',
            carbs: 26,
            calories: 180,
            protein: 6,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1608746062547-c4a5a2c8d9cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          dinner: {
            name: 'Shrimp with Peas',
            portion: '2 oz shrimp, 1 cup peas, 1/2 cup beets, Swiss chard',
            carbs: 39,
            calories: 350,
            protein: 24,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1519996409908-6d1bdce0f2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
      ],
    },
    1600: {
      days: [
        { // Monday
          breakfast: { 
            name: 'Poached Egg & Avocado Toast', 
            portion: '1 egg, 1/2 avocado, Ezekiel bread, 1 orange',
            carbs: 39,
            calories: 300,
            protein: 14,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1518972559570-7cc43d6e1da7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Mexican Bowl with Rice',
            portion: '1/3 cup brown rice, 2/3 cup baked beans, 1 cup spinach, veggies',
            carbs: 43,
            calories: 450,
            protein: 22,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1596854307934-24419df0b48d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Carrots & Hummus',
              portion: '20 baby carrots, 2 tbsp hummus',
              carbs: 21,
              calories: 150,
              protein: 5,
              fat: 8,
              image: 'https://images.unsplash.com/photo-1593965593607-1a2a4c9d6f72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Cucumber & Tahini',
              portion: '1 cup cucumber, 2 tsp tahini',
              carbs: 3,
              calories: 100,
              protein: 2,
              fat: 5,
              image: 'https://images.unsplash.com/photo-1594272162317-a71102b4e1fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Lentil Pasta with Turkey',
            portion: '1 cup lentil penne, 2 oz turkey, 1.5 cups veggie tomato sauce',
            carbs: 35,
            calories: 500,
            protein: 28,
            fat: 18,
            image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Tuesday
          breakfast: {
            name: 'Blueberry Oatmeal Plus',
            portion: '3/4 cup blueberries, 1/2 cup oatmeal, 1 oz almonds, 2 tsp chia seeds',
            carbs: 39,
            calories: 350,
            protein: 14,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1533909077757-45a8a2e2e360?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Chicken Avocado Salad',
            portion: '1/2 cup chickpeas, 2 cups spinach, 3 oz chicken, 1/2 avocado, strawberries',
            carbs: 49,
            calories: 450,
            protein: 28,
            fat: 22,
            image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Peach Cottage Cheese',
              portion: '1 small peach, 1/3 cup cottage cheese',
              carbs: 16,
              calories: 140,
              protein: 10,
              fat: 4,
              image: 'https://images.unsplash.com/photo-1623688440132-2c0d0c2b2f48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Apple with Almond Butter',
              portion: '1 apple, 2 tsp almond butter',
              carbs: 16,
              calories: 160,
              protein: 3,
              fat: 7,
              image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Mediterranean Couscous',
            portion: '2/3 cup couscous, eggplant, sundried tomatoes, olives, cucumber',
            carbs: 38,
            calories: 450,
            protein: 18,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1590779033106-b1ca66c79f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Wednesday
          breakfast: {
            name: 'Veggie Omelet with Black Beans',
            portion: '2 eggs, spinach, mushrooms, bell pepper, avocado, 1/2 cup black beans',
            carbs: 43,
            calories: 400,
            protein: 22,
            fat: 18,
            image: 'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Tuna Sandwich Plus',
            portion: '2 slices whole wheat bread, 3 oz tuna, veggies, 1/2 apple',
            carbs: 43,
            calories: 450,
            protein: 28,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Unsweetened Kefir',
              portion: '1 cup kefir',
              carbs: 12,
              calories: 110,
              protein: 9,
              fat: 2,
              image: 'https://images.unsplash.com/photo-1576092768241-d46814a7b662?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Peanuts & Carrots',
              portion: '20 peanuts, 1 cup carrots',
              carbs: 15,
              calories: 140,
              protein: 6,
              fat: 8,
              image: 'https://images.unsplash.com/photo-1608032081698-45a9327697b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Pork with Asparagus Plus',
            portion: '3 oz pork, 1/2 cup succotash, cornbread, 1 cup asparagus, pineapple',
            carbs: 47,
            calories: 500,
            protein: 28,
            fat: 18,
            image: 'https://images.unsplash.com/photo-1614961774521-8436d56ed71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Thursday
          breakfast: {
            name: 'Sweet Potato Toast Plus',
            portion: '2 slices sweet potato, 1 oz goat cheese, spinach, flaxseed',
            carbs: 44,
            calories: 350,
            protein: 14,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Chicken & Cauliflower Plus',
            portion: '3 oz chicken, 1.5 cups cauliflower, 1 cup strawberries',
            carbs: 23,
            calories: 320,
            protein: 22,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1592415486689-125c6a2f0372?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Yogurt with Banana',
              portion: '1 cup Greek yogurt, 1/2 banana',
              carbs: 15,
              calories: 150,
              protein: 12,
              fat: 2,
              image: 'https://images.unsplash.com/photo-1519733870-f96e3c731138?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Celery with Peanut Butter',
              portion: '1 cup celery, 1.5 tsp peanut butter',
              carbs: 6,
              calories: 100,
              protein: 4,
              fat: 6,
              image: 'https://images.unsplash.com/photo-1612293518798-9b9f9f6a0e73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Quinoa with Tofu Plus',
            portion: '2/3 cup quinoa, 8 oz tofu, bok choy, broccoli, kiwi',
            carbs: 44,
            calories: 480,
            protein: 28,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1516901121982-8ba7a9978468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Friday
          breakfast: {
            name: 'High Fiber Cereal Plus',
            portion: '1/3 cup Grape-Nuts, 1/2 cup blueberries, almond milk',
            carbs: 41,
            calories: 350,
            protein: 10,
            fat: 8,
            image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a33c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Spinach Salad Plus',
            portion: '2 cups spinach, 1 oz cheese, boiled egg, grapes, chickpeas',
            carbs: 47,
            calories: 420,
            protein: 22,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Celery with Peanut Butter',
              portion: '1 cup celery, 1 tbsp peanut butter',
              carbs: 6,
              calories: 120,
              protein: 5,
              fat: 8,
              image: 'https://images.unsplash.com/photo-1612293518798-9b9f9f6a0e73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Vegetable Juice & Olives',
              portion: '1/2 cup vegetable juice, 10 olives',
              carbs: 24,
              calories: 140,
              protein: 2,
              fat: 10,
              image: 'https://images.unsplash.com/photo-1607196636299-6b2b414c0253?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Salmon with Baked Potato Plus',
            portion: '3 oz salmon, 1 medium baked potato, 1.5 cups asparagus',
            carbs: 39,
            calories: 480,
            protein: 30,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Saturday
          breakfast: {
            name: 'Greek Yogurt with Fruit Plus',
            portion: '1 cup yogurt, 1/2 banana, 1 cup strawberries, chia seeds',
            carbs: 32,
            calories: 320,
            protein: 20,
            fat: 10,
            image: 'https://images.unsplash.com/photo-1490730141103-6fd004a053d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Black Bean Tacos Plus',
            portion: '2 corn tortillas, 1/2 cup black beans, 1 oz cheese, avocado, coleslaw',
            carbs: 55,
            calories: 480,
            protein: 22,
            fat: 20,
            image: 'https://images.unsplash.com/photo-1591351261199-d7d3d1c0a848?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Veggies with Hummus',
              portion: '1 cherry tomato, 10 baby carrots, 2 tbsp hummus',
              carbs: 14,
              calories: 120,
              protein: 5,
              fat: 6,
              image: 'https://images.unsplash.com/photo-1608032081698-45a9327697b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Avocado with Hot Sauce',
              portion: '1/2 small avocado, hot sauce',
              carbs: 9,
              calories: 120,
              protein: 2,
              fat: 10,
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Beef with Broccoli Plus',
            portion: '2 oz beef, 1/2 baked potato, 1.5 cups broccoli, 3/4 cup strawberries',
            carbs: 48,
            calories: 450,
            protein: 26,
            fat: 18,
            image: 'https://images.unsplash.com/photo-1560717845-968823ef8671?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
        { // Sunday
          breakfast: {
            name: 'Chocolate Peanut Oatmeal Plus',
            portion: '1/2 cup oatmeal, protein powder, 1.5 tbsp peanut butter, chia seeds',
            carbs: 21,
            calories: 380,
            protein: 24,
            fat: 16,
            image: 'https://images.unsplash.com/photo-1517673400267-0251442c1699?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          lunch: {
            name: 'Lentil Pita Pocket Plus',
            portion: '1 small pita, 1/2 cup lentils, veggies, 3 tbsp dressing',
            carbs: 30,
            calories: 400,
            protein: 20,
            fat: 12,
            image: 'https://images.unsplash.com/photo-1593255485298-5c1654ab7838?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          snacks: [
            {
              name: 'Apple with Pumpkin Seeds',
              portion: '1 medium apple, 1 oz pumpkin seeds',
              carbs: 26,
              calories: 200,
              protein: 8,
              fat: 10,
              image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Pistachios & Jicama',
              portion: '16 pistachios, 1 cup jicama',
              carbs: 15,
              calories: 140,
              protein: 5,
              fat: 8,
              image: 'https://images.unsplash.com/photo-1608746062547-c4a5a2c8d9cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            },
          ],
          dinner: {
            name: 'Shrimp with Peas Plus',
            portion: '3 oz shrimp, 1 cup peas, 1/2 cup beets, Swiss chard',
            carbs: 39,
            calories: 420,
            protein: 28,
            fat: 14,
            image: 'https://images.unsplash.com/photo-1519996409908-6d1bdce0f2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        },
      ],
    },
  }), []);

  const getCaloriePlan = useMemo(() => {
    if (!nutrition?.energy) return 1600;
    return nutrition.energy <= 1400 ? 1200 : 1600;
  }, [nutrition]);

  const scaleMeals = (meals, targetCalories, baseCalories) => {
    if (!meals || !targetCalories || !baseCalories) return meals;
    const scaleFactor = targetCalories / baseCalories;
    return Array.isArray(meals)
      ? meals.map(meal => scaleSingleMeal(meal, scaleFactor))
      : scaleSingleMeal(meals, scaleFactor);
  };

  const scaleSingleMeal = (meal, scaleFactor) => ({
    ...meal,
    calories: Math.round(meal.calories * scaleFactor),
    carbs: Math.round(meal.carbs * scaleFactor),
    protein: Math.round(meal.protein * scaleFactor),
    fat: Math.round(meal.fat * scaleFactor),
  });

  const mealPlan = useMemo(() => {
    try {
      if (!nutrition || !getCaloriePlan) return null;
      const basePlan = SAMPLE_MEAL_PLANS[getCaloriePlan];
      if (!basePlan) return null;

      const targetCalories = nutrition.energy || 1600;
      const activityFactor = { Low: 0.95, Moderate: 1, High: 1.05 }[ActivityLevel] || 1;

      return basePlan.days.map(day => ({
        ...day,
        meals: Object.entries(day).reduce((acc, [mealType, meal]) => {
          acc[mealType] = scaleMeals(meal, targetCalories * activityFactor, getCaloriePlan);
          return acc;
        }, {}),
      }));
    } catch (error) {
      console.error('Error generating meal plan:', error);
      return null;
    }
  }, [nutrition, getCaloriePlan, ActivityLevel]);

  const toggleDay = dayIndex => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  if (!mealPlan) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-4 flex items-center space-x-3 ${darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-100'} rounded-md`}
      >
        <Utensils className="w-5 h-5" />
        <p>Generating personalized meal plan...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mx-auto px-4 py-8 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'} transition-all duration-300`}
    >
      <div className="relative mb-6">
        <img
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Meal Plan Banner"
          className="w-full h-40 object-cover rounded-lg opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Utensils className="w-10 h-10 text-white" />
            <h2 className="text-3xl font-bold text-white drop-shadow-md">7-Day Meal Plan</h2>
          </div>
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
        <div className="flex items-center space-x-3 mb-4">
          <Utensils className="w-6 h-6 text-blue-500 dark:text-blue-300" />
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300">
            Personalized Meal Plan ({getCaloriePlan} Calorie Base)
          </h3>
        </div>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          Tailored meals for your{' '}
          <span className="font-medium">{ActivityLevel}</span> activity level and{' '}
          <span className="font-medium">{isDiabetic ? 'diabetic' : 'non-diabetic'}</span> status.
        </p>

        <div className="space-y-4">
          {mealPlan.map((day, index) => (
            <motion.div
              key={DAYS[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}
            >
              <button
                onClick={() => toggleDay(index)}
                className={`w-full flex justify-between items-center p-4 text-left text-lg font-medium ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                } hover:bg-opacity-80 transition-colors duration-200`}
              >
                {DAYS[index]}
                {expandedDay === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedDay === index && (
                <div className="p-4 space-y-4">
                  {Object.entries(day.meals).map(([mealType, meal], mealIndex) => (
                    <motion.div
                      key={mealType}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: mealIndex * 0.1 }}
                      className={`bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow duration-300 ${
                        darkMode ? 'border-gray-600' : 'border-gray-200'
                      } border`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="w-full sm:w-1/4 h-32 rounded-lg overflow-hidden"
                      >
                        <img
                          src={Array.isArray(meal) ? meal[0].image : meal.image}
                          alt={`${mealType} Meal`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`rounded-full p-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                            {mealType === 'snacks' ? (
                              <Apple className="w-5 h-5 text-green-500 dark:text-green-300" />
                            ) : (
                              <Utensils className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{mealType}</h4>
                        </div>
                        {Array.isArray(meal) ? (
                          meal.map((snack, i) => (
                            <div key={i} className="mb-2">
                              <p className="font-medium">{snack.name}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {snack.portion}
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1 text-sm">
                                <div className="group relative">
                                  <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    {snack.calories} Cal
                                  </span>
                                  <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                    Calories
                                  </span>
                                </div>
                                <div className="group relative">
                                  <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    {snack.carbs}g Carbs
                                  </span>
                                  <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                    Carbohydrates
                                  </span>
                                </div>
                                <div className="group relative">
                                  <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    {snack.protein}g Protein
                                  </span>
                                  <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                    Protein
                                  </span>
                                </div>
                                <div className="group relative">
                                  <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                    {snack.fat}g Fat
                                  </span>
                                  <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                    Fat
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>
                            <p className="font-medium">{meal.name}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {meal.portion}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1 text-sm">
                              <div className="group relative">
                                <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  {meal.calories} Cal
                                </span>
                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                  Calories
                                </span>
                              </div>
                              <div className="group relative">
                                <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  {meal.carbs}g Carbs
                                </span>
                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                  Carbohydrates
                                </span>
                              </div>
                              <div className="group relative">
                                <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  {meal.protein}g Protein
                                </span>
                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                  Protein
                                </span>
                              </div>
                              <div className="group relative">
                                <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  {meal.fat}g Fat
                                </span>
                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 z-10">
                                  Fat
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlan;