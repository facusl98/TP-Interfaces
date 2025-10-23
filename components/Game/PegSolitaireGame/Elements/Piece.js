import { Poligon } from "./Poligon.js";

export class Piece extends Poligon {
  constructor(ctx, col, row, x, y, r, colors) {
    super(
      ctx, `${col}-${row}`, x, y, r, 7, 270, 
      colors.pale, 
      colors.dark, 1
    );

    this.setTheme(colors);

    this.col = col;
    this.row = row;
    this.colors = colors;
  }

  setTheme(colors) {
    this.default = {
      fill: colors.pale,
      stroke: colors.dark
    };

    this.active = {
      fill: colors.white,
      stroke: colors.bg
    };

    this.setDefault();
  }

  setDefault() {
    this.fill = this.default.fill;
    this.stroke = this.default.stroke;
    this.line = 1;
  }

  setActive() {
    this.fill = this.active.fill;
    this.stroke = this.active.stroke;
    this.line = 1;
  }

  setGridPos(col, row) {
    this.col = col;
    this.row = row;
  }
}