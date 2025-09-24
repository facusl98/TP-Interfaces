import { BaseComponent } from "../../BaseComponent.js";

class CustomButton extends BaseComponent {
  constructor() {
    super();

    this._icon = null;
    this._iconSize = null;
    this._text = null;
    this._width = null;
    this._height = null;
    this._funcName = null;
    this._funcValue = null;
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");

    if (this.getAttribute("icon")) 
      this._icon = this.getAttribute("icon");

    if (this.getAttribute("iconSize")) 
      this._iconSize = this.getAttribute("iconSize");

    if (this.getAttribute("text")) 
      this._text = this.getAttribute("text");

    if (this.getAttribute("width")) 
      this._width = this.getAttribute("width");

    if (this.getAttribute("height")) 
      this._height = this.getAttribute("height");

    if (this.getAttribute("funcValue"))
      this._funcValue = this.getAttribute("funcValue");

    this._funcName = this.getAttribute("funcName");

    this.render();

    this.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent(this._funcName, {
        bubbles: true,
        composed: true,
        detail: {
          value: this._funcValue, 
          icon: this._icon
        }
      }));
    })
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      ${this._icon ?
        `<custom-icon
          icon="${this._icon}"
          ${this._iconSize && `size="${this._iconSize}"`}
        ></custom-icon>` : ""
      }
      
      ${this._text ?
        `<p>${this._text}</p>` : ""
      }
    `;

    this._width && (this.style.width = this._width);
    this._height && (this.style.height = this._height);
  }


  static get observedAttributes() {
    return ["icon", "iconSize", "text", "width", "height", "funcName", "funcValue"];
  }
}

CustomButton.define("custom-button")