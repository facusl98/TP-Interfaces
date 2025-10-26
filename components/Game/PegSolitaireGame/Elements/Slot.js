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

  /*
    Assign colors to attributes containing the default and active values
  */
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

  // Assign default styles
  setDefault() {
    this.fill = this.default.fill;
    this.stroke = this.default.stroke;
    this.line = 1;
  }

  // Assign default styles
  setActive() {
    this.fill = this.active.fill;
    this.stroke = this.active.stroke;
    this.line = 1;
  }
}