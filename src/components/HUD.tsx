interface HUDProps {
  score: number;
  onPause: () => void;
}

const HUD = ({ score, onPause }: HUDProps) => (
  <div className="hud">
    <span className="hud-score">{score}</span>
    <button className="hud-pause" onClick={onPause}>⏸</button>
  </div>
);

export default HUD;
