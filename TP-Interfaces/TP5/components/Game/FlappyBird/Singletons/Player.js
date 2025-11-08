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

    this.defaultSpeed = {x: 8, y: -6};
    this.speed = { x: 0, y: 0 }
    this.jumps = 0;

    this.spriteIdle = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Idle.png",
      32, 32, 1000, [0, 300, 500, 700], true
    );

    this.spriteJump = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Jump.png",
      32, 32, 200, [0, 5, 10, 20, 30, 35, 60, 180], false
    );
  }

  draw() {
    super.draw();
    const { x, y, r, spriteIdle, spriteJump } = this;
    const dx = x - r;
    const dy = y - r;

    if (spriteJump.finished)
      spriteIdle.draw(dx, dy, 2);
    else 
      spriteJump.draw(dx, dy, 2);
  }

  move() {
    if (this.jumps <= 0) {
      this.y += -this.speed.y;
    } else {
      this.y += this.speed.y * this.jumps * 1.3;
      this.jumps--;
    }

    this.x += this.speed.x;

    Camera.coords = this.coords;

    if (GameManager.isRunning())
      requestAnimationFrame(this.move.bind(this));
  }

  setUp() {
    const { width, height } = Canvas;
    this.x = width / 4;
    this.y = height / 2;
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
  }
  
  start() {
    this.speed = {
      x: this.defaultSpeed.x,
      y: this.defaultSpeed.y 
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
      this.x = collision.x + 25;
      GameManager.pause();
    } else {
      GameManager.stop();
    }
  }
}

export const Player = new _Player();