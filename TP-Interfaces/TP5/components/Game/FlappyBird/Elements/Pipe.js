import { Rectangle } from "../Figures/Rectangle.js";
import { Sprite } from "./Sprite.js";

export class Pipe extends Rectangle {
  constructor(x, y, upper) {
    const tileSize = 32;
    const h = tileSize * 10; 
    const direction = upper ? -1 : 1;
    const displacement = 125;
    const offset = (displacement + h/2) * direction; 
    super(
      x, y + offset,
      32, h,
    );

    this.sprite = new Sprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Pipes/Pipe_Tile.png",
      tileSize
    )
  }

  draw() {
    super.draw();
    const { x, y, h, w, sprite } = this;
    const dx = x - w/2;
    const dy = y - h/2;
    for (let i = 0; i < Math.floor(h/w); i++) {
      sprite.draw(
        dx, dy + i * w, 2
      )
    }
  }
}