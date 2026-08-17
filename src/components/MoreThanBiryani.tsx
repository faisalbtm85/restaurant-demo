import React from 'react';
import { Language } from '../types';

interface MoreThanBiryaniProps {
  language: Language;
  onExploreCategory?: (categoryId: string) => void;
}

export const MoreThanBiryani: React.FC<MoreThanBiryaniProps> = ({ language, onExploreCategory }) => {
  const items = [
    {
      id: 'nihari',
      titleEn: 'Slow-Cooked Nihari',
      titleAr: 'النهاري المطهوة ببطء',
      descEn: 'Overnight beef shank stew with floating ghee, fresh ginger juliennes, and lime.',
      descAr: 'لحم موزات مطهو ببطء طوال الليل مع الزنجبيل والليمون.',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop',
      size: 'large', // main feature
    },
    {
      id: 'karahi',
      titleEn: 'Shinwari Karahi',
      titleAr: 'الكراهي الشنوارية',
      descEn: 'Sizzling wok mutton cooked in fresh tomatoes and green chilies.',
      descAr: 'إيدام كراهي على الصاج بالطماطم والفلفل الأخضر.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
      size: 'small',
    },
    {
      id: 'bbq',
      titleEn: 'Chicken Malai Boti',
      titleAr: 'دجاج ملاي بوتي',
      descEn: 'Velvety cream-marinated boneless bites fire-grilled on coal.',
      descAr: 'دجاج بدون عظم متبل بالكريمة والمشوي على الفحم.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
      size: 'small',
    },
    {
      id: 'bbq',
      titleEn: 'Bihari Tikka',
      titleAr: 'بيهاري تكا لحم',
      descEn: 'Charred thin beef strips tenderized with authentic mustard spices.',
      descAr: 'شرائح لحم بقر رفيعة متبلة ببهارات البيهاري المشوية.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      size: 'small',
    },
    {
      id: 'bread',
      titleEn: 'Garlic Roghni Naan',
      titleAr: 'خبز نان روغني بالثوم',
      descEn: 'Piping hot tandoori bread brushed with butter & sesame seeds.',
      descAr: 'خبز نان طازج مدهون بالسمن والسمسم من التنور.',
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      size: 'small',
    },
  ];

  const mainFeature = items[0];
  const sideFeatures = items.slice(1);

  return (
    <section className="py-24 bg-[#F6F2E9] relative border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-xl mb-14 space-y-2">
          <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
            {language === 'EN' ? 'BEYOND THE BASMATI' : 'ما بعد البرياني'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            More Than Biryani
          </h2>
          <p className="text-sm text-[#111111]/70 font-medium">
            {language === 'EN'
              ? 'Discover slow-simmered cauldrons, fire-grilled skewers, and fresh tandoori breads.'
              : 'اكتشف قدور الطهي البطيء والمشويات الباكستانية وخبز التنور الطازج.'}
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Large Editorial Image Feature (7 cols) */}
          <div
            onClick={() => onExploreCategory && onExploreCategory(mainFeature.id)}
            className="lg:col-span-7 group relative bg-[#111111] border border-[#111111]/20 min-h-[460px] lg:min-h-[580px] overflow-hidden cursor-pointer flex flex-col justify-end p-8 sm:p-10 text-[#F6F2E9]"
          >
            <img
              src={mainFeature.image}
              alt={language === 'EN' ? mainFeature.titleEn : mainFeature.titleAr}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent"></div>

            <div className="relative z-10 space-y-3">
              <span className="bg-[#E98518] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 inline-block">
                {language === 'EN' ? 'Slow Cooked Heritage' : 'طهي بطيء أصيل'}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-black text-white">
                {language === 'EN' ? mainFeature.titleEn : mainFeature.titleAr}
              </h3>
              <p className="text-sm text-[#F6F2E9]/80 max-w-lg leading-relaxed font-medium">
                {language === 'EN' ? mainFeature.descEn : mainFeature.descAr}
              </p>
            </div>
          </div>

          {/* Supporting 2x2 Grid of Smaller Editorial Cards (5 cols) */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6">
            {sideFeatures.map((feat, idx) => (
              <div
                key={idx}
                onClick={() => onExploreCategory && onExploreCategory(feat.id)}
                className="group bg-white border border-[#111111]/20 hover:border-[#0E5135] transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden bg-[#111111]">
                  <img
                    src={feat.image}
                    alt={language === 'EN' ? feat.titleEn : feat.titleAr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-serif text-lg font-black text-[#111111] group-hover:text-[#0E5135] transition-colors">
                    {language === 'EN' ? feat.titleEn : feat.titleAr}
                  </h4>
                  <p className="text-xs text-[#111111]/70 line-clamp-2 font-medium">
                    {language === 'EN' ? feat.descEn : feat.descAr}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
