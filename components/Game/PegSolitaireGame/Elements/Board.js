import { Piece } from "./Piece.js";
import { Rectangle } from "./Rectangle.js";
import { Slot } from "./Slot.js";
import { TextFigure } from "./TextFigure.js";

export class Board extends Rectangle {
  constructor(ctx, id, x, y, w, h, pad, gap, colors, fill, stroke, line, stopTimer) {
    super(ctx, id, x, y, w, h, fill, stroke, line);
    this.colors = colors;
    this.pad = pad;
    this.gap = gap;
    this.stopTimer = stopTimer;

    this.boardSize = 7;
    
    const gapSpace = (this.boardSize - 1) * gap;
    this.bs = (this.h - gapSpace - pad) /  this.boardSize;
    this.ps = (this.bs - 15) / 2;
    
    this.slots = [];
    this.pieces = [];
    this.createSlots();
    this.createPieces();

    this.running = true;
    this.selected = null;
    this.jumps = [];

    this.gameOverText = new TextFigure(
      ctx, x, y - 40, "Game Over", 50, undefined, "transparent"
    );
    this.gameOverMessage = new TextFigure(
      ctx, x, y + 40, "", 30, undefined, "transparent"
    );
    this.winText1 = new TextFigure(
      ctx, x, y - 70, "Congratulations", 40, undefined, "transparent"
    )
    this.winText2 = new TextFigure(
      ctx, x, y + 70, "You Won!", 40, undefined, "transparent"
    )
  }

  // Drawing
  draw() {
    super.draw();
    this.drawSlots();
    this.drawPieces();
    this.gameOverText.draw();
    this.gameOverMessage.draw();
    this.winText1.draw();
    this.winText2.draw();
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


  // Utils //
  // Returns piece if [x, y] is inside
  findPiece(x, y) {
    let piece = null;
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      let elem = this.pieces[i] ?? null;
      if (elem == this.selected) continue;
      if (elem.isPointerInside(x, y)) {
        piece = elem;
        break;
      }
    }
    return piece;
  }

  // Returns slot if [x, y] is inside
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

  // Calculates x & y based on col & row
  getPos(col, row) {
    const offsetY = Math.round(row - this.boardSize / 2);
    const offsetX = Math.round(col - this.boardSize / 2);
    const coords = {
      x: this.x + ((this.bs + this.gap) * offsetX),
      y: this.y + ((this.bs + this.gap) * offsetY),
    }
    return coords;
  }

  // Places piece on top of the stack for drawing
  relocaFirst(piece) {
    this.pieces.forEach((p, i) => { 
        if (p.id == piece.id) this.pieces.splice(i, 1);
    });
    this.pieces.push(piece);
  }

  // Returns piece to its asigned col & row
  returnToOrigin(piece) {
    const pos = this.getPos(piece.col, piece.row);
    piece.setPos(pos.x, pos.y);
  }

  // Checks if slot is free
  isAvailable(slot) {
    if (slot == null) return false;
    const piece = this.findPiece(slot.x, slot.y);
    return piece ? false : true;
  }

  // Set up piece col & row and [x, y] to slot's
  placeInSlot(slot, piece) {
    piece.setGridPos(slot.col, slot.row);
    const coords = this.getPos(slot.col, slot.row);
    piece.setPos(coords.x, coords.y);
  }

