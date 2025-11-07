import { Rectangle } from "../Figures/Rectangle.js";
import { AnimatedSprite } from "./AnimatedSprite.js";
import { Sprite } from "./Sprite.js";

export class Pipe extends Rectangle {
  constructor(x, y, upper) {
    const tileSize = 32;
    const w = tileSize;
    const h = tileSize * 10; 
    const direction = upper ? -1 : 1;
    const displacement = 125;
    const offset = (displacement + h/2) * direction; 
    super(
      x, y + offset,
      w, h,
    );

    this.tileSize = tileSize;
    this.upper = upper;

    this.tileSprites = [];
    this.generateTiles();
  }

  draw() {
    super.draw();
    const { x, y, h, w, tileSprites } = this;
    const dx = x - w/2;
    const dy = y - h/2;
    tileSprites.forEach((tile, i) => {
      tile.draw(
        dx, dy + i * w * 2, 2
      )
    })
  }

  generateTiles() {
    const { tileSize, h, w, upper } = this;
    const imageUrl = "/TP-Interfaces/TP5/assets/images/flappy_bird/Pipes/";
    
    const base = new Sprite(
      imageUrl + "Pipe_Tile_Base.png", tileSize
    );
    const top = new Sprite(
      imageUrl + "Pipe_Tile_Top.png", tileSize
    )
    const bottom = new Sprite(
      imageUrl + "Pipe_Tile_Bottom.png", tileSize
    )

    const sprites = [
      new AnimatedSprite(
        imageUrl + "Pipe_Tile_01.png", tileSize,
        1000, [0, 400, 600], true
      ),
      new AnimatedSprite(
        imageUrl + "Pipe_Tile_02.png", tileSize,
        1000, [0, 400, 600], true
      ),
      new Sprite(
        imageUrl + "Pipe_Tile_03.png", tileSize
      ),
      new AnimatedSprite(
        imageUrl + "Pipe_Tile_04.png", tileSize,
        1000, [0, 500], true
      )
    ];

    const tiles = Math.floor(h/w) / 2;

    for (let i = 0; i < tiles; i++) {

      if (i == 0 && !upper) {
        this.tileSprites[i] = top;
      } else if (i == tiles - 1 && upper) {
        this.tileSprites[i] = bottom;
      } else {
        const basic = Math.random() > .5;
        const spriteIndex = Math.floor(Math.random() * sprites.length);
        this.tileSprites[i] = basic ? base : sprites[spriteIndex];
      }
    }
  }
}