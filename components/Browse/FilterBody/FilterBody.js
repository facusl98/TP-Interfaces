import { BaseComponent } from "../../BaseComponent.js";

class FilterBody extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../SectionTitle/SectionTitle.js");
    await import("../FilterSelect/FilterSelect.js");
    this.render();

    this.addEventListener("filter-change", (e) => {
      console.log(e.detail)
    })
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <section-title
        icon="../../../assets/icons/common/Search.png"
        text="Browse"
      ></section-title>
      <filter-select></filter-select>
    `;
  }
}

FilterBody.define("filter-body")