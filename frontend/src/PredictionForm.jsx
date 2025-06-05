import { useState, useEffect } from "react";
import {
  Activity,
  Droplets,
  Heart,
  Ruler,
  Weight,
  LineChart,
  Users,
  Calendar,
  Baby,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Activity,
  Droplets,
  Heart,
  Ruler,
  Weight,
  LineChart,
  Users,
  Calendar,
  Baby,
} from "lucide-react";
import PredictionResult from "./PredictionResult";

function PredictionForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  darkMode,
  onFormSubmit,
  isLoggedIn,
  onShowLogin,
}) {
  const totalSteps = isLoggedIn ? 3 : 2; // 3 steps for logged-in users, 2 for others
  const [step, setStep] = useState(1);
  const [showBmiPopup, setShowBmiPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Log initial props to debug
  useEffect(() => {
    console.log("Initial formData:", formData);
    console.log("isLoggedIn:", isLoggedIn);
  }, [formData, isLoggedIn]);

  // Calculate BMI and classification with upper limit
  const calculateBMI = () => {
    if (!formData.Height || !formData.Weight) return null;
    const heightInMeters = formData.Height / 100;
    if (heightInMeters <= 0) return null; // Prevent division by zero
    let bmi = (formData.Weight / (heightInMeters * heightInMeters)).toFixed(1);
    // Cap BMI at 60
    bmi = Math.min(bmi, 60);
    let classification = "";
    if (bmi < 18.5) classification = "Underweight";
    else if (bmi < 25) classification = "Normal";
    else if (bmi < 30) classification = "Overweight";
    else classification = "Obese";
    return { bmi, classification };
  };

  const bmiData = calculateBMI();

  // Update formData with BMI when calculated (but don't auto-show popup)
  useEffect(() => {
    if (bmiData && !formData.BMI) {
      handleChange({ target: { name: "BMI", value: bmiData.bmi } });
    }
  }, [bmiData, formData.BMI, handleChange]);

  const handleNext = () => {
    if (step === 1 && bmiData) {
      // Show the popup first
      setShowBmiPopup(true);
      setTimeout(() => setIsPopupVisible(true), 100);

      // Auto-proceed to step 2 after 3 seconds
      setTimeout(() => {
        setIsPopupVisible(false);
        setTimeout(() => {
          setShowBmiPopup(false);
          setStep(2);
        }, 300); // Wait for fade out animation
      }, 3000); // Show popup for 3 seconds
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && isLoggedIn) {
      onFormSubmit(); // Navigate to RecommendationPage
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => setShowBmiPopup(false), 300);
  };

  const handleRecommendationClick = () => {
    if (isLoggedIn) {
      handleNext(); // Proceed to Step 3
    } else {
      onShowLogin();
    }
  };

  // Fixed Sex selection handler
  const handleSexChange = (e) => {
    const value = e.target.value;
    console.log("Sex selected:", value); // Debug log

    // Update Sex field
    const changes = {
      target: {
        name: "Sex",
        value,
      },
    };

    // If male is selected, also set Pregnancies to 0
    if (value.toLowerCase() === "male") {
      handleChange({
        target: {
          name: "Pregnancies",
          value: 0,
        },
      });
    }

    handleChange(changes);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = (step / totalSteps) * 100;

  isLoggedIn,
  onShowLogin,
}) {
  const totalSteps = isLoggedIn ? 3 : 2; // 3 steps for logged-in users, 2 for others
  const [step, setStep] = useState(1);
  const [showBmiPopup, setShowBmiPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Log initial props to debug
  useEffect(() => {
    console.log("Initial formData:", formData);
    console.log("isLoggedIn:", isLoggedIn);
  }, [formData, isLoggedIn]);

  // Calculate BMI and classification with upper limit
  const calculateBMI = () => {
    if (!formData.Height || !formData.Weight) return null;
    const heightInMeters = formData.Height / 100;
    if (heightInMeters <= 0) return null; // Prevent division by zero
    let bmi = (formData.Weight / (heightInMeters * heightInMeters)).toFixed(1);
    // Cap BMI at 60
    bmi = Math.min(bmi, 60);
    let classification = "";
    if (bmi < 18.5) classification = "Underweight";
    else if (bmi < 25) classification = "Normal";
    else if (bmi < 30) classification = "Overweight";
    else classification = "Obese";
    return { bmi, classification };
  };

  const bmiData = calculateBMI();

  // Update formData with BMI when calculated (but don't auto-show popup)
  useEffect(() => {
    if (bmiData && !formData.BMI) {
      handleChange({ target: { name: "BMI", value: bmiData.bmi } });
    }
  }, [bmiData, formData.BMI, handleChange]);

  const handleNext = () => {
    if (step === 1 && bmiData) {
      // Show the popup first
      setShowBmiPopup(true);
      setTimeout(() => setIsPopupVisible(true), 100);

      // Auto-proceed to step 2 after 3 seconds
      setTimeout(() => {
        setIsPopupVisible(false);
        setTimeout(() => {
          setShowBmiPopup(false);
          setStep(2);
        }, 300); // Wait for fade out animation
      }, 3000); // Show popup for 3 seconds
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && isLoggedIn) {
      onFormSubmit(); // Navigate to RecommendationPage
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => setShowBmiPopup(false), 300);
  };

  const handleRecommendationClick = () => {
    if (isLoggedIn) {
      handleNext(); // Proceed to Step 3
    } else {
      onShowLogin();
    }
  };

  // Fixed Sex selection handler
  const handleSexChange = (e) => {
    const value = e.target.value;
    console.log("Sex selected:", value); // Debug log

    // Update Sex field
    const changes = {
      target: {
        name: "Sex",
        value,
      },
    };

    // If male is selected, also set Pregnancies to 0
    if (value.toLowerCase() === "male") {
      handleChange({
        target: {
          name: "Pregnancies",
          value: 0,
        },
      });
    }

    handleChange(changes);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div
      className={`max-w-3xl mx-auto p-8 rounded-xl shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      } transition-all duration-500 ease-in-out transform hover:shadow-xl`}
      } transition-all duration-500 ease-in-out transform hover:shadow-xl`}
    >
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          } transition-colors duration-300`}
          } transition-colors duration-300`}
        >
          Diabetes Risk Prediction - Step {step} of {totalSteps}
          Diabetes Risk Prediction - Step {step} of {totalSteps}
        </h2>
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } transition-colors duration-300`}
        >
          {step === 1
            ? "Enter your height and weight to calculate your BMI."
            : step === 2
            ? "Provide your health metrics for a personalized prediction."
            : "Tell us about your activity level and goal."}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } transition-colors duration-300`}
        >
          {step === 1
            ? "Enter your height and weight to calculate your BMI."
            : step === 2
            ? "Provide your health metrics for a personalized prediction."
            : "Tell us about your activity level and goal."}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left duration-500">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Height (cm)</span>
                </div>
                <input
                  type="number"
                  name="Height"
                  placeholder="150–190"
                  min="0"
                  max="250"
                  step="0.1"
                  value={formData.Height || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left duration-500">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Height (cm)</span>
                </div>
                <input
                  type="number"
                  name="Height"
                  placeholder="150–190"
                  min="0"
                  max="250"
                  step="0.1"
                  value={formData.Height || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>

            <div className="space-y-2 group">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Weight (kg)</span>
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Weight (kg)</span>
                </div>
                <input
                  type="number"
                  name="Weight"
                  placeholder="50–100"
                  min="0"
                  max="300"
                  step="0.1"
                  value={formData.Weight || ""}
                  name="Weight"
                  placeholder="50–100"
                  min="0"
                  max="300"
                  step="0.1"
                  value={formData.Weight || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>

            {bmiData && !showBmiPopup && (
              <div className="col-span-1 md:col-span-2 mt-4 animate-in fade-in duration-500">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  } transition-colors duration-300`}
              </label>
            </div>

            {bmiData && !showBmiPopup && (
              <div className="col-span-1 md:col-span-2 mt-4 animate-in fade-in duration-500">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  } transition-colors duration-300`}
                >
                  BMI calculated. Click "Next" to proceed to Step 2.
                  BMI calculated. Click "Next" to proceed to Step 2.
                </p>
              </div>
            )}
              </div>
            )}

            <div className="col-span-1 md:col-span-2 pt-4">
              <button
                type="button"
                onClick={handleNext}
                disabled={!bmiData}
                className={`w-full py-3 px-4 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
            <div className="col-span-1 md:col-span-2 pt-4">
              <button
                type="button"
                onClick={handleNext}
                disabled={!bmiData}
                className={`w-full py-3 px-4 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${
                  !bmiData
                    ? "opacity-50 cursor-not-allowed hover:scale-100"
                    : ""
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${
                  !bmiData
                    ? "opacity-50 cursor-not-allowed hover:scale-100"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
                Next
              </button>
            </div>
          </div>
        )}
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right duration-500">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Sex</span>
                </div>
                <select
                  name="Sex"
                  value={formData.Sex || ""}
                  onChange={handleSexChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md cursor-pointer`}
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right duration-500">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Sex</span>
                </div>
                <select
                  name="Sex"
                  value={formData.Sex || ""}
                  onChange={handleSexChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md cursor-pointer`}
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>

            {formData.Sex === "Female" && (
              <div className="space-y-2 group animate-in slide-in-from-top duration-300">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  } transition-colors duration-300`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Baby className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Number of Pregnancies</span>
                  </div>
                  <input
                    type="number"
                    name="Pregnancies"
                    placeholder="0–10"
                    min="0"
                    max="20"
                    value={formData.Pregnancies || ""}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    Total number of pregnancies.
                  </p>
                </label>
              </div>
            )}
            {formData.Sex === "Female" && (
              <div className="space-y-2 group animate-in slide-in-from-top duration-300">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  } transition-colors duration-300`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Baby className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Number of Pregnancies</span>
                  </div>
                  <input
                    type="number"
                    name="Pregnancies"
                    placeholder="0–10"
                    min="0"
                    max="20"
                    value={formData.Pregnancies || ""}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    Total number of pregnancies.
                  </p>
                </label>
              </div>
            )}

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Glucose (mg/dL)</span>
                </div>
                <input
                  type="number"
                  name="Glucose"
                  placeholder="70–99"
                  min="0"
                  max="300"
                  value={formData.Glucose || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Glucose (mg/dL)</span>
                </div>
                <input
                  type="number"
                  name="Glucose"
                  placeholder="70–99"
                  min="0"
                  max="300"
                  value={formData.Glucose || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Blood Pressure (mmHg)</span>
                </div>
                <input
                  type="number"
                  name="BloodPressure"
                  placeholder="90–120"
                  min="0"
                  max="200"
                  value={formData.BloodPressure || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Blood Pressure (mmHg)</span>
                </div>
                <input
                  type="number"
                  name="BloodPressure"
                  placeholder="90–120"
                  min="0"
                  max="200"
                  value={formData.BloodPressure || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Skin Thickness (mm)</span>
                </div>
                <input
                  type="number"
                  name="SkinThickness"
                  placeholder="10–30"
                  min="0"
                  max="50"
                  value={formData.SkinThickness || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Typical range: males 10–20 mm, females 20–30 mm.
                </p>
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Skin Thickness (mm)</span>
                </div>
                <input
                  type="number"
                  name="SkinThickness"
                  placeholder="10–30"
                  min="0"
                  max="50"
                  value={formData.SkinThickness || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Typical range: males 10–20 mm, females 20–30 mm.
                </p>
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Insulin (μU/ml)</span>
                </div>
                <input
                  type="number"
                  name="Insulin"
                  placeholder="2–25"
                  min="0"
                  max="200"
                  value={formData.Insulin || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Fasting insulin level.
                </p>
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Insulin (μU/ml)</span>
                </div>
                <input
                  type="number"
                  name="Insulin"
                  placeholder="2–25"
                  min="0"
                  max="200"
                  value={formData.Insulin || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Fasting insulin level.
                </p>
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <LineChart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Diabetes Pedigree Function</span>
                </div>
                <input
                  type="number"
                  name="DiabetesPedigreeFunction"
                  placeholder="0.1–2.0"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={formData.DiabetesPedigreeFunction || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Measures family history of diabetes.
                </p>
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <LineChart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Diabetes Pedigree Function</span>
                </div>
                <input
                  type="number"
                  name="DiabetesPedigreeFunction"
                  placeholder="0.1–2.0"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={formData.DiabetesPedigreeFunction || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  Measures family history of diabetes.
                </p>
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Age (years)</span>
                </div>
                <input
                  type="number"
                  name="Age"
                  placeholder="18–80"
                  min="0"
                  max="120"
                  value={formData.Age || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Age (years)</span>
                </div>
                <input
                  type="number"
                  name="Age"
                  placeholder="18–80"
                  min="0"
                  max="120"
                  value={formData.Age || ""}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md`}
                />
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>BMI (calculated)</span>
                </div>
                <input
                  type="text"
                  value={formData.BMI || ""}
                  readOnly
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200"
                      : "border-gray-300 bg-gray-100 text-gray-900"
                  } shadow-sm transition-all duration-300 cursor-not-allowed`}
                />
              </label>
            </div>

            <div className="col-span-1 md:col-span-2 pt-4 flex justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                className={`py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>BMI (calculated)</span>
                </div>
                <input
                  type="text"
                  value={formData.BMI || ""}
                  readOnly
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200"
                      : "border-gray-300 bg-gray-100 text-gray-900"
                  } shadow-sm transition-all duration-300 cursor-not-allowed`}
                />
              </label>
            </div>

            <div className="col-span-1 md:col-span-2 pt-4 flex justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                className={`py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg`}
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg`}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${
                  loading ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
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
          </div>
        )}

        {step === 3 && isLoggedIn && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right duration-500">
            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
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
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md cursor-pointer`}
                >
                  <option value="">Select Activity Level</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Goal</span>
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
                  } shadow-sm transition-all duration-300 ease-in-out focus:scale-[1.02] hover:shadow-md cursor-pointer`}
                >
                  <option value="">Select Goal</option>
                  <option value="Cutting">Cutting</option>
                  <option value="Standard">Standard</option>
                  <option value="Bulking">Bulking</option>
                </select>
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>Sex</span>
                </div>
                <input
                  type="text"
                  value={formData.Sex || ""}
                  readOnly
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200"
                      : "border-gray-300 bg-gray-100 text-gray-900"
                  } shadow-sm transition-all duration-300 cursor-not-allowed`}
                />
              </label>
            </div>

            <div className="space-y-2 group">
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Weight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>BMI (calculated)</span>
                </div>
                <input
                  type="text"
                  value={formData.BMI || ""}
                  readOnly
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? "border-gray-600 bg-gray-700 text-gray-200"
                      : "border-gray-300 bg-gray-100 text-gray-900"
                  } shadow-sm transition-all duration-300 cursor-not-allowed`}
                />
              </label>
            </div>

            {/* Display Prediction Result in Step 3 */}
            {formData.result && (
              <div className="col-span-1 md:col-span-2 mt-6 border-t pt-6 border-gray-200 dark:border-gray-700 animate-in fade-in duration-500">
                <PredictionResult
                  result={formData.result}
                  darkMode={darkMode}
                />
              </div>
            )}

            <div className="col-span-1 md:col-span-2 pt-4 flex justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                className={`py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.ActivityLevel || !formData.Goal}
                className={`flex-1 py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${
                  !formData.ActivityLevel || !formData.Goal
                    ? "opacity-50 cursor-not-allowed hover:scale-100"
                    : ""
                }`}
              >
                See Recommendations
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Remove the separate PredictionResult block since it's now in Step 3 */}
      {/* {formData.result && (
        <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-700 animate-in fade-in duration-500">
          <PredictionResult result={formData.result} darkMode={darkMode} />
          {formData.result.prediction !== "Error" && step === 2 && (
          {formData.result.prediction !== "Error" && step === 2 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleRecommendationClick}
                className={`py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                onClick={handleRecommendationClick}
                className={`py-3 px-6 rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ease-in-out ${
                  darkMode
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg`}
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg`}
              >
                Check My Recommendation
                Check My Recommendation
              </button>
            </div>
          )}
        </div>
      )} */}

      {/* Enhanced BMI Popup Modal with Auto-progression */}
      {showBmiPopup && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
            isPopupVisible ? "opacity-100 backdrop-blur-sm" : "opacity-0"
          }`}
        >
          <div
            className={`relative w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-out ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            } ${
              isPopupVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <div className="text-center">
              <div className="mb-6">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    darkMode ? "bg-purple-600" : "bg-purple-100"
                  } transition-colors duration-300`}
                >
                  <Weight
                    className={`h-8 w-8 ${
                      darkMode ? "text-white" : "text-purple-600"
                    }`}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 transition-colors duration-300">
                BMI Calculated!
              </h3>

              {bmiData && (
                <div className="mb-6 space-y-2">
                  <p className="text-3xl font-bold text-purple-600 transition-colors duration-300">
                    {bmiData.bmi}
                  </p>
                  <p
                    className={`text-lg font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } transition-colors duration-300`}
                  >
                    Classification: {bmiData.classification}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    Proceeding to step 2 automatically...
                  </p>
                </div>
              )}

              {/* Progress indicator */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-[3000ms] ease-linear"
                  style={{ width: isPopupVisible ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;

