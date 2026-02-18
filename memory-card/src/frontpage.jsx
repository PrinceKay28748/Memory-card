import { useState, useEffect } from "react";
import "./frontpage.css";

export default function FrontPage() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div >
    
    <div className="header">
      <h1>Welcome to the Memory Card Game!</h1>

      <div>
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>

      <div className="maindiv">
        Get points by clicking on matching cards.Do not click on the same card
        twice!
      </div>
    </div>
  );
}
