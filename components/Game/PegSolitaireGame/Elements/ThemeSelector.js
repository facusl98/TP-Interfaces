import { Rectangle } from "./Rectangle.js";
import { ThemeBtn } from "./ThemeBtn.js";

export class ThemeSelector extends Rectangle {
  constructor(ctx, id, x, y, w, setTheme) {
    super(ctx, id, x, 0, w, 0, null, null, 0);
    this.setTheme = setTheme;

    this.themes = [
      {
        name: "Green Tea",
        dark: "#212121ff",
        bg: "#819A91",
        slot: "#D1D8BE",
        valid: "#A7C1A8",
        pale: "#EEEFE0",
        white: "#f6f6f6ff",
      }, 
      {
        name: "Wine",
        dark: "#212121ff",
        bg: "#6B3F69",
        slot: "#A376A2",
        valid: "#8D5F8C",
        pale: "#DDC3C3",
        white: "#f6f6f6ff",
      }, 
      {
        name: "Coffee",
        dark: "#212121ff",
        bg: "#37353E",
        slot: "#715A5A",
        valid: "#44444E",
        pale: "#D3DAD9",
        white: "#f6f6f6ff",
      }, 
      {
        name: "Blueberry Juice",
        dark: "#212121ff",
        bg: "#3C467B",
        slot: "#B2B0E8",
        valid: "#7A85C1",
        pale: "#EAEFEF",
        white: "#f6f6f6ff",
      }, 
      {
        name: "Negroni",
        dark: "#212121ff",
        bg: "#4C3A51",
        slot: "#774360",
        valid: "#B25068",
        pale: "#E7AB79",
        white: "#f6f6f6ff",
      }, 
    ];

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

    this.ctx.fillStyle = this.themes[0].white;
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