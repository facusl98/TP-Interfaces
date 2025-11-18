import { Rectangle } from "../Figures/Rectangle.js";
import { AnimatedSprite } from "./AnimatedSprite.js";
import { Sprite } from "./Sprite.js";

export class Pipe extends Rectangle {
  constructor(x, y, upper) {
    const w = 64;
    const h = w * 10; 
    const direction = upper ? -1 : 1;
    const displacement = 125;
    const offset = (displacement + h/2) * direction; 
    super(
      x, y + offset,
      w, h,
    );

    this.centerY = y;
    this.upper = upper;

    this.tileSprites = [];
    this.generateTiles();
    this.tileSprites.forEach((t) => t.play());
  }

  draw() {
    super.draw();
    const { x, y, h, w, tileSprites } = this;
    const dx = x - w/2;
    const dy = y - h/2;

    tileSprites.forEach((tile, i) => {
      tile.draw(
        dx, dy + i * w , w, w
      )
    })
  }

  generateTiles() {
    const { h, w, upper } = this;
    const imageUrl = "/TP-Interfaces/TP5/assets/images/flappy_bird/Pipes/";
    
    const sprite = 128;
    const base = new Sprite(
      imageUrl + "Pipe_Tile_Base.png", sprite, sprite
    );
    const top = new Sprite(
      imageUrl + "Pipe_Tile_Top.png", sprite, sprite
    )
    const bottom = new Sprite(
      imageUrl + "Pipe_Tile_Bottom.png", sprite, sprite
    )

    const sprites = [
      new AnimatedSprite(
        imageUrl + "Pipe_Tile_01.png", sprite, sprite,
        1000, [0, 250, 500, 750], true, false
      ),
      new AnimatedSprite(
        imageUrl + "Pipe_Tile_02.png", sprite, sprite,
        2000, [0, 1000, 1200, 1300], false, true
      ),
      new Sprite(
        imageUrl + "Pipe_Tile_03.png", sprite, sprite
      ),
      new Sprite(
        imageUrl + "Pipe_Tile_04.png", sprite, sprite,
      )
    ];

    const tiles = Math.floor(h/w);

    for (let i = 0; i < tiles; i++) {

      if (i == 0 && !upper) {
        this.tileSprites[i] = top;
      } else if (i == tiles - 1 && upper) {
        this.tileSprites[i] = bottom;
      } else {
        const basic = Math.random() > .2;
        const spriteIndex = Math.floor(Math.random() * sprites.length);
        this.tileSprites[i] = basic ? base : sprites[spriteIndex];
      }
    }
  }
}