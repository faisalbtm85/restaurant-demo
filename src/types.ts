export type Language = 'EN' | 'AR';

export type SpiceLevel = 'MILD' | 'MEDIUM' | 'KARACHI' | 'EXTRA HOT';

export type CategoryId = 'all' | 'biryani' | 'nihari' | 'bbq' | 'karahi' | 'starters' | 'bread' | 'drinks' | 'desserts';

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number; // in SAR
  category: CategoryId;
  image: string;
  spiceLevel: SpiceLevel;
  isPopular?: boolean;
  isSignature?: boolean;
  isVegetarian?: boolean;
  isSoldOut?: boolean;
  prepTimeMinutes?: number;
  calories?: number;
  allergens?: string[];
  options?: {
    portion?: string[];
    addOns?: { nameEn: string; nameAr: string; price: number }[];
  };
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  active: boolean;
  minOrderSar?: number;
}

export interface PromoBanner {
  id: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  originalPrice: number;
  dealPrice: number;
  hoursRemaining: number;
  image: string;
  active: boolean;
}

export interface RestaurantSettings {
  nameEn: string;
  nameAr: string;
  phone: string;
  whatsapp: string;
  addressEn: string;
  addressAr: string;
  districtEn: string;
  districtAr: string;
  googleMapsUrl: string;
  googleRating: number;
  googleReviewsCount: number;
  openingHoursEn: string;
  openingHoursAr: string;
}

export interface OrderRecord {
  id: string;
  orderRef: string;
  customerName: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  district?: string;
  address?: string;
  paymentMethod: string;
  items: {
    name: string;
    quantity: number;
    spice?: string;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CateringInquiryRecord {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  guestsCount: string;
  date: string;
  message: string;
  preferredContact: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Archived';
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: string;
}

export interface CartCustomization {
  selectedSpice?: SpiceLevel;
  selectedAddOns?: { nameEn: string; nameAr: string; price: number }[];
  portion?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart item id (includes item.id + timestamp or hash)
  menuItem: MenuItem;
  quantity: number;
  customization: CartCustomization;
  itemTotalPrice: number;
}

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameAr: string;
  iconName: string;
  taglineEn?: string;
  taglineAr?: string;
}

export interface FeastBundle {
  id: string;
  titleEn: string;
  titleAr: string;
  servesEn: string;
  servesAr: string;
  price: number | 'QUOTE';
  descriptionEn: string;
  descriptionAr: string;
  itemsEn: string[];
  itemsAr: string[];
  image: string;
  badgeEn?: string;
  badgeAr?: string;
  highlight?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  commentEn: string;
  commentAr: string;
  dishesOrdered?: string[];
  avatar?: string;
}

export interface CateringFormData {
  name: string;
  phone: string;
  eventType: string;
  guestsCount: string;
  date: string;
  message: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
}
