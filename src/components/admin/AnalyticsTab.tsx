"use client";
import { useAppStore } from "@/lib/store";
import { TrendingUp, Package, CheckCircle, Clock, DollarSign } from "lucide-react";

export default function AnalyticsTab() {
  const orders = useAppStore((s) => s.orders);
  const products = useAppStore((s) => s.products);

  const delivered = orders.filter((o) => o.status === "delivered");
  const confirmed = orders.filter((o) => o.status === "confirmed");
  const totalRevenue = delivered.reduce((acc, o) => acc + o.total, 0);
  const pendingRevenue = confirmed.reduce((acc, o) => acc + o.total, 0);
  const totalPhonesSold = delivered.reduce(
    (acc, o) => acc + o.items.reduce((a, i) => a + i.quantity, 0),
    0
  );

  // Best selling products
  const productSales: Record<string, { name: string; count: number; revenue: number }> = {};
  delivered.forEach((o) => {
    o.items.forEach((item) => {
      if (!productSales[item.product.id]) {
        productSales[item.product.id] = { name: item.product.name, count: 0, revenue: 0 };
      }
      productSales[item.product.id].count += item.quantity;
      productSales[item.product.id].revenue += item.product.price * item.quantity;
    });
  });
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const stats = [
    {
      label: "Total Revenue",
      value: `${totalRevenue.toLocaleString()} SAR`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Phones Sold",
      value: totalPhonesSold.toString(),
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/8",
    },
    {
      label: "Delivered Orders",
      value: delivered.length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending Orders",
      value: confirmed.length.toString(),
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Revenue",
      value: `${pendingRevenue.toLocaleString()} SAR`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Total Products",
      value: products.length.toString(),
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-2xl font-black text-dark">{s.value}</p>
            <p className="text-dark/40 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-dark text-sm">Best Selling Products</h3>
        </div>
        {topProducts.length === 0 ? (
          <div className="py-12 text-center text-dark/30">
            <TrendingUp size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No sales data yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-dark/20 w-6">#{i + 1}</span>
                  <div>
                    <p className="font-semibold text-dark text-sm">{p.name}</p>
                    <p className="text-dark/40 text-xs">{p.count} unit{p.count !== 1 ? "s" : ""} sold</p>
                  </div>
                </div>
                <p className="font-black text-dark">{p.revenue.toLocaleString()} SAR</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      {orders.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-dark text-sm">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-semibold text-dark text-sm">{o.id}</p>
                  <p className="text-dark/40 text-xs">{o.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark text-sm">{o.total.toLocaleString()} SAR</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    o.status === "delivered"
                      ? "bg-green-100 text-green-600"
                      : o.status === "confirmed"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
