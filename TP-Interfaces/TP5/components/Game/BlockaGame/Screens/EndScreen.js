import { BaseScreen } from "../../BaseScreen.js";

export class EndScreen extends BaseScreen {
  constructor(game, changeScreen) {
    super(game, changeScreen);

    this.events = [
      {
        name: "PlayAgainBtn",
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          this.game.level = 0;
          this.changeScreen("SELECT");
        },
        hover: () => { this.drawPlayAgain(true) },
        unhover: () => { this.drawPlayAgain() }
      },
    ];
  }

  draw(params = { state: "WIN" }) {
    let text = "";
    if (params.state == "WIN") text = "You won, well done!"
    else text = "You run out of time..."
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.strokeStyle = this.game.colors.dark;
    this.ctx.lineWidth = 5;
    this.ctx.font = "50px Helvetica";
    this.ctx.strokeText(text, 720 / 2, 100)
    this.ctx.fillText(text, 720 / 2, 100);

    this.drawPlayAgain();
  }

  drawPlayAgain(hover = false) {
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
    this.ctx.fillText("Play Again?", 360, 405);
  }
}