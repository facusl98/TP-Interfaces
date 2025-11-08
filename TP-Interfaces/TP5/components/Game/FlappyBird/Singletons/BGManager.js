import { BGLayer } from "../Elements/BGLayer.js";
import { Canvas } from "./Canvas.js";
import { Player } from "./Player.js";

class _BGManager {
  constructor() {
    this.layers = [];
  }

  build() {
    this.layers = [];
    const url = "/TP-Interfaces/TP5/assets/images/flappy_bird/Background/Layer_";
    const cant = 9;
    const multiplier = .5;
    const playerSpeed = Player.defaultSpeed.x;
    for (let i = 0; i <= cant; i++) {
      const speed = cant - i * cant / playerSpeed * multiplier; 
      this.layers.push(
        new BGLayer(url + i + ".png", speed )
      )
    }
  }

  draw() {
    this.layers.forEach((layer) => {
      layer.draw();
    });
  }

  reset() {
    this.layers.forEach((layer) => {
      layer.build();
    });
  }
}

export const BGManager = new _BGManager();