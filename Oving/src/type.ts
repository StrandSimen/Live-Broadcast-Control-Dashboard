export type StreamCard = {
    id: string;
    name: string;
    status?: "healthy" | "degraded" | "unhealthy" | "offline";
    bitrate: number;
    latency: number;
    packetLoss: number;
    uptime?: number;
    region: string;
}