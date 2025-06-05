import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DoctorUploadPage = ({ darkMode }) => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict_csv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.predictions) {
        setResults(data.predictions);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to upload file: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFile(null);
    setResults([]);
    setError(null);
    navigate("/");
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-4 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <button
        onClick={handleBack}
        className={`flex items-center mb-4 text-sm font-medium ${
          darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"
        }`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </button>
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-indigo-400" : "text-gray-800"
        }`}
      >
        Doctor CSV Prediction
      </h2>
      <div className="mb-4">
        <label
          className={`block text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Upload CSV File
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className={`w-full p-2 border rounded-md ${
            darkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
          }`}
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 rounded-full font-semibold transition-colors ${
          darkMode
            ? `bg-green-600 hover:bg-green-500 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`
            : `bg-green-600 hover:bg-green-700 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`
        }`}
      >
        {loading ? "Uploading..." : "Upload & Predict"}
      </button>

      {error && (
        <div
          className={`mt-4 p-4 rounded-md ${
            darkMode ? "bg-red-800 text-red-200" : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div
          className={`mt-6 p-4 rounded-md ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              darkMode ? "text-indigo-400" : "text-gray-800"
            }`}
          >
            Prediction Results
          </h3>
          <ul className="list-disc pl-5">
            {results.map((item, idx) => (
              <li
                key={idx}
                className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                <span className="font-bold">{item.name}:</span> {item.prediction} (
                {item.risk_percentage.toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorUploadPage;