import { Figure } from "./Figure.js"

export class Circle extends Figure {
  constructor(ctx, id, x, y, r, fill, stroke, line) {
    super(ctx, id, x, y, fill, stroke, line);

    this.r = r;

    this.rad = Math.PI / 180;
  }

  draw() {
    super.draw();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, this.rad * 360);
    if (this.fill) this.ctx.fill();
    if (this.stroke) this.ctx.stroke();
  }

  isPointerInside(x, y) {
    const _x = x - this.x;
    const _y = y - this.y;
    return Math.sqrt(_x * _x + _y * _y) < this.r;
  }
}