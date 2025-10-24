import { Poligon } from "./Poligon.js";

export class Piece extends Poligon {
  constructor(ctx, col, row, x, y, r, theme) {
    super(
      ctx, `${col}-${row}`, x, y, r, 7, 270, 
      theme.pale, 
      theme.dark, 1
    );

    this.setTheme(theme);

    this.col = col;
    this.row = row;
    this.theme = theme;
  }

  setTheme(theme) {
    this.default = {
      fill: theme.pale,
      stroke: theme.dark
    };

    this.active = {
      fill: theme.white,
      stroke: theme.bg
    };

    this.sides = theme.sides;
    this.generateEdges();

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