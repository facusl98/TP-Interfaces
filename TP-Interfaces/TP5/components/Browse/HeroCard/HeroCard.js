import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class HeroCard extends BaseComponent {
  constructor() {
    super();

    this._games = [];
    this._shown = [];
    this._activeIndex = 3;
    this._mobile = window.innerWidth < 600 ? true : false;
    this._carousel = null;

  }

  importGames() {
    this._games = gameService.getRandom(7);
    this._games[2] = {
      name: "Peg Solitaire",
      background_image: "/TP-Interfaces/TP5/assets/images/peg_solitaire/solitaire.png",
      genres: [
        {name: "Puzzle"}, 
        {name: "Strategy"}, 
        {name: "Indie"}
      ]
    };
    this._games[3] = {
      name: "Wisp Away",
      background_image: "/TP-Interfaces/TP5/assets/images/flappy_bird/wisp-away.png",
      genres: [
        {name: "Arcade"}, 
        {name: "Indie"}
      ]
    }
    this._games[4] = {
      name: "Blocka",
      background_image: "/TP-Interfaces/TP5/assets/images/blocka/blocka.jpg",
      genres: [
        {name: "Puzzle"}, 
        {name: "Casual"}, 
        {name: "Indie"}
      ]
    }
    this._setShown();
    this.render();
  }

  _setShown() {
    let result = [];
    for (let offset = -2; offset <= 2; offset++) {
      let pos = (this._activeIndex + offset + this._games.length) % this._games.length;
      result.push(this._games[pos]);
    }
    this._shown = result;
  }

  async connectedCallback() {
    await import("../../Common/CustomIcon/CustomIcon.js");

    if (gameService.ready) this.importGames();

    gameService.addEventListener("change", () => {
      this.importGames();
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
            icon="/TP-Interfaces/TP5/assets/icons/common/ArrowLeft.svg"
            class="arrow"
          ></custom-icon>
          <div class="dots">
            ${this._games.map((_, i) => `
            <div class="dot${i === this._activeIndex ? ' active' : ''}" data-index="${i}"
            tabindex="0"></div>
            `).join('')}
          </div>
          <custom-icon
            class="arrow"
            icon="/TP-Interfaces/TP5/assets/icons/common/ArrowRight.svg"
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
        ${this._shown.map((game, i) => {
          let html = `
            <div class="card card-${i}">
              <img class="card-image" 
                src="${game.background_image}" />
              <div class="overlay"
              data-index="${this._games.indexOf(game)}"></div>
            </div>
          `;
          return html;
        }).join("")}
        <div class="info">
          <h2>${this._games[this._activeIndex].name}</h2>
          <p>${this._games[this._activeIndex].genres.map((genre) => {
            return `<span>${genre.name}</span>`;
          }).join(",  ")}</p>
        </div>
    `;
 
    this.addEvents();
  }


  
  addEvents() {
    this.shadowRoot.querySelectorAll(".dot").forEach((e) => {
      e.addEventListener("click", () => {
        this._selectNew(e);
      });
    });
    
    this.shadowRoot.querySelectorAll(".overlay").forEach((e) => {
      e.addEventListener("click", () => {
        this._selectNew(e);
      });
    });

    this.shadowRoot.querySelector(".info").addEventListener("click", () => {
      if (this._activeIndex == 4)
        window.location.hash = "#/game/blocka"
      else if (this._activeIndex == 2)
        window.location.hash = "#/game/peg-solitaire"
      else 
        window.location.hash = "#/game/wisp-away"
    });

    const arrows = this.shadowRoot.querySelectorAll(".arrow");
    arrows[0].addEventListener(("click"), () => {
      if (this._activeIndex > 0) this._activeIndex--;
      else this._activeIndex = 6;
      this._setShown();
      this.render();
    });

    arrows[1].addEventListener(("click"), () => {
    if (this._activeIndex < 6) this._activeIndex++;
    else this._activeIndex = 0;
    this._setShown();
    this.render();
    });
  }

  _selectNew(e) {
    const info = this.shadowRoot.querySelector(".info");
    info.style.opacity = 0;
    this.shift(e.dataset.index - this._activeIndex);
    setTimeout(() => {
      this._activeIndex = parseInt(e.dataset.index);
      this._setShown();
      this.render();
    }, 300) 
  }

  shift(offset) {
    this.shadowRoot.querySelectorAll(".card").forEach((card, i) => {
      card.className = card.className.replace(/card-\d/, "");

      let newCard = i - offset;

      if (newCard < 0) newCard = 0;
      if (newCard > 4) newCard = 4;

      card.classList.add(`card-${newCard}`);
    });
  }
}

HeroCard.define("hero-card")