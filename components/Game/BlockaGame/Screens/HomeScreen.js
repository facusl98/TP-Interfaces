import { BaseScreen } from "../../BaseScreen.js";

export class HomeScreen extends BaseScreen {
  constructor(manager, changeScreen) {
    super(manager, changeScreen);
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
        },
        hover: null
      },
      {
        name: "Grid3",
        x1: 600, x2: 700, y1: 70, y2: 110, 
        click: () => {
          this.game.gridSize = 3;
        },
        hover: null
      },
      {
        name: "Grid4",
        x1: 600, x2: 700, y1: 120, y2: 160, 
        click: () => {
          this.game.gridSize = 4;
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
    this.ctx.fillStyle = "rgba(240, 230, 240, 1)";
    this.ctx.font = "50px Helvetica";
    this.ctx.fillText("Blocka: The Game", 360, 250);
  }

  drawPlay() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(60, 30, 150, 1)";
    this.ctx.fillStyle = "rgba(90, 30, 180, 1)"
    this.manager.drawRoundedRect(270, 380, 180, 50, 10);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(240, 230, 240, 1)";
    this.ctx.fillText("Play", 360, 405);
  }

  drawGridSizeSelector() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "rgba(60, 30, 150, 1)";
    this.ctx.fillStyle = "rgba(90, 30, 180, 1)"

    // Grid 2: [660, 20] to [700, 60]
    this.manager.drawRoundedRect(660, 20, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    // Grid 3: [660, 70] to [700, 110]
    this.manager.drawRoundedRect(660, 70, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    // Grid 4: [660, 120] to [700, 160]
    this.manager.drawRoundedRect(660, 120, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = "rgba(240, 230, 240, 1)";
    this.ctx.fillText("2", 680, 40);
    this.ctx.fillText("3", 680, 90);
    this.ctx.fillText("4", 680, 140);
  }
}