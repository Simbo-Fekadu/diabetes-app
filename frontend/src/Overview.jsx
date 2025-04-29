import React from 'react';

const Overview = ({ recommendationData, predictionData, darkMode }) => {
  const { bmi, tdee, nutrition } = recommendationData || {};
  const { prediction, glucose, blood_pressure, risk_percentage, diet_suggestion } = predictionData?.result || {};

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Health Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prediction</h4>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{prediction || 'N/A'}</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Risk: {risk_percentage ? `${risk_percentage.toFixed(1)}%` : 'N/A'}</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Glucose: {glucose || 'N/A'} mg/dL</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Blood Pressure: {blood_pressure || 'N/A'} mmHg</p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Health Metrics</h4>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>BMI: {bmi ? bmi.toFixed(1) : 'N/A'}</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>TDEE: {tdee ? tdee.toFixed(0) : 'N/A'} kcal/day</p>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nutrition Targets</h4>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Calories: {nutrition?.energy ? nutrition.energy.toFixed(0) : 'N/A'} kcal</p>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Carbs: {nutrition?.carbs ? nutrition.carbs.toFixed(0) : 'N/A'} g</p>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Protein: {nutrition?.protein ? nutrition.protein.toFixed(0) : 'N/A'} g</p>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fat: {nutrition?.fat ? nutrition.fat.toFixed(0) : 'N/A'} g</p>
      </div>

      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Diet Suggestion</h4>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{diet_suggestion || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Overview;