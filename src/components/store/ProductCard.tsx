"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import PhoneMockup from "@/components/PhoneMockup";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAppStore((s) => s.addToCart);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setTimeout(() => setCartOpen(true), 200);
  };

  const brandMap: Record<string, "Apple" | "Samsung" | "Google"> = {
    Apple: "Apple",
    Samsung: "Samsung",
    Google: "Google",
  };

  const phoneBrand = brandMap[product.brand] || "Apple";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-400"
      style={{ border: "1px solid rgba(190,233,232,0.5)" }}
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center py-5 sm:py-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fafa 0%, #e0f5f5 100%)" }}
      >
        {/* Glow */}
        <div className="absolute w-32 h-32 bg-primary/15 rounded-full blur-2xl" />

        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 h-32 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="relative z-10 group-hover:scale-105 transition-transform duration-500">
            <PhoneMockup brand={phoneBrand} size={120} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              product.condition === "New"
                ? "bg-primary text-white"
                : "bg-secondary text-dark"
            }`}
          >
            {product.condition}
          </span>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-t-3xl">
            <span className="text-dark/50 font-semibold text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-5">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="font-bold text-dark text-xs sm:text-sm leading-tight">{product.name}</h3>
          <span className="text-[10px] sm:text-xs text-dark/40 shrink-0 mt-0.5 hidden sm:block">{product.brand}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          <span className="text-[10px] sm:text-xs bg-secondary/40 text-dark/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium">
            {product.storage}
          </span>
          <span className="text-[10px] sm:text-xs bg-secondary/40 text-dark/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium hidden sm:inline-flex">
            {product.color}
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-lg sm:text-2xl font-black text-dark">{product.price.toLocaleString()}</span>
            <span className="text-dark/40 text-xs sm:text-sm ml-1">SAR</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-green-500 text-white"
                : product.inStock
                ? "btn-primary text-white"
                : "bg-dark/8 text-dark/30 cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <Check size={13} /> <span className="hidden sm:inline">Added</span><span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} /> <span className="hidden sm:inline">Add to Bag</span><span className="sm:hidden">Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
