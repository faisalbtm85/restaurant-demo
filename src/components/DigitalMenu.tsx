import React, { useState, useMemo } from 'react';
import { Search, Utensils, Flame, Plus, SlidersHorizontal, Filter, X } from 'lucide-react';
import { Language, CategoryId, MenuItem, SpiceLevel } from '../types';
import { TRANSLATIONS } from '../data/restaurantData';
import { useAdminStore } from '../lib/adminStore';

interface DigitalMenuProps {
  language: Language;
  onAddToCart: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
  selectedSpiceFilter?: SpiceLevel;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  language,
  onAddToCart,
  onCustomize,
  selectedSpiceFilter,
}) => {
  const t = TRANSLATIONS[language].menu;
  const { menuItems, categories } = useAdminStore();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<SpiceLevel | 'ALL'>(selectedSpiceFilter || 'ALL');

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSpice = spiceFilter === 'ALL' || item.spiceLevel === spiceFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.nameEn.toLowerCase().includes(query) ||
        item.nameAr.toLowerCase().includes(query) ||
        item.descriptionEn.toLowerCase().includes(query) ||
        item.descriptionAr.toLowerCase().includes(query);

      return matchesCategory && matchesSpice && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery, spiceFilter]);

  const renderSpiceBadge = (spice: SpiceLevel) => {
    let color = 'text-[#0E5135] bg-[#0E5135]/10 border-[#0E5135]/30';
    let label = 'Mild';

    if (spice === 'MEDIUM') {
      color = 'text-[#E98518] bg-[#E98518]/10 border-[#E98518]/30';
      label = 'Medium';
    } else if (spice === 'KARACHI') {
      color = 'text-[#E98518] bg-[#E98518]/20 border-[#E98518]/40';
      label = 'Karachi Heat';
    } else if (spice === 'EXTRA HOT') {
      color = 'text-[#D9381E] bg-[#D9381E]/10 border-[#D9381E]/30';
      label = 'Extra Hot';
    }

    return (
      <span className={`inline-flex items-center space-x-1 rtl:space-x-reverse px-2 py-0.5 text-[10px] font-extrabold border ${color}`}>
        <Flame className="w-3 h-3 fill-current" />
        <span>{label}</span>
      </span>
    );
  };

  return (
    <section id="menu" className="py-20 bg-[#111111] text-[#F6F2E9] relative border-b border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
            {language === 'EN' ? 'DIGITAL DINING CATALOG' : 'القائمة الرقمية التفاعلية'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-white">
            {t.heading}
          </h2>
        </div>

        {/* Search & Spice Filter Control Bar */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E98518]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#111111] border-2 border-[#F6F2E9]/20 focus:border-[#E98518] py-3.5 pl-12 rtl:pr-12 pr-10 text-sm font-bold text-white placeholder-[#F6F2E9]/50 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-[#F6F2E9]/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Spice Level Filters */}
          <div className="flex items-center justify-between text-xs overflow-x-auto pb-1 scrollbar-none gap-2">
            <span className="text-[#F6F2E9]/70 font-bold flex items-center gap-1 shrink-0 uppercase tracking-wider text-[11px]">
              <Filter className="w-3.5 h-3.5 text-[#E98518]" />
              <span>{language === 'EN' ? 'Filter Spice:' : 'تصفية حسب الحرارة:'}</span>
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
              {(['ALL', 'MILD', 'MEDIUM', 'KARACHI', 'EXTRA HOT'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSpiceFilter(level)}
                  className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider transition-all border ${
                    spiceFilter === level
                      ? 'bg-[#E98518] text-white border-[#E98518]'
                      : 'bg-white/5 text-[#F6F2E9] border-[#F6F2E9]/20 hover:border-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-[#F6F2E9]/10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#0E5135] text-white border-[#0E5135] shadow-md'
                    : 'bg-white/5 text-[#F6F2E9] border-[#F6F2E9]/20 hover:border-white'
                }`}
              >
                <span>{language === 'EN' ? cat.nameEn : cat.nameAr}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#111111] border-2 border-[#F6F2E9]/20 hover:border-[#0E5135] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm group"
              >
                <div>
                  {/* Photo & Badge Bar */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={language === 'EN' ? item.nameEn : item.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      {renderSpiceBadge(item.spiceLevel)}
                      {item.isPopular && (
                        <span className="bg-[#E98518] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
                          {language === 'EN' ? 'Popular' : 'الأكثر طلباً'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E98518] transition-colors tracking-tight">
                        {language === 'EN' ? item.nameEn : item.nameAr}
                      </h3>
                    </div>

                    <p className="text-xs text-[#F6F2E9]/75 line-clamp-2 leading-relaxed font-medium">
                      {language === 'EN' ? item.descriptionEn : item.descriptionAr}
                    </p>

                    {item.calories && (
                      <span className="text-[10px] font-mono text-[#F6F2E9]/50 block font-semibold">
                        ~{item.calories} kcal
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Price & Add Button */}
                <div className="p-5 pt-3 border-t border-[#F6F2E9]/10 mt-2 flex items-center justify-between bg-black/40">
                  <div>
                    <span className="text-[10px] text-[#F6F2E9]/60 uppercase font-bold block">
                      {language === 'EN' ? 'Price' : 'السعر'}
                    </span>
                    <span className="font-serif text-xl font-black text-[#E98518]">
                      SAR {item.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => onCustomize(item)}
                      className="p-2 bg-[#111111] border border-[#F6F2E9]/30 text-[#F6F2E9] hover:bg-[#F6F2E9] hover:text-[#111111] transition-colors"
                      title={t.customized}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-[#0E5135] hover:bg-[#E98518] text-white text-xs font-black uppercase tracking-widest px-3.5 py-2.5 transition-all shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-white" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="text-center py-16 bg-[#111111] border-2 border-[#F6F2E9]/20 space-y-4">
            <Utensils className="w-10 h-10 text-[#E98518] mx-auto opacity-50" />
            <p className="text-sm font-bold text-white">{t.noResults}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSpiceFilter('ALL');
              }}
              className="text-xs text-[#E98518] underline font-black uppercase tracking-wider"
            >
              {language === 'EN' ? 'Reset Filters' : 'إعادة ضبط الفلترة'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
