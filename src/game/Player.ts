import {
  GRAVITY,
  JUMP_VELOCITY,
  MAX_FALL_SPEED,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  CANVAS_WIDTH,
} from './constants';
import type { PlayerState } from './types';
import { InputManager } from './InputManager';

export class Player {
  state: PlayerState;

  constructor(startX: number, startY: number) {
    this.state = {
      x: startX,
      y: startY,
      velocityX: 0,
      velocityY: 0,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      direction: 'RIGHT',
    };
  }

  update(input: InputManager, dt: number) {
    if (input.isLeft()) {
      this.state.velocityX = -PLAYER_SPEED;
      this.state.direction = 'LEFT';
    } else if (input.isRight()) {
      this.state.velocityX = PLAYER_SPEED;
      this.state.direction = 'RIGHT';
    } else {
      this.state.velocityX = 0;
    }

    this.state.velocityY = Math.min(this.state.velocityY + GRAVITY * dt, MAX_FALL_SPEED);
    this.state.x += this.state.velocityX * dt;
    this.state.y += this.state.velocityY * dt;

    // горизонтальне обгортання
    if (this.state.x + this.state.width < 0) this.state.x = CANVAS_WIDTH;
    else if (this.state.x > CANVAS_WIDTH) this.state.x = -this.state.width;
  }

  jump(velocity = JUMP_VELOCITY) {
    this.state.velocityY = velocity;
  }

  render(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cameraY: number) {
    const { x, y, width, height, direction } = this.state;
    const screenY = y - cameraY;

    ctx.save();
    if (direction === 'LEFT') {
      ctx.translate(x + width, screenY);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      ctx.drawImage(img, x, screenY, width, height);
    }
    ctx.restore();
  }
}
