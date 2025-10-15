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
        hover: null
      },
      {
        name: "Grid2",
        x1: 600, x2: 700, y1: 20, y2: 60, 
        click: () => {
          this.game.gridSize = 2;
          this.game.drawCurrent();
        },
        hover: null
      },
      {
        name: "Grid3",
        x1: 600, x2: 700, y1: 70, y2: 110, 
        click: () => {
          this.game.gridSize = 3;
          this.game.drawCurrent();
        },
        hover: null
      },
      {
        name: "Grid4",
        x1: 600, x2: 700, y1: 120, y2: 160, 
        click: () => {
          this.game.gridSize = 4;
          this.game.drawCurrent();
        },
        hover: null
      },
    ];
  }

  draw() {
    // Play Btn: [270, 380] to [450, 430]
    this.drawPlay();

    // Grid Size Selector: [660, 20] to [700, 160]
    this.drawGridSizeSelector();

    // Title: [260, 225] to [460, 275]
    this.ctx.font = "bold 50px Helvetica";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgba(30, 30, 30, 1)";
    this.ctx.strokeText("Blocka: The Game", 360, 250)
    this.ctx.fillStyle = "rgba(240, 240, 250, 1)";
    this.ctx.fillText("Blocka: The Game", 360, 250);
  }

  drawPlay() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(60, 30, 150, 1)";
    this.ctx.fillStyle = "rgba(90, 30, 180, 1)"
    this.toolkit.drawRoundedRect(270, 380, 180, 50, 10);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = "rgba(240, 240, 250, 1)";
    this.ctx.fillText("Play", 360, 405);
  }

  drawGridSizeSelector() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(60, 30, 150, 1)";

    // Grid 2: [660, 20] to [700, 60]
    this.checkActiveSize(2);
    this.toolkit.drawRoundedRect(660, 20, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    // Grid 3: [660, 70] to [700, 110]
    this.checkActiveSize(3);
    this.toolkit.drawRoundedRect(660, 70, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    // Grid 4: [660, 120] to [700, 160]
    this.checkActiveSize(4);
    this.toolkit.drawRoundedRect(660, 120, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = "rgba(240, 240, 250, 1)";
    this.ctx.fillText("2", 680, 40);
    this.ctx.fillText("3", 680, 90);
    this.ctx.fillText("4", 680, 140);
  }

  checkActiveSize(n) {
    if (this.game.gridSize == n) 
      this.ctx.fillStyle = "rgba(123, 61, 216, 1)";
    else 
      this.ctx.fillStyle = "rgba(90, 30, 180, 1)";
  }
}