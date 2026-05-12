"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image src="/ab-logo.png" alt="ASIF" width={52} height={52} style={{ objectFit: "contain" }} />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Jeddah's most trusted smartphone destination. New &amp; used phones at prices you won't find anywhere else in Balad.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-btn flex items-center justify-center text-white/70 hover:text-white"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-btn flex items-center justify-center text-white/70 hover:text-white"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/store", label: "Store" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-white/50 hover:text-primary text-sm transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-5">
              Visit Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">Balad District, Jeddah, Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-primary shrink-0" />
                <span className="text-white/50 text-sm">+966 50 000 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-primary shrink-0" />
                <span className="text-white/50 text-sm">asif@balad.sa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} ASIF Store. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Balad, Jeddah — Saudi Arabia
          </p>
        </div>
      </div>
    </footer>
  );
}
