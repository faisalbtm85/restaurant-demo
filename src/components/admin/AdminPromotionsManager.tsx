import React, { useState } from 'react';
import { Flame, Tag, Plus, Check, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { PromoBanner, PromoCode } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminPromotionsManager: React.FC = () => {
  const { promoBanner, promoCodes, updatePromoBanner, updatePromoCodes } = useAdminStore();
  const [bannerForm, setBannerForm] = useState<PromoBanner>({ ...promoBanner });
  const [savedBannerSuccess, setSavedBannerSuccess] = useState(false);

  // New Promo Code state
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState<number>(10);
  const [newMinOrder, setNewMinOrder] = useState<number>(50);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromoBanner(bannerForm);
    setSavedBannerSuccess(true);
    setTimeout(() => setSavedBannerSuccess(false), 2500);
  };

  const handleToggleCodeActive = (id: string) => {
    const updated = promoCodes.map((p) => (p.id === id ? { ...p, active: !p.active } : p));
    updatePromoCodes(updated);
  };

  const handleDeleteCode = (id: string) => {
    const updated = promoCodes.filter((p) => p.id !== id);
    updatePromoCodes(updated);
  };

  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const codeObj: PromoCode = {
      id: `promo_${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountPercent: Number(newDiscount),
      minOrderSar: Number(newMinOrder),
      active: true,
    };

    updatePromoCodes([...promoCodes, codeObj]);
    setNewCode('');
    setNewDiscount(10);
    setNewMinOrder(50);
  };

  return (
    <div className="space-y-8 text-[#111111]">
      
      {/* 1. Homepage Special Banner Drop Management */}
      <div className="bg-white border border-[#111111]/15 p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-[#E98518]" />
            <h2 className="font-serif text-2xl font-black text-[#111111]">
              Homepage Special Promotion Drop
            </h2>
          </div>
          <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider border ${
            bannerForm.active ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-red-50 text-red-800 border-red-300'
          }`}>
            {bannerForm.active ? 'Active on Homepage' : 'Hidden'}
          </span>
        </div>

        {savedBannerSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Homepage Promotion Drop updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveBanner} className="space-y-4 text-xs font-bold">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">English Title *</label>
              <input
                type="text"
                required
                value={bannerForm.titleEn}
                onChange={(e) => setBannerForm({ ...bannerForm, titleEn: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Arabic Title *</label>
              <input
                type="text"
                required
                value={bannerForm.titleAr}
                onChange={(e) => setBannerForm({ ...bannerForm, titleAr: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-right outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">English Tagline</label>
              <textarea
                rows={2}
                value={bannerForm.taglineEn}
                onChange={(e) => setBannerForm({ ...bannerForm, taglineEn: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Arabic Tagline</label>
              <textarea
                rows={2}
                value={bannerForm.taglineAr}
                onChange={(e) => setBannerForm({ ...bannerForm, taglineAr: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-right outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block mb-1 uppercase tracking-wider">Original Price (SAR)</label>
              <input
                type="number"
                value={bannerForm.originalPrice}
                onChange={(e) => setBannerForm({ ...bannerForm, originalPrice: Number(e.target.value) })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Deal Price (SAR)</label>
              <input
                type="number"
                value={bannerForm.dealPrice}
                onChange={(e) => setBannerForm({ ...bannerForm, dealPrice: Number(e.target.value) })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Hours Remaining</label>
              <input
                type="number"
                value={bannerForm.hoursRemaining}
                onChange={(e) => setBannerForm({ ...bannerForm, hoursRemaining: Number(e.target.value) })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center space-x-2 cursor-pointer pb-3 text-sm">
                <input
                  type="checkbox"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                />
                <span className="font-black text-[#0E5135]">Active on Homepage</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 uppercase tracking-wider">Promotion Image URL</label>
            <input
              type="text"
              value={bannerForm.image}
              onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
              className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#0E5135] hover:bg-[#111111] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition-all shadow-sm"
            >
              Update Homepage Drop
            </button>
          </div>
        </form>
      </div>

      {/* 2. Promo Codes Management */}
      <div className="bg-white border border-[#111111]/15 p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2 border-b border-[#111111]/10 pb-4">
          <Tag className="w-6 h-6 text-[#0E5135]" />
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Customer Discount Promo Codes
          </h2>
        </div>

        {/* Create Code Form */}
        <form onSubmit={handleCreateCode} className="bg-[#F6F2E9] p-4 border border-[#111111]/15 space-y-3 text-xs font-bold">
          <span className="text-[#0E5135] uppercase font-black tracking-wider block">
            Create New Discount Code
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block mb-1">Code Name</label>
              <input
                type="text"
                required
                placeholder="e.g. KING20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full bg-white border border-[#111111]/20 p-2 uppercase"
              />
            </div>

            <div>
              <label className="block mb-1">Discount %</label>
              <input
                type="number"
                required
                min={1}
                max={100}
                value={newDiscount}
                onChange={(e) => setNewDiscount(Number(e.target.value))}
                className="w-full bg-white border border-[#111111]/20 p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Min Order (SAR)</label>
              <input
                type="number"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(Number(e.target.value))}
                className="w-full bg-white border border-[#111111]/20 p-2"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full bg-[#0E5135] text-white p-2.5 font-black uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Code</span>
              </button>
            </div>
          </div>
        </form>

        {/* List of Codes */}
        <div className="space-y-2">
          {promoCodes.map((code) => (
            <div
              key={code.id}
              className="p-4 bg-white border border-[#111111]/15 flex items-center justify-between font-bold text-xs"
            >
              <div className="flex items-center space-x-4">
                <span className="font-mono text-base font-black text-[#0E5135] bg-[#F6F2E9] px-3 py-1 border border-[#111111]/10">
                  {code.code}
                </span>
                <div>
                  <div className="text-sm font-black text-[#111111]">
                    {code.discountPercent}% OFF
                  </div>
                  <div className="text-[11px] text-[#111111]/60">
                    Min Order: SAR {code.minOrderSar || 0}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleCodeActive(code.id)}
                  className={`px-3 py-1 text-[11px] font-black uppercase border flex items-center gap-1 ${
                    code.active
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                  }`}
                >
                  {code.active ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>{code.active ? 'Active' : 'Disabled'}</span>
                </button>

                <button
                  onClick={() => handleDeleteCode(code.id)}
                  className="p-1.5 text-red-700 hover:bg-red-50 border border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
