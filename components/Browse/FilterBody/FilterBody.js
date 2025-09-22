import { BaseComponent } from "../../BaseComponent.js";

class FilterBody extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await import("../SectionTitle/SectionTitle.js");
    await import("../../Common/CustomButton/CustomButton.js");
    this.render();

    this.addEventListener("toggle-genres", () => {
      console.log("Custom Button Clicked on genre menu")
    })
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <section-title
        icon="../../../assets/icons/common/Search.svg"
        text="Browse"
      ></section-title>
      <div class="filter-cont">
        <div class="filter-nav">
          <input 
            placeholder="Search by name..."
          />
          <custom-button
            icon="../../../assets/icons/common/Menu.svg"
            text="Genres"
            width="300"
            height="34"
            funcName="toggle-genres"
            iconSize="15"
          ></custom-button>
        </div>  
      </div>
    `;
  }
}

FilterBody.define("filter-body")