export type GamePhase = 'START' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
export type PlatformType = 'NORMAL' | 'MOVING' | 'BREAKABLE';
export type Direction = 'LEFT' | 'RIGHT';

export interface PlayerState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  direction: Direction;
}

export interface PlatformState {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: PlatformType;
  isBroken: boolean;
  breakAnimFrame: number;
  moveSpeed: number;
  moveDirection: 1 | -1;
  moveRangeLeft: number;
  moveRangeRight: number;
}

export interface AssetMap {
  background: HTMLImageElement;
  player: HTMLImageElement;
  platform: HTMLImageElement;
}

export interface GameCallbacks {
  onScoreUpdate: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  onPause: () => void;
  onResume: () => void;
}
