import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { Language } from '../types';
import { SPECIALTIES, TRANSLATIONS } from '../data/restaurantData';

interface ChooseKingProps {
  language: Language;
  onSelectCategory: (categoryId: string) => void;
}

export const ChooseKing: React.FC<ChooseKingProps> = ({ language, onSelectCategory }) => {
  const t = TRANSLATIONS[language].specialties;

  return (
    <section id="specialties" className="py-20 bg-[#F6F2E9] relative border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[#E98518] text-xs font-black tracking-widest uppercase block">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            {t.heading}
          </h2>
        </div>

        {/* 3 Large Food-Led Category Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {SPECIALTIES.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              className="group relative overflow-hidden bg-[#111111] border border-[#111111]/15 hover:border-[#0E5135] transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between h-[420px]"
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={language === 'EN' ? card.titleEn : card.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-black/30"></div>
              </div>

              {/* Flame Icon Accent (Top) */}
              <div className="relative z-10 p-6 flex justify-end">
                <span className="w-9 h-9 bg-[#111111]/80 border border-[#F6F2E9]/20 flex items-center justify-center text-[#E98518] group-hover:bg-[#E98518] group-hover:text-white transition-all">
                  <Flame className="w-5 h-5" />
                </span>
              </div>

              {/* Content (Bottom) */}
              <div className="relative z-10 p-6 space-y-3 text-[#F6F2E9]">
                <h3 className="font-serif text-3xl font-black text-white group-hover:text-[#E98518] transition-colors tracking-tight">
                  {language === 'EN' ? card.titleEn : card.titleAr}
                </h3>
                <p className="text-sm text-[#F6F2E9]/80 leading-relaxed font-medium">
                  {language === 'EN' ? card.subtitleEn : card.subtitleAr}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-black uppercase tracking-widest text-[#E98518] group-hover:text-white transition-colors">
                    <span>{language === 'EN' ? card.ctaEn : card.ctaAr}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
