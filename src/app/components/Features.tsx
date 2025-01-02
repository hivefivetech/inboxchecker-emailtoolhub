"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TestingSection from "./TestingSection";

const allEmails = [
    "pepapihsyd@gmail.com",
    "dcruzjovita651@gmail.com",
    "doctsashawn@gmail.com",
    "foodazmaofficial@gmail.com",
    "stellajamsonusa@gmail.com",
    "thomasadward5@gmail.com",
    "watsonjetpeter@gmail.com",
    "syedtestm@yahoo.com",
    "vexabyteofficial@yahoo.com",
    "jamie_roberts@zohomail.in",
    "rollyriders@zohomail.in",
    "pollywilmar@zohomail.in",
    "awesome.jamii@yandex.com",
    "boudreauryan@yandex.com",
];

export default function Features() {
    const [emails, setEmails] = useState<string[]>(allEmails);

    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        alert(`Copied: ${email}`);
    };

    const handleCopyAll = () => {
        const allEmailsString = emails.join(", ");
        navigator.clipboard.writeText(allEmailsString);
        alert("All emails copied!");
    };

    return (
        <>
            <section className="relative bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        All Email Addresses
                    </h1>
                    <p className="text-lg sm:text-xl mb-8">
                        Below are the email addresses available. You can copy individual emails or all emails at once.
                    </p>

                    <motion.div
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        {emails.map((email, index) => (
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
                                    className="ml-2 bg-white text-blue-600 px-2 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                                >
                                    Copy
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-6">
                        <button
                            onClick={handleCopyAll}
                            className="px-6 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition transform hover:scale-105"
                        >
                            Copy All Emails
                        </button>
                    </div>
                </div>
            </section>

            {/* Pass predefined test emails to TestingSection */}
            <TestingSection />
        </>
    );
}
