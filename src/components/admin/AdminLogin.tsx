import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured, getSupabase } from '../../lib/supabase';
import { useAdminStore } from '../../lib/adminStore';

interface AdminLoginProps {
  onSuccess?: () => void;
  onLoginSuccess?: () => void;
  onCancel?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onLoginSuccess, onCancel }) => {
  const { loginAdmin } = useAdminStore();
  const [email, setEmail] = useState('admin@biryaaniking.sa');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [authMode, setAuthMode] = useState<'demo' | 'supabase'>('demo');

  const handleDemoBypass = () => {
    loginAdmin({ email: email || 'admin@biryaaniking.sa' });
    if (onLoginSuccess) onLoginSuccess();
    if (onSuccess) onSuccess();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabaseConnected = isSupabaseConfigured();

    if (authMode === 'supabase' && supabaseConnected) {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(`${error.message}. You can switch to Demo Mode below to bypass login.`);
          setLoading(false);
          return;
        }

        if (data.user) {
          loginAdmin({ email: data.user.email || email });
          setLoading(false);
          if (onLoginSuccess) onLoginSuccess();
          if (onSuccess) onSuccess();
          return;
        }
      }
    }

    // Local Demo / Fallback authentication
    handleDemoBypass();
  };

  return (
    <div className="min-h-screen bg-[#F6F2E9] flex items-center justify-center p-4 text-[#111111]">
      <div className="bg-white border border-[#111111]/20 shadow-2xl w-full max-w-md p-8 relative">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 bg-[#111111] text-[#E98518] mx-auto flex items-center justify-center border border-[#111111] shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E98518] block">
            THE BIRYAANI KING ADMIN
          </span>
          <h2 className="font-serif text-3xl font-black text-[#111111]">
            Owner Portal Login
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Manage menu items, prices, promotions & restaurant settings
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            type="button"
            onClick={() => { setAuthMode('demo'); setErrorMsg(''); }}
            className={`py-2 px-3 text-[11px] font-black uppercase tracking-wider border transition-all ${
              authMode === 'demo'
                ? 'bg-[#111111] text-[#E98518] border-[#111111]'
                : 'bg-[#F6F2E9] text-[#111111]/70 border-[#111111]/20 hover:bg-white'
            }`}
          >
            ⚡ Local Demo Access
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('supabase'); setErrorMsg(''); }}
            className={`py-2 px-3 text-[11px] font-black uppercase tracking-wider border transition-all ${
              authMode === 'supabase'
                ? 'bg-[#0E5135] text-white border-[#0E5135]'
                : 'bg-[#F6F2E9] text-[#111111]/70 border-[#111111]/20 hover:bg-white'
            }`}
          >
            🔒 Supabase Cloud
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mb-6 p-3 bg-[#F6F2E9] border border-[#111111]/15 flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1.5 text-[#111111]">
            <span className={`w-2.5 h-2.5 rounded-full ${authMode === 'supabase' && isSupabaseConfigured() ? 'bg-green-600' : 'bg-amber-500'}`} />
            <span>Mode: {authMode === 'supabase' ? 'Supabase Auth' : 'Local Demo Mode'}</span>
          </span>
          <span className="text-[10px] text-[#0E5135] font-black uppercase">
            {authMode === 'supabase' && isSupabaseConfigured() ? 'PostgreSQL Active' : 'Instant Bypass'}
          </span>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-300 text-red-800 text-xs font-bold space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              type="button"
              onClick={handleDemoBypass}
              className="w-full bg-[#E98518] hover:bg-[#111111] text-white py-1.5 px-3 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              ⚡ Bypass & Enter via Local Demo Mode
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-[#111111]/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@biryaaniking.sa"
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 pl-9 pr-3 py-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#111111] mb-1 font-black uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-[#111111]/50" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 pl-9 pr-3 py-3 text-[#111111] font-bold outline-none focus:border-[#0E5135]"
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-[#0E5135] hover:bg-[#111111] text-white font-black uppercase tracking-widest py-3.5 transition-all text-xs shadow-md"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Enter Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#E98518]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDemoBypass}
              className="w-full flex items-center justify-center space-x-2 bg-[#111111]/5 hover:bg-[#111111]/10 text-[#111111] font-black uppercase tracking-widest py-2.5 transition-all text-[11px] border border-[#111111]/15"
            >
              <span>⚡ One-Click Demo Access (Skip Password)</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#111111]/10 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-bold text-[#111111]/70 hover:text-[#0E5135] transition-colors"
          >
            ← Back to Customer Website
          </button>
        </div>

      </div>
    </div>
  );
};
