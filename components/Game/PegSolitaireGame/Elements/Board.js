import { Piece } from "./Piece.js";
import { Rectangle } from "./Rectangle.js";
import { Slot } from "./Slot.js";

export class Board extends Rectangle {
  constructor(ctx, id, pieces, x, y, w, h, pad, gap, colors, fill, stroke, line) {
    super(ctx, id, x, y, w, h, fill, stroke, line);
    this.pieces = pieces;
    this.colors = colors;
    this.pad = pad;
    this.gap = gap;
    this.boardSize = 7;
    
    const gapSpace = (this.boardSize - 1) * gap;
    this.bs = (this.h - gapSpace - pad) /  this.boardSize;
    this.ps = (this.bs - 15) / 2;
    
    this.slots = [];
    this.pieces = [];
    this.createSlots();
    this.createPieces();

    this.selected = null;
  }

  draw() {
    super.draw();
    this.drawSlots();
    this.drawPieces();
  }

  drawSlots() {
    this.slots.forEach(slot => {
      slot.draw();
    })
  }

  drawPieces() {
    this.pieces.forEach(piece => {
      piece.draw();
    })
  }


  // Utils
  findPiece(x, y) {
    let piece = null;
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      let elem = this.pieces[i] ?? null;
      if (elem.isPointerInside(x, y)) {
        piece = elem;
        break;
      }
    }
    return piece;
  }

  findSlot(x, y) {
    let slot = null;
    for (let i = this.slots.length - 1; i >= 0; i--) {
      let elem = this.slots[i] ?? null;
      if (elem.isPointerInside(x, y)) {
        slot = elem;
        break;
      }
    }
    return slot;
  }

  getPos(col, row) {
    const offsetY = Math.round(row - this.boardSize / 2);
    const offsetX = Math.round(col - this.boardSize / 2);
    const coords = {
      x: this.x + ((this.bs + this.gap) * offsetX),
      y: this.y + ((this.bs + this.gap) * offsetY),
    }
    return coords;
  }

  relocaPiece(piece) {
    this.pieces.forEach((p, i) => { 
        if (p.id == piece.id) this.pieces.splice(i, 1);
    });
    this.pieces.push(piece);
  }

  // Event Handlers
  onMouseDown(x, y) {
    const piece = this.findPiece(x, y); 
    if (!piece) return;
    this.relocaPiece(piece)

    piece.setActive();

    this.selected = piece;
  }

  onMouseUp(x, y) {
    if (!this.selected) 

    this.selected.setDefault();

    // Reset Pos (Temporary)
    const pos = this.getPos(
      this.selected.col, this.selected.row
    );
    this.selected.setPos(pos.x, pos.y);
    
    this.selected = null;
  }

  onMouseMove(x, y) {
    if (!this.selected) return;
    this.selected.setPos(x, y);
  }

  // Creators 
  createSlots() {
    const board = [  
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
    ];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) { 
        if (board[i][j] != "X") {
          const coords = this.getPos(i, j);
          this.slots.push(
            new Slot(
              this.ctx, i, j,
              coords.x,
              coords.y,
              this.bs, 
              this.colors.sage, 
              this.colors.white, 1
            )
          )
        }
      }
    }
  }

  createPieces() {
    const pieces = [
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["1", "1", "1", "0", "1", "1", "1"],
      ["1", "1", "1", "1", "1", "1", "1"],
      ["X", "X", "1", "1", "1", "X", "X"],
      ["X", "X", "1", "1", "1", "X", "X"],
    ];

    for (let i = 0; i < pieces.length; i++) {
      for (let j = 0; j < pieces[0].length; j++) { 
        if (pieces[i][j] == "1") {
          const coords = this.getPos(i, j);
          this.pieces.push(
            new Piece(
              this.ctx, i, j,
              coords.x,
              coords.y,
              this.ps,
              this.colors
            )
          )
        }
      }
    }
  }
}