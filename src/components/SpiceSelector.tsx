import React from 'react';
import { Flame, MapPin, Phone, MessageSquare, Clock, ArrowUpRight, Check } from 'lucide-react';
import { Language, SpiceLevel } from '../types';
import { RESTAURANT_INFO, TRANSLATIONS } from '../data/restaurantData';

interface SpiceSelectorProps {
  language: Language;
  selectedSpice: SpiceLevel;
  onSelectSpice: (spice: SpiceLevel) => void;
  onOrderSpecial?: () => void;
}

export const SpiceSelector: React.FC<SpiceSelectorProps> = ({
  language,
  selectedSpice,
  onSelectSpice,
  onOrderSpecial,
}) => {
  const t = TRANSLATIONS[language].bento;

  const spiceOptions: { id: SpiceLevel; name: string; desc: string; chilis: number }[] = [
    { id: 'MILD', name: t.mild.name, desc: t.mild.desc, chilis: 1 },
    { id: 'MEDIUM', name: t.medium.name, desc: t.medium.desc, chilis: 2 },
    { id: 'KARACHI', name: t.karachi.name, desc: t.karachi.desc, chilis: 3 },
    { id: 'EXTRA HOT', name: t.extraHot.name, desc: t.extraHot.desc, chilis: 4 },
  ];

  return (
    <section id="bento-info" className="py-20 bg-[#111111] text-[#F6F2E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Block 1: Spice Level Selector (Large Block - md:col-span-7) */}
          <div className="md:col-span-7 bg-[#111111] border border-[#F6F2E9]/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#E98518] text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-current text-[#E98518]" />
                  <span>{t.spiceTitle}</span>
                </span>
                <span className="text-[10px] text-[#F6F2E9]/60 uppercase font-extrabold tracking-wider">
                  {language === 'EN' ? 'Customized Heat' : 'تخصيص درجة الفلفل'}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {spiceOptions.map((opt) => {
                  const isSelected = selectedSpice === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => onSelectSpice(opt.id)}
                      className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0E5135] bg-[#0E5135] text-white shadow-lg'
                          : 'border-[#F6F2E9]/15 bg-white/5 text-[#F6F2E9] hover:border-[#E98518]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex space-x-1 rtl:space-x-reverse text-[#E98518]">
                          {[...Array(opt.chilis)].map((_, i) => (
                            <Flame key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#E98518] stroke-[3]" />}
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-black">{opt.name}</h4>
                        <p className="text-xs text-[#F6F2E9]/80 mt-1 font-medium">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F6F2E9]/10 text-xs text-[#F6F2E9]/60 font-medium">
              {language === 'EN'
                ? 'Your preferred spice level will apply automatically to all customizable kitchen dishes.'
                : 'سيتم تطبيق درجة الفلفل المختارة تلقائياً على كافة الأطباق القابلة للتعديل.'}
            </div>
          </div>

          {/* Block 2: Visit Us (md:col-span-5) */}
          <div className="md:col-span-5 bg-[#111111] border border-[#F6F2E9]/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#E98518] text-xs font-black uppercase tracking-widest mb-4">
                <MapPin className="w-4 h-4" />
                <span>{t.visitTitle}</span>
              </div>

              <h3 className="font-serif text-2xl font-black text-white mb-2">
                Hara, Al Wizarat
              </h3>
              <p className="text-xs text-[#F6F2E9]/80 leading-relaxed font-medium mb-6">
                Al Barra Ibn Azib Street, Riyadh 12332
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#F6F2E9]/10">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 border border-[#F6F2E9]/30 hover:bg-[#F6F2E9] hover:text-[#111111] text-[#F6F2E9] text-[11px] font-black uppercase tracking-wider transition-all"
              >
                <ArrowUpRight className="w-4 h-4 text-[#E98518] mb-1" />
                <span>MAPS</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex flex-col items-center justify-center p-3 border border-[#F6F2E9]/30 hover:bg-[#F6F2E9] hover:text-[#111111] text-[#F6F2E9] text-[11px] font-black uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4 text-[#E98518] mb-1" />
                <span>CALL</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Biryaani%20King%20Riyadh`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-wider transition-all border border-[#25D366]"
              >
                <MessageSquare className="w-4 h-4 mb-1" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Block 3: Today's Special (md:col-span-6) */}
          <div className="md:col-span-6 bg-[#0E5135] border-2 border-[#0E5135] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left rtl:sm:text-right">
              <span className="bg-[#E98518] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 inline-block">
                {t.specialTitle}
              </span>
              <h3 className="font-serif text-3xl font-black text-white">
                Maghaz Nihari
              </h3>
              <p className="text-xs text-[#F6F2E9]/90 font-medium">
                {language === 'EN' ? 'Slow-cooked beef shank gravy with rich brain & marrow' : 'نهاري مطهوة ببطء مع المخ والمخ العظمي'}
              </p>
            </div>

            <div className="text-center sm:text-right rtl:sm:text-left shrink-0 space-y-2">
              <span className="block font-serif text-3xl font-black text-[#E98518]">
                SAR 42
              </span>
              <button
                onClick={onOrderSpecial}
                className="bg-[#111111] hover:bg-white hover:text-[#111111] text-white text-xs font-black uppercase tracking-widest px-6 py-3 transition-all border border-white/20"
              >
                {language === 'EN' ? 'ORDER NOW' : 'اطلب الآن'}
              </button>
            </div>
          </div>

          {/* Block 4: Opening Hours (md:col-span-6) */}
          <div className="md:col-span-6 bg-[#111111] border border-[#F6F2E9]/15 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#E98518] text-xs font-black uppercase tracking-widest mb-4">
              <Clock className="w-4 h-4" />
              <span>{t.hoursTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div className="border-r rtl:border-r-0 rtl:border-l border-[#F6F2E9]/10 pr-4 rtl:pr-0 rtl:pl-4 space-y-1">
                <span className="text-[#E98518] font-black uppercase tracking-wider block">
                  {t.satThu}
                </span>
                <span className="text-[#F6F2E9]/80 block">12:00 PM – 3:00 PM</span>
                <span className="text-[#F6F2E9]/80 block">5:30 PM – 12:30 AM</span>
              </div>

              <div className="space-y-1">
                <span className="text-[#E98518] font-black uppercase tracking-wider block">
                  {t.fri}
                </span>
                <span className="text-[#F6F2E9]/80 block">12:00 PM – 3:00 PM</span>
                <span className="text-[#F6F2E9]/80 block">5:30 PM – 12:30 AM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
