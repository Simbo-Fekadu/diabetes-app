import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DietPlan = ({ recommendationData, predictionData, darkMode }) => {
  // Error boundary for missing props
  if (!recommendationData || !predictionData) {
    return (
      <div className={`p-4 rounded-md ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-50 text-red-800'}`}>
        Missing required data for meal plan generation
      </div>
    );
  }

  const { nutrition } = recommendationData;
  const { prediction, ActivityLevel = 'Moderate' } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';
  const [expandedDay, setExpandedDay] = useState(null);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Full meal plans data structure
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
            fat: 12
          },
          lunch: {
            name: 'Mexican Bowl',
            portion: '2/3 cup pinto beans, 1 cup spinach, 1/4 cup tomatoes, 1/4 cup peppers, 1 oz cheese, 1 tbsp salsa',
            carbs: 30,
            calories: 350,
            protein: 18,
            fat: 10
          },
          snack: {
            name: 'Carrots & Hummus',
            portion: '20 baby carrots, 2 tbsp hummus',
            carbs: 21,
            calories: 150,
            protein: 5,
            fat: 8
          },
          dinner: {
            name: 'Lentil Pasta with Turkey',
            portion: '1 cup lentil penne, 2 oz turkey, 1.5 cups veggie tomato sauce',
            carbs: 35,
            calories: 400,
            protein: 22,
            fat: 15
          }
        },
        { // Tuesday
          breakfast: {
            name: 'Blueberry Oatmeal',
            portion: '3/4 cup blueberries, 1 cup oatmeal, 1 oz almonds, 1 tsp chia seeds',
            carbs: 34,
            calories: 320,
            protein: 12,
            fat: 14
          },
          lunch: {
            name: 'Chicken Avocado Salad',
            portion: '1/2 cup chickpeas, 2 cups spinach, 2 oz chicken, 1/2 avocado, 1/2 cup strawberries',
            carbs: 52,
            calories: 380,
            protein: 24,
            fat: 18
          },
          snack: {
            name: 'Peach Cottage Cheese',
            portion: '1 small peach, 1/3 cup 2% cottage cheese',
            carbs: 16,
            calories: 120,
            protein: 8,
            fat: 3
          },
          dinner: {
            name: 'Mediterranean Couscous',
            portion: '2/3 cup couscous, 1/2 cup eggplant, sundried tomatoes, olives, cucumber',
            carbs: 38,
            calories: 380,
            protein: 15,
            fat: 12
          }
        },
        { // Wednesday
          breakfast: {
            name: 'Veggie Omelet with Black Beans',
            portion: '2 eggs, spinach, mushrooms, bell pepper, avocado, 1/2 cup black beans',
            carbs: 34,
            calories: 350,
            protein: 20,
            fat: 16
          },
          lunch: {
            name: 'Tuna Sandwich',
            portion: '2 slices whole wheat bread, 2 oz tuna, veggies, 1/2 apple',
            carbs: 40,
            calories: 400,
            protein: 25,
            fat: 10
          },
          snack: {
            name: 'Unsweetened Kefir',
            portion: '1 cup kefir',
            carbs: 12,
            calories: 110,
            protein: 9,
            fat: 2
          },
          dinner: {
            name: 'Pork with Asparagus',
            portion: '2 oz pork, 1/2 cup succotash, 1 cup asparagus, 1/2 cup pineapple',
            carbs: 34,
            calories: 380,
            protein: 22,
            fat: 14
          }
        },
        { // Thursday
          breakfast: {
            name: 'Sweet Potato Toast',
            portion: '2 slices sweet potato, 1 oz goat cheese, spinach, flaxseed',
            carbs: 44,
            calories: 300,
            protein: 12,
            fat: 10
          },
          lunch: {
            name: 'Chicken & Cauliflower',
            portion: '2 oz chicken, 1 cup cauliflower, 1 cup strawberries',
            carbs: 23,
            calories: 280,
            protein: 18,
            fat: 8
          },
          snack: {
            name: 'Yogurt with Banana',
            portion: '1 cup Greek yogurt, 1/2 banana',
            carbs: 15,
            calories: 150,
            protein: 12,
            fat: 2
          },
          dinner: {
            name: 'Quinoa with Tofu',
            portion: '2/3 cup quinoa, 8 oz tofu, bok choy, broccoli, kiwi',
            carbs: 44,
            calories: 420,
            protein: 24,
            fat: 12
          }
        },
        { // Friday
          breakfast: {
            name: 'High Fiber Cereal',
            portion: '1/3 cup Grape-Nuts, 1/2 cup blueberries, almond milk',
            carbs: 41,
            calories: 300,
            protein: 8,
            fat: 6
          },
          lunch: {
            name: 'Spinach Salad',
            portion: '2 cups spinach, 1 oz cheese, boiled egg, grapes, chickpeas',
            carbs: 47,
            calories: 380,
            protein: 20,
            fat: 14
          },
          snack: {
            name: 'Celery with Peanut Butter',
            portion: '1 cup celery, 1 tbsp peanut butter',
            carbs: 6,
            calories: 120,
            protein: 5,
            fat: 8
          },
          dinner: {
            name: 'Salmon with Baked Potato',
            portion: '2 oz salmon, 1 medium baked potato, 1.5 cups asparagus',
            carbs: 39,
            calories: 400,
            protein: 25,
            fat: 12
          }
        },
        { // Saturday
          breakfast: {
            name: 'Greek Yogurt with Fruit',
            portion: '1 cup yogurt, 1/2 banana, 1 cup strawberries, chia seeds',
            carbs: 32,
            calories: 280,
            protein: 18,
            fat: 8
          },
          lunch: {
            name: 'Black Bean Tacos',
            portion: '2 corn tortillas, 1/3 cup black beans, 1 oz cheese, avocado, coleslaw',
            carbs: 70,
            calories: 420,
            protein: 18,
            fat: 16
          },
          snack: {
            name: 'Veggies with Hummus',
            portion: '1 cherry tomato, 10 baby carrots, 2 tbsp hummus',
            carbs: 14,
            calories: 120,
            protein: 5,
            fat: 6
          },
          dinner: {
            name: 'Beef with Broccoli',
            portion: '2 oz beef, 1/2 baked potato, 1.5 cups broccoli, 3/4 cup strawberries',
            carbs: 41,
            calories: 380,
            protein: 22,
            fat: 14
          }
        },
        { // Sunday
          breakfast: {
            name: 'Chocolate Peanut Oatmeal',
            portion: '1/2 cup oatmeal, protein powder, 1 tbsp peanut butter, chia seeds',
            carbs: 21,
            calories: 320,
            protein: 20,
            fat: 12
          },
          lunch: {
            name: 'Lentil Pita Pocket',
            portion: '1 small pita, 1/2 cup lentils, veggies, 2 tbsp dressing',
            carbs: 30,
            calories: 350,
            protein: 18,
            fat: 10
          },
          snack: {
            name: 'Grapefruit with Almonds',
            portion: '1 small grapefruit, 1 oz almonds',
            carbs: 26,
            calories: 180,
            protein: 6,
            fat: 12
          },
          dinner: {
            name: 'Shrimp with Peas',
            portion: '2 oz shrimp, 1 cup peas, 1/2 cup beets, Swiss chard',
            carbs: 39,
            calories: 350,
            protein: 24,
            fat: 10
          }
        }
      ]
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
            fat: 12
          },
          lunch: {
            name: 'Mexican Bowl with Rice',
            portion: '1/3 cup brown rice, 2/3 cup baked beans, 1 cup spinach, veggies',
            carbs: 43,
            calories: 450,
            protein: 22,
            fat: 14
          },
          snacks: [
            {
              name: 'Carrots & Hummus',
              portion: '20 baby carrots, 2 tbsp hummus',
              carbs: 21,
              calories: 150,
              protein: 5,
              fat: 8
            },
            {
              name: 'Cucumber & Tahini',
              portion: '1 cup cucumber, 2 tsp tahini',
              carbs: 3,
              calories: 100,
              protein: 2,
              fat: 5
            }
          ],
          dinner: {
            name: 'Lentil Pasta with Turkey',
            portion: '1 cup lentil penne, 2 oz turkey, 1.5 cups veggie tomato sauce',
            carbs: 35,
            calories: 500,
            protein: 28,
            fat: 18
          }
        },
        { // Tuesday
          breakfast: {
            name: 'Blueberry Oatmeal Plus',
            portion: '3/4 cup blueberries, 1/2 cup oatmeal, 1 oz almonds, 2 tsp chia seeds',
            carbs: 39,
            calories: 350,
            protein: 14,
            fat: 16
          },
          lunch: {
            name: 'Chicken Avocado Salad',
            portion: '1/2 cup chickpeas, 2 cups spinach, 3 oz chicken, 1/2 avocado, strawberries',
            carbs: 49,
            calories: 450,
            protein: 28,
            fat: 22
          },
          snacks: [
            {
              name: 'Peach Cottage Cheese',
              portion: '1 small peach, 1/3 cup cottage cheese',
              carbs: 16,
              calories: 140,
              protein: 10,
              fat: 4
            },
            {
              name: 'Apple with Almond Butter',
              portion: '1 apple, 2 tsp almond butter',
              carbs: 16,
              calories: 160,
              protein: 3,
              fat: 7
            }
          ],
          dinner: {
            name: 'Mediterranean Couscous',
            portion: '2/3 cup couscous, eggplant, sundried tomatoes, olives, cucumber',
            carbs: 38,
            calories: 450,
            protein: 18,
            fat: 16
          }
        },
        { // Wednesday
          breakfast: {
            name: 'Veggie Omelet with Black Beans',
            portion: '2 eggs, spinach, mushrooms, bell pepper, avocado, 1/2 cup black beans',
            carbs: 43,
            calories: 400,
            protein: 22,
            fat: 18
          },
          lunch: {
            name: 'Tuna Sandwich Plus',
            portion: '2 slices whole wheat bread, 3 oz tuna, veggies, 1/2 apple',
            carbs: 43,
            calories: 450,
            protein: 28,
            fat: 12
          },
          snacks: [
            {
              name: 'Unsweetened Kefir',
              portion: '1 cup kefir',
              carbs: 12,
              calories: 110,
              protein: 9,
              fat: 2
            },
            {
              name: 'Peanuts & Carrots',
              portion: '20 peanuts, 1 cup carrots',
              carbs: 15,
              calories: 140,
              protein: 6,
              fat: 8
            }
          ],
          dinner: {
            name: 'Pork with Asparagus Plus',
            portion: '3 oz pork, 1/2 cup succotash, cornbread, 1 cup asparagus, pineapple',
            carbs: 47,
            calories: 500,
            protein: 28,
            fat: 18
          }
        },
        { // Thursday
          breakfast: {
            name: 'Sweet Potato Toast Plus',
            portion: '2 slices sweet potato, 1 oz goat cheese, spinach, flaxseed',
            carbs: 44,
            calories: 350,
            protein: 14,
            fat: 12
          },
          lunch: {
            name: 'Chicken & Cauliflower Plus',
            portion: '3 oz chicken, 1.5 cups cauliflower, 1 cup strawberries',
            carbs: 23,
            calories: 320,
            protein: 22,
            fat: 10
          },
          snacks: [
            {
              name: 'Yogurt with Banana',
              portion: '1 cup Greek yogurt, 1/2 banana',
              carbs: 15,
              calories: 150,
              protein: 12,
              fat: 2
            },
            {
              name: 'Celery with Peanut Butter',
              portion: '1 cup celery, 1.5 tsp peanut butter',
              carbs: 6,
              calories: 100,
              protein: 4,
              fat: 6
            }
          ],
          dinner: {
            name: 'Quinoa with Tofu Plus',
            portion: '2/3 cup quinoa, 8 oz tofu, bok choy, broccoli, kiwi',
            carbs: 44,
            calories: 480,
            protein: 28,
            fat: 16
          }
        },
        { // Friday
          breakfast: {
            name: 'High Fiber Cereal Plus',
            portion: '1/3 cup Grape-Nuts, 1/2 cup blueberries, almond milk',
            carbs: 41,
            calories: 350,
            protein: 10,
            fat: 8
          },
          lunch: {
            name: 'Spinach Salad Plus',
            portion: '2 cups spinach, 1 oz cheese, boiled egg, grapes, chickpeas',
            carbs: 47,
            calories: 420,
            protein: 22,
            fat: 16
          },
          snacks: [
            {
              name: 'Celery with Peanut Butter',
              portion: '1 cup celery, 1 tbsp peanut butter',
              carbs: 6,
              calories: 120,
              protein: 5,
              fat: 8
            },
            {
              name: 'Vegetable Juice & Olives',
              portion: '1/2 cup vegetable juice, 10 olives',
              carbs: 24,
              calories: 140,
              protein: 2,
              fat: 10
            }
          ],
          dinner: {
            name: 'Salmon with Baked Potato Plus',
            portion: '3 oz salmon, 1 medium baked potato, 1.5 cups asparagus',
            carbs: 39,
            calories: 480,
            protein: 30,
            fat: 16
          }
        },
        { // Saturday
          breakfast: {
            name: 'Greek Yogurt with Fruit Plus',
            portion: '1 cup yogurt, 1/2 banana, 1 cup strawberries, chia seeds',
            carbs: 32,
            calories: 320,
            protein: 20,
            fat: 10
          },
          lunch: {
            name: 'Black Bean Tacos Plus',
            portion: '2 corn tortillas, 1/2 cup black beans, 1 oz cheese, avocado, coleslaw',
            carbs: 55,
            calories: 480,
            protein: 22,
            fat: 20
          },
          snacks: [
            {
              name: 'Veggies with Hummus',
              portion: '1 cherry tomato, 10 baby carrots, 2 tbsp hummus',
              carbs: 14,
              calories: 120,
              protein: 5,
              fat: 6
            },
            {
              name: 'Avocado with Hot Sauce',
              portion: '1/2 small avocado, hot sauce',
              carbs: 9,
              calories: 120,
              protein: 2,
              fat: 10
            }
          ],
          dinner: {
            name: 'Beef with Broccoli Plus',
            portion: '2 oz beef, 1/2 baked potato, 1.5 cups broccoli, 3/4 cup strawberries',
            carbs: 48,
            calories: 450,
            protein: 26,
            fat: 18
          }
        },
        { // Sunday
          breakfast: {
            name: 'Chocolate Peanut Oatmeal Plus',
            portion: '1/2 cup oatmeal, protein powder, 1.5 tbsp peanut butter, chia seeds',
            carbs: 21,
            calories: 380,
            protein: 24,
            fat: 16
          },
          lunch: {
            name: 'Lentil Pita Pocket Plus',
            portion: '1 small pita, 1/2 cup lentils, veggies, 3 tbsp dressing',
            carbs: 30,
            calories: 400,
            protein: 20,
            fat: 12
          },
          snacks: [
            {
              name: 'Apple with Pumpkin Seeds',
              portion: '1 medium apple, 1 oz pumpkin seeds',
              carbs: 26,
              calories: 200,
              protein: 8,
              fat: 10
            },
            {
              name: 'Pistachios & Jicama',
              portion: '16 pistachios, 1 cup jicama',
              carbs: 15,
              calories: 140,
              protein: 5,
              fat: 8
            }
          ],
          dinner: {
            name: 'Shrimp with Peas Plus',
            portion: '3 oz shrimp, 1 cup peas, 1/2 cup beets, Swiss chard',
            carbs: 39,
            calories: 420,
            protein: 28,
            fat: 14
          }
        }
      ]
    }
  }), []);

  const getCaloriePlan = useMemo(() => {
    if (!nutrition?.energy) return 1600; // Default if no nutrition data
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
    fat: Math.round(meal.fat * scaleFactor)
  });

  const mealPlan = useMemo(() => {
    try {
      if (!nutrition || !getCaloriePlan) return null;
      
      const basePlan = SAMPLE_MEAL_PLANS[getCaloriePlan];
      if (!basePlan) return null;

      const targetCalories = nutrition.energy || 1600;
      const activityFactor = { 
        Low: 0.95, 
        Moderate: 1, 
        High: 1.05 
      }[ActivityLevel] || 1;
      
      return basePlan.days.map(day => ({
        ...day,
        meals: Object.entries(day).reduce((acc, [mealType, meal]) => {
          acc[mealType] = scaleMeals(
            meal, 
            targetCalories * activityFactor, 
            getCaloriePlan
          );
          return acc;
        }, {})
      }));
    } catch (error) {
      console.error("Error generating meal plan:", error);
      return null;
    }
  }, [nutrition, getCaloriePlan, ActivityLevel]);

  const toggleDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  if (!mealPlan) {
    return (
      <div className={`p-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Generating personalized meal plan...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        7-Day Meal Plan ({getCaloriePlan} Calorie Base)
      </h3>
      
      {mealPlan.map((day, index) => (
        <div key={DAYS[index]} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => toggleDay(index)}
            className={`w-full flex justify-between items-center py-3 text-left text-lg font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {DAYS[index]}
            {expandedDay === index ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          
          {expandedDay === index && (
            <div className={`pl-4 pb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {Object.entries(day.meals).map(([mealType, meal]) => (
                <div key={mealType} className="mb-4">
                  <h4 className="font-medium capitalize">{mealType}</h4>
                  {Array.isArray(meal) ? (
                    meal.map((snack, i) => (
                      <div key={i} className="ml-2">
                        <p>{snack.name} ({snack.portion})</p>
                        <p className="text-sm">
                          Cals: {snack.calories} | Carbs: {snack.carbs}g | Protein: {snack.protein}g | Fat: {snack.fat}g
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="ml-2">
                      <p>{meal.name} ({meal.portion})</p>
                      <p className="text-sm">
                        Cals: {meal.calories} | Carbs: {meal.carbs}g | Protein: {meal.protein}g | Fat: {meal.fat}g
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DietPlan;