import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent { 
  constructor() {
    super();
  }

  connectedCallback() {
    this.render(); 
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div>Footeer</div>
    `;
  }
}

FooterComponent.define("footer-component");