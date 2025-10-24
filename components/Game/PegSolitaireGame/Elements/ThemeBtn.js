import { Rectangle } from "./Rectangle.js";

export class ThemeBtn extends Rectangle {
  constructor(ctx, id, x, y, w, h, theme, colors, setTheme) {
    super(ctx, id, x, y, w, h, colors.transparent, colors.transparent, 0);
    this.theme = theme;
    this.setTheme = setTheme;

    this.themeColors = [
      theme.bg,
      theme.slot,
      theme.valid,
      theme.pale
    ];

    const grad = this.ctx.createLinearGradient(
      this.dx, this.dy, this.dx + this.w, this.dy + this.h
    );
    this.themeColors.forEach((c, i) => {
      grad.addColorStop((1 / this.themeColors.length) * i, c);
    }); 
    this.fill = grad;

    this.colors = colors;

    this.colorSpace = w / this.colors.length;
  }

  draw() {
    super.draw();

    this.ctx.fillStyle = this.colors.white;
    this.ctx.strokeStyle = this.theme.bg;
    this.ctx.font = "bold 16px Helvetica";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(this.id, this.x, this.y);
    this.ctx.fillText(this.id, this.x, this.y);

  }

  onMouseDown(x, y) {
    this.setTheme(this.theme);
  }
}