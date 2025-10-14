import { BaseComponent } from "../../BaseComponent.js";

class BlockaGame extends BaseComponent {
  constructor() {
    super();

    this._canvas = null;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.innerHTML += `
      <canvas />
    `;

    this._canvas = this.querySelector("canvas");
  }
}

BlockaGame.define("blocka-game");