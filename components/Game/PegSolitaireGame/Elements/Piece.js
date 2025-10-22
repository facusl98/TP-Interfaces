import { Poligon } from "./Poligon.js";

export class Piece extends Poligon {
  constructor(ctx, id, x, y, r, fill, stroke, line) {
    super(ctx, id, x, y, r, 8, 0, fill, stroke, line)
  }
}