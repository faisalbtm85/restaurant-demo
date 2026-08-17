import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as unknown as { env: Record<string, string> }).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl !== 'YOUR_SUPABASE_URL' &&
      supabaseUrl.startsWith('https://')
  );
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl!, supabaseAnonKey!);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

// SQL setup script generator for Supabase tables
export const SUPABASE_SQL_SETUP = `-- Copy and paste this into your Supabase SQL Editor to create tables for The Biryaani King Admin

-- 1. Restaurant Settings Table
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id INT PRIMARY KEY DEFAULT 1,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  address_en TEXT NOT NULL,
  address_ar TEXT NOT NULL,
  district_en TEXT NOT NULL,
  district_ar TEXT NOT NULL,
  google_maps_url TEXT NOT NULL,
  google_rating NUMERIC(3,2) DEFAULT 4.0,
  google_reviews_count INT DEFAULT 2126,
  opening_hours_en TEXT NOT NULL,
  opening_hours_ar TEXT NOT NULL
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  tagline_en TEXT,
  tagline_ar TEXT,
  display_order INT DEFAULT 0
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  spice_level TEXT DEFAULT 'MEDIUM',
  is_popular BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  is_sold_out BOOLEAN DEFAULT false,
  calories INT,
  prep_time_minutes INT DEFAULT 20
);

-- 4. Promo Banners Table
CREATE TABLE IF NOT EXISTS promo_banners (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  tagline_en TEXT,
  tagline_ar TEXT,
  original_price NUMERIC(10,2),
  deal_price NUMERIC(10,2),
  hours_remaining INT DEFAULT 24,
  image TEXT NOT NULL,
  active BOOLEAN DEFAULT true
);

-- 5. Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent INT NOT NULL,
  active BOOLEAN DEFAULT true,
  min_order_sar NUMERIC(10,2) DEFAULT 0
);

-- 6. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_ref TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  order_type TEXT NOT NULL,
  district TEXT,
  address TEXT,
  payment_method TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Catering Inquiries Table
CREATE TABLE IF NOT EXISTS catering_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  guests_count TEXT NOT NULL,
  date TEXT NOT NULL,
  message TEXT,
  preferred_contact TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Media Library Table
CREATE TABLE IF NOT EXISTS media_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Storage Bucket for food images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('restaurant-media', 'restaurant-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket access rules
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'restaurant-media');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'restaurant-media');
`;
