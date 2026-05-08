"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const services = [
  "Buy a new phone",
  "Buy a used phone",
  "Sell / trade-in my phone",
  "Phone repair inquiry",
  "Bulk / business order",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Header */}
      <div
        className="pt-28 pb-16 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1b2a3b 100%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-black text-white relative z-10"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-white/45 mt-3 relative z-10"
        >
          We're here to help — visit us, call us, or send a message.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-2xl font-black text-dark mb-8">Contact Information</h2>

            <div className="flex flex-col gap-6 mb-10">
              {[
                { icon: MapPin, title: "Visit Us", detail: "Balad District, Jeddah, Saudi Arabia", sub: "Open Sat–Thu, 10am–10pm" },
                { icon: Phone, title: "Call / WhatsApp", detail: "+966 50 000 0000", sub: "Available during store hours" },
                { icon: Mail, title: "Email", detail: "asif@balad.sa", sub: "Reply within 24 hours" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">{item.title}</p>
                    <p className="text-dark/70 text-sm mt-0.5">{item.detail}</p>
                    <p className="text-dark/35 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors mb-10"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>

            {/* Hours */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(190,233,232,0.2)", border: "1px solid rgba(190,233,232,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-primary" />
                <span className="font-bold text-dark text-sm">Store Hours</span>
              </div>
              {[
                { day: "Saturday – Wednesday", hours: "10:00 AM – 10:00 PM" },
                { day: "Thursday", hours: "10:00 AM – 11:00 PM" },
                { day: "Friday", hours: "2:00 PM – 11:00 PM" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between py-1.5 border-b border-secondary/30 last:border-0">
                  <span className="text-dark/60 text-sm">{h.day}</span>
                  <span className="text-dark font-medium text-sm">{h.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle size={64} className="text-primary mb-5" />
                </motion.div>
                <h3 className="text-xl font-black text-dark mb-2">Message Sent!</h3>
                <p className="text-dark/50 text-sm">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                  className="btn-primary mt-8 px-8 py-3.5 rounded-2xl font-bold text-white text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-2xl font-black text-dark mb-2">Send a Message</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Your Name</label>
                    <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Mohammed..." className="input-glass w-full px-4 py-3 text-sm text-dark" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Phone Number</label>
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+966 5X..." className="input-glass w-full px-4 py-3 text-sm text-dark" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className="input-glass w-full px-4 py-3 text-sm text-dark" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark/50 mb-1.5 block">What can we help with?</label>
                  <select value={form.service} onChange={(e) => set("service", e.target.value)} className="input-glass w-full px-4 py-3 text-sm text-dark appearance-none">
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark/50 mb-1.5 block">Message</label>
                  <textarea required value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} placeholder="Tell us more about what you're looking for..." className="input-glass w-full px-4 py-3 text-sm text-dark resize-none" />
                </div>

                <button type="submit" className="btn-primary flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
