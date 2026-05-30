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

export type Alarm = {
    id: string;
    type: "latency" | "packetLoss" | "bitrate" | "disconnect";
    severity: "warning" | "critical";
    streamId: string;
    streamName: string;
    timestamp: number;
    acknowledged: boolean;
};