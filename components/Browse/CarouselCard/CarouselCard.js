import { BaseComponent } from "../../BaseComponent.js";

class CarouselCard extends BaseComponent {
  constructor() {
    super();

    this._name = "";
    this._image = "";
    this._rating = "";
  }

  async connectedCallback() {
    await import ("../../Common/ChangeableIcon/ChangeableIcon.js");
    this._name = this.getAttribute("name");
    this._image = this.getAttribute("image");
    const rating = this.getAttribute("rating");
    if (rating > 1000) {
      const stringRating = rating.toString();
      this._rating = stringRating.charAt(0) + "." + stringRating.charAt(1) + "k";
    } else {
      this._rating = rating;
    }

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <img class="game_image" src="${this._image}" alt="${this._name}"></img>
      <div class="info">
        <p>${this._name}</p>
        <div class="rating">
          <p>${this._rating}</p> 
          <changeable-icon 
            firstIcon="../../../assets/icons/common/FavoriteEmpty.svg"
            secondIcon="../../../assets/icons/common/FavoriteFull.svg"
            alt="Favorite"
            size="18"
          ></changeable-icon>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["name", "image", "rating"];
  }
}

CarouselCard.define("carousel-card");