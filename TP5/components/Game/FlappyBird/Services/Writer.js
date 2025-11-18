import { Canvas } from "../Singletons/Canvas.js";

class _Writer{
  write(x, y, text, size, style = "DARK", centered = false) {
    const { ctx } = Canvas;
    const light = "#d8dae3";
    const dark = "#141B33";
    ctx.fillStyle = style == "DARK" ? light : dark;
    ctx.font = `${size}px "Jersey 10", Helvetica`;
    ctx.textBaseline = "middle";
    if (centered) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    }
    else {
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
    }
    ctx.fillText(text, x, y);
  }
}

export const Writer = new _Writer();