import { prismaClient } from "db/client";

Bun.serve({
    port: 8080,
    fetch(req, server) {
        if(server.upgrade(req)) {
            return;
        }
        return new Response("Upgrade failed", {status: 500})
    },
    websocket: {
        message (ws, message) {
            prismaClient.user.create({
                data: {
                    name: Math.random().toString(),
                    email: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message);
        },
    },
})