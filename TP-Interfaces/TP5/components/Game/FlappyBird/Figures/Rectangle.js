import { Canvas } from "../Singletons/Canvas.js";
import { Player } from "../Singletons/Player.js";
import { Figure } from "./Figure.js";

export class Rectangle extends Figure {
  constructor(x, y, w, h, fill = "transparent") {
    super(x, y, fill);
    this.w = w;
    this.h = h;
  }

  draw() {
    super.draw();
    const { ctx } = Canvas;
    const { dx, dy, w, h } = this;

    ctx.fillRect(dx - w/2, dy - h/2, w, h);
  }

  isColliding() {
    const { w, h } = this;
    const x = this.x - w/2;
    const y = this.y - h/2;
    const px = Player.x;
    const py = Player.y;
    const r = Player.r;

    const minX = Math.max(x, Math.min(px, x + w));
    const minY = Math.max(y, Math.min(py, y + h));

    const dx = px - minX;
    const dy = py - minY;

    return (dx * dx + dy * dy) <= (r * r);
  }
}