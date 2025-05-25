import React from 'react';
import { LucideActivity, Dumbbell } from 'lucide-react';

const Exercises = ({ predictionData, darkMode }) => {
  const { ActivityLevel, result } = predictionData || {};
  const isDiabetic =
    result?.prediction === 'Diabetic' || result?.prediction === 'Borderline Risk';

  const exercisePlans = {
    Low: isDiabetic
      ? [
          {
            name: 'Walking',
            duration: '20-30 minutes',
            frequency: '5 days/week',
            description: 'A gentle walk to improve circulation.',
            icon: <LucideActivity className="text-blue-500" />,
          },
        ]
      : [
          {
            name: 'Brisk Walking',
            duration: '30 minutes',
            frequency: '5 days/week',
            description: 'Improve heart rate and stamina.',
            icon: <LucideActivity className="text-blue-500" />,
          },
        ],
    Moderate: isDiabetic
      ? [
          {
            name: 'Swimming',
            duration: '30 minutes',
            frequency: '3 days/week',
            description: 'Low-impact cardio to manage blood sugar.',
            icon: <LucideActivity className="text-blue-500" />,
          },
        ]
      : [
          {
            name: 'Jogging',
            duration: '30 minutes',
            frequency: '4 days/week',
            description: 'Moderate cardio for overall fitness and cardiovascular health.',
            icon: <LucideActivity className="text-blue-500" />,
          },
          {
            name: 'Bodyweight Exercises',
            duration: '20 minutes',
            frequency: '3 days/week',
            description: 'Squats, push-ups, and lunges to build functional strength.',
            icon: <Dumbbell className="text-blue-500" />,
          },
        ],
    High: isDiabetic
      ? [
          {
            name: 'Cycling',
            duration: '45 minutes',
            frequency: '4 days/week',
            description: 'Great cardio and leg strength training.',
            icon: <LucideActivity className="text-blue-500" />,
          },
        ]
      : [
          {
            name: 'Running',
            duration: '45 minutes',
            frequency: '5 days/week',
            description: 'High-intensity cardio to boost endurance.',
            icon: <LucideActivity className="text-blue-500" />,
          },
        ],
  };

  const selectedPlan = exercisePlans[ActivityLevel] || exercisePlans['Low'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Health Recommendations
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
          <LucideActivity className="w-5 h-5" />
          Exercise Recommendations
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Suggested exercises based on your{' '}
          <span className="font-medium">{ActivityLevel || 'Low'}</span> activity level and{' '}
          <span className="font-medium">
            {isDiabetic ? 'diabetic' : 'non-diabetic'}
          </span>{' '}
          status.
        </p>

        {selectedPlan.map((exercise, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 flex items-start gap-4 mb-4"
          >
            <div className="bg-blue-50 dark:bg-gray-600 rounded-full p-3">
              {exercise.icon}
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                {exercise.name}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Duration:</span> {exercise.duration}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Frequency:</span> {exercise.frequency}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {exercise.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
