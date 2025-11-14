import { BaseComponent } from "../../BaseComponent.js";

class ChangeableIcon extends BaseComponent {
  constructor() {
    super();

    this._state = false;
    this._firstIcon = "";
    this._secondIcon = "";
    this._alt = "";
    this._size = 0;
    this._active = "";
  }

  connectedCallback() {
    this._firstIcon = this.getAttribute("firstIcon");
    this._secondIcon = this.getAttribute("secondIcon");
    this._alt = this.getAttribute("alt");
    this._size = this.getAttribute("size");
    this._active = this._firstIcon;

    this.render();
    
    this.addEventListener("click", () => {
      if (!this._state) {
        this._active = this._secondIcon;
      } else {
        this._active = this._firstIcon;
      }
      this._state = !this._state;
      this.render();
    });
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML = `
      <img src="${this._active}" alt="${this._alt}"></img>
    `;

    const img = this.shadowRoot.querySelector("img");
    img.style.height = this._size;
    img.style.width = this._size;
  }

  static get observedAttributes() {
    return ["firstIcon", "secondIcon", "alt", "size"];
  }
}

ChangeableIcon.define("changeable-icon");