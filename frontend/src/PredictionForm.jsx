import React from "react";

function PredictionForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  darkMode,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl shadow-xl p-8 space-y-4 transition-colors ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sex Dropdown */}
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Sex
          </label>
          <select
            name="Sex"
            value={formData.Sex || ""}
            onChange={handleChange}
            className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
            required
          >
            <option value="" disabled>
              Select Sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Conditionally render Pregnancies field */}
        {formData.Sex === "Female" && (
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
        )}

        {[
          { name: "Glucose", label: "Glucose", min: 0 },
          { name: "BloodPressure", label: "Blood Pressure", min: 0 },
          { name: "SkinThickness", label: "Skin Thickness", min: 0 },
          { name: "Insulin", label: "Insulin", min: 0 },
          { name: "BMI", label: "BMI", min: 0, step: "0.1" },
          {
            name: "DiabetesPedigreeFunction",
            label: "Diabetes Pedigree Function",
            min: 0,
            step: "0.1",
          },
          { name: "Age", label: "Age", min: 0 },
        ].map((field) => (
          <div key={field.name}>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {field.label}
            </label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`mt-1 w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
              placeholder={`Enter ${field.label}`}
              min={field.min}
              step={field.step || undefined}
              required
            />
          </div>
        ))}
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
  );
}

export default PredictionForm;
