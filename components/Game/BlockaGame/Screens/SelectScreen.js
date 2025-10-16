import { BaseScreen } from "../../BaseScreen.js";

export class SelectScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [
      {
        name: "StartBtn",
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {
          this.changeScreen("HOME")
        },
        hover: () => { this.drawStart(true) },
        unhover: () => { this.drawStart() }
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
    this.drawLevels();
    // Levels Thumbnail: [97.5, 250] to [622.5, 310]
    this.drawStart();

    this.rouletteSelect();
  }

  drawLevels() {
    if (!this.ready) return;
    
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.roundRect(77.5, 230, 555, 100, 10);
    this.ctx.fill();
    for (let i = 0; i < this.levels; i++) {
      this.drawLevel(i)
    }
  }

  drawLevel(i, active = false) {
    const x = 97.5, y = 250, w = 60, h = 60, r = 5, gap = 15;
    this.ctx.strokeStyle = active ? 
    this.game.colors.purpleActive : this.game.colors.purple;

    this.ctx.lineWidth = active ? 5 : 6;

    this.toolkit.drawImageRounded(this.images[i], x + ((w + gap) * i), y, w, h, r);

    this.ctx.beginPath();
    this.ctx.roundRect(x + ((w + gap) * i), y, w, h, r);
    this.ctx.stroke();
  }

  rouletteSelect() {
    let current = 0, prev = null; 
    let speed = 150;
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
        this.selected = this.images[prev];
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