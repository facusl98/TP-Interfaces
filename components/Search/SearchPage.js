import { BaseComponent } from "../BaseComponent.js";

class SearchPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("./FilterBody/FilterBody.js");
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <filter-body></filter-body>
    `;
  }
}
SearchPage.define("search-page");
