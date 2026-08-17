import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAdminStore } from '../lib/adminStore';

interface CheckoutModalProps {
  isOpen: boolean;
  language: Language;
  cartItems: CartItem[];
  subtotalPrice: number;
  onClose: () => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  language,
  cartItems,
  subtotalPrice,
  onClose,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const { addOrder } = useAdminStore();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'applepay' | 'cash' | 'card'>('mada');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Al Wizarat / Hara');
  const [address, setAddress] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRefNumber, setOrderRefNumber] = useState('');

  const deliveryFee = orderType === 'delivery' ? 12 : 0;
  const grandTotal = subtotalPrice + deliveryFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const ref = 'TBK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRefNumber(ref);

    // Save to Admin Store
    addOrder({
      id: `ord_${Date.now()}`,
      orderRef: ref,
      customerName: name,
      phone,
      orderType,
      district,
      address,
      items: cartItems.map((ci) => ({
        dishId: ci.menuItem.id,
        name: ci.menuItem.nameEn,
        quantity: ci.quantity,
        price: ci.menuItem.price,
        spice: ci.customization.selectedSpice,
      })),
      total: grandTotal,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    const itemsSummary = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.menuItem.nameEn} (SAR ${ci.itemTotalPrice})${
            ci.customization.selectedSpice ? ` [Heat: ${ci.customization.selectedSpice}]` : ''
          }`
      )
      .join('\n');

    const whatsappText = encodeURIComponent(
      `ORDER CONFIRMATION #${ref}\n\nCustomer: ${name}\nPhone: ${phone}\nType: ${orderType.toUpperCase()}\nDistrict: ${district}\nAddress: ${address}\n\nORDER ITEMS:\n${itemsSummary}\n\nSubtotal: SAR ${subtotalPrice}\nDelivery: SAR ${deliveryFee}\nGrand Total: SAR ${grandTotal}\nPayment: ${paymentMethod.toUpperCase()}`
    );

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${whatsappText}`, '_blank');

    setOrderComplete(true);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-[#111111]/20 shadow-2xl w-full max-w-xl overflow-hidden p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar text-[#111111]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 text-[#111111] hover:bg-[#111111] hover:text-white p-1.5 border border-[#111111]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div className="space-y-6">
            <div>
              <span className="text-[#E98518] text-[11px] font-black uppercase tracking-widest block mb-1">
                {language === 'EN' ? 'EXPRESS CHECKOUT' : 'إتمام الطلب'}
              </span>
              <h3 className="font-serif text-3xl font-black text-[#111111] tracking-tight">
                {language === 'EN' ? 'Confirm Your Order' : 'تأكيد بيانات التوصيل والدفع'}
              </h3>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-5 text-xs">
              {/* Delivery vs Pickup Toggle */}
              <div className="grid grid-cols-2 gap-3 bg-[#F6F2E9] p-1.5 border border-[#111111]/20">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2.5 font-black uppercase tracking-wider text-xs transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#0E5135] text-white shadow'
                      : 'bg-white text-[#111111] border border-[#111111]/20'
                  }`}
                >
                  🚀 {language === 'EN' ? 'Express Delivery (Riyadh)' : 'توصيل سريع (الرياض)'}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2.5 font-black uppercase tracking-wider text-xs transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#0E5135] text-white shadow'
                      : 'bg-white text-[#111111] border border-[#111111]/20'
                  }`}
                >
                  🏪 {language === 'EN' ? 'Pickup (Hara)' : 'استلام من الفرع (الوزارات)'}
                </button>
              </div>

              {/* Customer Info */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Full Name *' : 'الاسم *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'EN' ? 'e.g. Abdullah' : 'عبدالله'}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  />
                </div>

                <div>
                  <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                    {language === 'EN' ? 'Riyadh Phone Number *' : 'رقم الجوال *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="055 XXX XXXX"
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                      {language === 'EN' ? 'District in Riyadh' : 'الحي في الرياض'}
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. Al Wizarat / Olaya / Malaz / Sulaimaniyah"
                      className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
                      {language === 'EN' ? 'Street & Building Details' : 'اسم الشارع والمبنى'}
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={language === 'EN' ? 'e.g. Near Al Barra Ibn Azib Street, Bldg 12' : 'مثال: بالقرب من شارع البراء بن عازب'}
                      className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="block text-[#111111] font-black uppercase tracking-wider">
                  {language === 'EN' ? 'Payment Method' : 'طريقة الدفع'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'mada', label: 'Mada مدى' },
                    { id: 'applepay', label: 'Apple Pay' },
                    { id: 'cash', label: 'Cash / النقود' },
                    { id: 'card', label: 'Visa / MC' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 border text-[11px] font-black uppercase tracking-wider transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#0E5135] border-[#0E5135] text-white'
                          : 'bg-white border-[#111111]/20 text-[#111111]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-[#F6F2E9] border border-[#111111]/15 space-y-2">
                <div className="flex justify-between text-[#111111] font-bold">
                  <span>{language === 'EN' ? 'Subtotal:' : 'المجموع الفرعي:'}</span>
                  <span className="font-mono">SAR {subtotalPrice}</span>
                </div>
                <div className="flex justify-between text-[#111111] font-bold">
                  <span>{language === 'EN' ? 'Delivery Fee:' : 'رسوم التوصيل:'}</span>
                  <span className="font-mono">{deliveryFee > 0 ? `SAR ${deliveryFee}` : 'Free / مجاني'}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#111111] pt-2 border-t border-[#111111]/15">
                  <span>{language === 'EN' ? 'Total Amount:' : 'المبلغ الإجمالي:'}</span>
                  <span className="font-serif text-[#0E5135] text-xl">SAR {grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest py-4 transition-all text-xs shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>
                  {language === 'EN'
                    ? `Send Order via WhatsApp (SAR ${grandTotal})`
                    : `إرسال الطلب عبر الواتساب (SAR ${grandTotal})`}
                </span>
              </button>
            </form>
          </div>
        ) : (
          /* Success Receipt State */
          <div className="text-center py-6 space-y-6">
            <CheckCircle2 className="w-16 h-16 text-[#0E5135] mx-auto animate-bounce" />
            <div>
              <span className="text-xs text-[#E98518] font-mono font-black block mb-1">ORDER REF: #{orderRefNumber}</span>
              <h3 className="font-serif text-3xl font-black text-[#111111]">
                {language === 'EN' ? 'Order Sent via WhatsApp!' : 'تم إرسال الطلب عبر الواتساب!'}
              </h3>
              <p className="text-xs text-[#111111]/80 font-bold mt-1 max-w-sm mx-auto">
                {language === 'EN'
                  ? 'Your order details have been prepared for WhatsApp dispatch. Kitchen prep time: ~20 mins.'
                  : 'تم تجهيز تفاصيل طلبك للإرسال عبر الواتساب. وقت التجهيز المقدر: ٢٠ دقيقة.'}
              </p>
            </div>

            <div className="p-4 bg-[#F6F2E9] border border-[#111111]/15 text-xs text-left rtl:text-right space-y-2 font-bold">
              <div className="flex justify-between text-[#111111]">
                <span>Status:</span>
                <span className="text-[#0E5135] font-black">Dispatching to Kitchen 🔥</span>
              </div>
              <div className="flex justify-between text-[#111111]">
                <span>Contact Phone:</span>
                <span className="font-mono text-[#111111]">{phone}</span>
              </div>
              <div className="flex justify-between text-[#111111]">
                <span>Total Amount:</span>
                <span className="font-black text-[#0E5135]">SAR {grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-[#0E5135] text-white font-black uppercase tracking-widest px-8 py-3.5 hover:bg-[#111111] transition-all text-xs shadow-sm"
            >
              {language === 'EN' ? 'Back to Main Menu' : 'العودة للقائمة الرئيسية'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
