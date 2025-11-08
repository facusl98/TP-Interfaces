import { Player } from "../Singletons/Player.js";
import { StaticAnimatedSprite } from "./StaticAnimatedSprite.js";
import { StaticSprite } from "./StaticSprite.js";

export class HPBar {
  constructor(x, y) {
    this.x = x, this.y = y;
    this.w = 32;

    const url = "/TP-Interfaces/TP5/assets/images/flappy_bird/UI/UI_";
    this.bg = new StaticSprite(
      url + "Slot.png", this.w
    )
    this.full = new StaticAnimatedSprite(
      url + "HP_Full.png", this.w, this.w, 1000, [0, 300, 600], true
    )
    this.empty = new StaticSprite(
      url + "HP_Empty.png", this.w
    )
  }

  draw() {
    const { x, y, w, bg, empty, full } = this;
    const gap = 3;
    const scale = 1.5;
    for (let i = 0; i < Player.maxHP; i++) {
      const dx = x + ((w * scale) + gap) * i;
      bg.draw(dx, y, scale);
      if (i < Player.hp)
        full.draw(dx, y, scale);
      else 
        empty.draw(dx, y, scale)
    }
  }
}