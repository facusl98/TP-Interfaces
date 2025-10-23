import { Poligon } from "./Poligon.js";

export class Piece extends Poligon {
  constructor(ctx, col, row, x, y, r, colors) {
    super(
      ctx, `${col}-${row}`, x, y, r, 7, 270, 
      colors.bone, 
      colors.dark, 1
    );
    this.col = col;
    this.row = row;
    this.colors = colors;
  }

  setDefault() {
    this.fill = this.colors.bone;
    this.stroke = this.colors.dark;
    this.line = 1;
  }

  setActive() {
    this.fill = this.colors.white;
    this.stroke = this.colors.teal;
    this.line = 2;
  }

  setGridPos(col, row) {
    this.col = col;
    this.row = row;
  }
}