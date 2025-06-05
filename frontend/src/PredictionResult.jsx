"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Activity,
  Heart,
  Droplets,
  ChevronDown,
  ChevronUp,
  Target,
} from "lucide-react";

function PredictionResult({ result, darkMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    if (result) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [result]);

  if (!result) return null;

  // Get risk level for styling
  const getRiskLevel = () => {
    if (result.prediction === "Error") return "error";
    if (result.prediction === "Diabetic") return "high";
    if (result.prediction === "Borderline Risk") return "medium";
    return "low";
  };

  const riskLevel = getRiskLevel();

  // Get appropriate icon based on risk level
  const getIcon = () => {
    switch (riskLevel) {
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      case "high":
        return <AlertTriangle className="h-5 w-5" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5" />;
      case "low":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  // Get appropriate colors and styles based on risk level
  const getStyles = () => {
    switch (riskLevel) {
      case "error":
      case "high":
        return {
          border: "border-red-300 dark:border-red-600",
          bg: "bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20",
          text: "text-red-700 dark:text-red-300",
          iconBg: "bg-red-100 dark:bg-red-900/40",
          badge: "bg-red-200 dark:bg-red-800/60 text-red-800 dark:text-red-200",
          pattern: "bg-red-500/5 dark:bg-red-400/5",
        };
      case "medium":
        return {
          border: "border-yellow-300 dark:border-yellow-600",
          bg: "bg-gradient-to-br from-yellow-50 to-amber-100/50 dark:from-yellow-950/30 dark:to-yellow-900/20",
          text: "text-yellow-700 dark:text-yellow-300",
          iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
          badge:
            "bg-yellow-200 dark:bg-yellow-800/60 text-yellow-800 dark:text-yellow-200",
          pattern: "bg-yellow-500/5 dark:bg-yellow-400/5",
        };
      case "low":
        return {
          border: "border-green-300 dark:border-green-600",
          bg: "bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/30 dark:to-green-900/20",
          text: "text-green-700 dark:text-green-300",
          iconBg: "bg-green-100 dark:bg-green-900/40",
          badge:
            "bg-green-200 dark:bg-green-800/60 text-green-800 dark:text-green-200",
          pattern: "bg-green-500/5 dark:bg-green-400/5",
        };
      default:
        return {
          border: "border-blue-300 dark:border-blue-600",
          bg: "bg-gradient-to-br from-blue-50 to-sky-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
          text: "text-blue-700 dark:text-blue-300",
          iconBg: "bg-blue-100 dark:bg-blue-900/40",
          badge:
            "bg-blue-200 dark:bg-blue-800/60 text-blue-800 dark:text-blue-200",
          pattern: "bg-blue-500/5 dark:bg-blue-400/5",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`mt-4 rounded-xl border-2 overflow-hidden transition-all duration-500 ease-in-out transform shadow-sm hover:shadow-md relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${styles.border} ${styles.bg}`}
    >
      {/* Subtle pattern overlay */}
      <div
        className={`absolute inset-0 opacity-30 ${styles.pattern}`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {result.prediction === "Error" ? (
        <div className="relative z-10 p-4 flex items-center space-x-3">
          <div className={`p-2 rounded-full ${styles.iconBg}`}>
            <AlertCircle className={`h-5 w-5 ${styles.text}`} />
          </div>
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {result.diet_suggestion}
          </p>
        </div>
      ) : (
        <div className="relative z-10 p-4">
          {/* Main result row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${styles.iconBg} shadow-sm`}>
                <span className={styles.text}>{getIcon()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${styles.text}`}>
                  {result.prediction}
                </span>
                {result.risk_percentage && (
                  <div className="flex items-center gap-1">
                    <Target className={`h-3 w-3 ${styles.text}`} />
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded-full shadow-sm ${styles.badge}`}
                    >
                      {result.risk_percentage.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowRecommendation(!showRecommendation)}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all transform hover:scale-105 shadow-sm ${
                darkMode
                  ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600"
                  : "bg-white/80 text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200"
              }`}
            >
              Details
              {showRecommendation ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>

          {/* Metrics row with enhanced styling */}
          <div className="flex items-center gap-6 text-sm">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm ${
                darkMode
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white/60 border border-gray-200"
              }`}
            >
              <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Droplets className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span
                className={`font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Glucose:
              </span>
              <span
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {result.glucose}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm ${
                darkMode
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white/60 border border-gray-200"
              }`}
            >
              <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/50">
                <Heart className="h-3 w-3 text-red-600 dark:text-red-400" />
              </div>
              <span
                className={`font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                BP:
              </span>
              <span
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {result.blood_pressure}
              </span>
            </div>
          </div>

          {/* Expandable recommendation */}
          {showRecommendation && (
            <div
              className={`mt-4 p-3 rounded-lg border animate-in slide-in-from-top duration-200 ${
                darkMode
                  ? "bg-gray-800/40 border-gray-700 backdrop-blur-sm"
                  : "bg-white/70 border-gray-200 backdrop-blur-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className={`h-3 w-3 ${styles.text}`} />
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${styles.text}`}
                >
                  Recommendation
                </p>
              </div>
              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {result.diet_suggestion}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Enhanced bottom indicator bar with gradient */}
      {result.prediction !== "Error" && (
        <div className="relative">
          <div
            className={`h-1.5 w-full ${
              riskLevel === "high"
                ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                : riskLevel === "medium"
                ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600"
                : "bg-gradient-to-r from-green-400 via-green-500 to-emerald-600"
            }`}
          ></div>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default PredictionResult;
