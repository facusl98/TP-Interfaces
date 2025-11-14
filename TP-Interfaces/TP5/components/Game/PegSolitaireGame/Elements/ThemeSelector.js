import { Rectangle } from "../Figures/Rectangle.js";
import { TextFigure } from "../Figures/TextFigure.js";
import { ThemeBtn } from "./ThemeBtn.js";

export class ThemeSelector extends Rectangle {
  constructor(ctx, colors, setTheme) {
    const y = 20;
    const x = 120;
    const w = 200;
    super(ctx, "Theme Selector", x, 0, w, 0, "transparent", "transparent", 0);
    this.setTheme = setTheme;

    this.themes = [
      {
        name: "Coffee",
        sides: 8,
        img: "/TP-Interfaces/TP5/assets/images/peg_solitaire/coffee.jpg",
        bg: "#37353E",
        slot: "#715A5A",
        valid: "#AB886D",
        pale: "#D3DAD9",
      }, 
      {
        name: "Green Tea",
        sides: 7,
        img: "/TP-Interfaces/TP5/assets/images/peg_solitaire/tea.jpg",
        bg: "#819A91",
        slot: "#A7C1A8",
        valid: "#D1D8BE",
        pale: "#EEEFE0",
      }, 
      {
        name: "Wine",
        sides: 6,
        img: "/TP-Interfaces/TP5/assets/images/peg_solitaire/wine.jpg",
        bg: "#6B3F69",
        slot: "#8D5F8C",
        valid: "#A376A2",
        pale: "#DDC3C3",
      }, 
      {
        name: "Blueberry Juice",
        sides: 5,
        img: "/TP-Interfaces/TP5/assets/images/peg_solitaire/blueberry.jpg",
        bg: "#3C467B",
        slot: "#7A85C1",
        valid: "#B2B0E8",
        pale: "#EAEFEF",
      }, 
      {
        name: "Negroni",
        sides: 4,
        img: "/TP-Interfaces/TP5/assets/images/peg_solitaire/negroni.jpg",
        bg: "#4C3A51",
        slot: "#774360",
        valid: "#B25068",
        pale: "#E7AB79",
      }, 
    ];

    this.colors = colors;

    this.btns = [];

    this.titleSpace = 30;
    this.themeSpace = 40;
    this.gap = 10;
    this.h = this.titleSpace + (this.themeSpace + this.gap) * (this.themes.length - 1);
    this.y = y + this.h / 2; 
    this.dy = y;

    this.title = new TextFigure(
      ctx, this.x, (this.dy + this.titleSpace / 2),
      "Theme", 30, undefined,
      colors.white
    );

    this.createBtns();
    this.setTheme(this.themes[0]);
  }
  

  draw() {
    super.draw();

    this.title.draw();
    
    this.btns.forEach((btn) => btn.draw());
  }

  // Creates a ThemeBtn for each theme on this.themes
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