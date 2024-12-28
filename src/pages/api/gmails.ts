import { NextApiRequest, NextApiResponse } from "next";
import { fetchGmailMessages } from "@/services/gmailService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const gmailAccounts = [
                "dcruzjovita651-token.json",
                "doctsashawn-token.json",
                "foodazmaofficial-token.json",
                "stellajamsonusa-token.json",
                "thomasadward5-token.json",
                "watsonjetpeter-token.json",
            ];

            const gmailResults: Record<string, any> = {};

            for (const account of gmailAccounts) {
                gmailResults[account] = {
                    primary: await fetchGmailMessages(account, "category:primary"),
                    social: await fetchGmailMessages(account, "category:social"),
                    promotions: await fetchGmailMessages(account, "category:promotions"),
                    updates: await fetchGmailMessages(account, "category:updates"),
                    spam: await fetchGmailMessages(account, "label:spam"),
                };
            }

            res.status(200).json({ success: true, gmailResults });
        } catch (error) {
            console.error("Error in Gmail API handler:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch Gmail messages.",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
