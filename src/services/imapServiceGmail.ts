import { ImapFlow } from "imapflow";
import * as dotenv from "dotenv";

dotenv.config();

interface Email {
    subject: string;
    from: { name?: string; address: string };
    date: Date;
    status: string;
}

async function fetchEmailsForGmail(user: string, pass: string, folders: string[]): Promise<Email[]> {
    if (!user || !pass) throw new Error(`User or password missing for Gmail account: ${user}`);

    const client = new ImapFlow({
        host: "imap.gmail.com",
        port: 993,
        secure: true,
        auth: { user, pass },
    });

    await client.connect();
    const allEmails: Email[] = [];

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
    return allEmails.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function fetchEmailsForAllGmail(folders: string[] = ["Inbox", "[Gmail]/Spam"]) {
    const accounts = [
        { user: process.env.IMAP_USER_GMAIL_FIRST!, pass: process.env.IMAP_PASSWORD_GMAIL_FIRST!, label: "gmailuser1" },
        { user: process.env.IMAP_USER_GMAIL_SECOND!, pass: process.env.IMAP_PASSWORD_GMAIL_SECOND!, label: "gmailuser2" },
        { user: process.env.IMAP_USER_GMAIL_THIRD!, pass: process.env.IMAP_PASSWORD_GMAIL_THIRD!, label: "gmailuser3" },
        { user: process.env.IMAP_USER_GMAIL_FOURTH!, pass: process.env.IMAP_PASSWORD_GMAIL_FOURTH!, label: "gmailuser4" },
        { user: process.env.IMAP_USER_GMAIL_FIFTH!, pass: process.env.IMAP_PASSWORD_GMAIL_FIFTH!, label: "gmailuser5" },
        { user: process.env.IMAP_USER_GMAIL_SIXTH!, pass: process.env.IMAP_PASSWORD_GMAIL_SIXTH!, label: "gmailuser6" },
        { user: process.env.IMAP_USER_GMAIL_SEVENTH!, pass: process.env.IMAP_PASSWORD_GMAIL_SEVENTH!, label: "gmailuser7" },
    ];

    const results = await Promise.all(
        accounts.map(async (account) => {
            try {
                const emails = await fetchEmailsForGmail(account.user, account.pass, folders);
                return { [account.label]: emails };
            } catch (error) {
                console.error(`Error fetching Gmail emails for ${account.label}:`, error);
                return { [account.label]: [] };
            }
        })
    );

    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}
