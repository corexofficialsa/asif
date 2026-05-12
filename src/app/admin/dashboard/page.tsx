"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, BarChart3, LogOut, Menu, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import OrdersTab from "@/components/admin/OrdersTab";
import StockTab from "@/components/admin/StockTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";

type Tab = "orders" | "stock" | "analytics";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: Package },
  { id: "stock", label: "Stock", icon: LayoutDashboard },
];

export default function DashboardPage() {
  const router = useRouter();
  const isLoggedIn = useAppStore((s) => s.isAdminLoggedIn);
  const adminLogout = useAppStore((s) => s.adminLogout);
  const orders = useAppStore((s) => s.orders);
  const [activeTab, setActiveTab] = useState<Tab>("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/admin");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const pendingCount = orders.filter((o) => o.status === "confirmed").length;

  const handleLogout = () => {
    adminLogout();
    router.replace("/admin");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/8">
        <Image src="/ab-logo.png" alt="ASIF" width={44} height={44} style={{ objectFit: "contain" }} />
        <p className="text-white/30 text-xs mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold mb-1 transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <tab.icon size={17} />
            {tab.label}
            {tab.id === "orders" && pendingCount > 0 && (
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-primary text-white"
              }`}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f7fa" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col shrink-0" style={{ background: "#0d1b2a" }}>
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-60 z-50 lg:hidden flex flex-col"
            style={{ background: "#0d1b2a" }}
          >
            <Sidebar />
          </motion.aside>
        </>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-black text-dark text-lg">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-dark/35 text-xs">ASIF Store Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-dark/40 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "stock" && <StockTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
