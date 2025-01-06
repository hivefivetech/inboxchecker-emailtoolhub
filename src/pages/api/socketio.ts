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

        const activeUsersPerIP: Record<string, number> = {}; // Track users per IP

        io.on("connection", (socket) => {
            const ip = socket.handshake.address;

            if (!activeUsersPerIP[ip]) {
                activeUsersPerIP[ip] = 1;
            } else {
                activeUsersPerIP[ip]++;
            }

            const uniqueUsers = Object.keys(activeUsersPerIP).length;
            io.emit("activeUsers", uniqueUsers);

            console.log(`User connected from ${ip}. Unique users: ${uniqueUsers}`);

            socket.on("disconnect", () => {
                if (activeUsersPerIP[ip]) {
                    activeUsersPerIP[ip]--;
                    if (activeUsersPerIP[ip] === 0) delete activeUsersPerIP[ip];
                }

                const uniqueUsers = Object.keys(activeUsersPerIP).length;
                io.emit("activeUsers", uniqueUsers);

                console.log(`User disconnected from ${ip}. Unique users: ${uniqueUsers}`);
            });
        });

        socket.server.io = io;
        console.log("Socket.IO server initialized");
    } else {
        console.log("Socket.IO server already running");
    }

    res.end();
}
