import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/restaurantData';

interface BrandStoryProps {
  language: Language;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ language }) => {
  const t = TRANSLATIONS[language].story;

  const pillars = [
    {
      titleEn: 'AGED BASMATI',
      titleAr: 'أرز بسمتي معتق',
      descEn: 'Long-grain basmati aged for aroma and fluffiness.',
      descAr: 'أرز بسمتي طويل الحبة معتق للرائحة والقوام الهش.',
    },
    {
      titleEn: 'TRADITIONAL SPICES',
      titleAr: 'بهارات تقليدية',
      descEn: 'Authentic Pakistani masala blends.',
      descAr: 'خلطات بهارات باكستانية أصيلة متوارثة.',
    },
    {
      titleEn: 'SLOW COOKING',
      titleAr: 'طهي بطيء دمبخت',
      descEn: 'Authentic dum-pukht techniques.',
      descAr: 'تقنيات الدمبخت والطهي على نار هادئة.',
    },
    {
      titleEn: 'FRESH DAILY',
      titleAr: 'طازج يومياً',
      descEn: 'Prepared fresh every day in Riyadh.',
      descAr: 'يتم تحضيره طازجاً يومياً في الرياض.',
    },
  ];

  return (
    <section id="story" className="py-24 bg-[#F6F2E9] relative border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Image Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#111111]/20 shadow-xl bg-[#111111] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                alt="Culinary Craftsmanship at The Biryaani King"
                className="w-full h-[440px] sm:h-[520px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>

              {/* Story Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0E5135]/95 backdrop-blur-sm text-[#F6F2E9] border border-white/10 shadow-lg">
                <p className="font-serif italic text-sm sm:text-base text-center font-bold">
                  "{t.p1}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 space-y-6 text-left rtl:text-right">
            <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
              {language === 'EN' ? 'OUR CRAFT & HERITAGE' : 'إرثنا وفلسفة الطهي'}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111] leading-none">
              {t.heading}
            </h2>

            <p className="text-base text-[#111111]/80 leading-relaxed font-medium">
              {t.p2}
            </p>

            {/* 4 Trust Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#111111]/10">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-serif text-base font-black text-[#0E5135]">
                    {language === 'EN' ? pillar.titleEn : pillar.titleAr}
                  </h4>
                  <p className="text-xs text-[#111111]/75 leading-relaxed font-medium">
                    {language === 'EN' ? pillar.descEn : pillar.descAr}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
