
import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
    this._games = [];
  }

  async connectedCallback() {
    await import("../Common/CustomButton/CustomButton.js");
    await import("../Common/GameDotList/GameDotList.js");
    await import("./CommentSection/CommentSection.js");

    await this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
    <div class="game-cont">
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
          <custom-button
          icon="/assets/icons/common/Play.svg"
          width="120px"
          height="70px"
          class="default"
          iconSize="30px"
          >
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
    </div>

    <div class="ad ad-1">
      <img class="ad-image" src="/assets/images/ad.png" alt="Ad Image"></img>
    </div>

    <div class="game-content">
      <div class="left-column">

        <div class="genre-container">
            <h2>Genres: </h2>
            <p>Strategy, Indie</p>
        </div>
        <div class="explain-text">
            <h2>How to play</h2>
            <p>Command your knights in this strategic challenge! Select a knight and leap over another to defeat it, landing on the empty space beyond. Each defeated knight is removed from the battlefield. Keep striking until only one brave warrior remains standing in the center. Victory belongs to the last knight!</p>
        </div>
        <div class="explain-text">
            <h2>A bit of history</h2>
            <p>Peg Solitaire, reimagined here as a medieval clash, has its origins in 17th century France, where it was played in royal courts. Over time, the game spread through Europe, much like epic tales of knights and battles. Though the battlefield has changed, the goal remains timeless: reduce the army until one champion is left.</p>
        </div>
        <div class="ad ad-2">
          <img class="ad-image" src="/assets/images/ad2.png" alt="Ad Image"></img>          
        </div>


        <comment-section></comment-section>
      </div>

      <div class="right-column">
        <div class="images-vids-container">
          <img src="/assets/images/VideoPegSolitaire.png" alt="Game tutorial"></img>
          <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img>
          <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img> 
        </div>

        <game-dot-list
          title="Similar Games"
          genre="Puzzle"
          amount="3"
        ></game-dot-list>

      </div>
          
      </div>
    `;
  }


}

GamePage.define("game-page");