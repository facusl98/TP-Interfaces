import { Piece } from "./Piece.js";
import { Rectangle } from "./Rectangle.js";

export class Board extends Rectangle {
  constructor(ctx, id, pieces, x, y, w, h, pad, gap, colors, fill, stroke, line) {
    super(ctx, id, x, y, w, h, fill, stroke, line);
    this.pieces = pieces;
    this.colors = colors;
    this.pad = pad;
    this.gap = gap;

    this.board = [  // Preload
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
    ];

    this.pieces = [
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "0", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
    ];

    this.events = [];

    const gapSpace = (this.board.length - 1) * gap;
    this.bs = (this.h - gapSpace - pad) /  this.board.length;
    this.ps = (this.bs - 15) / 2;

    this.createSlots();
    this.createPieces();
  }

  draw() {
    super.draw();
    this.drawSlots();
    this.drawPieces();
  }



  createSlots() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) { 
        if (this.board[i][j] != "X") {
          let offsetY = Math.round(i - this.board.length / 2);
          let offsetX = Math.round(j - this.board[0].length / 2);
          this.board[i][j] = new Rectangle(
            this.ctx, `[${i}-${j}]`,
            this.x + ((this.bs + this.gap) * offsetX),
            this.y + ((this.bs + this.gap) * offsetY),
            this.bs, this.bs, 
            this.colors.sage, 
            this.colors.white, 1
          );
        }
      }
    }
  }

  drawSlots() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) { 
        if (this.board[i][j] != "X") {
          this.board[i][j].draw();
        }
      }
    }
  }

  createPieces() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) { 
        if (this.pieces[i][j] == "1") {
          let offsetY = Math.round(i - this.board.length / 2);
          let offsetX = Math.round(j - this.board[0].length / 2);
          const piece = new Piece(
            this.ctx, `[${i}-${j}]`,
            this.x + ((this.bs + this.gap) * offsetX),
            this.y + ((this.bs + this.gap) * offsetY),
            this.ps,
            this.colors.bone, 
            this.colors.dark, 1
          );
          this.pieces[i][j] = piece;
          this.events.push(piece);
        }
      }
    }
  }

  drawPieces() {
    this.events.forEach(piece => {
      piece.draw();
    })
  }

  // Event Handlers
  onMouseDown(x, y) {
    let clicked = null;
    for (let i = this.events.length - 1; i >= 0; i--) {
      let elem = this.events[i] ?? null;
      if (elem.isPointerInside(x, y)) {
        clicked = elem;
        break;
      }
    }
    clicked?.onMouseDown(x, y);
  }
}