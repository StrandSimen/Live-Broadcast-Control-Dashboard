import './mainContent.css';
import { cards } from '../data/cards';
import { StreamCard } from '../stream-card/streamCard';


export const MainContent = () => {

    return (
        <div className="main-content">
            <h3>Main Content</h3>
            <div className="card-container">
                {cards.map((card) => (
                    <StreamCard key={card.id} stream={card} />
                ))}
            </div>
        </div>
    )
}