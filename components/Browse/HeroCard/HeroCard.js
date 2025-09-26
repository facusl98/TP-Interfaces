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
            class="arrow"
          ></custom-icon>
          <div class="dots">
            ${this._games.map((_, i) => `
            <div class="dot${i === this._activeIndex ? ' active' : ''}" data-index="${i}"></div>
            `).join('')}
          </div>
          <custom-icon
            class="arrow"
            icon="/assets/icons/common/ArrowRight.svg"
          ></custom-icon>
        </div>
      </div>
    `;
    this._carousel = this.shadowRoot.querySelector(".carousel");
    this.renderCarousel();
  }

  renderCarousel() {
    if (!this._carousel) return;
    this._carousel.innerHTML =  `
      <div class="main">
        <div class="card">
          <img class="card-image" 
            src="${this._games[this._activeIndex].background_image}" 
            alt="${this._games[this._activeIndex].name}" />
          <div class="info">
            <h2>${this._games[this._activeIndex].name}</h2>
            <p>${this._games[this._activeIndex].genres.map((genre) => {
              return `<span>${genre.name}</span>`;
            }).join(",  ")}</p>
          </div>
        </div>
      </div>

      <div class="secondary">
        <div class="card">
          <img class="card-image" 
            src="${this._games[this._activeIndex > 0 ? 
              this._activeIndex - 1 : 6].background_image}" />
          <div class="overlay"
          data-index="${this._activeIndex > 0 ? this._activeIndex - 1 : 6}"></div>
        </div>
        <div class="card"">
          <img class="card-image" 
            src="${this._games[this._activeIndex < 6 ? 
              this._activeIndex + 1 : 0].background_image}" />
            <div class="overlay"
            data-index="${this._activeIndex < 6 ? this._activeIndex + 1 : 0}"></div>
          </div>
      </div>

      <div class="tertiary">
        <div class="card">
          <img class="card-image" 
            src="${this._games[this._activeIndex > 1 ? 
              this._activeIndex - 2 : 5].background_image}" />
          <div class="overlay"
          data-index="${this._activeIndex > 1 ? this._activeIndex - 2 : 5}">
        </div>
        </div>
        <div class="card">
          <img class="card-image" 
            src="${this._games[this._activeIndex < 5 ? 
              this._activeIndex + 2 : 1].background_image}" />
          <div class="overlay"
          data-index="${this._activeIndex < 5 ? this._activeIndex + 2 : 1}"></div>
        </div>
      </div>
    `;
    this.addEvents();
  }

  addEvents() {
    this.shadowRoot.querySelectorAll(".dot").forEach((e) => {
      e.addEventListener("click", () => {
        this._activeIndex = parseInt(e.dataset.index);
        this.render();
      });
    });
    
    this.shadowRoot.querySelectorAll(".overlay").forEach((e) => {
      e.addEventListener("click", () => {
        this._activeIndex = parseInt(e.dataset.index);
        this.render();
      });
    });
  }
}

HeroCard.define("hero-card")