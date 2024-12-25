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
 * @param folders - Array of folders to fetch emails from (e.g., ["INBOX", "[Gmail]/Spam"]).
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
        auth: {
            user,
            pass,
        },
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

                const start = Math.max(1, (status.messages ?? 0) - 9);
                const range = `${start}:${status.messages}`;

                for await (const message of client.fetch(range, { envelope: true })) {
                    const emailDate = new Date(message.envelope.date || new Date());
                    allEmails.push({
                        subject: message.envelope.subject || "No Subject",
                        from: {
                            name: message.envelope.from[0]?.name || "Unknown Sender",
                            address: message.envelope.from[0]?.address || "Unknown Address",
                        },
                        date: emailDate,
                        status:
                            folder.toLowerCase().includes("spam") || folder.toLowerCase().includes("bulk")
                                ? "Spam"
                                : "Inbox",
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
 * Fetch emails for all accounts (Gmail + Yahoo).
 * @param folders - Array of folders to fetch emails from.
 * @returns Object containing emails for all accounts.
 */
export async function fetchEmailsForBothAccounts(folders: string[] = ["INBOX", "[Gmail]/Spam"]) {
    // Gmail
    const gmailuser1Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_FIRST!,
        process.env.IMAP_PASSWORD_GMAIL_FIRST!,
        folders
    );

    const gmailuser2Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_SECOND!,
        process.env.IMAP_PASSWORD_GMAIL_SECOND!,
        folders
    );

    const gmailuser3Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_THIRD!,
        process.env.IMAP_PASSWORD_GMAIL_THIRD!,
        folders
    );

    const gmailuser4Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_FOURTH!,
        process.env.IMAP_PASSWORD_GMAIL_FOURTH!,
        folders
    );

    const gmailuser5Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_FIFTH!,
        process.env.IMAP_PASSWORD_GMAIL_FIFTH!,
        folders
    );

    const gmailuser6Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_SIXTH!,
        process.env.IMAP_PASSWORD_GMAIL_SIXTH!,
        folders
    );

    const gmailuser7Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_GMAIL_SEVENTH!,
        process.env.IMAP_PASSWORD_GMAIL_SEVENTH!,
        folders
    );

    // Yahoo
    const yahooFolders = ["Inbox", "Bulk"];
    const yahoouser1Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_YAHOO_FIRST!,
        process.env.IMAP_PASSWORD_YAHOO_FIRST!,
        yahooFolders
    );

    const yahoouser2Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_YAHOO_SECOND!,
        process.env.IMAP_PASSWORD_YAHOO_SECOND!,
        yahooFolders
    );

    // Zoho
    const zohoFolders = ["Inbox", "Spam"];
    const zohouser1Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_ZOHO_FIRST!,
        process.env.IMAP_PASSWORD_ZOHO_FIRST!,
        zohoFolders
    );

    const zohouser2Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_ZOHO_SECOND!,
        process.env.IMAP_PASSWORD_ZOHO_SECOND!,
        zohoFolders
    );

    const zohouser3Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_ZOHO_THIRD!,
        process.env.IMAP_PASSWORD_ZOHO_THIRD!,
        zohoFolders
    );

    // Yandex
    const yandexFolders = ["Inbox", "Spam"];
    const yandexuser1Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_YANDEX_FIRST!,
        process.env.IMAP_PASSWORD_YANDEX_FIRST!,
        yandexFolders
    );

    const yandexuser2Emails = await fetchEmailsForAccount(
        process.env.IMAP_USER_YANDEX_SECOND!,
        process.env.IMAP_PASSWORD_YANDEX_SECOND!,
        yandexFolders
    );

    return {
        gmailuser1: gmailuser1Emails,
        gmailuser2: gmailuser2Emails,
        gmailuser3: gmailuser3Emails,
        gmailuser4: gmailuser4Emails,
        gmailuser5: gmailuser5Emails,
        gmailuser6: gmailuser6Emails,
        gmailuser7: gmailuser7Emails,
        yahoouser1: yahoouser1Emails,
        yahoouser2: yahoouser2Emails,
        zohouser1: zohouser1Emails,
        zohouser2: zohouser2Emails,
        zohouser3: zohouser3Emails,
        yandexuser1: yandexuser1Emails,
        yandexuser2: yandexuser2Emails,
    };
}