  // Returns slot based on col & grid
  slotByGrid(col, row) {
    let slot = null;
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i].col == col && this.slots[i].row == row) {
        slot = this.slots[i];
        break;
      }
    }
    return slot;
  }
  
  // Returns piece based on col & grid
  pieceByGrid(col, row) {
    let piece = null;
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].col == col && this.pieces[i].row == row) {
        piece = this.pieces[i];
        break;
      }
    }
    return piece;
  }

  // Assigns new theme to pieces and slots
  setTheme(theme) {
    this.colors = theme;
    this.fill = theme.bg;
    this.stroke = theme.pale;
    this.slots.forEach(s => s.setTheme(theme));
    this.pieces.forEach(p => p.setTheme(theme));
  }
  
  // Get slots at the right distance from the piece
  getJumps(piece) {
    const { col, row } = piece;
    let slots = [
      this.slotByGrid(col, row - 2),
      this.slotByGrid(col + 2, row),
      this.slotByGrid(col, row + 2),
      this.slotByGrid(col - 2, row)
    ];

    slots = slots.filter((s) => (s != null));

    return slots;
  }

  // Get jumps and check if they're valid
  getValidJumps(piece) {
    let jumps = this.getJumps(piece)
    let filtered = [];
    jumps?.forEach(jump => {
      let rowDiff = (jump.row - piece.row) / 2;
      let colDiff = (jump.col - piece.col) / 2;
      const p = this.pieceByGrid(piece.col + colDiff, piece.row + rowDiff);
      if (p != null && this.isAvailable(jump)) 
        filtered.push({slot: jump, piece: p});
    });
    return filtered;
  }

  // Removes piece from board
  removePiece(piece) {
    this.pieces = this.pieces.filter((p) => (p != piece));
  }
 
  // Check if there are any valid moves
  isSoftlock() {
    let softlock = true;
    for (let i = 0; i < this.pieces.length; i++) {
      let jumps = this.getValidJumps(this.pieces[i]);
      if (jumps.length != 0) {
        softlock = false;
        break;
      }
    }
    return softlock;
  }

  checkWinCondition() {
    if (
      this.pieces.length == 1 && 
      this.pieces[0].col == 3 &&
      this.pieces[0].row == 3
    ) return true;
    else return false;
  }

  // Game Loop Controls //
  // Locks pieces in place and apply game over effects
  gameOver(message) {
    this.running = false;

    const pieceDelete = setInterval(() => {
      this.pieces.splice(Math.floor(Math.random() * this.pieces.length), 1);
      if (this.pieces.length == 0) clearInterval(pieceDelete);
    }, 200)

    const slotDelete = setInterval(() => {
      this.slots.splice(Math.floor(Math.random() * this.slots.length), 1);
      if (this.slots.length == 0) {
        clearInterval(slotDelete);
        setTimeout(() => {
          this.gameOverText.fill = this.colors.white;
          this.gameOverMessage.text = message;
          this.gameOverMessage.fill = this.colors.white;
          this.stopTimer();
        }, 100);
      }
    }, 200);
  }

  win(){
    this.running = false;
    const centerSlot = this.slotByGrid(3, 3);
    const slotDelete = setInterval(() => {
      let random = Math.floor(Math.random() * this.slots.length);
      if (random != this.slots.indexOf(centerSlot)) 
        this.slots.splice(random, 1);
      if (this.slots.length == 1) {
        clearInterval(slotDelete);
        setTimeout(() => {
          this.winText1.fill = this.colors.white;
          this.winText2.fill = this.colors.white;
          this.stopTimer();
        }, 100);
      }
    }, 200);
  }

  reset() {
    this.gameOverText.fill = "transparent";
    this.gameOverMessage.fill = "transparent";
    this.winText1.fill = "transparent";
    this.winText2.fill = "transparent";
    this.running = true;
    this.createSlots();
    this.createPieces();
    console.log(this.colors)
  }

  // Event Handlers
  onMouseDown(x, y) {
    if (!this.running) return;
    const piece = this.findPiece(x, y); 
    if (!piece) return;
    this.relocaFirst(piece);
    piece.setActive();

    this.jumps = this.getValidJumps(piece);
    this.jumps?.forEach(jump => { jump.slot.setActive() });

    this.selected = piece;
  }

  onMouseUp(x, y) {
    if (!this.selected) return;
    const selected = this.selected;
    
    selected.setDefault();
    this.jumps?.forEach(jump => jump.slot.setDefault());
    
    const slot = this.findSlot(selected.x, selected.y);
    
    let valid = false;
    let removed = null;
    this.jumps?.forEach(jump => { 
      if (jump.slot == slot) {
        valid = true;
        removed = jump.piece;
      }
    });

    if (valid) {
      this.placeInSlot(slot, selected);
      this.removePiece(removed);
    } else {
      this.returnToOrigin(selected);
    } 
    
    this.selected = null;
    if (this.checkWinCondition()) this.win();
    else if (this.isSoftlock()) this.gameOver("No more valid movements");
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

    this.slots = [];
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
              this.colors
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

    this.pieces = [];
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