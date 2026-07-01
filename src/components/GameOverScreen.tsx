interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen = ({ score, highScore, onRestart }: GameOverScreenProps) => (
  <div className="game-overlay">
    <h2 className="overlay-title">Гейм Овер</h2>
    <p className="overlay-score">Рахунок: <strong>{score}</strong></p>
    <p className="overlay-score">Рекорд: <strong>{highScore}</strong></p>
    <button className="overlay-btn" onClick={onRestart}>Ще раз</button>
  </div>
);

export default GameOverScreen;
