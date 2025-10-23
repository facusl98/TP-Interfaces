import { Rectangle } from "./Rectangle.js";

export class ThemeBtn extends Rectangle {
  constructor(ctx, id, x, y, w, h, theme, setTheme) {
    super(ctx, id, x, y, w, h, null, theme.bg, 1);
    this.theme = theme;
    this.setTheme = setTheme;

    this.colors = [
      theme.bg,
      theme.slot,
      theme.valid,
      theme.pale
    ];

    this.colorSpace = w / this.colors.length;
  }

  draw() {
    super.draw();

    this.colors.forEach((color, i) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        this.dx + (i * this.colorSpace), this.dy,
        this.colorSpace, this.h
      );
    });

    this.ctx.fillStyle = this.theme.white;
    this.ctx.strokeStyle = this.theme.dark;
    this.ctx.font = "16px Helvetica";
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeText(this.id, this.x, this.y);
    this.ctx.fillText(this.id, this.x, this.y);
  }

  onMouseDown(x, y) {
    this.setTheme(this.theme);
  }
}