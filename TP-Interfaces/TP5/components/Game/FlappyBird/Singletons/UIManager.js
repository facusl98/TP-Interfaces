import { HPBar } from "../Elements/HPBar.js";

class _UIManager {
  constructor() {
    this.pad = 20;
    this.HPBar = new HPBar(this.pad, this.pad);
  }

  draw() {
    const { HPBar } = this;
    HPBar.draw();
  }
}

export const UIManager = new _UIManager();