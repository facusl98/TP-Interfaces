import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class ResultsCont extends BaseComponent {
  constructor() {
    super();

    this._placeholder = "/TP-Interfaces/TP4/assets/images/Placeholder.png";
    this._games = [];
  }

  set games(games) {
    this._games = games;
  }

  async connectedCallback() {
    await import("../../Browse/CarouselCard/CarouselCard.js");
    this.render();



  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += this._games.map((game) => {

      return `<carousel-card
      name="${game.name}"
          image="${game.background_image_low_res}"  
          rating="${game.rating}"
          class="small"
      ></carousel-card>`;
    }).join("");
  }
}

ResultsCont.define("results-cont")