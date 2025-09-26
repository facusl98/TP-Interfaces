import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class HeroCard extends BaseComponent {
  constructor() {
    super();

    this._games = [];
    this._activeIndex = 3;
    this._carousel = null;

  }

  async connectedCallback() {
    await import("../../Common/CustomIcon/CustomIcon.js");

    gameService.addEventListener("change", () => {
        this._games = gameService.getRandom(7);
        this.render();
    });
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class="cont">
        <div class="carousel">
        </div>



        <div class="nav">
          <custom-icon
            icon="/assets/icons/common/ArrowLeft.svg"
          ></custom-icon>
          <div class="dots">
            ${this._games.map((_, i) => `
            <div class="dot${i === this._activeIndex ? ' active' : ''}" data-index="${i}"></div>
            `).join('')}
          </div>
          <custom-icon
            icon="/assets/icons/common/ArrowRight.svg"
          ></custom-icon>
        </div>
      </div>
    `;
  }

  renderCarousel() {
    if (!this._carousel) return;
  }
}

HeroCard.define("hero-card")