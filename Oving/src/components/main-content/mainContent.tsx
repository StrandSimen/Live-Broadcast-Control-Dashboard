import './mainContent.css';

const cards = [
    { id: 1, title: 'Card 1', content: 'This is the content of card 1.' },
    { id: 2, title: 'Card 2', content: 'This is the content of card 2.' },
    { id: 3, title: 'Card 3', content: 'This is the content of card 3.' },
    { id: 4, title: 'Card 4', content: 'This is the content of card 4.' },
    { id: 5, title: 'Card 5', content: 'This is the content of card 5.' },
    { id: 6, title: 'Card 6', content: 'This is the content of card 6.' },
];


export const MainContent = () => {
    return (
        <div className="main-content">
            <h3>Main Content</h3>
            <div className="card-container">
                {cards.map((card) => (
                    <div key={card.id} className="card">
                        <h4>{card.title}</h4>
                        <p>{card.content}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}