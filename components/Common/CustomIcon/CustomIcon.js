import { BaseComponent } from "../../BaseComponent.js";

class CustomIcon extends BaseComponent {
  constructor() {
    super();

    this._icon = "";
    this._size = null;
  }

  connectedCallback() {
    this._icon = this.getAttribute("icon");
    if (this.getAttribute("size")) this._size = this.getAttribute("size");
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host, img {
          display:flex;
          align-items: center;
          ${
            this._size ?
            `width: ${this._size}px; height: ${this._size}px;` : 
            "width: 20px; height: 20px"
          }
        }
      </style>
      <img src="${this._icon}" alt="Custom Icon"></img>
    `;
  }

  static get observedAttributes() {
    return ["icon", "size"];
  }
}

CustomIcon.define("custom-icon")