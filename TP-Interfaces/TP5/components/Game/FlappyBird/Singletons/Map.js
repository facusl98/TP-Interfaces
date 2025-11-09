import { Pipe } from "../Elements/Pipe.js";
import { Canvas } from "./Canvas.js";
import { GameManager } from "./GameManager.js";
import { Player } from "./Player.js";

class _Map {
  constructor() {
    this.player = Player;
    this.pipes = new Set;
    this.items = new Set;
  }

  draw() {
    this.pipes.forEach((pipe) => pipe.draw());
    this.items.forEach((item) => item.draw());
    this.player.draw();

    this.update();
  }

  update() {
    if (this.pipes.size < 10) 
      this.createPipe();
    if (this.pipes.size > 9) 
      this.purgePipes();

    if (GameManager.isRunning())
      this.checkCollisions();
  }

  createPipe() {
    const { height } = Canvas;
    const startX = 300;
    const rangeX = 200;
    const pipes = [...this.pipes];

    const f = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    const offsetX = f(0, 100);
    const offsetY = f(-100, 100);
    
    const y = height/2 + offsetY;
    const prevX = pipes[pipes.length - 1]?.x ?? startX;
    const x = prevX + rangeX + offsetX;

    this.pipes.add(
      new Pipe(x, y, true)
    );

    this.pipes.add(
      new Pipe(x, y, false)
    );
  }

  purgePipes() {
    this.pipes.forEach((pipe) => {
      if (pipe.isPast())
        this.pipes.delete(pipe);
    });
  }

  checkCollisions() {
    const pipes = [...this.pipes];
    for (let i = 0; i < this.pipes.size / 2; i++) {
      if (pipes[i].isColliding()){
        Player.hit(pipes[i]);
      }
    }
  }

  reset() {
    this.pipes.clear();
    this.items.clear();
  }
}

export const Map = new _Map;