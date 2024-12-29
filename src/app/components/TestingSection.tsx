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
import YandexImage from "../assets/images/yandex.png";

interface EmailResult {
    name: string;
    email: string;
    maskedEmail: string;
    subject: string;
    status: string;
    date: Date;
}

interface Email {
    id: string;
    name: string;
    email: string;
    maskedEmail: string;
    subject: string;
    status: string;
    date: Date;
    snippet: string;
}
interface GmailResults {
    [key: string]: {
        [tab: string]: Email[];
    };
}

// Gmail
const fetchGmailEmailsFromServer = async (): Promise<GmailResults> => {
    try {
        const response = await fetch("/api/gmails");
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.success && data.gmailResults) {
            return Object.entries(data.gmailResults).reduce<GmailResults>(
                (acc, [emailAccount, tabs]) => {
                    acc[emailAccount] = {};
                    Object.entries(tabs as Record<string, unknown[]>).forEach(
                        ([tab, emails]) => {
                            acc[emailAccount][tab] = (emails as any[]).map((email) => ({
                                id: email.id,
                                name: email.from?.name || "Unknown Sender",
                                email: email.from?.address || "Unknown Email",
                                maskedEmail: email.from?.address
                                    ? email.from.address.replace(/@(.*)\./, "@*****.")
                                    : "Unknown Email",
                                subject: email.subject || "No Subject",
                                status: tab,
                                date: new Date(email.date),
                                snippet: email.snippet || "No Snippet",
                            }));
                        }
                    );
                    return acc;
                },
                {}
            );
        } else {
            console.warn("No Gmail data found.");
            return {};
        }
    } catch (error) {
        console.error("Error fetching Gmail emails:", error);
        return {};
    }
};

// IMAP
const fetchEmailsFromServer = async () => {
    try {
        const response = await fetch("/api/emails");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();

        if (data.success) {
            return {
                yahoouser1: (data.emails.yahoouser1 || []).map(formatEmail),
                yahoouser2: (data.emails.yahoouser2 || []).map(formatEmail),
                zohouser1: (data.emails.zohouser1 || []).map(formatEmail),
                zohouser2: (data.emails.zohouser2 || []).map(formatEmail),
                zohouser3: (data.emails.zohouser3 || []).map(formatEmail),
                yandexuser1: (data.emails.yandexuser1 || []).map(formatEmail),
                yandexuser2: (data.emails.yandexuser2 || []).map(formatEmail),
            };
        }

        return { yahoouser1: [], yahoouser2: [], zohouser1: [], zohouser2: [], zohouser3: [], yandexuser1: [], yandexuser2: [] };
    } catch (error) {
        console.error("Error fetching emails from API:", error);
        return { yahoouser1: [], yahoouser2: [], zohouser1: [], zohouser2: [], zohouser3: [], yandexuser1: [], yandexuser2: [] };
    }
};

const formatEmail = (email: any) => ({
    name: email.from?.name || "Unknown Sender",
    email: email.from?.address || "Unknown Email",
    subject: email.subject || "No Subject",
    status: email.status || "Inbox",
    date: new Date(email.date),
});

