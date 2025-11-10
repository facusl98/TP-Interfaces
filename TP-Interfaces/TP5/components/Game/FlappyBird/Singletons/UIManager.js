import { GameOver } from "../UI/GameOver.js";
import { HPBar } from "../UI/HPBar.js";
import { Menu } from "../UI/Menu.js";
import { Score } from "../UI/Score.js";
import { GameManager } from "./GameManager.js";

class _UIManager {
  constructor() {
    this.pad = 10;
    this.cy = 240;
    this.cx = 360;
    this.HPBar = new HPBar(this.pad, this.pad);
    this.Score = new Score(this.pad, this.pad + 48 + 5)
    this.GameOver = new GameOver(this.cx, this.cy);
    this.Menu = new Menu(this.cx, this.cy);

    this._menuOpen = true;
    this._options = false;
  }

  draw() {
    const { HPBar, Score, GameOver, Menu, _menuOpen } = this;

    HPBar.draw();
    Score.draw();

    if (GameManager.isOver())
      GameOver.draw();

    if (_menuOpen) {
      Menu.draw()
    }
  }

  set menuOpen(bool) {
    this._menuOpen = bool;
    if (this.menuOpen) GameManager.pause();
    else if (GameManager.isPaused()) GameManager.resume()
    this.Menu.controlsOpen = false;
  }

  get menuOpen() {
    return this._menuOpen;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


}

export const UIManager = new _UIManager();