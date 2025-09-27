import { BaseComponent } from "../../BaseComponent.js";

class CustomIcon extends BaseComponent {
  constructor() {
    super();

    this._icon = "";
    this._size = null;
    this._style = "default";
  }

  connectedCallback() {
    this._icon = this.getAttribute("icon");
    if (this.getAttribute("size")) this._size = this.getAttribute("size");
    if (this.getAttribute("style")) this._style = this.getAttribute("style");
    if (this._style === "dark") this.classList.add("dark");
    this.render()
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <img src="${this._icon}" alt="Custom Icon" loading="lazy"></img>
    `;

    if (this._size) {
      const img = this.shadowRoot.querySelector("img");
      img.style.width = this._size;
      img.style.height = this._size;
      this.style.height = this._size;
      this.style.width = this._size;
    }
  }

  static get observedAttributes() {
    return ["icon", "size", "style"];
  }
}

CustomIcon.define("custom-icon")