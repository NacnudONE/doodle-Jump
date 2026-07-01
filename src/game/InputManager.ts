export class InputManager {
  private keys = new Set<string>();
  private pauseConsumed = false;

  constructor() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  private onKeyDown(e: KeyboardEvent) {
    this.keys.add(e.code);
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keys.delete(e.code);
    if (e.code === 'Space') this.pauseConsumed = false;
  }

  isLeft(): boolean {
    return this.keys.has('ArrowLeft') || this.keys.has('KeyA');
  }

  isRight(): boolean {
    return this.keys.has('ArrowRight') || this.keys.has('KeyD');
  }

  isPauseJustPressed(): boolean {
    if (this.keys.has('Space') && !this.pauseConsumed) {
      this.pauseConsumed = true;
      return true;
    }
    return false;
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
