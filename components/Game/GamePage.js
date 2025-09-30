import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Eo")
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
      <div class="game-container">
        <div class="breadcrumb-container">
          <div class="image-bread-container">
            <img class="home-icon" src="/assets/icons/common/Home.svg" alt="Home Icon"></img>
            <h1 class="breadcrumb">Home>>Tabletop>>Peg Soltaire</h1>
          </div>
        </div>
        <div class="game-area-container">
          <div class="game-area">
            <button class="start-button"><img src="/assets/images/Joystick.png" alt= "Joystick"></img></button>
          </div>
        </div>
        <h1 class="game-name">Peg Soltaire</h1>

      </div>
    `;
  }
}

GamePage.define("game-page");