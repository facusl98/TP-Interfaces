import { BaseComponent } from "../../BaseComponent.js";
import { gameService } from "../../../services/GameService.js";

class FilterBody extends BaseComponent {
  constructor() {
    super();

    this._genresOpen = false;
    this._selectedGenre = null;
    this._selectedGenreIcon = "";
  }

  async connectedCallback() {
    await import("../SectionTitle/SectionTitle.js");
    await import("../../Common/CustomButton/CustomButton.js");
    this.render();

    this.addEventListener("toggle-genres", () => {
      this._genresOpen = !this._genresOpen;
      this.render();
    });

    this.addEventListener("select-genre", (e) => {
      this._selectedGenre = e.detail.value;
      this._selectedGenreIcon = e.detail.icon;
      this._genresOpen = false;
      this.render();
    })

    this.addEventListener("deselect-genre", () => {
      this._selectedGenre = null;
      this._selectedGenreIcon =  null;
      this._genresOpen = true;
      this.render();

    });
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <section-title
        icon="../../../assets/icons/common/Search.svg"
        text="Browse"
      ></section-title>
      <div class="filter-cont">
        <div class="filter-nav">
          <input 
            placeholder="Search by name..."
          />
          ${!this._selectedGenre ? 
          `<custom-button
            ${this._genresOpen ?
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
          :
          `<custom-button
            icon="${this._selectedGenreIcon}"
            text="${this._selectedGenre.charAt(0).toUpperCase() + this._selectedGenre.slice(1)}"
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
                  text="${k[0].charAt(0).toUpperCase() + k[0].slice(1)}"
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
      </div>
    `;
  }
}

FilterBody.define("filter-body")