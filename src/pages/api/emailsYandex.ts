import { NextApiRequest, NextApiResponse } from "next";
import { fetchEmailsForYandex } from "@/services/imapServiceYandex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const folders = ["Inbox", "Spam"];
            const emails = await fetchEmailsForYandex(folders);
            res.status(200).json({ success: true, emails });
        } catch (error) {
            console.error("Error fetching Yandex emails:", error);
            res.status(500).json({ success: false, message: "Failed to fetch Yandex emails." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
