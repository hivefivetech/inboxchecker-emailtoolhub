import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForAllGmail } from "@/services/imapServiceGmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["Inbox", "[Gmail]/Spam"];
            const emails = await fetchEmailsForAllGmail(folders);
            res.status(200).json({ success: true, emails });
        } catch (error) {
            console.error("Error fetching Gmail emails:", error);
            res.status(500).json({ success: false, message: "Failed to fetch Gmail emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
