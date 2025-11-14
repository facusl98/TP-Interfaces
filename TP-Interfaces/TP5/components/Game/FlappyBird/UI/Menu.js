import { Writer } from "../Services/Writer.js";
import { Canvas } from "../Singletons/Canvas.js";
import { UIManager } from "../Singletons/UIManager.js";
import { Controls } from "./Controls.js";
import { UIBox } from "./UIBox.js";
import { UIBtn } from "./UIBtn.js";
import { UIElement } from "./UIElement.js";

export class Menu extends UIElement {
  constructor(x, y) {
    super(x, y);

    const tileSize = 48;
    const cols = 10;
    const rows = 8;
    
    this.w = cols * tileSize;
    this.h = rows * tileSize;

    const rx = x - (this.w / 2);
    const ry = y - (this.h / 2);
    this.bg = new UIBox(rx, ry, tileSize, cols, rows, false, false);

    const offsetY = 50;
    const gap = 20;
    const btnCols = 6;
    const texts = ["Resume", "Controls"]
    const events = [
      () => {
        if (UIManager._menuOpen)
          UIManager.toggleMenu();
      },
      () => {
        this.controlsOpen = true;
      }
    ]

    this.btns = [];
    for (let i = 0; i < texts.length; i++) {
      this.btns.push(
        new UIBtn(
          texts[i], 32, "DARK",
          x - btnCols * tileSize / 2, y - offsetY + i * (tileSize + gap), tileSize, 6, 1, events[i]
        ),
      );
    }

    this.controls = new Controls(x, y);
    this.controlsOpen = false;
  }

  draw() {
    const {x, y, w, h, bg} = this;
    const {ctx, width, height} = Canvas;
  
    ctx.fillStyle = "#0000006f"
    ctx.fillRect(0, 0, width, height);

    bg.draw();
    Writer.write(x, y - h/2 + 75, "Wisp Away", 48, "DARK", true);

    if (!this.controlsOpen)
      this.btns.forEach((btn) => {btn.draw()});
    else {
      this.btns[0].draw();
      this.controls.draw();
    }
  }
}