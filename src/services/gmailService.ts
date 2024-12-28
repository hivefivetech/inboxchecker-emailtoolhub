import { google } from "googleapis";
import fs from "fs";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

// Initialize OAuth2 Client
function initializeOAuth2Client(tokenFile: string) {
    const tokenPath = path.join(process.cwd(), `tokens/${tokenFile}`);
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    const { client_id, client_secret } = tokenData;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
    oAuth2Client.setCredentials(tokenData);
    return oAuth2Client;
}

// Fetch Gmail Messages for Specific Tab
export async function fetchGmailMessages(tokenFile: string, query = "") {
    const oAuth2Client = initializeOAuth2Client(tokenFile);
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    try {
        // Fetch the list of messages based on the query
        const response = await gmail.users.messages.list({
            userId: "me",
            maxResults: 5, // Fetch only the latest 5 emails
            q: query, // Query for specific tabs (e.g., category:primary)
        });

        const messages = response.data.messages || [];
        const messageDetails = [];

        // Fetch details for each message
        for (const message of messages) {
            const details = await gmail.users.messages.get({
                userId: "me",
                id: message.id!,
            });

            const email = {
                id: details.data.id,
                subject: details.data.payload?.headers?.find((h) => h.name === "Subject")?.value || "No Subject",
                from: {
                    name: details.data.payload?.headers?.find((h) => h.name === "From")?.value || "Unknown Sender",
                },
                date: details.data.payload?.headers?.find((h) => h.name === "Date")?.value || new Date(),
                snippet: details.data.snippet,
            };
            messageDetails.push(email);
        }
        return messageDetails;
    } catch (error) {
        console.error("Error fetching Gmail messages:", error);
        return [];
    }
}
