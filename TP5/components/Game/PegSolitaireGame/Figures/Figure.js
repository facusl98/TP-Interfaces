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
    this.ctx.fillStyle = this.fill;
    this.ctx.strokeStyle = this.stroke;
    this.ctx.lineWidth = this.line;
  };

  // Abstract
  isPointerInside(x, y) {}; 

  // Abstract
  onMouseDown(x, y) {};

  // Abstract
  onMouseMove(x, y) {};

  // Abstract 
  onMouseUp(x, y) {};
}