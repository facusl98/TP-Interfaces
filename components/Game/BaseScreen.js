export class BaseScreen {
  constructor(game, changeScreen) {
    this.game = game;
    this.toolkit = game.toolkit;
    this.ctx = this.toolkit.getCtx();
    this.changeScreen = changeScreen;
    this.events = [];
    this.hovered = null;

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "24px Helvetica";
  }

  draw(params = {}) {}

  onClick(x, y, e) {
    for (const o of this.events) {
      if ((x > o.x1 && x < o.x2) && (y > o.y1 && y < o.y2)) {
        o.click(e);
        return;
      }
    }
  }

  onHover(x, y) {
    let hoveredNow = null;

    for (const o of this.events) {
      if ((x > o.x1 && x < o.x2) && (y > o.y1 && y < o.y2)) {
        hoveredNow = o;
        break;
      }
    }

    // If hovered target changed
    if (hoveredNow != this.hovered) {
      // Deactivates previous hover
      if (this.hovered?.unhover) {
        this.hovered.unhover();
      }

      // Activates new hover
      if (hoveredNow?.hover) {
        hoveredNow.hover();
      }

      this.hovered = hoveredNow;
      this.game.className = hoveredNow ? "pointer" : "";
    }
  }

  showEventHitboxes() {
    this.events.forEach(e => {
      this.ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      this.ctx.lineWidth = 1;
      this.ctx.rect(e.x1, e.y1, e.x2 - e.x1, e.y2 - e.y1);
      this.ctx.stroke();
    })
  }
}