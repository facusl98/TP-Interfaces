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
        <div class="game-bar">
          <h1 class="game-name">Peg Soltaire</h1> 
          <div class="game-bar-buttons">
            <button class="share-button"><img src="/assets/icons/common/Share.svg" alt="Share Button"></img></button>
            <button class="like-button"><img src="/assets/icons/common/FavoriteEmpty.svg" alt="Like Button"></img></button>
            <button class="fullscreen-button"><img src="/assets/icons/common/Maximize.svg" alt="Fullscreen Button"></img></button>
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
        <div class="right-column">
          <div class="images-vids-container">
            <img src="/assets/images/VideoPegSolitaire.png" alt="Game tutorial"></img>
            <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img>
            <img src="/assets/images/EjPegSolitaire.png" alt="Game tutorial"></img> 
          </div>
          <div class="similar-games-container">
            <h2>Similar Games</h2>
            <div class="similar-games">
              <img src="/assets/images/SimilarGame1.png" alt="Similar Game 1"></img>
              <p>Mahjong</p>
            </div>
            <div class="similar-games">
              <img src="/assets/images/SimilarGame2.png" alt="Similar Game 1"></img>
              <p>Mahjong</p>
            </div>
            <div class="similar-games">
              <img src="/assets/images/SimilarGame3.png" alt="Similar Game 1"></img>
              <p>Mahjong</p>
            </div>

          </div>
            
        </div>
      </div>
    `;
  }
}

GamePage.define("game-page");