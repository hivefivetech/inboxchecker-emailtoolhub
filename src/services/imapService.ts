import { ImapFlow } from "imapflow";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

interface Email {
    subject: string;
    from: { name?: string; address: string };
    date: Date;
    status: string;
}

/**
 * Fetch emails for a single account.
 * @param user - Email user.
 * @param pass - Email password.
 * @param folders - Array of folders to fetch emails from.
 * @returns Promise<Email[]> - Array of emails.
 */
async function fetchEmailsForAccount(user: string, pass: string, folders: string[]): Promise<Email[]> {
    if (!user || !pass) {
        throw new Error(`User or password is undefined for account: ${user}`);
    }

    const imapConfig = {
        host: user.includes("@yahoo.com")
            ? "imap.mail.yahoo.com"
            : user.includes("@zohomail.in") || user.includes("@zoho.com")
                ? "imap.zoho.in"
                : user.includes("@yandex.com") || user.includes("@yandex.ru")
                    ? "imap.yandex.com"
                    : "imap.gmail.com",
        port: 993,
        secure: true,
        auth: { user, pass },
    };

    const client = new ImapFlow(imapConfig);

    try {
        await client.connect();

        const allEmails: Email[] = [];
        for (const folder of folders) {
            const lock = await client.getMailboxLock(folder);
            try {
                console.log(`Fetching emails from folder: ${folder} for user: ${user}`);

                const status = await client.status(folder, { messages: true });
                if (status.messages === 0) {
                    console.log(`No emails found in folder: ${folder}`);
                    continue;
                }

                const start = Math.max(1, (status.messages ?? 0) - 5); // Fetch the last 5 emails
                const range = `${start}:${status.messages}`;

                for await (const message of client.fetch(range, { envelope: true })) {
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

        return allEmails.sort((a, b) => b.date.getTime() - a.date.getTime());
    } catch (error) {
        console.error(`Error fetching emails for user ${user}:`, error);
        return [];
    } finally {
        await client.logout();
    }
}

/**
 * Fetch emails for all accounts.
 * @param folders - Array of folders to fetch emails from.
 * @returns Promise<object> - Emails grouped by account.
 */
export async function fetchEmailsForBothAccounts(folders: string[] = ["INBOX", "Spam"]) {
    const accounts = [
        {
            user: process.env.IMAP_USER_YAHOO_FIRST!,
            pass: process.env.IMAP_PASSWORD_YAHOO_FIRST!,
            folders: ["Inbox", "Bulk"],
            label: "yahoouser1",
        },
        {
            user: process.env.IMAP_USER_YAHOO_SECOND!,
            pass: process.env.IMAP_PASSWORD_YAHOO_SECOND!,
            folders: ["Inbox", "Bulk"],
            label: "yahoouser2",
        },
        {
            user: process.env.IMAP_USER_ZOHO_FIRST!,
            pass: process.env.IMAP_PASSWORD_ZOHO_FIRST!,
            folders: ["Inbox", "Spam"],
            label: "zohouser1",
        },
        {
            user: process.env.IMAP_USER_ZOHO_SECOND!,
            pass: process.env.IMAP_PASSWORD_ZOHO_SECOND!,
            folders: ["Inbox", "Spam"],
            label: "zohouser2",
        },
        {
            user: process.env.IMAP_USER_ZOHO_THIRD!,
            pass: process.env.IMAP_PASSWORD_ZOHO_THIRD!,
            folders: ["Inbox", "Spam"],
            label: "zohouser3",
        },
        {
            user: process.env.IMAP_USER_YANDEX_FIRST!,
            pass: process.env.IMAP_PASSWORD_YANDEX_FIRST!,
            folders: ["Inbox", "Spam"],
            label: "yandexuser1",
        },
        {
            user: process.env.IMAP_USER_YANDEX_SECOND!,
            pass: process.env.IMAP_PASSWORD_YANDEX_SECOND!,
            folders: ["Inbox", "Spam"],
            label: "yandexuser2",
        },
    ];

    const results = await Promise.all(
        accounts.map(async (account) => {
            try {
                const emails = await fetchEmailsForAccount(account.user, account.pass, account.folders);
                return { [account.label]: emails };
            } catch (error) {
                console.error(`Error fetching emails for ${account.label}:`, error);
                return { [account.label]: [] };
            }
        })
    );

    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}
