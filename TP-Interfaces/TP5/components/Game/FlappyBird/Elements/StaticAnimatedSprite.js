import { Camera } from "../Singletons/Camera.js";
import { AnimatedSprite } from "./AnimatedSprite.js";

export class StaticAnimatedSprite extends AnimatedSprite {
  constructor(src, w, h, duration, frames, loop, stay) {
    super(src, w, h, duration, frames, loop, stay);
  }

  draw(x, y, dw, dh) {
    const vx = x + Camera.x;
    const vy = y + Camera.y;
    super.draw(vx, vy, dw, dh); 
  }
}