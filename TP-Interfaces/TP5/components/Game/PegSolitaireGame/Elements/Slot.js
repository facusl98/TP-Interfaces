import { Rectangle } from "../Figures/Rectangle.js";

export class Slot extends Rectangle {
  constructor(ctx, col, row, colors) {
    const cx = 1080 / 2;
    const cy = 480 / 2;
    const size = 55;
    const gap = 5;
    const x = cx + col * (size + gap);
    const y = cy + row * (size + gap);

    super(ctx, `[${col}, ${row}]`, x, y, size, size, 
      colors.slot, colors.valid, 1
    );
    this.colors = colors
    this.col = col;
    this.row = row;

    this.cy = cy; this.cx = cx; 
    this.size = size; this.gap = gap;

    this.setTheme(colors);

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

  // Calculates x & y
  calcPos() {
    return {
      x: this.cx + this.col * (this.size + this.gap),
      y: this.cy + this.row * (this.size + this.gap),
    }
  }
}