"use client"

import { useState } from "react"
import { Leaf, Heart, Droplets, Utensils, ArrowRight, Info } from "lucide-react"

function NutritionSuggestion({ predictionData, darkMode }) {
  const [expandedCategory, setExpandedCategory] = useState(null)

  // Diabetes-friendly food categories with detailed recommendations
  const foodCategories = [
    {
      id: "vegetables",
      title: "Non-Starchy Vegetables",
      icon: <Leaf className="h-5 w-5" />,
      description: "Low in carbs, high in fiber and nutrients. Aim for at least 3-5 servings daily.",
      items: [
        {
          name: "Leafy Greens",
          examples: "Spinach, Kale, Collard greens, Swiss chard",
          benefits: "Rich in vitamins A, C, E, K, and many B vitamins. High in iron, magnesium and potassium.",
          glycemicImpact: "Very Low",
          servingSize: "2 cups raw or 1 cup cooked",
          image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
        },
        {
          name: "Cruciferous Vegetables",
          examples: "Broccoli, Cauliflower, Brussels sprouts, Cabbage",
          benefits: "Contains sulforaphane which may help lower blood sugar. High in fiber and vitamin C.",
          glycemicImpact: "Low",
          servingSize: "1 cup cooked",
          image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
        },
        {
          name: "Colorful Vegetables",
          examples: "Bell peppers, Tomatoes, Eggplant, Zucchini",
          benefits: "Rich in antioxidants and phytonutrients. Low calorie and filling.",
          glycemicImpact: "Low",
          servingSize: "1 cup raw or cooked",
          image: "https://images.unsplash.com/photo-1518843875459-f738682238a6",
        },
        {
          name: "Root Vegetables (Non-Starchy)",
          examples: "Radishes, Turnips, Jicama",
          benefits: "Good source of fiber and vitamin C. Adds crunch to meals without many carbs.",
          glycemicImpact: "Low to Medium",
          servingSize: "½ cup sliced",
          image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
        },
      ],
    },
    {
      id: "protein",
      title: "Lean Proteins",
      icon: <Heart className="h-5 w-5" />,
      description: "Essential for muscle maintenance without raising blood sugar. Include with each meal.",
      items: [
        {
          name: "Fish and Seafood",
          examples: "Salmon, Tuna, Sardines, Mackerel, Trout",
          benefits: "Rich in omega-3 fatty acids which may improve insulin sensitivity. High-quality protein.",
          glycemicImpact: "None",
          servingSize: "3-4 oz cooked",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        },
        {
          name: "Poultry",
          examples: "Chicken breast, Turkey, Egg whites",
          benefits: "Low in fat and high in protein. Versatile and easy to prepare.",
          glycemicImpact: "None",
          servingSize: "3-4 oz cooked",
          image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
        },
        {
          name: "Plant-Based Proteins",
          examples: "Tofu, Tempeh, Edamame, Legumes",
          benefits: "Contains fiber along with protein. May help with cholesterol management.",
          glycemicImpact: "Low to Medium",
          servingSize: "½ cup cooked",
          image: "https://images.unsplash.com/photo-1546805022-9f8a92acda51",
        },
        {
          name: "Dairy Proteins",
          examples: "Greek yogurt, Cottage cheese",
          benefits: "Contains calcium and vitamin D. Probiotics in yogurt may help gut health.",
          glycemicImpact: "Low",
          servingSize: "6 oz yogurt or ½ cup cottage cheese",
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
        },
      ],
    },
    {
      id: "fats",
      title: "Healthy Fats",
      icon: <Droplets className="h-5 w-5" />,
      description: "Slows digestion and prevents blood sugar spikes. Choose unsaturated sources.",
      items: [
        {
          name: "Avocados",
          examples: "Hass avocado, Florida avocado",
          benefits: "Rich in monounsaturated fats and potassium. Contains fiber that helps with blood sugar control.",
          glycemicImpact: "Very Low",
          servingSize: "¼ to ½ avocado",
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578",
        },
        {
          name: "Nuts and Seeds",
          examples: "Almonds, Walnuts, Chia seeds, Flaxseeds",
          benefits: "Contains fiber, protein, and healthy fats. May improve heart health and reduce inflammation.",
          glycemicImpact: "Very Low",
          servingSize: "¼ cup nuts or 2 tbsp seeds",
          image: "https://images.unsplash.com/photo-1525351159099-81893194469e",
        },
        {
          name: "Olive Oil",
          examples: "Extra virgin olive oil",
          benefits: "Rich in monounsaturated fats and antioxidants. May improve insulin sensitivity.",
          glycemicImpact: "None",
          servingSize: "1 tablespoon",
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
        },
        {
          name: "Fatty Fish",
          examples: "Salmon, Mackerel, Sardines",
          benefits: "High in omega-3 fatty acids which may reduce inflammation and improve heart health.",
          glycemicImpact: "None",
          servingSize: "3-4 oz cooked",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        },
      ],
    },
    {
      id: "complex-carbs",
      title: "Complex Carbohydrates",
      icon: <Utensils className="h-5 w-5" />,
      description: "Choose high-fiber, low-glycemic options in appropriate portions.",
      items: [
        {
          name: "Whole Grains",
          examples: "Quinoa, Brown rice, Barley, Oats",
          benefits: "Contains fiber which slows digestion and prevents blood sugar spikes. Rich in B vitamins.",
          glycemicImpact: "Medium",
          servingSize: "⅓ cup cooked",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        },
        {
          name: "Legumes",
          examples: "Lentils, Chickpeas, Black beans, Kidney beans",
          benefits: "High in fiber and protein. Contains resistant starch which may improve insulin sensitivity.",
          glycemicImpact: "Medium",
          servingSize: "½ cup cooked",
          image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e1",
        },
        {
          name: "Starchy Vegetables (in moderation)",
          examples: "Sweet potatoes, Butternut squash, Green peas",
          benefits: "Contains more nutrients than refined grains. Fiber helps slow digestion.",
          glycemicImpact: "Medium to High",
          servingSize: "½ cup cooked",
          image: "https://images.unsplash.com/photo-1596097635121-14b38c5d7a55",
        },
        {
          name: "Berries",
          examples: "Blueberries, Strawberries, Raspberries, Blackberries",
          benefits: "High in antioxidants and fiber. Lower in sugar than most fruits.",
          glycemicImpact: "Low to Medium",
          servingSize: "¾ cup",
          image: "https://images.unsplash.com/photo-1467825487722-2d5a5e517271",
        },
      ],
    },
  ]

  // Calculate risk level based on prediction data
  const getRiskLevel = () => {
    const riskPercentage = predictionData?.risk_percentage || 0
    if (riskPercentage > 70) return "high"
    if (riskPercentage > 40) return "moderate"
    return "low"
  }

  const riskLevel = getRiskLevel()

  // Diabetes management tips based on risk level
  const diabetesTips = {
    high: [
      "Monitor your blood glucose levels regularly as recommended by your healthcare provider",
      "Aim for consistent meal timing and portion sizes to maintain stable blood sugar",
      "Include protein and healthy fat with each meal to slow carbohydrate absorption",
      "Stay physically active - aim for at least 150 minutes of moderate exercise weekly",
      "Stay well-hydrated with water rather than sugary beverages",
    ],
    moderate: [
      "Focus on a balanced diet rich in vegetables, lean proteins, and healthy fats",
      "Limit refined carbohydrates and added sugars",
      "Maintain regular physical activity - aim for 30 minutes most days",
      "Consider keeping a food journal to identify how different foods affect you",
      "Get regular check-ups to monitor your health status",
    ],
    low: [
      "Continue healthy eating habits with plenty of vegetables and whole foods",
      "Stay physically active to maintain insulin sensitivity",
      "Maintain a healthy weight through balanced nutrition and regular exercise",
      "Limit processed foods and added sugars",
      "Stay hydrated and get adequate sleep for overall health",
    ],
  }

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className={`p-6 ${darkMode ? "bg-indigo-900/40" : "bg-indigo-50"}`}>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Nutrition Recommendations for Diabetes Management
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Based on your health assessment, here are personalized nutrition recommendations to help manage blood sugar
          levels.
        </p>
      </div>

      <div className="p-6">
        <div
          className={`mb-6 p-4 rounded-lg ${
            riskLevel === "high"
              ? darkMode
                ? "bg-red-900/20"
                : "bg-red-50"
              : riskLevel === "moderate"
                ? (darkMode ? "bg-yellow-900/20" : "bg-yellow-50")
                : (darkMode ? "bg-green-900/20" : "bg-green-50")
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 flex items-center ${
              riskLevel === "high"
                ? darkMode
                  ? "text-red-400"
                  : "text-red-600"
                : riskLevel === "moderate"
                  ? (darkMode ? "text-yellow-400" : "text-yellow-600")
                  : (darkMode ? "text-green-400" : "text-green-600")
            }`}
          >
            <Info className="h-5 w-5 mr-2" />
            {riskLevel === "high"
              ? "High Risk - Priority Recommendations"
              : riskLevel === "moderate"
                ? "Moderate Risk - Important Recommendations"
                : "Low Risk - Preventive Recommendations"}
          </h3>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {diabetesTips[riskLevel].map((tip, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          {foodCategories.map((category) => (
            <div
              key={category.id}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } ${expandedCategory === category.id ? "shadow-md" : ""}`}
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className={`w-full p-4 text-left flex items-center justify-between ${
                  expandedCategory === category.id ? (darkMode ? "bg-indigo-900/30" : "bg-indigo-50") : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      darkMode ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{category.title}</h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{category.description}</p>
                  </div>
                </div>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${
                    expandedCategory === category.id ? "transform rotate-180" : ""
                  } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedCategory === category.id && (
                <div className={`p-4 ${darkMode ? "border-t border-gray-700" : "border-t border-gray-200"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className={`font-semibold text-lg mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                            {item.name}
                          </h4>
                          <p className={`text-sm mb-2 ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}>
                            <span className="font-medium">Examples:</span> {item.examples}
                          </p>
                          <p className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {item.benefits}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              Serving: {item.servingSize}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.glycemicImpact === "Very Low" || item.glycemicImpact === "Low"
                                  ? darkMode
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-green-100 text-green-700"
                                  : item.glycemicImpact === "Medium"
                                    ? (darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-700")
                                    : (darkMode ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-700")
                              }`}
                            >
                              Glycemic Impact: {item.glycemicImpact}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NutritionSuggestion
