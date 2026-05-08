"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Store, Truck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CustomerInfo, Order } from "@/lib/types";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

const empty: CustomerInfo = {
  name: "",
  email: "",
  phone: "",
  address: "",
  deliveryMethod: "delivery",
};

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const cart = useAppStore((s) => s.cart);
  const clearCart = useAppStore((s) => s.clearCart);
  const addOrder = useAppStore((s) => s.addOrder);
  const [form, setForm] = useState<CustomerInfo>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const total = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const setField = (k: keyof CustomerInfo, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length < 9) e.phone = "Valid phone required";
    if (form.deliveryMethod === "delivery" && !form.address.trim()) e.address = "Address required for delivery";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      customer: form,
      status: "confirmed",
      total,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm(empty);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary/30 shrink-0">
              <h2 className="font-bold text-dark">
                {submitted ? "Order Confirmed!" : "Complete Your Order"}
              </h2>
              <button onClick={handleClose} className="p-2 rounded-xl hover:bg-secondary/30">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle size={64} className="text-primary mb-5" />
                  </motion.div>
                  <h3 className="text-xl font-black text-dark mb-2">Thank you!</h3>
                  <p className="text-dark/50 text-sm leading-relaxed">
                    Your order has been received. Our team will contact you shortly to confirm.
                  </p>
                  <button
                    onClick={handleClose}
                    className="btn-primary mt-8 px-8 py-3.5 rounded-2xl font-bold text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  {/* Order summary */}
                  <div className="bg-secondary/15 rounded-2xl p-4 mb-6">
                    <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Order Summary</p>
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm py-1">
                        <span className="text-dark/70 truncate mr-4">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-semibold text-dark shrink-0">
                          {(item.product.price * item.quantity).toLocaleString()} SAR
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-secondary/40 mt-3 pt-3 flex justify-between">
                      <span className="font-bold text-dark text-sm">Total</span>
                      <span className="font-black text-primary">{total.toLocaleString()} SAR</span>
                    </div>
                  </div>

                  {/* Form — inputs are inlined directly, NOT as sub-components */}
                  <div className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-semibold text-dark/60 mb-1.5 block">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Mohammed Al-..."
                        className={`input-glass w-full px-4 py-3 text-sm text-dark ${errors.name ? "border-red-400" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold text-dark/60 mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@example.com"
                        className={`input-glass w-full px-4 py-3 text-sm text-dark ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-semibold text-dark/60 mb-1.5 block">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        className={`input-glass w-full px-4 py-3 text-sm text-dark ${errors.phone ? "border-red-400" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Delivery method */}
                    <div>
                      <label className="text-xs font-semibold text-dark/60 mb-2 block">Delivery Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "delivery", label: "Delivery", icon: Truck },
                          { value: "pickup", label: "Shop Pickup", icon: Store },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setField("deliveryMethod", opt.value)}
                            className={`flex items-center gap-2 p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                              form.deliveryMethod === opt.value
                                ? "border-primary bg-primary/8 text-primary"
                                : "border-secondary/50 text-dark/50 hover:border-primary/40"
                            }`}
                          >
                            <opt.icon size={16} />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Address (delivery only) */}
                    {form.deliveryMethod === "delivery" && (
                      <div>
                        <label className="text-xs font-semibold text-dark/60 mb-1.5 block">Delivery Address</label>
                        <input
                          type="text"
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          placeholder="Full address, city..."
                          className={`input-glass w-full px-4 py-3 text-sm text-dark ${errors.address ? "border-red-400" : ""}`}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="p-6 border-t border-secondary/30 shrink-0">
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full py-4 rounded-2xl font-bold text-white text-sm"
                >
                  Confirm Order — {total.toLocaleString()} SAR
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
