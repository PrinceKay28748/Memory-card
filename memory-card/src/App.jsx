import { useState, useEffect, useCallback } from "react";
import useNASA from "./hooks/useNASA";
import Header from "./components/Header";
import ScoreBoard from "./components/Scoreboard";
import GameBoard from "./components/GameBoard";
import LoadingScreen from "./components/loadingScreenoadingScreen";
import GameOverModal from "./components/GameOverModal";
import "./styles/App.css";

const CARD_COUNT = 12;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const { cards: fetched, loading, error, refetch } = useNASA(CARD_COUNT);

  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (fetched.length > 0) setCards(shuffle(fetched));
  }, [fetched]);

  const handleCardClick = useCallback(
    (id) => {
      if (clickedIds.has(id)) {
        setBestScore((prev) => Math.max(prev, score));
        setGameOver(true);
        setWon(false);
        return;
      }

      const newClicked = new Set(clickedIds);
      newClicked.add(id);
      const newScore = score + 1;

      setClickedIds(newClicked);
      setScore(newScore);

      if (newScore === CARD_COUNT) {
        setBestScore((prev) => Math.max(prev, newScore));
        setGameOver(true);
        setWon(true);
        return;
      }

      setCards((prev) => shuffle(prev));
    },
    [clickedIds, score]
  );

  const handlePlayAgain = useCallback(() => {
    setClickedIds(new Set());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setCards((prev) => shuffle(prev));
  }, []);

  const handleNewImages = useCallback(() => {
    setClickedIds(new Set());
    setScore(0);
    setGameOver(false);
    setWon(false);
    refetch();
  }, [refetch]);

  if (loading) return <LoadingScreen />;

  if (error)
    return (
      <div className="error-screen">
        <span className="error-icon">🛸</span>
        <p>Failed to reach NASA. Check your connection.</p>
        <button onClick={refetch} className="btn btn--primary">Retry</button>
      </div>
    );

  return (
    <div className="app">
      <Header />
      <ScoreBoard score={score} bestScore={bestScore} total={CARD_COUNT} />
      <p className="instructions">
        Click each image <strong>once</strong>. Cards shuffle after every pick.
      </p>
      <GameBoard cards={cards} clickedIds={clickedIds} onCardClick={handleCardClick} />
      {gameOver && (
        <GameOverModal
          won={won}
          score={score}
          bestScore={bestScore}
          total={CARD_COUNT}
          onPlayAgain={handlePlayAgain}
          onNewImages={handleNewImages}
        />
      )}
    </div>
  );
}