"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const adminLogin = useAppStore((s) => s.adminLogin);
  const isLoggedIn = useAppStore((s) => s.isAdminLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.replace("/admin/dashboard");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const ok = adminLogin(username, password);
    if (ok) {
      router.replace("/admin/dashboard");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1b2a3b 100%)" }}
    >
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 orb" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 orb" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <svg height="48" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
            <circle cx="7" cy="20" r="5" fill="#62b6cb" />
            <circle cx="7" cy="20" r="3" fill="#bee9e8" />
            <text x="18" y="28" fontFamily="Inter, system-ui" fontWeight="800" fontSize="22" letterSpacing="2" fill="white">ASIF</text>
            <rect x="18" y="32" width="92" height="2.5" rx="1.25" fill="#62b6cb" />
            <circle cx="80" cy="10" r="2.5" fill="#bee9e8" />
          </svg>
          <p className="text-white/40 text-sm">Admin Dashboard</p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 className="text-xl font-black text-white mb-6">Sign in</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-white/40 mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Asif_Balad"
                className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder:text-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/40 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-2xl text-sm text-white placeholder:text-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-medium"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm mt-2 disabled:opacity-60"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
