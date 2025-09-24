import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class CarouselBody extends BaseComponent {
  constructor() {
    super();

    this._type = "trending"; // Default
    this._games = [];
    this._class = "default"; // Default

    this._types = {
      featured: {
        icon: "/assets/icons/common/Featured.svg",
        text: "Featured Picks",
        import: () => gameService.getRandom(15)
      },
      trending: {
        icon: "/assets/icons/common/Trending.svg",
        text: "Trending Games",
        import: () => gameService.getTrending()
      },
      recent: {
        icon: "/assets/icons/common/New.svg",
        text: "Newly Added",
        import: () => gameService.getNewest()
      }, 
      platformers: {
        icon: "/assets/icons/genres/Platformer.svg",
        text: "Platformer",
        import: () => gameService.getRandom(15)
      },
      arcade: {
        icon: "/assets/icons/genres/Arcade.svg",
        text: "Arcade",
        import: () => gameService.getRandom(15)
      }, 
      rpg: {
        icon: "/assets/icons/genres/RPG.svg",
        text: "RPG",
        import: () => gameService.getRandom(15)
      }, 
      puzzle: {
        icon: "/assets/icons/genres/puzzle.svg",
        text: "puzzle",
        import: () => gameService.getRandom(15)
      }, 
      fighting: {
        icon: "/assets/icons/genres/Fighting.svg",
        text: "Fighting",
        import: () => gameService.getRandom(15)
      }
    };
  }

  async connectedCallback() {
    await import("../SectionTitle/SectionTitle.js");
    await import("../CarouselCard/CarouselCard.js");

    this._class = this.getAttribute("class") || "default";
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
        icon="${this._types[this._type].icon}"
        class="${this._class}"
        ></section-title>
      <div class="outer">
        <div class="inner">
        ${this._games.map((game) => {
          return `
          <carousel-card 
            name="${game.name}"
            image="${game.background_image}"  
            rating="${game.rating}"
            class="${this._class}"
          ></carousel-card>`;
        }).join("")}
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["type", "class"];
  }
}

CarouselBody.define("carousel-body")