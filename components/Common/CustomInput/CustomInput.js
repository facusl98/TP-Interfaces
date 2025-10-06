import { BaseComponent } from "../../BaseComponent.js";

class CustomInput extends BaseComponent {
  constructor() {
    super();

    this._value = "";
    this._label = "";
    this._name = "";
    this._type = "text"
    this._required = false;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
  }

  get required() {
    return this._required;
  }


  async connectedCallback() {
    this._label = this.getAttribute("label") || "Default";
    this._name = this.getAttribute("name") || "default";
    this._type = this.getAttribute("type") || "text";
    this._required = this.getAttribute("required") || false;

    await this.render();

    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("keyup", () => this.value = input.value);
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <label for="${this._name}">
        <p>${this._label} ${this._required ? 
        this.classList.contains("required") ? `<span>Required</span>` : `<span>*</span>` 
        : ""}</p>
        <input type="${this._type}" id="${this._name}"/>
      </label>
    `;

  }


  handleRequireds(){
    if (this._required) {
      this.classList.toggle("required", true);
      this.render();
    }
  }

  static get observedAttributes() {
    return ["label", "name", "type", "required"]
  }
}

CustomInput.define("custom-input")