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
    this._mobile = window.innerWidth < 600 ? true : false;
  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js");
    await import("../CustomButton/CustomButton.js");
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
          "/TP-Interfaces/TP4/assets/icons/common/Menu.svg" :
          "/TP-Interfaces/TP4/assets/icons/common/Close.svg"}" class="burger-btn"/>
          
          <a href="#/browse">
            <img class="logo" src="/TP-Interfaces/TP4/assets/images/Logo.png" alt="StimGames Logo">
          </a> 
          
          </div>
        <div class="search-container" id="search-container">
            <div class="search-input">
              <input class ="search-header" id="search-input" placeholder="Search game...">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Search.svg" size="20px" style="dark"></custom-icon>
            </div>
        </div>
        <img src="/TP-Interfaces/TP4/assets/images/UserIcon.png" class="menu-btn">
      </div>
      ${this._burger ? (() => {
        // Prepare genres HTML outside the template
        let html = `<div class="categories" id="categories">`;
        const genres = Object.keys(this._genres);
        const hiddenGenres = this._mobile ? genres.slice(6) : [];
        const visibleGenres = this._mobile ? genres.slice(0, 6) : genres;

        html += visibleGenres.map((genre) => `
          <a href="#search">
            <custom-button
              icon="/TP-Interfaces/TP4/assets/icons/genres/${genre}.svg"
              iconSize="20px"
              text="${genre}"
              width="${this._mobile ? "100%" : "140px"}"
              height="30px"
              class="secondary"
            ></custom-button>
          </a>
        `).join("");

        if (this._mobile && hiddenGenres.length > 0) {
          html += `
            <custom-button id="show-more-btn" class="show-more-btn"
                text = "Show more . . ."
                width="91%"
                height="30px"
                class="secondary"
            ></custom-button>
            
            <div id="hidden-genres" class="hidden-genres" style="display:none;">
              ${hiddenGenres.map((genre) => `
                <a href="#search">
                  <custom-button
                    icon="/TP-Interfaces/TP4/assets/icons/genres/${genre}.svg"
                    iconSize="20px"
                    text="${genre}"
                    width="100%"
                    height="30px"
                    class="secondary"
                  ></custom-button>
                </a>
              `).join("")}
              <custom-button id="show-less-btn" class="show-less-btn"
                text = "Show less . . ."
                width="91%"
                height="30px"
                class="secondary"
              ></custom-button>
            </div>
          `;
        }

        html += `</div>`;
        return html;
      })() : "" }
    `;
    this._setupEvents();
  }

  _setupSuggestion() {
    this._cont = this.shadowRoot.querySelector("#search-container");
    const rect = this._cont.getBoundingClientRect();
    this._suggestions.className = "suggestions";
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

    const menu = this.shadowRoot.querySelector(".menu-btn");
    menu.addEventListener("click", () => {
      this._toggleMenu();
    });

    const showMoreBtn = this.shadowRoot.querySelector("#show-more-btn");
    if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      const hidden = this.shadowRoot.querySelector("#hidden-genres");
      if (hidden.style.display === "none") {
        hidden.style.display = "flex";
        showMoreBtn.style.display = "none";
      }
    });
  }

  const showLessBtn = this.shadowRoot.querySelector("#show-less-btn");
  if (showLessBtn) {
    showLessBtn.addEventListener("click", () => {
      const hidden = this.shadowRoot.querySelector("#hidden-genres");
      if (hidden.style.display !== "none")
      {
        hidden.style.display = "none";
        showMoreBtn.style.display = "flex";
        showMoreBtn.textContent = "Show more . . .";
      }
       });
  }


    gameService.addEventListener("change", () => {
      this._genres = gameService.getGenres();
    })
  }

  _setupMenu() {
    this._menu.className = "menu";

    this._menu.innerHTML = `
      <div class="cont">
        <div class="user">
          <img src="/TP-Interfaces/TP4/assets/images/UserIcon.png" alt="User Icon" />
          <p>Random_User12</p>
        </div>
        <div class="links-cont">
          <div class="top">
            <a href="#/browse">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Home.svg" size="24px">
              </custom-icon>
              <span>Browse</span>
            </a>
            <a href="#/search">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Search.svg" size="24px">
              </custom-icon>
              <span>Search</span>
            </a>
            <a href="#profile">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Profile.svg" size="24px">
              </custom-icon>
              <span>Profile</span>
            </a>
            <a href="#favorites">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/FavoriteEmpty.svg" size="24px">
              </custom-icon>
              <span>Favorites</span>
            </a>
          </div>

          <div class="bottom">
            <a href="#/login">
              <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Logout.svg" size="24px">
              </custom-icon>
              <span>Logout</span>
            </a>
          </div>          
        </div>
      </div>
    `;

    this._menu.addEventListener("click", () => {
      setTimeout(() => {
        this._toggleMenu();
      }, 200)
    });
  }

  _toggleMenu() {
    const menu = document.body.querySelector(".menu");
    if (menu == null) {
      document.body.appendChild(this._menu);
    } else {
      document.body.querySelector(".menu")?.remove();
    }
  }

  _showSuggestions() {
    this._removeSuggestions();
    this._games = gameService.getBy(this._name).slice(0, 3);

    this._suggestions.innerHTML = this._games.map(game => `
      <a href="#/game/peg-solitaire/${game.id}"><div class="suggestion-item">${game.name}</div></a>
    `).join("") + `
    <div class="suggestion-item advanced">
    <a href="#/search">
    <custom-icon icon="/TP-Interfaces/TP4/assets/icons/common/Filter.svg" size="15px" style="dark"></custom-icon>
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