import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Navigation, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/restaurantData';
import { useAdminStore } from '../lib/adminStore';

interface LocationSectionProps {
  language: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].location;
  const { settings } = useAdminStore();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const addressText = language === 'EN' ? settings.addressEn : settings.addressAr;
  const hoursText = language === 'EN' ? settings.openingHoursEn : settings.openingHoursAr;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="location" className="py-20 bg-[#F6F2E9] relative border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[#E98518] text-xs font-black uppercase tracking-widest block">
            {language === 'EN' ? 'LOCATION & HOURS' : 'الموقع وساعات العمل'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            {t.heading}
          </h2>
          <p className="text-sm font-medium text-[#111111]/70">
            {t.title}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Location Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#111111]/20 p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Address Block */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#E98518] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{t.addressLabel}</span>
                </span>
                <p className="text-sm sm:text-base text-[#111111] font-bold leading-relaxed">
                  {addressText}
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-[#111111]/70 hover:text-[#0E5135] font-bold transition-colors pt-1"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0E5135]" />
                      <span className="text-[#0E5135] font-bold">{language === 'EN' ? 'Copied to Clipboard!' : 'تم نسخ العنوان!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'EN' ? 'Copy Address' : 'نسخ العنوان'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Block */}
              <div className="space-y-2 pt-4 border-t border-[#111111]/10">
                <span className="text-xs font-black uppercase tracking-wider text-[#E98518] flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{t.phoneLabel}</span>
                </span>
                <p className="text-lg font-mono font-black text-[#111111]">
                  {settings.phone}
                </p>
              </div>

              {/* Hours Block */}
              <div className="space-y-3 pt-4 border-t border-[#111111]/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-[#E98518] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{t.hoursLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#0E5135] text-white px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-[#E98518] animate-pulse"></span>
                    {t.openNow}
                  </span>
                </div>

                <div className="p-3 bg-[#F6F2E9] border border-[#111111]/10 font-bold text-xs text-[#111111]">
                  {hoursText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex flex-col items-center justify-center bg-white border border-[#111111]/20 hover:bg-[#111111] hover:text-white p-3 text-center text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#E98518] mb-1" />
                  <span>{t.callBtn}</span>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hello%20The%20Biryaani%20King%20Riyadh`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center bg-white border border-[#111111]/20 hover:bg-[#111111] hover:text-white p-3 text-center text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#0E5135] mb-1" />
                  <span>{t.whatsappBtn}</span>
                </a>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center bg-[#0E5135] hover:bg-[#111111] text-white p-3 text-center text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#E98518] mb-1" />
                  <span>{t.getDirectionsBtn}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Interactive Map Stage */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#111111]/20 bg-white h-[480px] shadow-sm flex flex-col justify-between p-6">
              
              {/* Map Background Simulation */}
              <div className="absolute inset-0 bg-[#F6F2E9] opacity-90">
                <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Map Pins Simulation */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                
                {/* Map Overlay Badge Header */}
                <div className="flex justify-between items-center bg-white p-3.5 border border-[#111111]/20">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <MapPin className="w-5 h-5 text-[#0E5135]" />
                    <div>
                      <span className="font-bold text-sm text-[#111111] block">The Biryaani King • Hara</span>
                      <span className="text-[10px] text-[#111111]/70 font-semibold">Al Barra Ibn Azib St, Riyadh</span>
                    </div>
                  </div>
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs text-[#0E5135] hover:underline font-black uppercase"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Central Pin Pulse */}
                <div className="flex flex-col items-center justify-center my-auto">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[#0E5135]/20 animate-ping absolute inset-0"></div>
                    <div className="w-12 h-12 bg-[#0E5135] border-2 border-[#111111] flex items-center justify-center shadow-lg relative z-10">
                      <MapPin className="w-6 h-6 text-[#E98518]" />
                    </div>
                  </div>
                  <span className="mt-3 bg-[#111111] text-[#F6F2E9] border border-[#111111] text-xs font-black uppercase tracking-wider px-3 py-1 shadow-md">
                    THE BIRYAANI KING
                  </span>
                </div>

                {/* Nearby Riyadh Distances Estimator */}
                <div className="bg-white p-4 border-2 border-[#111111] grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[#111111]/60 block text-[10px] font-bold uppercase">From Olaya</span>
                    <span className="font-mono font-black text-[#111111]">~10 mins drive</span>
                  </div>
                  <div>
                    <span className="text-[#111111]/60 block text-[10px] font-bold uppercase">From Malaz</span>
                    <span className="font-mono font-black text-[#111111]">~7 mins drive</span>
                  </div>
                  <div>
                    <span className="text-[#111111]/60 block text-[10px] font-bold uppercase">From KAFD</span>
                    <span className="font-mono font-black text-[#111111]">~18 mins drive</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
