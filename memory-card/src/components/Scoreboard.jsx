export default function ScoreBoard({ score, bestScore, total }) {
  const pct = (score / total) * 100;

  return (
    <div className="scoreboard">
      <div className="score-block">
        <span className="score-label">Score</span>
        <span className="score-num">{score}</span>
      </div>

      <div className="score-center">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-label">{score} / {total}</span>
      </div>

      <div className="score-block score-block--right">
        <span className="score-label">Best</span>
        <span className="score-num score-num--best">{bestScore}</span>
      </div>
    </div>
  );
}