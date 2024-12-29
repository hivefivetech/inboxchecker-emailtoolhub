"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const socket = io({
      path: "/api/socketio",
    });

    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        Active Users: {activeUsers}
      </div>
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
    </div>
  );
}
