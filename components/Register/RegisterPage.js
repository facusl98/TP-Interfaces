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
    <h1>Register Page</h1>
    `;
  }
}

RegisterPage.define("register-page");