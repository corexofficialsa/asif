"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, MapPin, RefreshCw } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    desc: "Every phone is verified authentic and tested before sale. No fakes, no compromises.",
  },
  {
    icon: Zap,
    title: "Best Prices",
    desc: "We cut the middlemen. Direct sourcing means prices you genuinely won't find elsewhere.",
  },
  {
    icon: MapPin,
    title: "Walk-In Welcome",
    desc: "Visit us in Balad, Jeddah. See, touch, and test your phone before you buy.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In Ready",
    desc: "Got an old device? We'll give you a fair trade-in value toward your next phone.",
  },
];

export default function About() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-dark mt-3 mb-6 leading-tight">
              Jeddah's most{" "}
              <span className="gradient-text-dark">trusted</span>{" "}
              phone store.
            </h2>
            <p className="text-dark/50 leading-relaxed mb-4">
              ASIF started as a small stall in Balad with one mission — give everyday people access to great smartphones at honest prices. Years later, that mission hasn't changed.
            </p>
            <p className="text-dark/50 leading-relaxed">
              We stock both new and pre-owned iPhones, Samsung Galaxy, and Google Pixel phones. Every used device goes through rigorous testing. What you see is what you get.
            </p>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                style={{ background: "rgba(190,233,232,0.15)" }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-dark text-sm mb-2">{f.title}</h3>
                <p className="text-dark/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
