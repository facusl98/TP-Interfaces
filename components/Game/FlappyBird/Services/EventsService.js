import { Canvas } from "../Singletons/Canvas.js";
import { Click, Hover } from "../Singletons/Events.js";
import { GameManager } from "../Singletons/GameManager.js";
import { Player } from "../Singletons/Player.js";
import { UIManager } from "../Singletons/UIManager.js";

class _EventsService {
  constructor() {
    this.hoverable = [];
  }

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
          break;
        case "escape": 
          UIManager.toggleMenu()
          break;
      } 
    });

    const canvas = Canvas.canvas;
    canvas.addEventListener("mousemove", (e) => {
      const x = e.offsetX, y = e.offsetY;
      Hover.events.forEach((elem) => {
        elem.hovered = elem.isInside(x, y);
      });
    });

    canvas.addEventListener("click", (e) => {
      const x = e.offsetX, y = e.offsetY;
      Click.events.forEach((elem) => {
        if (elem.isInside(x, y))
          elem.trigger();
      });
    });
  }

  makeHoverable(element) {
    this.hoverable.push(element);
  }
}

export const EventsService = new _EventsService();