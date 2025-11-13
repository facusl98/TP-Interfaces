import { Rectangle } from "../Figures/Rectangle.js";
import { TextFigure } from "../Figures/TextFigure.js";

export class Timer extends Rectangle {
  constructor(ctx, colors, gameOver) {
    const x = 1080 - 120; const y = 15 + 50 / 2;
    const h = 50; const w = 200;
    super(ctx, "Timer", x, y, w, h, colors.bg, colors.slot, 1);
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
    
    // Refresh text value, increase time
    // Executes itself if time is not yet past the limit
    // Executes game over if it ran out of time
    this.timeIncrease = () => {
      this.time++;
      const m = Math.floor(this.time / 60);
      const s = this.time % 60;
      this.timerText.text = `${m}:${s < 10 ? `0${s}` : s}`;
      this.loadingBar.w = this.w / this.timeLimit * this.time;
      if (this.time < this.timeLimit) 
        this.timeout = setTimeout(this.timeIncrease, 1000);
      else gameOver("You ran out of time");
    }
    this.timeIncrease();
  }

  draw() {
    super.draw();

    this.loadingBar.draw();
    this.timerText.draw();
  }

  // Assigns theme colors to BG, text stroke and loading bar.
  setTheme(colors) {
    this.colors = colors;
    this.fill = colors.bg;
    this.stroke = colors.slot;
    this.timerText.stroke = colors.bg;
    this.loadingBar.fill = colors.slot;
    this.loadingBar.stroke = colors.valid;
  }

  stopTimer() {
    clearInterval(this.timeout);
  }

  // Sets timer to -1 (0)
  // Stops current timer and starts a new one;
  reset() {
    this.time = -1;
    this.stopTimer();
    this.timeIncrease();
  }
}