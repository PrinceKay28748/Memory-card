export default function GameOverModal({
  won, score, bestScore, total, onPlayAgain, onNewImages,
}) {
  const isNewBest = score === bestScore && score > 0;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-icon">{won ? "✦" : "○"}</div>

        <h2 className="modal-title">
          {won ? "Perfect run." : "Duplicate selected."}
        </h2>

        <p className="modal-sub">
          {won
            ? `You identified all ${total} images without repeating.`
            : `You scored ${score} before selecting a repeat.`}
        </p>

        {isNewBest && !won && (
          <div className="modal-badge">New best score</div>
        )}

        <div className="modal-stats">
          <div className="modal-stat">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className="modal-stat-divider" />
          <div className="modal-stat">
            <span>Best</span>
            <strong>{bestScore}</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn--primary" onClick={onPlayAgain}>
            Play again
          </button>
          <button className="btn btn--ghost" onClick={onNewImages}>
            New images
          </button>
        </div>
      </div>
    </div>
  );
}