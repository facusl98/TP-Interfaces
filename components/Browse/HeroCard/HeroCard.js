import { gameService } from "../../../services/GameService.js";
import { BaseComponent } from "../../BaseComponent.js";

class HeroCard extends BaseComponent {
  constructor() {
    super();

    this._games = [];
    this._activeIndex = 4;
  }

  async connectedCallback() {
    await import("../../Common/GamePicture/GamePicture.js");
    
    this._games = gameService.getRandom(7);

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
        <div class="cont">
         
        </div>

        <nav>
          <custom-icon
            src="/assets/icons/common/ArrowLeft.png"
          ></custom-icon>
          
          <custom-icon
            src="/assets/icons/common/ArrowRight.png"
          ></custom-icon>
        </nav>
    `;
  }
}

HeroCard.define("hero-card")