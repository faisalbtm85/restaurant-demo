import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Phone, CheckCircle, Clock } from 'lucide-react';
import { OrderRecord } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminOrdersManager: React.FC = () => {
  const { orders, updateOrderStatus } = useAdminStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header */}
      <div className="bg-white border border-[#111111]/15 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Customer Orders Log
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Track incoming WhatsApp delivery & pickup orders with live status management
          </p>
        </div>

        <div className="flex gap-2">
          {['all', 'pending', 'preparing', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border transition-all ${
                filterStatus === st
                  ? 'bg-[#0E5135] text-white border-[#0E5135]'
                  : 'bg-white text-[#111111] border-[#111111]/20'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white border border-[#111111]/15 p-6 space-y-4 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#111111]/10 pb-3">
              <div>
                <span className="text-[10px] font-mono font-black text-[#E98518] bg-[#F6F2E9] px-2 py-0.5 border border-[#111111]/10">
                  #{ord.orderRef}
                </span>
                <h3 className="font-serif text-lg font-black text-[#111111] inline-block ml-2">
                  {ord.customerName}
                </h3>
                <span className="text-xs text-[#111111]/60 font-semibold ml-2">
                  • {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={ord.status}
                  onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider border outline-none ${
                    ord.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : ord.status === 'Preparing'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-blue-50 text-blue-800 border-blue-300'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <a
                  href={`https://wa.me/966${ord.phone.replace(/^0+/, '')}?text=Hello%20${encodeURIComponent(ord.customerName)},%20regarding%20your%20Biryaani%20King%20Order%20%23${ord.orderRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-bold">
              
              {/* Items List */}
              <div className="md:col-span-7 bg-[#F6F2E9] p-4 border border-[#111111]/10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0E5135] block">
                  Dishes Ordered ({ord.items.length})
                </span>
                <div className="space-y-1 divide-y divide-[#111111]/10">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center pt-1">
                      <span>
                        <span className="text-[#0E5135] font-black">{it.quantity}x</span> {it.name}{' '}
                        {it.spice && <span className="text-[10px] text-[#E98518]">({it.spice})</span>}
                      </span>
                      <span className="font-mono text-[#111111]">SAR {it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Delivery Details */}
              <div className="md:col-span-5 space-y-2">
                <div className="p-3 bg-white border border-[#111111]/10 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#111111]/60">Order Type:</span>
                    <span className="uppercase text-[#0E5135]">{ord.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#111111]/60">Phone:</span>
                    <span>{ord.phone}</span>
                  </div>
                  {ord.district && (
                    <div className="flex justify-between">
                      <span className="text-[#111111]/60">District:</span>
                      <span>{ord.district}</span>
                    </div>
                  )}
                  {ord.address && (
                    <div className="flex justify-between">
                      <span className="text-[#111111]/60">Address:</span>
                      <span className="truncate max-w-[160px]">{ord.address}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-[#111111] text-[#F6F2E9] flex justify-between items-center">
                  <span className="uppercase text-[10px] font-black">Total Paid / Due:</span>
                  <span className="font-serif text-lg font-black text-[#E98518]">SAR {ord.total}</span>
                </div>
              </div>

            </div>

          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white border border-[#111111]/15 p-8 text-center text-xs font-bold text-[#111111]/60">
            No orders found in this filter state.
          </div>
        )}
      </div>

    </div>
  );
};
