import { useState, useEffect } from "react";
import axios from "axios";
import {
  Moon,
  Sun,
  LogIn,
  LogOut,
  Activity,
  History,
  Apple,
} from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import PredictionForm from "./PredictionForm";
import PredictionResult from "./PredictionResult";
import HistoryList from "./HistoryList";
import LandingPage from "./LandingPage";
import RecommendationPage from "./RecommendationPage";

function App() {
  const initialFormData = {
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    Height: "",
    Weight: "",
    DiabetesPedigreeFunction: "",
    Age: "",
    Sex: "",
    ActivityLevel: "Medium",
    Goal: "Standard",
    result: null,
  };

  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [history, setHistory] = useState([]);
  const [historyError, setHistoryError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeTab, setActiveTab] = useState("predict");
  const [showLandingPage, setShowLandingPage] = useState(true);

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

  useEffect(() => {
    console.log("darkMode state changed to:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log("Added dark class to document.documentElement");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Removed dark class from document.documentElement");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");
      console.log("Retrieved token from localStorage:", storedToken);
      if (storedToken && storedToken.split(".").length === 3) {
        try {
          await axios.get("http://127.0.0.1:5000/history", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          console.log("Token is valid, setting token state");
          setToken(storedToken);
          setShowLandingPage(false);
        } catch (error) {
          console.log(
            "Token validation failed:",
            error.response?.data || error.message
          );
          console.log("Clearing invalid/expired token");
          localStorage.removeItem("token");
          setToken(null);
        }
      } else {
        console.log("No valid token found, clearing token");
        localStorage.removeItem("token");
        setToken(null);
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchHistory();
    } else {
      localStorage.removeItem("token");
      setHistory([]);
      setHistoryError(null);
    }
  }, [token]);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode, current state:", darkMode);
    setDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Token during predict:", token);
    if (!token) {
      console.log(
        "No token available, prediction will not be saved to history"
      );
    }
    try {
      const heightInCm = parseFloat(formData.Height);
      if (isNaN(heightInCm) || heightInCm <= 0 || heightInCm > 250) {
        throw new Error("Please enter a valid height (between 1 and 250 cm).");
      }
      const heightInMeters = heightInCm / 100;

      const weight = parseFloat(formData.Weight);
      if (isNaN(weight) || weight <= 0 || weight > 200) {
        throw new Error("Please enter a valid weight (between 1 and 200 kg).");
      }

      const bmi = weight / (heightInMeters * heightInMeters);

      const pregnancies =
        formData.Sex === "Male" ? "0" : formData.Pregnancies || "0";

      const submissionData = new URLSearchParams({
        ...formData,
        Pregnancies: pregnancies,
        BMI: bmi.toString(),
      });
      console.log("Form data being sent:", Object.fromEntries(submissionData));
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
      console.log("Sending predict request with config:", config);
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        submissionData,
        config
      );
      setFormData({ ...formData, result: response.data });
      if (token) {
        console.log("Fetching history after prediction");
        await fetchHistory();
      } else {
        console.log("No token, skipping history fetch");
      }
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error.message);
      setFormData({
        ...formData,
        result: {
          prediction: "Error",
          diet_suggestion:
            "Prediction failed: " +
            (error.response?.data?.message || error.message || "Server error"),
        },
      });
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    if (!token) {
      console.log("No token, skipping history fetch");
      setHistory([]);
      setHistoryError(null);
      return;
    }
    try {
      console.log("Fetching history with token:", token);
      const response = await axios.get("http://127.0.0.1:5000/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("History response:", response.data);
      setHistory(response.data.history || []);
      setHistoryError(null);
    } catch (error) {
      console.error(
        "History fetch failed:",
        error.response?.data || error.message
      );
      setHistory([]);
      setHistoryError(
        "Failed to fetch history: " +
          (error.response?.data.message || "Server error")
      );
    }
  };

  const logout = () => {
    setToken(null);
    setHistory([]);
    setHistoryError(null);
    setShowLandingPage(true);
    setFormData(initialFormData); // Reset formData on logout
    setActiveTab("predict"); // Reset to predict tab on logout
  };

  const handleTryIt = () => {
    setShowLandingPage(false);
    setActiveTab("predict");
  };

  const handleSignUp = () => {
    setShowSignupModal(true);
  };

  const handleLogoClick = () => {
    setShowLandingPage(true);
    setFormData(initialFormData); // Reset formData when returning to landing page
    setActiveTab("predict"); // Reset to predict tab
  };

  const handleFormSubmit = () => {
    setActiveTab("recommendations");
  };

  const handleBackToPrediction = () => {
    console.log("Navigating back to prediction page");
    setActiveTab("predict");
    setFormData(initialFormData); // Reset formData when returning to predict tab
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-900"
      }`}
    >
      {showLandingPage ? (
        <LandingPage
          key={darkMode.toString()}
          darkMode={darkMode}
          onTryIt={handleTryIt}
          onSignUp={handleSignUp}
          onToggleDarkMode={toggleDarkMode}
        />
      ) : (
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1
              onClick={handleLogoClick}
              className={`text-3xl font-bold cursor-pointer ${
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
              onClick={() => {
                setActiveTab("predict");
                resetFormData(); // Reset formData when switching to Predict tab
              }}
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
                onClick={() => {
                  setActiveTab("history");
                  fetchHistory();
                }}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </button>
            )}
            {formData.result && formData.result.prediction !== "Error" && (
              <button
                className={`px-4 py-2 font-medium flex items-center ${
                  activeTab === "recommendations"
                    ? darkMode
                      ? "border-b-2 border-indigo-400 text-indigo-400"
                      : "border-b-2 border-indigo-600 text-indigo-600"
                    : darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("recommendations")}
              >
                <Apple className="h-4 w-4 mr-2" />
                Recommendations
              </button>
            )}
          </div>

          {activeTab === "predict" && (
            <div>
              <PredictionForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                darkMode={darkMode}
                onFormSubmit={handleFormSubmit}
                isLoggedIn={!!token} // Pass isLoggedIn based on token
                onShowLogin={() => setShowLoginModal(true)} // Pass function to show login modal
              />
            </div>
          )}

          {activeTab === "history" && token && (
            <HistoryList
              history={history}
              historyError={historyError}
              darkMode={darkMode}
            />
          )}

          {activeTab === "recommendations" && formData.result && (
            <RecommendationPage
              predictionData={formData}
              darkMode={darkMode}
              onBack={handleBackToPrediction}
            />
          )}
        </div>
      )}

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
                  setShowLandingPage(false);
                }}
                darkMode={darkMode}
                showSignup={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`relative w-full max-w-md rounded-lg shadow-xl transition-colors ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setShowSignupModal(false)}
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
              <Signup
                setToken={(token) => {
                  setToken(token);
                  setShowSignupModal(false);
                  setShowLandingPage(false);
                }}
                darkMode={darkMode}
                showLogin={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
