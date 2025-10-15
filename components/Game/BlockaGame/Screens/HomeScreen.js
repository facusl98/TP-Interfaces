import { BaseScreen } from "../../BaseScreen.js";

export class HomeScreen extends BaseScreen {
  constructor(manager, changeScreen) {
    super(manager, changeScreen);
    this.events = [
      {
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          this.changeScreen("SELECT")
        },
        hover: null
      },
    ];
  }

  draw() {
    // Play Btn: [270, 380] to [450, 430]
    this.ctx.font = "24px Helvetica";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(60, 30, 150, 1)";
    this.ctx.fillStyle = "rgba(90, 30, 180, 1)"
    this.manager.drawRoundedRect(270, 380, 180, 50, 10);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(240, 230, 240, 1)";
    this.ctx.fillText("Play", 360, 405);
  }
}