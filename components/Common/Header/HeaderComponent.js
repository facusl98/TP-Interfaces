import { BaseComponent } from "../../BaseComponent.js";

class HeaderComponent extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div>
        <a href="#browse">
        <img src= "/assets/images/logo.src" alt= "Logo"></img>
        </a>
      </div>
      <div>
        <input class = "search-header">
        <custom-icon icon="/assets/icons/common/Search.svg" size="20px">
      </div>
      <div>
        <button class= "user-btn"><img src="/assets/images/UserIcon.svg"></img></button>
      </div>

    `;
  }
}

HeaderComponent.define("header-component");