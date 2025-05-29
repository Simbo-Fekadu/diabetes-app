import React from 'react';
import { LucideActivity, Dumbbell, Bike } from 'lucide-react';
import { motion } from 'framer-motion';

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
            description: 'A gentle walk to improve circulation and manage blood sugar.',
            icon: <LucideActivity className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1594737625785-a6cbd8035a82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ]
      : [
          {
            name: 'Brisk Walking',
            duration: '30 minutes',
            frequency: '5 days/week',
            description: 'Improve heart rate and stamina with a steady pace.',
            icon: <LucideActivity className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1594737625785-a6cbd8035a82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ],
    Moderate: isDiabetic
      ? [
          {
            name: 'Swimming',
            duration: '30 minutes',
            frequency: '3 days/week',
            description: 'Low-impact cardio to manage blood sugar and improve fitness.',
            icon: <LucideActivity className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1571367034861-e6729ed9b6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ]
      : [
          {
            name: 'Jogging',
            duration: '30 minutes',
            frequency: '4 days/week',
            description: 'Moderate cardio for overall fitness and cardiovascular health.',
            icon: <LucideActivity className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1557330359-ffb0dd5b1d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
          {
            name: 'Bodyweight Exercises',
            duration: '20 minutes',
            frequency: '3 days/week',
            description: 'Squats, push-ups, and lunges to build functional strength.',
            icon: <Dumbbell className="text-green-500 dark:text-green-300" />,
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ],
    High: isDiabetic
      ? [
          {
            name: 'Cycling',
            duration: '45 minutes',
            frequency: '4 days/week',
            description: 'Great cardio and leg strength training, gentle on joints.',
            icon: <Bike className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1536703210927-4f4a1ad40166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ]
      : [
          {
            name: 'Running',
            duration: '45 minutes',
            frequency: '5 days/week',
            description: 'High-intensity cardio to boost endurance and heart health.',
            icon: <LucideActivity className="text-blue-500 dark:text-blue-300" />,
            image: 'https://images.unsplash.com/photo-1557330359-ffb0dd5b1d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          },
        ],
  };

  const selectedPlan = exercisePlans[ActivityLevel] || exercisePlans['Low'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mx-auto px-4 py-8 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'} transition-all duration-300`}
    >
      <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
        <div className="flex items-center space-x-3 mb-4">
          <LucideActivity className="w-6 h-6 text-blue-500 dark:text-blue-300" />
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300">Personalized Exercise Plan</h3>
        </div>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          Suggested exercises based on your{' '}
          <span className="font-medium">{ActivityLevel || 'Low'}</span> activity level and{' '}
          <span className="font-medium">{isDiabetic ? 'diabetic' : 'non-diabetic'}</span> status.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {selectedPlan.map((exercise, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white dark:bg-gray-700 rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-start gap-4 hover:shadow-lg transition-shadow duration-300 ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              } border`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-1/3 h-40 rounded-lg overflow-hidden"
              >
                <img
                  src={exercise.image}
                  alt={`${exercise.name} Exercise`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`rounded-full p-2 ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                    {exercise.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="group relative">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
                    <p className={`text-base font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {exercise.duration}
                    </p>
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2 z-10">
                      Time per session
                    </span>
                  </div>
                  <div className="group relative">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Frequency</p>
                    <p className={`text-base font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                      {exercise.frequency}
                    </p>
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2 z-10">
                      Sessions per week
                    </span>
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exercise.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Exercises;