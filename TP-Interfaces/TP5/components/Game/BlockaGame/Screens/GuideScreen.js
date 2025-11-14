import { BaseScreen } from "../../BaseScreen.js";

export class GuideScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [
      {
        name: "GotIt",
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          this.changeScreen("SELECT");
        },
        hover: () => { this.drawGotIt(true) },
        unhover: () => { this.drawGotIt() }
      },
    ];
  }

  draw() {
    // GotIt Btn: [270, 380] to [450, 430]
    this.drawGotIt();
  
    this.ctx.fillStyle = this.game.colors.purple;
    const x = 720 / 2 - 300, y = 40, w = 600, h = 300, r = 5, gap = 40;
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, w, h, r);
    this.ctx.fill();
    this.ctx.font = "18px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    const text = [
      "Rotate the pieces to reasemble te original picture.",
      "RMB to rotate right, LMB to rotate left",
      "When stuck, use a hint. Though your timer will increase.",
      "If the picture is not done in 10 minutes, game over.",
      "Rise difficulty by increasing grid size.",
      "Further you go, harder it gets.",
      "Good luck."
    ]
    text.forEach((t, i) => {
      let offset = i - text.length / 2;
      this.ctx.fillText(t, 720 / 2, (y + (y + h) / 2) + offset * gap);
    })
  }

  drawGotIt(hover = false) {
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
    this.ctx.fillText("Got it", 360, 405);
  }
}