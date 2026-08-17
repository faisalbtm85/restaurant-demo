import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { Language, CateringFormData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAdminStore } from '../lib/adminStore';

interface CateringModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  if (!isOpen) return null;

  const { addCateringInquiry } = useAdminStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<CateringFormData>({
    name: '',
    phone: '',
    eventType: 'Wedding / Walima',
    guestsCount: '50-100',
    date: '',
    message: '',
    preferredContact: 'whatsapp',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Admin Store
    addCateringInquiry({
      id: `cat_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      eventType: formData.eventType,
      guestsCount: formData.guestsCount,
      date: formData.date || new Date().toISOString().split('T')[0],
      message: formData.message,
      status: 'New',
      createdAt: new Date().toISOString(),
    });

    if (formData.preferredContact === 'whatsapp') {
      const msg = encodeURIComponent(
        `Hello The Biryaani King Catering Team,\n\nI would like to enquire about catering:\nName: ${formData.name}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\nGuests: ${formData.guestsCount}\nDate: ${formData.date}\nNotes: ${formData.message}`
      );
      window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${msg}`, '_blank');
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#111111]">
      <div className="bg-white border-2 border-[#111111] shadow-2xl w-full max-w-lg overflow-hidden p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 text-[#111111] hover:bg-[#111111] hover:text-white p-1.5 border border-[#111111] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <span className="text-[#E98518] text-[11px] font-black uppercase tracking-widest block mb-1">
                {language === 'EN' ? 'CATERING & EVENTS INQUIRY' : 'حجز وتنسيق المناسبات'}
              </span>
              <h3 className="font-serif text-3xl font-black text-[#111111] tracking-tight">
                {language === 'EN' ? 'Plan Your Event' : 'خطط لمناسبتك معنا'}
              </h3>
              <p className="text-xs text-[#111111]/70 font-semibold mt-1">
                {language === 'EN'
                  ? 'Tell us about your gathering and our catering manager will contact you within 2 hours.'
                  : 'أدخل تفاصيل مناسبتك وسيتواصل معك مدير الضيافة خلال ساعتين.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                  {language === 'EN' ? 'Full Name *' : 'الاسم الكامل *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'EN' ? 'e.g. Faisal Al-Rashid' : 'مثال: فيصل الراشد'}
                  className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Phone Number *' : 'رقم الجوال *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966 5X XXX XXXX"
                    className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  />
                </div>

                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Event Date' : 'تاريخ المناسبة'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Event Type' : 'نوع المناسبة'}
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  >
                    <option value="Wedding / Walima">Wedding / Walima</option>
                    <option value="Corporate Majlis">Corporate Majlis</option>
                    <option value="Family Gathering">Family Gathering</option>
                    <option value="Private Dinner">Private Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Guests Count' : 'عدد الضيوف'}
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                    className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  >
                    <option value="10-25">10 - 25 Guests</option>
                    <option value="25-50">25 - 50 Guests</option>
                    <option value="50-100">50 - 100 Guests</option>
                    <option value="100-300">100 - 300 Guests</option>
                    <option value="300+">300+ Large Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                  {language === 'EN' ? 'Special Requests & Preferred Dishes' : 'ملاحظات خاصة أو أطباق مفضلة'}
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'EN' ? 'e.g. Live deg setup, handi station required...' : 'مثال: نود تجهيز مواقد الديج المباشرة...'}
                  className="w-full bg-[#F6F2E9] border border-[#111111] p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#0E5135] hover:bg-[#111111] text-white font-black uppercase tracking-widest py-3.5 border-2 border-[#111111] shadow-sm transition-all text-xs"
                >
                  <Send className="w-4 h-4 text-[#E98518]" />
                  <span>{language === 'EN' ? 'Submit Event Inquiry' : 'إرسال طلب الضيافة'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#0E5135] mx-auto animate-bounce" />
            <h3 className="font-serif text-3xl font-black text-[#111111]">
              {language === 'EN' ? 'Inquiry Received!' : 'تم استلام طلب الضيافة بنجاح!'}
            </h3>
            <p className="text-xs text-[#111111]/80 font-bold max-w-sm mx-auto">
              {language === 'EN'
                ? 'Thank you! Our Catering Manager will call you shortly to confirm menu customization & pricing.'
                : 'شكراً لك! سيتواصل معك مدير الضيافة في أقرب وقت لتأكيد قائمة الطعام والتسعيرة.'}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0E5135] border-2 border-[#111111] text-white font-black uppercase tracking-widest px-8 py-3 hover:bg-[#111111] transition-all text-xs"
            >
              {language === 'EN' ? 'Done' : 'تم'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
