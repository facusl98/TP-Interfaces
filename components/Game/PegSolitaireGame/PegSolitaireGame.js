import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { Rectangle } from "./Elements/Rectangle.js";

class PegSolitaireGame extends BaseComponent {
  constructor() {
    super();

    this.width = 720;
    this.height = 480;

    this.canvas = document.createElement("canvas"); 
    this.canvas.width = this.width; this.canvas.height = this.height; 
    this.toolkit = new CanvasToolkit(this.canvas);
    this.ctx = this.toolkit.getCtx();

    this.elements = [];
  }

  connectedCallback() {
    this.render();

    this.createRect(this.width / 2, this.height / 2, 100, 100, "red", "purple", 5);

    this.refresh = setInterval(this.drawScreen(), 333);
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);

    this.canvas.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      this.onMouseDown(x, y);
    })
  }

  drawScreen() {
    this.clearScreen();
    this.elements.forEach((elem, i) => {
      elem.draw();
    })
  }

  createRect(x, y, w, h, fill = null, stroke = null, line = null) {
    const rect = new Rectangle(
      this.ctx, this.elements.length,
      x, y, w, h, 
      fill, stroke, line
    );
    this.elements.push(rect);
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  onMouseDown(x, y) {
    let clicked = null;
    for (let elem of this.elements) {
      if (elem.isPointerInside(x, y)) {
        clicked = elem;
        break;
      }
    }
    console.log(clicked);
  }
}

PegSolitaireGame.define("peg-solitaire-game");