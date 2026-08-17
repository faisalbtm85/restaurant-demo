import React from 'react';
import { Users, Check } from 'lucide-react';
import { Language, FeastBundle } from '../types';
import { FEAST_BUNDLES, TRANSLATIONS } from '../data/restaurantData';

interface FeastPackagesProps {
  language: Language;
  onSelectBundle: (bundle: FeastBundle) => void;
  onOpenCateringModal: () => void;
}

export const FeastPackages: React.FC<FeastPackagesProps> = ({
  language,
  onSelectBundle,
  onOpenCateringModal,
}) => {
  const t = TRANSLATIONS[language].feast;

  return (
    <section id="feast" className="py-20 bg-[#F6F2E9] relative border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
            {language === 'EN' ? 'PACKAGES' : 'باقات ولائم العائلة'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            {t.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#111111]/70 font-medium">
            {t.subheading}
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {FEAST_BUNDLES.map((bundle) => {
            const isHighlight = bundle.highlight;

            return (
              <div
                key={bundle.id}
                className={`relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm ${
                  isHighlight
                    ? 'bg-[#0E5135] border border-[#0E5135] text-white shadow-md'
                    : 'bg-white border border-[#111111]/20 text-[#111111] hover:border-[#0E5135]'
                }`}
              >
                {/* Highlight Badge */}
                {isHighlight && (
                  <div className="bg-[#E98518] text-white text-center text-xs font-black py-1.5 uppercase tracking-widest">
                    {language === 'EN' ? bundle.badgeEn : bundle.badgeAr}
                  </div>
                )}

                <div>
                  {/* Banner Image */}
                  <div className="relative h-52 overflow-hidden bg-[#111111]">
                    <img
                      src={bundle.image}
                      alt={language === 'EN' ? bundle.titleEn : bundle.titleAr}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-black/80 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 border border-white/20">
                        <Users className="w-3.5 h-3.5 text-[#E98518]" />
                        <span>{language === 'EN' ? bundle.servesEn : bundle.servesAr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`font-serif text-2xl font-black tracking-tight ${isHighlight ? 'text-white' : 'text-[#111111]'}`}>
                        {language === 'EN' ? bundle.titleEn : bundle.titleAr}
                      </h3>
                      <div className="text-right rtl:text-left shrink-0">
                        {typeof bundle.price === 'number' ? (
                          <span className={`font-serif text-2xl font-black ${isHighlight ? 'text-[#E98518]' : 'text-[#0E5135]'}`}>
                            SAR {bundle.price}
                          </span>
                        ) : (
                          <span className={`text-xs font-black uppercase tracking-wider ${isHighlight ? 'text-[#E98518]' : 'text-[#0E5135]'}`}>
                            {language === 'EN' ? 'Quote' : 'تسعيرة'}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={`text-xs leading-relaxed font-medium ${isHighlight ? 'text-white/80' : 'text-[#111111]/75'}`}>
                      {language === 'EN' ? bundle.descriptionEn : bundle.descriptionAr}
                    </p>

                    {/* Included Items Checklist */}
                    <div className={`space-y-2 pt-3 border-t ${isHighlight ? 'border-white/20' : 'border-[#111111]/10'}`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest block ${isHighlight ? 'text-[#E98518]' : 'text-[#0E5135]'}`}>
                        {language === 'EN' ? 'Package Inclusions:' : 'محتويات الباقة:'}
                      </span>
                      <ul className="space-y-1.5 text-xs font-medium">
                        {(language === 'EN' ? bundle.itemsEn : bundle.itemsAr).map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isHighlight ? 'text-[#E98518]' : 'text-[#0E5135]'}`} />
                            <span className={isHighlight ? 'text-white/90' : 'text-[#111111]'}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action CTA */}
                <div className="p-6 pt-0 mt-4">
                  {bundle.id === 'family-feast' ? (
                    <button
                      onClick={() => onSelectBundle(bundle)}
                      className="w-full inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#E98518] hover:bg-white hover:text-[#111111] text-white font-black text-xs uppercase tracking-widest py-3.5 transition-all shadow-sm"
                    >
                      <span>{t.orderFeast}</span>
                    </button>
                  ) : bundle.id === 'group-feast' ? (
                    <button
                      onClick={() => onSelectBundle(bundle)}
                      className="w-full inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#0E5135] hover:bg-[#111111] text-white font-black text-xs uppercase tracking-widest py-3.5 transition-all shadow-sm"
                    >
                      <span>{t.viewPackage}</span>
                    </button>
                  ) : (
                    <button
                      onClick={onOpenCateringModal}
                      className="w-full inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F6F2E9] font-black text-xs uppercase tracking-widest py-3.5 transition-all shadow-sm"
                    >
                      <span>{t.getQuote}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
