import React from "react";

function PredictionResult({ result, darkMode }) {
  if (!result) return null;

  return (
    <div
      className={`mt-6 p-6 rounded-xl shadow-md transition-colors ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <h2
        className={`text-xl font-semibold ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Your Result
      </h2>
      <div className="mt-4 space-y-3">
        <div className="flex items-center">
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Diagnosis:
          </span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
              result.prediction === "Diabetic"
                ? darkMode
                  ? "bg-red-900 text-red-100"
                  : "bg-red-100 text-red-800"
                : darkMode
                ? "bg-green-900 text-green-100"
                : "bg-green-100 text-green-800"
            }`}
          >
            {result.prediction}
          </span>
        </div>
        <div className="flex items-center">
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Glucose Level:
          </span>
          <span
            className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            {result.glucose} mg/dL
          </span>
        </div>
        <div className="flex items-center">
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Blood Pressure:
          </span>
          <span
            className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            {result.blood_pressure} mmHg
          </span>
        </div>
        <div className="flex items-center">
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Risk Level:
          </span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
              result.risk_percentage > 50
                ? darkMode
                  ? "bg-red-900 text-red-100"
                  : "bg-red-100 text-red-800"
                : darkMode
                ? "bg-green-900 text-green-100"
                : "bg-green-100 text-green-800"
            }`}
          >
            {result.risk_percentage > 50 ? "High" : "Low"}
          </span>
        </div>
        <div className="flex items-center">
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Risk Percentage:
          </span>
          <span
            className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            {Math.round(result.risk_percentage)}%
          </span>
        </div>
        <div>
          <span
            className={`font-medium ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Recommendation:
          </span>
          <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {result.diet_suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;
