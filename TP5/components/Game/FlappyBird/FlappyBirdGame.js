import { BaseComponent } from "../../BaseComponent.js";
import { Canvas } from "./Singletons/Canvas.js";
import { EventsService } from "./Services/EventsService.js";
import { BGManager } from "./Singletons/BGManager.js";
import { Map } from "./Singletons/Map.js";
import { Player } from "./Singletons/Player.js";
import { UIManager } from "./Singletons/UIManager.js";

class FlappyBirdGame extends BaseComponent {
  constructor() {
    super();
  
    Canvas.createCanvas(720, 480);

    this.canvas = Canvas.canvas;  
    this.ctx = Canvas.ctx;

    Player.setUp();
    BGManager.build();
    EventsService.hear();
  }

  connectedCallback() {
    this.render();
    this.draw();
  }

  draw() {
    Canvas.clear();
    BGManager.draw();
    Map.draw();
    UIManager.draw();

    requestAnimationFrame(this.draw.bind(this));
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);
  }
}

FlappyBirdGame.define("flappy-bird-game");