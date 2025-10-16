import { BaseScreen } from "../../BaseScreen.js";

export class GameScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [];
    this.time = 0;
  }

  draw() {
    this.time = 0;  
    // Timer: [20, 20] to [95, 70]
    setInterval(this.timer, 1000);
  }

  timer = () => {
    this.ctx.save();
    let m = Math.floor(this.time / 60);
    let s = this.time % 60;

    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(20, 20, 75, 50, 8);
    this.ctx.fill();
    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.fillText(`${m}:${s >= 10 ? s : `0${s}`}`, 57.5, 45);

    this.time += 1;
    this.ctx.restore();
  }
}