
import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
    this._game = null;
    this._games = {
      "peg-solitaire": {
        title: "Peg Solitaire",
        genres: ["Strategy", "Indie"],
        guide: "Command your knights in this strategic challenge! Select a knight and leap over another to defeat it, landing on the empty space beyond. Each defeated knight is removed from the battlefield. Keep striking until only one brave warrior remains standing in the center. Victory belongs to the last knight!",
        lore: "Peg Solitaire, reimagined here as a medieval clash, has its origins in 17th century France, where it was played in royal courts. Over time, the game spread through Europe, much like epic tales of knights and battles. Though the battlefield has changed, the goal remains timeless: reduce the army until one champion is left.",
        video: "/assets/images/VideoPegSolitaire.png",
        img1: "/assets/images/PegSolitaire.png",
        img2: "/assets/images/EjPegSolitaire.png",
        import: async () => await import("./PegSolitaireGame/PegSolitaireGame.js"),
        component: `<peg-solitaire-game id="game" class=""></peg-solitaire-game>`
      },
      "blocka": {
        title: "Blocka",
        genres: ["Puzzle", "Casual", "Indie"],
        guide: "To play, rotate the pieces to reassemble the original image. Use the left mouse button to rotate a piece to the left and the right button to rotate it to the right. If you find yourself stuck, you can use a hint, but be careful — doing so will add extra time to your timer. Each puzzle must be completed within ten minutes, or the game will end. You can also challenge yourself by increasing the grid size to raise the difficulty. As you progress, each level will become more complex. Good luck!",
        lore: "Years of travel led a renowned photographer to capture countless breathtaking landscapes. But after a strange storm struck during his latest journey, his photographs became mysteriously corrupted, their fragments scattered and their colors distorted. Now, it's up to you to restore his memories by piecing the damaged images back together, bringing his lost work to life once more.",
        video: "/assets/images/blocka/blocka-vid.png",
        img1: "/assets/images/blocka/blocka-1.png",
        img2: "/assets/images/blocka/blocka-2.png",
        import: async () => await import("./BlockaGame/BlockaGame.js"),
        component: `<blocka-game id="game" class="hidden"></blocka-game>`
      }
    };
  }

  async connectedCallback() {
    await import("../Common/CustomButton/CustomButton.js");
    await import("../Common/GameDotList/GameDotList.js");
    await import("./CommentSection/CommentSection.js");

    this._game = this._games[this.getAttribute("game") ?? "peg-solitaire"];
    this._game.import();

    await this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url); 
    this.shadowRoot.innerHTML += `
    <div class="game-cont">
      <div class="breadcrumb-container">
        <div class="image-bread-container">
          <a href="#/browse" class="breadcrumb">
            <custom-icon icon="/assets/icons/common/Home.svg" size = "15px"></custom-icon>
            Browse >> ${this._game.genres[0]} >> ${this._game.title}
          </a>
        </div>
      </div>
      <div class="game-area-container">
        ${this._game.component}
        <div class="game-area hidden" id="play">
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
        <h1 class="game-name">${this._game.title}</h1> 
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
            <p>${this._game.genres.map((genre) =>
              {return `${genre}`}
            ).join(", ")}</p>
        </div>
        <div class="explain-text">
            <h2>How to play</h2>
            <p>${this._game.guide}</p>
        </div>
        <div class="explain-text">
            <h2>A bit of lore</h2>
            <p>${this._game.lore}</p>
        </div>
        <div class="ad ad-2">
          <img class="ad-image" src="/assets/images/ad2.png" alt="Ad Image"></img>          
        </div>


        <comment-section></comment-section>
      </div>

      <div class="right-column">
        <div class="images-vids-container">
          <img src="${this._game.video}" alt="Game tutorial"></img>
          <img src="${this._game.img1}" alt="Game tutorial"></img>
          <img src="${this._game.img2}" alt="Game tutorial"></img> 
        </div>

        <game-dot-list
          title="Similar Games"
          genre="Puzzle"
          amount="3"
        ></game-dot-list>

      </div>
          
      </div>
    `;

    const play = this.shadowRoot.querySelector("#play");
    play.addEventListener("click", () => {
      play.remove();
      const game = this.shadowRoot.querySelector("#game");
      game.classList.remove("hidden") 
    })
  }

  static get observedAttributes() {
    return ["game"];
  }

}

GamePage.define("game-page");