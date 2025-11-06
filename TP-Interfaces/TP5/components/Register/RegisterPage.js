import {BaseComponent} from "../BaseComponent.js";

class RegisterPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../Common/CustomButton/CustomButton.js");
    await import("../Common/CustomInput/CustomInput.js");
    await import("../Common/ChangeableIcon/ChangeableIcon.js");

    this.render();


    this.addEventListener("register", () => {
      const inputs = this.shadowRoot.querySelectorAll("custom-input");
      let valid = true;
      inputs.forEach((input) => {
        input.handleRequireds();
        if (input.required)
          if (input.value == "")
            valid = false;
      })
      if (valid) {
        this.validRegister();
      } else {
        this.shadowRoot.querySelector(".error")?.classList.remove("hidden");
      }
    });

    this.addEventListener("register-with", () => {
      this.validRegister();
    })
  }

  validRegister() {
    const box = this.shadowRoot.querySelector(".register-container");
    box.classList.add("box-animation");

    setTimeout(() => {
      window.location.hash = "#login";
    }, 3000)
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

           <p class="error hidden">Some fields are missing or invalid</p>
          
          <custom-button
            text="Sign up"
            width="250px"
            height="50px"
            icon="/TP-Interfaces/TP5/assets/icons/common/SignUp.svg"
            iconSize="30px"
            class="default register"
            funcName="register"
          ></custom-button>

          <div class="signUp-with">
            <custom-button
              text="Sign up with Google"
              width="250px"
              height="50px"
              icon="/TP-Interfaces/TP5/assets/icons/socials/GoogleOriginal.svg"
              iconSize="30px"
              class="default"
              funcName="register-with"
            ></custom-button>

            <custom-button
              text="Sign up with Facebook"
              width="250px"
              height="50px"
              icon="/TP-Interfaces/TP5/assets/icons/socials/FacebookOriginal.svg"
              iconSize="30px"
              class="default"
              funcName="register-with"
            ></custom-button>
          </div>
        </form>
      </div>
    `;
  }
}

RegisterPage.define("register-page");