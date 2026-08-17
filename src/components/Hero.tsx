import React from 'react';
import { Star, MapPin, ChevronDown, Utensils } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/restaurantData';

interface HeroProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section id="hero" className="relative pt-36 sm:pt-44 pb-16 lg:pb-24 overflow-hidden bg-[#F6F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side (~45-50% width) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left rtl:lg:text-right">
            
            {/* Trust Signal & Location */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-[#F6F2E9] border border-[#111111]/20 px-3.5 py-1.5 shadow-sm">
                {/* Google Icon SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29c-.82 1.64-1.29 3.48-1.29 5.42s.47 3.78 1.29 5.42l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-xs font-black text-[#111111]">
                  4.0 ★
                </span>
                <span className="text-[11px] font-bold text-[#111111]/70">
                  2,126 Google Reviews
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-[#0E5135]/10 text-[#0E5135] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider border border-[#0E5135]/20">
                <MapPin className="w-3.5 h-3.5 text-[#E98518]" />
                <span>Hara, Al Wizarat</span>
              </div>
            </div>

            {/* Oversized Typography */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-[#111111]">
              {language === 'EN' ? (
                <>
                  Riyadh’s <br />
                  <span className="text-[#0E5135]">Taste of</span> <br />
                  Pakistan
                </>
              ) : (
                <>
                  طعم <br />
                  <span className="text-[#0E5135]">باكستان الأصيل</span> <br />
                  في الرياض
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#111111]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Karachi-style biryani. Slow-cooked nihari. Fire-grilled BBQ. Authentic Pakistani flavours in the heart of Riyadh.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E98518] hover:bg-[#0E5135] text-white text-xs font-black uppercase tracking-widest px-8 py-4 transition-all shadow-md"
              >
                <span>{t.orderBtn}</span>
              </button>

              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F6F2E9] text-xs font-black uppercase tracking-widest px-8 py-4 transition-all shadow-sm"
              >
                <Utensils className="w-4 h-4 text-[#E98518]" />
                <span>{t.exploreMenuBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Side - Dominant Cinematic Food Photography */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div className="relative z-10 w-full max-w-[520px] bg-[#111111] border border-[#111111]/20 shadow-2xl p-3 sm:p-4 text-[#F6F2E9] overflow-hidden">
              
              {/* Copper Handi Photo Frame */}
              <div className="relative z-10 w-full h-[360px] sm:h-[440px] overflow-hidden border border-[#F6F2E9]/10">
                {/* Visible Steam FX */}
                <div className="absolute top-6 left-1/3 z-20 pointer-events-none">
                  <div className="w-12 h-24 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full animate-steam-1"></div>
                </div>
                <div className="absolute top-10 left-1/2 z-20 pointer-events-none">
                  <div className="w-16 h-28 bg-gradient-to-t from-white/35 to-transparent blur-md rounded-full animate-steam-2"></div>
                </div>
                <div className="absolute top-8 left-2/3 z-20 pointer-events-none">
                  <div className="w-10 h-20 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full animate-steam-3"></div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop"
                  alt="Authentic Karachi Chicken Biryani in Copper Vessel"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Floating Product Labels */}
                <div className="absolute bottom-4 left-4 bg-[#111111]/90 backdrop-blur-md border border-[#F6F2E9]/20 px-3 py-1.5 shadow-lg">
                  <span className="block text-xs font-black text-[#F6F2E9]">
                    {language === 'EN' ? 'Chicken Biryani' : 'برياني دجاج'}
                  </span>
                  <span className="block text-[11px] font-extrabold text-[#E98518]">SAR 34</span>
                </div>

                <div className="absolute top-4 right-4 bg-[#111111]/90 backdrop-blur-md border border-[#F6F2E9]/20 px-3 py-1.5 shadow-lg">
                  <span className="block text-xs font-black text-[#F6F2E9]">
                    {language === 'EN' ? 'Maghaz Nihari' : 'نهاري بالمخ'}
                  </span>
                  <span className="block text-[11px] font-extrabold text-[#E98518]">SAR 42</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate('specialties')}
          className="inline-flex flex-col items-center text-xs font-bold uppercase tracking-widest text-[#111111]/60 hover:text-[#0E5135] transition-colors"
        >
          <span className="mb-1 text-[10px]">{language === 'EN' ? 'Explore Specialties' : 'استكشف التخصصات'}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#E98518]" />
        </button>
      </div>
    </section>
  );
};
