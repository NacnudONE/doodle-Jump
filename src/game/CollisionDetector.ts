import type { PlayerState, PlatformState } from './types';
import { CANVAS_HEIGHT } from './constants';

export const detectLanding = (
  player: PlayerState,
  platforms: PlatformState[],
): PlatformState | null => {
  if (player.velocityY <= 0) return null;

  const prevBottom = player.y + player.height - player.velocityY;
  const currBottom = player.y + player.height;

  for (const p of platforms) {
    if (p.isBroken) continue;
    const xOverlap = player.x + player.width > p.x && player.x < p.x + p.width;
    const yCrossed = prevBottom <= p.y && currBottom >= p.y;
    if (xOverlap && yCrossed) return p;
  }
  return null;
};

export const isPlayerDead = (player: PlayerState, cameraY: number): boolean =>
  player.y > cameraY + CANVAS_HEIGHT + 100;
