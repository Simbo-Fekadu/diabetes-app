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
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} transition-all duration-300`}>
      <div className="flex items-center space-x-3 mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Health Overview Icon"
          className="w-8 h-8"
        />
        <h3 className="text-2xl font-bold">Health Overview</h3>
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
        <div
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
        </div>
      )}

      {recommendationData && !loading && !error && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2921/2921227.png"
                  alt="Prediction Icon"
                  className="w-6 h-6"
                />
                <h4 className="text-lg font-semibold">Prediction</h4>
              </div>
              <div className="space-y-2">
                <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  Status: {prediction || 'N/A'}
                </p>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Risk Percentage</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                    <div
                      className="bg-red-500 h-4 rounded-full"
                      style={{ width: `${risk_percentage || 0}%` }}
                    ></div>
                  </div>
                  <p className={`mt-1 font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                    {risk_percentage ? `${risk_percentage.toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Glucose: {glucose || 'N/A'} mg/dL
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Blood Pressure: {blood_pressure || 'N/A'} mmHg
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="Health Metrics Icon"
                  className="w-6 h-6"
                />
                <h4 className="text-lg font-semibold">Health Metrics</h4>
              </div>
              <div className="space-y-2">
                <p className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                  BMI: {bmi ? bmi.toFixed(1) : 'N/A'}
                </p>
                <p className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                  TDEE: {tdee ? tdee.toFixed(0) : 'N/A'} kcal/day
                </p>
              </div>
            </div>
          </div>

          <div
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
              <h4 className="text-lg font-semibold">Nutrition Targets</h4>
            </div>
            <div className="space-y-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutrition?.energy || 0) / 3000 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  {nutrition?.energy ? nutrition.energy.toFixed(0) : 'N/A'} kcal
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carbohydrates</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutrition?.carbs || 0) / 400 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                  {nutrition?.carbs ? nutrition.carbs.toFixed(0) : 'N/A'} g
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protein</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutrition?.protein || 0) / 200 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                  {nutrition?.protein ? nutrition.protein.toFixed(0) : 'N/A'} g
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fat</p>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                  <div
                    className="bg-yellow-500 h-4 rounded-full"
                    style={{ width: `${Math.min((nutrition?.fat || 0) / 100 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className={`mt-1 font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                  {nutrition?.fat ? nutrition.fat.toFixed(0) : 'N/A'} g
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3378/3378475.png"
                alt="Diet Suggestion Icon"
                className="w-6 h-6"
              />
              <h4 className="text-lg font-semibold">Diet Suggestion</h4>
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{diet_suggestion || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;