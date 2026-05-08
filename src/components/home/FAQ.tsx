"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you deliver outside of Jeddah?",
    a: "Yes! We deliver across Saudi Arabia. Delivery typically takes 2–4 business days depending on your city. Jeddah deliveries arrive within 24 hours. You can also choose shop pickup from our Balad store for same-day.",
  },
  {
    q: "Are used phones tested and guaranteed?",
    a: "Absolutely. Every used device undergoes a full 40-point inspection covering the screen, battery health, camera, speakers, biometrics, and all connectivity features. We only sell phones we'd be comfortable using ourselves.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, Mada, Visa, Mastercard, Apple Pay, and STC Pay. Payment is handled at our store on pickup, or on delivery for delivery orders.",
  },
  {
    q: "Can I return or exchange a phone?",
    a: "Yes — we offer a 7-day return or exchange policy on all purchases. The phone must be in the same condition as sold. Just bring your receipt and we'll sort it out.",
  },
  {
    q: "Are your iPhones original / not locked?",
    a: "All our iPhones are 100% original and unlocked — they work with any SIM card, including Saudi carriers. We never sell carrier-locked or refurbished-with-fake-parts devices.",
  },
  {
    q: "Do you buy old phones?",
    a: "Yes! Bring your old phone to the store and we'll give you a fair trade-in value. The better the condition, the better the price. This discount can be applied toward any purchase.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(190,233,232,0.5)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5">
        <span className="font-semibold text-dark text-sm pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-primary shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="text-dark/55 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-dark mt-3">
            Frequently asked questions
          </h2>
          <p className="text-dark/45 mt-4">
            Everything you need to know about buying from ASIF.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
