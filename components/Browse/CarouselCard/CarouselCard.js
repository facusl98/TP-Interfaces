import { BaseComponent } from "../../BaseComponent.js";

class CarouselCard extends BaseComponent {
  constructor() {
    super();

    this._name = "";
    this._image = "";
    this._rating = "";
    this._class = "default";
  }

  async connectedCallback() {
    await import ("../../Common/ChangeableIcon/ChangeableIcon.js");
    await import ("../../Common/GamePicture/GamePicture.js");

    this._name = this.getAttribute("name");
    this._image = this.getAttribute("image");
    this._class = this.getAttribute("class");
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
      <game-picture 
        src="${this._image}" 
        alt="${this._name}"
        class="${this._class}"
      ></game-picture>
      <div class="info">
        <p class="name">${this._name}</p>
        <div class="rating  desktop">
          <p>${this._rating}</p> 
          <changeable-icon 
            firstIcon="../../../assets/icons/common/FavoriteEmpty.svg"
            secondIcon="../../../assets/icons/common/FavoriteFull.svg"
            alt="Favorite"
            size="18px"
          ></changeable-icon>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["name", "image", "rating", "class"];
  }
}

CarouselCard.define("carousel-card");