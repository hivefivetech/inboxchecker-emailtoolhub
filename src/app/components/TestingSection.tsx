"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { TbLoader3 } from "react-icons/tb";
import GmailImage from "../assets/images/gmail.png";
import YahooImage from "../assets/images/yahoo.png";
import ZohoImage from "../assets/images/zoho.png";

const fetchEmailsFromServer = async () => {
    try {
        // console.log('Here')
        const response = await fetch("/api/emails");
        // console.log('response: ', response)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log('data: ', data)
        if (data.success) {
            return {
                gmailuser1: data.emails.gmailuser1.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                gmailuser2: data.emails.gmailuser2.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                gmailuser3: data.emails.gmailuser3.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                gmailuser4: data.emails.gmailuser4.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                gmailuser5: data.emails.gmailuser5.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                gmailuser6: data.emails.gmailuser6.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status,
                    date: new Date(email.date),
                })),
                yahoouser1: data.emails.yahoouser1.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status || "Inbox",
                    date: new Date(email.date),
                })),
                yahoouser2: data.emails.yahoouser2.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status || "Inbox",
                    date: new Date(email.date),
                })),
                zohouser1: data.emails.zohouser1.map((email: any) => ({
                    name: email.from?.name || "Unknown Sender",
                    email: email.from?.address || "Unknown Email",
                    maskedEmail: email.from?.address
                        ? email.from.address.replace(/@(.*)\./, "@*****.")
                        : "Unknown Email",
                    subject: email.subject || "No Subject",
                    status: email.status || "Inbox",
                    date: new Date(email.date),
                })),
            };
        }
        return { gmailuser1: [], gmailuser2: [], gmailuser3: [], gmailuser4: [], gmailuser5: [], gmailuser6: [], yahoouser1: [], yahoouser2: [], zohouser1: [] };
    } catch (error) {
        console.error("Error fetching emails from API:", error);
        return { gmailuser1: [], gmailuser2: [], gmailuser3: [], gmailuser4: [], gmailuser5: [], gmailuser6: [], yahoouser1: [], yahoouser2: [], zohouser1: [] };
    }
};

