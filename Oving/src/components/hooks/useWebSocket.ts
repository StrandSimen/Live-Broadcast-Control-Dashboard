import type { StreamCard } from "../../type";
import { useState, useEffect } from 'react';
import '../websocket/websocket';


export const useWebSocket = (url: string, initialData: StreamCard[]) => {
    const [streams, setStreams] = useState(initialData);
    
        useEffect(() => {
            const socket = new WebSocket("ws://localhost:8080");
    
            socket.onmessage = (event) => {
                const updateStreams = JSON.parse(event.data);
                setStreams(updateStreams);
            };
    
            return () => {
                socket.close();
            };
    
        }, [url]);

        return streams;
}
