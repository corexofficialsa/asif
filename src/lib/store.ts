"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Order, OrderStatus, Product } from "./types";
import { initialProducts } from "./data";

interface AppState {
  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;

  // Admin
  isAdminLoggedIn: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartOpen: false,
      orders: [],
      products: initialProducts,
      isAdminLoggedIn: false,

      addToCart: (product) => {
        const existing = get().cart.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...get().cart, { product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((i) => i.product.id !== productId) }),

      updateQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((i) =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      setCartOpen: (open) => set({ cartOpen: open }),

      addOrder: (order) => set({ orders: [order, ...get().orders] }),

      updateOrderStatus: (orderId, status) =>
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }),

      addProduct: (product) =>
        set({ products: [product, ...get().products] }),

      removeProduct: (productId) =>
        set({ products: get().products.filter((p) => p.id !== productId) }),

      updateProduct: (product) =>
        set({
          products: get().products.map((p) =>
            p.id === product.id ? product : p
          ),
        }),

      adminLogin: (username, password) => {
        if (username === "Asif_Balad" && password === "Asifbalad3223!") {
          set({ isAdminLoggedIn: true });
          return true;
        }
        return false;
      },

      adminLogout: () => set({ isAdminLoggedIn: false }),
    }),
    {
      name: "asif-store-data",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        products: state.products,
      }),
    }
  )
);
