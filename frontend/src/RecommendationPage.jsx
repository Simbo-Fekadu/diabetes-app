import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Overview from './Overview';
import NutritionRecommendation from './NutritionRecommendation';
import DietPlan from './DietPlan';
import Exercises from './Exercises';
import Tips from './Tips';

const RecommendationPage = ({ predictionData, recommendationData, darkMode, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
        <Overview recommendationData={recommendationData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'nutrition' && (
        <NutritionRecommendation recommendationData={recommendationData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'dietplan' && (
        <DietPlan recommendationData={recommendationData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'exercises' && (
        <Exercises recommendationData={recommendationData} predictionData={predictionData} darkMode={darkMode} />
      )}
      {activeTab === 'tips' && (
        <Tips recommendationData={recommendationData} predictionData={predictionData} darkMode={darkMode} />
      )}
    </div>
  );
};

export default RecommendationPage;