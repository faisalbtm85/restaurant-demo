import React, { useState, useEffect } from 'react';
import { Phone, MapPin, ShoppingBag, Menu as MenuIcon, X, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { RESTAURANT_INFO, TRANSLATIONS } from '../data/restaurantData';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  cartCount,
  onOpenCart,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.nav.home },
    { id: 'menu', label: t.nav.menu },
    { id: 'catering', label: t.nav.catering },
    { id: 'location', label: t.nav.location },
    { id: 'story', label: t.nav.about },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F6F2E9]/95 backdrop-blur-md border-b border-[#111111]/15 py-3 shadow-md'
          : 'bg-[#F6F2E9]/90 backdrop-blur-sm border-b border-[#111111]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Branding */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left rtl:text-right group focus:outline-none"
        >
          <span className="block font-serif text-xl sm:text-2xl font-black tracking-tight text-[#111111] leading-none group-hover:text-[#0E5135] transition-colors">
            THE BIRYAANI KING
          </span>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0E5135] mt-0.5">
            {language === 'EN' ? 'PAKISTANI CUISINE · RIYADH' : 'المأكولات الباكستانية · الرياض'}
          </span>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse text-xs font-bold uppercase tracking-widest text-[#111111]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#E98518] transition-colors py-1 relative hover:border-b-2 hover:border-[#E98518]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
            className="text-xs font-bold uppercase hover:text-[#E98518] transition-colors text-[#111111] px-2 py-1"
            title="Toggle Language"
          >
            {language === 'EN' ? 'EN | عربي' : 'عربي | EN'}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 bg-[#F6F2E9] border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F6F2E9] transition-all"
            aria-label="Order Basket"
          >
            <ShoppingBag className="w-4 h-4 text-[#0E5135]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E98518] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleLinkClick('menu')}
            className="hidden sm:inline-flex items-center bg-[#0E5135] hover:bg-[#111111] text-[#F6F2E9] text-xs font-black uppercase tracking-widest px-5 py-2.5 transition-all shadow-sm"
          >
            {t.nav.orderNow}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-white border border-[#111111] text-[#111111]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#F6F2E9] border-b-2 border-[#111111] shadow-2xl py-6 px-6 z-50">
          <nav className="flex flex-col space-y-4 text-xs font-extrabold uppercase tracking-widest mb-6 text-[#111111]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left rtl:text-right py-2 border-b border-[#111111]/10 flex justify-between items-center hover:text-[#E98518]"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#E98518]">→</span>
              </button>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Biryaani%20King%20Riyadh`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#25D366] text-white py-3 text-xs font-black uppercase tracking-widest border border-[#111111]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => handleLinkClick('menu')}
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#0E5135] text-[#F6F2E9] py-3 text-xs font-black uppercase tracking-widest border border-[#111111]"
            >
              <span>{t.nav.orderNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
