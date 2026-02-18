import { useState } from "react";

export default function Card({ card, clicked, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      className={`card ${clicked ? "card-seen" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Select ${card.title}`}
    >
      <div className="card-img-wrap">
        {!imgLoaded && <div className="card-placeholder" />}
        <img
          src={card.image}
          alt={card.title}
          className="card-img"
          style={{ opacity: imgLoaded ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />
      </div>
      <div className="card-body">
        <p className="card-title">{card.title}</p>
        <span className="card-date">{card.date}</span>

      </div>
    </article>
  );
}
