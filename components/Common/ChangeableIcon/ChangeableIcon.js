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

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; align-items: center }
        img {
          width: ${this._size}px;
          height: ${this._size}px;
        }
        img:hover { cursor: pointer; }
      </style>
      <img src="${this._active}" alt="${this._alt}"></img>
    `;
  }

  static get observedAttributes() {
    return ["firstIcon", "secondIcon", "alt", "size"];
  }
}

ChangeableIcon.define("changeable-icon");