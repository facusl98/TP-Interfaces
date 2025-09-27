import { BaseComponent } from "./components/BaseComponent.js";


class AppRoot extends BaseComponent {
  constructor() {
    super()

    this._route = [];
    this._pageComponent = null;

    window.addEventListener("hashchange", async () => {
      this.readRoute();
      await this.importPageComponent();

      this.render();
    });
  }
  
  readRoute() {
    const hash = window.location.hash.slice(1).toLowerCase();
    this._route = hash.split("/");
  }

  async importPageComponent() {
    switch (this._route[0]) {
      case "game":
        await import('./components/Game/GamePage.js');
        this._pageComponent = '<game-page></game-page>';
        break;
      case "login":
        await import('./components/Login/LoginPage.js');
        this._pageComponent = '<login-page></login-page>';
        break;
      case "register":
        await import('./components/Register/RegisterPage.js');
        this._pageComponent = '<register-page></register-page>';
        break;
      case "search":
        await import('./components/Search/SearchPage.js');
        this._pageComponent = '<search-page></search-page>';
        break;
      default:
        await import('./components/Browse/BrowsePage.js');
        this._pageComponent = '<browse-page></browse-page>';
        break;
    }
  }
  
  async connectedCallback() {
    await import('./components/Common/Header/HeaderComponent.js');
    await import('./components/Common/Footer/FooterComponent.js');
    
    this.readRoute();
    await this.importPageComponent();

    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <header-component></header-component>
      ${this._pageComponent}
      <footer-component></footer-component>
    `;
  }
}

AppRoot.define("app-root");