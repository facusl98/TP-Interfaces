import { Rectangle } from "./Rectangle.js";

export class Slot extends Rectangle {
  constructor(ctx, col, row, x, y, size, colors) {
    super(ctx, `${col}-${row}`, x, y, size, size, 
      colors.slot, colors.valid, 1
    );

    this.setTheme(colors);

    this.colors = colors
    this.col = col;
    this.row = row;
  }

  setTheme(colors) {
    this.default = {
      fill: colors.slot,
      stroke: colors.valid
    };

    this.active = {
      fill: colors.valid,
      stroke: colors.pale
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
}