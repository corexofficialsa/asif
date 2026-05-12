import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "ASIF | Phones for Prices You've Never Seen Elsewhere",
  description:
    "Premium smartphones — new & used — at unbeatable prices. Located in Balad, Jeddah, Saudi Arabia.",
  keywords: "iPhone, Samsung, Google Pixel, smartphones, Jeddah, Balad, Saudi Arabia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LoadingScreen />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
      </body>
    </html>
  );
}
