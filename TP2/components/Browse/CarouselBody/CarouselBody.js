import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class CarouselBody extends BaseComponent {
  constructor() {
    super();

    this._type = "trending"; // Default
    this._games = [];
    this._class = "default"; // Default

    this._placeholder = "/TP2/assets/images/Placeholder.png";
    this._isPlaceholder = true;  // For Placeholders

    this._inner = null;   // To unload offscreen
    this._observer = null;

    this._outer = null;
    this._isMoving = false;
    this._x = 0;    // To scroll on drag.
    this._offset = 0;

    this._lastScroll = 0;
    this._ticking = false;


    this._types = {
      featured: {
        icon: "/TP2/assets/icons/common/Featured.svg",
        text: "Featured Picks",
        import: () => gameService.getRandom(10)
      },
      trending: {
        icon: "/TP2/assets/icons/common/Trending.svg",
        text: "Trending Games",
        import: () => gameService.getTrending()
      },
      recent: {
        icon: "/TP2/assets/icons/common/New.svg",
        text: "Newly Added",
        import: () => gameService.getNewest()
      }, 
      platformers: {
        icon: "/TP2/assets/icons/genres/Platformer.svg",
        text: "Platformer",
        import: () => gameService.getRandom(10)
      },
      arcade: {
        icon: "/TP2/assets/icons/genres/Arcade.svg",
        text: "Arcade",
        import: () => gameService.getRandom(10)
      }, 
      rpg: {
        icon: "/TP2/assets/icons/genres/RPG.svg",
        text: "RPG",
        import: () => gameService.getRandom(10)
      }, 
      puzzle: {
        icon: "/TP2/assets/icons/genres/puzzle.svg",
        text: "puzzle",
        import: () => gameService.getRandom(10)
      }, 
      fighting: {
        icon: "/TP2/assets/icons/genres/Fighting.svg",
        text: "Fighting",
        import: () => gameService.getRandom(10)
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
    this._outer = this.shadowRoot.querySelector(".outer");

    if (gameService.ready) this.importGames();

    gameService.addEventListener("change", () => {
      this.importGames();
    });

    this._outer.addEventListener("mousedown", (e) => {
      this._isMoving = true;
      const rect = this._outer.getBoundingClientRect();
      this._x = e.clientX - rect.left;
      this._offset = this._outer.scrollLeft;
    });

    this._outer.addEventListener('mouseleave', () => {
      this._isMoving = false;
      this._inner.style.transform = `skew(0deg)`;
    });

    this._outer.addEventListener('mouseup', () => {
      this._inner.style.transform = `skew(0deg)`;
    });

    this._outer.addEventListener('mousemove', (e) => {
      if (!this._isMoving) return;
      e.preventDefault();
      const rect = this._outer.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const move = (relativeX - this._x) * 1.5;

      this._outer.scrollLeft = this._offset - move;
    });

    this._outer.addEventListener("scroll", () => {
      const currentScroll = this._outer.scrollLeft;
      const delta = currentScroll - this._lastScroll;

      const skew = Math.max(-5, Math.min(5, delta * .3));

      this._inner.style.transform = `skew(${skew}deg)`;

      this._lastScroll = currentScroll;
    })



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

  importGames() {
    this._games = this._types[this._type].import();
    this.renderCards();
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
          image="${game.background_image_low_res}"  
          rating="${game.rating}"
          class="${this._class}"
        ></carousel-card>`;}).join("");
  }

  static get observedAttributes() {
    return ["type", "class"];
  }
}

CarouselBody.define("carousel-body")