"use client";
import { motion } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export interface Filters {
  brand: string[];
  storage: string[];
  color: string[];
  condition: string[];
  maxPrice: number;
}

interface StoreFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  brands: string[];
  storages: string[];
  colors: string[];
}

const PRICE_MAX = 8000;

export default function StoreFilters({
  filters,
  onChange,
  brands,
  storages,
  colors,
}: StoreFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (key: keyof Omit<Filters, "maxPrice">, val: string) => {
    const arr = filters[key];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ ...filters, [key]: next });
  };

  const hasActive =
    filters.brand.length ||
    filters.storage.length ||
    filters.color.length ||
    filters.condition.length ||
    filters.maxPrice < PRICE_MAX;

  const reset = () =>
    onChange({ brand: [], storage: [], color: [], condition: [], maxPrice: PRICE_MAX });

  function FilterGroup({ title, items, filterKey }: { title: string; items: string[]; filterKey: keyof Omit<Filters, "maxPrice"> }) {
    return (
      <div className="mb-6">
        <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => toggle(filterKey, item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                filters[filterKey].includes(item)
                  ? "bg-primary text-white border-primary"
                  : "border-secondary/60 text-dark/50 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const panelContent = (
    <div className="p-5">
      {hasActive && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-primary font-semibold mb-5 hover:underline"
        >
          <X size={13} /> Clear all filters
        </button>
      )}

      <FilterGroup title="Brand" items={brands} filterKey="brand" />
      <FilterGroup title="Storage" items={storages} filterKey="storage" />
      <FilterGroup title="Color" items={colors} filterKey="color" />
      <FilterGroup
        title="Condition"
        items={["New", "Used"]}
        filterKey="condition"
      />

      <div className="mb-6">
        <h4 className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">
          Max Price: {filters.maxPrice.toLocaleString()} SAR
        </h4>
        <input
          type="range"
          min={500}
          max={PRICE_MAX}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-dark/30 mt-1">
          <span>500 SAR</span>
          <span>{PRICE_MAX.toLocaleString()} SAR</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-5">
        <button
          onClick={() => setMobileOpen(true)}
          className={`glass-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${hasActive ? "text-primary" : "text-dark"}`}
        >
          <SlidersHorizontal size={15} />
          Filters {hasActive ? `(active)` : ""}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-secondary/30">
              <span className="font-bold text-dark">Filters</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={18} className="text-dark/50" />
              </button>
            </div>
            {panelContent}
          </motion.div>
        </motion.div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl shadow-sm" style={{ border: "1px solid rgba(190,233,232,0.5)" }}>
          <div className="p-5 border-b border-secondary/30">
            <span className="font-bold text-dark text-sm flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-primary" /> Filters
            </span>
          </div>
          {panelContent}
        </div>
      </div>
    </>
  );
}
