import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class HeaderComponent extends BaseComponent {
  constructor() {
    super()
    this._games = [];
    this._genres = [];
    this._name = "";
    this._input = null;
    this._cont = null;
    this._suggestions = document.createElement("div");
    this._menu = document.createElement("div");
    this._burger = false;
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");
    await this.render();
    this._setupSuggestion();
    this._setupMenu();

    if (gameService.ready) this._genres = gameService.getGenres();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `

      <div class="header-rows">
        <div class="logo-container">
          <img src="${!this._burger ?
          "/assets/icons/common/Menu.svg" :
          "/assets/icons/common/Close.svg"}" class="burger-btn"/>
          <a href="#browse">
          <img src="/assets/images/Logo.png" alt= "Logo" class="logo"></img>
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
        <img src="/assets/images/UserIcon.png" class="menu-btn">
      </div>
      ${this._burger ? `
        <div class="categories" id="categories">
          ${Object.keys(this._genres).map((genre) => {
          return `
          <a href="#search">
            <custom-button
              icon="/assets/icons/genres/${genre}.svg"
              iconSize="20px"
              text="${genre}"
              width="140px"
              height="30px"
              class="secondary"
            ></custom-button>
          </a>`
        }).join("")}
        </div>` : "" }
    `;
    this._setupEvents();
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

    this.shadowRoot.querySelector(".burger-btn").addEventListener("click", () => {
      this._burger = !this._burger;
      this.render();
    })

    this._input.addEventListener("blur", () => {
      setTimeout(() => {
        this._removeSuggestions();
      }, 200)
    })

    gameService.addEventListener("change", () => {
      this._genres = gameService.getGenres();
    })
  }

  _setupMenu() {
    const menu = this.shadowRoot.querySelector(".menu-btn");
    this._menu.className = "menu";

    this._menu.innerHTML = `
      <div class="cont">
        <div class="user">
          <img src="/assets/images/UserIcon.png" alt="User Icon" />
          <p>Random_User12</p>
        </div>
        <div class="links-cont">
          <div class="top">
            <a href="#browse">
              <custom-icon icon="/assets/icons/common/Home.svg" size="24px">
              </custom-icon>
              <span>Browse</span>
            </a>
            <a href="#search">
              <custom-icon icon="/assets/icons/common/Search.svg" size="24px">
              </custom-icon>
              <span>Search</span>
            </a>
            <a href="#profile">
              <custom-icon icon="/assets/icons/common/Profile.svg" size="24px">
              </custom-icon>
              <span>Profile</span>
            </a>
            <a href="#favorites">
              <custom-icon icon="/assets/icons/common/FavoriteEmpty.svg" size="24px">
              </custom-icon>
              <span>Favorites</span>
            </a>
          </div>

          <div class="bottom">
            <a href="#login">
              <custom-icon icon="/assets/icons/common/Logout.svg" size="24px">
              </custom-icon>
              <span>Logout</span>
            </a>
          </div>          
        </div>
      </div>
    `;


    menu.addEventListener("click", () => {
      this._toggleMenu();
    });

    this._menu.addEventListener("click", () => {
      setTimeout(() => {
        this._toggleMenu();
      }, 200)
    });
  }

  _toggleMenu() {
    const menu = document.body.querySelector(".menu");
    if (menu == null) {
      document.body.style.overflow = 'hidden';
      document.body.appendChild(this._menu);
    } else {
      document.body.style.overflow = 'auto';
      document.body.querySelector(".menu")?.remove();
    }
  }

  _showSuggestions() {
    this._removeSuggestions();
    this._games = gameService.getBy(this._name).slice(0, 3);

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