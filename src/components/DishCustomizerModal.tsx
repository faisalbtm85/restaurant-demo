import React, { useState } from 'react';
import { X, Flame, Check } from 'lucide-react';
import { Language, MenuItem, SpiceLevel, CartCustomization } from '../types';

interface DishCustomizerModalProps {
  item: MenuItem | null;
  language: Language;
  onClose: () => void;
  onConfirmAdd: (item: MenuItem, customization: CartCustomization, quantity: number) => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({
  item,
  language,
  onClose,
  onConfirmAdd,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(item.spiceLevel || 'MEDIUM');
  const [selectedAddOns, setSelectedAddOns] = useState<{ nameEn: string; nameAr: string; price: number }[]>([]);
  const [instructions, setInstructions] = useState('');

  const addOnOptions = item.options?.addOns || [
    { nameEn: 'Fresh Mint Raita', nameAr: 'رايتا بالنعناع', price: 5 },
    { nameEn: 'Spicy Kachumber Salad', nameAr: 'سلطة كتشومبر حارة', price: 6 },
    { nameEn: 'Garlic Roghni Naan', nameAr: 'خبز نان روغني بالثوم', price: 4 },
  ];

  const handleToggleAddOn = (addOn: { nameEn: string; nameAr: string; price: number }) => {
    if (selectedAddOns.some((a) => a.nameEn === addOn.nameEn)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.nameEn !== addOn.nameEn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const addOnsTotalPrice = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const itemUnitPrice = item.price + addOnsTotalPrice;
  const totalPrice = itemUnitPrice * quantity;

  const handleConfirm = () => {
    onConfirmAdd(
      item,
      {
        selectedSpice,
        selectedAddOns,
        specialInstructions: instructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#111111]">
      <div className="bg-white border-2 border-[#111111] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative h-44 overflow-hidden bg-[#111111] shrink-0 border-b-2 border-[#111111]">
          <img
            src={item.image}
            alt={language === 'EN' ? item.nameEn : item.nameAr}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 rtl:left-3 bg-white hover:bg-[#111111] text-[#111111] hover:text-white p-2 border border-[#111111] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] uppercase tracking-widest text-[#E98518] font-black block">
              {language === 'EN' ? 'Customization' : 'تخصيص الطلب'}
            </span>
            <h3 className="font-serif text-2xl font-black text-white">
              {language === 'EN' ? item.nameEn : item.nameAr}
            </h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1 bg-[#F6F2E9]">
          
          {/* Spice Level Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#0E5135] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#E98518]" />
              <span>{language === 'EN' ? 'Select Heat Level' : 'درجة حرارة الفلفل'}</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['MILD', 'MEDIUM', 'KARACHI', 'EXTRA HOT'] as SpiceLevel[]).map((level) => {
                const active = selectedSpice === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSpice(level)}
                    className={`py-2 px-2 text-xs font-black uppercase border text-center transition-all ${
                      active
                        ? 'bg-[#0E5135] border-[#111111] text-white shadow-sm'
                        : 'bg-white border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons List */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#0E5135] block">
              {language === 'EN' ? 'Optional Sides & Add-ons' : 'إضافات جانبية (اختياري)'}
            </label>

            <div className="space-y-2">
              {addOnOptions.map((addOn, index) => {
                const isSelected = selectedAddOns.some((a) => a.nameEn === addOn.nameEn);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleToggleAddOn(addOn)}
                    className={`w-full flex items-center justify-between p-3 border text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white border-2 border-[#0E5135] text-[#111111]'
                        : 'bg-white border border-[#111111] text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className={`w-4 h-4 border flex items-center justify-center ${isSelected ? 'bg-[#0E5135] border-[#111111] text-white' : 'border-[#111111]'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span>{language === 'EN' ? addOn.nameEn : addOn.nameAr}</span>
                    </div>
                    <span className="font-black text-[#0E5135]">+SAR {addOn.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#111111] block">
              {language === 'EN' ? 'Special Kitchen Instructions' : 'ملاحظات خاصة للمطبخ'}
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={language === 'EN' ? 'e.g. Less oil, extra ginger, sauce on the side...' : 'مثال: زيت أقل، زنجبيل إضافي، الصلصة جانبية...'}
              className="w-full bg-white border border-[#111111] p-3 text-xs text-[#111111] font-bold placeholder-[#111111]/40 outline-none focus:border-[#0E5135]"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#111111]/20">
            <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
              {language === 'EN' ? 'Quantity:' : 'الكمية:'}
            </span>
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white border border-[#111111] px-3 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-base font-black text-[#111111] hover:text-[#0E5135] px-1"
              >
                -
              </button>
              <span className="font-mono text-sm font-black text-[#111111]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="text-base font-black text-[#111111] hover:text-[#0E5135] px-1"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Footer Confirmation */}
        <div className="p-4 bg-white border-t-2 border-[#111111] shrink-0">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-between bg-[#0E5135] hover:bg-[#111111] text-white font-black uppercase tracking-widest p-3.5 border-2 border-[#111111] shadow-sm transition-all text-xs"
          >
            <span>{language === 'EN' ? 'Add to Order Basket' : 'إضافة إلى سلة الطلب'}</span>
            <span className="font-serif text-base text-[#E98518]">SAR {totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
