import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class HeaderComponent extends BaseComponent {
  constructor() {
    super()
    this._games = [];
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");
    await this.render();
    this._setupEvents();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class = "logo-container">
        <a href="#browse">
        <img src="/assets/images/Logo.png" alt= "Logo"></img>
        </a>
      </div>
      <div class="search-container">
        <input class ="search-header" id="search-input">
        <custom-icon icon="/assets/icons/common/Search.svg" size="20px"></custom-icon>
        <div id="suggestions" class="suggestions" style="display: none;"></div>
      </div>
      <div>
        <button class="user-btn"><img src="/assets/icons/common/Menu.svg"></img></button>
      </div>

    `;
  }

  _setupEvents() {
    const input = this.shadowRoot.querySelector("#search-input");
    const suggestions = this.shadowRoot.querySelector("#suggestions");

    input.addEventListener("keyup", () => {

      if(input.value !== "") {
        this._showSuggestions(input.value);
      } else {
        suggestions.style.display = "none";
      }
    });

    input.addEventListener("blur", () => {
      suggestions.style.display = "none";
    })

    
  }

  _showSuggestions(query) {
    const suggestions = this.shadowRoot.querySelector("#suggestions");

    this._games = gameService.getBy(query, "").slice(0, 3);

    suggestions.innerHTML = this._games.map(game => `
      <a href="#game/${game.id}"><div class="suggestion-item">${game.name}</div></a>
    `).join("") + `
    <div class= "suggestion-item advanced">
    <a href="#search"><custom-icon icon="/assets/icons/common/Filter.svg" size="15px"></custom-icon>
    Advanced Search</a>

    </div>
    `;
    suggestions.style.display = "block";
  }
}

HeaderComponent.define("header-component");