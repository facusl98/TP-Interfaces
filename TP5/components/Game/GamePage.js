
import { BaseComponent } from "../BaseComponent.js";

class GamePage extends BaseComponent {
  constructor() {
    super();
    this._game = null;
    this._games = {
      "peg-solitaire": {
        title: "Peg Solitaire",
        genres: ["Strategy", "Indie"],
        guide: "Your goal is to leave only one piece on the board before time runs out. Select a drink theme to set the game's look and feel, then begin. Jump one piece over another into an empty space (horizontally or vertically) to remove the piece that was jumped. Each move must follow this rule. Plan carefully: when no more moves remain or five minutes have passed, the game ends. Precision, timing, and a bit of intuition are all you need to serve the perfect result.",
        lore: "Some say the best drinks aren't served, they're crafted through balance and patience. In a quiet corner café, hidden from the noise of the world, mixologists once practiced a ritual of focus: the art of finding harmony in simplicity. Each drink told a different story: coffee for warmth, green tea for clarity, blueberry juice for calm, wine for depth, and negroni for spirit. Inspired by that idea, this game invites you to rediscover the rhythm of thought and motion. Choose your flavor, let its colors set the mood, and see if you can distill chaos into a single, perfect drop.",
        video: "/TP-Interfaces/TP5/assets/images/VideoPegSolitaire.png",
        img1: "/TP-Interfaces/TP5/assets/images/peg_solitaire/solitaire-1.png",
        img2: "/TP-Interfaces/TP5/assets/images/peg_solitaire/solitaire-2.png",
        import: async () => await import("./PegSolitaireGame/PegSolitaireGame.js"),
        component: `<peg-solitaire-game id="game" class="hidden"></peg-solitaire-game>`
      },
      "blocka": {
        title: "Blocka",
        genres: ["Puzzle", "Casual", "Indie"],
        guide: "To play, rotate the pieces to reassemble the original image. Use the left mouse button to rotate a piece to the left and the right button to rotate it to the right. If you find yourself stuck, you can use a hint, but be careful — doing so will add extra time to your timer. Each puzzle must be completed within ten minutes, or the game will end. You can also challenge yourself by increasing the grid size to raise the difficulty. As you progress, each level will become more complex. Good luck!",
        lore: "Years of travel led a renowned photographer to capture countless breathtaking landscapes. But after a strange storm struck during his latest journey, his photographs became mysteriously corrupted, their fragments scattered and their colors distorted. Now, it's up to you to restore his memories by piecing the damaged images back together, bringing his lost work to life once more.",
        video: "/TP-Interfaces/TP5/assets/images/blocka/blocka-vid.png",
        img1: "/TP-Interfaces/TP5/assets/images/blocka/blocka-1.png",
        img2: "/TP-Interfaces/TP5/assets/images/blocka/blocka-2.png",
        import: async () => await import("./BlockaGame/BlockaGame.js"),
        component: `<blocka-game id="game" class="hidden"></blocka-game>`
      },
      "wisp-away": {
        title: "Wisp Away",
        genres: ["Arcade", "Indie"],
        guide: "You're a soul, but if you want to stay alive, you shall avoid the ancient pillars while advancing forward. Press space to gain vertical impulse and pass through the gaps while staying on screne, and collect power ups to help you flee the forest. If you run out of HP, you'll die and start over.",
        lore: "A lost soul, a will 'o' wisp, has long lost its way inside the enchanted forest. Before vanishing gracelessly, the poor spirit decided to leave the damned forest. Help this pitiful soul flee from this macabre place, avoiding the ruins of a long lost civilization.",
        video: "/TP-Interfaces/TP5/assets/images/flappy_bird/videoWisp.png",
        img1: "/TP-Interfaces/TP5/assets/images/flappy_bird/wisp1.png",
        img2: "/TP-Interfaces/TP5/assets/images/flappy_bird/wisp2.png",
        import: async () => await import("./FlappyBird/FlappyBirdGame.js"),
        component: `<flappy-bird-game id="game" class=""></flappy-bird-game>`
      },
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
            <custom-icon icon="/TP-Interfaces/TP5/assets/icons/common/Home.svg" size = "15px"></custom-icon>
            Browse >> ${this._game.genres[0]} >> ${this._game.title}
          </a>
        </div>
      </div>
      <div class="game-area-container">
        ${this._game.component}
        <div class="game-area hidden" id="play">
          <custom-button
          icon="/TP-Interfaces/TP5/assets/icons/common/Play.svg"
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
          icon="/TP-Interfaces/TP5/assets/icons/common/Share.svg"
          width="65px"
          height="45px"
          class="default"
          >
          </custom-button>
          <custom-button
          icon="/TP-Interfaces/TP5/assets/icons/common/FavoriteEmpty.svg"
          width="65px"
          height="45px"
          class="default"
          >
          </custom-button>
          <custom-button
          icon="/TP-Interfaces/TP5/assets/icons/common/Maximize.svg"
          width="65px"
          height="45px"
          class="default"
          >
          </custom-button>
        </div>
      </div>
    </div>

    <div class="ad ad-1">
      <img class="ad-image" src="/TP-Interfaces/TP5/assets/images/ad.png" alt="Ad Image"></img>
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
          <img class="ad-image" src="/TP-Interfaces/TP5/assets/images/ad2.png" alt="Ad Image"></img>          
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