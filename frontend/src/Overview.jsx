import React, { useState, useEffect } from 'react';

const Overview = ({ predictionData, darkMode }) => {
  const [recommendationData, setRecommendationData] = useState(null);
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
          setRecommendationData(data);
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

  const { bmi, tdee, nutrition } = recommendationData || {};
  const { prediction, glucose, blood_pressure, risk_percentage, diet_suggestion } = predictionData?.result || {};

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Health Overview
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

      {recommendationData && !loading && !error && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Prediction
              </h4>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{prediction || 'N/A'}</p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Risk: {risk_percentage ? `${risk_percentage.toFixed(1)}%` : 'N/A'}
              </p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Glucose: {glucose || 'N/A'} mg/dL
              </p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Blood Pressure: {blood_pressure || 'N/A'} mmHg
              </p>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Health Metrics
              </h4>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                BMI: {bmi ? bmi.toFixed(1) : 'N/A'}
              </p>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                TDEE: {tdee ? tdee.toFixed(0) : 'N/A'} kcal/day
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nutrition Targets
            </h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Calories: {nutrition?.energy ? nutrition.energy.toFixed(0) : 'N/A'} kcal
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Carbs: {nutrition?.carbs ? nutrition.carbs.toFixed(0) : 'N/A'} g
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Protein: {nutrition?.protein ? nutrition.protein.toFixed(0) : 'N/A'} g
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Fat: {nutrition?.fat ? nutrition.fat.toFixed(0) : 'N/A'} g
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Diet Suggestion
            </h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{diet_suggestion || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;