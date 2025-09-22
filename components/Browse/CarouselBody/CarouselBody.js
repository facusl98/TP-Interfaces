import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class CarouselBody extends BaseComponent {
  constructor() {
    super();

    this._type = "trending"; // Default
    this._games = [];

    this._types = {
      trending: {
        icon: "../../../assets/icons/common/Trending.svg",
        text: "Trending Games",
        import: () => gameService.getTrending(),
      },
      recent: {
        icon: "../../../assets/icons/common/New.svg",
        text: "Newly Added",
        import: () => gameService.getNewest(),
      }
    };
  }

  async connectedCallback() {
    await import("../SectionTitle/SectionTitle.js");
    await import("../CarouselCard/CarouselCard.js");
    this._type = this.getAttribute("type");

    gameService.addEventListener("change", () => {
        this._games = this._types[this._type].import();
        this.render();
      });

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <section-title 
        text="${this._types[this._type].text}"
        icon="${this._types[this._type].icon}">
      </section-title>
      <div class="outer">
        <div class="inner">
        ${this._games.map((game) => {
          return `
          <carousel-card 
            name="${game.name}"
            image="${game.background_image}"  
            rating="${game.rating}"
          ></carousel-card>`;
        }).join("")}
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["type"];
  }
}

CarouselBody.define("carousel-body")