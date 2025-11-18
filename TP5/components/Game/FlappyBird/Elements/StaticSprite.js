import { Camera } from "../Singletons/Camera.js";
import { Canvas } from "../Singletons/Canvas.js";
import { Sprite } from "./Sprite.js";

export class StaticSprite extends Sprite {
  constructor(src, w, h) {
    super(src, w, h);
  }

  draw(x, y, dw, dh) {
    const vx = x + Camera.x;
    const vy = y + Camera.y;
    super.draw(vx, vy, dw, dh); 
  }
}