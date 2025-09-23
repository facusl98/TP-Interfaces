import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class FilterSelect extends BaseComponent {
  constructor() {
    super();

    this._genresOpen = false;
    this._selectedGenre = "";
    this._inputText = "";
    this._selectedGenreIcon = "";
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

    await this.render();

    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("input", () => {
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
  }

  filter() {
    const games = gameService.getBy(this._inputText, this._selectedGenre);
    this.dispatchEvent(new CustomEvent("filter-change", {
      bubbles: true,
      composed: true,
      detail: {
        games: games,
      }
    }))
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class="filter-nav">
        <input 
          placeholder="Search by name..."
        />
        ${!this._selectedGenre ?  
        `<custom-button      
          ${this._genresOpen ?    // No Genre Selected
            `icon="../../../assets/icons/common/ArrowUp.svg"`
          :
            `icon="../../../assets/icons/common/Menu.svg"`
          }
          text="Genres"
          width="300px"
          height="34px"
          funcName="toggle-genres"
          iconSize="15px"
          style="default"
        ></custom-button>`
        :                         // Genre Selected
        `<custom-button
          icon="${this._selectedGenreIcon}"
          text="${this._selectedGenre}"
          width="300px"
          height="34px"
          funcName="deselect-genre"
          style="default-selected"
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
                style="secondary"
              ></custom-button>
            `
          }).join("")}
        </div>` : ""
      }
    `
  }

}

FilterSelect.define("filter-select")