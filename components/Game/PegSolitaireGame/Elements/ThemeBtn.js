import { Rectangle } from "./Rectangle.js";
import { TextFigure } from "./TextFigure.js";

export class ThemeBtn extends Rectangle {
  constructor(ctx, id, x, y, w, h, theme, colors, setTheme) {
    super(ctx, id, x, y, w, h, "transparent", theme.pale, 1);
    this.theme = theme;
    this.setTheme = setTheme;
    this.colors = colors;

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

    this.colorSpace = w / this.colors.length;
    
    this.text = new TextFigure(
      ctx, x, y, 
      theme.name, 18, undefined, 
      colors.white, theme.bg, 6
    );
  }

  draw() {
    super.draw();

    this.text.draw();

  }

  onMouseDown(x, y) {
    this.setTheme(this.theme);
  }
}