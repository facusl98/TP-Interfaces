import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent { 
  constructor() {
    super();

    this._facebook = "/assets/icons/socials/Facebook.png";
    this._instagram = "/assets/icons/socials/Instagram.png";
    this._linkedin = "/assets/icons/socials/Linkedin.png";
    this._twitter = "/assets/icons/socials/Twitter.png";
    this._youtube = "/assets/icons/socials/Youtube.png";
    this._peg = "/assets/images/PegSolitaire.png";
    this.mail = "/assets/icons/common/Gmail.png";

  }

  async connectedCallback() {
    await import("../CustomIcon/CustomIcon.js"); 
    this.render(); 
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `

        <div class ="footer-containers-rows">
            <div class = "column-left">
                <h2>Follow Us</h2>

                <div>
                    <a href="">
                    <custom-icon icon="${this._facebook}" size="20px"></custom-icon>
                    StimGames
                    </a>
                    <a href="">
                    <custom-icon icon="${this._instagram}" size="20px"></custom-icon>
                    @StimGames
                    </a>
                    <a href="">
                    <custom-icon icon="${this._twitter}" size="20px"></custom-icon>
                    @StimGames
                    </a>
                    <a href="">
                    <custom-icon icon="${this._linkedin}" size="20px"></custom-icon>
                    StimGames
                    </a>
                    <a href="">
                    <custom-icon icon="${this._youtube}" size="20px"></custom-icon>
                    StimGames
                    </a>
                </div>
                <div>
                    <h2>Contact Us</h2>
                    <div>
                        <a href="#">
                        <custom-icon icon="${this.mail}" size="20px"></custom-icon>
                        StimGames@gmail.com
                        </a>
                    </div>
                </div>
            </div>
            <div class ="column-center-left">
                <div>
                    <h2>Quick Access</h2>
                    <div>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Home.png" size="20px"></custom-icon>
                        Catalog
                        </a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Search.png" size="20px"></custom-icon>
                        About Us</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Profile.png" size="20px"></custom-icon>
                        Profile</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/FavoriteEmpty.png" size="20px"></custom-icon>
                        Favorites</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Faq.png" size="20px"></custom-icon>
                        FAQs</a>
                    </div>
                    <div>
                        <h2>Our Newsletter</h2>
                        <div>
                            <input type="mail" name="Newsletter"  placeholder="Your Email here...">
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column-center-right">
                <h2>Popular Genres</h2>
                <div class="popular-genres">
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Platformer.png" size="20px"></custom-icon>
                    Platformers
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Arcade.png" size="20px"></custom-icon>
                    Arcade
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Rpg.png" size="20px"></custom-icon>
                    RPG
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Puzzle.png" size="20px"></custom-icon>
                    Puzzle
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Fighting.png" size="20px"></custom-icon>
                    Fighting
                    </a>
                </div>
                <div class="popular-today">
                    <h2>Popular Today</h2>
                    <div class = "games-today">
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/PegSolitaire.png" alt="Peg-Solitaire">
                            Peg Solitaire</a>
                        </div>
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/RedDeadRedemption.png" alt="Red-Dead-Redemption-2">
                            Red Dead Redemption 2</a>
                        </div>
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/TheWitcher.png" alt="The-Witcher-3">
                            The Witcher 3: Wild Hunt</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "column-right">
                <div>
                    <h2>Find Us</h2>
                    <div>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Ubication.png" size = "20px"></custom-icon>
                        Unicen exactas</a>
                        <img src="/assets/images/Maps.png" alt="Gooogle Maps Location">
                    </div>
                </div>
                <div>
                    <h2>Legal</h2>

                    <p>© 2010-2025 All rights reserved. </p>
                    <a href="#">Terms of use</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </div>
        <div class="us">
                <div>
                    <h2>About Us</h2>
                    <p>StimGames is a web made from gamer to gamer. Play your favorite games anytime, anywhere, for free.</p>
                </div>
                <img src="/assets/images/Logo.png" alt="Logo">
        </div>

    `;
  }
}

FooterComponent.define("footer-component");