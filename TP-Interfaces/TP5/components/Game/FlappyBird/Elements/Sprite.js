import { CanvasService } from "../Services/CanvasService.js";
import { Camera } from "../Singletons/Camera.js";

export class Sprite {
  constructor(src, size) {
    this.sprite = new Image();
    this.sprite.src = src;
    this.size = size;

    this.ctx = CanvasService.ctx;
    this.ready = false;

    this.sprite.onload = () => {this.ready = true};
  }

  draw(x, y, scale = 1) {
    const { ctx, sprite, size, ready } = this;
    if (!ready) return;
    const rel = this.relative({x: x, y: y});
    ctx.drawImage(
      sprite, 
      0, 0, size, size,
      rel.x, rel.y, size * scale, size * scale
    );
  }

  relative(coords) {
    return {
      x: coords.x - Camera.x,
      y: coords.y - Camera.y
    }
  }
}