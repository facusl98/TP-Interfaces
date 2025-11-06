import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class GameDotList extends BaseComponent {
  constructor() {
    super();

    this._title = "";
    this._genre = "";
    this._amount = 0;
    this._games = [];
  }

  async connectedCallback() {
    await import("../GameDot/GameDot.js");
    this._title = this.getAttribute("title") || "Popular Today";
    this._genre = this.getAttribute("genre") || "Action";
    this._amount = this.getAttribute("amount") || 3;

    if (gameService.ready) this._games = gameService.getBy("", this._genre);

    this.render();

    gameService.addEventListener("change", () => {
      this._games = gameService.getBy("", this._genre);
      this.render();
    });
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <h2>${this._title}</h2>
            
      <div class="games">
        ${this._games.map((game, i) => {
          if (i < this._amount)
            return `
              <game-dot 
                image="${game.background_image_low_res}"
                name="${game.name}"
              ></game-dot>
            `;
        }).join("")}
      </div>
    `;
  }

  static get observedAttributes() {
    return ["title", "genre", "amount"];
  }
}

GameDotList.define("game-dot-list")