import React from 'react';
import { Home, Utensils, Flame, MapPin, ShoppingBag } from 'lucide-react';
import { Language } from '../types';

interface MobileBottomNavProps {
  language: Language;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-[#111111] py-2 px-3 shadow-2xl">
      <div className="grid grid-cols-5 items-center text-center text-[10px] font-black uppercase tracking-wider">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center py-1 transition-colors ${
            activeSection === 'hero' ? 'text-[#0E5135]' : 'text-[#111111]/60'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{language === 'EN' ? 'Home' : 'الرئيسية'}</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => onNavigate('menu')}
          className={`flex flex-col items-center py-1 transition-colors ${
            activeSection === 'menu' ? 'text-[#0E5135]' : 'text-[#111111]/60'
          }`}
        >
          <Utensils className="w-5 h-5 mb-0.5" />
          <span>{language === 'EN' ? 'Menu' : 'القائمة'}</span>
        </button>

        {/* Central Prominent ORDER Action */}
        <button
          onClick={() => onNavigate('menu')}
          className="flex flex-col items-center -mt-6"
        >
          <div className="w-12 h-12 bg-[#0E5135] border-2 border-[#111111] flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform">
            <Flame className="w-6 h-6 text-[#E98518] fill-current" />
          </div>
          <span className="mt-1 font-black text-[#0E5135] text-[10px]">
            {language === 'EN' ? 'ORDER' : 'اطلب'}
          </span>
        </button>

        {/* Location */}
        <button
          onClick={() => onNavigate('location')}
          className={`flex flex-col items-center py-1 transition-colors ${
            activeSection === 'location' ? 'text-[#0E5135]' : 'text-[#111111]/60'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>{language === 'EN' ? 'Location' : 'الموقع'}</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center py-1 text-[#111111]/60 hover:text-[#0E5135]"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>{language === 'EN' ? 'Basket' : 'السلة'}</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-[#E98518] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#111111]">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};
