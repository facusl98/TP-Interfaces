import { Rectangle } from "./Rectangle.js";

export class Slot extends Rectangle {
  constructor(ctx, col, row, x, y, size, colors) {
    super(ctx, `${col}-${row}`, x, y, size, size, 
      colors.sage, colors.white, 1
    );
    this.colors = colors
    this.col = col;
    this.row = row;
  }

  setDefault() {
    this.fill = this.colors.sage;
    this.stroke = this.colors.white;
    this.line = 1;
  }

  setActive() {
    this.fill = this.colors.slate;
    this.stroke = this.colors.white;
    this.line = 1;
  }
}