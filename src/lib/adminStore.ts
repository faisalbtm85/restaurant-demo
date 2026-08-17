import { useState, useEffect } from 'react';
import {
  MenuItem,
  Category,
  PromoBanner,
  PromoCode,
  RestaurantSettings,
  OrderRecord,
  CateringInquiryRecord,
  MediaItem,
} from '../types';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from '../data/restaurantData';
import { getSupabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_KEYS = {
  MENU: 'tbk_admin_menu_items',
  CATEGORIES: 'tbk_admin_categories',
  PROMO_BANNER: 'tbk_admin_promo_banner',
  PROMO_CODES: 'tbk_admin_promo_codes',
  SETTINGS: 'tbk_admin_settings',
  ORDERS: 'tbk_admin_orders',
  CATERING: 'tbk_admin_catering_inquiries',
  MEDIA: 'tbk_admin_media',
  AUTH: 'tbk_admin_auth_user',
};

// Initial default fallback data
const DEFAULT_SETTINGS: RestaurantSettings = {
  nameEn: 'THE BIRYAANI KING',
  nameAr: 'ذا برياني كينج',
  phone: RESTAURANT_INFO.phone,
  whatsapp: RESTAURANT_INFO.whatsapp,
  addressEn: RESTAURANT_INFO.address.en,
  addressAr: RESTAURANT_INFO.address.ar,
  districtEn: 'Hara, Al Wizarat',
  districtAr: 'الحارة، الوزارات',
  googleMapsUrl: RESTAURANT_INFO.googleMapsUrl,
  googleRating: RESTAURANT_INFO.rating,
  googleReviewsCount: RESTAURANT_INFO.reviewCount,
  openingHoursEn: 'Sat - Thu & Fri: 12:00 PM – 3:00 PM & 5:30 PM – 12:30 AM',
  openingHoursAr: 'السبت - الخميس والجمعة: ١٢:٠٠ م – ٣:٠٠ م و ٥:٣٠ م – ١٢:٣٠ ص',
};

const DEFAULT_PROMO_BANNER: PromoBanner = {
  id: 'banner_1',
  titleEn: "TODAY'S SPECIAL DROP: Karachi Mutton Deg Biryani",
  titleAr: "عرض اليوم المميز: برياني غنم ديج كراتشي",
  taglineEn: 'Slow-cooked in sealed copper degs with aged basmati rice & fresh mint raita.',
  taglineAr: 'مطبوخ ببطء في أواني النحاس المختومة مع أرز البسمتي العتيق ورايتا النعناع.',
  originalPrice: 48,
  dealPrice: 38,
  hoursRemaining: 18,
  image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
  active: true,
};

const DEFAULT_PROMO_CODES: PromoCode[] = [
  { id: 'p1', code: 'KING10', discountPercent: 10, active: true, minOrderSar: 50 },
  { id: 'p2', code: 'RIYADH15', discountPercent: 15, active: true, minOrderSar: 100 },
  { id: 'p3', code: 'CATERING50', discountPercent: 20, active: false, minOrderSar: 300 },
];

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    name: 'Chicken Biryani Hero',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    category: 'dish',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    name: 'Mutton Nihari',
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop',
    category: 'dish',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    name: 'Malai Boti Grill',
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop',
    category: 'dish',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm4',
    name: 'Roghni Naan',
    url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop',
    category: 'dish',
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_ORDERS: OrderRecord[] = [
  {
    id: 'ord_1',
    orderRef: 'TBK-8812',
    customerName: 'Faisal Al-Otaibi',
    phone: '0551234567',
    orderType: 'delivery',
    district: 'Al Wizarat',
    address: 'Bldg 45, Near Mosque',
    paymentMethod: 'cash',
    items: [
      { name: 'Special Chicken Biryani', quantity: 2, spice: 'KARACHI', price: 28 },
      { name: 'Fresh Mint Raita', quantity: 2, price: 5 },
    ],
    subtotal: 66,
    deliveryFee: 10,
    total: 76,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 'ord_2',
    orderRef: 'TBK-8811',
    customerName: 'Tariq Mansoor',
    phone: '0509876543',
    orderType: 'pickup',
    paymentMethod: 'card',
    items: [
      { name: 'Special Mutton Nihari', quantity: 1, spice: 'MEDIUM', price: 38 },
      { name: 'Hot Butter Naan', quantity: 3, price: 3 },
    ],
    subtotal: 47,
    deliveryFee: 0,
    total: 47,
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 55 * 60000).toISOString(),
  },
];

