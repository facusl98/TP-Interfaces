import { Canvas } from "../Singletons/Canvas.js";

class _Writer{
  write(x, y, text, size, style = "Dark", centered = false) {
    const { ctx } = Canvas;
    const light = "#A5A8B2";
    const dark = "#141B33";
    ctx.fillStyle = style == "Dark" ? light : dark;
    ctx.font = `${size}px "Jersey 10", Helvetica`;
    ctx.textBaseline = "middle";
    if (centered) ctx.textAlign = "center"
    else ctx.textAlign = "left";
    ctx.fillText(text, x, y);
  }
}

export const Writer = new _Writer();