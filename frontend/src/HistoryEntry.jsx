import React from "react";

function HistoryEntry({ entry, darkMode }) {
  // Placeholder image (we'll add real images next time)
  const placeholderImage =
    "https://via.placeholder.com/300x100?text=Recommendation+Image";

  return (
    <div
      className={`p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 ${
        darkMode
          ? "bg-gray-700 border border-gray-600"
          : "bg-gray-50 border border-gray-200"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`text-sm ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            {new Date(entry.timestamp).toLocaleDateString()}{" "}
            {new Date(entry.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Sex:
            </span>
            <span
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {entry.sex}
            </span>
          </div>
          <div>
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Glucose Level:
            </span>
            <span
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {entry.glucose} mg/dL
            </span>
          </div>
          <div>
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Blood Pressure:
            </span>
            <span
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {entry.blood_pressure} mmHg
            </span>
          </div>
          <div>
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Risk Level:
            </span>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                entry.risk_percentage > 50
                  ? darkMode
                    ? "bg-red-900 text-red-100"
                    : "bg-red-100 text-red-800"
                  : darkMode
                  ? "bg-green-900 text-green-100"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {entry.risk_percentage > 50 ? "High" : "Low"}
            </span>
          </div>
          <div>
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Risk Percentage:
            </span>
            <span
              className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {Math.round(entry.risk_percentage)}%
            </span>
          </div>
        </div>
        <div>
          <span
            className={`font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Recommendation:
          </span>
          <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {entry.diet_suggestion}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <img
          src={placeholderImage}
          alt="Recommendation"
          className="w-full h-24 object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default HistoryEntry;
