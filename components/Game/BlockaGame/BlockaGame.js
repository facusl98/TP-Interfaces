import { BaseComponent } from "../../BaseComponent.js";
import { CanvasManager } from "../CanvasManager.js";


class BlockaGame extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <canvas />
    `;

    const manager = new CanvasManager(this.shadowRoot.querySelector("canvas"));
  }
}

BlockaGame.define("blocka-game");