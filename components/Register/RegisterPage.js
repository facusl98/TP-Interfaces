import {BaseComponent} from "../BaseComponent.js";

class RegisterPage extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class="register-container">
        <h2>New here? Sign up</h2>
        <form id="register-form" method="POST">
          <label for="input-email">Email</label>
          <input type="email" name="email" id="input-email" required>

          <label for="input-name">Full name</label>
          <input type="text" name="fullName" id="input-name" required>

          <label for="input-age">Age</label>
          <input type="number" name="age" id="input-age" required>

          <label for="input-username">Username</label>
          <input type="text" name="username" id="input-username">

          <label for="input-password">Password</label>
          <input type="password" name="password" id="input-password" required>

          <label for="input-repeatPass">Repeat password</label>
          <input type="password" name="repeat-password" id="input-repeatPass" required>

          <label for="bio">Bio</label>
          <textarea name="bio" id="bio"></textarea>

          <div class="reCaptcha">
              
          </div>

          <a href="#login">Already have an account? Sign in</a>

          <button type="submit" id="register-btn">
            <custom-icon icon="/assets/icons/common/SignUp.svg" size="30px"></custom-icon>
            Sign up
          </button>

          <button id="google-btn" type="button">
            <custom-icon icon="/assets/icons/socials/GoogleOriginal.svg" size="35px"></custom-icon>
            Sign up with Google
          </button>

          <button id="fcb-btn" type="button">
            <custom-icon icon="/assets/icons/socials/FacebookOriginal.svg" size="35px"></custom-icon>
            Sign up with Facebook
          </button>
        </form>
      </div>
    `;
  }
}

RegisterPage.define("register-page");