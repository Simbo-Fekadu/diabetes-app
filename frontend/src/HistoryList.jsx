import { AlertCircle, Calendar, Activity, Droplets, Target, TrendingUp, Clock } from "lucide-react"
import { useState } from "react"

function HistoryList({ history, historyError, darkMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate total pages
  const totalPages = Math.ceil(history.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto p-3">
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"} tracking-tight`}>
          Your Prediction History
        </h2>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Track your health journey over time</p>
      </div>

      {historyError && (
        <div
          className={`p-4 rounded-2xl flex items-center space-x-4 ${
            darkMode
              ? "bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-100 border border-red-700/50 backdrop-blur-sm"
              : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200"
          } shadow-lg`}
        >
          <div className="p-2 rounded-full bg-red-500/20">
            <AlertCircle className="h-6 w-6" />
          </div>
          <p className="text-base font-medium">{historyError}</p>
        </div>
      )}

      {history.length === 0 && !historyError ? (
        <div
          className={`p-6 rounded-2xl shadow-xl text-center ${
            darkMode
              ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-gray-300 border border-gray-700/50 backdrop-blur-sm"
              : "bg-gradient-to-br from-white to-gray-50 text-gray-600 border border-gray-200"
          } transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
        >
          <div className="p-4 rounded-full bg-gray-500/10 w-fit mx-auto mb-6">
            <Activity className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No predictions yet</h3>
          <p className="text-base">Start making predictions to see your health history here.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {currentItems.map((entry, index) => (
              <div
                key={index}
                className={`group p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-800/70 to-gray-900/70 text-gray-200 border border-gray-700/50 backdrop-blur-sm"
                    : "bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-gray-200"
                } hover:scale-[1.01] hover:border-opacity-80`}
              >
                {/* Header with prediction result */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200/20">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1 rounded-lg ${
                        entry.prediction === "Diabetic"
                          ? "bg-red-500/20 text-red-500"
                          : entry.prediction === "Borderline Risk"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                      }`}
                    >
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                        Prediction Result
                      </p>
                      <p
                        className={`text-base font-bold mt-0.5 ${
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
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      <p className="text-xs">
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health metrics grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                    } group-hover:bg-opacity-80 transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                        Glucose Level
                      </p>
                    </div>
                    <p className="text-sm font-bold pl-6">
                      {entry.glucose} <span className="text-xs font-normal text-gray-500">mg/dL</span>
                    </p>
                  </div>

                  <div
                    className={`p-1.5 rounded-lg ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                    } group-hover:bg-opacity-80 transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="h-4 w-4 text-red-500" />
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                        Blood Pressure
                      </p>
                    </div>
                    <p className="text-sm font-bold pl-6">
                      {entry.blood_pressure} <span className="text-xs font-normal text-gray-500">mmHg</span>
                    </p>
                  </div>

                  <div
                    className={`p-1.5 rounded-lg ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                    } group-hover:bg-opacity-80 transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                        Risk Percentage
                      </p>
                    </div>
                    <p className="text-sm font-bold pl-6">
                      {entry.risk_percentage.toFixed(2)}
                      <span className="text-xs font-normal text-gray-500">%</span>
                    </p>
                  </div>

                  <div
                    className={`p-1.5 rounded-lg ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                    } group-hover:bg-opacity-80 transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                        Date Recorded
                      </p>
                    </div>
                    <p className="text-sm font-bold pl-6">
                      {new Date(entry.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Recommendation section */}
                <div
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/30"
                      : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-500 mt-0.5">
                      <Target className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide mb-1">
                        Health Recommendation
                      </p>
                      <p className="text-sm leading-relaxed">{entry.diet_suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                } transition-colors duration-200 disabled:cursor-not-allowed`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    currentPage === i + 1
                      ? darkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                } transition-colors duration-200 disabled:cursor-not-allowed`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HistoryList
