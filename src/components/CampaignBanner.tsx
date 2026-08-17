import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/restaurantData';
import { useAdminStore } from '../lib/adminStore';

interface CampaignBannerProps {
  language: Language;
  onOrderNow: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ language, onOrderNow }) => {
  const t = TRANSLATIONS[language].campaign;
  const { promoBanner } = useAdminStore();

  if (!promoBanner || !promoBanner.active) {
    return null;
  }

  // Live Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: promoBanner.hoursRemaining || 18, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-[#F6F2E9] relative border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="relative border border-[#111111]/20 bg-white shadow-md">
          
          <div className="grid lg:grid-cols-12 items-center">
            
            {/* Visual Photo (Left) */}
            <div className="lg:col-span-5 relative h-64 lg:h-80 overflow-hidden bg-[#111111]">
              <img
                src={promoBanner.image}
                alt={promoBanner.titleEn}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>

              <span className="absolute top-4 left-4 bg-[#E98518] text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest shadow-sm flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>LIMITED DROP</span>
              </span>
            </div>

            {/* Campaign Details (Right) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 text-left rtl:text-right">
              
              <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
                SPECIAL OFFER
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#111111]">
                {language === 'EN' ? promoBanner.titleEn : promoBanner.titleAr}
              </h2>

              <p className="text-xs sm:text-sm text-[#0E5135] font-extrabold uppercase tracking-wider">
                {language === 'EN' ? promoBanner.taglineEn : promoBanner.taglineAr}
              </p>

              {/* Countdown & Price Bar */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                
                {/* Timer Box */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#0E5135] text-white px-4 py-2 border border-[#0E5135]">
                  <Clock className="w-4 h-4 text-[#E98518]" />
                  <div className="font-mono text-sm font-black tracking-wider">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>

                {/* Price tag */}
                <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                  <span className="font-serif text-3xl font-black text-[#0E5135]">
                    SAR {promoBanner.dealPrice}
                  </span>
                  {promoBanner.originalPrice && (
                    <span className="text-xs text-[#111111]/50 line-through font-mono font-bold">
                      SAR {promoBanner.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={onOrderNow}
                  className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-[#0E5135] hover:bg-[#111111] text-white text-xs font-black uppercase tracking-widest px-6 py-3 transition-all shadow-sm"
                >
                  <span>{t.orderNow}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-[#E98518]" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