export default function TestingSection() {
    const [isLoadingGmail, setIsLoadingGmail] = useState(true);
    const [isRealtimeLoadingGmail, setIsRealtimeLoadingGmail] = useState(true);
    const [isFirstReloadGmail, setIsFirstReloadGmail] = useState(true);
    const [resultsGmailUser1, setResultsGmailUser1] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsGmailUser2, setResultsGmailUser2] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsGmailUser3, setResultsGmailUser3] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsGmailUser4, setResultsGmailUser4] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsGmailUser5, setResultsGmailUser5] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsGmailUser6, setResultsGmailUser6] = useState<
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
    const [resultsZohoUser2, setResultsZohoUser2] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsZohoUser3, setResultsZohoUser3] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);

    // Yandex
    const [resultsYandexUser1, setResultsYandexUser1] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);
    const [resultsYandexUser2, setResultsYandexUser2] = useState<
        { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[]
    >([]);

    const [selectedTabYahooUser1, setSelectedTabYahooUser1] = useState("All");
    const [selectedTabYahooUser2, setSelectedTabYahooUser2] = useState("All");
    const [selectedTabZohoUser1, setSelectedTabZohoUser1] = useState("All");
    const [selectedTabZohoUser2, setSelectedTabZohoUser2] = useState("All");
    const [selectedTabZohoUser3, setSelectedTabZohoUser3] = useState("All");
    const [selectedTabYandexUser1, setSelectedTabYandexUser1] = useState("All");
    const [selectedTabYandexUser2, setSelectedTabYandexUser2] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isRealtimeLoader, setIsRealtimeLoader] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState("all");

    const [selectedTabGmailUser1, setSelectedTabGmailUser1] = useState("All");
    const [selectedTabGmailUser2, setSelectedTabGmailUser2] = useState("All");
    const [selectedTabGmailUser3, setSelectedTabGmailUser3] = useState("All");
    const [selectedTabGmailUser4, setSelectedTabGmailUser4] = useState("All");
    const [selectedTabGmailUser5, setSelectedTabGmailUser5] = useState("All");
    const [selectedTabGmailUser6, setSelectedTabGmailUser6] = useState("All");

    const gmailTabs = [
        { label: "All", value: "All" },
        { label: "Primary", value: "Primary" },
        { label: "Spam", value: "Spam" },
        // { label: "Promotions", value: "Promotions" },
        // { label: "Social", value: "Social" },
        // { label: "Updates", value: "Updates" },
    ];
    const tabs = [
        { label: "All", value: "All" },
        { label: "Inbox", value: "Inbox" },
        { label: "Spam", value: "Spam" },
    ];

    // GMAIL
    useEffect(() => {
        const fetchGmailEmails = async () => {
            if (isFirstReloadGmail) {
                setIsLoadingGmail(true);
            }
            setIsRealtimeLoadingGmail(true);
            const emails = await fetchGmailEmailsFromServer();

            if (emails["dcruzjovita651-token.json"]) {
                const tabs = emails["dcruzjovita651-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser1(allEmails);
            }
            if (emails["doctsashawn-token.json"]) {
                const tabs = emails["doctsashawn-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser2(allEmails);
            }
            if (emails["foodazmaofficial-token.json"]) {
                const tabs = emails["foodazmaofficial-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser3(allEmails);
            }
            if (emails["stellajamsonusa-token.json"]) {
                const tabs = emails["stellajamsonusa-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser4(allEmails);
            }
            if (emails["thomasadward5-token.json"]) {
                const tabs = emails["thomasadward5-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser5(allEmails);
            }
            if (emails["watsonjetpeter-token.json"]) {
                const tabs = emails["watsonjetpeter-token.json"];
                const allEmails = Object.values(tabs).flat().sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setResultsGmailUser6(allEmails);
            }
            setIsFirstReloadGmail(false);
            setIsLoadingGmail(false);
            setIsRealtimeLoadingGmail(false);
        };

        fetchGmailEmails();
        const interval = setInterval(fetchGmailEmails, 2000);

        return () => clearInterval(interval);
    }, []);

    // IMAP
    useEffect(() => {
        const fetchEmails = async () => {
            if (isFirstLoad) {
                setIsLoading(true);
            }
            setIsRealtimeLoader(true);

            const { yahoouser1, yahoouser2, zohouser1, zohouser2, zohouser3, yandexuser1, yandexuser2 } = await fetchEmailsFromServer();

            setResultsYahooUser1(
                yahoouser1.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsYahooUser2(
                yahoouser2.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsZohoUser1(
                zohouser1.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsZohoUser2(
                zohouser2.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsZohoUser3(
                zohouser3.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsYandexUser1(
                yandexuser1.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setResultsYandexUser2(
                yandexuser2.sort((a: Email, b: Email) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );

            setIsLoading(false);
            setIsFirstLoad(false);
            setIsRealtimeLoader(false);
        };

        fetchEmails();
        const interval = setInterval(fetchEmails, 4000);

        return () => clearInterval(interval);
    }, []);

    // Filter emails based on the selected tab and search query
    const emailResults = {
        yahoo: [
            { results: resultsYahooUser1, selectedTab: selectedTabYahooUser1 },
            { results: resultsYahooUser2, selectedTab: selectedTabYahooUser2 },
        ],
        zoho: [
            { results: resultsZohoUser1, selectedTab: selectedTabZohoUser1 },
            { results: resultsZohoUser2, selectedTab: selectedTabZohoUser2 },
            { results: resultsZohoUser3, selectedTab: selectedTabZohoUser3 },
        ],
        yandex: [
            { results: resultsYandexUser1, selectedTab: selectedTabYandexUser1 },
            { results: resultsYandexUser2, selectedTab: selectedTabYandexUser2 },
        ],
        gmail: [
            { results: resultsGmailUser1, selectedTab: selectedTabGmailUser1 },
            { results: resultsGmailUser2, selectedTab: selectedTabGmailUser2 },
            { results: resultsGmailUser3, selectedTab: selectedTabGmailUser3 },
            { results: resultsGmailUser4, selectedTab: selectedTabGmailUser4 },
            { results: resultsGmailUser5, selectedTab: selectedTabGmailUser5 },
            { results: resultsGmailUser6, selectedTab: selectedTabGmailUser6 },
        ],
    };

    const filterEmails = (emailData: any) => {
        return emailData.map(({ results, selectedTab }: { results: EmailResult[]; selectedTab: string }) => {
            const allEmails = selectedTab.toLowerCase() === "all"; // Check if "All" tab is selected
            return results.filter((email: any) => {
                const matchesTab = allEmails || email.status.toLowerCase() === selectedTab.toLowerCase(); // Include all emails for "All"
                const matchesSearch =
                    email.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    email.email.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesTab && matchesSearch;
            });
        });
    };

    const filteredEmails = {
        yahoo: filterEmails(emailResults.yahoo),
        zoho: filterEmails(emailResults.zoho),
        yandex: filterEmails(emailResults.yandex),
        gmail: filterEmails(emailResults.gmail),
    };
    // Filter Emails End

    // Percentage
    // Gmail
    const calculatePercentage = (emails: EmailResult[], query: string) => {
        const filteredEmails = emails.filter(
            (email) =>
                email.name.toLowerCase().includes(query.toLowerCase()) ||
                email.email.toLowerCase().includes(query.toLowerCase())
        );

        const totalEmails = filteredEmails.length;

        if (totalEmails === 0) {
            return { inbox: 0, spam: 0 };
        }

        const inboxCount = filteredEmails.filter(
            (email) =>
                ["primary", "updates", "social", "promotions"].includes(email.status.toLowerCase())
        ).length;
        const spamCount = filteredEmails.filter((email) => email.status.toLowerCase() === "spam").length;

        return {
            inbox: Math.round((inboxCount / totalEmails) * 100),
            spam: Math.round((spamCount / totalEmails) * 100),
        };
    };
    // Rest All
    const calculateSimplePercentage = (emails: EmailResult[], query: string) => {
        const filteredEmails = emails.filter(
            (email) =>
                email.name.toLowerCase().includes(query.toLowerCase()) ||
                email.email.toLowerCase().includes(query.toLowerCase())
        );

        const totalEmails = filteredEmails.length;

        if (totalEmails === 0) {
            return { inbox: 0, spam: 0 };
        }

        const inboxCount = filteredEmails.filter((email) => email.status.toLowerCase() === "inbox").length;
        const spamCount = filteredEmails.filter((email) => email.status.toLowerCase() === "spam").length;

        return {
            inbox: Math.round((inboxCount / totalEmails) * 100),
            spam: Math.round((spamCount / totalEmails) * 100),
        };
    };

    const yahooAllEmails = [...resultsYahooUser1, ...resultsYahooUser2];
    const zohoAllEmails = [...resultsZohoUser1, ...resultsZohoUser2, ...resultsZohoUser3];
    const yandexAllEmails = [...resultsYandexUser1, ...resultsYandexUser2];
    const yahooPercentages = calculateSimplePercentage(yahooAllEmails, searchQuery);
    const zohoPercentages = calculateSimplePercentage(zohoAllEmails, searchQuery);
    const yandexPercentages = calculateSimplePercentage(yandexAllEmails, searchQuery);

    const gmailAllEmails = [
        ...resultsGmailUser1,
        ...resultsGmailUser2,
        ...resultsGmailUser3,
        ...resultsGmailUser4,
        ...resultsGmailUser5,
        ...resultsGmailUser6,
    ];

    const gmailPercentages = calculatePercentage(gmailAllEmails, searchQuery);
    // Percentage End

    return (
        <section className="relative bg-gray-50 py-20 px-6">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 max-w-5xl mx-auto">
                    Real-Time Test Results
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-5xl mx-auto">
                    See where your emails are landing — Inbox, Spam, and more.
                </p>

                {/* Search Input */}
                <div className="flex justify-center items-center mb-6 px-4 max-w-5xl mx-auto">
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

                {/* Percentages */}
                <div className="flex justify-center items-center max-w-5xl mx-auto mt-2 mb-3">
                    {searchQuery && (
                        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Search Results Percentage</h3>
                            {/* Gmail */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-800">Gmail</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-green-500"
                                        style={{ width: `${gmailPercentages.inbox}%` }}
                                    ></div>
                                    <div
                                        className="absolute h-full bg-red-500"
                                        style={{
                                            width: `${gmailPercentages.spam}%`,
                                            left: `${gmailPercentages.inbox}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">
                                    Inbox: <span className="font-bold text-green-500">{gmailPercentages.inbox}%</span>,
                                    Spam: <span className="font-bold text-red-500">{gmailPercentages.spam}%</span>
                                </p>
                            </div>

                            {/* Yahoo */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-800">Yahoo</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-green-500"
                                        style={{ width: `${yahooPercentages.inbox}%` }}
                                    ></div>
                                    <div
                                        className="absolute h-full bg-red-500"
                                        style={{
                                            width: `${yahooPercentages.spam}%`,
                                            left: `${yahooPercentages.inbox}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">
                                    Inbox: <span className="font-bold text-green-500">{yahooPercentages.inbox}%</span>,
                                    Spam: <span className="font-bold text-red-500">{yahooPercentages.spam}%</span>
                                </p>
                            </div>

                            {/* Zoho */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-800">Zoho</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-green-500"
                                        style={{ width: `${zohoPercentages.inbox}%` }}
                                    ></div>
                                    <div
                                        className="absolute h-full bg-red-500"
                                        style={{
                                            width: `${zohoPercentages.spam}%`,
                                            left: `${zohoPercentages.inbox}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">
                                    Inbox: <span className="font-bold text-green-500">{zohoPercentages.inbox}%</span>,
                                    Spam: <span className="font-bold text-red-500">{zohoPercentages.spam}%</span>
                                </p>
                            </div>

                            {/* Yandex */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-gray-800">Yandex</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-green-500"
                                        style={{ width: `${yandexPercentages.inbox}%` }}
                                    ></div>
                                    <div
                                        className="absolute h-full bg-red-500"
                                        style={{
                                            width: `${yandexPercentages.spam}%`,
                                            left: `${yandexPercentages.inbox}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">
                                    Inbox: <span className="font-bold text-green-500">{yandexPercentages.inbox}%</span>,
                                    Spam: <span className="font-bold text-red-500">{yandexPercentages.spam}%</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Show Filter */}
                <div className="flex justify-center space-x-4 mb-4 max-w-5xl mx-auto">
                    <button
                        onClick={() => {
                            setSelectedTabYahooUser1("Inbox");
                            setSelectedTabYahooUser2("Inbox");
                            setSelectedTabZohoUser1("Inbox");
                            setSelectedTabZohoUser2("Inbox");
                            setSelectedTabZohoUser3("Inbox");
                            setSelectedTabYandexUser1("Inbox");
                            setSelectedTabYandexUser2("Inbox");
                            // Gmail (Primary for Inbox)
                            setSelectedTabGmailUser1("Primary");
                            setSelectedTabGmailUser2("Primary");
                            setSelectedTabGmailUser3("Primary");
                            setSelectedTabGmailUser4("Primary");
                            setSelectedTabGmailUser5("Primary");
                            setSelectedTabGmailUser6("Primary");
                        }}
                        className="relative px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-300 focus:outline-none"
                    >
                        <span className="absolute inset-0 rounded-full bg-green-100 opacity-10"></span>
                        Show All Inbox
                    </button>
                    <button
                        onClick={() => {
                            setSelectedTabYahooUser1("Spam");
                            setSelectedTabYahooUser2("Spam");
                            setSelectedTabZohoUser1("Spam");
                            setSelectedTabZohoUser2("Spam");
                            setSelectedTabZohoUser3("Spam");
                            setSelectedTabYandexUser1("Spam");
                            setSelectedTabYandexUser2("Spam");
                            // Gmail
                            setSelectedTabGmailUser1("Spam");
                            setSelectedTabGmailUser2("Spam");
                            setSelectedTabGmailUser3("Spam");
                            setSelectedTabGmailUser4("Spam");
                            setSelectedTabGmailUser5("Spam");
                            setSelectedTabGmailUser6("Spam");
                        }}
                        className="relative px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-lg hover:from-red-500 hover:to-red-700 transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-red-300 focus:outline-none"
                    >
                        <span className="absolute inset-0 rounded-full bg-red-100 opacity-10"></span>
                        Show All Spam
                    </button>
                </div>

                {/* More Filters */}
                <div className="flex justify-center gap-4 mb-4 max-w-5xl mx-auto flex-wrap">
                    <button
                        onClick={() => setSelectedProvider("all")}
                        className={`px-6 py-2 rounded-full shadow-lg ${selectedProvider === "all"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
                            } transition duration-300`}
                    >
                        Show All
                    </button>
                    <button
                        onClick={() => setSelectedProvider("gmail")}
                        className={`px-6 py-2 rounded-full shadow-lg ${selectedProvider === "gmail"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white"
                            } transition duration-300`}
                    >
                        Gmail
                    </button>
                    <button
                        onClick={() => setSelectedProvider("yahoo")}
                        className={`px-6 py-2 rounded-full shadow-lg ${selectedProvider === "yahoo"
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-purple-400 hover:text-white"
                            } transition duration-300`}
                    >
                        Yahoo
                    </button>
                    <button
                        onClick={() => setSelectedProvider("zoho")}
                        className={`px-6 py-2 rounded-full shadow-lg ${selectedProvider === "zoho"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-yellow-400 hover:text-white"
                            } transition duration-300`}
                    >
                        Zoho
                    </button>
                    <button
                        onClick={() => setSelectedProvider("yandex")}
                        className={`px-6 py-2 rounded-full shadow-lg ${selectedProvider === "yandex"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-red-400 hover:text-white"
                            } transition duration-300`}
                    >
                        Yandex
                    </button>
                </div>

                <div className="flex flex-col justify-center items-start md:grid grid-cols-2 w-full gap-5">
                    {/* Gmail */}
                    {selectedProvider === "all" || selectedProvider === "gmail" ? (
                        <>
                            <GmailSection
                                accountEmail="dcruzjovita651@gmail.com"
                                ageOfEmail="3 Years Old"
                                selectedTab={selectedTabGmailUser1}
                                setSelectedTab={setSelectedTabGmailUser1}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[0]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                            <GmailSection
                                accountEmail="doctsashawn@gmail.com"
                                ageOfEmail="5 Years Old"
                                selectedTab={selectedTabGmailUser2}
                                setSelectedTab={setSelectedTabGmailUser2}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[1]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                            <GmailSection
                                accountEmail="foodazmaofficial@gmail.com"
                                ageOfEmail="8 Years Old"
                                selectedTab={selectedTabGmailUser3}
                                setSelectedTab={setSelectedTabGmailUser3}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[2]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                            <GmailSection
                                accountEmail="stellajamsonusa@gmail.com"
                                ageOfEmail="6 Years Old"
                                selectedTab={selectedTabGmailUser4}
                                setSelectedTab={setSelectedTabGmailUser4}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[3]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                            <GmailSection
                                accountEmail="thomasadward5@gmail.com"
                                ageOfEmail="2 Years Old"
                                selectedTab={selectedTabGmailUser5}
                                setSelectedTab={setSelectedTabGmailUser5}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[4]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                            <GmailSection
                                accountEmail="watsonjetpeter@gmail.com"
                                ageOfEmail="5 Years Old"
                                selectedTab={selectedTabGmailUser6}
                                setSelectedTab={setSelectedTabGmailUser6}
                                tabs={gmailTabs}
                                filteredTabResults={filteredEmails.gmail[5]}
                                image={GmailImage}
                                isRealtimeLoader={isRealtimeLoadingGmail}
                                setSearchQuery={setSearchQuery}
                                isFirstReloadGmail={isFirstReloadGmail}
                                isLoadingGmail={isLoadingGmail && isFirstReloadGmail}
                            />
                        </>
                    ) : null}

                    {/* YAHOO */}
                    {selectedProvider === "all" || selectedProvider === "yahoo" ? (
                        <>
                            <EmailSection
                                accountEmail="syedtestm@yahoo.com"
                                ageOfEmail="4 Years Old"
                                selectedTab={selectedTabYahooUser1}
                                setSelectedTab={setSelectedTabYahooUser1}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.yahoo[0]}
                                image={YahooImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                            <EmailSection
                                accountEmail="vexabyteofficial@yahoo.com"
                                ageOfEmail="8 Years Old"
                                selectedTab={selectedTabYahooUser2}
                                setSelectedTab={setSelectedTabYahooUser2}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.yahoo[1]}
                                image={YahooImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                        </>
                    ) : null}

                    {/* ZOHO */}
                    {selectedProvider === "all" || selectedProvider === "zoho" ? (
                        <>
                            <EmailSection
                                accountEmail="jamie_roberts@zohomail.in"
                                ageOfEmail="6 Years Old"
                                selectedTab={selectedTabZohoUser1}
                                setSelectedTab={setSelectedTabZohoUser1}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.zoho[0]}
                                image={ZohoImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                            <EmailSection
                                accountEmail="rollyriders@zohomail.in"
                                ageOfEmail="4 Years Old"
                                selectedTab={selectedTabZohoUser2}
                                setSelectedTab={setSelectedTabZohoUser2}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.zoho[1]}
                                image={ZohoImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                            <EmailSection
                                accountEmail="pollywilmar@zohomail.in"
                                ageOfEmail="7 Years Old"
                                selectedTab={selectedTabZohoUser3}
                                setSelectedTab={setSelectedTabZohoUser3}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.zoho[2]}
                                image={ZohoImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                        </>
                    ) : null}

                    {/* YANDEX */}
                    {selectedProvider === "all" || selectedProvider === "yandex" ? (
                        <>
                            <EmailSection
                                accountEmail="awesome.jamii@yandex.com"
                                ageOfEmail="5 Years Old"
                                selectedTab={selectedTabYandexUser1}
                                setSelectedTab={setSelectedTabYandexUser1}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.yandex[0]}
                                image={YandexImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                            <EmailSection
                                accountEmail="boudreauryan@yandex.com"
                                ageOfEmail="2 Years Old"
                                selectedTab={selectedTabYandexUser2}
                                setSelectedTab={setSelectedTabYandexUser2}
                                tabs={tabs}
                                filteredTabResults={filteredEmails.yandex[1]}
                                image={YandexImage}
                                isLoading={isLoading && isFirstLoad}
                                isRealtimeLoader={isRealtimeLoader}
                                setSearchQuery={setSearchQuery}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

function GmailSection({
    accountEmail,
    ageOfEmail,
    selectedTab,
    setSelectedTab,
    tabs,
    filteredTabResults,
    image,
    isRealtimeLoader,
    setSearchQuery,
    isFirstReloadGmail,
    isLoadingGmail,
}: {
    accountEmail: string;
    ageOfEmail: string;
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: { label: string; value: string }[];
    filteredTabResults: { name: string; email: string; maskedEmail: string; subject: string; status: string; date: Date }[];
    image: any;
    isRealtimeLoader: boolean;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    isFirstReloadGmail: boolean;
    isLoadingGmail: boolean;
}) {
    return (
        <div
            className={`w-full shadow-lg rounded-lg p-3 mb-2 
        ${selectedTab === "Primary" ? "bg-green-50" :
                    selectedTab === "Spam" ? "bg-red-50" :
                        selectedTab === "Promotions" ? "bg-purple-50" :
                            selectedTab === "Social" ? "bg-yellow-50" :
                                selectedTab === "Updates" ? "bg-orange-50" : "bg-blue-50"}`}
        >
            <div className="text-center mb-1">
                <h2 className="text-[15px] sm:text-lg font-bold text-gray-800">
                    Gmail Results for:{" "}
                    <span className={`${selectedTab === "Primary" ? "text-green-500" :
                        selectedTab === "Spam" ? "text-red-500" :
                            selectedTab === "Promotions" ? "text-purple-500" :
                                selectedTab === "Social" ? "text-yellow-500" :
                                    selectedTab === "Updates" ? "text-orange-500" : "text-blue-500"}`}>
                        {accountEmail}
                    </span>
                </h2>

                <p className={`${selectedTab === "Primary" ? "text-green-500" :
                    selectedTab === "Spam" ? "text-red-500" :
                        selectedTab === "Promotions" ? "text-purple-500" :
                            selectedTab === "Social" ? "text-yellow-500" :
                                selectedTab === "Updates" ? "text-orange-500" : "text-blue-500"} text-[12px] sm:text-[14px] font-semibold`}>
                    {ageOfEmail}
                </p>
            </div>

            {/* Realtime Loader */}
            <div className="flex justify-end items-end mb-2">
                {isRealtimeLoader ? (
                    <motion.div
                        className={`${selectedTab === "Primary" ? "text-green-500" :
                            selectedTab === "Spam" ? "text-red-500" :
                                selectedTab === "Promotions" ? "text-purple-500" :
                                    selectedTab === "Social" ? "text-yellow-500" :
                                        selectedTab === "Updates" ? "text-orange-500" : "text-blue-500"} flex justify-center items-center`}
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
                        className={`${selectedTab === "Primary" ? "text-green-500" :
                            selectedTab === "Spam" ? "text-red-500" :
                                selectedTab === "Promotions" ? "text-purple-500" :
                                    selectedTab === "Social" ? "text-yellow-500" :
                                        selectedTab === "Updates" ? "text-orange-500" : "text-blue-500"} flex justify-center items-center`}
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

            <div className="flex justify-between rounded-lg shadow-inner mb-6 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setSelectedTab(tab.value)}
                        className={`flex-1 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${selectedTab === tab.value
                            ? tab.value === "All" ? "bg-blue-500 text-white shadow-md" :
                                tab.value === "Primary" ? "bg-green-500 text-white shadow-md" :
                                    tab.value === "Spam" ? "bg-red-500 text-white shadow-md" :
                                        tab.value === "Promotions" ? "bg-purple-500 text-white shadow-md" :
                                            tab.value === "Social" ? "bg-yellow-500 text-white shadow-md" :
                                                tab.value === "Updates" ? "bg-orange-500 text-white shadow-md" : ""
                            : "bg-white text-gray-800 hover:bg-gray-200"}`}
                    >
                        {tab.label === "Primary" ? "Inbox" : tab.label}
                    </button>
                ))}
            </div>

            <div
                className={`space-y-4 p-3 rounded-lg shadow-md ${selectedTab === "Primary" ? "bg-green-100" :
                    selectedTab === "Spam" ? "bg-red-100" :
                        selectedTab === "Promotions" ? "bg-purple-100" :
                            selectedTab === "Social" ? "bg-yellow-100" :
                                selectedTab === "Updates" ? "bg-orange-100" : "bg-blue-100"}`}
            >
                {isLoadingGmail ? (
                    <motion.div
                        className="flex justify-center items-center h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaSpinner
                            className={`animate-spin text-2xl ${selectedTab === "Primary" ? "text-green-500" :
                                selectedTab === "Spam" ? "text-red-500" :
                                    selectedTab === "Promotions" ? "text-purple-500" :
                                        selectedTab === "Social" ? "text-yellow-500" :
                                            selectedTab === "Updates" ? "text-orange-500" : "text-blue-500"}`}
                        />
                    </motion.div>
                ) : filteredTabResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                        <AnimatePresence>
                            {filteredTabResults.map((result, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => {
                                        const spoofName = result.name?.split('<')[0]?.trim() || "Unknown Sender";
                                        setSearchQuery(spoofName);
                                    }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col sm:flex-row items-center justify-between bg-white duration-300 hover:bg-gray-200 cursor-pointer p-4 rounded-lg shadow gap-3 sm:gap-0 w-full mb-2"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={image}
                                                alt="Gmail logo"
                                                fill={true}
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start">
                                            <p className="text-[13px] text-center sm:text-start font-medium text-gray-800">
                                                {(() => {
                                                    const match = result.name?.match(/^(.*?)<(.*)>$/);
                                                    const spoofName = match?.[1]?.trim() || "Unknown Sender";
                                                    const email = match?.[2] || result.email || "Unknown Email";

                                                    // Mask the part between @ and the last dot
                                                    const maskedEmail = email.replace(/@(.*?)(\..*)$/, (_, domain, tld) => `@***${tld}`);

                                                    return `${spoofName}, ${maskedEmail}`;
                                                })()}
                                            </p>
                                            <p className="text-[12px] text-center sm:text-start text-gray-500">
                                                {result.subject || "No Subject"}
                                            </p>
                                            <p className="text-[12px] text-center sm:text-start text-gray-500">
                                                {new Date(result.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse justify-end items-center gap-1">
                                        {/* Status Badge */}
                                        <motion.span
                                            key={result.status}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`px-2 py-1 text-[12px] rounded-md w-full sm:w-auto text-white ${result.status === "primary" ? "bg-green-500" :
                                                result.status === "spam" ? "bg-red-500" :
                                                    result.status === "promotions" ? "bg-purple-500" :
                                                        result.status === "social" ? "bg-yellow-500" :
                                                            result.status === "updates" ? "bg-orange-500" : "bg-blue-500"
                                                }`}
                                        >
                                            {result.status === "primary" ? "Primary Inbox" : result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                                        </motion.span>
                                        {/* Status Badge for Updates, Social, or Promotions */}
                                        {(result.status === "updates" || result.status === "social" || result.status === "promotions") && (
                                            <motion.span
                                                key={`${result.status}-inbox`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`px-2 py-1 text-[12px] rounded-md w-full sm:w-auto text-white bg-green-500`}
                                            >
                                                Inbox
                                            </motion.span>
                                        )}
                                    </div>
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
    setSearchQuery,
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
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div
            className={`w-full shadow-lg rounded-lg p-3 mb-2 
            ${selectedTab === "All"
                    ? "bg-blue-50"
                    : selectedTab === "Inbox"
                        ? "bg-green-50"
                        : "bg-red-50"}`}
        >
            <div className="text-center mb-1">
                <h2 className="text-[15px] sm:text-lg font-bold text-gray-800">
                    Results for:{" "}
                    <span className={`${selectedTab === "All"
                        ? "text-blue-500"
                        : selectedTab === "Inbox"
                            ? "text-green-500"
                            : "text-red-500"}`}>
                        {accountEmail}
                    </span>
                </h2>

                <p className={`${selectedTab === "All"
                    ? "text-blue-500"
                    : selectedTab === "Inbox"
                        ? "text-green-500"
                        : "text-red-500"} text-[12px] sm:text-[14px] font-semibold`}>
                    {ageOfEmail}
                </p>
            </div>

            {/* Realtime Loader */}
            <div className="flex justify-end items-end mb-2">
                {isRealtimeLoader ? (
                    <motion.div
                        className={`${selectedTab === "All"
                            ? "text-blue-500"
                            : selectedTab === "Inbox"
                                ? "text-green-500"
                                : "text-red-500"} flex justify-center items-center`}
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
                        className={`${selectedTab === "All"
                            ? "text-blue-500"
                            : selectedTab === "Inbox"
                                ? "text-green-500"
                                : "text-red-500"} flex justify-center items-center`}
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
                        className={`flex-1 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${selectedTab === tab.value
                            ? tab.value === "All"
                                ? "bg-blue-500 text-white shadow-md"
                                : tab.value === "Inbox"
                                    ? "bg-green-500 text-white shadow-md"
                                    : "bg-red-500 text-white shadow-md"
                            : "bg-white text-gray-800 hover:bg-gray-200"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                className={`space-y-4 p-3 rounded-lg shadow-md ${selectedTab === "All"
                    ? "bg-blue-100"
                    : selectedTab === "Inbox"
                        ? "bg-green-100"
                        : "bg-red-100"}`}
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
                            className={`animate-spin text-2xl ${selectedTab === "All"
                                ? "text-blue-500"
                                : selectedTab === "Inbox"
                                    ? "text-green-500"
                                    : "text-red-500"}`}
                        />
                    </motion.div>
                ) : filteredTabResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                        <AnimatePresence>
                            {filteredTabResults.map((result, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setSearchQuery(result.name || "Unknown Sender")}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col sm:flex-row items-center justify-between bg-white duration-300 hover:bg-gray-200 cursor-pointer p-4 rounded-lg shadow gap-3 sm:gap-0 w-full mb-2"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={image}
                                                alt={`${accountEmail.includes("@yahoo.com") ? "Yahoo" : "Gmail"} logo`}
                                                fill={true}
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start">
                                            <p className="text-[13px] text-center sm:text-start font-medium text-gray-800">
                                                {result.name || "Unknown Sender"}, {result.maskedEmail || "Unknown Email"}
                                            </p>
                                            <p className="text-[12px] text-center sm:text-start text-gray-500">
                                                {result.subject || "No Subject"}
                                            </p>
                                            <p className="text-[12px] text-center sm:text-start text-gray-500">
                                                {new Date(result.date).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Status Badge */}
                                    <motion.span
                                        key={result.status}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`px-2 py-1 text-[12px] rounded-md w-full sm:w-auto text-white ${selectedTab === "All"
                                            ? result.status === "Inbox"
                                                ? "bg-green-500"
                                                : result.status === "Spam"
                                                    ? "bg-red-500"
                                                    : "bg-blue-500"
                                            : selectedTab === "Inbox"
                                                ? "bg-green-500"
                                                : "bg-red-500"
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
