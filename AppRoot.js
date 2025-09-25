import { BaseComponent } from "./components/BaseComponent.js";


class AppRoot extends BaseComponent {
  constructor() {
    super()

    this._page = "";
    this._pageComponent = null;

    window.addEventListener("hashchange", async () => {
      this.readRoute();
      await this.importPageComponent();

      this.render();
    });
  }
  
  readRoute() {
    const hash = window.location.hash.slice(1).toLowerCase();
    this._page = hash || "browse";
  }

  async importPageComponent() {
    switch (this._page) {
      case "browse": 
        await import('./components/Browse/BrowsePage.js');
        this._pageComponent = '<browse-page></browse-page>';
        break;
      case "game":
        await import('./components/Game/GamePage.js');
        this._pageComponent = '<game-page></game-page>';
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