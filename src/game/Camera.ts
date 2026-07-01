import { CAMERA_FOLLOW_RATIO } from './constants';

export class Camera {
  y = 0;
  private peakY = 0;

  update(playerTopY: number, canvasHeight: number) {
    const threshold = this.y + canvasHeight * CAMERA_FOLLOW_RATIO;
    if (playerTopY < threshold) {
      this.y = playerTopY - canvasHeight * CAMERA_FOLLOW_RATIO;
      if (this.y < this.peakY) this.peakY = this.y;
    }
  }

  getScore(): number {
    return Math.floor(Math.abs(this.peakY) / 8);
  }

  reset() {
    this.y = 0;
    this.peakY = 0;
  }
}
