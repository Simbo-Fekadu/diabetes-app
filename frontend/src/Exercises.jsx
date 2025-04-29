import React from 'react';

const Exercises = ({ recommendationData, predictionData, darkMode }) => {
  const { ActivityLevel } = predictionData || {};
  const isDiabetic = predictionData?.result?.prediction === 'Diabetic' || predictionData?.result?.prediction === 'Borderline Risk';

  const exercisePlans = {
    Low: isDiabetic
      ? [
          { name: 'Walking', duration: '20-30 minutes', frequency: '5 days/week', description: 'A gentle walk to improve circulation.' },
          { name: 'Chair Yoga', duration: '15 minutes', frequency: '3 days/week', description: 'Low-impact stretching for flexibility.' },
        ]
      : [
          { name: 'Brisk Walking', duration: '30 minutes', frequency: '5 days/week', description: 'Increase heart rate with a faster pace.' },
          { name: 'Light Stretching', duration: '10 minutes', frequency: 'Daily', description: 'Improve flexibility and reduce stiffness.' },
        ],
    Moderate: isDiabetic
      ? [
          { name: 'Swimming', duration: '30 minutes', frequency: '3 days/week', description: 'Low-impact cardio to manage blood sugar.' },
          { name: 'Strength Training', duration: '20 minutes', frequency: '2 days/week', description: 'Use light weights to build muscle.' },
        ]
      : [
          { name: 'Jogging', duration: '30 minutes', frequency: '4 days/week', description: 'Moderate cardio for overall fitness.' },
          { name: 'Bodyweight Exercises', duration: '20 minutes', frequency: '3 days/week', description: 'Squats, push-ups, and lunges.' },
        ],
    High: isDiabetic
      ? [
          { name: 'Cycling', duration: '45 minutes', frequency: '4 days/week', description: 'Cardio to improve endurance.' },
          { name: 'Resistance Training', duration: '30 minutes', frequency: '3 days/week', description: 'Moderate weights for strength.' },
        ]
      : [
          { name: 'Running', duration: '45 minutes', frequency: '5 days/week', description: 'High-intensity cardio for fitness.' },
          { name: 'HIIT', duration: '20 minutes', frequency: '3 days/week', description: 'High-intensity interval training.' },
        ],
  };

  const exercises = exercisePlans[ActivityLevel] || exercisePlans['Low'];

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Exercise Recommendations</h3>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Suggested exercises based on your {ActivityLevel || 'Low'} activity level and {isDiabetic ? 'diabetic' : 'non-diabetic'} status.
      </p>

      <div className="space-y-3">
        {exercises.map((exercise, index) => (
          <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exercise.name}</h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Duration: {exercise.duration}</p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Frequency: {exercise.frequency}</p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;