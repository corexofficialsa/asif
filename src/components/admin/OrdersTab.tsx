"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, X, CheckCircle, Clock, Truck, MessageCircle, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Order, OrderStatus } from "@/lib/types";

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "text-blue-600 bg-blue-50", icon: Clock },
  delivered: { label: "Delivered", color: "text-green-600 bg-green-50", icon: CheckCircle },
  pending: { label: "Pending", color: "text-yellow-600 bg-yellow-50", icon: Clock },
};

function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);

  const waLink = `https://wa.me/${order.customer.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hello ${order.customer.name}! Your ASIF order ${order.id} is confirmed. Total: ${order.total.toLocaleString()} SAR. Thank you!`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-dark">{order.id}</h3>
            <p className="text-dark/40 text-xs mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-SA", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Status */}
          <div className="flex items-center justify-between mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusConfig[order.status].color}`}>
              {order.status}
            </span>
            {order.status !== "delivered" && (
              <button
                onClick={() => updateOrderStatus(order.id, "delivered")}
                className="flex items-center gap-2 btn-primary px-4 py-2 rounded-xl text-xs font-bold text-white"
              >
                <CheckCircle size={14} /> Mark Delivered
              </button>
            )}
          </div>

          {/* Customer */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Customer</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-dark/40 text-xs">Name</p>
                <p className="font-semibold text-dark">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-dark/40 text-xs">Phone</p>
                <p className="font-semibold text-dark">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-dark/40 text-xs">Email</p>
                <p className="font-semibold text-dark text-xs">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-dark/40 text-xs">Method</p>
                <p className="font-semibold text-dark capitalize">{order.customer.deliveryMethod}</p>
              </div>
              {order.customer.deliveryMethod === "delivery" && (
                <div className="col-span-2">
                  <p className="text-dark/40 text-xs">Address</p>
                  <p className="font-semibold text-dark">{order.customer.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="mb-4">
            <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Items</p>
            {order.items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-dark">{item.product.name}</p>
                  <p className="text-xs text-dark/40">{item.product.storage} · {item.product.color}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-dark">{(item.product.price * item.quantity).toLocaleString()} SAR</p>
                  <p className="text-xs text-dark/40">×{item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="font-bold text-dark">Total</span>
              <span className="font-black text-primary text-lg">{order.total.toLocaleString()} SAR</span>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors"
          >
            <MessageCircle size={18} />
            Message on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OrdersTab() {
  const orders = useAppStore((s) => s.orders);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "confirmed", "delivered", "pending"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === s ? "bg-primary text-white" : "bg-gray-100 text-dark/50 hover:bg-gray-200"
            }`}
          >
            {s === "all" ? "All Orders" : s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== "all" && (
              <span className="ml-1.5">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-dark/30">
          <Package size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-semibold">No orders yet</p>
          <p className="text-sm mt-1">Orders will appear here after customers confirm</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => {
            const cfg = statusConfig[order.status];
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelected(order)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Package size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">{order.id}</p>
                    <p className="text-dark/40 text-xs">{order.customer.name} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-dark text-sm">{order.total.toLocaleString()} SAR</p>
                    <p className="text-dark/30 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-SA")}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <ChevronRight size={16} className="text-dark/30" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selected && <OrderDetail order={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
