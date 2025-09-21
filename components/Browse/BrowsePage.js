import { BaseComponent } from "../BaseComponent.js";

class BrowsePage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div>
        
      </div>
    `;
  }
}

BrowsePage.define("browse-page")