import { Figure } from "./Figure.js";

export class TextFigure extends Figure {
  constructor(ctx, x, y, text, fontSize = 16, fontFamily = "Helvetica", fill = "transparent", stroke = "transparent", line = 0) {
    super(ctx, text, x, y, fill, stroke, line);
    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }

  draw() {
    super.draw();

    const {ctx} = this;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.strokeText(this.text, this.x, this.y);
    ctx.fillText(this.text, this.x, this.y);
  }
}