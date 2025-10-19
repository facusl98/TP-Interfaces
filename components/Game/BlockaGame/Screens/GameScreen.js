import { BaseScreen } from "../../BaseScreen.js";

export class GameScreen extends BaseScreen {
  constructor(toolkit, changeScreen) {
    super(toolkit, changeScreen);
    this.events = [];

    this.time = 0;
    this.images = [];
    this.filterImages = [];
    this.pieces = [];
  }

  draw() {
    this.time = 0;
    this.images = [];
    this.filterImages = [];
    this.pieces = [];
    
    this.pieceImage();

    // Timer: [20, 20] to [95, 70]
    this.time = 0;  
    this.timer(); // Once, to preload

    // Game Frame: [140, 20] to [580, 460]
    this.drawFrame(true);
    setTimeout(() => { 
      this.drawFrame();
      this.timerInterval = setInterval(this.timer, 1000);
    }, this.game.level == this.toolkit.keys.length - 1 ? 3000 : 1000);

    // this.showEventHitboxes();
  }

  drawFrame(clean = false) {
    const gridSize = this.game.gridSize; // (For short)
    const x = 140, y = 20, r = 10;
    this.frame = 420, this.padding = 20, this.gap = 10;

    this.fx = x + this.padding, this.fy = y + this.padding;
    const frameSize = this.frame - this.padding;
    this.size = (frameSize - (this.gap * (gridSize - 1))) / gridSize;

    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.roundRect(x, y, this.frame + this.padding, this.frame + this.padding, r);
    this.ctx.fill();

    this.pieces = [];

    for (let i = 0; i < this.images.length; i++) {
      const col = i % gridSize;
      const row = Math.floor(i / gridSize);
      const px = this.fx + col * (this.size + this.gap);
      const py = this.fy + row * (this.size + this.gap);

      const src = this.images[i];
      const imgCopy = new OffscreenCanvas(src.width, src.height);
      imgCopy.getContext("2d").drawImage(src, 0, 0);
      const piece = {
        canvas: imgCopy,
        imgIndex: i,
        x: px, y: py,
        w: this.size, h: this.size,
        angle: (Math.floor(Math.random() * 4) * 90) * Math.PI / 180
      }
      this.pieces.push(piece);

      if (!clean) {
        this.applyRotation(piece);
        this.addPieceEvent(piece);
      }
      this.drawPiece(piece);
    }
  }

  addPieceEvent(piece) {
    const { x, y, w, h } = piece;
    this.events.push({
        name: `Piece[${x}, ${y}]`,
        x1: x, x2: x + w, y1: y, y2: y + h, 
        click: (e) => {
          this.rotatePiece(piece, e.button === 0 ? true : false);     
        },
        hover: () => {},
        unhover: () => {}
    });
  }

  rotatePiece(piece, clockwise) {
    const delta = (clockwise ? 90 : -90) * Math.PI / 180;       // Deg to Rads
    piece.angle = ((piece.angle || 0) + delta ) % (Math.PI * 2); // Total Rads

    this.applyRotation(piece);

    this.checkWinCondition();
  }

  applyRotation(piece) {
    const { canvas, imgIndex } = piece;
    const w = canvas.width, h = canvas.height;
    const src = this.filterImages[imgIndex];

    const offCtx = canvas.getContext("2d");
  
    offCtx.clearRect(0, 0, w, h);

    offCtx.save();
    offCtx.translate(w / 2, h / 2); // "Grabs" piece by the middle point
    offCtx.rotate(piece.angle);     // Rotates based on the middle point
    // -w / 2 and h / 2 to compensate. 
    // Currente point of reference for coordinates is on 
    // w / 2, h / 2 (middle point)
    offCtx.drawImage(src, -w / 2, -h / 2, w, h);  
    offCtx.restore();

    this.drawPiece(piece);
  }

  drawPiece(piece) {
    const { canvas, imgIndex, x, y, w, h } = piece;
    const gridSize = this.game.gridSize;
    const col = imgIndex % gridSize;
    const row = Math.floor(imgIndex / gridSize);

    const radius = [
      row == 0 && col == 0 ? 10 : 0,                        // TL
      row == 0 && col == gridSize - 1 ? 10 : 0,             // TR
      row == gridSize - 1 && col == gridSize - 1 ? 10 : 0,  // BR
      row == gridSize - 1 && col == 0 ? 10 : 0,             // BL
    ];

    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, w, h);
    this.ctx.fill();
    this.toolkit.drawImageRounded(
      canvas,
      x, y, w, h,
      radius 
    );
  }

  pieceImage() {
    const gridSize = this.game.gridSize;  // (For short)
    const pw = this.game.image.width / gridSize;
    const ph = this.game.image.height / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const off = new OffscreenCanvas(pw, ph);
        const offCtx = off.getContext("2d");

        offCtx.drawImage(this.game.image,
          j * pw, i * ph,               // Source Image coords
          pw, ph,                       // Source Image chunks size
          0, 0, pw, ph                  // Destination canvas position
        );

        this.filterImages.push(
          this.toolkit.applyFilter(off, this.game.level)
        );
        this.images.push(off);
      }
    }
  }

  checkWinCondition() {
    let win = true;
    this.pieces.forEach((piece) => {
      if (piece.angle != 0)
        win = false;
    });
    
    if (!win) return;
    clearInterval(this.timerInterval)
    this.timer(true);
    this.events = [];

    setTimeout(() => {
      this.drawFrame(true);
      this.timer(true);
    }, 1000);

    this.game.level += 1;
    this.game.image = null;
    setTimeout(() => {
      if (this.game.level < this.toolkit.keys.length)
        this.changeScreen("SELECT");
    }, 3000)
  }

  timer = (win = false) => {
    this.ctx.save();
    let m = Math.floor(this.time / 60);
    let s = this.time % 60;

    win ? 
    this.ctx.fillStyle = this.game.colors.purpleActive :
    this.ctx.fillStyle = this.game.colors.purple;
    this.ctx.beginPath();
    this.ctx.roundRect(20, 20, 75, 50, 8);
    this.ctx.fill();
    this.ctx.font = "24px Helvetica";
    this.ctx.fillStyle = this.game.colors.light;
    this.ctx.fillText(`${m}:${s >= 10 ? s : `0${s}`}`, 57.5, 45);

    if (!win) this.time += 1;
    this.ctx.restore();
  }
}