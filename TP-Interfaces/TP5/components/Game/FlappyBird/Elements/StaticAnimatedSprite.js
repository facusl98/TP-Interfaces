import { Camera } from "../Singletons/Camera.js";
import { AnimatedSprite } from "./AnimatedSprite.js";

export class StaticAnimatedSprite extends AnimatedSprite {
  constructor(src, w, h, duration, frames, loop) {
    super(src, w, h, duration, frames, loop);
  }

  draw(x, y, scale) {
    const vx = x + Camera.x;
    const vy = y + Camera.y;
    super.draw(vx, vy, scale); 
  }
}