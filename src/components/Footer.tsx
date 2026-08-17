import React from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO, TRANSLATIONS } from '../data/restaurantData';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenAdmin }) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-[#111111] text-[#F6F2E9] border-t border-[#111111] pt-16 pb-24 lg:pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Callout Signoff */}
        <div className="border-b border-[#F6F2E9]/10 pb-12 mb-12 text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            THE BIRYAANI KING
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#E98518] font-extrabold">
            PAKISTANI CUISINE · RIYADH
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Biryaani%20King%20Riyadh`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 transition-all shadow-sm flex items-center space-x-2 rtl:space-x-reverse"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ORDER VIA WHATSAPP</span>
            </a>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#F6F2E9] hover:bg-[#F6F2E9] hover:text-[#111111] text-[#F6F2E9] text-xs font-black uppercase tracking-widest px-8 py-3.5 transition-all flex items-center space-x-2 rtl:space-x-reverse"
            >
              <MapPin className="w-4 h-4 text-[#E98518]" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-lg font-black text-white tracking-tight block">
              THE BIRYAANI KING
            </span>
            <p className="leading-relaxed text-[#F6F2E9]/70 font-medium">
              {language === 'EN'
                ? 'Authentic Karachi-style biryani, slow-cooked nihari, and charcoal BBQ in Hara, Al Wizarat, Riyadh.'
                : 'البرياني الباكستاني الفاخر على طريقة كراتشي والنهاري والمشويات في حي الوزارات بالرياض.'}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-black text-[#E98518] uppercase tracking-widest">
              {language === 'EN' ? 'Navigation' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2 text-[#F6F2E9]/80 font-bold uppercase tracking-wider text-[11px]">
              <li><button onClick={() => onNavigate('hero')} className="hover:text-[#E98518] transition-colors">{TRANSLATIONS[language].nav.home}</button></li>
              <li><button onClick={() => onNavigate('menu')} className="hover:text-[#E98518] transition-colors">{TRANSLATIONS[language].nav.menu}</button></li>
              <li><button onClick={() => onNavigate('catering')} className="hover:text-[#E98518] transition-colors">{TRANSLATIONS[language].nav.catering}</button></li>
              <li><button onClick={() => onNavigate('location')} className="hover:text-[#E98518] transition-colors">{TRANSLATIONS[language].nav.location}</button></li>
              <li><button onClick={() => onNavigate('story')} className="hover:text-[#E98518] transition-colors">{TRANSLATIONS[language].nav.about}</button></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-black text-[#E98518] uppercase tracking-widest">
              {language === 'EN' ? 'Contact' : 'التواصل'}
            </h3>
            <ul className="space-y-2.5 text-[#F6F2E9]/80 font-semibold">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-[#E98518] shrink-0 mt-0.5" />
                <span>Hara, Al Wizarat, Al Barra Ibn Azib Street, Riyadh 12332</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-[#E98518] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#E98518] font-mono font-bold">{RESTAURANT_INFO.phone}</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-black text-[#E98518] uppercase tracking-widest">
              {language === 'EN' ? 'Opening Hours' : 'ساعات العمل'}
            </h3>
            <div className="space-y-2 text-[#F6F2E9]/80 font-medium">
              <div className="p-3 border border-[#F6F2E9]/20 bg-white/5">
                <span className="font-bold text-white block">Saturday – Thursday & Friday</span>
                <span className="text-[11px] text-[#F6F2E9]/70 font-mono">12:00 PM – 3:00 PM & 5:30 PM – 12:30 AM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Demo Disclaimer */}
        <div className="border-t border-[#F6F2E9]/10 mt-12 pt-6 flex flex-col items-center justify-between gap-6 text-[11px] text-[#F6F2E9]/50 uppercase tracking-widest font-bold">
          
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p>© {new Date().getFullYear()} THE BIRYAANI KING. ALL RIGHTS RESERVED.</p>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1 bg-white/10 hover:bg-[#0E5135] text-white border border-white/20 transition-all text-[10px] font-black uppercase tracking-wider"
              >
                🔐 Owner Admin Portal
              </button>
            )}
          </div>

          {/* BRJ Demo Attribution */}
          <div className="text-center space-y-2 pt-4 border-t border-[#F6F2E9]/5 w-full">
            <p className="text-[#E98518]">
              Demo experience by <a href="https://www.barisrajgroup.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline underline-offset-4">BRJ Group</a>
            </p>
            <p className="text-[9px] opacity-70 max-w-2xl mx-auto normal-case tracking-normal font-medium">
              This is a demonstration environment created to showcase possible restaurant digital solutions. It is not presented as an official client website.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
