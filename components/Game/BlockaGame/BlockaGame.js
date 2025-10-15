import { BaseComponent } from "../../BaseComponent.js";
import { CanvasManager } from "../CanvasManager.js";


class BlockaGame extends BaseComponent {
  constructor() {
    super();
    this._manager = null;
    this._canvas = null;
    this._screens = Object.freeze({
      HOME: "HOME",
      SELECT: "SELECT",
      GAME: "GAME"
    });
    this._screen = this._screens.HOME;

    this._events = {
      HOME: [
      {
        x1: 270, x2: 450, y1: 380, y2: 430, 
        click: () => {console.log("Click")},
        hover: () => { this.className = "pointer" }
      }, 
      ],
      SELECT : [],
      GAME: []
    }
  }

  async connectedCallback() {
    await this.render();
    this.loadScreen();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <canvas width="720px" height="480px" />
    `;

    // Set up canvas
    const canvas = this.shadowRoot.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    this._canvas = canvas;
    this._manager = new CanvasManager(canvas);


    // Events
    canvas.addEventListener("click", (e) => {
      let tx = e.offsetX - rect.left;
      let ty = e.offsetY - rect.top;
      for (const o of this._events[this._screen]) {
        if ((tx > o.x1 && tx < o.x2) && ty > o.y1 && ty < o.y2) {
          o.click();
          return;
        }
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      let tx = e.offsetX - rect.left;
      let ty = e.offsetY - rect.top;
      for (const o of this._events[this._screen]) {
        if ((tx > o.x1 && tx < o.x2) && ty > o.y1 && ty < o.y2) {
          o.hover();
          return;
        }
      }
      // Default
      this.className = "";
    });
  }

  loadScreen() {
    switch (this._screen) {
      case this._screens.HOME:
        this.loadHome();
        break;
      case this._screens.SELECT:
        this.loadSelect();
        break;
      case this._screens.GAME:
        this.loadGame();
        break;
    }
  }

  loadHome() {
    const ctx = this._manager.getCtx();
    
    // Play Btn: [270, 380] to [450, 430]
    ctx.font = "24px Helvetica";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(60, 30, 150, 1)";
    ctx.fillStyle = "rgba(90, 30, 180, 1)"
    this._manager.drawRoundedRect(270, 380, 180, 50, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(240, 230, 240, 1)";
    ctx.fillText("Play", 340, 414);
  }


  loadSelect() {}

  loadGame() {}

}

BlockaGame.define("blocka-game");