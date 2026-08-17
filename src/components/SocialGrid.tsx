import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { Language } from '../types';
import { SOCIAL_POSTS } from '../data/restaurantData';

interface SocialGridProps {
  language: Language;
}

export const SocialGrid: React.FC<SocialGridProps> = ({ language }) => {
  return (
    <section className="py-20 bg-[#F6F2E9] border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-[#E98518] text-xs font-black uppercase tracking-widest">
            <Instagram className="w-4 h-4" />
            <span>@THEBIRYAANIKING</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            Follow the Kitchen
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/70 font-bold uppercase tracking-wider">
            {language === 'EN' ? 'Sizzling karahis, dum steam, and fresh tandoor naans' : 'لقطات طازجة من المطبخ والصاج والتنور'}
          </p>
        </div>

        {/* 4-Card Photo Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden bg-[#111111] border-2 border-[#111111] h-72 shadow-sm cursor-pointer hover:border-[#0E5135] transition-all"
            >
              <img
                src={post.image}
                alt="Kitchen Moment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#E98518] text-xs font-black mb-2">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-xs text-white line-clamp-2 leading-relaxed font-bold">
                  {language === 'EN' ? post.captionEn : post.captionAr}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
