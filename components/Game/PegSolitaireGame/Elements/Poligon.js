import { Figure } from "./Figure.js";

export class Poligon extends Figure {
  constructor(ctx, id, x, y, r, sides, angle, fill, stroke, line) {
    super(ctx, id, x, y, fill, stroke, line);
    this.r = r;
    this.sides = sides;
    this.angle = angle * this.rad;
    
    this.generateEdges();
    
  }

  draw() {
    super.draw();
    this.ctx.beginPath();
    this.ctx.moveTo(this.edges[0].x, this.edges[0].y);
    for (let i = 1; i < this.edges.length; i++) {
      this.ctx.lineTo(this.edges[i].x, this.edges[i].y);
    }
    this.ctx.lineTo(this.edges[0].x, this.edges[0].y);
    if (this.fill) this.ctx.fill();
    if (this.stroke) this.ctx.stroke();
  }

  generateEdges() {
    this.edges = [];
    const step = (2 * Math.PI) / this.sides;
    for (let i = 0; i < this.sides; i++) {
      let rotation = this.angle + step * i;
      let px = Math.round(this.x + (this.r * Math.cos(rotation)));
      let py = Math.round(this.y + (this.r * Math.sin(rotation)));
      this.edges.push({x: px, y: py});
    }
  }

  setAngle(angle) {
    this.angle = (angle * this.rad) % (2 * Math.PI);
    this.generateEdges();
  }

  isPointerInside(x, y) {
    let inside = false;
    const n = this.edges.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = this.edges[i].x, yi = this.edges[i].y;
      const xj = this.edges[j].x, yj = this.edges[j].y;

      const betweenYs = ((yi > y) !== (yj > y));
      const betweenXs = (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      const intersect = betweenYs &&  betweenXs;
      if (intersect) inside = !inside;
    }
    return inside;
  }
}