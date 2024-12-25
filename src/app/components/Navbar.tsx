"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <h1 className="text-lg font-bold">InboxChecker</h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li className="hover:text-blue-600 transition">How it Works</li>
                    <li className="hover:text-blue-600 transition">
                        <a href="https://t.me/ZplusMan" target="_blank">
                            Contact
                        </a>
                    </li>
                </ul>

                {/* Hamburger Icon for Small Screens */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                    {isMenuOpen ? (
                        <HiOutlineX className="h-6 w-6" />
                    ) : (
                        <HiOutlineMenu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white shadow-md"
                    >
                        <ul className="flex flex-col space-y-4 py-4 px-6">
                            <li className="hover:text-blue-600 transition">How it Works</li>
                            <li className="hover:text-blue-600 transition">
                                <a href="https://t.me/ZplusMan" target="_blank">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
