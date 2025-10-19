import { BaseScreen } from "../../BaseScreen.js";

export class SelectScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [
      {
        name: "StartBtn",
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          if (this.game.image != null)
            this.changeScreen("GAME")
        },
        hover: () => { this.drawStart(true) },
        unhover: () => { this.drawStart() }
      },
      {
        name: "Grid2",
        x1: 290, x2: 330, y1: 200, y2: 240, 
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
        x1: 340, x2: 380, y1: 200, y2: 240, 
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
        x1: 390, x2: 430, y1: 200, y2: 240, 
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
    this.images = [];
    this.ready = false;
    this.levels = 7;
    this.selected = 0;
    this.loadImages();
  }

  draw() {
    // Start Btn: [270, 380] to [450, 430]
    this.drawStart();
    // Levels Thumbnail: [97.5, 260] to [622.5, 360]
    this.drawLevels();

    // Grid Size Selector: [290, 200] to [430, 240]
    this.drawGridSizeSelector();

    this.rouletteSelect();

    // Level Text: [] to []
    const fontSize = 24;
    const levels = Object.keys(this.toolkit.filters)
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.font = `${fontSize}px Helvetica`;
    this.ctx.fillText(
      `Level ${this.game.level + 1} / ${levels.length}`,
      720/2 , 20 + fontSize / 2
    )
    this.ctx.fillText(
      `${levels[this.game.level]}`,
      720/2 , 20 + fontSize + 10 + fontSize / 2
    )

    // this.showEventHitboxes();
  }

  drawLevels() {
    if (!this.ready) return;
    
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.roundRect(77.5, 260, 555, 100, 10);
    this.ctx.fill();
    for (let i = 0; i < this.levels; i++) {
      this.drawLevel(i);
    }
  }

  drawLevel(i, active = false) {
    const y = 280, w = 60, h = 60, r = 5, gap = 15;
    const x = 720 / 2 - (w * this.levels + gap * (this.levels - 1)) / 2;
    this.ctx.strokeStyle = active ? 
    this.game.colors.purpleActive : this.game.colors.purple;

    this.ctx.lineWidth = active ? 5 : 6;

    this.ctx.drawImage(this.images[i], x + ((w + gap) * i), y, w, h);

    this.ctx.beginPath();
    this.ctx.roundRect(x + ((w + gap) * i), y, w, h, r);
    this.ctx.stroke();
  }

  rouletteSelect() {
    let current = 0, prev = null; 
    let speed = 0; // Place at 150. 0 for Game screen development
    const cycles = Math.floor(Math.random() * 2) + 2; // Full spins
    let steps = cycles * this.levels + Math.floor(Math.random() * this.levels); // Total Steps 

    const spin = () => {
      if (prev != null)
        this.drawLevel(prev, false); // Turn off previous

      this.drawLevel(current, true); // Turn on current

      prev = current;
      current = (current + 1) % this.levels;
      steps--;

      if (steps > 0) {
        speed *= 1.1; 
        setTimeout(spin, speed);
      } else {
        this.game.image = this.images[prev];
      }
    }

    spin();
  }

  drawStart(hover = false) {
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
    this.ctx.fillText("Start", 360, 405);
  }

  drawGridSizeSelector() {
    // Grid 2: [290, 200] to [330, 240]
    this.drawGridBtn(2)

    // Grid 3: [340, 200] to [380, 240]
    this.drawGridBtn(3)

    // Grid 4: [390, 200] to [430, 240]
    this.drawGridBtn(4)
  }


  drawGridBtn(size, hover = false) {
    this.ctx.lineWidth = 2;
    const y = 200, w = 40, h = 40, r = 5, gap = 10;
    const x = 720 / 2 - ((w + gap) * 2 + w) / 2
    this.ctx.strokeStyle = this.game.colors.purple;
    if (hover)
      this.ctx.fillStyle = this.game.colors.purpleHover;
    else 
      this.ctx.fillStyle = this.game.colors.purple;
    if (this.game.gridSize == size) 
      this.ctx.fillStyle = this.game.colors.purpleActive;
    
    // Starting from 20, 50 offset for each btn.
    let px = x + (size - 2) * (w + gap); 
    let tx = px + w / 2; // Text position 

    this.ctx.beginPath();
    this.ctx.roundRect(px, y, w, h, r);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.fillText(size, tx, y + w / 2);
  } 

  loadImages() {
    let loaded = 0;
    for (let i = 1; i <= this.levels; i++) {
      const img = new Image();
      img.src = `/assets/images/blocka/levels/img${i}.jpg`;
      img.onload = () => {
        this.images[i - 1] = img;
        loaded++;

        if (loaded === this.levels) {
          this.ready = true;
        }
      }
    }
  }
}