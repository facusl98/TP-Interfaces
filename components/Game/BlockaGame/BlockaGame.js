import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { SelectScreen } from "./Screens/SelectScreen.js";
import { GameScreen } from "./Screens/GameScreen.js";

class BlockaGame extends BaseComponent {
  constructor() {
    super();
    this.toolkit = null;
    this.canvas = null;
    this.ctx = null;
    this.gridSize = 2;
  }

  async connectedCallback() {
    await this.render();
    this.drawCurrent();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <canvas width="720px" height="480px" />
    `;

    // Set up canvas
    const canvas = this.shadowRoot.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    this.canvas = canvas;
    this.toolkit = new CanvasToolkit(canvas);
    this.ctx = this.toolkit.getCtx();

    // Set up screens
    this.screens = {
      HOME: new HomeScreen(this, this.changeScreen.bind(this)),
      SELECT: new SelectScreen(this, this.changeScreen.bind(this)),
      GAME: new GameScreen(this, this.changeScreen.bind(this))
    };
    this.current = this.screens["HOME"];

    // Events
    canvas.addEventListener("click", (e) => {
      let x = e.offsetX - rect.left;
      let y = e.offsetY - rect.top;
      this.current.onClick(x, y)
    });

    canvas.addEventListener("mousemove", (e) => {
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
    this.drawBG();
    this.current.draw();
  }

  drawBG() {
    let size = 20;
    for (let i = 0; i <= 720 / size; i++) {
      for (let j = 0; j <= 480 / size; j++) {
        this.ctx.fillStyle = "rgba(67, 71, 138, 1)"
        if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0))
          this.ctx.fillStyle = "rgba(80, 83, 156, 1)"
        this.ctx.fillRect(i * size - 10, j * size - 10, size, size);
      }
    }
  }

  changeScreen(screen) {
    this.current = this.screens[screen];
    this.drawCurrent();
  }

}

BlockaGame.define("blocka-game");