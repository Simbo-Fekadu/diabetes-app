"use client";

function LandingPage({ onTryIt, onSignUp, onDoctorPage, onShowLogin, darkMode }) {
  const diabetesCategories = [
    { title: "Prediabetes", color: "text-purple-600" },
    { title: "Life With Diabetes", color: "text-blue-600" },
    { title: "Newly Diagnosed", color: "text-purple-600" },
    { title: "Type 1 Diabetes", color: "text-purple-600" },
    { title: "Type 2 Diabetes", color: "text-purple-600" },
    { title: "Diabetes Complications", color: "text-gray-600" },
  ];

  const healthFeatures = [
    "Fitness",
    "Weight Management",
    "Nutrition and Your Health",
    "Medication",
    "Better Choices for Life Program",
  ];

  const nutritionFeatures = [
    "Healthy Eating Tips",
    "Diabetes & Food",
    "Recipes from Diabetes Food Hub",
  ];

  const toolsResources = [
    "Diabetes Education Programs",
    "For Caregivers",
    "Programs & Services Directory",
    "Tests & Calculators",
    "Managing Health Care Costs",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
              <span className="text-purple-600 font-bold text-xl">P</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShowLogin} 
              className="px-6 py-2.5 text-base font-medium transition-all duration-300 
              hover:text-purple-200 border border-transparent hover:border-purple-200/20 rounded-xl
              hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105"
            >
              Login
            </button>
            <button 
              onClick={onSignUp}
              className="px-6 py-2.5 text-base font-medium bg-white/10 backdrop-blur-sm
              rounded-xl border border-white/20 hover:border-white/40
              transition-all duration-300 hover:bg-white/20
              hover:shadow-lg hover:shadow-white/20 hover:scale-105
              hover:text-white"
            >
              Sign up
            </button>
            <button
              onClick={onDoctorPage}
              className="px-6 py-2.5 text-base font-medium transition-all duration-300 
              hover:text-purple-200 border border-transparent hover:border-purple-200/20 rounded-xl
              hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105"
            >
              Try bulk prediction
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Predict <span className="text-purple-200">Diabetes</span>
                <br />
                Risk With Precision
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-purple-100 leading-relaxed">
                Assess your risk of diabetes with our advanced prediction tool
                powered by machine learning. Enter your health metrics and get
                instant insights, along with personalized diet suggestions to
                manage your health effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onSignUp}
                  className="border border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                >
                  Sign Up for More Features
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/20">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/images/About us video 1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </header>

      {/* Food & Nutrition Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Food image */}
              <div className="relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-[300px]">
                <img
                  src="/images/healthy food.png"
                  alt="Healthy nutritious meal with vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                {diabetesCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 text-center transform hover:scale-105 hover:bg-purple-50"
                  >
                    <svg
                      className={`w-8 h-8 mx-auto mb-3 ${category.color}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-semibold text-sm">{category.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Are You At Risk Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Are you at risk?
              </h2>
              <p className="text-lg mb-8 text-purple-100">
                Learning your risk is the first step in taking action against
                diabetes. Take our 60-Second Diabetes Risk Test today to receive
                actionable next steps in your health journey.
              </p>
              <button 
                onClick={onTryIt}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                Take the Test
              </button>
            </div>

            <div>
              {/* Risk assessment image */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-[300px]">
                <img
                  src="/images/are you at risk.jpg"
                  alt="Risk assessment illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life with Diabetes Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Life with Diabetes
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                Whether you were recently diagnosed, have been living with type
                1 for years, or are helping out a loved one, the path to
                understanding diabetes starts here.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                  <span className="group-hover:text-green-300 transition-colors duration-300">
                    Newly Diagnosed
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                  <span className="group-hover:text-green-300 transition-colors duration-300">
                    Living with Type 1
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                  <span className="group-hover:text-green-300 transition-colors duration-300">
                    Living with Type 2
                  </span>
                </li>
              </ul>
            </div>

            <div>
              {/* Ladies image */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-[300px]">
                <img
                  src="/images/mom and daughter.png"
                  alt="Mother and daughter embracing - women supporting each other"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health & Wellness Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                Health & Wellness
              </h2>
              <p className="text-lg mb-8 text-gray-600">
                Find the tools, tips, and insights you need to take action and
                live life to the fullest—from understanding your prescriptions
                to starting a new exercise regimen.
              </p>
              <ul className="space-y-3">
                {healthFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:bg-teal-400 transition-colors duration-300"></div>
                    <span className="text-gray-700 group-hover:text-teal-600 transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Health and fitness image */}
              <div className="rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-[300px]">
                <img
                  src="/images/health and wellness.jpg"
                  alt="People exercising outdoors - health and fitness"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food & Nutrition Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Chef image */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                <img
                  src="/images/healthy food.png"
                  alt="Chef cooking - healthy cooking and meal preparation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Food & Nutrition
              </h2>
              <p className="text-lg mb-8 text-teal-100">
                Eating right is a powerful tool in the management of your
                diabetes, but it doesn't have to be boring—it's all about
                finding a delicious balance.
              </p>
              <ul className="space-y-3">
                {nutritionFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-white rounded-full group-hover:bg-teal-200 transition-colors duration-300"></div>
                    <span className="group-hover:text-teal-200 transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Resources Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Tools & Resources
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                When it comes to diabetes, you don't have to do this alone.
                Learn your rights and get help with the resources and assistance
                programs you need to navigate a diagnosis.
              </p>
              <ul className="space-y-3">
                {toolsResources.map((resource, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-teal-400 rounded-full group-hover:bg-teal-300 transition-colors duration-300"></div>
                    <span className="text-gray-300 group-hover:text-teal-300 transition-colors duration-300">
                      {resource}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Resources image */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-[300px]">
                <img
                  src="/images/resources.png"
                  alt="Digital tools and resources for diabetes management"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Hydrated Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Water image */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-[300px]">
                <img
                  src="/images/stay hydrated.jpg"
                  alt="Person drinking water - staying hydrated"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Stay Hydrated!
              </h2>
              <p className="text-lg text-purple-100">
                Drink more water and stay hydrated with the Diabetes Association
                40 oz stainless steel tumbler!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="font-bold">Predict Diabetes</span>
              </div>
              <p className="text-gray-400">
                Advanced ML-powered diabetes risk prediction and health
                management platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Health Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Risk Assessment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Diet Planner
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Health Tracker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Education
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Support Groups
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Expert Articles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Predict Diabetes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
