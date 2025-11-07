import { CanvasService } from "../Services/CanvasService.js";
import { Camera } from "../Singletons/Camera.js";

export class Sprite {
  constructor(src, w, h = 0) {
    this.sprite = new Image();
    this.sprite.src = src;
    this.src = src;
    this.w = w;
    this.h = h || w;
    
    this.ctx = CanvasService.ctx;
    this.ready = false;

    this.sprite.onload = () => {
      this.w = this.sprite.width;
      this.h = this.sprite.height;
      this.ready = true
    };
  }

  draw(x, y, scale = 1, dw = null, dh = null) {
    if (!this.ready) return;
    const { ctx, sprite, w, h } = this;
    if (dw == null || dh == null) {
      dw = w * scale;
      dh = h * scale;
    }
    
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