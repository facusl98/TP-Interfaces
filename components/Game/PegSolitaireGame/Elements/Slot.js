import { Rectangle } from "./Rectangle.js";

export class Slot extends Rectangle {
  constructor(ctx, col, row, x, y, size, fill, stroke, line) {
    super(ctx, `${col}-${row}`, x, y, size, size, fill, stroke, line);
    this.col = col;
    this.row = row;
  }
}