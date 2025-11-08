import { BGManager } from "./BGManager.js";
import { Map } from "./Map.js";
import { Player } from "./Player.js";

class _GameManager {
  constructor() {
    this._state = "INITIAL";
  }

  get state() {
    return this._state;
  }
  
  pause() {
    this._state = "PAUSED";
    Player.pause();
  }

  stop() {
    this._state = "STOPPED";
    Player.stop();
  }

  reset() {
    this._state = "INITIAL"
    Player.reset();
    Map.reset();
    BGManager.reset();
  }

  start() {
    this._state = "RUNNING"
    Player.start();
  }

  hit(collision) {
    console.log(collision)
    Player.hit(collision)
  }

  canStart() {
    return this._state == "PAUSED" || this._state == "INITIAL"
  }

  isRunning() {
    return this._state == "RUNNING";
  }
}

export const GameManager = new _GameManager();