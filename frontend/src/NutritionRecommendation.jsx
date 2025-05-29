import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NutritionRecommendation = ({ predictionData, darkMode }) => {
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const heightInCm = parseFloat(predictionData.Height);
        const heightInMeters = heightInCm / 100;

        const diabeticStatus =
          predictionData.result.prediction === 'Diabetic' ||
          predictionData.result.prediction === 'Borderline Risk';

        const response = await fetch('http://127.0.0.1:5000/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            Age: predictionData.Age,
            Height: heightInMeters,
            Weight: predictionData.Weight,
            Sex: predictionData.Sex,
            ActivityLevel: predictionData.ActivityLevel,
            Goal: predictionData.Goal,
            Diabetic: diabeticStatus.toString(),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setNutritionData(data);
        } else {
          setError(data.error || 'Failed to fetch recommendations');
        }
      } catch (error) {
        setError('Error fetching recommendations: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (predictionData?.result) {
      fetchRecommendations();
    }
  }, [predictionData?.result?.prediction]);

  const { prediction } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';

  // Determine BMI status badge
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: darkMode ? 'bg-blue-800 text-blue-100' : 'bg-blue-500 text-white' };
    if (bmi >= 18.5 && bmi < 25) return { text: 'Normal', color: darkMode ? 'bg-green-800 text-green-100' : 'bg-green-500 text-white' };
    if (bmi >= 25 && bmi < 30) return { text: 'Overweight', color: darkMode ? 'bg-yellow-800 text-yellow-100' : 'bg-yellow-500 text-white' };
    return { text: 'Obese', color: darkMode ? 'bg-red-800 text-red-100' : 'bg-red-500 text-white' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} transition-all duration-300`}
    >
      <div className="relative mb-6">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Nutrition Banner"
          className="w-full h-40 object-cover rounded-lg opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3378/3378475.png"
              alt="Nutrition Icon"
              className="w-10 h-10"
            />
            <h3 className="text-3xl font-bold text-white drop-shadow-md">Nutrition Recommendations</h3>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-6 p-4 rounded-md flex items-center space-x-3 ${
            darkMode
              ? 'bg-red-900 text-red-100 border border-red-800'
              : 'bg-red-50 text-red-800 border border-red-200'
          } transition-all duration-300`}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
            />
          </svg>
          <p className="text-base">{error}</p>
        </motion.div>
      )}

      {nutritionData && !loading && !error && (
        <div className="space-y-6">
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your daily nutrition targets based on your{' '}
            <span className="font-semibold">{isDiabetic ? 'diabetic' : 'non-diabetic'}</span> profile and activity level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2921/2921227.png"
                  alt="BMI Icon"
                  className="w-6 h-6"
                />
                <h4 className="text-lg font-semibold">Your BMI</h4>
              </div>
              <div className="group relative">
                <p className={`text-xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  {nutritionData.bmi} <span className={`inline-block px-3 py-1 rounded-full text-sm ${getBMIStatus(nutritionData.bmi).color}`}>
                    {getBMIStatus(nutritionData.bmi).text}
                  </span>
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Body Mass Index (18.5-24.9 is normal)
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="TDEE Icon"
                  className="w-6 h-6"
                />
                <h4 className="text-lg font-semibold">Total Daily Energy Expenditure (TDEE)</h4>
              </div>
              <div className="group relative">
                <p className={`text-xl font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                  {nutritionData.tdee} kcal
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Estimated daily calorie burn
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
                alt="Nutrition Targets Icon"
                className="w-6 h-6"
              />
              <h4 className="text-lg font-semibold">Daily Nutrition Targets</h4>
            </div>
            <div className="space-y-4">
              <div className="group relative">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutritionData.nutrition.energy / 3000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  {nutritionData.nutrition.energy} kcal
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Daily calorie intake target
                </span>
              </div>
              <div className="group relative">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carbohydrates</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutritionData.nutrition.carbs / 400) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                  {nutritionData.nutrition.carbs} g
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Daily carbohydrate intake target
                </span>
              </div>
              <div className="group relative">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protein</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutritionData.nutrition.protein / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                  {nutritionData.nutrition.protein} g
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Daily protein intake target
                </span>
              </div>
              <div className="group relative">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fat</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-yellow-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutritionData.nutrition.fat / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                  {nutritionData.nutrition.fat} g
                </p>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
                  Daily fat intake target
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default NutritionRecommendation;