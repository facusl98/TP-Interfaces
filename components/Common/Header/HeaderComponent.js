import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class HeaderComponent extends BaseComponent {
  constructor() {
    super()
    this._games = [];
    this._name = "";
    this._input = null;
    this._cont = null;
    this._suggestions = document.createElement("div");
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");
    await this.render();
    this._setupEvents();
    this._setupSuggestion();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class = "logo-container">
        <a href="#browse">
        <img src="/assets/images/Logo.png" alt= "Logo"></img>
        </a>
      </div>
      <div class="search-container" id="search-container">
        <div class="search-input">
          <input class ="search-header" id="search-input" placeholder="Search game...">
          <custom-icon icon="/assets/icons/common/Search.svg" size="20px" style="dark"></custom-icon>
        </div>
        <div id="suggestions" class="suggestions" style="display: none;">
        
        </div>
      </div>
      <div class="menu-container">
        <button class="user-btn"><img src="/assets/icons/common/Menu.svg"></img></button>
      </div>

    `;

  }


  _setupSuggestion() {
    this._cont = this.shadowRoot.querySelector("#search-container");
    const rect = this._cont.getBoundingClientRect();
    this._suggestions.className = "suggestions"
    this._suggestions.style.top = rect.bottom + "px";
    this._suggestions.style.left = rect.left + "px";
  }

  _setupEvents() {
    this._input = this.shadowRoot.querySelector("#search-input");
    this._input.addEventListener("keyup", () => {
      this._name = this._input.value;
      if (this._input.value == "") 
        this._removeSuggestions();
      else
        this._showSuggestions()
    });

    this._input.addEventListener("blur", () => {
      setTimeout(() => {
        this._removeSuggestions();
      }, 200)
      
    })
  }

  _showSuggestions() {
    this._removeSuggestions();
    this._games = gameService.getBy(this._name).slice(0, 3)

    this._suggestions.innerHTML = this._games.map(game => `
      <a href="#game/${game.id}"><div class="suggestion-item">${game.name}</div></a>
    `).join("") + `
    <div class="suggestion-item advanced">
    <a href="#search">
    <custom-icon icon="/assets/icons/common/Filter.svg" size="15px" style="dark"></custom-icon>
    Advanced Search</a>
    </div>
    `;

    document.body.appendChild(this._suggestions);

    const rect = this._cont.getBoundingClientRect();
    this._suggestions.style.left = rect.left + "px";
    this._suggestions.style.top = rect.bottom + "px";
  }

  _removeSuggestions() {
    document.body.querySelector(".suggestions")?.remove();
  }
}

HeaderComponent.define("header-component");