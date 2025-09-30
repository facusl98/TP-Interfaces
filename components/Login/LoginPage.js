import {BaseComponent} from "../BaseComponent.js";

class LoginPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../Common/CustomInput/CustomInput.js");

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);

    this.shadowRoot.innerHTML += `
      <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcLg9grAAAAAGrCT2ySQmzEqaJwcJpD9lw0orx3"></script>

      <div class="login-container">
      <h2>Welcome back</h2>
      <form method="POST" id="login-form">

        <custom-input
          label="Email"
          name="email"
          type="email"
          required="true"
        ></custom-input>

        <custom-input
          label="Password"
          name="password"
          type="password"
          required="true"
        ></custom-input>

        <a href="#register" class="register-link">First time here? Sign up</a>
  
        <button id="login-btn class="login-btn" 
          data-sitekey="6LcLg9grAAAAAGrCT2ySQmzEqaJwcJpD9lw0orx3"
          data-callback='onSubmit'
          data-action='submit'>
          <custom-icon icon="/assets/icons/common/Signin.svg" size="30px"></custom-icon>
          Sign in
        </button>

        <div class="signIn-with">
        <button id="google-btn" type="button">
          <custom-icon icon="/assets/icons/socials/GoogleOriginal.svg" size="35px"></custom-icon>
          Sign in with Google
        </button>

        <button id="fcb-btn" type="button">
          <custom-icon icon="/assets/icons/socials/FacebookOriginal.svg" size="35px"></custom-icon>
          Sign in with Facebook
        </button>
        </div>
      </form>
    `;
}
}

LoginPage.define("login-page");