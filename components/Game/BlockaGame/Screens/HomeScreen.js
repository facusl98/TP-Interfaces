import { BaseScreen } from "../../BaseScreen.js";

export class HomeScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [
      {
        name: "PlayBtn",
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          this.changeScreen("SELECT")
        },
        hover: () => { this.drawPlay(true) },
        unhover: () => { this.drawPlay() }
      },
    ];
  }

  draw() {
    // Play Btn: [270, 380] to [450, 430]
    this.drawPlay();

    // Title: [260, 225] to [460, 275]
    this.ctx.font = "bold 50px Helvetica";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.game.colors.dark;
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.strokeText("Blocka: The Game", 360, 250)
    this.ctx.fillText("Blocka: The Game", 360, 250);

    // Debug for events
    // this.showEventHitboxes();
  }

  drawPlay(hover = false) {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.game.colors.purple;
    if (hover)
      this.ctx.fillStyle = this.game.colors.purpleHover;
    else 
      this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(270, 380, 180, 50, 10);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.fillText("Play", 360, 405);
  }
}