export type StreamCard = {
    id: string;
    name: string;
    status: "healthy" | "degraded" | "unhealthy";
    bitrate: number;
    latency: number;
    packetLoss: number;
    uptime: string;
    region: string;
}