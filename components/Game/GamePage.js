import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
      <h1>Game Page</h1>
    `;
  }
}

GamePage.define("game-page");