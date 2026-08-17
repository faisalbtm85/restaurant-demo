import React, { useState } from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { MediaItem } from '../../types';
import { useAdminStore } from '../../lib/adminStore';
import { isSupabaseConfigured, getSupabase } from '../../lib/supabase';

export const AdminMediaLibrary: React.FC = () => {
  const { mediaItems, addMediaItem, deleteMediaItem } = useAdminStore();
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const item: MediaItem = {
      id: `media_${Date.now()}`,
      name: newName.trim() || 'Food Image',
      url: newUrl.trim(),
      category: 'dish',
      createdAt: new Date().toISOString(),
    };

    addMediaItem(item);
    setNewUrl('');
    setNewName('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      if (supabase) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `dishes/${fileName}`;

        const { error: uploadErr } = await supabase.storage
          .from('restaurant-media')
          .upload(filePath, file);

        if (!uploadErr) {
          const { data } = supabase.storage.from('restaurant-media').getPublicUrl(filePath);
          if (data?.publicUrl) {
            addMediaItem({
              id: `media_${Date.now()}`,
              name: file.name.replace(/\.[^/.]+$/, ''),
              url: data.publicUrl,
              category: 'dish',
              createdAt: new Date().toISOString(),
            });
            setUploading(false);
            return;
          }
        }
      }
    }

    // Local Base64 FileReader fallback
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        addMediaItem({
          id: `media_${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          url: result,
          category: 'dish',
          createdAt: new Date().toISOString(),
        });
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-[#111111]">
      
      {/* Top Header */}
      <div className="bg-white border border-[#111111]/15 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-black text-[#111111]">
            Media & Image Asset Library
          </h2>
          <p className="text-xs text-[#111111]/70 font-semibold">
            Upload dish photography to Supabase Storage or add web image URLs
          </p>
        </div>
      </div>

      {/* Upload Controls */}
      <div className="bg-white border border-[#111111]/15 p-6 space-y-4">
        <h3 className="font-serif text-lg font-black text-[#111111] border-b border-[#111111]/10 pb-2">
          Upload or Import Image Asset
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* File Upload Box */}
          <div className="p-6 bg-[#F6F2E9] border-2 border-dashed border-[#111111]/30 flex flex-col items-center justify-center text-center space-y-3">
            <Upload className="w-8 h-8 text-[#0E5135]" />
            <div>
              <span className="font-serif text-sm font-black block">
                {uploading ? 'Uploading to Storage...' : 'Select File to Upload'}
              </span>
              <span className="text-[11px] text-[#111111]/60 font-semibold">
                Supports JPG, PNG, WebP
              </span>
            </div>
            <label className="bg-[#0E5135] hover:bg-[#111111] text-white px-4 py-2 text-xs font-black uppercase cursor-pointer transition-colors shadow-sm">
              <span>Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Add Image Link Box */}
          <form onSubmit={handleAddByUrl} className="space-y-3 text-xs font-bold">
            <span className="text-[#0E5135] uppercase tracking-wider block">
              Import Direct Image Link / Unsplash URL
            </span>

            <div>
              <label className="block mb-1">Image Name</label>
              <input
                type="text"
                placeholder="e.g. Mutton Deg Biryani Bowl"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
              />
            </div>

            <div>
              <label className="block mb-1">Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full bg-[#F6F2E9] border border-[#111111]/20 p-2.5 outline-none focus:border-[#0E5135]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] text-white p-2.5 font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <LinkIcon className="w-4 h-4 text-[#E98518]" />
              <span>Save Image URL to Library</span>
            </button>
          </form>

        </div>
      </div>

      {/* Media Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#111111]/15 overflow-hidden flex flex-col justify-between shadow-sm group"
          >
            <div className="relative h-36 bg-[#111111] overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3 space-y-2">
              <span className="font-serif text-xs font-black text-[#111111] truncate block">
                {item.name}
              </span>

              <div className="flex items-center justify-between pt-1 border-t border-[#111111]/10">
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="px-2 py-1 bg-[#F6F2E9] hover:bg-[#0E5135] hover:text-white border border-[#111111]/20 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#E98518]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="p-1 text-red-700 hover:bg-red-50 border border-red-200"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
