import { Server } from "mock-socket";
import { cards } from "../data/cards";

const mockServer = new Server("ws://localhost:8080");


mockServer.on("connection", (socket) => {
    console.log("Mock client connected");

    setInterval(() => {

        const updatedCards = cards.map(card => {
            return {
                ...card,
                bitrate: +(Math.random() * 8 + 5).toFixed(1), // 5-13 Mbps
                latency: Math.floor(Math.random() * 50 + 20), // 20-70 ms
                packetLoss: +(Math.random() * 1).toFixed(2), // 0-1%
            };
        });

        socket.send(JSON.stringify(updatedCards));
        
    }, 10000); 
});