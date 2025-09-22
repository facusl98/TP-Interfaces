import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent { 
  constructor() {
    super();

    this._facebook = "../../../../assets/icons/socials/Facebook.svg";
    this._instagram = "../../../../assets/icons/socials/Instagram.svg";
    this._linkedin = "../../../../assets/icons/socials/Linkedin.svg";
    this._twitter = "../../../../assets/icons/socials/Twitter.svg";
    this._youtube = "../../../../assets/icons/socials/Youtube.svg";
    this._peg = "../../../../assets/images/PegSolitarie.svg";
  }

  connectedCallback() {
    this.render(); 
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `

        <div class = "column">
          <h2>About us</h2>

          <div class = "FollowUs">
            <h4>Follow us:</h4>

            <nav class = "navListSocials">
              <ul class = "listSocials">
                <li><a href="https://www.facebook.com/Exactas.UNICEN"><img src="${this._facebook}" alt="Facebook"></a></li>
                <li><a href="https://www.instagram.com/fcex_unicen/"><img src="${this._instagram}" alt="Instagram"></a></li>
                <li><a href="https://www.linkedin.com/in/cristian-garc%C3%ADa-bauza-0b643728/"><img src="${this._linkedin}" alt="Linkedin"></a></li>
                <li><a href="https://x.com/FCEx_UNICEN"><img src="${this._twitter}" alt="Twitter"></a></li>
                <li><a href="https://www.youtube.com/@ExactasUNCPBA"><img src="${this._youtube}" alt="Youtube"></a></li>
              </ul>
            </nav>
          </div>

          <div class="contact">
            <h4>Contact us:</h4>

            <a href="mailto:ejemplo@email.com" class="email-btn">
              <img src="../../../../assets/icons/common/gmail.svg" alt="Email icon">
              Email us
            </a>
           
            <div class="location">
              <a class ="link-location" href="https://exa.unicen.edu.ar/" target="_blank">
                <img src="../../../../assets/icons/common/ubication.svg" alt="Location icon">
                Facultad de Ciencias Exactas
              </a>
            </div>
          </div>


          <div class = "newsletter">
            <h2>Our Newsletter</h2>
            <input placeholder = "Your Email here...">
            <button class="subs-btn">Subscribe</button>
          </div>
        </div>

        <div class = "column">
          <div class = "quick-Access">
            <h2>Quick Access</h2>
            <ul class = "list-ul">
                <li>Browse</li>
                <li>About us</li>
                <li>Profile</li>
                <li>Favorites</li>
            </ul>
          </div>

          <div>
            <h2>Legal</h2>
            <p>Copyright © 2010-2025</p>
            <p>All rights reserved.</p>
            <a href="">Terms of use</a>
            <a href="">Privacy Policy</a>
          </div>
        </div>

        <div>
            <div>
              <h2>Popular Genres</h2>
              <div>
                <ul>
                  <li>Plataformers</li>
                  <li>Arcade</li>
                  <li>Boardgames</li>
                  <li>Puzzle</li>
                  <li>Fighting</li>
                </ul>
              </div>
            </div>

            <div class ="containerPeg">
              <h2>Game Of The Day</h2>
              <div class = "peg">
                <img src="${this._peg}">
                <p>Peg Solitaire</p>
              </div>
            </div>
        </div>  

    `;
  }
}

FooterComponent.define("footer-component");