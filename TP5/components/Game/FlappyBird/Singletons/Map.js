import { BonusHeal } from "../Elements/BonusHeal.js";
import { BonusIframes } from "../Elements/BonusIframes.js";
import { Pipe } from "../Elements/Pipe.js";
import { Canvas } from "./Canvas.js";
import { GameManager } from "./GameManager.js";
import { Player } from "./Player.js";

class _Map {
  constructor() {
    this.player = Player;
    this.pipes = new Set;
    this.items = new Set;

    this.validBonuses = [BonusHeal, BonusIframes];
  }

  draw() {
    this.pipes.forEach((pipe) => pipe.draw());
    this.items.forEach((item) => item.draw());
    this.player.draw();

    this.update();
  }

  update() {
    if (this.pipes.size < 10) 
      this.create();
    if (this.pipes.size > 9) 
      this.purge();

    if (GameManager.isRunning())
      this.checkCollisions();
  }

  create() {
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

    if (Math.random() > .9) {
      const BonusClass = this.validBonuses[Math.floor(Math.random() * this.validBonuses.length)];
      const bonus = new BonusClass(x, y, 48);
      this.items.add(bonus);
    }
  }

  purge() {
    this.pipes.forEach((pipe) => {
      if (pipe.isPast())
        this.pipes.delete(pipe);
    });

    this.items.forEach((item) => {
      if (item.isPast())
        this.items.delete(item);
    });
  }

  checkCollisions() {
    const pipes = [...this.pipes];
    for (let i = 0; i < this.pipes.size / 2; i++) {
      if (pipes[i].isColliding()){
        Player.hit(pipes[i]);
      }
    }

    const items = [...this.items];
    for (let i = 0; i < this.items.size; i++) {
      if (items[i].isColliding()){
        items[i].trigger();
        this.items.delete(items[i]);
      }
    }
  }

  reset() {
    this.pipes.clear();
    this.items.clear();
  }
}

export const Map = new _Map;