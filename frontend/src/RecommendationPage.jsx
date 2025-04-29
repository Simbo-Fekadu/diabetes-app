import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Overview from './Overview';
import NutritionRecommendation from './NutritionRecommendation';
import DietPlan from './DietPlan';
import Exercises from './Exercises';
import Tips from './Tips';

const RecommendationPage = ({ predictionData, darkMode, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'dietplan', label: 'Diet Plan' },
    { id: 'exercises', label: 'Exercises' },
    { id: 'tips', label: 'Tips' },
  ];

  return (
    <div className={`p-6 max-w-4xl mx-auto rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <button onClick={onBack} className={`flex items-center mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Prediction
      </button>

      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Your Health Recommendations
      </h2>

      {/* Tab Navigation */}
      <div className={`flex border-b mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? darkMode
                  ? 'border-b-2 border-blue-300 text-blue-300'
                  : 'border-b-2 border-blue-500 text-blue-500'
                : darkMode
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <Overview predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'nutrition' && (
        <NutritionRecommendation predictionData={predictionData} darkMode={darkMode} />
      )}
      {(activeTab === 'dietplan' || activeTab === 'exercises' || activeTab === 'tips') && loading && (
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
      {(activeTab === 'dietplan' || activeTab === 'exercises' || activeTab === 'tips') && error && (
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
      {activeTab === 'dietplan' && !loading && !error && (
        <DietPlan recommendationData={nutritionData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'exercises' && !loading && !error && (
        <Exercises recommendationData={nutritionData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'tips' && !loading && !error && (
        <Tips recommendationData={nutritionData} predictionData={predictionData} darkMode={darkMode} />
      )}
    </div>
  );
};

export default RecommendationPage;