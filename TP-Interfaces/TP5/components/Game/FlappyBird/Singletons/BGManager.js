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
    const exponent = 2.5;
    const playerSpeed = Player.baseSpeed.x;
    for (let i = 0; i <= cant; i++) {
      const t = i / cant;
      const speed = playerSpeed - (playerSpeed * Math.pow(t, exponent) / 2);
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