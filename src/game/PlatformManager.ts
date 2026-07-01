import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLATFORM_WIDTH,
  PLATFORM_HEIGHT,
  PLATFORM_BUFFER,
  PLATFORM_MOVE_SPEED,
  GAP_MIN,
  GAP_MAX,
  WEIGHT_NORMAL,
  WEIGHT_MOVING,
  WEIGHT_BREAKABLE,
} from './constants';
import type { PlatformType, PlatformState } from './types';
import { Platform } from './Platform';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const pickType = (score: number): PlatformType => {
  const progress = Math.min(score / 3000, 1);
  const normalWeight = WEIGHT_NORMAL - progress * 0.3;
  const movingWeight = WEIGHT_MOVING + progress * 0.15;
  const breakableWeight = WEIGHT_BREAKABLE + progress * 0.15;

  const r = Math.random();
  if (r < normalWeight) return 'NORMAL';
  if (r < normalWeight + movingWeight) return 'MOVING';
  if (r < normalWeight + movingWeight + breakableWeight) return 'BREAKABLE';
  return 'NORMAL';
};

const calcGap = (score: number): number => {
  const base = rand(GAP_MIN, GAP_MAX);
  return base * (1 + Math.min(score / 3000, 0.5));
};

const makePlatformState = (id: number, x: number, y: number, type: PlatformType): PlatformState => {
  const moveRange = rand(30, 60);
  return {
    id,
    x,
    y,
    width: PLATFORM_WIDTH,
    height: PLATFORM_HEIGHT,
    type,
    isBroken: false,
    breakAnimFrame: 0,
    moveSpeed: PLATFORM_MOVE_SPEED,
    moveDirection: Math.random() < 0.5 ? 1 : -1,
    moveRangeLeft: Math.max(0, x - moveRange),
    moveRangeRight: Math.min(CANVAS_WIDTH, x + PLATFORM_WIDTH + moveRange),
  };
};

export class PlatformManager {
  private platforms: Platform[] = [];
  private nextId = 0;

  private getHighestY(): number {
    if (this.platforms.length === 0) return 0;
    return this.platforms.reduce((min, p) => Math.min(min, p.state.y), Infinity);
  }

  initialize(playerStartY: number) {
    this.platforms = [];
    this.nextId = 0;

    const firstX = (CANVAS_WIDTH - PLATFORM_WIDTH) / 2;
    const firstY = playerStartY + 60;
    this.platforms.push(new Platform(makePlatformState(this.nextId++, firstX, firstY, 'NORMAL')));

    let currentY = firstY;
    while (currentY > -PLATFORM_BUFFER) {
      currentY -= rand(GAP_MIN, GAP_MAX);
      const x = rand(0, CANVAS_WIDTH - PLATFORM_WIDTH);
      this.platforms.push(new Platform(makePlatformState(this.nextId++, x, currentY, 'NORMAL')));
    }
  }

  update(cameraY: number, score: number, dt: number) {
    this.platforms = this.platforms.filter(
      (p) => !p.isExpired() && p.state.y - cameraY < CANVAS_HEIGHT + 50,
    );

    for (const p of this.platforms) p.update(dt);

    // генеруємо платформи вище viewport поки є прогалина
    while (this.getHighestY() > cameraY - PLATFORM_BUFFER) {
      const newY = this.getHighestY() - calcGap(score);
      const x = rand(0, CANVAS_WIDTH - PLATFORM_WIDTH);
      const type = pickType(score);
      this.platforms.push(new Platform(makePlatformState(this.nextId++, x, newY, type)));
    }
  }

  getPlatforms(): Platform[] {
    return this.platforms;
  }
}
