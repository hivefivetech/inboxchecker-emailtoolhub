import { NextApiRequest, NextApiResponse } from "next";
import { getGmailClientForfoodazmaofficial } from "@/services/gmail/foodazmaofficial";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const gmail = await getGmailClientForfoodazmaofficial();

        const response = await gmail.users.messages.list({
            userId: "me",
            maxResults: 10,
            q: "label:inbox OR label:spam OR label:category_updates OR label:category_promotions OR label:category_social",
        });

        const messages = response.data.messages || [];
        if (messages.length === 0) {
            return res.status(200).json({ success: true, emails: [] });
        }

        const emails = await Promise.all(
            messages.map(async (msg) => {
                const detail = await gmail.users.messages.get({
                    userId: "me",
                    id: msg.id!,
                    format: "metadata",
                    metadataHeaders: ["From", "Subject", "Date"],
                });

                const headers = detail.data.payload?.headers || [];
                const subject = headers.find((h) => h.name === "Subject")?.value || "No Subject";
                const from = headers.find((h) => h.name === "From")?.value || "Unknown Sender";
                const date = headers.find((h) => h.name === "Date")?.value || "Unknown Date";

                const match = from.match(/<(.+?)>/);
                const senderEmail = match ? match[1] : from;

                const labels = detail.data.labelIds || [];
                let status = "Primary Inbox";

                if (labels.includes("SPAM")) {
                    status = "Spam";
                } else if (labels.includes("CATEGORY_PROMOTIONS")) {
                    status = "Promotions";
                } else if (labels.includes("CATEGORY_SOCIAL")) {
                    status = "Social";
                } else if (labels.includes("CATEGORY_UPDATES")) {
                    status = "Updates";
                }

                return {
                    id: msg.id,
                    subject,
                    senderName: from.replace(/<(.+?)>/, "").trim(),
                    senderEmail,
                    date,
                    labels,
                    status,
                };
            })
        );

        res.status(200).json({ success: true, emails });
    } catch (error) {
        console.error("Error fetching emails for foodazmaofficial:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
