import { StaticSprite } from "../Elements/StaticSprite.js";
import { Writer } from "../Services/Writer.js";
import { Player } from "../Singletons/Player.js";
import { UIElement } from "./UIElement.js";

export class Score extends UIElement {
  constructor(x, y) {
    super(x, y);
    this.w = 150;
    this.h = 48;
    
    this.bg = new StaticSprite(
      this.url + "Slot_Long.png", 400, 128
    );
    this.icon = new StaticSprite(
      this.url + "Icon_Score.png", 128, 128
    )
  }

  draw() {
    const { x, y, w, h, bg, icon } = this;
    const score = Math.floor((Player.x - Player.defX) / 50);
    bg.draw(x, y, w, h);
    icon.draw(x, y, h, h);
    Writer.write(x + 48, y + h/2, `${score}m`, 30 );
  }
  
}