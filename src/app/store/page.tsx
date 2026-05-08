"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import ProductCard from "@/components/store/ProductCard";
import StoreFilters, { Filters } from "@/components/store/StoreFilters";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";

const BRANDS = ["Apple", "Samsung", "Google", "Other"];

export default function StorePage() {
  const products = useAppStore((s) => s.products);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({
    brand: [],
    storage: [],
    color: [],
    condition: [],
    maxPrice: 8000,
  });

  const storages = useMemo(() => [...new Set(products.map((p) => p.storage))].sort(), [products]);
  const colors = useMemo(() => [...new Set(products.map((p) => p.color))].sort(), [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.model.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
      if (filters.storage.length && !filters.storage.includes(p.storage)) return false;
      if (filters.color.length && !filters.color.includes(p.color)) return false;
      if (filters.condition.length && !filters.condition.includes(p.condition)) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
  }, [products, search, filters]);

  const byBrand = useMemo(() => {
    const brands = [...new Set(filtered.map((p) => p.brand))];
    return brands.map((brand) => ({
      brand,
      items: filtered.filter((p) => p.brand === brand),
    }));
  }, [filtered]);

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Hero bar */}
      <div
        className="pt-28 pb-14 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1b2a3b 100%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-black text-white relative z-10"
        >
          Our <span className="gradient-text">Store</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/45 mt-3 relative z-10"
        >
          {products.length} phones available — new & used
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative max-w-md mx-auto mt-8 z-10"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search phones..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm text-white placeholder:text-white/30 outline-none"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <StoreFilters
            filters={filters}
            onChange={setFilters}
            brands={BRANDS}
            storages={storages}
            colors={colors}
          />

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-bold text-dark">No phones found</p>
                <p className="text-dark/40 text-sm mt-1">Try adjusting your filters or search</p>
              </div>
            ) : (
              <AnimatePresence>
                {byBrand.map(({ brand, items }) => (
                  <motion.section
                    key={brand}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <BrandLogo brand={brand} size={24} className="text-dark/70" />
                        <h2 className="text-xl font-black text-dark">{brand}</h2>
                      </div>
                      <div className="flex-1 h-px bg-secondary/50" />
                      <span className="text-sm text-dark/35 font-medium">{items.length} phone{items.length !== 1 ? "s" : ""}</span>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                      <AnimatePresence>
                        {items.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
