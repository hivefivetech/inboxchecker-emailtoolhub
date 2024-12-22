import CTASection from "./components/CTASection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
