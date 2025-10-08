import { BaseComponent } from "../../BaseComponent.js"


class GamePicture extends BaseComponent {
  constructor() {
    super();

    this._src = "";
    this._alt = ""; 
    this._iconSize = "";
  }
  
  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");

    this._src = this.getAttribute("src") || "";
    this._alt = this.getAttribute("alt") || "";
    if (this.getAttribute("class") == "small") 
      this._iconSize = "30px";
    else if (this.getAttribute("class") == "large") 
      this._iconSize = "120px";
    else 
      this._iconSize = "40px";
    
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <img src="${this._src}" alt="${this._alt}" loading="lazy"/>
      <a href="#game">
        <div class="overlay">
          <custom-icon 
          icon="/TP2/assets/icons/common/Play.svg"
          size="${this._iconSize}"
          ></custom-icon>
        </div>
      </a>
    `;
  }

  static get observedAttributes() {
    return ["src", "alt", "class"];
  }
}

GamePicture.define("game-picture");