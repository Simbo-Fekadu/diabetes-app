"use client"

import { useState } from "react"
import { Activity, Utensils, Carrot, LineChart, Calendar, Dumbbell, Info, AlertTriangle } from "lucide-react"
import NutritionSuggestion from "./NutritionSuggestion"

function RecommendationPage({ predictionData, darkMode }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Activity level descriptions
  const activityDescriptions = {
    Low: "Little to no exercise",
    Moderate: "3-5 days of exercise per week",
    High: "Daily exercise or intense training",
  }

  // Get activity level from prediction data or use a default
  const activityLevel = predictionData.nutrition?.activity_level || "Moderate"
  const activityDescription =
    predictionData.nutrition?.activity_description || activityDescriptions[activityLevel] || "Regular physical activity"

  // Exercise recommendations based on activity level and diabetes risk
  const exerciseRecommendations = {
    Low: [
      {
        type: "Walking",
        frequency: "Daily",
        duration: "30 minutes",
        intensity: "Moderate pace",
        benefits: "Improves insulin sensitivity and helps manage blood sugar levels",
        tips: "Break it up into three 10-minute sessions if needed",
      },
      {
        type: "Swimming",
        frequency: "2-3 times per week",
        duration: "20-30 minutes",
        intensity: "Light to moderate",
        benefits: "Low-impact exercise that's gentle on joints while improving cardiovascular health",
        tips: "Focus on steady, consistent movement rather than speed",
      },
      {
        type: "Gentle Yoga",
        frequency: "2-3 times per week",
        duration: "20-30 minutes",
        intensity: "Low",
        benefits: "Improves flexibility, reduces stress, and may help lower blood sugar",
        tips: "Look for 'beginner', 'gentle', or 'diabetes-friendly' yoga classes or videos",
      },
    ],
    Moderate: [
      {
        type: "Brisk Walking or Jogging",
        frequency: "4-5 times per week",
        duration: "30-45 minutes",
        intensity: "Moderate to somewhat hard",
        benefits: "Improves cardiovascular health and helps maintain healthy blood sugar levels",
        tips: "Alternate between walking and jogging to build endurance",
      },
      {
        type: "Cycling",
        frequency: "3-4 times per week",
        duration: "30 minutes",
        intensity: "Moderate",
        benefits: "Improves leg strength and cardiovascular fitness without high impact",
        tips: "Indoor stationary bikes are great for consistent workouts regardless of weather",
      },
      {
        type: "Strength Training",
        frequency: "2-3 times per week",
        duration: "20-30 minutes",
        intensity: "Moderate",
        benefits: "Builds muscle mass which improves insulin sensitivity and glucose metabolism",
        tips: "Focus on major muscle groups with bodyweight exercises or light weights",
      },
    ],
    High: [
      {
        type: "Interval Training",
        frequency: "3-4 times per week",
        duration: "20-30 minutes",
        intensity: "Alternating between moderate and high",
        benefits: "Efficiently improves cardiovascular fitness and glucose metabolism",
        tips: "Always include proper warm-up and cool-down periods",
      },
      {
        type: "Strength Training",
        frequency: "3-4 times per week",
        duration: "30-45 minutes",
        intensity: "Moderate to high",
        benefits: "Increases muscle mass which improves insulin sensitivity and metabolic health",
        tips: "Include a mix of resistance exercises for all major muscle groups",
      },
      {
        type: "Active Recovery",
        frequency: "2-3 times per week",
        duration: "20-30 minutes",
        intensity: "Low",
        benefits: "Promotes recovery while maintaining activity levels",
        tips: "Try yoga, swimming, or light walking on rest days",
      },
    ],
  }

  // Additional vegetables for diabetes management
  const diabetesFriendlyVegetables = [
    {
      name: "Leafy Greens",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      portion: "2 cups raw",
      calories: 15,
      benefits: "Very low glycemic impact, rich in vitamins, minerals and antioxidants",
      glycemicIndex: "Very Low",
    },
    {
      name: "Broccoli",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
      portion: "1 cup cooked",
      calories: 55,
      benefits: "Contains sulforaphane which may help lower blood sugar levels",
      glycemicIndex: "Low",
    },
    {
      name: "Bell Peppers",
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6",
      portion: "1 medium pepper",
      calories: 30,
      benefits: "High in vitamin C and antioxidants, adds flavor without raising blood sugar",
      glycemicIndex: "Low",
    },
    {
      name: "Cauliflower",
      image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc",
      portion: "1 cup cooked",
      calories: 25,
      benefits: "Versatile low-carb substitute for rice, potatoes and other starches",
      glycemicIndex: "Low",
    },
    {
      name: "Cucumber",
      image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
      portion: "1 cup sliced",
      calories: 16,
      benefits: "High water content, helps with hydration and blood sugar regulation",
      glycemicIndex: "Very Low",
    },
    {
      name: "Zucchini",
      image: "https://images.unsplash.com/photo-1583687355032-89b902b7335f",
      portion: "1 cup cooked",
      calories: 20,
      benefits: "Low-carb alternative to pasta, versatile in many recipes",
      glycemicIndex: "Low",
    },
  ]

  const tabs = ["overview", "nutrition", "exercise", "diet-plan"]

  // Check if prediction indicates diabetes risk
  const isDiabeticRisk =
    predictionData.prediction === "Diabetic" || (predictionData.risk_percentage && predictionData.risk_percentage > 50)

  return (
    <div
      className={`rounded-2xl shadow-xl transition-colors ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Tab Navigation */}
      <div className="flex flex-wrap space-x-1 sm:space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-3 sm:px-4 capitalize flex items-center text-sm sm:text-base ${
              activeTab === tab
                ? "border-b-2 border-indigo-500 text-indigo-500 font-medium"
                : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {tab === "overview" && <Activity className="h-4 w-4 mr-2" />}
            {tab === "nutrition" && <Utensils className="h-4 w-4 mr-2" />}
            {tab === "exercise" && <Dumbbell className="h-4 w-4 mr-2" />}
            {tab === "diet-plan" && <Carrot className="h-4 w-4 mr-2" />}
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="p-6 pt-0">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {isDiabeticRisk && (
              <div className={`p-4 rounded-lg ${darkMode ? "bg-red-900/30" : "bg-red-50"} flex items-start`}>
                <AlertTriangle
                  className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${darkMode ? "text-red-400" : "text-red-600"}`}
                />
                <div>
                  <h3 className={`font-semibold ${darkMode ? "text-red-400" : "text-red-600"}`}>
                    Important Health Alert
                  </h3>
                  <p className="text-sm mt-1">
                    Your assessment indicates an elevated risk for diabetes. The recommendations provided are for
                    informational purposes only. Please consult with a healthcare professional for proper diagnosis and
                    personalized advice.
                  </p>
                </div>
              </div>
            )}

            <div className={`p-6 rounded-xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-50"}`}>
              <h2 className="text-2xl font-bold mb-4">Your Health Assessment</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div
                    className={`p-4 rounded-lg mb-4 ${
                      predictionData.prediction === "Diabetic"
                        ? darkMode
                          ? "bg-red-900/20"
                          : "bg-red-50"
                        : darkMode
                          ? "bg-green-900/20"
                          : "bg-green-50"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        predictionData.prediction === "Diabetic"
                          ? darkMode
                            ? "text-red-400"
                            : "text-red-600"
                          : darkMode
                            ? "text-green-400"
                            : "text-green-600"
                      }`}
                    >
                      Prediction: {predictionData.prediction}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Risk Percentage: {predictionData.risk_percentage?.toFixed(1) || "N/A"}%
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Utensils className={`h-5 w-5 mr-2 mt-0.5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <div>
                        <p className="font-medium">Dietary Recommendation</p>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {predictionData.diet_suggestion ||
                            "A balanced diet with plenty of vegetables, lean proteins, and limited refined carbohydrates is recommended."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Dumbbell className={`h-5 w-5 mr-2 mt-0.5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <div>
                        <p className="font-medium">Activity Level</p>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {activityLevel} - {activityDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div className="flex items-center mb-2">
                      <LineChart className={`h-5 w-5 mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <p className="font-medium">Glucose</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {predictionData.glucose || predictionData.Glucose || "N/A"}{" "}
                      <span className="text-sm font-normal">mg/dL</span>
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div className="flex items-center mb-2">
                      <Activity className={`h-5 w-5 mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <p className="font-medium">Blood Pressure</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {predictionData.blood_pressure || predictionData.BloodPressure || "N/A"}{" "}
                      <span className="text-sm font-normal">mmHg</span>
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div className="flex items-center mb-2">
                      <Calendar className={`h-5 w-5 mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <p className="font-medium">Age</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {predictionData.age || predictionData.Age || "N/A"}{" "}
                      <span className="text-sm font-normal">years</span>
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div className="flex items-center mb-2">
                      <Dumbbell className={`h-5 w-5 mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      <p className="font-medium">BMI</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {predictionData.bmi?.toFixed(1) || predictionData.BMI?.toFixed(1) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className="text-xl font-bold mb-3">Next Steps</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    1
                  </div>
                  <p>Review your detailed nutrition recommendations in the "Nutrition" tab</p>
                </li>
                <li className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    2
                  </div>
                  <p>Check out personalized exercise suggestions based on your activity level</p>
                </li>
                <li className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    3
                  </div>
                  <p>Explore the sample meal plan designed for your specific health needs</p>
                </li>
                <li className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    4
                  </div>
                  <p>Consult with a healthcare provider to discuss these recommendations</p>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <h3 className="text-lg font-semibold mb-3">Daily Nutrition Targets</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calories</span>
                      <span className="font-medium">
                        {predictionData.nutrition?.calories?.toFixed(0) || "2000"} kcal
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Carbs</span>
                      <span className="font-medium">
                        {predictionData.nutrition?.carbs?.toFixed(0) || "200"}g (
                        {Math.round(
                          (((predictionData.nutrition?.carbs || 200) * 4) /
                            (predictionData.nutrition?.calories || 2000)) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${Math.round((((predictionData.nutrition?.carbs || 200) * 4) / (predictionData.nutrition?.calories || 2000)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Protein</span>
                      <span className="font-medium">
                        {predictionData.nutrition?.protein?.toFixed(0) || "125"}g (
                        {Math.round(
                          (((predictionData.nutrition?.protein || 125) * 4) /
                            (predictionData.nutrition?.calories || 2000)) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${Math.round((((predictionData.nutrition?.protein || 125) * 4) / (predictionData.nutrition?.calories || 2000)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Fat</span>
                      <span className="font-medium">
                        {predictionData.nutrition?.fat?.toFixed(0) || "67"}g (
                        {Math.round(
                          (((predictionData.nutrition?.fat || 67) * 9) / (predictionData.nutrition?.calories || 2000)) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${Math.round((((predictionData.nutrition?.fat || 67) * 9) / (predictionData.nutrition?.calories || 2000)) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <h3 className="text-lg font-semibold mb-3">Activity & Metabolism</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Activity Level:</span>
                    <span className="font-medium">{activityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TDEE:</span>
                    <span className="font-medium">{predictionData.nutrition?.tdee?.toFixed(0) || "2200"} kcal/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommended Water:</span>
                    <span className="font-medium">{Math.round((predictionData.weight || 70) * 0.033)} liters/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fiber Target:</span>
                    <span className="font-medium">
                      {Math.round(((predictionData.nutrition?.calories || 2000) / 1000) * 14)} g/day
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm">
                      <span className="font-medium">Note:</span> These recommendations are tailored to your
                      {activityLevel.toLowerCase()} activity level and health profile. Adjustments may be needed based
                      on your specific health conditions and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionally render NutritionSuggestion or fallback */}
            {typeof NutritionSuggestion === "function" ? (
              <NutritionSuggestion predictionData={predictionData} darkMode={darkMode} />
            ) : (
              <div className={`p-6 rounded-xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-50"}`}>
                <h2 className="text-2xl font-bold mb-4">Diabetes-Friendly Vegetables</h2>
                <p className="mb-6">
                  These non-starchy vegetables are excellent choices for diabetes management as they have minimal impact
                  on blood sugar levels while providing essential nutrients.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {diabetesFriendlyVegetables.map((veg) => (
                    <div
                      key={veg.name}
                      className={`rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 ${
                        darkMode ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      <img src={veg.image || "/placeholder.svg"} alt={veg.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">{veg.name}</h3>
                        <div className="flex justify-between mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              veg.glycemicIndex === "Very Low"
                                ? darkMode
                                  ? "bg-green-900/50 text-green-300"
                                  : "bg-green-100 text-green-700"
                                : darkMode
                                  ? "bg-blue-900/50 text-blue-300"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            GI: {veg.glycemicIndex}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {veg.calories} kcal
                          </span>
                        </div>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Portion:</span> {veg.portion}
                        </p>
                        <p className="text-sm mt-2">{veg.benefits}</p>
                        <button
                          onClick={() => alert(`Added ${veg.name} to your meal plan!`)}
                          className={`mt-3 w-full py-2 rounded-md transition-colors ${
                            darkMode ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-600"
                          } text-white`}
                        >
                          Add to Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <div className="flex items-start">
                    <Info
                      className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                        darkMode ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold">Diabetes Nutrition Tips</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li>Focus on non-starchy vegetables which have minimal impact on blood sugar</li>
                        <li>Include protein and healthy fat with each meal to slow carbohydrate absorption</li>
                        <li>Choose whole grains over refined carbohydrates when consuming starches</li>
                        <li>Monitor portion sizes, especially for carbohydrate-containing foods</li>
                        <li>Stay well-hydrated with water rather than sugary beverages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exercise Tab */}
        {activeTab === "exercise" && (
          <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-50"}`}>
              <h2 className="text-2xl font-bold mb-2">Exercise Recommendations</h2>
              <p className="mb-4">
                Based on your {activityLevel.toLowerCase()} activity level and health assessment, here are some
                recommended exercises:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {exerciseRecommendations[activityLevel].map((exercise, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-700" : "bg-white"}`}
                  >
                    <div className={`p-3 ${darkMode ? "bg-indigo-900/40" : "bg-indigo-100"}`}>
                      <h3 className="font-bold text-lg">{exercise.type}</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Frequency:</span>
                          <span className="font-medium">{exercise.frequency}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                          <span className="font-medium">{exercise.duration}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Intensity:</span>
                          <span className="font-medium">{exercise.intensity}</span>
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-sm mb-2">{exercise.benefits}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">Tip: {exercise.tips}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-6 p-4 rounded-lg ${
                  darkMode ? "bg-yellow-900/20 text-yellow-200" : "bg-yellow-50 text-yellow-800"
                }`}
              >
                <p className="text-sm">
                  <span className="font-bold">Important:</span> Always consult with your healthcare provider before
                  starting a new exercise program, especially if you have diabetes or other health conditions.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className="text-xl font-bold mb-4">Weekly Exercise Plan</h3>

              <div className="overflow-x-auto">
                <table className={`min-w-full ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <thead>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-300"}>
                      <th className="py-2 px-4 text-left">Day</th>
                      <th className="py-2 px-4 text-left">Morning</th>
                      <th className="py-2 px-4 text-left">Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Monday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Walking (15 min)"
                          : activityLevel === "Moderate"
                            ? "Brisk Walking (20 min)"
                            : "Interval Training (20 min)"}
                      </td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Gentle Stretching (10 min)"
                          : activityLevel === "Moderate"
                            ? "Strength Training (20 min)"
                            : "Yoga (30 min)"}
                      </td>
                    </tr>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Tuesday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Rest"
                          : activityLevel === "Moderate"
                            ? "Cycling (20 min)"
                            : "Strength Training (30 min)"}
                      </td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Walking (15 min)"
                          : activityLevel === "Moderate"
                            ? "Yoga (20 min)"
                            : "Brisk Walking (20 min)"}
                      </td>
                    </tr>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Wednesday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Swimming (20 min)"
                          : activityLevel === "Moderate"
                            ? "Jogging (20 min)"
                            : "HIIT (20 min)"}
                      </td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Gentle Yoga (15 min)"
                          : activityLevel === "Moderate"
                            ? "Rest"
                            : "Strength Training (30 min)"}
                      </td>
                    </tr>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Thursday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Rest"
                          : activityLevel === "Moderate"
                            ? "Strength Training (20 min)"
                            : "Active Recovery (20 min)"}
                      </td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Walking (15 min)"
                          : activityLevel === "Moderate"
                            ? "Brisk Walking (20 min)"
                            : "Swimming (30 min)"}
                      </td>
                    </tr>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Friday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Gentle Yoga (20 min)"
                          : activityLevel === "Moderate"
                            ? "Swimming (30 min)"
                            : "Interval Training (25 min)"}
                      </td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Rest"
                          : activityLevel === "Moderate"
                            ? "Rest"
                            : "Strength Training (30 min)"}
                      </td>
                    </tr>
                    <tr className={darkMode ? "border-b border-gray-600" : "border-b border-gray-200"}>
                      <td className="py-3 px-4 font-medium">Saturday</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Walking (30 min)"
                          : activityLevel === "Moderate"
                            ? "Longer Walk/Jog (40 min)"
                            : "Longer Workout (45-60 min)"}
                      </td>
                      <td className="py-3 px-4">Rest</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Sunday</td>
                      <td className="py-3 px-4">Rest</td>
                      <td className="py-3 px-4">
                        {activityLevel === "Low"
                          ? "Light Activity (15 min)"
                          : activityLevel === "Moderate"
                            ? "Gentle Yoga (20 min)"
                            : "Active Recovery (20 min)"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Diet Plan Tab */}
        {activeTab === "diet-plan" && (
          <div className="space-y-6 animate-fade-in">
            <div className={`p-6 rounded-xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-50"}`}>
              <h2 className="text-2xl font-bold mb-2">7-Day Diabetes-Friendly Meal Plan</h2>
              <p className="mb-4">
                This meal plan is designed to help maintain stable blood sugar levels while providing balanced
                nutrition.
              </p>

              <div className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                <h3 className="font-semibold text-lg mb-2">Daily Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Aim for consistent meal timing each day to help maintain stable blood sugar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Include protein and healthy fat with each meal to slow carbohydrate absorption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Stay hydrated with water throughout the day (aim for{" "}
                      {Math.round((predictionData.weight || 70) * 0.033)} liters)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Limit added sugars, refined carbohydrates, and processed foods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Adjust portion sizes based on your specific calorie needs (
                      {predictionData.nutrition?.calories?.toFixed(0) || "2000"} kcal/day)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                {["Monday", "Tuesday", "Wednesday"].map((day, index) => (
                  <div key={day} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                    <h3 className="font-bold text-lg mb-3">{day}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4
                          className={`font-medium mb-2 pb-1 border-b ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          Breakfast
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {index === 0 && (
                            <>
                              <li>Greek yogurt (¾ cup)</li>
                              <li>Berries (½ cup)</li>
                              <li>Walnuts (1 tbsp)</li>
                              <li>Cinnamon (sprinkle)</li>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <li>Vegetable omelet (2 eggs)</li>
                              <li>Spinach, bell peppers, onions</li>
                              <li>Avocado (¼)</li>
                              <li>Whole grain toast (1 slice)</li>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <li>Steel-cut oatmeal (½ cup cooked)</li>
                              <li>Almond butter (1 tbsp)</li>
                              <li>Chia seeds (1 tsp)</li>
                              <li>Cinnamon and berries</li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4
                          className={`font-medium mb-2 pb-1 border-b ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          Lunch
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {index === 0 && (
                            <>
                              <li>Grilled chicken salad</li>
                              <li>Mixed greens, cucumber, tomatoes</li>
                              <li>Olive oil & vinegar dressing</li>
                              <li>Quinoa (⅓ cup cooked)</li>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <li>Lentil soup (1 cup)</li>
                              <li>Mixed green salad</li>
                              <li>Olive oil dressing</li>
                              <li>Feta cheese (1 oz)</li>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <li>Tuna salad with olive oil</li>
                              <li>Whole grain wrap (small)</li>
                              <li>Lettuce, cucumber, tomato</li>
                              <li>Side of baby carrots</li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4
                          className={`font-medium mb-2 pb-1 border-b ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          Dinner
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {index === 0 && (
                            <>
                              <li>Baked salmon (4 oz)</li>
                              <li>Roasted Brussels sprouts</li>
                              <li>Sweet potato (small, ½ cup)</li>
                              <li>Olive oil, herbs</li>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <li>Turkey meatballs (3 oz)</li>
                              <li>Zucchini noodles</li>
                              <li>Tomato sauce (homemade)</li>
                              <li>Side salad with olive oil</li>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <li>Grilled chicken breast (4 oz)</li>
                              <li>Cauliflower rice (½ cup)</li>
                              <li>Stir-fried vegetables</li>
                              <li>Sesame oil, ginger, garlic</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <h4 className="font-medium mb-2">Snacks (Choose 1-2)</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {index === 0 && (
                          <>
                            <li>Apple with almond butter</li>
                            <li>Celery with hummus</li>
                            <li>Mixed nuts (¼ cup)</li>
                            <li>Cheese stick with cucumber</li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li>Greek yogurt with berries</li>
                            <li>Hard-boiled egg</li>
                            <li>Avocado (¼) with salt</li>
                            <li>Bell peppers with hummus</li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li>Cottage cheese with tomatoes</li>
                            <li>Handful of almonds</li>
                            <li>Edamame (½ cup)</li>
                            <li>Cucumber with tzatziki</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <h3 className="font-semibold mb-2">Remaining Week</h3>
                  <p className="text-sm mb-3">
                    Continue with similar meal patterns for the rest of the week, focusing on:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className={`p-3 rounded ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                      <h4 className="font-medium mb-1">Proteins</h4>
                      <p>Rotate between fish, poultry, lean meats, eggs, tofu, and legumes</p>
                    </div>
                    <div className={`p-3 rounded ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                      <h4 className="font-medium mb-1">Vegetables</h4>
                      <p>Aim for variety in colors and types, focusing on non-starchy options</p>
                    </div>
                    <div className={`p-3 rounded ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                      <h4 className="font-medium mb-1">Carbohydrates</h4>
                      <p>Choose whole grains and high-fiber options in appropriate portions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <h3 className="text-xl font-bold mb-4">Meal Planning Tips</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Prep meals in advance</h4>
                    <p className="text-sm">
                      Prepare several meals at once to ensure healthy options are always available
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Monitor portion sizes</h4>
                    <p className="text-sm">
                      Use measuring cups or a food scale until you become familiar with appropriate portions
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Read food labels</h4>
                    <p className="text-sm">Check for hidden sugars, sodium, and total carbohydrates</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Stay consistent with timing</h4>
                    <p className="text-sm">
                      Eat meals at similar times each day to help maintain stable blood sugar levels
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    5
                  </div>
                  <div>
                    <h4 className="font-medium">Track your meals and blood sugar</h4>
                    <p className="text-sm">
                      Keep a food diary to identify how different foods affect your blood glucose levels
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`mt-6 p-4 rounded-lg ${
                  darkMode ? "bg-yellow-900/20 text-yellow-200" : "bg-yellow-50 text-yellow-800"
                }`}
              >
                <p className="text-sm">
                  <span className="font-bold">Important:</span> This meal plan is a general guide. Work with a
                  registered dietitian to create a personalized plan that meets your specific health needs and
                  preferences.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Simple fade-in animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in;
  }
`
const styleSheet = document.createElement("style")
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

export default RecommendationPage
