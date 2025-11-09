import { AnimatedSprite } from "../Elements/AnimatedSprite.js";
import { Circle } from "../Figures/Circle.js";
import { Canvas } from "./Canvas.js";
import { Camera } from "./Camera.js";
import { GameManager } from "./GameManager.js";

class _Player extends Circle {
  constructor() {
    const spriteSize = 32;
    const r = spriteSize - 4;
    super(0, 0, r);

    this.maxHP = 3;
    this.hp = 3;

    this.defX = 180;
    this.defY = 240;
    this.baseSpeed = {x: 5, y: -6};
    this.speed = { x: 0, y: 0 }
    this.jumps = 0;

    this.spriteIdle = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Idle.png",
      128, 128, 1000, [0, 300, 600], true, false
    );

    this.spriteJump = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Jump.png",
      128, 128, 100, [0, 1, 10, 20, 30], false, false
    );

    this.moves = 0;
  }

  draw() {
    super.draw();
    const { x, y, r, spriteIdle, spriteJump } = this;
    const dx = x - r;
    const dy = y - r;

    if (spriteJump.finished)
      spriteIdle.draw(dx, dy, 64, 64);
    else 
      spriteJump.draw(dx, dy, 64, 64, false);
  }

  move() {
    if (this.jumps <= 0) {
      this.y += -this.speed.y;
    } else {
      this.y += this.speed.y * this.jumps * 1.3;
      this.jumps--;
    }

    this.moves++;

    this.x += this.speed.x;
    Camera.coords = this.coords;
    
    this.speed.x = Math.min(
      this.baseSpeed.x * 2, 
      this.baseSpeed.x + (this.moves / 100));

    if (GameManager.isRunning())
      requestAnimationFrame(this.move.bind(this));
  }

  setUp() {
    const { width, height } = Canvas;
    this.x = this.defX;
    this.y = this.defY;
    this.jumps = 0;
    this.hp = this.maxHP;
    Camera.coords = this.coords;
  }

  stop() {
    this.pause();
  }

  pause() {
    this.over = true;
    this.speed.x = 0;
    this.speed.y = 0;
    this.moves = 0;
  }
  
  start() {
    this.speed = {
      x: this.baseSpeed.x,
      y: this.baseSpeed.y 
    }
    this.move();
  }

  reset() {
    this.stop();
    this.setUp();
  }

  jump() {
    if (GameManager.canStart()) 
      GameManager.start();

    if (GameManager.isRunning()) {
      this.jumps += 5;
      this.spriteJump.play();
    }
  }

  hit(collision) {
    this.hp--;
    if (this.hp > 0) {
      this.y = collision.centerY;
      this.x = collision.x + 50;
      GameManager.pause();
    } else {
      GameManager.stop();
    }
  }
}

export const Player = new _Player();