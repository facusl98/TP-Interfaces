import { BaseComponent } from "../../BaseComponent.js";

class HeroCard extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../../Common/GamePicture/GamePicture.js");

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
        <div class="cont">
          <game-picture
            src="/assets/images/PegSolitaire.svg"
            alt="Peg Solitaire"
            class="large"
          ></game-picture>

          <div class="info">

            <div class="title-and-pics">
                <h2>Peg Solitaire</h2>

                <div class="mini-pics-container">

                  <div class="hero-mini-pic">
                    <img src="/assets/images/PegSolitaire.svg" alt="Peg Solitaire">
                  </div>
                  
                  <div class="hero-mini-pic">
                      <img src="/assets/images/PegSolitaire2.svg" alt="Peg Solitaire">
                  </div>

                  <div class="hero-mini-pic">
                      <img src="/assets/images/PegSolitaire3.svg" alt="Peg Solitaire">
                  </div>

                  <div class="hero-mini-pic">
                      <img src="/assets/images/PegSolitaire4.svg" alt="Peg Solitaire4">
                  </div>

                </div>

            </div>
            <div>
              <p>
                Command your knights in this strategic challenge! Select a knight and leap over another to defeat it, landing on the empty space beyond. Keep striking until onlyone brave warrior remains standing in the center. Victory belongs to the last knight!
              </p>
            </div>
            <div class="genres">
              <h3>Genres: </h3>
              <span>Puzzle</span>,
              <span>Strategy</span>
            </div>
        </div>
    `;
  }
}

HeroCard.define("hero-card")