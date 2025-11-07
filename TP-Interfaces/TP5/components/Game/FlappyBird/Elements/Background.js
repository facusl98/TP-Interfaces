import { CanvasService } from "../Services/CanvasService.js";
import { Camera } from "../Singletons/Camera.js";
import { Sprite } from "./Sprite.js";

export class Background {
  constructor(src, x, y) {
    this.sprite = new Sprite(src); 
    this.x = x;
    this.y = y;
  }

  draw() {
    const { width, height } = CanvasService;
    const {x, y} = this;
    this.sprite.draw(x, y, 1, width, height);
  }

  isPast() {
    const { dx } = this;
    return (dx + this.sprite.w  < 0)
  }

  get dx() {
    return this.x - Camera.x;
  }

  get dy() {
    return this.y - Camera.y;
  }
}