import { BaseComponent } from "../../BaseComponent.js";

class SectionTitle extends BaseComponent {
  constructor() {
    super();

    this._text = "";
    this._icon = "";
  }

  connectedCallback() {
    this._text = this.getAttribute("text");
    this._icon = this.getAttribute("icon");

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <img src="${this._icon}" alt="${this._text}"></img>
      <h3>${this.getAttribute("text")}</h3>
    `;
  }

  static get observedAttributes() {
    return ["icon", "text"];
  }
  
}

SectionTitle.define("section-title");