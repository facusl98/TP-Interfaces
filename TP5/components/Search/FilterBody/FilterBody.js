import { BaseComponent } from "../../BaseComponent.js";

class FilterBody extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../../Browse/SectionTitle/SectionTitle.js");
    await import("../FilterSelect/FilterSelect.js");
    await import("../ResultsCont/ResultsCont.js")

    await this.render();

    const result = this.shadowRoot.querySelector("results-cont");
    this.addEventListener("filter-change", (e) => {
      result.games = e.detail.games;
      result.render();
    });
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <section-title
        icon="../../../assets/icons/common/Search.svg"
        text="Browse"
      ></section-title>
      <filter-select class="paginated"></filter-select>
      <results-cont></results-cont>
    `;
  }
}

FilterBody.define("filter-body")