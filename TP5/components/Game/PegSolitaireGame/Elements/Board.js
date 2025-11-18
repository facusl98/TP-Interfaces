import { Piece } from "./Piece.js";
import { Rectangle } from "../Figures/Rectangle.js";
import { Slot } from "./Slot.js";
import { TextFigure } from "../Figures/TextFigure.js";

export class Board extends Rectangle {
  constructor(ctx, colors, stopTimer) {
    const id = "Board";
    const x = 1080 / 2;
    const y = 480 / 2;
    const size = 450;

    super(ctx, id, x, y, size, size,
      colors.bg, colors.slot, 2);

    this.colors = colors;
    this.pad = 20;
    this.gap = 5;
    this.stopTimer = stopTimer;

    this.boardSize = 7;
    
    const gapSpace = 6 * this.gap;
    this.bs = (this.h - gapSpace - this.pad) / 7;
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
      ctx, x, y + 70, "You won!", 40, undefined, "transparent"
    )
  }

  // Drawing
  draw() {
    super.draw();
    this.drawSlots();
    this.drawPieces();
    this.selected?.draw();
    this.gameOverText.draw();
    this.gameOverMessage.draw();
    this.winText1.draw();
    this.winText2.draw();
  }

  // Make every slot on this.slots draw itself
  drawSlots() {
    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[i].length; j++) {
        if (this.slots[i][j])
          this.slots[i][j].draw();
      }
    }
  }

  // Make every slot on this.pieces draw itself
  drawPieces() {
    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[i].length; j++) {
        if (this.pieces[i][j])
          this.pieces[i][j].draw();
      }
    }
  }


  // Utils //
  // Assigns new theme to pieces and slots
  setTheme(theme) {
    this.colors = theme;
    this.fill = theme.bg;
    this.stroke = theme.slot;
    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[i].length; j++) {
        if (this.slots[i][j]) this.slots[i][j].setTheme(theme);
        if (this.pieces[i][j]) this.pieces[i][j].setTheme(theme);
      }
    }
  }

  // Returns piece if [x, y] is inside
  findPiece(x, y) {
    let piece = null;
    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[0].length; j++) {
        if (this.pieces[i][j])
          if (this.pieces[i][j].isPointerInside(x, y)) {
            piece = this.pieces[i][j];
            break;
          }
      }
    }
    return piece;
  }

  // Returns slot if [x, y] is inside
  findSlot(x, y) {
    let slot = null;
    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[0].length; j++) {
        if (this.slots[i][j])
          if (this.slots[i][j].isPointerInside(x, y)) {
            slot = this.slots[i][j];
            break;
          }
      }
    }
    return slot;
  }

  // Checks if slot is free
  isAvailable(slot) {
    if (slot == null) return false;
    const piece = this.findPiece(slot.x, slot.y);
    return piece ? false : true;
  }
  
  // Get slots at the right distance from the piece
  getJumps(piece) {
    const { col, row, movements } = piece;
    let slots = [];
    movements.forEach((mov, i) => {
      let r = row + 3 + mov.row;
      let c = col + 3 + mov.col;
      if (
        r >= 0 && r < this.slots.length &&
        c >= 0 && c < this.slots[0].length
      ) slots[i] = this.slots[c][r];
    });

    slots = slots.filter((s) => (s != null && s != undefined));

    return slots;
  }

  // Get jumps and check if they're valid
  getValidJumps(piece) {
    let jumps = this.getJumps(piece);
    let filtered = [];
    jumps?.forEach(jump => {
      const middle = this.getMiddlePiece(piece, jump);
      if (
        this.pieces[jump.col + 3][jump.row + 3] == null &&
        this.pieces[middle.col][middle.row]
      ) filtered.push(jump)
    });
    return filtered;
  }

  // Returns middle piece between a source piece and a destiny slot
  getMiddlePiece(piece, slot) {
    const deltaX = (slot.col - piece.col)  / 2 + 3;
    const deltaY = (slot.row - piece.row)  / 2 + 3;
    const removed = {
      col: piece.col + deltaX,
      row: piece.row + deltaY,
    };
    return removed;
  }
 
  // Check if there are any valid moves
  isSoftlock() {
    let softlock = true;
    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[0].length; j++) {
        if (this.pieces[i][j]) {
          let jumps = this.getValidJumps(this.pieces[i][j]);
          if (jumps.length != 0) {
            softlock = false;
            break;
          }
        }
      }
    }
    return softlock;
  }

  // Checks if only a piece remains and it is in the center
  checkWinCondition() {
    let counter = 0;
    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[0].length; j++) {
        if (this.pieces[i][j] != null) 
          counter++;
      }
    }

    console.log(counter)
    if (
      counter == 1 && this.pieces[3][3] != null
    ) return true;
    else return false;
  }

  // Deletes board animation. If (win == true), keeps center slot
  endAnimation(win = false, message = "") {
    let threshold = 0.05;
    const pieceDelete = setInterval(() => {
      let p = false;
      let s = false;
      for (let i = 0; i < this.slots.length; i++) {
        for (let j = 0; j < this.slots[i].length; j++) {
          if (i == 3 && j == 3 && win) continue;
          if (this.slots[i][j] != null) {
            s = true;
            if (Math.random() < threshold) this.slots[i][j] = null;
          }
          if (this.pieces[i][j] != null) {
            p = true;
            if (Math.random() < threshold) this.pieces[i][j] = null;
          }
        }
      }
      if (threshold < 1) threshold += 0.05;

      if (!p && !s) {
        clearInterval(pieceDelete)
        setTimeout(() => {
          if (win) this.loadWinText();
          else this.loadGameOverText(message);
        }, 100)
      };
    }, 200);
  }

  // Sets game over text visible
  loadGameOverText(message) {
    this.gameOverText.fill = this.colors.white;
    this.gameOverMessage.text = message;
    this.gameOverMessage.fill = this.colors.white;
    this.stopTimer();
  }

  // Sets win text visible
  loadWinText() {
    this.winText1.fill = this.colors.white;
    this.winText2.fill = this.colors.white;
    this.stopTimer();
  }

  // Game Loop Controls //
  // Locks pieces in place and apply game over effects
  gameOver(message) {
    this.running = false;
    this.endAnimation(false, message);
  }

  // Executes win animation
  win(){
    this.running = false;
    this.endAnimation(true);
  }

  // Resets slots, pieces and texts to default.
  reset() {
    this.gameOverText.fill = "transparent";
    this.gameOverMessage.fill = "transparent";
    this.winText1.fill = "transparent";
    this.winText2.fill = "transparent";
    this.running = true;
    this.createSlots();
    this.createPieces();
  }

  // Event Handlers //
  /* 
    Executes while clicking 
    Checks if clicking a piece
    Sets that piece as active
    Generate valid jumps for that piece 
  */
  onMouseDown(x, y) {
    if (!this.running) return;

    const piece = this.findPiece(x, y); 
    if (!piece) return;

    this.pieces[piece.col + 3][piece.row + 3] = null;
    this.selected = piece;
    this.selected.setActive();

    this.jumps = this.getValidJumps(this.selected);
    this.jumps?.forEach(jump => { jump.setActive() });

  }

  /* 
    Resets piece colors
    Resets slots style
    Check piece current position
    Find hovered slot, checks if valid
    Removes middle piece and sets piece to new position
    If not valid, resets position
    Check if its win or game over
  */
  onMouseUp(x, y) {
    if (!this.selected) return;
    const selected = this.selected;
    
    selected.setDefault();
    this.jumps?.forEach(jump => jump.setDefault());
    
    const slot = this.findSlot(selected.x, selected.y);
    
    let removed = null;
    this.jumps?.forEach(jump => { 
      if (jump == slot) {
        removed = this.getMiddlePiece(selected, slot);
      }
    });

    if (removed) {
      selected.setPlacement(slot.col, slot.row);
      this.pieces[removed.col][removed.row] = null;
    } else {
      selected.returnToOrigin();
    } 
    
    this.pieces[selected.col + 3][selected.row + 3] = selected;
    this.selected = null;
    this.jumps = [];
    if (this.checkWinCondition()) this.win();
    else if (this.isSoftlock()) this.gameOver("No more valid movements");
  }

  // Set piece new position based on pointer position
  onMouseMove(x, y) {
    if (!this.selected) return;
    this.selected.setPos(x, y);
  }

  // Creators 
  // Generate slots based on a map-like matrix
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
      this.slots[i] = [];
      for (let j = 0; j < board[0].length; j++) { 
        this.slots[i][j] = null;
        if (board[i][j] != "X") {
          this.slots[i][j] = new Slot (
            this.ctx, 
            i - 3, j - 3,
            this.colors
          )
        }
      }
    }
  }

  // Generate pieces based on a map-like matrix
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
      this.pieces[i] = [];
      for (let j = 0; j < pieces[0].length; j++) { 
        this.pieces[i][j] = null;
        if (pieces[i][j] == "1") {
          this.pieces[i][j] = new Piece (
            this.ctx, 
            i - 3, j - 3,
            this.colors
          )
        }
      }
    }
  }
}