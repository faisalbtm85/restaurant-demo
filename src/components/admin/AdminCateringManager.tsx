import React, { useState } from 'react';
import { PhoneCall, MessageSquare, Calendar, Users } from 'lucide-react';
import { CateringInquiryRecord } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminCateringManager: React.FC = () => {
  const { cateringInquiries, updateCateringStatus } = useAdminStore();
  const [filter, setFilter] = useState<string>('all');

  const filtered = cateringInquiries.filter((c) => {
    if (filter === 'all') return true;
    return c.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header */}
      <div className="bg-white border border-[#111111]/15 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Catering & Private Event Requests
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Manage inquiries for corporate majlis, weddings & family gatherings
          </p>
        </div>

        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'confirmed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border transition-all ${
                filter === st
                  ? 'bg-[#0E5135] text-white border-[#0E5135]'
                  : 'bg-white text-[#111111] border-[#111111]/20'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#111111]/15 p-6 space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#111111]/10 pb-3">
              <div>
                <h3 className="font-serif text-xl font-black text-[#111111] inline-block">
                  {item.name}
                </h3>
                <span className="text-xs text-[#0E5135] font-black ml-2 uppercase">
                  • {item.eventType}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={item.status}
                  onChange={(e) => updateCateringStatus(item.id, e.target.value as any)}
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider border outline-none ${
                    item.status === 'New'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : item.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-gray-50 text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="New">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Archived">Archived</option>
                </select>

                <a
                  href={`https://wa.me/966${item.phone.replace(/^0+/, '')}?text=Hello%20${encodeURIComponent(item.name)},%20regarding%20your%20catering%20inquiry%20for%20The%20Biryaani%20King`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Lead</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold bg-[#F6F2E9] p-4 border border-[#111111]/10">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#0E5135]" />
                <span>Guests: {item.guestsCount}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#E98518]" />
                <span>Event Date: {item.date}</span>
              </div>

              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#111111]" />
                <span>Phone: {item.phone}</span>
              </div>
            </div>

            {item.message && (
              <p className="text-xs text-[#111111]/80 font-semibold italic bg-white p-3 border border-[#111111]/10">
                "{item.message}"
              </p>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white border border-[#111111]/15 p-8 text-center text-xs font-bold text-[#111111]/60">
            No catering requests found in this status filter.
          </div>
        )}
      </div>

    </div>
  );
};
