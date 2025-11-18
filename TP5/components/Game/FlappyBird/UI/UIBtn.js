import { Writer } from "../Services/Writer.js";
import { Click } from "../Singletons/Events.js";
import { UIBox } from "./UIBox.js";

export class UIBtn extends UIBox {
  constructor(text, font, style, x, y, tileSize, cols, rows, event) {
    super(x, y, tileSize, cols, rows, true, true);
    this.text = text;
    this.font = font;
    this.style = style;
    this.event = event;

    Click.push(this);
  }

  draw() {
    super.draw();
    const {x, y, w, h, font, text, style} = this;
    Writer.write(x + w/2 , y + h/2, text, font, style, true);
  }

  trigger() {
    this.event();
  }
}