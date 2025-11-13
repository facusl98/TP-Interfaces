import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { Board } from "./Elements/Board.js";
import { TextFigure } from "./Figures/TextFigure.js";
import { ThemeSelector } from "./Elements/ThemeSelector.js";
import { Timer } from "./Elements/Timer.js";

class PegSolitaireGame extends BaseComponent {
  constructor() {
    super();

    this.width = 1080;
    this.height = 480;

    this.colors = {}
    this.generalColors = {
      dark: "#212121",
      white: "#f6f6f6",
    }

    this.canvas = document.createElement("canvas"); 
    this.canvas.width = this.width; this.canvas.height = this.height; 
    this.toolkit = new CanvasToolkit(this.canvas);
    this.ctx = this.toolkit.getCtx();

    this.board = null;
    this.selector = null;
    this.timer = null;
  }

  connectedCallback() {
    this.render();

    this.refresh = setInterval(this.drawScreen.bind(this), 50);

    this.selector = new ThemeSelector(
      this.ctx,
      this.generalColors,
      this.setTheme.bind(this)
    );; 
    
    this.board = new Board(
      this.ctx,
      this.colors,
      this.stopTimer.bind(this)
    );

    let h = 50;
    this.timer = new Timer(
      this.ctx,
      this.colors,
      this.gameOver.bind(this)
    );

    this.resetText = this.createText(
      this.width - 120, 20 + h + 20,
      "Press 'R' to restart",
      24, this.colors.white
    );

  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.appendChild(this.canvas);

    this.canvas.addEventListener("mousedown", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      this.board.onMouseDown(x, y);
      this.selector.onMouseDown(x, y);
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

    window.addEventListener("keydown", (e) => {
      if (!(e.key === "r" || e.key === "R")) return;
      this.board?.reset();
      this.timer?.reset();
    });
  }

  // Screen Handlers
  drawScreen() {
    this.clearScreen();
    this.board?.draw();
    this.selector?.draw();
    this.timer?.draw();
    this.resetText?.draw();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Utils
  setTheme(theme) {
    this.colors = {... this.generalColors, ...theme};
    this.board?.setTheme(this.colors);
    this.timer?.setTheme(this.colors);
  }

  // Makes board play game over animation
  gameOver(message) {
    this.board?.gameOver(message);
  }

  stopTimer() {
    this.timer?.stopTimer();
  }


  // Figure Creators
  createTimer(x, y, w, h) {
    const timer = new Timer(
      this.ctx, "timer",
      x, y, w, h, this.colors,
      this.gameOver.bind(this)
    );
    this.timer = timer;
  }

  createText(x, y, text, fontSize, fill, stroke, line) {
    const txt = new TextFigure(
      this.ctx, 
      x, y, 
      text, fontSize, undefined,
      fill, stroke, line
    )
    return txt;
  }
  
}

PegSolitaireGame.define("peg-solitaire-game");