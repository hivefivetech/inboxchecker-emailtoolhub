import { NextApiRequest, NextApiResponse } from "next";
import { getGmailClient } from "@/services/gmailAuth";
import { readdirSync } from "fs";
import path from "path";

const tokensDir = path.join(process.cwd(), "tokens");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const tokenFiles = readdirSync(tokensDir).filter((file) => file.endsWith("-token.json"));
        if (tokenFiles.length === 0) {
            return res.status(400).json({ success: false, message: "No Gmail accounts found" });
        }

        const emailsByAccount: Record<string, any[]> = {};

        for (const tokenFile of tokenFiles) {
            const email = tokenFile.replace("-token.json", "");
            const gmail = await getGmailClient(email);

            try {
                const response = await gmail.users.messages.list({
                    userId: "me",
                    maxResults: 10,
                    q: "label:inbox OR label:spam OR label:category_updates OR label:category_promotions OR label:category_social",
                });

                const messages = response.data.messages || [];
                if (messages.length === 0) {
                    emailsByAccount[email] = [];
                    continue;
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
                        let status = "Primary Inbox"; // Default to Primary

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

                emailsByAccount[email] = emails;
            } catch (error) {
                console.error(`Error fetching emails for ${email}:`, error);
                emailsByAccount[email] = [];
            }
        }

        res.status(200).json({ success: true, emails: emailsByAccount });
    } catch (error) {
        console.error("Error fetching Gmail emails:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
