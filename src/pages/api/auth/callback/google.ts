import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@/services/gmailAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ success: false, message: "Authorization code missing" });
        }

        const tokens = await getAccessToken(code as string);

        return res.status(200).json({ success: true, access_token: tokens.access_token, refresh_token: tokens.refresh_token });
    } catch (error) {
        console.error("Error exchanging code for tokens:", error);
        return res.status(500).json({ success: false, message: "Failed to exchange code for tokens" });
    }
}
