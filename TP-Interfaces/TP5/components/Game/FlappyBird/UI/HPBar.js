import { Player } from "../Singletons/Player.js";
import { StaticSprite } from "../Elements/StaticSprite.js";
import { UIElement } from "./UIElement.js";

export class HPBar extends UIElement {
  constructor(x, y) {
    super(x, y);
    this.slotW = 48;

    this.bg = new StaticSprite(
      this.url + "Slot.png", 128, 128
    )
    this.full = new StaticSprite(
      this.url + "HP_Full.png", 128, 128
    )
    this.empty = new StaticSprite(
      this.url + "HP_Empty.png", 128, 128
    )
  }

  draw() {
    const { x, y, slotW, bg, empty, full } = this;
    const gap = 3;
    for (let i = 0; i < Player.maxHP; i++) {
      const dx = x + (slotW + gap) * i;
      bg.draw(dx, y, slotW, slotW);
      if (i < Player.hp)
        full.draw(dx, y, slotW, slotW);
      else 
        empty.draw(dx, y, slotW, slotW)
    }
  }
}