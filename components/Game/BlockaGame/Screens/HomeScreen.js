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
      {
        name: "Grid2",
        x1: 660, x2: 700, y1: 20, y2: 60, 
        click: () => {
          this.game.gridSize = 2;
          this.drawGridSizeSelector();
        },
        hover: () => {
          this.drawGridBtn(2, true);
        },
        unhover: () => {
          this.drawGridBtn(2);
        }
      },
      {
        name: "Grid3",
        x1: 660, x2: 700, y1: 70, y2: 110, 
        click: () => {
          this.game.gridSize = 3;
          this.drawGridSizeSelector();
        },
        hover: () => {
          this.drawGridBtn(3, true);
        },
        unhover: () => {
          this.drawGridBtn(3);
        }
      },
      {
        name: "Grid4",
        x1: 660, x2: 700, y1: 120, y2: 160, 
        click: () => {
          this.game.gridSize = 4;
          this.drawGridSizeSelector();
        },
        hover: () => {
          this.drawGridBtn(4, true);
        },
        unhover: () => {
          this.drawGridBtn(4);
        }
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

  drawGridSizeSelector() {
    // Grid 2: [660, 20] to [700, 60]
    this.drawGridBtn(2)

    // Grid 3: [660, 70] to [700, 110]
    this.drawGridBtn(3)

    // Grid 4: [660, 120] to [700, 160]
    this.drawGridBtn(4)
  }


  drawGridBtn(size, hover = false) {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.game.colors.purple;
    if (hover)
      this.ctx.fillStyle = this.game.colors.purpleHover;
    else 
      this.ctx.fillStyle = this.game.colors.purple;
    if (this.game.gridSize == size) 
      this.ctx.fillStyle = this.game.colors.purpleActive;

    let py = 20 + (size - 2) * 50; // Starting from 20, 50 offset for each btn.
    let ty = py + 20; // Text position 

    this.ctx.beginPath();
    this.ctx.roundRect(660, py, 40, 40, 5);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.fillText(size, 680, ty);
  }
}