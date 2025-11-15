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
    
    this.spriteIdle = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Idle.png",
      128, 128, 1000, [0, 300, 600], true, false
    );
    
    this.spriteJump = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Jump.png",
      128, 128, 100, [0, 1, 10, 20, 30], false, false
    );
    
    this.spriteIdleIframe = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Idle_Iframe.png",
      128, 128, 1000, [0, 300, 600], true, false
    );
    
    this.spriteJumpIframe = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Jump_Iframe.png",
      128, 128, 100, [0, 1, 10, 20, 30], false, false
    );

    this.spriteDeath = new AnimatedSprite(
      "/TP-Interfaces/TP5/assets/images/flappy_bird/Player/Player_Death.png",
      128, 128, 2000, [0, 100, 200, 300, 500, 700, 1000, 1300, 1500, 1800, 1950], false, true
    );
    
    this.jumps = 0;
    this.moves = 0;
    this.iframes = 0;
    this.maxIframes = 400;
    this.dead = false;
  }
  
  draw() {
    super.draw();
    const { x, y, r } = this;
    this.playAnimation();
  }

  playAnimation() {
    const {
      x, y, r,
      iframes, dead,
      spriteDeath,
      spriteIdle, spriteIdleIframe,
      spriteJump, spriteJumpIframe
    } = this;

      const dx = x - r;
      const dy = y - r;

    if (dead){
      spriteDeath.draw(dx, dy, 64, 64);
      return;
    }

    if (iframes <= 0) {
      if (spriteJump.finished) {
        spriteIdle.draw(dx, dy, 64, 64);
      } else {
        spriteJump.draw(dx, dy, 64, 64)
      }
      return;
    }

    if (spriteJumpIframe.finished)
      spriteIdleIframe.draw(dx, dy, 64, 64);
    else 
      spriteJumpIframe.draw(dx, dy, 64, 64);
  }

  move() {
    if (this.jumps <= 0) {
      this.y += -this.speed.y;
    } else {
      this.y += this.speed.y * this.jumps * 1.3;
      this.jumps--;
    }

    this.moves++;

    if (this.iframes > 0)
      this.iframes--;

    if (this.y < 0 || this.y > Canvas.height)
      GameManager.stop();

    this.x += this.speed.x;
    Camera.coords = this.coords;
    
    this.calcSpeed();

    if (GameManager.isRunning())
      requestAnimationFrame(this.move.bind(this));
  }

  calcSpeed() {
    this.speed.x = Math.min(
      this.baseSpeed.x * 2, 
      this.baseSpeed.x + (this.moves / 100));
  }

  setUp() {
    this.x = this.defX;
    this.y = this.defY;
    this.jumps = 0;
    this.moves = 0;
    this.dead = false;
    this.hp = this.maxHP;
    Camera.coords = this.coords;
  }

  pause() {
    this.over = true;
    this.speed.x = 0;
    this.speed.y = 0;
    this.iframes = 0;
  }
  
  start() {
    this.speed.y = this.baseSpeed.y;
    this.calcSpeed();
    this.move();
  }

  reset() {
    this.pause();
    this.setUp();
    clearTimeout(this.hitPause);
  }

  jump() {
    if (GameManager.canStart()) 
      GameManager.start();

    
    if (GameManager.isRunning()) {
      this.jumps += 5;
      if (!this.iframes)
        this.spriteJump.play();
      else
        this.spriteJumpIframe.play();
    }
  }

  hit(collision) {
    if (this.iframes > 0) return;
    this.hp--;
    GameManager.wait();
    if (this.hp > 0) {
      this.hitPause = setTimeout(() => {
        this.y = collision.centerY;
        this.x = collision.x + 50;
        this.jumps = 0;
        this.moves = 0;
        Camera.coords = Player.coords;
        GameManager.initialize();
      }, 1000);
    } else {
      this.dead = true;
      this.spriteDeath.play();
      setTimeout(() => {
        GameManager.stop();
      }, 2200)
      
    }
  }

  heal() {
    if (this.hp < this.maxHP) 
      this.hp++;
  }

  addIframes(iframes) {
    let i = this.iframes + iframes;
    i = Math.min(i, this.maxIframes);
    this.iframes = i;
  }
}

export const Player = new _Player();