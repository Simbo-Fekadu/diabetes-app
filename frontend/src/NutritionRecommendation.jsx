import React, { useState, useEffect } from 'react';

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

        console.log('Fetching recommendations with data:', {
          Age: predictionData.Age,
          Height: heightInMeters,
          Weight: predictionData.Weight,
          Sex: predictionData.Sex,
          ActivityLevel: predictionData.ActivityLevel,
          Goal: predictionData.Goal,
          Diabetic: diabeticStatus,
        });

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

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Nutrition Recommendations
      </h3>

      {loading && (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
        <div
          className={`mb-6 p-4 rounded-md flex items-center space-x-2 ${
            darkMode
              ? 'bg-red-900 text-red-100 border border-red-800'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <svg
            className="h-5 w-5"
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
          <p className="text-sm">{error}</p>
        </div>
      )}

      {nutritionData && !loading && !error && (
        <div className="space-y-6">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Your daily nutrition targets based on your {isDiabetic ? 'diabetic' : 'non-diabetic'} profile and activity level.
          </p>

          <div>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your BMI
            </h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{nutritionData.bmi}</p>
          </div>
          <div>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Total Daily Energy Expenditure (TDEE)
            </h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{nutritionData.tdee} kcal</p>
          </div>
          <div>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Daily Nutrition Targets
            </h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Calories: {nutritionData.nutrition.energy} kcal
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Carbohydrates: {nutritionData.nutrition.carbs} g
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Protein: {nutritionData.nutrition.protein} g
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Fat: {nutritionData.nutrition.fat} g
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionRecommendation;