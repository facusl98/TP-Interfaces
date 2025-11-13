import { Canvas } from "../Singletons/Canvas.js";
import { Player } from "../Singletons/Player.js";
import { Figure } from "./Figure.js";

export class Circle extends Figure {
  constructor(x, y, r, fill = "transparent") {
    super(x, y, fill);
    this.r = r;
  }

  draw() {
    super.draw();
    const { ctx } = Canvas;
    const { dx, dy, r } = this;
    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  isColliding() {
    const { x, y, r } = this;
    const dx = x - Player.x;
    const dy = y - Player.y;
    const hyp = Math.hypot(dx, dy);
    return hyp < r + Player.r;
  }
}