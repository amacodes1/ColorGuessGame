import { useState, useEffect } from "react";
import "./ColorGame.css";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

export default function Home() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(randomColor);
    setStatus("");
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setStatus("Correct! 🎉");
    } else {
      setStatus("Wrong! Try Again ❌");
    }

    // Change the target color after each guess
    setTimeout(() => {
      startNewGame();
    }, 1000); // Wait for a second before showing the next color
  };

  return (
    <div className="game-container">
      <h1 data-testid="gameInstructions" className="game-instructions">
        Guess the correct color!
      </h1>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="color-options">
        {COLORS.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          >
            {color}
          </button>
        ))}
      </div>
      <p data-testid="gameStatus" className="game-status">
        {status}
      </p>
      <p data-testid="score" className="score">
        Score: {score}
      </p>
      <button
        data-testid="newGameButton"
        className="new-game-button"
        onClick={() => {
          setScore(0); // Reset the score
          startNewGame(); // Start a new game
        }}
      >
        New Game
      </button>
    </div>
  );
}
