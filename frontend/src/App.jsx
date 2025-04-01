"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Moon, Sun, LogIn, LogOut, Activity, History } from "lucide-react";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState("predict");

  // Initialize dark mode based on user preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = token
        ? {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        : {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        config
      );
      setResult(response.data);
      if (token) fetchHistory(); // Refresh history if logged in
    } catch (error) {
      setResult({
        prediction: "Error",
        diet_suggestion:
          "Prediction failed: " +
          (error.response?.data.message || "Server error"),
      });
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data.history);
    } catch (error) {
      console.error("History fetch failed:", error);
    }
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const logout = () => {
    setToken(null);
    setHistory([]);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header with dark mode toggle and login/logout */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Diabetes Predictor
          </h1>
          <div className="flex items-center space-x-4">
            {token ? (
              <button
                onClick={logout}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  darkMode
                    ? "bg-red-800 hover:bg-red-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  darkMode
                    ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Tabs for Predict and History (if logged in) */}
        <div className="flex mb-6 border-b border-gray-300 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === "predict"
                ? darkMode
                  ? "border-b-2 border-indigo-400 text-indigo-400"
                  : "border-b-2 border-indigo-600 text-indigo-600"
                : darkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("predict")}
          >
            <Activity className="h-4 w-4 mr-2" />
            Predict
          </button>
          {token && (
            <button
              className={`px-4 py-2 font-medium flex items-center ${
                activeTab === "history"
                  ? darkMode
                    ? "border-b-2 border-indigo-400 text-indigo-400"
                    : "border-b-2 border-indigo-600 text-indigo-600"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <History className="h-4 w-4 mr-2" />
              History
            </button>
          )}
        </div>

        {/* Prediction Form */}
        {activeTab === "predict" && (
          <div>
            <form
              onSubmit={handleSubmit}
              className={`rounded-2xl shadow-xl p-8 space-y-4 transition-colors ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Pregnancies
                  </label>
                  <input
                    type="number"
                    name="Pregnancies"
                    value={formData.Pregnancies}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Pregnancies"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Glucose
                  </label>
                  <input
                    type="number"
                    name="Glucose"
                    value={formData.Glucose}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Glucose"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Blood Pressure
                  </label>
                  <input
                    type="number"
                    name="BloodPressure"
                    value={formData.BloodPressure}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Blood Pressure"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Skin Thickness
                  </label>
                  <input
                    type="number"
                    name="SkinThickness"
                    value={formData.SkinThickness}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Skin Thickness"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Insulin
                  </label>
                  <input
                    type="number"
                    name="Insulin"
                    value={formData.Insulin}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Insulin"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    BMI
                  </label>
                  <input
                    type="number"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter BMI"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Diabetes Pedigree Function
                  </label>
                  <input
                    type="number"
                    name="DiabetesPedigreeFunction"
                    value={formData.DiabetesPedigreeFunction}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Diabetes Pedigree Function"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Enter Age"
                    min="0"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md transition-colors font-medium ${
                  darkMode
                    ? "bg-indigo-700 hover:bg-indigo-600 text-white disabled:bg-indigo-900 disabled:text-gray-300"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-400"
                }`}
              >
                {loading ? "Predicting..." : "Predict Now"}
              </button>
            </form>

            {result && (
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
                  <div>
                    <span
                      className={`font-medium ${
                        darkMode ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    >
                      Diet Tip:
                    </span>
                    <p
                      className={`mt-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {result.diet_suggestion}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && token && (
          <div
            className={`p-6 rounded-xl shadow-md transition-colors ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Your Prediction History
            </h2>

            {history.length === 0 ? (
              <p
                className={`text-center py-6 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No prediction history yet.
              </p>
            ) : (
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border border-gray-600"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Diagnosis:
                      </span>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                          entry.prediction === "Diabetic"
                            ? darkMode
                              ? "bg-red-900 text-red-100"
                              : "bg-red-100 text-red-800"
                            : darkMode
                            ? "bg-green-900 text-green-100"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {entry.prediction}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Diet Tip:
                      </span>
                      <p
                        className={`mt-1 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {entry.diet_suggestion}
                      </p>
                    </div>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`relative w-full max-w-md rounded-lg shadow-xl transition-colors ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className={`absolute top-4 right-4 p-1 rounded-full ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-6">
                <Login
                  setToken={(token) => {
                    setToken(token);
                    setShowLoginModal(false);
                  }}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
