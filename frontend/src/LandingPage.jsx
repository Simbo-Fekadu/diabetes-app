"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

function LandingPage({ darkMode, onTryIt, onSignUp, onToggleDarkMode }) {
  // Ensure dark mode class is applied to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 text-gray-900 dark:text-gray-200 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={onToggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full z-50 transition-colors bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-yellow-300 dark:hover:bg-gray-600"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-300 dark:bg-purple-600"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-10 blur-3xl bg-indigo-300 dark:bg-indigo-600"></div>

        {/* Animated circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full opacity-30 bg-purple-200 dark:bg-purple-500"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full opacity-30 bg-indigo-200 dark:bg-indigo-500"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-12">
        {/* Left side content */}
        <motion.div
          className="text-center lg:text-left lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium tracking-wider uppercase border bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
            AI-Powered Health Analysis
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
          >
            Predict{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Diabetes
            </span>{" "}
            Risk with Precision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700 dark:text-gray-300"
          >
            Assess your risk of diabetes with our advanced prediction tool
            powered by machine learning. Enter your health metrics and get
            instant insights, along with personalized diet suggestions to manage
            your health effectively.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
            <motion.button
              onClick={onTryIt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-8 rounded-full text-base font-medium text-white shadow-lg transition-all duration-300 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Try It Now
            </motion.button>

            <motion.button
              onClick={onSignUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-8 rounded-full text-base font-medium transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign Up for More Features
            </motion.button>
          </div>
        </motion.div>

        {/* Right side image/illustration */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-600/10 dark:to-indigo-600/10"></div>

            {/* Dashboard mockup */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Diabetes Risk Analysis
                </div>
              </div>

              <div className="rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-700">
                <div className="h-40 rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-600/20 dark:to-purple-600/20 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-indigo-500 dark:text-indigo-400 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Glucose
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    120 mg/dL
                  </div>
                </div>
                <div className="rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    BMI
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    24.5
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/30">
                <div className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-300">
                  Prediction Result
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-200">
                    Low Risk
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300">
                    Healthy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features section */}
      <motion.div
        className="w-full max-w-6xl mx-auto mt-12 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
              Accurate Predictions
            </h3>
            <p>
              Our AI model is trained on extensive medical data to provide
              highly accurate diabetes risk assessments.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <svg
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
              Personalized Insights
            </h3>
            <p>
              Get customized diet suggestions and health recommendations based
              on your unique health profile.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
              Private & Secure
            </h3>
            <p>
              Your health data is encrypted and never shared. We prioritize your
              privacy and data security.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
