"use client";

import { Activity, Droplets, Heart, Ruler, Weight, LineChart, Users, Calendar, Baby, Dumbbell } from 'lucide-react';
import PredictionResult from "./PredictionResult";

function PredictionForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  darkMode,
  onFormSubmit,
}) {
  return (
    <div
      className={`max-w-3xl mx-auto p-8 rounded-xl shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      } transition-all duration-300`}
    >
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Diabetes Risk Prediction
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Enter your health metrics below for a personalized diabetes risk prediction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4" />
                <span>Sex</span>
              </div>
              <select
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              >
                <option value="" disabled>
                  Select Sex
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>

          {formData.Sex === "Female" && (
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Baby className="h-4 w-4" />
                  <span>Number of Pregnancies</span>
                </div>
                <input
                  type="number"
                  name="Pregnancies"
                  placeholder="Enter Number of Pregnancies"
                  value={formData.Pregnancies}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-colors duration-200`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Enter the total number of pregnancies (e.g., 0 to 10).
                </p>
              </label>
            </div>
          )}

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4" />
                <span>Glucose (mg/dL)</span>
              </div>
              <input
                type="number"
                name="Glucose"
                placeholder="Enter Glucose"
                value={formData.Glucose}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Fasting glucose level; normal range: 70–99 mg/dL. E.g., 120 mg/dL.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4" />
                <span>Blood Pressure (mmHg)</span>
              </div>
              <input
                type="number"
                name="BloodPressure"
                placeholder="Enter Blood Pressure"
                value={formData.BloodPressure}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Systolic pressure; normal range: 90–120 mmHg. E.g., 80 mmHg.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4" />
                <span>Skin Thickness (mm)</span>
              </div>
              <input
                type="number"
                name="SkinThickness"
                placeholder="Enter Skin Thickness"
                value={formData.SkinThickness}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Typical range for males: 10–20 mm, females: 20–30 mm. E.g., 15 mm.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4" />
                <span>Insulin (μU/ml)</span>
              </div>
              <input
                type="number"
                name="Insulin"
                placeholder="Enter Insulin"
                value={formData.Insulin}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Fasting insulin level; normal range: 2–25 μU/ml. E.g., 80 μU/ml.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Ruler className="h-4 w-4" />
                <span>Height (cm)</span>
              </div>
              <input
                type="number"
                name="Height"
                placeholder="Enter Height (cm)"
                step="0.1"
                value={formData.Height}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Height in centimeters (e.g., 175 for 175 cm).
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Weight className="h-4 w-4" />
                <span>Weight (kg)</span>
              </div>
              <input
                type="number"
                name="Weight"
                placeholder="Enter Weight (kg)"
                step="0.1"
                value={formData.Weight}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Weight in kilograms (e.g., 70 for 70 kg).
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4" />
                <span>Age (years)</span>
              </div>
              <input
                type="number"
                name="Age"
                placeholder="Enter Age"
                value={formData.Age}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your age in years (e.g., 30).
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <LineChart className="h-4 w-4" />
                <span>Diabetes Pedigree Function</span>
              </div>
              <input
                type="number"
                name="DiabetesPedigreeFunction"
                placeholder="Enter Diabetes Pedigree Function"
                step="0.01"
                value={formData.DiabetesPedigreeFunction}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              />
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Measures family history of diabetes. Typically between 0.1 and 2.0; higher values indicate a stronger family history. E.g., 0.5.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Dumbbell className="h-4 w-4" />
                <span>Activity Level</span>
              </div>
              <select
                name="ActivityLevel"
                value={formData.ActivityLevel || ""}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              >
                <option value="" disabled>
                  Select Activity Level
                </option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Low: no exercise, Moderate: 3-5 days/week, High: daily exercise.
              </p>
            </label>
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4" />
                <span>Diet Goal</span>
              </div>
              <select
                name="Goal"
                value={formData.Goal || ""}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                } shadow-sm transition-colors duration-200`}
              >
                <option value="" disabled>
                  Select Diet Goal
                </option>
                <option value="Cutting">Cutting</option>
                <option value="Standard">Standard</option>
                <option value="Bulking">Bulking</option>
              </select>
              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Cutting: weight loss, Standard: maintenance, Bulking: weight gain.
              </p>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg shadow-md text-base font-medium text-white transition-all duration-200 ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.01] active:scale-[0.99] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block"
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
                Predicting...
              </>
            ) : (
              "Get Your Prediction"
            )}
          </button>
        </div>
      </form>

      {formData.result && (
        <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-700">
          <PredictionResult result={formData.result} darkMode={darkMode} />
          {formData.result.prediction !== "Error" && (
            <div className="mt-6 text-center">
              <button
                onClick={onFormSubmit}
                className={`py-2 px-4 rounded-lg shadow-md text-base font-medium text-white transition-all duration-200 ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                    : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.01] active:scale-[0.99]`}
              >
                See Your Recommendations
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionForm;