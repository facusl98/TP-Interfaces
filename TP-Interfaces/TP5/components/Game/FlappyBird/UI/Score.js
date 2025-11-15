import { StaticSprite } from "../Elements/StaticSprite.js";
import { Writer } from "../Services/Writer.js";
import { GameManager } from "../Singletons/GameManager.js";
import { Player } from "../Singletons/Player.js";
import { UIBox } from "./UIBox.js";
import { UIElement } from "./UIElement.js";

export class Score extends UIElement {
  constructor(x, y) {
    super(x, y);
    this.w = 150;
    this.h = 48;
    
    this.bg = new UIBox(x, y, 48, 3, 1, false, false)
    this.icon = new StaticSprite(
      this.url + "Icon_Score.png", 128, 128
    )
  }

  draw() {
    const { x, y, w, h, bg, icon } = this;
    const score = Math.floor((Player.x - Player.defX) / 50);
    bg.draw();
    icon.draw(x, y, h, h);
    Writer.write(x + w/2, y + h/2, `${score}m`, 30, "DARK", true);

    if (score > 600) 
      GameManager.win();
  }
  
}