import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Language } from '../types';
import { REVIEWS, TRANSLATIONS } from '../data/restaurantData';

interface ReviewsCarouselProps {
  language: Language;
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ language }) => {
  const t = TRANSLATIONS[language].reviews;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-20 bg-[#F6F2E9] relative border-t border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-[#E98518] text-xs font-black uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current text-[#E98518]" />
            <span>4.0 ★ RATING FROM 2,126+ GOOGLE REVIEWS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#111111]">
            {t.heading}
          </h2>
        </div>

        {/* Carousel Stage */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="bg-white border border-[#111111]/20 p-8 sm:p-12 shadow-lg relative overflow-hidden">
            
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-[#111111]/5 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Rating stars & date */}
              <div className="flex justify-between items-center">
                <div className="flex text-[#E98518]">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#111111]/60 font-mono font-bold">{currentReview.date}</span>
              </div>

              {/* Comment text */}
              <p className="font-serif text-xl sm:text-2xl text-[#111111] leading-relaxed font-black italic">
                "{language === 'EN' ? currentReview.commentEn : currentReview.commentAr}"
              </p>

              {/* Reviewer info */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4 border-t border-[#111111]/10">
                {currentReview.avatar && (
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.author}
                    className="w-12 h-12 object-cover border border-[#111111]/20"
                  />
                )}
                <div>
                  <span className="font-bold text-base text-[#111111] block">
                    {currentReview.author}
                  </span>
                  <span className="text-xs text-[#0E5135] font-black uppercase tracking-wider flex items-center gap-1">
                    ✓ Google Reviewer • Riyadh
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-2 rtl:space-x-reverse">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 transition-all ${
                    idx === currentIndex ? 'bg-[#0E5135] w-8' : 'bg-[#111111]/20 w-3'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={handlePrev}
                className="p-3 bg-white border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
