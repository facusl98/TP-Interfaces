import {BaseComponent} from '../BaseComponent.js';

class CarouselCard extends BaseComponent{
  constructor() {
    super();
    this._attachCSS(import.meta.url)
  }

  connectedCallback() {
    this.innerHTML += `
      <p>EEEEO</p>
    `
    console.log("AAAAAAAAA")
  }
}

CarouselCard.define("carousel-card");