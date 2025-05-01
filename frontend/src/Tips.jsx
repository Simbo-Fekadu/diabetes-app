import React from 'react';

const Tips = ({ predictionData, darkMode }) => {
  const { prediction } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';

  const tips = isDiabetic
    ? [
        'Monitor your blood sugar levels regularly and consult your doctor for personalized advice.',
        'Choose low-glycemic index foods to manage blood sugar spikes.',
        'Stay hydrated and avoid sugary drinks.',
        'Incorporate fiber-rich foods like vegetables and legumes to improve digestion and satiety.',
        'Schedule regular check-ups to monitor your health and adjust your diet as needed.',
      ]
    : [
        'Maintain a balanced diet with a variety of whole foods to prevent diabetes risk.',
        'Engage in regular physical activity to keep your weight in a healthy range.',
        'Limit processed foods and added sugars to reduce the risk of developing diabetes.',
        'Get enough sleep to support overall metabolic health.',
        'Stay proactive with annual health screenings to catch any early signs of risk.',
      ];

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Health Tips</h3>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Tips to help you manage or prevent diabetes based on your {isDiabetic ? 'diabetic' : 'non-diabetic'} status.
      </p>

      <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;