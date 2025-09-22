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
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");
    if (this.getAttribute("icon")) this._icon = this.getAttribute("icon");
    if (this.getAttribute("iconSize")) this._iconSize = this.getAttribute("iconSize");
    if (this.getAttribute("text")) this._text = this.getAttribute("text");
    if (this.getAttribute("width")) this._width = this.getAttribute("width");
    if (this.getAttribute("height")) this._height = this.getAttribute("height");
    this._funcName = this.getAttribute("funcName");
    this.render();

    this.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent(this._funcName, {
        bubbles: true,
        composed: true,
      }));
    })
  }

  async render() {
    this.shadowRoot.innerHTML += `
      <style>
        :host {
          font-family: var(--text-font);
          background-color: var(--dark-4);
          border: 1px solid var(--purple-2);
          border-radius: 5px;
          ${this._height ?
            `height: ${this._height}px;` : "height: 30px;"
          }
          ${this._width ?
            `width: ${this._width}px;` : "width: 100%;"
          }
          box-sizing: border-box;
          padding: 5px 10px;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        custom-icon {
          margin-right: 5px
        }
      </style>

      ${this._icon ?
        `<custom-icon
          icon="${this._icon}"
          ${this._iconSize && `size="${this._iconSize}"`}
        ></custom-icon>` : ""
      }
      ${this._text ?
        this._text : ""
      }
    `;
  }

  static get observedAttributes() {
    return ["icon", "text", "width", "height", "funcName", "iconSize"]
  }
}

CustomButton.define("custom-button")