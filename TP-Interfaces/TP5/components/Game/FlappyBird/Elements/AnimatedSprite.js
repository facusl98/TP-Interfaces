import { Canvas } from "../Singletons/Canvas.js";
import { Sprite } from "./Sprite.js";

export class AnimatedSprite extends Sprite {
  constructor(src, w, h, duration, frames, loop = true, stay = true) {
    super(src, w, h);
    this.duration = duration;
    this.frames = [...frames];
    this.loop = loop;
    this.stay = stay;
    this.w = w;
    this.h = h;

    this.startTime = null;
    this.finished = !loop;
  }

  play() {
    this.startTime = performance.now();
    this.finished = false;
  }

  draw(x, y, dw, dh) {
    const { ready, stay, finished, loop } = this;
    if (!ready) return;
    if (!loop && finished && !stay) return;

    const { sprite, w, h, frames, duration, startTime } = this;
    const { ctx } = Canvas;

    const elapsed = performance.now() - startTime;

    let i = 0;
    for (i; i < frames.length; i++) {
      const next = frames[i + 1] || duration;
      if (elapsed >= frames[i] && elapsed < next)
        break;
    }
    if (i >= frames.length) i = frames.length - 1;

    const rel = this.relative({x: x, y: y});

    ctx.drawImage(
      sprite,
      0, h * i, w, h,
      rel.x, rel.y, dw, dh
    );

    if (elapsed > duration) {
      if (!stay) this.startTime = performance.now();
      if (!loop) this.finished = true;
    }
  }
}