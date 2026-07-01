import {
  CANVAS_WIDTH,
  TINT_MOVING,
  TINT_BREAKABLE,
  BREAK_ANIM_DURATION,
} from './constants';
import type { PlatformState } from './types';

export class Platform {
  state: PlatformState;

  constructor(state: PlatformState) {
    this.state = state;
  }

  update(dt: number) {
    if (this.state.type === 'MOVING') {
      this.state.x += this.state.moveSpeed * this.state.moveDirection * dt;
      if (
        this.state.x <= this.state.moveRangeLeft ||
        this.state.x + this.state.width >= this.state.moveRangeRight
      ) {
        this.state.moveDirection = (this.state.moveDirection * -1) as 1 | -1;
      }
      // утримуємо в межах canvas
      this.state.x = Math.max(0, Math.min(CANVAS_WIDTH - this.state.width, this.state.x));
    }

    if (this.state.isBroken) {
      this.state.breakAnimFrame += dt;
    }
  }

  break() {
    this.state.isBroken = true;
  }

  isExpired(): boolean {
    return this.state.isBroken && this.state.breakAnimFrame > BREAK_ANIM_DURATION;
  }

  render(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cameraY: number) {
    if (this.isExpired()) return;

    const { x, y, width, height, type, isBroken, breakAnimFrame } = this.state;
    const screenY = y - cameraY;

    ctx.save();

    if (isBroken) {
      ctx.globalAlpha = Math.max(0, 1 - breakAnimFrame / BREAK_ANIM_DURATION);
      // зміщуємо платформу вниз при руйнуванні
      ctx.drawImage(img, x, screenY + breakAnimFrame * 2, width, height);
    } else {
      ctx.drawImage(img, x, screenY, width, height);

      if (type === 'MOVING') {
        ctx.fillStyle = TINT_MOVING;
        ctx.fillRect(x, screenY, width, height);
      } else if (type === 'BREAKABLE') {
        ctx.fillStyle = TINT_BREAKABLE;
        ctx.fillRect(x, screenY, width, height);
      }
    }

    ctx.restore();
  }
}
