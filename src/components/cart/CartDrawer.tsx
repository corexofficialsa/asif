"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import OrderModal from "./OrderModal";
import BrandLogo from "@/components/BrandLogo";

export default function CartDrawer() {
  const cartOpen = useAppStore((s) => s.cartOpen);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cart = useAppStore((s) => s.cart);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const [orderOpen, setOrderOpen] = useState(false);

  const total = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-secondary/30">
                <div className="flex items-center gap-2 font-bold text-dark">
                  <ShoppingBag size={18} className="text-primary" />
                  My Bag
                  {cart.length > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {cart.reduce((a, i) => a + i.quantity, 0)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-xl hover:bg-secondary/30 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center">
                      <ShoppingBag size={28} className="text-primary/50" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark">Your bag is empty</p>
                      <p className="text-dark/40 text-sm mt-1">Add some phones to get started</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 p-4 bg-secondary/10 rounded-2xl"
                          style={{ border: "1px solid rgba(190,233,232,0.4)" }}
                        >
                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg,#f0fafa,#e0f5f5)" }}
                          >
                            <BrandLogo brand={item.product.brand} size={28} className="text-dark/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-dark text-sm truncate">{item.product.name}</p>
                            <p className="text-dark/45 text-xs mt-0.5">
                              {item.product.storage} · {item.product.color}
                            </p>
                            <p className="text-primary font-bold text-sm mt-1">
                              {(item.product.price * item.quantity).toLocaleString()} SAR
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:text-red-500 text-dark/30 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-secondary/60 flex items-center justify-center hover:border-primary transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-bold text-dark w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-secondary/60 flex items-center justify-center hover:border-primary transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-secondary/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-dark/50 text-sm">Total</span>
                    <span className="text-2xl font-black text-dark">
                      {total.toLocaleString()} SAR
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setOrderOpen(true);
                    }}
                    className="btn-primary w-full py-4 rounded-2xl font-bold text-white"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
