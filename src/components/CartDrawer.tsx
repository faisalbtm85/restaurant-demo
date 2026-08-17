import React from 'react';
import { X, Trash2, ShoppingBag, MessageSquare, Plus, Minus } from 'lucide-react';
import { Language, CartItem } from '../types';
import { RESTAURANT_INFO, TRANSLATIONS } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  language: Language;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  language,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language].cart;

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotalPrice, 0);

  const handleWhatsAppOrder = () => {
    const itemsSummary = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.menuItem.nameEn} (SAR ${ci.itemTotalPrice})${
            ci.customization.selectedSpice ? ` [Spice: ${ci.customization.selectedSpice}]` : ''
          }`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `THE BIRYAANI KING - ONLINE ORDER BASKET\n\n${itemsSummary}\n\nSubtotal: SAR ${subtotal}\nLocation: Riyadh`
    );

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-[#F6F2E9] border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#111111] shadow-2xl flex flex-col justify-between text-[#111111]">
          
          {/* Header */}
          <div className="p-6 border-b-2 border-[#111111] bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <ShoppingBag className="w-5 h-5 text-[#0E5135]" />
              <h2 className="font-serif text-xl font-black text-[#111111] tracking-tight">
                {t.title}
              </h2>
              <span className="bg-[#0E5135] text-white text-xs font-mono font-black px-2.5 py-0.5 border border-[#111111]">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-[#111111] hover:bg-[#111111] hover:text-white p-1.5 transition-colors border border-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#111111] p-4 space-y-3 relative group shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.nameEn}
                        className="w-14 h-14 object-cover border border-[#111111]"
                      />
                      <div>
                        <h4 className="font-serif font-black text-sm text-[#111111]">
                          {language === 'EN' ? item.menuItem.nameEn : item.menuItem.nameAr}
                        </h4>
                        <div className="text-[11px] text-[#E98518] font-black uppercase tracking-wider flex items-center gap-1 mt-0.5">
                          <span>Heat: {item.customization.selectedSpice || item.menuItem.spiceLevel}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#111111]/50 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add-ons list if selected */}
                  {item.customization.selectedAddOns && item.customization.selectedAddOns.length > 0 && (
                    <div className="text-[11px] text-[#111111]/80 bg-[#F6F2E9] p-2 border border-[#111111]/20 font-medium">
                      <span className="font-black text-[#0E5135] block uppercase">Sides:</span>
                      {item.customization.selectedAddOns.map((a, idx) => (
                        <span key={idx} className="block">• {language === 'EN' ? a.nameEn : a.nameAr} (+SAR {a.price})</span>
                      ))}
                    </div>
                  )}

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#111111]/10">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#F6F2E9] border border-[#111111] px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-[#111111] hover:text-[#0E5135] p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-black text-[#111111] px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-[#111111] hover:text-[#0E5135] p-1"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif font-black text-base text-[#0E5135]">
                      SAR {item.itemTotalPrice}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#111111]/30 mx-auto" />
                <p className="text-xs text-[#111111]/70 font-bold uppercase tracking-wider">{t.emptyText}</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#111111]/20 bg-white space-y-4">
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[#111111]">
                  <span className="font-black uppercase tracking-wider">{t.subtotal}</span>
                  <span className="font-serif text-2xl font-black text-[#0E5135]">SAR {subtotal}</span>
                </div>
                <p className="text-[11px] text-[#111111]/60 font-medium">{t.deliveryNote}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onOpenCheckout}
                  className="w-full flex items-center justify-center bg-[#0E5135] hover:bg-[#111111] text-white font-black uppercase tracking-widest py-3.5 transition-all text-xs shadow-sm"
                >
                  <span>{t.checkoutBtn}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest py-3 text-xs transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{language === 'EN' ? 'Order Direct via WhatsApp' : 'إرسال مباشر عبر الواتساب'}</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-[#111111]/60 hover:text-red-600 underline font-bold uppercase tracking-wider transition-colors"
                >
                  {t.clearCart}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
