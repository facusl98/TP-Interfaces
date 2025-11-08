import { GameManager } from "../Singletons/GameManager.js";
import { Player } from "../Singletons/Player.js";

class _EventsService {
  constructor() {}

  hear() {
    document.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case " ":
          e.preventDefault();
          Player.jump();
          break;
        case "r":
          GameManager.reset();
      } 
    });
  }
}

export const EventsService = new _EventsService();