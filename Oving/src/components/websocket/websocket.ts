import { Server } from "mock-socket";
import { cards } from "../data/cards";

const mockServer = new Server("ws://localhost:8080");

let offlineCardIndex = 0;

mockServer.on("connection", (socket) => {
    console.log("Mock client connected");

    setInterval(() => {

        const updatedCards = cards.map((card, index) => {
            if (index === offlineCardIndex) {
                return {
                    ...card,
                    bitrate: 0,
                    latency: 0,
                    packetLoss: 0,
                };
            }
            return {
                ...card,
                bitrate: +(Math.random() * 8 + 5).toFixed(1),
                latency: Math.floor(Math.random() * 50 + 20),
                packetLoss: +(Math.random() * 1).toFixed(2),
            };
        });

        offlineCardIndex = (offlineCardIndex + 1) % cards.length;

        socket.send(JSON.stringify(updatedCards));
        
    }, 10000); 
});