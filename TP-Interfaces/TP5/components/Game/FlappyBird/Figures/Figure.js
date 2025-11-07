import { CanvasService } from "../Services/CanvasService.js";
import { Camera } from "../Singletons/Camera.js";

export class Figure {
  constructor(x, y, fill) {
    this.x = x,
    this.y = y;
    this.fill = fill;
  }

  draw() {
    CanvasService.ctx.fillStyle = this.fill;
  }

  isColliding() {
    return false;
  };

  isPast() {
    const { dx, w } = this;
    return (dx + w  < 0)
  }

  get dx() {
    return this.x - Camera.x;
  }

  get dy() {
    return this.y - Camera.y;
  }

  set coords(coords) {
    this.x = coords.x;
    this.y = coords.y;
  }

  get coords() {
    return {x: this.x, y: this.y};
  }
}