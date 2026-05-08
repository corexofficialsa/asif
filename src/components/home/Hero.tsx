"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";

// ─────────────────────────────────────────────
// HOW TO CHANGE THE HERO PHONE IMAGES
//
// 1. Copy your JPG or PNG file into:
//      ASIF/public/phones/
//    Example: copy "iphone.jpg" → ASIF/public/phones/iphone.jpg
//
// 2. Set the image path below using "/phones/your-filename.jpg"
//    Leave image as "" to keep the default 3D mockup.
// ─────────────────────────────────────────────
const HERO_PHONES = {
  center: {
    image: "/phones/iphone.png",
    label: "Google Pixel 10",
    price: "3,999 SAR",
    mockupBrand: "Apple" as const,
  },
  left: {
    image: "/phones/samsung.png",
    label: "Galaxy S26 Ultra",
    price: "5,299 SAR",
    mockupBrand: "Samsung" as const,
  },
  right: {
    image: "/phones/pixel.png",
    label: "Pixel 9 Pro",
    price: "3,799 SAR",
    mockupBrand: "Google" as const,
  },
};
// ─────────────────────────────────────────────

function HeroPhone({
  image,
  brand,
  size,
  className,
  style,
}: {
  image: string;
  brand: "Apple" | "Samsung" | "Google";
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={brand}
        className={className}
        style={{
          width: `min(${size * 0.48}px, 44vw)`,
          height: `min(${size}px, 68vw)`,
          objectFit: "contain",
          ...style,
        }}
      />
    );
  }
  return <PhoneMockup brand={brand} size={size} />;
}

export default function Hero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Phones float upward as user scrolls through the hero, then settle down
  const phonesY = useTransform(scrollYProgress, [0, 0.42, 1], [0, -120, 80]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-dark overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 orb pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 orb pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 orb pointer-events-none" style={{ animationDelay: "1s" }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,182,203,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(98,182,203,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-btn mb-8"
        >
          <Star size={13} className="text-primary fill-primary" />
          <span className="text-primary text-xs font-semibold tracking-wide">
            Balad&apos;s #1 Smartphone Store — Jeddah
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.02] tracking-tight mb-6"
        >
          Phones for prices
          <br />
          <span className="gradient-text">you&apos;ve never seen.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/45 text-lg max-w-xl mb-10 leading-relaxed"
        >
          New &amp; used iPhones, Samsung Galaxy, and Google Pixels — all genuine, all tested, at unbeatable prices in the heart of Balad, Jeddah.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <Link href="/store" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm">
            Browse Store <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="glass-btn text-white flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm">
            Contact Us
          </Link>
        </motion.div>

        {/* Phones — scroll-driven parallax wrapper */}
        <motion.div style={{ y: phonesY }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-5xl h-[380px] sm:h-[500px] md:h-[800px] mx-auto flex items-center justify-center"
          >
            <div className="absolute w-[520px] h-[520px] bg-primary/20 rounded-full blur-3xl" />

            {/* Left phone — desktop only */}
            <div className="hidden sm:block absolute left-0 md:left-8 top-8 phone-float-2 opacity-75 z-0">
              <HeroPhone image={HERO_PHONES.left.image} brand={HERO_PHONES.left.mockupBrand} size={420} />
            </div>

            {/* Center phone — always visible */}
            <div className="relative z-10 phone-float">
              <HeroPhone image={HERO_PHONES.center.image} brand={HERO_PHONES.center.mockupBrand} size={580} />
            </div>

            {/* Right phone — desktop only */}
            <div
              className="hidden sm:block absolute right-0 md:right-8 top-16 phone-float opacity-70 z-0"
              style={{ animationDelay: "2s" }}
            >
              <HeroPhone image={HERO_PHONES.right.image} brand={HERO_PHONES.right.mockupBrand} size={380} />
            </div>

            {/* Price tag — top right */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 sm:-right-4 glass-card rounded-2xl px-4 py-3 z-20"
            >
              <div className="text-xs text-dark/55 font-medium">{HERO_PHONES.center.label}</div>
              <div className="text-lg font-black text-dark">{HERO_PHONES.center.price}</div>
            </motion.div>

            {/* Price tag — bottom left */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-4 sm:-left-4 glass-card rounded-2xl px-4 py-3 z-20"
            >
              <div className="text-xs text-dark/55 font-medium">{HERO_PHONES.left.label}</div>
              <div className="text-lg font-black text-dark">{HERO_PHONES.left.price}</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-10 mt-10"
        >
          {[
            { label: "Happy Customers", value: "2,000+" },
            { label: "Phones Sold", value: "5,000+" },
            { label: "Years in Business", value: "8+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-white/20 text-xs tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  );
}
