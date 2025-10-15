import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { SelectScreen } from "./Screens/SelectScreen.js";
import { GameScreen } from "./Screens/GameScreen.js";

class BlockaGame extends BaseComponent {
  constructor() {
    super();

    this.canvas = document.createElement("canvas");
    this.canvas.width = 720; this.canvas.height = 480; 
    this.toolkit = new CanvasToolkit(this.canvas);
    this.ctx = this.toolkit.getCtx();

    this.offscreen = new OffscreenCanvas(720, 480);
    this.offCtx = this.offscreen.getContext("2d");
    this.drawBG();

    this.gridSize = 2;
  }

  async connectedCallback() {
    await this.render();
    this.drawCurrent();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);


    // Set up screens
    const rect = this.canvas.getBoundingClientRect();
    this.screens = {
      HOME: new HomeScreen(this, this.changeScreen.bind(this)),
      SELECT: new SelectScreen(this, this.changeScreen.bind(this)),
      GAME: new GameScreen(this, this.changeScreen.bind(this))
    };
    this.current = this.screens["HOME"];

    // Events
    this.canvas.addEventListener("click", (e) => {
      let x = e.offsetX - rect.left;
      let y = e.offsetY - rect.top;
      this.current.onClick(x, y)
    });

    this.canvas.addEventListener("mousemove", (e) => {
      let x = e.offsetX - rect.left;
      let y = e.offsetY - rect.top;
      this.current.onHover(x, y)
    });
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, 720, 480);
  }

  drawCurrent() {
    this.clearScreen();
    this.ctx.drawImage(this.offscreen, 0, 0);
    this.current.draw();
  }

  drawBG() {
    let size = 20;
    for (let i = 0; i <= 720 / size; i++) {
      for (let j = 0; j <= 480 / size; j++) {
        this.offCtx.fillStyle = "rgba(67, 71, 138, 1)"
        if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0))
          this.offCtx.fillStyle = "rgba(80, 83, 156, 1)"
        this.offCtx.fillRect(i * size - 10, j * size - 10, size, size);
      }
    }
  }

  changeScreen(screen) {
    this.current = this.screens[screen];
    this.drawCurrent();
  }

}

BlockaGame.define("blocka-game");