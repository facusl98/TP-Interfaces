import { BaseComponent } from "../../BaseComponent.js";

class CustomIcon extends BaseComponent {
  constructor() {
    super();

    this._icon = "";
    this._size = null;
    this._style = "default";
    this._img = document.createElement("img");
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

    this._img.src = this._icon;
    this._img.alt = "Custom Icon";
    if (this._size) {
      this._img.style.width = this._size;
      this._img.style.height = this._size;
      this._img.style.height = this._size;
      this._img.style.width = this._size;
    }
    this.shadowRoot.appendChild(this._img)
  }

  static get observedAttributes() {
    return ["icon", "size", "style"];
  }
}

CustomIcon.define("custom-icon")