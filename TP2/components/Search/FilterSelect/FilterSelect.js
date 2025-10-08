import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class FilterSelect extends BaseComponent {
  constructor() {
    super();

    this._genresOpen = false;
    this._maxGames = (6 * 4);
    this._selectedGenre = "";
    this._inputText = "";
    this._selectedGenreIcon = "";
    this._paginated = true;
    this._page = 1;
    this._pages = 1;
    this._loaded = false;
    this._games = []
  }

  set loaded(loaded = true) {
    if (!this.loaded) {
      this._loaded = true;
      this.render();
    }
  }

  set inputText(input) {
    this._inputText = input;
    this.filter();
  }

  set selectedGenre(genre) {
    this._selectedGenre = genre;
    this.filter();
  }

  async connectedCallback() {
    await import("../../Common/CustomButton/CustomButton.js");
    await import("../../Common/CustomIcon/CustomIcon.js");

    await this.render();

    if (gameService.ready) this.filter();;

    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("keyup", () => {
      this.inputText = input.value;
    })

    this.addEventListener("toggle-genres", () => {
      this._genresOpen = !this._genresOpen;
      this.render();
    });

    this.addEventListener("select-genre", (e) => {
      this.selectedGenre = e.detail.value;
      this._selectedGenreIcon = e.detail.icon;
      this._genresOpen = false;
      this.render();
    })

    this.addEventListener("deselect-genre", () => {
      this.selectedGenre = null;
      this._selectedGenreIcon =  null;
      this._genresOpen = true;
      this.render();
    });

    gameService.addEventListener("change", () => {
      this.filter();
  });
  }


  filter() {
    this._games = gameService.getBy(this._inputText, this._selectedGenre, true);
    this._page = 1;
    this._pages = Math.ceil(this._games.length / this._maxGames);
    this.emit();
  }
  
  emit() {
    this.isOverflowing();
    this.dispatchEvent(new CustomEvent("filter-change", {
      bubbles: true,
      composed: true,
      detail: {
        games: this._games.slice(
          (this._page - 1) * this._maxGames, 
          this._page * this._maxGames ),
      }}));
  }
  

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class="filter-nav">
        <input 
          id="gameName"
          placeholder="Search by name..."
        />

        <div class="paginator"></div>
        

        ${!this._selectedGenre ?  
        `<custom-button      
          ${this._genresOpen ?    // No Genre Selected
            `icon="../../../TP-Interfaces/TP2/assets/icons/common/ArrowUp.svg"`
          :
            `icon="../../../TP-Interfaces/TP2/assets/icons/common/ArrowDown.svg"`
          }
          text="Genres"
          width="300px"
          height="34px"
          funcName="toggle-genres"
          iconSize="15px"
          class="default"
        ></custom-button>`
        :                         // Genre Selected
        `<custom-button
          icon="${this._selectedGenreIcon}"
          text="${this._selectedGenre}"
          width="300px"
          height="34px"
          funcName="deselect-genre"
          class="default-selected"
        ></custom-button>`
        }  
      </div>  


      ${this._genresOpen ?
        `<div class="genre-list">
          ${Object.entries(gameService.getGenres()).map((k) => {
            return `
              <custom-button
                icon="${k[1]}"
                text="${k[0]}"
                width="100%"
                height="30px"
                funcName="select-genre"
                funcValue="${k[0]}"
                class="secondary"
              ></custom-button>
            `
          }).join("")}
        </div>` : ""
      }
    `;

    this.isOverflowing();
  }

  isOverflowing() {
    const paginator = this.shadowRoot.querySelector(".paginator")
    if (this._pages <= 1) {
      this.classList.remove("paginated")
      this._paginated = false;
      paginator.innerHTML = ``;
    } else {
      this.classList.add("paginated")
      this._paginated = true;
      paginator.innerHTML = `
        <custom-icon
          class="arrow"
          icon="/TP-Interfaces/TP2/assets/icons/common/ArrowLeft.svg"
          size="20px"
        ></custom-icon>
        <p>Page ${this._page} of ${this._pages}</p>
        <custom-icon
          class="arrow"
          icon="/TP-Interfaces/TP2/assets/icons/common/ArrowRight.svg"
          size="20px"
        ></custom-icon>`;

      const arrows = paginator.querySelectorAll(".arrow");
      arrows[0].addEventListener("click", () => {
        if (this._page > 1) {
          this._page--; 
          this.emit();
        }
      })
      arrows[1].addEventListener("click", () => {
        if (this._page < this._pages) {
          this._page++; 
          this.emit();
        }
      })
    } 
  }
}

FilterSelect.define("filter-select")