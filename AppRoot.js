import { BaseComponent } from "./components/BaseComponent.js";


class AppRoot extends BaseComponent {
  constructor() {
    super()
  }
  
  async connectedCallback() {
    await import('./components/Common/Header/HeaderComponent.js');
    await import('./components/Common/Footer/FooterComponent.js');
    await import('./components/Browse/BrowsePage.js')
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <header-component></header-component>
      <browse-page></browse-page>
      <footer-component></footer-component>
    `;
  }
}

AppRoot.define("app-root");