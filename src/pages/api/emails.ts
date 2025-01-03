import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForBothAccounts } from "@/services/imapService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["INBOX", "[Gmail]/Spam"];
            res.writeHead(200, { "Content-Type": "application/json" });

            fetchEmailsForBothAccounts(folders).then((emails) => {
                res.end(JSON.stringify({ success: true, emails }));
            }).catch((error) => {
                console.error("Error in API handler:", error);
                res.end(JSON.stringify({ success: false, message: "Failed to fetch emails." }));
            });
            return;
        } catch (error) {
            console.error("Error in API handler:", error);
            res.status(500).json({ success: false, message: "Failed to fetch emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
