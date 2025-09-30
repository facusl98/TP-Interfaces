import {BaseComponent} from "../BaseComponent.js";

class RegisterPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../Common/CustomInput/CustomInput.js");
    await import("../Common/ChangeableIcon/ChangeableIcon.js");
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcLg9grAAAAAGrCT2ySQmzEqaJwcJpD9lw0orx3"></script>

      <div class="register-container">

        <h2>New here? Sign up</h2>

        <form class ="register-form" "id="register-form" method="POST">

          <custom-input
            label="Email"
            name="email"
            type="email"
            required="true"
          ></custom-input>
          
          <custom-input
            label="Fullname"
            name="fullName"
            type="text"
            required="true"
          ></custom-input>
      
          <custom-input
            label="Age"
            name="age"
            type="number"
            required="true"
          ></custom-input>
          
          <custom-input 
            label="Username"
            name="username"
            type="text"
          ></custom-input>

          <custom-input 
            label="Password"
            name="password"
            type="password"
            required="true"
          ></custom-input>
  
          <custom-input
            label="Repeat password"
            name="repeat-password"
            type="password"
            required="true"
          ></custom-input>
          
          <div class="bio">
            <label for="bio">Your description</label>
            <textarea name="bio" id="bio"></textarea>
          </div>

          <a href="#login" class="login-link">Already have an account? Sign in</a>

          <button type="submit" id="register-btn"
            data-sitekey="6LcLg9grAAAAAGrCT2ySQmzEqaJwcJpD9lw0orx3"
            data-callback='onSubmit'
            data-action='submit'>
            <custom-icon icon="/assets/icons/common/SignUp.svg" size="30px"></custom-icon>
            Sign up
          </button>
          
          <div class="signUp-with">
            <button id="google-btn" type="button">
              <custom-icon icon="/assets/icons/socials/GoogleOriginal.svg" size="35px"></custom-icon>
              Sign up with Google
            </button>

            <button id="fcb-btn" type="button">
              <custom-icon icon="/assets/icons/socials/FacebookOriginal.svg" size="35px"></custom-icon>
              Sign up with Facebook
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

RegisterPage.define("register-page");