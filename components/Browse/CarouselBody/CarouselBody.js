import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class CarouselBody extends BaseComponent {
  constructor() {
    super();

    this._type = "trending"; // Default
    this._games = [];
    this._class = "default"; // Default
    this._placeholder = "/assets/images/Placeholder.png";
    this._isPlaceholder = true;
    this._inner = null;
    this._observer = null;

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

    await this.render();

    this._inner = this.shadowRoot.querySelector(".inner");

    gameService.addEventListener("change", () => {
        this._games = this._types[this._type].import();
        this.renderCards();
    });

    this._observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this._isPlaceholder) {
          this._isPlaceholder = false;
          this.renderCards();
        }
      } else {
        if (!this._isPlaceholder) {
          this._isPlaceholder = true;
          this._inner.innerHTML = "";
        }
      }
      this.toggleAttribute('placeholder', this._isPlaceholder);
    });
    this._observer.observe(this);
  }

  disconnectedCallback() {
    if (this._observer) this._observer.disconnect();
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
        </div>
      </div>
    `;
    if (!this._placeholder) this.renderCards();
  }

  renderCards() {
    if (this._isPlaceholder) return;
    this._inner.innerHTML = this._games.map((game) => {
        return `
        <carousel-card 
          name="${game.name}"
          image="${this._placeholder /* game.background_image */}"  
          rating="${game.rating}"
          class="${this._class}"
        ></carousel-card>`;}).join("");
  }

  static get observedAttributes() {
    return ["type", "class"];
  }
}

CarouselBody.define("carousel-body")