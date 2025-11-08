import { Canvas } from "../Singletons/Canvas.js";
import { Sprite } from "./Sprite.js";

export class StaticSprite extends Sprite {
  constructor(src, w, h) {
    super(src, w, h);
  }

  draw(x, y, scale) {
    const { w, h, sprite} = this;
    const { ctx } = Canvas;
    ctx.drawImage(
      sprite, 
      x, y, w * scale, h * scale
    )
  }
}