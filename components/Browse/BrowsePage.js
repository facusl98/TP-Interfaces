import { BaseComponent } from "../BaseComponent.js";

class BrowsePage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("./CarouselBody/CarouselBody.js");
    await import("./FilterBody/FilterBody.js");
    await import("./HeroCard/HeroCard.js");

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);

    this.shadowRoot.innerHTML += `
      <hero-card></hero-card>
      <carousel-body type="featured"></carousel-body>
      <carousel-body type="trending"></carousel-body>
      <carousel-body type="recent"></carousel-body>
    `;
  }

  //  <carousel-body type="platformers" class="small"></carousel-body>
  //  <carousel-body type="arcade" class="small"></carousel-body>
  //  <carousel-body type="rpg" class="small"></carousel-body>
  //  <carousel-body type="puzzle" class="small"></carousel-body>
  //  <carousel-body type="fighting" class="small"></carousel-body>
}

BrowsePage.define("browse-page");