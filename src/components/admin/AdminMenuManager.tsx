import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Flame,
  Star,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { MenuItem, CategoryId, SpiceLevel } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminMenuManager: React.FC = () => {
  const { menuItems, categories, mediaItems, updateMenuItems } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Form state for Add/Edit Dish
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    price: 25,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    spiceLevel: 'MEDIUM',
    isPopular: false,
    isSignature: false,
    isVegetarian: false,
    isSoldOut: false,
    calories: 450,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nameAr.includes(searchTerm);
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleSoldOut = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isSoldOut: !item.isSoldOut } : item
    );
    updateMenuItems(updated);
  };

  const handleTogglePopular = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isPopular: !item.isPopular } : item
    );
    updateMenuItems(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      const updated = menuItems.filter((item) => item.id !== id);
      updateMenuItems(updated);
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      id: `dish_${Date.now()}`,
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      price: 25,
      category: 'biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
      spiceLevel: 'MEDIUM',
      isPopular: false,
      isSignature: false,
      isVegetarian: false,
      isSoldOut: false,
      calories: 450,
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setFormData({ ...item });
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn || !formData.nameAr || !formData.price) return;

    if (isCreating) {
      const newItem: MenuItem = {
        id: formData.id || `dish_${Date.now()}`,
        nameEn: formData.nameEn || '',
        nameAr: formData.nameAr || '',
        descriptionEn: formData.descriptionEn || '',
        descriptionAr: formData.descriptionAr || '',
        price: Number(formData.price),
        category: (formData.category || 'biryani') as CategoryId,
        image: formData.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
        spiceLevel: (formData.spiceLevel || 'MEDIUM') as SpiceLevel,
        isPopular: formData.isPopular || false,
        isSignature: formData.isSignature || false,
        isVegetarian: formData.isVegetarian || false,
        isSoldOut: formData.isSoldOut || false,
        calories: formData.calories ? Number(formData.calories) : 450,
      };
      updateMenuItems([newItem, ...menuItems]);
    } else if (editingItem) {
      const updated = menuItems.map((item) =>
        item.id === editingItem.id ? ({ ...item, ...formData } as MenuItem) : item
      );
      updateMenuItems(updated);
    }

    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header Controls */}
      <div className="bg-white border border-[#111111]/15 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-serif text-2xl font-black text-[#111111]">
              Menu Items Management
            </h2>
            <p className="text-xs text-[#111111]/70 font-semibold">
              Add, edit prices (SAR), update English/Arabic names & mark items sold out
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="bg-[#0E5135] hover:bg-[#111111] text-white px-5 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#E98518]" />
            <span>Add New Dish</span>
          </button>
        </div>

        {/* Search & Category Filter bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#111111]/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by English or Arabic dish name..."
              className="w-full bg-[#F6F2E9] border border-[#111111]/20 pl-9 pr-3 py-2.5 text-xs text-[#111111] font-bold outline-none focus:border-[#0E5135]"
            />
          </div>

          <div className="md:col-span-5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 text-xs text-[#111111] font-bold outline-none focus:border-[#0E5135]"
            >
              <option value="all">All Categories ({menuItems.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn} / {cat.nameAr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dishes List Table */}
      <div className="bg-white border border-[#111111]/15 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111111] text-[#F6F2E9] font-black uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Image & Dish</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price (SAR)</th>
              <th className="p-3.5">Spice Level</th>
              <th className="p-3.5">Stock Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#111111]/10 font-bold">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#F6F2E9]/60 transition-colors">
                
                {/* Image & Name */}
                <td className="p-3.5">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.nameEn}
                      className="w-12 h-12 object-cover border border-[#111111]/20 shrink-0"
                    />
                    <div>
                      <div className="font-serif text-sm font-black text-[#111111]">
                        {item.nameEn}
                      </div>
                      <div className="text-[11px] text-[#0E5135] font-black">
                        {item.nameAr}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3.5">
                  <span className="uppercase text-[10px] font-black bg-[#F6F2E9] px-2 py-1 border border-[#111111]/10">
                    {item.category}
                  </span>
                </td>

                {/* Price */}
                <td className="p-3.5">
                  <span className="font-serif text-sm font-black text-[#0E5135]">
                    SAR {item.price}
                  </span>
                </td>

                {/* Spice Level */}
                <td className="p-3.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E98518] flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>{item.spiceLevel}</span>
                  </span>
                </td>

                {/* Stock Status */}
                <td className="p-3.5">
                  <button
                    onClick={() => handleToggleSoldOut(item.id)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider border transition-all ${
                      item.isSoldOut
                        ? 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {item.isSoldOut ? '❌ Sold Out' : '✅ In Stock'}
                  </button>
                </td>

                {/* Actions */}
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleTogglePopular(item.id)}
                      title="Toggle Popular Badge"
                      className={`p-1.5 border ${
                        item.isPopular
                          ? 'bg-[#E98518] text-white border-[#E98518]'
                          : 'bg-white text-[#111111]/50 border-[#111111]/20'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 bg-white border border-[#111111]/20 hover:bg-[#111111] hover:text-white transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-xs font-bold text-[#111111]/60">
            No dishes found matching your search term.
          </div>
        )}
      </div>

      {/* Add / Edit Dish Modal */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#111111]">
          <div className="bg-white border border-[#111111]/20 shadow-2xl w-full max-w-2xl overflow-hidden p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="absolute top-4 right-4 text-[#111111] hover:bg-[#111111] hover:text-white p-1 border border-[#111111]/20"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl font-black text-[#111111] mb-4">
              {isCreating ? 'Create New Dish' : `Edit Dish: ${editingItem?.nameEn}`}
            </h3>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs font-bold">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn || ''}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="e.g. Special Mutton Nihari"
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    Arabic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr || ''}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    placeholder="مثال: نهاري غنم خاص"
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 text-right outline-none focus:border-[#0E5135]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    English Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionEn || ''}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    Arabic Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionAr || ''}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 text-right outline-none focus:border-[#0E5135]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    Price (SAR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'biryani'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                    Spice Level *
                  </label>
                  <select
                    value={formData.spiceLevel || 'MEDIUM'}
                    onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value as SpiceLevel })}
                    className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  >
                    <option value="MILD">MILD</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="KARACHI">KARACHI</option>
                    <option value="EXTRA HOT">EXTRA HOT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[#111111] uppercase tracking-wider">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(!showMediaPicker)}
                    className="bg-[#111111] text-white px-3 py-2 text-xs flex items-center gap-1"
                  >
                    <ImageIcon className="w-4 h-4 text-[#E98518]" />
                    <span>Pick</span>
                  </button>
                </div>

                {/* Media Picker dropdown */}
                {showMediaPicker && (
                  <div className="mt-2 p-3 bg-[#F6F2E9] border border-[#111111]/20 grid grid-cols-4 gap-2 max-h-36 overflow-y-auto">
                    {mediaItems.map((m) => (
                      <img
                        key={m.id}
                        src={m.url}
                        alt={m.name}
                        onClick={() => {
                          setFormData({ ...formData, image: m.url });
                          setShowMediaPicker(false);
                        }}
                        className="w-full h-16 object-cover cursor-pointer border border-[#111111]/20 hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Checkbox options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular || false}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  />
                  <span>Popular Item</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSignature || false}
                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                  />
                  <span>Signature Dish</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVegetarian || false}
                    onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer text-red-700 font-black">
                  <input
                    type="checkbox"
                    checked={formData.isSoldOut || false}
                    onChange={(e) => setFormData({ ...formData, isSoldOut: e.target.checked })}
                  />
                  <span>Mark Sold Out</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-[#111111]/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                  className="px-5 py-2.5 bg-white border border-[#111111]/20 text-[#111111]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E5135] text-white font-black uppercase tracking-wider"
                >
                  Save Dish
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
