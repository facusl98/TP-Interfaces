import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent { 
  constructor() {
    super();

    this._facebook = "/TP-Interfaces/TP2/assets/icons/socials/Facebook.svg";
    this._instagram = "/TP-Interfaces/TP2/assets/icons/socials/Instagram.svg";
    this._linkedin = "/TP-Interfaces/TP2/assets/icons/socials/Linkedin.svg";
    this._twitter = "/TP-Interfaces/TP2/assets/icons/socials/Twitter.svg";
    this._youtube = "/TP-Interfaces/TP2/assets/icons/socials/Youtube.svg";
    this._peg = "/TP-Interfaces/TP2/assets/images/PegSolitaire.png";
    this.mail = "/TP-Interfaces/TP2/assets/icons/common/Gmail.svg";

  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js"); 
    await import("../GameDotList/GameDotList.js");
    this.render(); 
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `

        <div class ="footer-containers-rows">
            <div class ="column-left">
                <h2>Follow Us</h2>

                <div class="list">
                    <a href="https://www.facebook.com/Exactas.UNICEN" target="_blank">
                    <custom-icon icon="${this._facebook}" size="20px"></custom-icon>
                    StimGames
                    </a>
                    <a href="https://www.instagram.com/fcex_unicen/" target="_blank">
                    <custom-icon icon="${this._instagram}" size="20px"></custom-icon>
                    @StimGames
                    </a>
                    <a href="https://x.com/FCEx_UNICEN" target="_blank">
                    <custom-icon icon="${this._twitter}" size="20px"></custom-icon>
                    @StimGames
                    </a>
                    <a href="https://www.linkedin.com/in/cristian-garc%C3%ADa-bauza-0b643728/" target="_blank">
                    <custom-icon icon="${this._linkedin}" size="20px"></custom-icon>
                    StimGames
                    </a>
                    <a href="https://www.youtube.com/@ExactasUNCPBA" target="_blank">
                    <custom-icon icon="${this._youtube}" size="20px"></custom-icon>
                    StimGames
                    </a>
                </div>
                <div>
                    <h2>Contact Us</h2>
                    <div>
                        <a href="https://groups.google.com/u/1/g/tudai-interfaces/c/UbVx44K8PA8>
                        <custom-icon icon="${this.mail}" size="20px"></custom-icon>
                        StimGames@gmail.com
                        </a>
                    </div>
                </div>
            </div>
            <div class ="column-center-left invisible">
                <h2>Quick Access</h2>
                <div class="list">
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/Home.svg" size="20px"></custom-icon>
                    Catalog
                    </a>
                    <a href="#/search">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/Search.svg" size="20px"></custom-icon>
                    About Us</a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/Profile.svg" size="20px"></custom-icon>
                    Profile</a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/FavoriteEmpty.svg" size="20px"></custom-icon>
                    Favorites</a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/Faq.svg" size="20px"></custom-icon>
                    FAQs</a>

                    <h2>Our Newsletter</h2>
                    <div class="subscribe">
                        <input type="mail" name="Newsletter"  placeholder="Your Email here...">
                        <custom-button
                            text="Subscribe"
                            width="100%"
                            height="34px"
                            class="default"
                        ></custom-button>
                    </div>
                </div>
            </div>
            <div class="column-center-right invisible">
                <h2>Popular Genres</h2>
                <div class="popular-genres list">
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/genres/Platformer.svg" size="20px"></custom-icon>
                    Platformers
                    </a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/genres/Arcade.svg" size="20px"></custom-icon>
                    Arcade
                    </a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/genres/Rpg.svg" size="20px"></custom-icon>
                    RPG
                    </a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/genres/Puzzle.svg" size="20px"></custom-icon>
                    Puzzle
                    </a>
                    <a href="#/browse">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/genres/Fighting.svg" size="20px"></custom-icon>
                    Fighting
                    </a>
                </div>
                <div class="popular-today">
                    <div class ="games-today">
                        <game-dot-list
                            title="Popular Games"
                            genre="action"
                            amount="3"
                        ></game-dot-list>
                    </div>
                </div>
            </div>
            <div class="column-right invisible">
                <h2 class="">Find Us</h2>
                <div class ="ubication">
                    <a href="https://www.google.com.ar/maps/place/Facultad+de+Ciencias+Exactas+Universidad+Nacional+del+Centro+de+la+Provincia+de+Buenos+Aires/@-37.3227478,-59.0848465,17z/data=!3m1!4b1!4m6!3m5!1s0x9590e0389448d6c1:0xeb198d152284b85d!8m2!3d-37.3227521!4d-59.0822716!16s%2Fg%2F11c0x8zspd?hl=es&entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D">
                    <custom-icon icon="/TP-Interfaces/TP2/assets/icons/common/Ubication.svg" size = "20px"></custom-icon>
                    Unicen exactas</a>
                    <img class="ubiImg" src="/TP-Interfaces/TP2/assets/images/Maps.png" alt="Gooogle Maps Location">
                </div>
                <h2>Legal</h2>

                <p>© 2010-2025 All rights reserved. </p>
                <a href="#/browse">Terms of use</a>
                <a href="#/browse">Privacy Policy</a>
            </div>
        </div>
        <div class="us">
                <div>
                    <h2>About Us</h2>
                    <p>StimGames is a web made from gamer to gamer. Play your favorite games anytime, anywhere, for free.</p>
                </div>
                <img src="/TP-Interfaces/TP2/assets/images/Logo.png" alt="Logo" class="invisible">
        </div>

    `;
  }
}

FooterComponent.define("footer-component");