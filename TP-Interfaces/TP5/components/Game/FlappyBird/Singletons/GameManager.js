import { BGManager } from "./BGManager.js";
import { Map } from "./Map.js";
import { Player } from "./Player.js";

class _GameManager {
  constructor() {
    this._state = "INITIAL";
    this._prev = "";
  }

  set state(s) {
    this._prev = this._state;
    this._state = s;
  
    if (s == "RUNNING")
      Player.start()
    else
      Player.pause();
  }

  get state() {
    return this._state;
  }
  
  pause() {
    this.state = "PAUSED";
  }

  wait() {
    this.state = "WAITING";
  }

  stop() {
    this.state = "OVER";
  }

  reset() {
    this.state = "INITIAL"
    Player.reset();
    Map.reset();
    BGManager.reset();
    this._win = false;
  }

  initialize() {
    this.state = "INITIAL";
  }

  start() {
    this.state = "RUNNING"
  }

  resume() {
    this.state = this._prev;
  }

  canStart() {
    return this._state === "INITIAL"
  }

  isRunning() {
    return this._state === "RUNNING";
  }

  isOver() {
    return this._state === "OVER"
  }

  isPaused() {
    return this._state === "PAUSED"
  }

  win() {
    this._win = true;
    this.stop();
  }
}

export const GameManager = new _GameManager();