import { Writer } from "../Services/Writer.js";
import { UIElement } from "./UIElement.js";

export class Controls extends UIElement {
  constructor(x, y) {
    super(x, y);
  }

  draw() {
    const {x, y} = this;
    const keys = ["Escape", "Space Bar", "R"];
    const descriptions = [
      "Open/Close Menu & Pause",
      "Jump",
      "Restart Level",
    ];

    const offset = 30, height = 40;
    for(let i = 0; i < keys.length; i++) {
      Writer.write(x - 200, y + offset + (height * i), `[${keys[i]}]:`, 36, "DARK", false);
      Writer.write(x, y + offset + 8 + (height * i), descriptions[i], 20, "DARK", false);
    }
  }
}