import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO, TRANSLATIONS } from '../data/restaurantData';

interface CateringBannerProps {
  language: Language;
  onOpenModal: () => void;
}

export const CateringBanner: React.FC<CateringBannerProps> = ({ language, onOpenModal }) => {
  const t = TRANSLATIONS[language].catering;

  return (
    <section id="catering" className="py-20 bg-[#F6F2E9] relative border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner Container */}
        <div className="relative border border-[#111111]/20 bg-[#0E5135] p-8 sm:p-12 lg:p-16 shadow-lg">
          
          <div className="relative z-10 max-w-2xl space-y-6 text-left rtl:text-right">
            <span className="bg-[#111111] text-[#F6F2E9] px-3 py-1 text-[10px] font-black uppercase tracking-widest inline-block border border-white/20">
              {t.eyebrow}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {t.headline}
            </h2>

            <p className="text-base sm:text-lg text-[#F6F2E9]/90 leading-relaxed font-medium">
              {t.supporting}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#E98518] hover:bg-[#111111] text-white font-black uppercase tracking-widest px-8 py-4 text-xs transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>{t.cta}</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Biryaani%20King%20Catering`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border-2 border-[#F6F2E9] text-[#F6F2E9] hover:bg-[#F6F2E9] hover:text-[#111111] font-black uppercase tracking-widest px-8 py-4 text-xs transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>TALK ON WHATSAPP</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
