import {BaseComponent} from "../BaseComponent.js";

class LoginPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../Common/CustomButton/CustomButton.js");
    await import("../Common/CustomInput/CustomInput.js");


    this.addEventListener("login", () => {
      const inputs = this.shadowRoot.querySelectorAll("custom-input");
      let valid = true;
      inputs.forEach((input) => {
        input.handleRequireds();

        if (input.required)
          if (input.value == "")
            valid = false;
      })
      if (valid) {
        this.validLogin();
      } else {
        this.shadowRoot.querySelector(".error")?.classList.remove("hidden")
      }
    });

    this.addEventListener("login-with", () => {
      this.validLogin();
    })

    this.render();
  }

  validLogin() {
    const box = this.shadowRoot.querySelector(".login-container");
    box.classList.add("box-animation");

    setTimeout(() => {
      window.location.hash = "#browse";
    }, 3000)
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
  
        <p class="error hidden">Some fields are missing or invalid</p>

        <custom-button
          text="Sign in"
          width="250px"
          height="50px"
          icon="/TP-Interfaces/TP2/assets/icons/common/SignIn.svg"
          iconSize="30px"
          class="default login"
          funcName="login"
        ></custom-button>

        <div class="signIn-with">
          <custom-button
            text="Sign in with Google"
            width="250px"
            height="50px"
            icon="/TP-Interfaces/TP2/assets/icons/socials/GoogleOriginal.svg"
            iconSize="30px"
            class="default"
            funcName="login-with"
          ></custom-button>

          <custom-button
            text="Sign in with Facebook"
            width="250px"
            height="50px"
            icon="/TP-Interfaces/TP2/assets/icons/socials/FacebookOriginal.svg"
            iconSize="30px"
            class="default"
            funcName="login-with"
          ></custom-button>
        </div>
      </form>
    `;
}
}

LoginPage.define("login-page");