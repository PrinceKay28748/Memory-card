import Card from "./Card";
export default function GameBoard({ cards, clickedIds, onCardClick }) {
  return (
    <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            clicked={clickedIds.has(card.id)}
            onClick={() => onCardClick(card.id)}
            />
        ))}
    </div>
  );
}