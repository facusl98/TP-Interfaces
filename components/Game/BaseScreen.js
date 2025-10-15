export class BaseScreen {
  constructor(game, changeScreen) {
    this.game = game;
    this.manager = game.manager;
    this.ctx = this.manager.getCtx();
    this.changeScreen = changeScreen;
    this.events = [];
  }

  draw() {}

  onClick(x, y) {
    for (const o of this.events) {
        if ((x > o.x1 && x < o.x2) && (y > o.y1 && y < o.y2)) {
          o.click();
          return;
        }
      }
  }

  onHover(x, y) {
    for (const o of this.events) {
        if ((x > o.x1 && x < o.x2) && (y > o.y1 && y < o.y2)) {
          if (o.hover)
            o.hover();
          else 
            this.className = "pointer";
          return;
        }
      }
  }
}