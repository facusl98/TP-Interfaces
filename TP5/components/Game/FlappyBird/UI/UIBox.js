import { Canvas } from "../Singletons/Canvas.js";
import { Hover } from "../Singletons/Events.js";

export class UIBox {
  constructor(x, y, tileSize, cols, rows, hoverable = false) {
    this.cols = cols;
    this.rows = rows;
    this.x = x;
    this.y = y;
    this.size = tileSize;

    this.w = cols * tileSize;
    this.h = rows * tileSize;

    this.hovered = false;
    if (hoverable)
      Hover.push(this);

    this.tileSize = 128;
    this.tiles = [];

    const tile = this.tileSize;
    this.tileMap = {
      // One side
      "up":            { x: tile * 2, y: tile * 1 },
      "right":         { x: tile * 3, y: tile * 2 },
      "down":          { x: tile * 2, y: tile * 3 },
      "left":          { x: tile * 1, y: tile * 2 },

      // Two Sides
      "right+up":      { x: tile * 3, y: tile * 1 },
      "down+right":    { x: tile * 3, y: tile * 3 },
      "down+left":     { x: tile * 1, y: tile * 3 },
      "left+up":       { x: tile * 1, y: tile * 1 },

      // Opposites
      "down+up":       { x: tile * 2, y: tile * 0 },
      "left+right":    { x: tile * 0, y: tile * 2 },

      // Three Sides
      "left+right+up":   { x: tile * 0, y: tile * 1 },
      "down+left+right": { x: tile * 0, y: tile * 3 },
      "down+left+up":    { x: tile * 1, y: tile * 0 },
      "down+right+up":   { x: tile * 3, y: tile * 0 },

      // All or None
      "down+left+right+up": { x: tile * 0, y: tile * 0 },
      "":                   { x: tile * 2, y: tile * 2 }
    };

    this.defaultReady = false;
    this.mapImg =  new Image();
    this.mapImg.src = "/TP-Interfaces/TP5/assets/images/flappy_bird/UI/UI_Tileset.png";
    this.mapImg.onload = () => {
      this.defaultReady = true
    };

    this.hoverReady = false;
    this.mapHover =  new Image();
    this.mapHover.src = "/TP-Interfaces/TP5/assets/images/flappy_bird/UI/UI_Tileset_Hover.png";
    this.mapHover.onload = () => {
      this.hoverReady = true
    };


    this.build();
  }

  build() {
    const { cols, rows, tileMap } = this;

    const keysOf = ({ up, down, left, right }) => {
      const sides = [];
      if (up) sides.push("up");
      if (down) sides.push("down");
      if (left) sides.push("left");
      if (right) sides.push("right");
      return sides.sort().join("+");
    }

    for (let i = 0; i < rows; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < cols; j++) {
        const sides = {
          left: (j == 0),
          up: (i == 0),
          right: (j == cols - 1),
          down: (i == rows - 1),
        }
        this.tiles[i][j] =tileMap[keysOf(sides)];

      }
    }
  }

  draw() {
    const { x, y, size, defaultReady, hoverReady, mapImg, mapHover, tiles, tileSize, hovered } = this;
    if (!(defaultReady && hoverReady)) return;
    const { ctx } = Canvas; 

    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        const tile = tiles[i][j];
        ctx.drawImage(
        !hovered ? mapImg : mapHover,
        tile.x, tile.y, tileSize, tileSize,
        x + size * j, y + size * i, size, size
      )
      }
    }
  }

  isInside(px, py) {
    const {x, y, w, h} = this;
    return (
      px > x && px < x + w &&
      py > y && py < y + h
    );
  }
}