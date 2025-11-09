import { Canvas } from "../Singletons/Canvas.js";
import { GameManager } from "../Singletons/GameManager.js";
import { Player } from "../Singletons/Player.js";
import { Background } from "./Background.js";

export class BGLayer {
  constructor(src, speed) {
    this.speed = speed;
    this.src = src;

    this.bgs = [];
    this.build();
  }

  build() {
    this.bgs = [];
    const {src} = this;
    const {width, height} = Canvas;
    for (let i = 0; i < 3; i++) {
      this.bgs.push(
        new Background(src, i * width, 0)
      );
    }
  }

  draw() {
    const {bgs, speed} = this;
    bgs.forEach((bg) => {
      bg.draw();
      if (GameManager.isRunning()) bg.x += speed
    });
    this.purge();
  }

  purge() {
    const {width} = Canvas;
    const {bgs, src} = this;
    if (bgs[0].isPast()) {
      const last = bgs[bgs.length - 1];
      bgs.shift();
      bgs.push(
        new Background(src, last.x + width, 0)
      )
    }
  }
}
