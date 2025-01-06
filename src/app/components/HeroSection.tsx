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
                    Ensure Your Emails Land in the <span className='text-teal-500'>Primary Inbox</span> Every Time!
                </h1>
                <p className="text-lg sm:text-xl mb-6">
                    Welcome to <span className='font-bold'>EmailToolHub Inbox Checker</span> — your go-to tool for testing email deliverability. Find out whether your email lands in <span className='font-bold'>Inbox</span> or <span className='font-bold'>Spam</span> with ease.
                </p>
                <p className="text-base sm:text-lg mb-8">
                    Our <span className="font-semibold">advanced IMAP analysis</span> helps you understand your email’s deliverability and pinpoint issues that might be keeping it out of the <span className="font-bold">Inbox</span>. Get instant insights and take control of your email campaigns!
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 transition transform hover:scale-105">
                        <span className="font-bold">
                            <a href="" target="_blank">
                                Learn How It Works
                            </a>
                        </span>
                    </button>
                </div>
            </div>

            {/* Notice Section */}
            {/* <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 mx-auto w-full max-w-3xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-lg text-center flex flex-col items-center"
            >
                <img 
                    src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" 
                    alt="Updating Servers Animation"
                    className="w-20 h-20 mb-3"
                />
                <p className="font-semibold">
                    ⚠️ Website servers are currently being updated, which may cause delays or issues while checking your inbox. We appreciate your patience!
                </p>
            </motion.div> */}

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-teal-100 rounded-full opacity-50 blur-lg -z-10"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-200 rounded-full opacity-50 blur-lg -z-10"></div>
        </motion.section>
    );
}
