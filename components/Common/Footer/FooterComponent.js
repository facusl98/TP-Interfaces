import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent { 
  constructor() {
    super();

    this._facebook = "/assets/icons/socials/Facebook.svg";
    this._instagram = "/assets/icons/socials/Instagram.svg";
    this._linkedin = "/assets/icons/socials/Linkedin.svg";
    this._twitter = "/assets/icons/socials/Twitter.svg";
    this._youtube = "/assets/icons/socials/Youtube.svg";
    this._peg = "/assets/images/PegSolitarie.svg";
    this.mail = "/assets/icons/common/Gmail.svg";

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
                        <custom-icon icon="/assets/icons/common/Home.svg" size="20px"></custom-icon>
                        Catalog
                        </a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Search.svg" size="20px"></custom-icon>
                        About Us</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Profile.svg" size="20px"></custom-icon>
                        Profile</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/FavoriteEmpty.svg" size="20px"></custom-icon>
                        Favorites</a>
                        <a href="#">
                        <custom-icon icon="/assets/icons/common/Faq.svg" size="20px"></custom-icon>
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
                    <custom-icon icon="/assets/icons/genres/Platformer.svg" size="20px"></custom-icon>
                    Platformers
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Arcade.svg" size="20px"></custom-icon>
                    Arcade
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Rpg.svg" size="20px"></custom-icon>
                    RPG
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Puzzle.svg" size="20px"></custom-icon>
                    Puzzle
                    </a>
                    <a href="#">
                    <custom-icon icon="/assets/icons/genres/Fighting.svg" size="20px"></custom-icon>
                    Fighting
                    </a>
                </div>
                <div class="popular-today">
                    <h2>Popular Today</h2>
                    <div class = "games-today">
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/PegSolitarie.svg" alt="Peg-Solitaire">
                            Peg Solitaire</a>
                        </div>
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/RedDeadRedemption.svg" alt="Red-Dead-Redemption-2">
                            Red Dead Redemption 2</a>
                        </div>
                        <div class ="game">
                            <a href = "#"><img src="/assets/images/TheWitcher.svg" alt="The-Witcher-3">
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
                        <custom-icon icon="/assets/icons/common/Ubication.svg" size = "20px"></custom-icon>
                        Unicen exactas</a>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.8511587915314!2d-59.0848913233606!3d-37.32235320611474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9590e0389a213c5d%3A0xcff9aea03c955932!2sUNICEN%20-%20Campus%20Universitario!5e0!3m2!1ses!2sar!4v1758691886482!5m2!1ses!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                <img src="/assets/images/Logo.svg" alt="Logo">
        </div>

    `;
  }
}

FooterComponent.define("footer-component");