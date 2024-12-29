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
                origin: "*", // Replace with your frontend URL in production
                methods: ["GET", "POST"],
            },
        });

        let activeUsers = 0;

        io.on("connection", (socket) => {
            activeUsers++;
            io.emit("activeUsers", activeUsers);

            console.log(`User connected. Total users: ${activeUsers}`);

            socket.on("disconnect", () => {
                activeUsers--;
                io.emit("activeUsers", activeUsers);
                console.log(`User disconnected. Total users: ${activeUsers}`);
            });
        });

        socket.server.io = io;
        console.log("Socket.IO server initialized");
    } else {
        console.log("Socket.IO server already running");
    }

    res.end();
}
