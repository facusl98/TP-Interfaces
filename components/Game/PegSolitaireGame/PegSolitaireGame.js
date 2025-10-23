import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { Board } from "./Elements/Board.js";
import { Circle } from "./Elements/Circle.js";
import { Poligon } from "./Elements/Poligon.js";
import { Rectangle } from "./Elements/Rectangle.js";

class PegSolitaireGame extends BaseComponent {
  constructor() {
    super();

    this.width = 720;
    this.height = 480;
    
    this.boardSize = this.height - 30;
    this.boardPad = 20;
    this.boardGap = 5;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.colors = {
      dark: "#212121",
      teal: "#6D9886",
      sage: "#9FB8AD",
      slate: "#819A91",
      bone: "#EDE4E0",
      white: "#F6F6F6",
    }

    this.canvas = document.createElement("canvas"); 
    this.canvas.width = this.width; this.canvas.height = this.height; 
    this.toolkit = new CanvasToolkit(this.canvas);
    this.ctx = this.toolkit.getCtx();

    this.board = null;
    this.pieces = [];
  }

  connectedCallback() {
    this.render();

    this.refresh = setInterval(this.drawScreen.bind(this), 50);

    this.createBoard(
      this.centerX, this.centerY,
      this.boardSize, this.boardSize, 
      this.boardPad, this.boardGap,
      this.colors.teal, this.colors.light, 1
    )
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);

    this.canvas.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      this.board.onMouseDown(x, y);
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      this.board.onMouseMove(x, y);
    });

    this.canvas.addEventListener("mouseup", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      this.board.onMouseUp(x, y);
    });
  }

  // Screen Handlers
  drawScreen() {
    this.clearScreen();
    this.board?.draw();
    this.pieces.forEach((elem, i) => {
      elem.draw();
    })
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Create Figures
  createBoard(x, y, w, h, pad, gap, fill = null, stroke = null, line = null) {
    const board = new Board(
      this.ctx, this.pieces.length,
      this.pieces, 
      x, y, w, h, 
      pad, gap,
      this.colors,
      fill, stroke, line
    );
    this.board = board;
    return board;
  }
  
}

PegSolitaireGame.define("peg-solitaire-game");