import { CANVAS_WIDTH, CANVAS_HEIGHT, JUMP_VELOCITY, PLAYER_WIDTH } from './constants';
import type { AssetMap, GameCallbacks, GamePhase } from './types';
import { InputManager } from './InputManager';
import { Camera } from './Camera';
import { Player } from './Player';
import { PlatformManager } from './PlatformManager';
import { detectLanding, isPlayerDead } from './CollisionDetector';

const PLAYER_START_Y = CANVAS_HEIGHT / 2;
const PLAYER_START_X = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private assets: AssetMap;
  private callbacks: GameCallbacks;

  private input: InputManager;
  private camera: Camera;
  private player: Player;
  private platformManager: PlatformManager;

  private rafId: number | null = null;
  private running = false;
  private lastTimestamp = 0;
  private phase: GamePhase = 'PLAYING';
  private lastReportedScore = -1;

  constructor(canvas: HTMLCanvasElement, assets: AssetMap, callbacks: GameCallbacks) {
    this.ctx = canvas.getContext('2d')!;
    this.assets = assets;
    this.callbacks = callbacks;

    this.input = new InputManager();
    this.camera = new Camera();
    this.player = new Player(PLAYER_START_X, PLAYER_START_Y);
    this.platformManager = new PlatformManager();

    this.loop = this.loop.bind(this);
  }

  start() {
    this.reset();
    this.phase = 'PLAYING';
    this.running = true;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  private reset() {
    this.camera.reset();
    this.player = new Player(PLAYER_START_X, PLAYER_START_Y);
    this.platformManager.initialize(PLAYER_START_Y);
    this.lastReportedScore = -1;
  }

  private loop(timestamp: number) {
    const dt = Math.min((timestamp - this.lastTimestamp) / 16.67, 3);
    this.lastTimestamp = timestamp;
    this.update(dt);
    this.render();
    if (this.running) {
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  private update(dt: number) {
    if (this.input.isPauseJustPressed()) {
      if (this.phase === 'PAUSED') {
        this.phase = 'PLAYING';
        this.callbacks.onResume();
      } else {
        this.phase = 'PAUSED';
        this.callbacks.onPause();
      }
    }

    if (this.phase === 'PAUSED') return;

    this.player.update(this.input, dt);

    const score = this.camera.getScore();
    this.platformManager.update(this.camera.y, score, dt);

    const allPlatforms = this.platformManager.getPlatforms();
    const hit = detectLanding(this.player.state, allPlatforms.map((p) => p.state));

    if (hit) {
      const bonus = Math.min(score / 500, 5);
      this.player.jump(JUMP_VELOCITY - bonus);
      if (hit.type === 'BREAKABLE') {
        allPlatforms.find((p) => p.state.id === hit.id)?.break();
      }
    }

    this.camera.update(this.player.state.y, CANVAS_HEIGHT);

    if (score !== this.lastReportedScore) {
      this.lastReportedScore = score;
      this.callbacks.onScoreUpdate(score);
    }

    if (isPlayerDead(this.player.state, this.camera.y)) {
      this.handleGameOver();
    }
  }

  private handleGameOver() {
    this.stop();
    this.callbacks.onGameOver(this.camera.getScore());
  }

  private render() {
    const { ctx, assets, camera } = this;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(assets.background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (const platform of this.platformManager.getPlatforms()) {
      platform.render(ctx, assets.platform, camera.y);
    }

    this.player.render(ctx, assets.player, camera.y);

    if (this.phase === 'PAUSED') {
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }

  pause() {
    this.phase = 'PAUSED';
  }

  resume() {
    this.phase = 'PLAYING';
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.input.destroy();
  }
}
