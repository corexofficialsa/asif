"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Check, Link2, Upload, ImagePlus } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Brand, Condition, Product } from "@/lib/types";
import PhoneMockup from "@/components/PhoneMockup";

const BRANDS: Brand[] = ["Apple", "Samsung", "Google", "Other"];
const CONDITIONS: Condition[] = ["New", "Used"];
const STORAGES = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const COLORS = [
  "Natural Titanium", "Black Titanium", "White Titanium", "Desert Titanium",
  "Titanium Gray", "Titanium Black", "Titanium Blue", "Titanium Green",
  "Midnight", "Starlight", "Pink", "Yellow", "Green", "Blue", "Purple",
  "Obsidian", "Porcelain", "Hazel", "Rose Quartz", "Coral", "Black", "White", "Silver", "Gold",
];

const emptyForm = {
  name: "",
  brand: "Apple" as Brand,
  model: "",
  storage: "128GB",
  color: "Black",
  condition: "New" as Condition,
  price: "",
  image: "",
  description: "",
};

export default function StockTab() {
  const products = useAppStore((s) => s.products);
  const addProduct = useAppStore((s) => s.addProduct);
  const removeProduct = useAppStore((s) => s.removeProduct);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [imgTab, setImgTab] = useState<"upload" | "url">("upload");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "image") setImgError(false);
  };

  // Convert file to base64 data URL and store in form
  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setForm((f) => ({ ...f, image: result }));
      setImgError(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const handleAdd = () => {
    if (!form.name || !form.model || !form.price) return;
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: form.name,
      brand: form.brand,
      model: form.model,
      storage: form.storage,
      color: form.color,
      condition: form.condition,
      price: Number(form.price),
      image: form.image,
      description: form.description,
      inStock: true,
      createdAt: new Date().toISOString(),
    };
    addProduct(product);
    setForm(emptyForm);
    setImgError(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 1800);
  };

  const brandMap: Record<string, "Apple" | "Samsung" | "Google"> = {
    Apple: "Apple", Samsung: "Samsung", Google: "Google",
  };

  const clearImage = () => {
    setForm((f) => ({ ...f, image: "" }));
    setImgError(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-dark/50">{products.length} products in stock</p>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => (
          <motion.div
            key={p.id}
            layout
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.name} className="w-12 h-12 object-contain rounded-xl bg-gray-50 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-dark text-sm truncate">{p.name}</p>
                <p className="text-dark/40 text-xs mt-0.5">{p.storage} · {p.color}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.condition === "New" ? "bg-primary/10 text-primary" : "bg-secondary text-dark"}`}>
                    {p.condition}
                  </span>
                  <span className="text-xs text-dark/40">{p.brand}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-black text-dark">{p.price.toLocaleString()} SAR</p>
                <button
                  onClick={() => setConfirmDelete(p.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-dark/30 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Add product modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <h3 className="font-bold text-dark text-lg">Add New Product</h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <Check size={56} className="text-green-500 mb-4" />
                    </motion.div>
                    <p className="font-bold text-dark text-lg">Product Added!</p>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col gap-5">

                    {/* ── IMAGE SECTION ── */}
                    <div>
                      <label className="text-xs font-bold text-dark/50 uppercase tracking-wider mb-3 block">
                        Product Image
                      </label>

                      {/* Tab switcher */}
                      <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-3">
                        <button
                          onClick={() => setImgTab("upload")}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            imgTab === "upload"
                              ? "bg-white text-primary shadow-sm"
                              : "text-dark/40 hover:text-dark/60"
                          }`}
                        >
                          <Upload size={13} /> Upload / Drag
                        </button>
                        <button
                          onClick={() => setImgTab("url")}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            imgTab === "url"
                              ? "bg-white text-primary shadow-sm"
                              : "text-dark/40 hover:text-dark/60"
                          }`}
                        >
                          <Link2 size={13} /> Paste URL
                        </button>
                      </div>

                      {/* Preview + upload zone */}
                      {form.image && !imgError ? (
                        /* Image preview */
                        <div className="relative rounded-2xl overflow-hidden border border-secondary/40 bg-gray-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.image}
                            alt="preview"
                            className="w-full h-44 object-contain"
                            onError={() => setImgError(true)}
                          />
                          <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-xl shadow-sm transition-colors"
                          >
                            <X size={14} className="text-dark/60" />
                          </button>
                        </div>
                      ) : imgTab === "upload" ? (
                        /* Drag & drop / file picker zone */
                        <div
                          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={onDrop}
                          onClick={() => fileRef.current?.click()}
                          className={`relative w-full h-44 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                            dragging
                              ? "border-2 border-primary bg-primary/5 scale-[1.01]"
                              : "border-2 border-dashed border-secondary/60 hover:border-primary/60 hover:bg-primary/3 bg-gray-50/50"
                          }`}
                        >
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            className="hidden"
                          />
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${dragging ? "bg-primary/15" : "bg-primary/8"}`}>
                            <ImagePlus size={22} className="text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-dark/70">
                              {dragging ? "Drop to upload" : "Drag photo here"}
                            </p>
                            <p className="text-xs text-dark/35 mt-0.5">
                              or <span className="text-primary font-semibold underline">browse from device</span>
                            </p>
                          </div>
                          <p className="text-xs text-dark/25">JPG, PNG, WEBP</p>
                        </div>
                      ) : (
                        /* URL input */
                        <div>
                          <div className="relative">
                            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
                            <input
                              type="url"
                              value={form.image}
                              onChange={(e) => set("image", e.target.value)}
                              placeholder="https://example.com/phone.jpg"
                              className="input-glass w-full pl-9 pr-4 py-3 text-sm text-dark"
                            />
                          </div>
                          {imgError && (
                            <p className="text-red-400 text-xs mt-1.5">Could not load image from this URL</p>
                          )}
                          <p className="text-xs text-dark/30 mt-1.5">
                            Upload to imgbb.com and paste the Direct Link here
                          </p>
                          {/* Invisible preview trigger for URL */}
                          {form.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={form.image}
                              alt=""
                              className="hidden"
                              onLoad={() => setImgError(false)}
                              onError={() => setImgError(true)}
                            />
                          )}
                        </div>
                      )}

                      {/* Phone mockup placeholder when no image & url tab empty */}
                      {imgTab === "url" && !form.image && (
                        <div
                          className="mt-3 w-full h-28 rounded-2xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,#f0fafa,#e0f5f5)" }}
                        >
                          <div className="opacity-40 scale-75">
                            <PhoneMockup brand={brandMap[form.brand] || "Apple"} size={110} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* ── Product details ── */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Product Name</label>
                        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="iPhone 17 Pro Max" className="input-glass w-full px-3 py-2.5 text-sm text-dark" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Brand</label>
                        <select value={form.brand} onChange={(e) => set("brand", e.target.value)} className="input-glass w-full px-3 py-2.5 text-sm text-dark appearance-none">
                          {BRANDS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Model</label>
                        <input type="text" value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="iPhone 17 Pro Max" className="input-glass w-full px-3 py-2.5 text-sm text-dark" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Storage</label>
                        <select value={form.storage} onChange={(e) => set("storage", e.target.value)} className="input-glass w-full px-3 py-2.5 text-sm text-dark appearance-none">
                          {STORAGES.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Color</label>
                        <input
                          type="text"
                          value={form.color}
                          onChange={(e) => set("color", e.target.value)}
                          placeholder="e.g. Black Titanium"
                          list="color-options"
                          className="input-glass w-full px-3 py-2.5 text-sm text-dark"
                        />
                        <datalist id="color-options">
                          {COLORS.map((c) => <option key={c} value={c} />)}
                        </datalist>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Condition</label>
                        <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className="input-glass w-full px-3 py-2.5 text-sm text-dark appearance-none">
                          {CONDITIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Price (SAR)</label>
                        <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="5499" className="input-glass w-full px-3 py-2.5 text-sm text-dark" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Description</label>
                        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="Short description..." className="input-glass w-full px-3 py-2.5 text-sm text-dark resize-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!success && (
                <div className="px-6 py-5 border-t border-gray-100 shrink-0">
                  <button
                    onClick={handleAdd}
                    disabled={!form.name || !form.model || !form.price}
                    className="btn-primary w-full py-3.5 rounded-2xl font-bold text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Add to Stock
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 size={36} className="text-red-400 mx-auto mb-4" />
              <h3 className="font-bold text-dark mb-2">Remove Product?</h3>
              <p className="text-dark/50 text-sm mb-6">This will remove the product from your store.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-2xl border border-gray-200 text-dark font-semibold text-sm">
                  Cancel
                </button>
                <button
                  onClick={() => { removeProduct(confirmDelete); setConfirmDelete(null); }}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
