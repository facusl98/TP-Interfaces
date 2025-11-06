import { CanvasService } from "../Services/CanvasService.js";

class _Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  
  set coords(coords) {
    const { width } = CanvasService;
    this.x = coords.x - width / 4;
  }

  get coords() {
    return {x: this.x, y: this.y}
  }
}

export const Camera = new _Camera();