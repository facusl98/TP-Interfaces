import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class ResultsCont extends BaseComponent {
  constructor() {
    super();

    this._placeholder = "/assets/images/Placeholder.png";
    this._games = [];
  }

  async connectedCallback() {
    await import("../../Browse/CarouselCard/CarouselCard.js");
    this.render();


    gameService.addEventListener("change", () => {
      this._games = gameService.getGames().slice(0, 6 * 4 );
      this.render();
    });

  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += this._games.map((game) => {

      return `<carousel-card
      name="${game.name}"
          image="${this._placeholder /* game.background_image */}"  
          rating="${game.rating}"
          class="small"
      ></carousel-card>`;
    }).join("");
  }
}

ResultsCont.define("results-cont")