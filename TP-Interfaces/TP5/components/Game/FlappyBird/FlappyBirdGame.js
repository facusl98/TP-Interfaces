import { BaseComponent } from "../../BaseComponent.js";
import { CanvasService } from "./Services/CanvasService.js";
import { EventsService } from "./Services/EventsService.js";
import { Map } from "./Singletons/Map.js";
import { Player } from "./Singletons/Player.js";

class FlappyBirdGame extends BaseComponent {
  constructor() {
    super();
  
    CanvasService.createCanvas(720, 480);

    this.canvas = CanvasService.canvas;  
    this.ctx = CanvasService.ctx;

    Player.setUp();
    EventsService.hear();
  }

  connectedCallback() {
    this.render();
    this.draw();
  }

  draw() {
    CanvasService.clear();
    Map.draw();

    requestAnimationFrame(this.draw.bind(this));
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);
  }
}

FlappyBirdGame.define("flappy-bird-game");