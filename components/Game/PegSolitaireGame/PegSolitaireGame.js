import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { Circle } from "./Elements/Circle.js";
import { Poligon } from "./Elements/Poligon.js";
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

    const circle = this.createCircle(this.width / 2, this.height / 2, 50, "blue", "gray", 5);

    const poli = this.createPoligon(this.width / 2, this.height / 2, 50, 5, 0, "yellow", "teal", 1);

    this.refresh = setInterval(this.drawScreen.bind(this), 333);
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

  // Screen Handlers
  drawScreen() {
    this.clearScreen();
    this.elements.forEach((elem, i) => {
      elem.draw();
    })
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Event Handlers
  onMouseDown(x, y) {
    let clicked = null;
    for (let i = this.elements.length - 1; i >= 0; i--) {
      let elem = this.elements[i] ?? null;
      if (elem.isPointerInside(x, y)) {
        clicked = elem;
        break;
      }
    }
    clicked?.onMouseDown(x, y);
  }

  // Create Figures
  createRect(x, y, w, h, fill = null, stroke = null, line = null) {
    const rect = new Rectangle(
      this.ctx, this.elements.length,
      x, y, w, h, 
      fill, stroke, line
    );
    this.elements.push(rect);
    return rect;
  }

  createCircle(x, y, r, fill = null, stroke = null, line = null) {
    const circle = new Circle(
      this.ctx, this.elements.length,
      x, y, r,
      fill, stroke, line
    );
    this.elements.push(circle);
    return circle;
  }

  createPoligon(x, y, r, sides, angle, fill, stroke, line) {
    const poligon = new Poligon(
      this.ctx, this.elements.length,
      x, y, r, sides, angle,
      fill, stroke, line
    );
    this.elements.push(poligon);
    return poligon;
  }
  
}

PegSolitaireGame.define("peg-solitaire-game");