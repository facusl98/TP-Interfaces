import { Rectangle } from "./Rectangle.js";
import { TextFigure } from "./TextFigure.js";

export class Timer extends Rectangle {
  constructor(ctx, id, x, y, w, h, colors, gameOver) {
    super(ctx, id, x, y, w, h, colors.bg, colors.slot, 1);
    this.colors = colors;

    this.timerText = new TextFigure(
      ctx, x, y, "0:00", 30, undefined, colors.white, colors.bg, 5
    );

    this.time = 0;
    this.timeLimit = 300;
    
    this.loadingBar = new Rectangle(
      ctx, "loadingBar", 
      0, y, 0, h, 
      colors.valid
    );
    this.loadingBar.dx = this.dx;
    
    const timeIncrease = () => {
      this.time++;
      const m = Math.floor(this.time / 60);
      const s = this.time % 60;
      this.timerText.text = `${m}:${s < 10 ? `0${s}` : s}`;
      this.loadingBar.w = this.w / this.timeLimit * this.time;
      if (this.time < this.timeLimit) setTimeout(timeIncrease, 1000);
      else gameOver();
    }
    timeIncrease();
  }

  draw() {
    super.draw();

    this.loadingBar.draw();
    this.timerText.draw();
  }

  setTheme(colors) {
    this.colors = colors;
    this.fill = colors.bg;
    this.stroke = colors.slot;
    this.timerText.stroke = colors.bg;
    this.loadingBar.fill = colors.slot;
    this.loadingBar.stroke = colors.valid;
  }
}