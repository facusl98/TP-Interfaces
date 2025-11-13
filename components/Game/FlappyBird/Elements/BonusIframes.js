
import { Circle } from "../Figures/Circle.js";
import { Player } from "../Singletons/Player.js";
import { AnimatedSprite } from "./AnimatedSprite.js";

export class BonusIframes extends Circle {
  constructor(x, y, r) {
    super(x, y, r);
    const url = "/TP-Interfaces/TP5/assets/images/flappy_bird/Bonus/Bonus_";
    this.sprite = new AnimatedSprite(
      url + "Iframes.png", 128, 128, 
      1000, [0, 50, 200, 500, 800], true, false
    );
  }

  draw() {
    const {x, y, r, sprite} = this;
    sprite.draw(x - r, y - r, r * 1.8, r * 1.8);
  }


  trigger() {
    Player.addIframes(150);
  }
}