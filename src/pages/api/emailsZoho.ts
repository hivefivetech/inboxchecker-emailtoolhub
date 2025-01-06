import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForZoho } from "@/services/imapServiceZoho";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["Inbox", "Spam"];
            const emails = await fetchEmailsForZoho(folders);
            res.status(200).json({ success: true, emails });
        } catch (error) {
            console.error("Error fetching Zoho emails:", error);
            res.status(500).json({ success: false, message: "Failed to fetch Zoho emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
