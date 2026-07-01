import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { AssetLoader } from '../game/AssetLoader';
import { GameEngine } from '../game/GameEngine';
import type { AssetMap, GameCallbacks } from '../game/types';

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  callbacks: GameCallbacks,
) => {
  const engineRef = useRef<GameEngine | null>(null);
  const assetsRef = useRef<AssetMap | null>(null);
  const callbacksRef = useRef(callbacks);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  callbacksRef.current = callbacks;

  useEffect(() => {
    AssetLoader.load()
      .then((assets) => {
        assetsRef.current = assets;
        setIsLoaded(true);
      })
      .catch(() => setIsError(true));

    return () => {
      engineRef.current?.stop();
    };
  }, []);

  const startGame = () => {
    const canvas = canvasRef.current;
    const assets = assetsRef.current;
    if (!canvas || !assets) return;

    engineRef.current?.stop();
    engineRef.current = new GameEngine(canvas, assets, {
      onScoreUpdate: (s) => callbacksRef.current.onScoreUpdate(s),
      onGameOver: (s) => callbacksRef.current.onGameOver(s),
      onPause: () => callbacksRef.current.onPause(),
      onResume: () => callbacksRef.current.onResume(),
    });
    engineRef.current.start();
  };

  const pauseGame = () => engineRef.current?.pause();
  const resumeGame = () => engineRef.current?.resume();

  return { startGame, pauseGame, resumeGame, isLoaded, isError };
};
