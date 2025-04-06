import { AlertCircle } from "lucide-react";

function HistoryList({ history, historyError, darkMode }) {
  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-semibold ${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        Your Prediction History
      </h2>

      {historyError && (
        <div
          className={`p-4 rounded-md flex items-center space-x-2 ${
            darkMode
              ? "bg-red-900 text-red-100 border border-red-800"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{historyError}</p>
        </div>
      )}

      {history.length === 0 && !historyError ? (
        <div
          className={`p-6 rounded-lg shadow-md text-center ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
          }`}
        >
          <p>No prediction history yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Prediction
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      entry.prediction === "Diabetic"
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {entry.prediction}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Glucose
                  </p>
                  <p>{entry.glucose}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Blood Pressure
                  </p>
                  <p>{entry.blood_pressure}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Risk Percentage
                  </p>
                  <p>{entry.risk_percentage.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sex
                  </p>
                  <p>{entry.sex}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Timestamp
                  </p>
                  <p>{new Date(entry.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryList;
