import React from 'react';
import { Flame, Plus, SlidersHorizontal } from 'lucide-react';
import { Language, MenuItem, SpiceLevel } from '../types';
import { MENU_ITEMS, TRANSLATIONS } from '../data/restaurantData';

interface SignatureDishesProps {
  language: Language;
  onAddToCart: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
  onViewAllMenu: () => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({
  language,
  onAddToCart,
  onCustomize,
  onViewAllMenu,
}) => {
  const t = TRANSLATIONS[language].signature;

  // Selected items matching prompt specification
  const signatureItems = MENU_ITEMS.filter((item) => item.isSignature);

  const renderSpiceIndicator = (spice: SpiceLevel) => {
    let chiliCount = 1;
    let label = 'Mild';
    let colorClass = 'text-[#0E5135]';

    if (spice === 'MEDIUM') {
      chiliCount = 2;
      label = 'Medium';
      colorClass = 'text-[#E98518]';
    } else if (spice === 'KARACHI') {
      chiliCount = 3;
      label = 'Karachi Heat';
      colorClass = 'text-[#E98518]';
    } else if (spice === 'EXTRA HOT') {
      chiliCount = 4;
      label = 'Extra Hot';
      colorClass = 'text-[#D9381E]';
    }

    return (
      <div className={`flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold ${colorClass}`}>
        <div className="flex">
          {[...Array(chiliCount)].map((_, i) => (
            <Flame key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
        <span className="text-[11px] text-[#111111]/70 ml-1">{label}</span>
      </div>
    );
  };

  return (
    <section id="signature" className="py-20 bg-[#F6F2E9] relative border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block mb-1">
              {t.eyebrow}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
              {t.heading}
            </h2>
          </div>

          <button
            onClick={onViewAllMenu}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse border-2 border-[#111111] hover:bg-[#111111] hover:text-[#F6F2E9] text-[#111111] text-xs font-black uppercase tracking-widest px-5 py-3 transition-all self-start md:self-auto"
          >
            <span>{language === 'EN' ? 'View Full Digital Menu' : 'عرض القائمة الكاملة'}</span>
            <span className="text-[#E98518]">→</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-none border border-[#111111]/20 hover:border-[#0E5135] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-56 overflow-hidden bg-[#111111]">
                  <img
                    src={item.image}
                    alt={language === 'EN' ? item.nameEn : item.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Top Price Badge */}
                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
                    <span className="bg-[#111111] text-white font-black px-3 py-1 text-xs border border-[#F6F2E9]/30">
                      SAR {item.price}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-2xl font-black text-[#111111] group-hover:text-[#0E5135] transition-colors tracking-tight">
                      {language === 'EN' ? item.nameEn : item.nameAr}
                    </h3>
                  </div>

                  {/* Spice Indicator */}
                  {renderSpiceIndicator(item.spiceLevel)}

                  <p className="text-xs sm:text-sm text-[#111111]/75 line-clamp-2 leading-relaxed font-medium">
                    {language === 'EN' ? item.descriptionEn : item.descriptionAr}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-4 border-t border-[#111111]/10 mt-2 flex items-center justify-between gap-3 bg-[#F6F2E9]/40">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#111111]/60 block">
                    {language === 'EN' ? 'Price' : 'السعر'}
                  </span>
                  <span className="font-serif text-2xl font-black text-[#0E5135]">
                    SAR {item.price}
                  </span>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => onCustomize(item)}
                    className="p-2.5 bg-white border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                    title={t.customize}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-[#0E5135] hover:bg-[#111111] text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-[#E98518]" />
                    <span>{t.addToOrder}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
