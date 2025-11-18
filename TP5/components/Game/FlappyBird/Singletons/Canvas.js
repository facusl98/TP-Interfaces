class _Canvas {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.height = 0;
    this.width = 0;
  }

  createCanvas(width, height) {
    this.height = height; 
    this.width = width;
    const canvas = document.createElement("canvas"); 
    this.canvas = canvas;
    this.canvas.width = width; 
    this.canvas.height = height; 
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    const { ctx, width, height } = this;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height); 
  }
}

export const Canvas = new _Canvas();