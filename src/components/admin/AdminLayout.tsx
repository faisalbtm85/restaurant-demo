import React, { useState } from 'react';
import {
  LayoutDashboard,
  Utensils,
  Layers,
  Flame,
  Settings,
  Image as ImageIcon,
  ShoppingBag,
  PhoneCall,
  LogOut,
  Globe,
  Menu,
  X,
} from 'lucide-react';
import { useAdminStore } from '../../lib/adminStore';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminMenuManager } from './AdminMenuManager';
import { AdminCategoriesManager } from './AdminCategoriesManager';
import { AdminPromotionsManager } from './AdminPromotionsManager';
import { AdminSettingsManager } from './AdminSettingsManager';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminOrdersManager } from './AdminOrdersManager';
import { AdminCateringManager } from './AdminCateringManager';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  const { adminUser, logoutAdmin } = useAdminStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Dishes', icon: Utensils },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'promotions', label: 'Promotions', icon: Flame },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'orders', label: 'Orders Log', icon: ShoppingBag },
    { id: 'catering', label: 'Catering Requests', icon: PhoneCall },
  ];

  const handleLogout = () => {
    logoutAdmin();
    onExitAdmin();
  };

  return (
    <div className="min-h-screen bg-[#F6F2E9] text-[#111111] flex flex-col">
      
      {/* Admin Topbar */}
      <header className="bg-[#111111] text-[#F6F2E9] border-b border-[#111111]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-[#E98518] rounded-full inline-block animate-pulse" />
              <h1 className="font-serif text-lg font-black tracking-wide text-white">
                The Biryaani King <span className="text-[#E98518] text-xs font-sans uppercase tracking-widest font-black ml-1">Portal</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onExitAdmin}
              className="bg-[#0E5135] hover:bg-white hover:text-[#111111] text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 transition-all flex items-center gap-1.5 border border-white/10 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Customer App</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-950 hover:bg-red-900 text-red-100 text-xs font-black uppercase tracking-wider px-3 py-2 transition-colors flex items-center gap-1 border border-red-800"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body with Sidebar + Content Stage */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block lg:col-span-3 space-y-2">
          <div className="bg-white border border-[#111111]/15 p-4 space-y-1 shadow-sm sticky top-22">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]/50 px-3 py-1 block">
              MANAGEMENT TABS
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#0E5135] text-white shadow-sm'
                      : 'text-[#111111]/80 hover:bg-[#F6F2E9] hover:text-[#111111]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E98518]' : 'text-[#111111]/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#111111]/10 text-[11px] font-bold text-[#111111]/60 px-3">
              Logged in as: <span className="text-[#0E5135] font-black block truncate">{adminUser?.email || 'admin@biryaaniking.sa'}</span>
            </div>
          </div>
        </aside>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden col-span-1 bg-white border border-[#111111]/20 p-4 space-y-1 shadow-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-black uppercase tracking-wider ${
                    isActive ? 'bg-[#0E5135] text-white' : 'text-[#111111] hover:bg-[#F6F2E9]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Area */}
        <main className="lg:col-span-9">
          {activeTab === 'dashboard' && <AdminDashboardOverview onNavigateTab={setActiveTab} />}
          {activeTab === 'menu' && <AdminMenuManager />}
          {activeTab === 'categories' && <AdminCategoriesManager />}
          {activeTab === 'promotions' && <AdminPromotionsManager />}
          {activeTab === 'settings' && <AdminSettingsManager />}
          {activeTab === 'media' && <AdminMediaLibrary />}
          {activeTab === 'orders' && <AdminOrdersManager />}
          {activeTab === 'catering' && <AdminCateringManager />}
        </main>

      </div>

    </div>
  );
};
