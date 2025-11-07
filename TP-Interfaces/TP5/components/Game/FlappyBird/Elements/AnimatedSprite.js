import { CanvasService } from "../Services/CanvasService.js";
import { Sprite } from "./Sprite.js";

export class AnimatedSprite extends Sprite {
  constructor(src, size, duration, frames, loop = true) {
    super(src);
    this.duration = duration;
    this.frames = [...frames];
    this.loop = loop;
    this.size = size;

    this.startTime = null;
    this.finished = !loop;
  }

  play() {
    this.startTime = performance.now();
    this.finished = false;
  }

  draw(x, y, scale) {
    const { ready, finished, loop } = this;
    if (!ready) return;
    if (!loop && finished) return;

    const { sprite, size, frames, duration, startTime } = this;
    const { ctx } = CanvasService;

    const elapsed = performance.now() - startTime;

    let i = 0;
    for (i; i < frames.length; i++) {
      const next = frames[i + 1] || duration;
      if (elapsed >= frames[i] && elapsed < next)
        break;
    }
    if (i >= frames.length) i = frames.length - 1;

    const rel = this.relative({x: x, y: y});
    const scaled = size * scale;

    ctx.drawImage(
      sprite,
      0, size * i, size, size,
      rel.x, rel.y, scaled, scaled
    );



    if (elapsed > duration) {
      this.startTime = performance.now();
      if (!loop) this.finished = true;
    }
  }
}