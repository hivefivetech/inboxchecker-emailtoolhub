import { google } from "googleapis";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH!;
const tokensDir = path.join(process.cwd(), "tokens");

const credentials = JSON.parse(readFileSync(credentialsPath, "utf-8"));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;

export function getOAuthClient(email: string) {
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const tokenPath = path.join(tokensDir, `${email}-token.json`);
    if (existsSync(tokenPath)) {
        const tokens = JSON.parse(readFileSync(tokenPath, "utf-8"));
        oauth2Client.setCredentials(tokens);
    }

    return oauth2Client;
}

export function getAuthUrl() {
    const scopes = [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.labels",
    ];
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]).generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });
}

export async function getAccessToken(code: string) {
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

export async function getGmailClient(email: string) {
    const oauth2Client = getOAuthClient(email);
    await oauth2Client.getAccessToken();
    return google.gmail({ version: "v1", auth: oauth2Client });
}
