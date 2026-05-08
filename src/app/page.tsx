import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="page-transition">
      <Hero />
      <About />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
}
