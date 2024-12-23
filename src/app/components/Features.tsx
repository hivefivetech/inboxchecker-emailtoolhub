"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestingSection from "./TestingSection";

const randomEmails = [
    "wardenleon484@gmail.com",
    "thomasadward5@gmail.com",
    "stellajamsonusa@gmail.com",
    "foodazmaofficial@gmail.com",
    "syedtestm@yahoo.com",
];

export default function Features() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [numEmails, setNumEmails] = useState(0);
    const [generatedEmails, setGeneratedEmails] = useState<string[]>([]);

    const handleGenerateEmails = () => {
        const emails = randomEmails
            .sort(() => 0.5 - Math.random())
            .slice(0, numEmails);
        setGeneratedEmails(emails);
    };

    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        alert(`Copied: ${email}`);
    };

    const handleCopyAll = () => {
        const allEmails = generatedEmails.join(", ");
        navigator.clipboard.writeText(allEmails);
        alert("All emails copied!");
    };

    return (
        <>
            <section className="relative bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Start Testing Your Campaign’s Deliverability
                    </h1>
                    <p className="text-lg sm:text-xl mb-8">
                        Generate email addresses to help you send your campaign and analyze the results.
                    </p>
                    <button
                        onClick={() => setShowPrompt(true)}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition transform hover:scale-105"
                    >
                        Generate Emails
                    </button>

                    <AnimatePresence>
                        {showPrompt && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="mt-8 bg-white text-gray-800 p-6 rounded-lg shadow-lg mx-auto w-full sm:w-1/2"
                            >
                                <h2 className="text-xl font-bold mb-4">How many emails to generate?</h2>
                                <input
                                    type="number"
                                    value={numEmails}
                                    onChange={(e) => setNumEmails(Number(e.target.value))}
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Enter a number"
                                />
                                <button
                                    onClick={() => {
                                        handleGenerateEmails();
                                        setShowPrompt(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition hover:-translate-y-1"
                                >
                                    Generate Emails
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        initial="hidden"
                        animate={generatedEmails.length ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {generatedEmails.map((email, index) => (
                            <motion.div
                                key={index}
                                className="bg-blue-600 text-white p-4 rounded shadow flex justify-between items-center"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <span>{email}</span>
                                <button
                                    onClick={() => handleCopyEmail(email)}
                                    className="ml-2 bg-white text-blue-600 px-2 py-1 rounded-full text-sm hover:bg-gray-100 transition"
                                >
                                    Copy
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>

                    {generatedEmails.length > 0 && (
                        <div className="mt-6">
                            <button
                                onClick={handleCopyAll}
                                className="px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition transform hover:scale-105"
                            >
                                Copy All Emails
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Pass predefined test emails to TestingSection */}
            <TestingSection />
        </>
    );
}
