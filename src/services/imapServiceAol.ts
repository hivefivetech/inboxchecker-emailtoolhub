import { ImapFlow } from "imapflow";
import * as dotenv from "dotenv";

dotenv.config();

export async function fetchEmailsForAol(folders: string[] = ["Inbox", "Bulk"]) {
    const accounts = [
        { user: process.env.IMAP_USER_AOL_FIRST!, pass: process.env.IMAP_PASSWORD_AOL_FIRST!, label: "aoluser1" },
    ];

    const results = await Promise.all(
        accounts.map(async (account) => {
            try {
                const client = new ImapFlow({
                    host: "imap.aol.com",
                    port: 993,
                    secure: true,
                    auth: { user: account.user, pass: account.pass },
                });

                await client.connect();

                // List and log all available folders
                const mailboxes = await client.list();
                mailboxes.forEach(mailbox => {
                    console.log(`Found folder: ${mailbox.path}`);
                });

                // Proceed with fetching emails as before
                const allEmails: any[] = [];

                for (const folder of folders) {
                    const lock = await client.getMailboxLock(folder);
                    try {
                        const status = await client.status(folder, { messages: true });
                        const totalMessages = status.messages ?? 0;
                        if (totalMessages === 0) continue;

                        const fetchRange = totalMessages > 5 ? `${totalMessages - 4}:*` : `1:*`;

                        for await (const message of client.fetch(fetchRange, { envelope: true })) {
                            allEmails.push({
                                subject: message.envelope.subject || "No Subject",
                                from: {
                                    name: message.envelope.from?.[0]?.name || "Unknown Sender",
                                    address: message.envelope.from?.[0]?.address || "Unknown Address",
                                },
                                date: new Date(message.envelope.date || new Date()),
                                status: folder.toLowerCase().includes("bulk") ? "Spam" : "Inbox",
                            });
                        }
                    } finally {
                        lock.release();
                    }
                }

                await client.logout();
                return { [account.label]: allEmails.sort((a, b) => b.date.getTime() - a.date.getTime()) };
            } catch (error) {
                console.error(`Error fetching Aol emails for ${account.label}:`, error);
                return { [account.label]: [] };
            }
        })
    );

    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}
