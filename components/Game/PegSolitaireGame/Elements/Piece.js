import { Poligon } from "./Poligon.js";

export class Piece extends Poligon {
  constructor(ctx, col, row, x, y, r, theme) {
    super(
      ctx, `${col}-${row}`, x, y, r, 7, 270, 
      theme.pale, 
      theme.dark, 1
    );
    this.col = col;
    this.row = row;
    this.theme = theme;

    this.setTheme(theme);

    this.inner = new Poligon(
      ctx, "inner", x, y, r - 5, this.sides,
      270, theme.white, theme.dark, 1
    );
  }

  /* 
    Draws piece itself
    Draws inner piece manually
    Then clips it and paste the image inside
  */
  draw() {
    super.draw();

    const {ctx, inner} = this;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(inner.edges[0].x, inner.edges[0].y);
    for (let i = 1; i < inner.edges.length; i++) {
      ctx.lineTo(inner.edges[i].x, inner.edges[i].y);
    }
    ctx.lineTo(inner.edges[0].x, inner.edges[0].y);
    if (this.imgReady) {
      ctx.clip();
      ctx.drawImage(
        this.img,
        inner.x - inner.r, inner.y - inner.r,
        inner.r * 2, inner.r * 2
      );
    }
    ctx.strokeStyle = inner.stroke;
    ctx.stroke();
    ctx.restore();
  }

  /*
    Assign colors to attributes containing the default and active values
    Fetch theme image
    Generate new corners for itself and inner piece based on theme's amount
  */
  setTheme(theme) {
    this.imgReady = false;

    this.default = {
      fill: theme.pale,
      stroke: theme.dark
    };

    this.active = {
      fill: theme.white,
      stroke: theme.bg
    };

    this.sides = theme.sides;
    this.generateEdges();

    this.img = new Image();
    this.img.src = theme.img;
    this.img.onload = () => {
      this.imgReady = true;
    }

    if (this.inner) {
      this.inner.sides = theme.sides;
      this.inner.generateEdges();
    }

    this.setDefault();
  }

  // Assign default styles
  setDefault() {
    this.fill = this.default.fill;
    this.stroke = this.default.stroke;
    this.line = 1;
  }

  // Assign default styles
  setActive() {
    this.fill = this.active.fill;
    this.stroke = this.active.stroke;
    this.line = 1;
  }

  // Assigns col and row for coords calculation
  setGridPos(col, row) {
    this.col = col;
    this.row = row;
  }

  // Asigns position both for itself and its inner poligon 
  setPos(x, y) {
    super.setPos(x, y);
    this.inner.setPos(x, y);
  }
}