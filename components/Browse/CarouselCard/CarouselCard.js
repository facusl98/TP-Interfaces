import { BaseComponent } from "../../BaseComponent.js";

class CarouselCard extends BaseComponent {
  constructor() {
    super();

    this._name = "";
    this._image = "";
    this._rating = 0;
  }

  connectedCallback() {
    this._name = this.getAttribute("name");
    this._image = this.getAttribute("image");
    this._rating = this.getAttribute("rating");
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <img src="${this._image}" alt="${this._name}"></img>
      <div class="info">
        <p>${this._name}</p>
        <div class="rating">${this._rating}</div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["name", "image", "rating"];
  }
}

CarouselCard.define("carousel-card");