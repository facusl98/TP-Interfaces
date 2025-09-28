import {BaseComponent} from "../BaseComponent.js";

class LoginPage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `

      <div class="login-container">
        <h2>Welcome back</h2>
        <form method="POST" id="login-form">

          <label for="input-email">Email</label>
          <input type="email" name="email" id="input-email" required>

          <label for="input-password">Password</label>
          <input type="password" name="password" id="input-password" required>

          <div class="reCaptcha">

          </div>
          <a href="#register">First time here? Sign up</a>
          <button id="login-btn" type="submit">
            <custom-icon icon="/assets/icons/common/Signin.svg" size="30px"></custom-icon>
            Sign in
          </button>

          <button id="google-btn" type="button">
            <custom-icon icon="/assets/icons/socials/GoogleOriginal.svg" size="35px"></custom-icon>
            Sign in with Google
          </button>

          <button id="fcb-btn" type="button">
            <custom-icon icon="/assets/icons/socials/FacebookOriginal.svg" size="35px"></custom-icon>
            Sign in with Facebook
          </button>
        </form>
    </div>

    `;
}
}

LoginPage.define("login-page");