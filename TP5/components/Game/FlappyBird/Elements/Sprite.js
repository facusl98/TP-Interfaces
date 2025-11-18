import { Canvas } from "../Singletons/Canvas.js";
import { Camera } from "../Singletons/Camera.js";

export class Sprite {
  constructor(src, w, h = 0) {
    this.sprite = new Image();
    this.sprite.src = src;
    this.src = src;
    this.w = w;
    this.h = h || w;
    
    this.ready = false;

    this.sprite.onload = () => {
      this.ready = true
    };
  }

  play() {}

  draw(x, y, dw, dh) {
    if (!this.ready) return;
    const { sprite, w, h } = this;
    const { ctx } = Canvas;
    
    const rel = this.relative({x: x, y: y});
    ctx.drawImage(
      sprite, 
      0, 0, w, h,
      rel.x, rel.y, dw, dh
    );
  }

  relative(coords) {
    return {
      x: coords.x - Camera.x,
      y: coords.y - Camera.y
    }
  }
}