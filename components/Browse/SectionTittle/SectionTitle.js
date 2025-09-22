import { BaseComponent } from "../../BaseComponent.js";

class SectionTitle extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <h3>${this.getAttribute("text")}</h3>
    `;
  }

  static get observedAttributes() {
    return ["icon", "text"];
  }
  
}

SectionTitle.define("section-title");