const DEFAULT_CATERING: CateringInquiryRecord[] = [
  {
    id: 'cat_1',
    name: 'Sultan Khalid',
    phone: '0567778899',
    eventType: 'Corporate Majlis',
    guestsCount: '50-100 Guests',
    date: '2026-08-20',
    message: 'Need live copper deg setup at Olaya office building.',
    preferredContact: 'whatsapp',
    status: 'New',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
  },
];

// Memory listeners for cross-component re-renders
type Listener = () => void;
const listeners: Set<Listener> = new Set();
const notifyListeners = () => listeners.forEach((l) => l());

// Helper getters
export function getLocalStoreData() {
  const getParsed = <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  return {
    menuItems: getParsed<MenuItem[]>(LOCAL_STORAGE_KEYS.MENU, MENU_ITEMS),
    categories: getParsed<Category[]>(LOCAL_STORAGE_KEYS.CATEGORIES, CATEGORIES),
    promoBanner: getParsed<PromoBanner>(LOCAL_STORAGE_KEYS.PROMO_BANNER, DEFAULT_PROMO_BANNER),
    promoCodes: getParsed<PromoCode[]>(LOCAL_STORAGE_KEYS.PROMO_CODES, DEFAULT_PROMO_CODES),
    settings: getParsed<RestaurantSettings>(LOCAL_STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
    orders: getParsed<OrderRecord[]>(LOCAL_STORAGE_KEYS.ORDERS, DEFAULT_ORDERS),
    cateringInquiries: getParsed<CateringInquiryRecord[]>(LOCAL_STORAGE_KEYS.CATERING, DEFAULT_CATERING),
    mediaItems: getParsed<MediaItem[]>(LOCAL_STORAGE_KEYS.MEDIA, DEFAULT_MEDIA),
    adminUser: getParsed<{ email: string } | null>(LOCAL_STORAGE_KEYS.AUTH, null),
  };
}

export function saveLocalStoreData<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage error:', err);
  }
  notifyListeners();
}

