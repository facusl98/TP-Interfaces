import { BaseComponent } from "../../BaseComponent.js";
import { CanvasManager } from "../CanvasManager.js";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { SelectScreen } from "./Screens/SelectScreen.js";
import { GameScreen } from "./Screens/GameScreen.js";

class BlockaGame extends BaseComponent {
  constructor() {
    super();
    this.manager = null;
    this.canvas = null;
    this.ctx = null;
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
    this.manager = new CanvasManager(canvas);
    this.ctx = this.manager.getCtx();

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
    this.current.draw();
  }

  changeScreen(screen) {
    this.current = this.screens[screen];
    this.clearScreen();
    this.drawCurrent();
  }

}

BlockaGame.define("blocka-game");