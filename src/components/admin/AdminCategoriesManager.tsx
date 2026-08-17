import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import { Category, CategoryId } from '../../types';
import { useAdminStore } from '../../lib/adminStore';

export const AdminCategoriesManager: React.FC = () => {
  const { categories, updateCategories } = useAdminStore();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Category>({
    id: 'custom_cat',
    nameEn: '',
    nameAr: '',
    iconName: 'Utensils',
    taglineEn: '',
    taglineAr: '',
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `cat_${Date.now()}` as CategoryId,
      nameEn: '',
      nameAr: '',
      iconName: 'Utensils',
      taglineEn: '',
      taglineAr: '',
    });
    setIsCreating(true);
    setEditingCategory(null);
  };

  const handleOpenEdit = (cat: Category) => {
    setFormData({ ...cat });
    setEditingCategory(cat);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this category? Dishes in this category will remain available.')) {
      const updated = categories.filter((c) => c.id !== id);
      updateCategories(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn || !formData.nameAr) return;

    if (isCreating) {
      updateCategories([...categories, formData]);
    } else if (editingCategory) {
      const updated = categories.map((c) => (c.id === editingCategory.id ? formData : c));
      updateCategories(updated);
    }

    setIsCreating(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header */}
      <div className="bg-white border border-[#111111]/15 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Menu Category Management
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Customize category titles & taglines for English & Arabic navigation
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#0E5135] hover:bg-[#111111] text-white px-5 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#E98518]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-[#111111]/15 p-5 flex flex-col justify-between shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#F6F2E9] border border-[#111111]/10">
                  <Layers className="w-4 h-4 text-[#0E5135]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-black text-[#111111]">
                    {cat.nameEn}
                  </h3>
                  <span className="text-xs text-[#0E5135] font-black">
                    {cat.nameAr}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold bg-[#F6F2E9] px-2 py-0.5 border border-[#111111]/10 uppercase">
                {cat.id}
              </span>
            </div>

            {cat.taglineEn && (
              <p className="text-xs text-[#111111]/70 font-semibold italic border-t border-[#111111]/10 pt-2">
                "{cat.taglineEn}"
              </p>
            )}

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#111111]/10">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 bg-white border border-[#111111]/20 hover:bg-[#111111] hover:text-white transition-colors"
                title="Edit Category"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 bg-white border border-red-300 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Category */}
      {(isCreating || editingCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#111111]">
          <div className="bg-white border border-[#111111]/20 shadow-2xl w-full max-w-md overflow-hidden p-6 relative">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingCategory(null);
              }}
              className="absolute top-4 right-4 text-[#111111] hover:bg-[#111111] hover:text-white p-1 border border-[#111111]/20"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl font-black text-[#111111] mb-4">
              {isCreating ? 'Create Category' : `Edit: ${editingCategory?.nameEn}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1">Category Slug / ID *</label>
                <input
                  type="text"
                  required
                  disabled={!isCreating}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value as CategoryId })}
                  className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                />
              </div>

              <div>
                <label className="block mb-1">English Name *</label>
                <input
                  type="text"
                  required
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                />
              </div>

              <div>
                <label className="block mb-1">Arabic Name *</label>
                <input
                  type="text"
                  required
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 text-right outline-none focus:border-[#0E5135]"
                />
              </div>

              <div>
                <label className="block mb-1">English Tagline</label>
                <input
                  type="text"
                  value={formData.taglineEn || ''}
                  onChange={(e) => setFormData({ ...formData, taglineEn: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
                />
              </div>

              <div>
                <label className="block mb-1">Arabic Tagline</label>
                <input
                  type="text"
                  value={formData.taglineAr || ''}
                  onChange={(e) => setFormData({ ...formData, taglineAr: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 text-right outline-none focus:border-[#0E5135]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-[#111111]/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 bg-white border border-[#111111]/20 text-[#111111]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E5135] text-white font-black uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
