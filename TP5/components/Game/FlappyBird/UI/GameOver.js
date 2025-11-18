import { Writer } from "../Services/Writer.js";
import { UIBox } from "./UIBox.js";
import { UIElement } from "./UIElement.js";

export class GameOver extends UIElement {
  constructor(x, y) {
    super(x, y);
    
    const tileSize = 48;
    const cols = 8;
    const rows = 2;
    const rx = x - (cols * tileSize / 2);
    const ry = y - (rows * tileSize / 2);
    this.bg = new UIBox(rx, ry, tileSize, cols, rows, false, false);
  }

  draw(win) {
    const {x, y} = this;
    this.bg.draw();
    Writer.write(x, y, 
      win ? "You escaped succesfully" : "Game Over", 
      win ? 36 :  48, 
      "DARK", true);
  }
}