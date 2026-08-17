import React, { useState } from 'react';
import { Building2, Check, Phone, MapPin, Clock, Star } from 'lucide-react';
import { RestaurantSettings } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminSettingsManager: React.FC = () => {
  const { settings, updateSettings } = useAdminStore();
  const [formData, setFormData] = useState<RestaurantSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header */}
      <div className="bg-white border border-[#111111]/15 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Restaurant Location & Contact Settings
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Update phone numbers, WhatsApp, opening hours & address details for the customer website
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Restaurant settings updated successfully across the entire website!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#111111]/15 p-6 sm:p-8 space-y-6 text-xs font-bold">
        
        {/* Names */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-[#111111] flex items-center gap-2 border-b border-[#111111]/10 pb-2">
            <Building2 className="w-5 h-5 text-[#0E5135]" />
            <span>Brand Titles</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">English Brand Name</label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Arabic Brand Name</label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-right outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>
        </div>

        {/* Contact numbers */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-[#111111] flex items-center gap-2 border-b border-[#111111]/10 pb-2">
            <Phone className="w-5 h-5 text-[#0E5135]" />
            <span>Phone & WhatsApp Contact</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">Phone Call Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+966 55 000 0000"
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">WhatsApp Number (Without + or spaces)</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="966550000000"
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-[#111111] flex items-center gap-2 border-b border-[#111111]/10 pb-2">
            <MapPin className="w-5 h-5 text-[#0E5135]" />
            <span>Physical Address & Location</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">English Address</label>
              <input
                type="text"
                required
                value={formData.addressEn}
                onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Arabic Address</label>
              <input
                type="text"
                required
                value={formData.addressAr}
                onChange={(e) => setFormData({ ...formData, addressAr: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-right outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 uppercase tracking-wider">Google Maps Link URL</label>
            <input
              type="text"
              required
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
            />
          </div>
        </div>

        {/* Hours & Rating */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-[#111111] flex items-center gap-2 border-b border-[#111111]/10 pb-2">
            <Clock className="w-5 h-5 text-[#0E5135]" />
            <span>Opening Hours & Ratings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">English Hours</label>
              <input
                type="text"
                required
                value={formData.openingHoursEn}
                onChange={(e) => setFormData({ ...formData, openingHoursEn: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Arabic Hours</label>
              <input
                type="text"
                required
                value={formData.openingHoursAr}
                onChange={(e) => setFormData({ ...formData, openingHoursAr: e.target.value })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 text-right outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">Google Rating (e.g. 4.0)</label>
              <input
                type="number"
                step="0.1"
                min={1}
                max={5}
                value={formData.googleRating}
                onChange={(e) => setFormData({ ...formData, googleRating: Number(e.target.value) })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Reviews Count (e.g. 2126)</label>
              <input
                type="number"
                value={formData.googleReviewsCount}
                onChange={(e) => setFormData({ ...formData, googleReviewsCount: Number(e.target.value) })}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-3 outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#111111]/10 flex justify-end">
          <button
            type="submit"
            className="bg-[#0E5135] hover:bg-[#111111] text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider transition-all shadow-md"
          >
            Save Restaurant Settings
          </button>
        </div>

      </form>

    </div>
  );
};
