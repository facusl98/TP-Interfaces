import { gameService } from "../../services/GameService.js";
import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
    this._games = [];
  }

  async connectedCallback() {

    await import("../Common/CustomButton/CustomButton.js");

    if (gameService.ready) this._games = gameService.getBy("", "Puzzle").slice(0, 3);

    gameService.addEventListener("change", () => {
      this._games = gameService.getBy("", "Puzzle").slice(0, 3);
      this._similarGames();
    });
    
    await this.render();
    this._similarGames();
  }

  async render() {
    await this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
      <div class="game-container">
        <div class="breadcrumb-container">
          <div class="image-bread-container">
            <a href="#browse" class="breadcrumb">
            <custom-icon icon="/assets/icons/common/Home.svg" size = "15px"></custom-icon>
            Home >> Tabletop >> Peg Soltaire
            </a>
          </div>
        </div>
        <div class="game-area-container">
          <div class="game-area">
            <button class="start-button"><img src="/assets/images/Joystick.png" alt= "Joystick"></img></button>
          </div>
        </div>
        <div class="game-bar">
          <h1 class="game-name">Peg Soltaire</h1> 
          <div class="game-bar-buttons">
           <custom-button
           icon="/assets/icons/common/Share.svg"
           width="65px"
           height="45px"
           class="default"
           >
           </custom-button>
           <custom-button
           icon="/assets/icons/common/FavoriteEmpty.svg"
           width="65px"
           height="45px"
           class="default"
           >
           </custom-button>
           <custom-button
           icon="/assets/icons/common/Maximize.svg"
           width="65px"
           height="45px"
           class="default"
           >
           </custom-button>
        </div>
      </div>
      <div class="ad-container">
        <img class="ad-image" src="/assets/images/ad.png" alt="Ad Image"></img>
      </div>
      <div class="game-content">
        <div class="left-column">

          <div class="genre-container">
              <h2>Genres: </h2>
              <p>Strategy, Indie</p>
          </div>
          <div class="how-to-play">
              <h2>How to play</h2>
              <p>Command your knights in this strategic challenge! Select a knight and leap over another to defeat it, landing on the empty space beyond. Each defeated knight is removed from the battlefield. Keep striking until only one brave warrior remains standing in the center. Victory belongs to the last knight!</p>
          </div>
          <div class="history">
              <h2>A bit of history</h2>
              <p>Peg Solitaire, reimagined here as a medieval clash, has its origins in 17th century France, where it was played in royal courts. Over time, the game spread through Europe, much like epic tales of knights and battles. Though the battlefield has changed, the goal remains timeless: reduce the army until one champion is left.</p>
          </div>
          <div class="ad-container-2">
            <img class="ad-image-2" src="/assets/images/ad2.png" alt="Ad Image"></img>          
          </div>

        </div>

        <div class="comments-section">

        </div>
        <div id="right-column" class="right-column">
          <div class="images-vids-container">
            <img src="/assets/images/VideoPegSolitaire.png" alt="Game tutorial"></img>
            <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img>
            <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img> 
          </div>
          <div id="similar-games"class="similar-games-container">
            <h2>Similar Games</h2>
            
            <div id="games">
            </div>
          </div>

        </div>
            
        </div>
      </div>
    `;
  }
  _similarGames() {
    const container = this.shadowRoot.getElementById("games");
    
    container.innerHTML = this._games.map((game) => {return`
      <div class ="game">
        <img src="${game.background_image}" alt ="${game.name}">
        <p>${game.name}</p>
      </div>
      `}).join("");

  }
}

GamePage.define("game-page");