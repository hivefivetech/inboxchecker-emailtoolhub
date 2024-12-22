"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white text-gray-800 py-16 px-6"
        >
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                    Is Your Email Landing in the <span className="text-teal-500">Right Folder?</span>
                </h1>
                <p className="text-lg sm:text-xl mb-6">
                    Welcome to <span className="font-bold">InboxChecker</span> — the easiest way to test where your email ends up. Whether it’s <span className="font-bold">Inbox</span>, <span className="font-bold">Spam</span>, <span className="font-bold">Promotions</span>, or <span className="font-bold">Updates</span>, we’ve got you covered.
                </p>
                <p className="text-base sm:text-lg mb-8">
                    Our *advanced IMAP analysis* helps you understand your email’s deliverability and pinpoint issues that might be keeping it out of the <span className="font-bold">Inbox</span>. *Get instant insights and take control of your email campaigns!*
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition transform hover:scale-105">
                        <span className="font-bold">Check Your Email Now</span>
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 transition transform hover:scale-105">
                        <span className="font-bold">Learn How It Works</span>
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-teal-100 rounded-full opacity-50 blur-lg -z-10"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-200 rounded-full opacity-50 blur-lg -z-10"></div>
        </motion.section>
    );
}
