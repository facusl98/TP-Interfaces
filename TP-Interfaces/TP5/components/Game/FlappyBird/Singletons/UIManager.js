import { HPBar } from "../UI/HPBar.js";
import { Score } from "../UI/Score.js";

class _UIManager {
  constructor() {
    this.pad = 10;
    this.HPBar = new HPBar(this.pad, this.pad);
    this.Score = new Score(this.pad, this.pad + 48 + 5)
  }

  draw() {
    const { HPBar, Score } = this;
    HPBar.draw();
    Score.draw();
  }
}

export const UIManager = new _UIManager();