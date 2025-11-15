import { Canvas } from "../Singletons/Canvas.js";
import { Player } from "../Singletons/Player.js";
import { UIBox } from "./UIBox.js";
import { UIElement } from "./UIElement.js ";

export class IframesTimer extends UIElement  {
  constructor() {
    super();
    this.bg = new UIBox(10, 150, 40, 1, 5);
  
  }

  draw() {
    const {ctx} = Canvas;
    this.bg.draw();
    const height = (40 - 20) * 5
    const frames = Math.max(Player.iframes, 1);
    const ratio = height / Player.maxIframes;
    ctx.fillStyle = "#70B2B2";
    console.log(height)
    ctx.beginPath();
    ctx.roundRect(
      20,
      340 - (ratio * frames),
      20,
      ratio * frames,
      5
    );
    ctx.fill();
  }
}