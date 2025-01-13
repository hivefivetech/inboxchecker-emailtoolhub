"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <CTASection />
      <Footer />
      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          >
            <FaArrowUp size={20} />
          </button>
        </motion.div>
      )}
      {/* Notice Section */}
      {/* <div className="fixed bottom-3 w-full left-[25%]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-yellow-100 rounded-lg border border-yellow-500 text-yellow-900 p-4 text-center z-50 shadow-xl w-[50%]"
        >
          <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
            ⚠️ Website servers are currently being updated, which may cause delays or issues while checking your inbox. We appreciate your patience!
          </p>
        </motion.div>
      </div> */}
    </div>
  );
}
