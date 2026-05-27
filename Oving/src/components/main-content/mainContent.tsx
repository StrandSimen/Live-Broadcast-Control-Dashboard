import './mainContent.css';
import { cards } from '../data/cards';
import { StreamCard } from '../stream-card/streamCard';
import { useWebSocket } from '../hooks/useWebSocket';
import '../websocket/websocket';

export const MainContent = () => {
    const streams = useWebSocket("ws://localhost:8080", cards);

    return (
        <div className="main-content">
            <h3>Main Content</h3>
            <div className="card-container">
                {streams.map((card) => (
                    <StreamCard key={card.id} stream={card} />
                ))}
            </div>
        </div>
    )
}