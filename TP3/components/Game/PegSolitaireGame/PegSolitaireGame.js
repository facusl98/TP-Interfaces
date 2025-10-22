import { BaseComponent } from "../../BaseComponent.js";

class PegSolitaireGame extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.innerHTML += `
      <canvas></canvas>
    `;

    this._canvas = this.querySelector("canvas");
  }
}

PegSolitaireGame.define("peg-solitaire-game");