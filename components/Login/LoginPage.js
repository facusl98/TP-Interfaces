import {BaseComponent} from "../BaseComponent.js";

class LoginPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../Common/CustomButton/CustomButton.js");
    await import("../Common/CustomInput/CustomInput.js");


    this.addEventListener("login", () => {
      window.location.hash = "#browse"
    });

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
  
        <custom-button
          text="Sign in"
          width="250px"
          height="50px"
          icon="/assets/icons/common/SignIn.svg"
          iconSize="30px"
          class="default"
          funcName="login"
        ></custom-button>

        <div class="signIn-with">
          <custom-button
            text="Sign in with Google"
            width="250px"
            height="50px"
            icon="/assets/icons/socials/GoogleOriginal.svg"
            iconSize="30px"
            class="default"
            funcName="login"
          ></custom-button>

          <custom-button
            text="Sign in with Facebook"
            width="250px"
            height="50px"
            icon="/assets/icons/socials/FacebookOriginal.svg"
            iconSize="30px"
            class="default"
            funcName="login"
          ></custom-button>
        </div>
      </form>
    `;
}
}

LoginPage.define("login-page");