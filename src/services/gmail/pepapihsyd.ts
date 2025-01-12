import { google } from "googleapis";
import { readFileSync, existsSync } from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH!;
const tokensDir = path.join(process.cwd(), "tokens");

const credentials = JSON.parse(readFileSync(credentialsPath, "utf-8"));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;

export function getOAuthClientForPepapihsyd() {
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const tokenPath = path.join(tokensDir, "pepapihsyd-token.json");

    if (!existsSync(tokenPath)) {
        throw new Error("⚠️ No token file found for pepapihsyd. Please authenticate.");
    }

    const tokens = JSON.parse(readFileSync(tokenPath, "utf-8"));
    if (!tokens.refresh_token) {
        throw new Error("⚠️ No refresh token found for pepapihsyd. Re-authenticate to get one.");
    }

    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}

export async function getGmailClientForPepapihsyd() {
    const oauth2Client = getOAuthClientForPepapihsyd();
    return google.gmail({ version: "v1", auth: oauth2Client });
}
