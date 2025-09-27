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
      <h1>Login Page</h1>
    `;
}
}

LoginPage.define("login-page");