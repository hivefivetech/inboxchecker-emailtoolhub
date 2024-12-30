import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForBothAccounts } from "@/services/imapService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["Inbox", "Spam"];
            const emails = await fetchEmailsForBothAccounts(folders);
            res.status(200).json({ success: true, emails });
        } catch (error) {
            console.error("Error in API handler:", error);
            res.status(500).json({ success: false, message: "Failed to fetch emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
