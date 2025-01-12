import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUrl, getAccessToken } from "@/services/gmailAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return res.redirect(getAuthUrl());
    }

    if (req.method === "POST") {
        try {
            const { code } = req.body;
            const tokens = await getAccessToken(code);
            res.status(200).json({ success: true, tokens });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
