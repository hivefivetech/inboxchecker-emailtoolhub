import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForAllGmail } from "@/services/imapServiceGmail";

let previousEmails: Record<string, any[]> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["Inbox", "[Gmail]/Spam"];
            const emails = await fetchEmailsForAllGmail(folders);
            if (Object.values(emails).every((list) => list.length === 0)) {
                res.status(200).json({ success: true, emails: previousEmails });
            } else {
                previousEmails = emails;
                res.status(200).json({ success: true, emails });
            }
        } catch (error) {
            console.error("Error fetching Gmail emails:", error);
            res.status(500).json({ success: false, message: "Failed to fetch Gmail emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
