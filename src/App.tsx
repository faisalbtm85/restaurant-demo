import React, { useState, useEffect } from 'react';
import { Language, MenuItem, CartItem, CartCustomization, SpiceLevel, FeastBundle } from './types';
import { TRANSLATIONS } from './data/restaurantData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChooseKing } from './components/ChooseKing';
import { SignatureDishes } from './components/SignatureDishes';
import { SpiceSelector } from './components/SpiceSelector';
import { MoreThanBiryani } from './components/MoreThanBiryani';
import { DigitalMenu } from './components/DigitalMenu';
import { FeastPackages } from './components/FeastPackages';
import { BrandStory } from './components/BrandStory';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { CateringBanner } from './components/CateringBanner';
import { LocationSection } from './components/LocationSection';
import { CampaignBanner } from './components/CampaignBanner';
import { SocialGrid } from './components/SocialGrid';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { DishCustomizerModal } from './components/DishCustomizerModal';
import { CateringModal } from './components/CateringModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CheckCircle2 } from 'lucide-react';
import { useAdminStore } from './lib/adminStore';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const { isAuthenticated } = useAdminStore();
  const [isAdminView, setIsAdminView] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');
  const [selectedSpicePreference, setSelectedSpicePreference] = useState<SpiceLevel>('MEDIUM');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [cateringModalOpen, setCateringModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check URL Hash for #admin
  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
      setIsAdminView(true);
    }
  }, []);

  // Sync RTL attributes whenever language toggles
  useEffect(() => {
    const root = document.documentElement;
    if (language === 'AR') {
      root.dir = 'rtl';
      root.lang = 'ar';
    } else {
      root.dir = 'ltr';
      root.lang = 'en';
    }
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add Item to Cart handler
  const handleAddToCart = (
    item: MenuItem,
    customization: CartCustomization = { selectedSpice: selectedSpicePreference },
    quantity = 1
  ) => {
    const addOnsTotal = customization.selectedAddOns?.reduce((sum, a) => sum + a.price, 0) || 0;
    const unitPrice = item.price + addOnsTotal;

    const cartItemId = `${item.id}-${customization.selectedSpice || 'std'}-${Date.now()}`;

    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      customization,
      itemTotalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`${language === 'EN' ? item.nameEn : item.nameAr} ${TRANSLATIONS[language].cart.addedSuccess}`);
  };

  // Select Feast Bundle handler
  const handleSelectFeastBundle = (bundle: FeastBundle) => {
    if (typeof bundle.price === 'number') {
      const bundleMenuItem: MenuItem = {
        id: bundle.id,
        nameEn: bundle.titleEn,
        nameAr: bundle.titleAr,
        descriptionEn: bundle.descriptionEn,
        descriptionAr: bundle.descriptionAr,
        price: bundle.price,
        category: 'biryani',
        image: bundle.image,
        spiceLevel: 'MEDIUM',
      };
      handleAddToCart(bundleMenuItem, { selectedSpice: 'MEDIUM' }, 1);
      setCartOpen(true);
    }
  };

  // Update Item Quantity in Cart
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.id === cartItemId) {
          const unitPrice = ci.itemTotalPrice / ci.quantity;
          return {
            ...ci,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartSubtotalPrice = cartItems.reduce((sum, ci) => sum + ci.itemTotalPrice, 0);

  if (isAdminView) {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => {}} />;
    }
    return <AdminLayout onExitAdmin={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F6F2E9] text-[#111111] font-sans relative pt-9">
      {/* BRJ Demo Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#111111] text-[#F6F2E9] py-2 px-4 z-[60] flex flex-row items-center justify-between text-[11px] font-black uppercase tracking-widest border-b border-[#F6F2E9]/20 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>BRJ Group Live Demo</span>
          <a href="https://www.barisrajgroup.com" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block ml-2 text-[#E98518] hover:text-white transition-colors underline decoration-[#E98518]/50 underline-offset-4">Learn More</a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden md:inline-block opacity-70">Want this for your business?</span>
          <a href="https://www.barisrajgroup.com/contact?source=restaurant-demo" target="_blank" rel="noopener noreferrer" className="bg-[#E98518] hover:bg-white hover:text-[#111111] text-white px-3 py-1 transition-colors whitespace-nowrap">
            Talk to BRJ Group
          </a>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0E5135] border border-[#E98518] text-white px-5 py-3 rounded-none shadow-2xl flex items-center space-x-2 rtl:space-x-reverse animate-fade-in text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#E98518]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero language={language} onNavigate={scrollToSection} />

        {/* Section 2: Our Specialties */}
        <ChooseKing
          language={language}
          onSelectCategory={() => {
            scrollToSection('menu');
          }}
        />

        {/* Section 3: Signature Collection */}
        <SignatureDishes
          language={language}
          onAddToCart={(item) => handleAddToCart(item)}
          onCustomize={(item) => setCustomizerItem(item)}
          onViewAllMenu={() => scrollToSection('menu')}
        />

        {/* Section 4: Bento-Style Grid */}
        <SpiceSelector
          language={language}
          selectedSpice={selectedSpicePreference}
          onSelectSpice={(spice) => setSelectedSpicePreference(spice)}
          onOrderSpecial={() => scrollToSection('menu')}
        />

        {/* Section 5: More Than Biryani */}
        <MoreThanBiryani
          language={language}
          onExploreCategory={() => scrollToSection('menu')}
        />

        {/* Section 6: Family Feasts */}
        <FeastPackages
          language={language}
          onSelectBundle={handleSelectFeastBundle}
          onOpenCateringModal={() => setCateringModalOpen(true)}
        />

        {/* Digital Menu Catalog */}
        <DigitalMenu
          language={language}
          onAddToCart={(item) => handleAddToCart(item)}
          onCustomize={(item) => setCustomizerItem(item)}
          selectedSpiceFilter={selectedSpicePreference}
        />

        {/* Limited Special Drop Banner */}
        <CampaignBanner
          language={language}
          onOrderNow={() => scrollToSection('menu')}
        />

        {/* Section 7: Brand Story */}
        <BrandStory language={language} />

        {/* Section 8: Reviews */}
        <ReviewsCarousel language={language} />

        {/* Section 9: Catering & Events Banner */}
        <CateringBanner
          language={language}
          onOpenModal={() => setCateringModalOpen(true)}
        />

        {/* Section 10: Location Section */}
        <LocationSection language={language} />

        {/* Section 11: Social Grid */}
        <SocialGrid language={language} />
      </main>

      {/* Section 12: Footer */}
      <Footer
        language={language}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminView(true)}
      />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav
        language={language}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        language={language}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setCartOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Dish Customizer Modal */}
      <DishCustomizerModal
        item={customizerItem}
        language={language}
        onClose={() => setCustomizerItem(null)}
        onConfirmAdd={(item, customization, qty) => {
          handleAddToCart(item, customization, qty);
        }}
      />

      {/* Catering Inquiry Modal */}
      <CateringModal
        isOpen={cateringModalOpen}
        language={language}
        onClose={() => setCateringModalOpen(false)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        language={language}
        cartItems={cartItems}
        subtotalPrice={cartSubtotalPrice}
        onClose={() => setCheckoutModalOpen(false)}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
