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
    ];
    this.images = [];
    this.validSizes = [2, 3, 4, 5];
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


    const y = 200, w = 40, h = 40, r = 5, gap = 10;
    const x = 720 / 2 - ((w + gap) * (this.validSizes.length - 1) + w) / 2
    this.drawGridSizeSelector(x, y, w, h, gap);
    this.addGridSizeEvents(x, y, w, h, gap);

    this.rouletteSelect();

    // Level Text: [270, 20] to [450, 98]
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(270, 20, 180, 78, 5);
    this.ctx.fill();
    const fontSize = 24;  
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.font = `${fontSize}px Helvetica`;
    this.ctx.fillText(
      `Level ${this.game.level + 1} / ${this.toolkit.keys.length}`,
      720/2 , 30 + fontSize / 2
    )
    this.ctx.fillText(
      `${this.toolkit.keys[this.game.level]}`,
      720/2 , 30 + fontSize + 10 + fontSize / 2
    )

    // this.showEventHitboxes();
  }

  drawLevels() {
    if (!this.ready) return;
    
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(95, 270, 530, 80, 5);
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
    let speed = 0; // Place at 80. 0 for Game screen development
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

  drawGridSizeSelector(x, y, w, h, gap) {
    const pad = 10, font = 24;
    const textSpace = font + 20;
    const totalW = (this.validSizes.length - 1) * (w + gap) + w + pad;
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(
      x - pad / 2, y - pad / 2 - textSpace, 
      totalW, h + pad + textSpace, 5
    );
    this.ctx.fill();

    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.font = `${font}px Helvetica`;
    this.ctx.fillText("Difficulty", x + totalW / 2, (y + (h + pad) / 2) - 50)

    this.validSizes.forEach((size) => {this.drawGridBtn(x, y, w, h, gap, size)})
  }


  drawGridBtn(x, y, w, h, gap, size, hover = false) {
    const padding = 6, r = 3;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.game.colors.purpleHover;
    if (hover)
      this.ctx.fillStyle = this.game.colors.purpleHover;
    else 
      this.ctx.fillStyle = this.game.colors.purple;
    if (this.game.gridSize == size) 
      this.ctx.fillStyle = this.game.colors.purpleActive;
    
    let px = x + this.validSizes.indexOf(size) * (w + gap); 
    this.ctx.beginPath();
    this.ctx.roundRect(px, y, w, h, r);
    this.ctx.fill();
    this.ctx.stroke();

    const iconSpace = h - padding * 2;
    const cellSize = iconSpace / size;
    const cx = px + padding, cy = y + padding;
    this.ctx.strokeStyle = this.game.colors.light;
    this.ctx.lineWidth = 1;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.ctx.strokeRect(
          cx + cellSize * i, cy + cellSize * j,
          cellSize, cellSize
        );
      }
    }
  } 

  addGridSizeEvents(x, y, w, h, gap) {
    this.validSizes.map((size) => {
      const ex = x + this.validSizes.indexOf(size) * (w + gap);
      this.events.push(
          {
          name: `Grid${size}`,
          x1: ex, x2: ex + w, y1: y, y2: y + h, 
          click: () => {
            this.game.gridSize = size;
            this.drawGridSizeSelector(x, y, w, h, gap);
          },
          hover: () => {
            this.drawGridBtn(x, y, w, h, gap, size, true);
          },
          unhover: () => {
            this.drawGridBtn(x, y, w, h, gap, size);
          }
        }
      );
    })
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