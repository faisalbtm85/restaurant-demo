import React, { useState } from 'react';
import {
  Utensils,
  ShoppingBag,
  PhoneCall,
  Database,
  PlusCircle,
  Copy,
  Check,
  AlertTriangle,
  Flame,
  Tag,
} from 'lucide-react';
import { useAdminStore } from '../../lib/adminStore';
import { isSupabaseConfigured, SUPABASE_SQL_SETUP } from '../../lib/supabase';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onNavigateTab }) => {
  const { menuItems, orders, cateringInquiries, promoCodes, settings } = useAdminStore();
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const soldOutCount = menuItems.filter((i) => i.isSoldOut).length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;
  const newCatering = cateringInquiries.filter((c) => c.status === 'New').length;
  const activePromos = promoCodes.filter((p) => p.active).length;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-8 text-[#111111]">
      
      {/* Top Banner Greeting */}
      <div className="bg-[#111111] text-[#F6F2E9] p-6 sm:p-8 border border-[#111111]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#E98518]">
            RESTAURANT MANAGEMENT SUITE
          </span>
          <h2 className="font-serif text-3xl font-black mt-1">
            {settings.nameEn} Dashboard
          </h2>
          <p className="text-xs text-[#F6F2E9]/70 font-semibold mt-1">
            Real-time management for menu items, SAR prices, special drops & orders
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigateTab('menu')}
            className="bg-[#0E5135] hover:bg-white hover:text-[#111111] text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border border-white/10 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#E98518]" />
            <span>Add New Dish</span>
          </button>
          <button
            onClick={() => onNavigateTab('promotions')}
            className="bg-[#E98518] hover:bg-white hover:text-[#111111] text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border border-white/10 shadow-sm"
          >
            <Tag className="w-4 h-4" />
            <span>Update Promo Drop</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Menu Dishes */}
        <div
          onClick={() => onNavigateTab('menu')}
          className="bg-white p-5 border border-[#111111]/15 hover:border-[#0E5135] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#111111]/60">
              Active Dishes
            </span>
            <div className="p-2 bg-[#F6F2E9] border border-[#111111]/10">
              <Utensils className="w-4 h-4 text-[#0E5135]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-black text-[#111111]">
              {menuItems.length}
            </div>
            {soldOutCount > 0 ? (
              <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{soldOutCount} sold out</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-[#0E5135] mt-1 block">
                All items in stock
              </span>
            )}
          </div>
        </div>

        {/* Live Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-5 border border-[#111111]/15 hover:border-[#0E5135] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#111111]/60">
              Active Orders
            </span>
            <div className="p-2 bg-[#F6F2E9] border border-[#111111]/10">
              <ShoppingBag className="w-4 h-4 text-[#E98518]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-black text-[#111111]">
              {orders.length}
            </div>
            <span className="text-[11px] font-bold text-[#0E5135] mt-1 block">
              {pendingOrders} kitchen prep pending
            </span>
          </div>
        </div>

        {/* Catering Enquiries */}
        <div
          onClick={() => onNavigateTab('catering')}
          className="bg-white p-5 border border-[#111111]/15 hover:border-[#0E5135] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#111111]/60">
              Catering Requests
            </span>
            <div className="p-2 bg-[#F6F2E9] border border-[#111111]/10">
              <PhoneCall className="w-4 h-4 text-[#0E5135]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-black text-[#111111]">
              {cateringInquiries.length}
            </div>
            <span className="text-[11px] font-bold text-[#E98518] mt-1 block">
              {newCatering} uncontacted leads
            </span>
          </div>
        </div>

        {/* Active Promos */}
        <div
          onClick={() => onNavigateTab('promotions')}
          className="bg-white p-5 border border-[#111111]/15 hover:border-[#0E5135] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#111111]/60">
              Active Promos
            </span>
            <div className="p-2 bg-[#F6F2E9] border border-[#111111]/10">
              <Flame className="w-4 h-4 text-[#E98518]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-black text-[#111111]">
              {activePromos}
            </div>
            <span className="text-[11px] font-bold text-[#0E5135] mt-1 block">
              Homepage Drop Active
            </span>
          </div>
        </div>

      </div>

      {/* Quick operational actions */}
      <div className="bg-white border border-[#111111]/15 p-6 space-y-4">
        <h3 className="font-serif text-xl font-black text-[#111111]">
          Quick Restaurant Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigateTab('menu')}
            className="p-3 bg-[#F6F2E9] border border-[#111111]/15 hover:bg-[#0E5135] hover:text-white transition-all text-left font-bold"
          >
            📋 Manage Dishes & Prices
          </button>
          <button
            onClick={() => onNavigateTab('categories')}
            className="p-3 bg-[#F6F2E9] border border-[#111111]/15 hover:bg-[#0E5135] hover:text-white transition-all text-left font-bold"
          >
            🗂️ Categories & Reorder
          </button>
          <button
            onClick={() => onNavigateTab('settings')}
            className="p-3 bg-[#F6F2E9] border border-[#111111]/15 hover:bg-[#0E5135] hover:text-white transition-all text-left font-bold"
          >
            📞 Update Phone & Hours
          </button>
          <button
            onClick={() => onNavigateTab('media')}
            className="p-3 bg-[#F6F2E9] border border-[#111111]/15 hover:bg-[#0E5135] hover:text-white transition-all text-left font-bold"
          >
            🖼️ Upload Dish Photos
          </button>
        </div>
      </div>

      {/* Supabase & Database Integration Box */}
      <div className="bg-white border border-[#111111]/15 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#111111]/10 pb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#0E5135]" />
            <h3 className="font-serif text-xl font-black text-[#111111]">
              Supabase & PostgreSQL Database Status
            </h3>
          </div>
          <span className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider border ${
            isSupabaseConfigured()
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            {isSupabaseConfigured() ? 'Live Supabase Connection' : 'Local Storage Fallback'}
          </span>
        </div>

        <p className="text-xs text-[#111111]/80 font-bold leading-relaxed">
          {isSupabaseConfigured()
            ? 'Your website is actively synced with your live Supabase PostgreSQL database and image storage bucket.'
            : 'Your admin panel is running in Local Storage mode. Any changes made here immediately update your website preview. To connect your live Supabase project, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => setShowSql(!showSql)}
            className="text-xs font-black text-[#0E5135] underline hover:text-[#111111]"
          >
            {showSql ? 'Hide Supabase PostgreSQL SQL Setup Schema' : 'View / Copy Supabase SQL Setup Schema'}
          </button>

          {showSql && (
            <div className="mt-4 p-4 bg-[#111111] text-[#F6F2E9] font-mono text-[11px] overflow-x-auto border border-[#111111] relative">
              <button
                onClick={handleCopySql}
                className="absolute top-3 right-3 bg-[#0E5135] hover:bg-white hover:text-[#111111] text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
              </button>
              <pre className="whitespace-pre-wrap">{SUPABASE_SQL_SETUP}</pre>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
