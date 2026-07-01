import { useRef, useState } from 'react';
import type { GamePhase } from '../game/types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game/constants';
import { useGameEngine } from '../hooks/useGameEngine';
import HUD from './HUD';
import StartScreen from './StartScreen';
import PauseScreen from './PauseScreen';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  const [phase, setPhase] = useState<GamePhase>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('highScore') ?? 0);
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { startGame, pauseGame, resumeGame, isLoaded, isError } = useGameEngine(canvasRef, {
    onScoreUpdate: (s) => setScore(s),
    onGameOver: (s) => {
      setHighScore((prev) => {
        const next = Math.max(prev, s);
        localStorage.setItem('highScore', String(next));
        return next;
      });
      setPhase('GAME_OVER');
    },
    onPause: () => setPhase('PAUSED'),
    onResume: () => setPhase('PLAYING'),
  });

  const handleStart = () => {
    setScore(0);
    setPhase('PLAYING');
    startGame();
  };

  const handlePause = () => {
    setPhase('PAUSED');
    pauseGame();
  };

  const handleResume = () => {
    setPhase('PLAYING');
    resumeGame();
  };

  return (
    <div className="game-container">
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="game-canvas" />

      {phase === 'START' && (
        <StartScreen onStart={handleStart} isLoaded={isLoaded} isError={isError} />
      )}
      {phase === 'PLAYING' && (
        <HUD score={score} onPause={handlePause} />
      )}
      {phase === 'PAUSED' && (
        <PauseScreen onResume={handleResume} />
      )}
      {phase === 'GAME_OVER' && (
        <GameOverScreen score={score} highScore={highScore} onRestart={handleStart} />
      )}
    </div>
  );
};

export default Game;
