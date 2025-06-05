"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2, Moon, Sun } from "lucide-react";

// Add shimmer animation
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = shimmerKeyframes;
document.head.appendChild(styleSheet);

function Login({ setToken, darkMode: parentDarkMode, showSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [messageType, setMessageType] = useState("error");
  const [darkMode, setDarkMode] = useState(parentDarkMode);

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

    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== parentDarkMode) {
      setDarkMode(parentDarkMode);
    }
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, parentDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      const token = response.data.token;
      console.log("Login successful, received token:", token); // Debug log
      setToken(token);
      setMessageType("success");
      setMessage("Login successful! Redirecting...");

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        "Login failed: " + (error.response?.data.message || "Server error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`p-8 rounded-2xl transition-colors duration-200 ${
        darkMode ? "bg-gray-800/95 text-gray-100" : "bg-white/95 text-gray-900"
      }`}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-105 shadow-lg">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
        </div>
        <h2
          className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
          }`}
        >
          Welcome Back
        </h2>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Please sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Username
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 pl-10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600 text-white focus:ring-purple-500 focus:bg-gray-700"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500 focus:bg-white"
              } border`}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 pl-10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600 text-white focus:ring-purple-500 focus:bg-gray-700"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500 focus:bg-white"
              } border`}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              tabIndex="-1"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={`h-4 w-4 rounded-md focus:ring-offset-0 focus:ring-2 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                  : "border-gray-300 text-purple-600 focus:ring-purple-500"
              }`}
            />
            <label
              htmlFor="remember-me"
              className={`ml-2 block text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className={`font-medium hover:underline ${
                darkMode
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-500"
              }`}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-4 px-6 rounded-xl text-white font-semibold shadow-xl 
          bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 hover:from-purple-700 hover:via-indigo-600 hover:to-purple-700
          bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500
          transform hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
          motion-safe:animate-shimmer
          ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-2xl hover:shadow-purple-500/20"}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-3" />
              <span className="text-lg">Signing in...</span>
            </>
          ) : (
            <span className="text-lg">Sign in</span>
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-xl ${
            messageType === "success"
              ? darkMode
                ? "bg-green-900/50 text-green-100 border border-green-800"
                : "bg-green-50 text-green-800 border border-green-200"
              : darkMode
              ? "bg-red-900/50 text-red-100 border border-red-800"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <p className="text-center text-sm">{message}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Don't have an account?{" "}
          <button
            onClick={showSignup}
            className={`font-medium hover:underline ${
              darkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-500"
            }`}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
