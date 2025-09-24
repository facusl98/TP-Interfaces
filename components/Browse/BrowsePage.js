import { BaseComponent } from "../BaseComponent.js";

class BrowsePage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("./CarouselBody/CarouselBody.js");
    await import("./FilterBody/FilterBody.js");
    this.render();

  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <carousel-body type="trending"></carousel-body>
      <carousel-body type="recent"></carousel-body>
      <carousel-body type="platformers"></carousel-body>
      <carousel-body type="arcade"></carousel-body>
      <carousel-body type="rpg"></carousel-body>
      <carousel-body type="puzzle"></carousel-body>
      <carousel-body type="fighting"></carousel-body>
      <filter-body></filter-body>
    `;
  }
}

BrowsePage.define("browse-page")