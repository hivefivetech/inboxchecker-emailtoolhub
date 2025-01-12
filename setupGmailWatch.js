const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
const tokensDir = path.resolve(__dirname, "tokens");

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;

function getOAuthClient(email) {
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // ✅ Fix token filename issue (Remove @gmail.com)
    const tokenPath = path.join(tokensDir, `${email.replace("@gmail.com", "")}-token.json`);

    if (!fs.existsSync(tokenPath)) {
        throw new Error(`⚠️ No token file found for ${email}. Please authenticate.`);
    }

    const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
    if (!tokens.refresh_token) {
        throw new Error(`⚠️ No refresh token found for ${email}. Re-authenticate to get one.`);
    }

    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}

async function setupGmailWatch(email) {
    try {
        const oauth2Client = getOAuthClient(email);
        const gmail = google.gmail({ version: "v1", auth: oauth2Client });

        const watchResponse = await gmail.users.watch({
            userId: "me",
            requestBody: {
                topicName: process.env.GOOGLE_PUBSUB_TOPIC,
                labelIds: ["INBOX", "SPAM", "CATEGORY_UPDATES", "CATEGORY_SOCIAL", "CATEGORY_PROMOTIONS"],
            },
        });

        console.log(`✅ Gmail Watch setup successful for ${email}:`, watchResponse.data);
    } catch (error) {
        console.error(`❌ Error setting up Gmail Watch for ${email}:`, error);
    }
}

// Run for a specific email (change this email to test)
const email = "dcruzjovita651@gmail.com";
setupGmailWatch(email);
