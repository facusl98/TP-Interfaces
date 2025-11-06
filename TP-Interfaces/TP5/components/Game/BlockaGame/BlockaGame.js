import { BaseComponent } from "../../BaseComponent.js";
import { CanvasToolkit } from "../CanvasToolkit.js";
import { HomeScreen } from "./Screens/HomeScreen.js";
import { SelectScreen } from "./Screens/SelectScreen.js";
import { GameScreen } from "./Screens/GameScreen.js";
import { EndScreen } from "./Screens/EndScreen.js";
import { GuideScreen } from "./Screens/GuideScreen.js";

class BlockaGame extends BaseComponent {
  constructor() {
    super();
    const width = 720;
    const height = 480;

    this.canvas = document.createElement("canvas"); 
    this.canvas.width = width; this.canvas.height = height; 
    this.toolkit = new CanvasToolkit(this.canvas);
    this.ctx = this.toolkit.getCtx();

    this.colors = {
      purple: "rgba(60, 30, 150, 1)",
      purpleHover: "rgba(80, 49, 175, 1)",
      purpleActive: "rgba(123, 61, 216, 1)",
      light: "rgba(240, 240, 250, 1)",
      dark: "rgba(30, 30, 30, 1)"
    }

    this.offscreen = new OffscreenCanvas(width, height);
    this.offCtx = this.offscreen.getContext("2d");
    
    this.drawPattern(width, height)

    this.gridSize = 2;
    this.image = null;
    this.level = 0;
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
      GAME: new GameScreen(this, this.changeScreen.bind(this)),
      END: new EndScreen(this, this.changeScreen.bind(this)),
      GUIDE: new GuideScreen(this, this.changeScreen.bind(this))
    };
    this.current = this.screens["HOME"];

    // Events
    this.canvas.addEventListener("pointerdown", (e) => {
      let x = e.offsetX - rect.left;
      let y = e.offsetY - rect.top;
      this.current.onClick(x, y, e)
    });

    this.canvas.addEventListener("mousemove", (e) => {
      let x = e.offsetX - rect.left;
      let y = e.offsetY - rect.top;
      this.current.onHover(x, y)
    });

    this.canvas.addEventListener("contextmenu", (e) => {e.preventDefault()})
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, 720, 480);
  }

  drawCurrent(params) {
    this.clearScreen();
    this.ctx.drawImage(this.offscreen, 0, 0);
    this.current.draw(params);
  }

  drawPattern(width, height, hexSize = 30) {
    const ctx = this.offCtx;

    // Equilateral Triangle Simplified Formula
    const hexHeight = Math.sqrt(3) * hexSize;
    // hexSize works as radius, so width = diameter = r * 2 
    const hexWidth = 2 * hexSize;
    const vertDist = hexHeight;
    // Distance from center to center. 1r + .5r from the next hexagon.
    const horizDist = hexSize * 1.5;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    for (let y = 0; y < height + hexHeight; y += vertDist) {
      for (let x = 0; x < width + hexWidth; x += horizDist) {
        // Displaces vertically every other row. Either 0 or half the height.
        const offsetY = (Math.floor(x / horizDist) % 2) * (hexHeight / 2);
        this.drawHex(ctx, x, y + offsetY, hexSize);
      }
    }
  }

  drawHex(ctx, x, y, size) {
    ctx.beginPath();
    // 360° = 2PI | 2PI / 6 = PI / 3 = 60°
    const angleStep = Math.PI / 3;
    for (let i = 0; i < 6; i++) {
      let angle = angleStep * i;
      // Position from center + Distance to edge * Angle multiplier
      // Cos from -1 to 1 for X. Sin from -0.866 to 0.866 for Y
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  changeScreen(screen, params) {
    this.current = this.screens[screen];
    this.className = "";
    this.drawCurrent(params);
  }

}

BlockaGame.define("blocka-game");