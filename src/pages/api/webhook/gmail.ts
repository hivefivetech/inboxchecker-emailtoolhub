import { NextApiRequest, NextApiResponse } from "next";
import { PubSub } from "@google-cloud/pubsub";
import dotenv from "dotenv";

dotenv.config();

const pubsub = new PubSub();
const topicName = process.env.GOOGLE_PUBSUB_TOPIC!;
const subscriptionName = process.env.GOOGLE_PUBSUB_SUBSCRIPTION!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    console.log("Webhook received:", req.body);
    res.status(200).json({ success: true, message: "Webhook received" });
}