export default function TestingSection() {
    // Gmail
    const [resultsUser1, setResultsUser1] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsUser2, setResultsUser2] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsUser3, setResultsUser3] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsUser4, setResultsUser4] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsUser5, setResultsUser5] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsUser6, setResultsUser6] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    // Yahoo
    const [resultsYahooUser1, setResultsYahooUser1] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsYahooUser2, setResultsYahooUser2] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    // Zoho
    const [resultsZohoUser1, setResultsZohoUser1] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [selectedTabUser1, setSelectedTabUser1] = useState("Inbox");
    const [selectedTabUser2, setSelectedTabUser2] = useState("Inbox");
    const [selectedTabUser3, setSelectedTabUser3] = useState("Inbox");
    const [selectedTabUser4, setSelectedTabUser4] = useState("Inbox");
    const [selectedTabUser5, setSelectedTabUser5] = useState("Inbox");
    const [selectedTabUser6, setSelectedTabUser6] = useState("Inbox");
    const [selectedTabYahooUser1, setSelectedTabYahooUser1] = useState("Inbox");
    const [selectedTabYahooUser2, setSelectedTabYahooUser2] = useState("Inbox");
    const [selectedTabZohoUser1, setSelectedTabZohoUser1] = useState("Inbox");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isRealtimeLoader, setIsRealtimeLoader] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    
    const tabs = [
        { label: "Inbox", value: "Inbox" },
        { label: "Spam", value: "Spam" },
    ];

    useEffect(() => {
        const fetchEmails = async () => {
            if (isFirstLoad) {
                setIsLoading(true);
            }
            setIsRealtimeLoader(true);
            const { gmailuser1, gmailuser2, gmailuser3, gmailuser4, gmailuser5, gmailuser6, yahoouser1, yahoouser2, zohouser1 } = await fetchEmailsFromServer();
            setResultsUser1(gmailuser1);
            setResultsUser2(gmailuser2);
            setResultsUser3(gmailuser3);
            setResultsUser4(gmailuser4);
            setResultsUser5(gmailuser5);
            setResultsUser6(gmailuser6);
            setResultsYahooUser1(yahoouser1);
            setResultsYahooUser2(yahoouser2);
            setResultsZohoUser1(zohouser1);
            setIsLoading(false);
            setIsFirstLoad(false);
            setIsRealtimeLoader(false);
        };

        fetchEmails();
        const interval = setInterval(fetchEmails, 5000);

        return () => clearInterval(interval);
    }, []);

    // Filter emails based on the selected tab and search query
    // Gmail
    const filteredTabResultsUser1 = resultsUser1.filter((email) => {
        const matchesTab = email.status === selectedTabUser1;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsUser2 = resultsUser2.filter((email) => {
        const matchesTab = email.status === selectedTabUser2;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsUser3 = resultsUser3.filter((email) => {
        const matchesTab = email.status === selectedTabUser3;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsUser4 = resultsUser4.filter((email) => {
        const matchesTab = email.status === selectedTabUser4;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsUser5 = resultsUser5.filter((email) => {
        const matchesTab = email.status === selectedTabUser5;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsUser6 = resultsUser6.filter((email) => {
        const matchesTab = email.status === selectedTabUser6;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Yahoo
    const filteredTabResultsYahooUser1 = resultsYahooUser1.filter((email) => {
        const matchesTab = email.status === selectedTabYahooUser1;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const filteredTabResultsYahooUser2 = resultsYahooUser2.filter((email) => {
        const matchesTab = email.status === selectedTabYahooUser2;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Zoho
    const filteredTabResultsZohoUser1 = resultsZohoUser1.filter((email) => {
        const matchesTab = email.status === selectedTabZohoUser1;
        const matchesSearch =
            email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <section className="relative bg-gray-50 py-20 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                    Real-Time Test Results
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    See where your emails are landing — Inbox, Spam, and more.
                </p>

                {/* Search Input */}
                <div className="flex justify-center mb-6 px-4">
                    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md duration-300 hover:shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Search Mail
                        </h2>
                        <motion.div
                            className="w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="w-full px-4 py-3 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-x-105"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* GMAIL */}
                {/* First Email Section */}
                <EmailSection
                    accountEmail="wardenleon484@gmail.com"
                    ageOfEmail="9 Years Old Email"
                    selectedTab={selectedTabUser1}
                    setSelectedTab={setSelectedTabUser1}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser1}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Second Email Section */}
                <EmailSection
                    accountEmail="thomasadward5@gmail.com"
                    ageOfEmail="6 Years Old Email"
                    selectedTab={selectedTabUser2}
                    setSelectedTab={setSelectedTabUser2}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser2}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Third Email Section */}
                <EmailSection
                    accountEmail="stellajamsonusa@gmail.com"
                    ageOfEmail="7 Years Old Email"
                    selectedTab={selectedTabUser3}
                    setSelectedTab={setSelectedTabUser3}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser3}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Fourth Email Section */}
                <EmailSection
                    accountEmail="foodazmaofficial@gmail.com"
                    ageOfEmail="5 Years Old Email"
                    selectedTab={selectedTabUser4}
                    setSelectedTab={setSelectedTabUser4}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser4}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Fifth Email Section */}
                <EmailSection
                    accountEmail="watsonjetpeter@gmail.com"
                    ageOfEmail="7 Years Old Email"
                    selectedTab={selectedTabUser5}
                    setSelectedTab={setSelectedTabUser5}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser5}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Sixth Email Section */}
                <EmailSection
                    accountEmail="dcruzjovita651@gmail.com"
                    ageOfEmail="3 Years Old Email"
                    selectedTab={selectedTabUser6}
                    setSelectedTab={setSelectedTabUser6}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsUser6}
                    image={GmailImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* YAHOO */}
                {/* Yahoo User 1 Email Section */}
                <EmailSection
                    accountEmail="syedtestm@yahoo.com"
                    ageOfEmail="4 Years Old"
                    selectedTab={selectedTabYahooUser1}
                    setSelectedTab={setSelectedTabYahooUser1}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsYahooUser1}
                    image={YahooImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* Yahoo User 2 Email Section */}
                <EmailSection
                    accountEmail="vexabyteofficial@yahoo.com"
                    ageOfEmail="8 Years Old"
                    selectedTab={selectedTabYahooUser2}
                    setSelectedTab={setSelectedTabYahooUser2}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsYahooUser2}
                    image={YahooImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />

                {/* ZOHO */}
                {/* Zoho User 1 Email Section */}
                <EmailSection
                    accountEmail="jamie_roberts@zohomail.in"
                    ageOfEmail="6 Years Old"
                    selectedTab={selectedTabZohoUser1}
                    setSelectedTab={setSelectedTabZohoUser1}
                    tabs={tabs}
                    filteredTabResults={filteredTabResultsZohoUser1}
                    image={ZohoImage}
                    isLoading={isLoading && isFirstLoad}
                    isRealtimeLoader={isRealtimeLoader}
                />
            </div>
        </section>
    );
}

function EmailSection({
    accountEmail,
    ageOfEmail,
    selectedTab,
    setSelectedTab,
    tabs,
    filteredTabResults,
    image,
    isLoading,
    isRealtimeLoader,
}: {
    accountEmail: string;
    ageOfEmail: string,
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: { label: string; value: string }[];
    filteredTabResults: { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[];
    image: any;
    isLoading: boolean;
    isRealtimeLoader: boolean;
}) {
    return (
        <div
            className={`max-w-4xl mx-auto shadow-lg rounded-lg p-6 mb-5 
                ${selectedTab === "Inbox" ? "bg-green-50" : "bg-red-50"}`}
        >
            <div className="text-center mb-1">
                <h2 className="text-md sm:text-2xl font-bold text-gray-800">
                    Results for:{" "}
                    <span className={`${selectedTab === "Inbox" ? "text-green-500" : "text-red-500"}`}>
                        {accountEmail}
                    </span>
                </h2>

                <p className={`${selectedTab === "Inbox" ? "text-green-500" : "text-red-500"} text-sm sm:text-md font-semibold`}>
                    {ageOfEmail}
                </p>
            </div>

            {/* Realtime Loader */}
            <div className="flex justify-end items-end mb-2">
                {isRealtimeLoader ? (
                    <motion.div
                        className={`${selectedTab === "Inbox" ? "text-green-500" : "text-red-500"} flex justify-center items-center`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        title="Realtime Fetching"
                    >
                        <TbLoader3 className="animate-spin text-xl" />
                    </motion.div>
                ) : (
                    <motion.div
                        className={`${selectedTab === "Inbox" ? "text-green-500" : "text-red-500"} flex justify-center items-center`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        title="Fetched"
                    >
                        <FaCheck className="text-xl" />
                    </motion.div>
                )}
            </div>

            <div className="flex justify-between rounded-lg shadow-inner mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setSelectedTab(tab.value)}
                        className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${selectedTab === tab.value
                            ? tab.value === "Inbox"
                                ? "bg-green-500 text-white shadow-md"
                                : "bg-red-500 text-white shadow-md"
                            : "bg-white text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                className={`space-y-4 p-3 rounded-lg shadow-md ${selectedTab === "Inbox" ? "bg-green-100" : "bg-red-100"
                    }`}
            >
                {isLoading ? (
                    <motion.div
                        className="flex justify-center items-center h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaSpinner
                            className={`animate-spin text-4xl ${selectedTab === "Inbox" ? "text-green-500" : "text-red-500"
                                }`}
                        />
                    </motion.div>
                ) : filteredTabResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                        <AnimatePresence>
                            {filteredTabResults.map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow gap-3 sm:gap-0 w-full mb-2"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="relative w-12 h-12">
                                            <Image
                                                src={image}
                                                alt={`${accountEmail.includes("@yahoo.com") ? "Yahoo" : "Gmail"} logo`}
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start">
                                            <p className="text-lg text-center sm:text-start font-medium text-gray-800">
                                                {result.name || "Unknown Sender"}
                                            </p>
                                            <p className="text-sm text-center sm:text-start text-gray-600">
                                                {result.maskedEmail || "Unknown Email"}
                                            </p>
                                            <p className="text-sm text-center sm:text-start text-gray-500">
                                                {result.subject || "No Subject"}
                                            </p>
                                            <p className="text-sm text-center sm:text-start text-gray-500">
                                                {new Date(result.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Status Badge */}
                                    <motion.span
                                        key={result.status}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`px-4 py-2 rounded-full w-full sm:w-auto text-white ${result.status === "Inbox" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {result.status}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">
                        No emails found in the last 5 minutes.
                    </p>
                )}
            </div>

        </div>
    );
}
