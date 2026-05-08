"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mohammed Al-Ghamdi",
    location: "Jeddah",
    rating: 5,
    text: "Got my iPhone 16 Pro here for way less than any mall store. Device was perfect, came with all accessories. Will always come back to ASIF.",
    phone: "iPhone 16 Pro",
  },
  {
    name: "Sara Al-Zahrani",
    location: "Jeddah",
    rating: 5,
    text: "Bought a used Samsung S25 Ultra — it was literally like brand new. The staff was so honest and helpful. Couldn't believe the price.",
    phone: "Samsung S25 Ultra",
  },
  {
    name: "Ahmad Al-Otaibi",
    location: "Mecca",
    rating: 5,
    text: "Came all the way from Mecca because a friend recommended ASIF. Worth every kilometer. Got the Galaxy S26 Ultra for an incredible price.",
    phone: "Galaxy S26 Ultra",
  },
  {
    name: "Layla Hassan",
    location: "Jeddah",
    rating: 5,
    text: "Fast delivery to my doorstep, phone was exactly as described. The order process was super simple. My go-to phone shop now.",
    phone: "iPhone 15",
  },
  {
    name: "Khalid Mansour",
    location: "Jeddah",
    rating: 5,
    text: "Best prices in Balad, hands down. I've bought 3 phones from ASIF over the past year — for family members too. Never disappointed.",
    phone: "Google Pixel 9",
  },
  {
    name: "Nour Al-Harbi",
    location: "Jeddah",
    rating: 5,
    text: "The staff checked the phone in front of me, showed me everything was working. That kind of transparency is rare. 10/10.",
    phone: "iPhone 17 Pro Max",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={13} className="text-primary fill-primary" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: "#f0fafa" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Customer Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-dark mt-3">
            People love ASIF
          </h2>
          <p className="text-dark/45 mt-4 max-w-sm mx-auto">
            Don't take our word for it — hear from our satisfied customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ border: "1px solid rgba(190,233,232,0.5)" }}
            >
              <StarRow rating={r.rating} />
              <p className="text-dark/65 text-sm leading-relaxed mt-3 mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-dark text-sm">{r.name}</div>
                  <div className="text-dark/35 text-xs">{r.location}</div>
                </div>
                <span className="text-xs text-primary font-medium bg-primary/8 px-3 py-1 rounded-full">
                  {r.phone}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