// Global Store Hook for React components
export function useAdminStore() {
  const [data, setData] = useState(getLocalStoreData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getLocalStoreData());
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  // Supabase initial sync if configured
  useEffect(() => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (!supabase) return;

      // Fetch latest menu items from Supabase if table exists
      supabase
        .from('menu_items')
        .select('*')
        .then(({ data: dbItems, error }) => {
          if (!error && dbItems && dbItems.length > 0) {
            const formatted: MenuItem[] = dbItems.map((item) => ({
              id: item.id,
              nameEn: item.name_en,
              nameAr: item.name_ar,
              descriptionEn: item.description_en || '',
              descriptionAr: item.description_ar || '',
              price: Number(item.price),
              category: item.category as any,
              image: item.image,
              spiceLevel: item.spice_level || 'MEDIUM',
              isPopular: item.is_popular,
              isSignature: item.is_signature,
              isVegetarian: item.is_vegetarian,
              isSoldOut: item.is_sold_out,
              calories: item.calories,
              prepTimeMinutes: item.prep_time_minutes,
            }));
            saveLocalStoreData(LOCAL_STORAGE_KEYS.MENU, formatted);
          }
        });

      // Fetch restaurant settings from Supabase
      supabase
        .from('restaurant_settings')
        .select('*')
        .eq('id', 1)
        .single()
        .then(({ data: dbSet, error }) => {
          if (!error && dbSet) {
            const updatedSettings: RestaurantSettings = {
              nameEn: dbSet.name_en,
              nameAr: dbSet.name_ar,
              phone: dbSet.phone,
              whatsapp: dbSet.whatsapp,
              addressEn: dbSet.address_en,
              addressAr: dbSet.address_ar,
              districtEn: dbSet.district_en,
              districtAr: dbSet.district_ar,
              googleMapsUrl: dbSet.google_maps_url,
              googleRating: Number(dbSet.google_rating || 4.0),
              googleReviewsCount: Number(dbSet.google_reviews_count || 2126),
              openingHoursEn: dbSet.opening_hours_en,
              openingHoursAr: dbSet.opening_hours_ar,
            };
            saveLocalStoreData(LOCAL_STORAGE_KEYS.SETTINGS, updatedSettings);
          }
        });
    }
  }, []);

  // Actions
  const updateMenuItems = (items: MenuItem[]) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.MENU, items);
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        // Sync to Supabase in background
        const dbPayload = items.map((i) => ({
          id: i.id,
          name_en: i.nameEn,
          name_ar: i.nameAr,
          description_en: i.descriptionEn,
          description_ar: i.descriptionAr,
          price: i.price,
          category: i.category,
          image: i.image,
          spice_level: i.spiceLevel,
          is_popular: i.isPopular || false,
          is_signature: i.isSignature || false,
          is_vegetarian: i.isVegetarian || false,
          is_sold_out: i.isSoldOut || false,
          calories: i.calories,
          prep_time_minutes: i.prepTimeMinutes || 20,
        }));
        supabase.from('menu_items').upsert(dbPayload).then();
      }
    }
  };

  const updateCategories = (cats: Category[]) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.CATEGORIES, cats);
  };

  const updatePromoBanner = (banner: PromoBanner) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.PROMO_BANNER, banner);
  };

  const updatePromoCodes = (codes: PromoCode[]) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.PROMO_CODES, codes);
  };

  const updateSettings = (settings: RestaurantSettings) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.SETTINGS, settings);
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('restaurant_settings')
          .upsert({
            id: 1,
            name_en: settings.nameEn,
            name_ar: settings.nameAr,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            address_en: settings.addressEn,
            address_ar: settings.addressAr,
            district_en: settings.districtEn,
            district_ar: settings.districtAr,
            google_maps_url: settings.googleMapsUrl,
            google_rating: settings.googleRating,
            google_reviews_count: settings.googleReviewsCount,
            opening_hours_en: settings.openingHoursEn,
            opening_hours_ar: settings.openingHoursAr,
          })
          .then();
      }
    }
  };

  const addOrder = (order: OrderRecord) => {
    const current = getLocalStoreData().orders;
    const updated = [order, ...current];
    saveLocalStoreData(LOCAL_STORAGE_KEYS.ORDERS, updated);
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from('orders')
          .insert({
            id: order.id,
            order_ref: order.orderRef,
            customer_name: order.customerName,
            phone: order.phone,
            order_type: order.orderType,
            district: order.district,
            address: order.address,
            payment_method: order.paymentMethod,
            items: order.items,
            subtotal: order.subtotal,
            delivery_fee: order.deliveryFee,
            total: order.total,
            status: order.status,
          })
          .then();
      }
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    const current = getLocalStoreData().orders;
    const updated = current.map((o) => (o.id === orderId ? { ...o, status } : o));
    saveLocalStoreData(LOCAL_STORAGE_KEYS.ORDERS, updated);
  };

  const addCateringInquiry = (inquiry: CateringInquiryRecord) => {
    const current = getLocalStoreData().cateringInquiries;
    const updated = [inquiry, ...current];
    saveLocalStoreData(LOCAL_STORAGE_KEYS.CATERING, updated);
  };

  const updateCateringStatus = (id: string, status: CateringInquiryRecord['status']) => {
    const current = getLocalStoreData().cateringInquiries;
    const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
    saveLocalStoreData(LOCAL_STORAGE_KEYS.CATERING, updated);
  };

  const addMediaItem = (media: MediaItem) => {
    const current = getLocalStoreData().mediaItems;
    const updated = [media, ...current];
    saveLocalStoreData(LOCAL_STORAGE_KEYS.MEDIA, updated);
  };

  const deleteMediaItem = (id: string) => {
    const current = getLocalStoreData().mediaItems;
    const updated = current.filter((m) => m.id !== id);
    saveLocalStoreData(LOCAL_STORAGE_KEYS.MEDIA, updated);
  };

  const loginAdmin = (user: { email: string }) => {
    saveLocalStoreData(LOCAL_STORAGE_KEYS.AUTH, user);
  };

  const logoutAdmin = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH);
    notifyListeners();
  };

  return {
    ...data,
    isAuthenticated: Boolean(data.adminUser),
    updateMenuItems,
    updateCategories,
    updatePromoBanner,
    updatePromoCodes,
    updateSettings,
    addOrder,
    updateOrderStatus,
    addCateringInquiry,
    updateCateringStatus,
    addMediaItem,
    deleteMediaItem,
    loginAdmin,
    logoutAdmin,
  };
}
