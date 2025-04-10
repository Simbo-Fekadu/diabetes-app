import { AlertCircle } from "lucide-react";

function PredictionResult({ result, darkMode }) {
  if (!result) return null;

  return (
    <div
      className={`mt-6 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        Prediction Result
      </h2>

      {result.prediction === "Error" ? (
        <div
          className={`p-4 rounded-md flex items-center space-x-2 ${
            darkMode
              ? "bg-red-900 text-red-100 border border-red-800"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{result.diet_suggestion}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Prediction
            </p>
            <p
              className={`text-2xl font-bold ${
                result.prediction === "Diabetic"
                  ? "text-red-600 dark:text-red-400"
                  : result.prediction === "Borderline Risk"
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {result.prediction}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Glucose Level
            </p>
            <p>{result.glucose}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Blood Pressure
            </p>
            <p>{result.blood_pressure}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Risk Percentage
            </p>
            <p>{result.risk_percentage.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recommendation
            </p>
            <p>{result.diet_suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionResult;
