import { Figure } from "./Figure.js";

export class Rectangle extends Figure {
  constructor(ctx, id, x, y, w, h, fill, stroke, line) {
    super(ctx, id, x, y, fill, stroke, line);
    this.w = w;
    this.h = h;

    // Draw Coords
    this.dx = x - w / 2;
    this.dy = y - h / 2;
  }

  draw() {
    super.draw();
    this.ctx.beginPath();
    this.ctx.rect(this.dx, this.dy, this.w, this.h)
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  isPointerInside(x, y) {
    return (x >=  this.dx && x <= this.dx + this.w) 
        && (y >=  this.dy && y <= this.dy + this.h);
  }
}