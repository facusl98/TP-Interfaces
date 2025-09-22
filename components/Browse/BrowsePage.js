import { BaseComponent } from "../BaseComponent.js";
import { gameService } from "../../services/GameService.js";

class BrowsePage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("./CarouselBody/CarouselBody.js");
    await import("./FilterBody/FilterBody.js");
    this.render();

    let games = await fetch('https://vj.interfaces.jima.com.ar/api')
      .then(res => res.json()); 
    gameService.setGames(games);
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <carousel-body type="trending"></carousel-body>
      <carousel-body type="recent"></carousel-body>
      <filter-body></filter-body>
    `;
  }
}

BrowsePage.define("browse-page")