import { AlertCircle } from "lucide-react";

function HistoryList({ history, historyError, darkMode }) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-indigo-300" : "text-indigo-700"
        } tracking-tight`}
      >
        Your Prediction History
      </h2>

      {historyError && (
        <div
          className={`p-4 rounded-xl flex items-center space-x-3 ${
            darkMode
              ? "bg-red-900/50 text-red-100 border border-red-800/50"
              : "bg-red-50 text-red-800 border border-red-200"
          } shadow-md animate-pulse`}
        >
          <AlertCircle className="h-6 w-6" />
          <p className="text-base font-medium">{historyError}</p>
        </div>
      )}

      {history.length === 0 && !historyError ? (
        <div
          className={`p-8 rounded-xl shadow-lg text-center ${
            darkMode
              ? "bg-gray-800/50 text-gray-300 border border-gray-700/50"
              : "bg-white text-gray-600 border border-gray-200"
          } transition-all duration-300 hover:shadow-xl`}
        >
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-lg font-medium">No prediction history yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/70 text-gray-200 border border-gray-700/50"
                  : "bg-white text-gray-900 border border-gray-200"
              } hover:bg-opacity-90`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Prediction
                  </p>
                  <p
                    className={`text-xl font-semibold mt-1 ${
                      entry.prediction === "Diabetic"
                        ? "text-red-600 dark:text-red-400"
                        : entry.prediction === "Borderline Risk"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {entry.prediction}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Glucose
                  </p>
                  <p className="text-lg mt-1">{entry.glucose} mg/dL</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Blood Pressure
                  </p>
                  <p className="text-lg mt-1">{entry.blood_pressure} mmHg</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Risk Percentage
                  </p>
                  <p className="text-lg mt-1">
                    {entry.risk_percentage.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Recommendation
                  </p>
                  <p className="text-lg mt-1 line-clamp-2">
                    {entry.diet_suggestion}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Timestamp
                  </p>
                  <p className="text-lg mt-1">
                    {new Date(entry.timestamp).toLocaleString("en-US", {
                      // Remove timeZone: "Asia/Riyadh" since timestamp is already in KSA time
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
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
