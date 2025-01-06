import { ImapFlow } from "imapflow";
import * as dotenv from "dotenv";

dotenv.config();

export async function fetchEmailsForYandex(folders: string[] = ["Inbox", "Spam"]) {
    const accounts = [
        { user: process.env.IMAP_USER_YANDEX_FIRST!, pass: process.env.IMAP_PASSWORD_YANDEX_FIRST!, label: "yandexuser1" },
        { user: process.env.IMAP_USER_YANDEX_SECOND!, pass: process.env.IMAP_PASSWORD_YANDEX_SECOND!, label: "yandexuser2" },
    ];

    const results = await Promise.all(
        accounts.map(async (account) => {
            try {
                const client = new ImapFlow({
                    host: "imap.yandex.com",
                    port: 993,
                    secure: true,
                    auth: { user: account.user, pass: account.pass },
                });

                await client.connect();
                const allEmails: any[] = [];

                for (const folder of folders) {
                    const lock = await client.getMailboxLock(folder);
                    try {
                        const status = await client.status(folder, { messages: true });
                        const totalMessages = status.messages ?? 0;
                        if (totalMessages === 0) continue;

                        const fetchRange = totalMessages > 5 ? `${totalMessages - 4}:*` : "1:*";

                        for await (const message of client.fetch(fetchRange, { envelope: true })) {
                            allEmails.push({
                                subject: message.envelope.subject || "No Subject",
                                from: {
                                    name: message.envelope.from?.[0]?.name || "Unknown Sender",
                                    address: message.envelope.from?.[0]?.address || "Unknown Address",
                                },
                                date: new Date(message.envelope.date || new Date()),
                                status: folder.toLowerCase().includes("spam") ? "Spam" : "Inbox",
                            });
                        }
                    } finally {
                        lock.release();
                    }
                }

                await client.logout();
                return { [account.label]: allEmails.sort((a, b) => b.date.getTime() - a.date.getTime()) };
            } catch (error) {
                console.error(`Error fetching Yandex emails for ${account.label}:`, error);
                return { [account.label]: [] };
            }
        })
    );

    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}
