import { Rectangle } from "./Rectangle.js";
import { ThemeBtn } from "./ThemeBtn.js";

export class ThemeSelector extends Rectangle {
  constructor(ctx, id, x, y, w, colors, setTheme) {
    super(ctx, id, x, 0, w, 0, colors.transparent, colors.transparent, 0);
    this.setTheme = setTheme;

    this.themes = [
      {
        name: "Green Tea",
        sides: 7,
        bg: "#819A91",
        slot: "#A7C1A8",
        valid: "#D1D8BE",
        pale: "#EEEFE0",
      }, 
      {
        name: "Wine",
        sides: 6,
        bg: "#6B3F69",
        slot: "#8D5F8C",
        valid: "#A376A2",
        pale: "#DDC3C3",
      }, 
      {
        name: "Coffee",
        sides: 8,
        bg: "#37353E",
        slot: "#715A5A",
        valid: "#AB886D",
        pale: "#D3DAD9",
      }, 
      {
        name: "Blueberry Juice",
        sides: 5,
        bg: "#3C467B",
        slot: "#7A85C1",
        valid: "#B2B0E8",
        pale: "#EAEFEF",
      }, 
      {
        name: "Negroni",
        sides: 4,
        bg: "#4C3A51",
        slot: "#774360",
        valid: "#B25068",
        pale: "#E7AB79",
      }, 
    ];

    this.colors = colors;

    this.btns = [];

    this.titleSpace = 50;
    this.themeSpace = 60;
    this.gap = 10;
    this.h = this.titleSpace + 50 + (this.themeSpace + this.gap) * (this.themes.length - 1);
    this.y = y + this.h / 2; 
    this.dy = y;

    this.setTheme(this.themes[0]);
    this.createBtns();
  }
  

  draw() {
    super.draw();

    this.ctx.fillStyle = this.colors.white;
    this.ctx.font = "30px Helvetica";
    this.ctx.fillText("Themes", 
      this.x, (this.dy + this.titleSpace / 2));
    
    this.btns.forEach((btn) => btn.draw());
  }

  createBtns() {
    this.themes.forEach((theme, i) => {
      this.btns.push(
        new ThemeBtn(
          this.ctx, theme.name,
          this.x, 
          this.dy + this.titleSpace + 30 + i * (this.themeSpace + this.gap),
          this.w, 40,
          theme,
          this.colors,
          this.setTheme
        )
      )
    });
  }

  // Events 
  onMouseDown(x, y) {
    this.btns.forEach(btn => {
      if (btn.isPointerInside(x, y))
        btn.onMouseDown(x, y)
    })
  }
}