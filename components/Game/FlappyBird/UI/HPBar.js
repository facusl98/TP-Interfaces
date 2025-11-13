import { Player } from "../Singletons/Player.js";
import { StaticSprite } from "../Elements/StaticSprite.js";
import { UIElement } from "./UIElement.js";
import { UIBox } from "./UIBox.js";

export class HPBar extends UIElement {
  constructor(x, y) {
    super(x, y);
    this.slotW = 48;

    this.full = new StaticSprite(
      this.url + "HP_Full.png", 128, 128
    )
    this.empty = new StaticSprite(
      this.url + "HP_Empty.png", 128, 128
    )

    this.slots = [];
    for (let i = 0; i < Player.maxHP; i++) 
      this.slots.push(new UIBox(
        x + i * this.slotW, y, this.slotW, 1, 1, false, false
      ));
  }

  draw() {
    const { x, y, slotW, slots, empty, full } = this;
    slots.forEach(slot => slot.draw());
    for (let i = 0; i < Player.maxHP; i++) {
      const dx = x + slotW * i;
      if (i < Player.hp) 
        full.draw(dx, y, slotW, slotW);
      else 
        empty.draw(dx, y, slotW, slotW)
    }
  }
}