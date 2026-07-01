interface PauseScreenProps {
  onResume: () => void;
}

const PauseScreen = ({ onResume }: PauseScreenProps) => (
  <div className="game-overlay">
    <h2 className="overlay-title">Пауза</h2>
    <button className="overlay-btn" onClick={onResume}>Продовжити</button>
  </div>
);

export default PauseScreen;
