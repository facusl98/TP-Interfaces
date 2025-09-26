import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Eo")
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
      <h1>Game Page</h1>
    `;
  }
}

GamePage.define("game-page");