import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket } from "net";

// Extend the default Node.js HTTP server to include the `io` property
interface ExtendedServer extends HTTPServer {
    io?: Server;
}

// Extend the default Socket to include the `server` property
interface ExtendedSocket extends Socket {
    server: ExtendedServer;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const socket = res.socket as ExtendedSocket;

    if (!socket.server.io) {
        const io = new Server(socket.server, {
            path: "/api/socketio",
            cors: {
                origin: "*", // Replace with frontend URL in production
                methods: ["GET", "POST"],
            },
        });

        const activeUsersPerIP = new Map<string, Set<string>>(); // IP -> Set of socket IDs

        io.on("connection", (socket) => {
            // Extract IP properly from headers
            let ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
            
            // If multiple IPs are returned (common with proxies), take the first valid one
            if (Array.isArray(ip)) ip = ip[0];

            // Remove IPv6 localhost "::1" and normalize localhost IP
            if (!ip || ip === "::1" || ip === "127.0.0.1") ip = "localhost";

            console.log(`🔍 New connection detected from IP: ${ip}`);

            // Ensure correct counting for unique users per IP
            if (!activeUsersPerIP.has(ip)) {
                activeUsersPerIP.set(ip, new Set());
            }
            activeUsersPerIP.get(ip)?.add(socket.id);

            // Broadcast unique user count
            io.emit("activeUsers", activeUsersPerIP.size);
            console.log(`✅ Active Users Updated: ${activeUsersPerIP.size}`);

            // Handle disconnections properly
            socket.on("disconnect", () => {
                console.log(`❌ Disconnected: ${socket.id} from IP: ${ip}`);

                if (activeUsersPerIP.has(ip)) {
                    activeUsersPerIP.get(ip)?.delete(socket.id);
                    if (activeUsersPerIP.get(ip)?.size === 0) {
                        activeUsersPerIP.delete(ip);
                    }
                }

                io.emit("activeUsers", activeUsersPerIP.size);
                console.log(`🔻 Active Users Updated: ${activeUsersPerIP.size}`);
            });
        });

        socket.server.io = io;
        console.log("🚀 Socket.IO server initialized");
    } else {
        console.log("⚡ Socket.IO server already running");
    }

    res.end();
}
