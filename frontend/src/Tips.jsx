import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Tips = ({ predictionData, darkMode }) => {
  const { prediction } = predictionData?.result || {};
  const isDiabetic = prediction === 'Diabetic' || prediction === 'Borderline Risk';

  const tips = isDiabetic
    ? [
        {
          text: 'Monitor your blood sugar levels regularly.',
          description: 'Regular monitoring helps you and your doctor make informed decisions about your diet and medication.',
          image: 'https://images.unsplash.com/photo-1576092768241-d468875b2f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Choose low-glycemic index foods.',
          description: 'Low-GI foods like whole grains and non-starchy vegetables help manage blood sugar spikes effectively.',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Stay hydrated and avoid sugary drinks.',
          description: 'Opt for water or unsweetened teas to maintain hydration without spiking blood sugar.',
          image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Incorporate fiber-rich foods.',
          description: 'Vegetables, legumes, and whole grains improve digestion and promote satiety, aiding blood sugar control.',
          image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Schedule regular check-ups.',
          description: 'Routine health screenings ensure timely adjustments to your diet and lifestyle for optimal health.',
          image: 'https://images.unsplash.com/photo-1576765607924-3f7b8410d9c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
      ]
    : [
        {
          text: 'Maintain a balanced diet.',
          description: 'Incorporate a variety of whole foods like fruits, vegetables, and lean proteins to prevent diabetes risk.',
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Engage in regular physical activity.',
          description: 'Aim for at least 150 minutes of moderate exercise weekly to maintain a healthy weight.',
          image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Limit processed foods and sugars.',
          description: 'Reducing processed foods and added sugars lowers your risk of developing diabetes.',
          image: 'https://images.unsplash.com/photo-1511690656952-343557703d06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Get enough sleep.',
          description: 'Aim for 7-9 hours of quality sleep to support metabolic health and overall well-being.',
          image: 'https://images.unsplash.com/photo-1533240332313-0db1b4681c35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          text: 'Stay proactive with health screenings.',
          description: 'Annual check-ups help detect early signs of health issues, keeping you on track.',
          image: 'https://images.unsplash.com/photo-1581594698314-22f3990cd02f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
      ];

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center space-x-3 mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2919/2919596.png"
          alt="Health Tips Icon"
          className="w-8 h-8"
        />
        <h3 className="text-2xl font-bold">Health Tips</h3>
      </div>
      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Tips to help you manage or prevent diabetes based on your{' '}
        <span className="font-semibold">{isDiabetic ? 'diabetic' : 'non-diabetic'}</span> status.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} inline-block w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-400' : 'bg-gray-600'
            }"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full relative"
      >
        {tips.map((tip, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative rounded-lg overflow-hidden ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <img
                src={tip.image}
                alt={`Tip ${index + 1}`}
                className="w-full h-64 object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-xl font-semibold text-white">{tip.text}</h4>
                <p className="text-sm text-gray-200 mt-2">{tip.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <div className={`swiper-button-prev ${darkMode ? 'text-gray-200' : 'text-gray-800'} after:text-2xl after:content-['←']`}></div>
        <div className={`swiper-button-next ${darkMode ? 'text-gray-200' : 'text-gray-800'} after:text-2xl after:content-['→']`}></div>
        {/* Custom Pagination Container */}
        <div className="swiper-pagination mt-4"></div>
      </Swiper>
    </div>
  );
};

export default Tips;