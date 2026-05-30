import './mainContent.css';
import { cards } from '../data/cards';
import { StreamCard } from '../stream-card/streamCard';
import { useWebSocket } from '../hooks/useWebSocket';
import '../websocket/websocket';
import {AlarmPanel} from '../alarm-panel/alarmPanel';
import { useEffect } from 'react';
import { useAlarm } from '../alarm-panel/alarmPanel';

export const MainContent = () => {
    const streams = useWebSocket("ws://localhost:8080", cards);
    const { detectAlarms} = useAlarm();

    useEffect(() => {
        detectAlarms(streams);
    }, [streams, detectAlarms]);

    return (
        <div className="main-content">
            <AlarmPanel />
            <h3>Main Content</h3>
            <div className="card-container">
                {streams.map((card) => (
                    <StreamCard key={card.id} stream={card} />
                ))}
            </div>
        </div>
    )
}