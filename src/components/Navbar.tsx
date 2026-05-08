"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cart = useAppStore((s) => s.cart);
  const setCartOpen = useAppStore((s) => s.setCartOpen);

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isDark = !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(190,233,232,0.3)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(98,182,203,0.08)" : "none",
        }}
      >
        <div className="flex items-center px-6 sm:px-10 py-5 relative">
          {/* Logo — far left */}
          <Link href="/" className="shrink-0 z-10">
            <Logo size="sm" dark={scrolled} />
          </Link>

          {/* Links — absolutely centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  pathname === l.href
                    ? scrolled
                      ? "text-primary"
                      : "text-white"
                    : scrolled
                    ? "text-dark/60 hover:text-dark"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: scrolled
                        ? "rgba(98,182,203,0.12)"
                        : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side — bag + mobile menu */}
          <div className="flex items-center gap-3 ml-auto z-10">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200"
              style={{
                background: scrolled
                  ? "rgba(98,182,203,0.12)"
                  : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: scrolled
                  ? "1px solid rgba(98,182,203,0.25)"
                  : "1px solid rgba(255,255,255,0.25)",
                color: scrolled ? "#0d1b2a" : "#ffffff",
              }}
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl transition-colors"
              style={{ color: scrolled ? "#0d1b2a" : "#ffffff" }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-3 md:hidden"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(190,233,232,0.4)",
              boxShadow: "0 16px 48px rgba(98,182,203,0.2)",
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  pathname === l.href
                    ? "bg-primary/10 text-primary"
                    : "text-dark/70 hover:bg-primary/5 hover:text-dark"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
