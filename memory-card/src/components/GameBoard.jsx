import Card from "./Card";
export default function GameBoard({ cards, clickedCards, onCardClick }) {
  return (
    <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            clicked={clickedCards.includes(card.id)}
            onClick={() => onCardClick(card.id)}
            />
        ))}
    </div>
  );
}