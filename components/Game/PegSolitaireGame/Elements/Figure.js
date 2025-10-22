export class Figure {
  constructor(ctx, id, x, y, fill = null, stroke = null, line = 0) {
    // Center Coords
    this.x = x;
    this.y = y;

    this.id = id;

    this.fill = fill;
    this.stroke = stroke;
    this.line = line;
    this.ctx = ctx;

    this.rad = Math.PI / 180;
  }

  // Override
  draw() {  
    if (this.fill) this.ctx.fillStyle = this.fill;
    if (this.stroke) this.ctx.strokeStyle = this.stroke;
    if (this.line) this.ctx.lineWidth = this.line;
  };

  // Abstract
  isPointerInside(x, y) {}; 

  // Override
  onMouseDown(x, y) {
    console.log(this);
  };
}