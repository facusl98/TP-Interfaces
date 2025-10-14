import { BaseComponent } from "../../BaseComponent.js";

 class GameDot extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        await this._attachCSS(import.meta.url);
        this.shadowRoot.innerHTML += `
            <img src="${this.getAttribute("image")}" alt="${this.getAttribute("name")}"/>
            <a href="#/game/peg-solitaire">${this.getAttribute("name")}</a>
        `;
    }

    static get observedAttributes() {
        return ["image", "name"]
    }
}
GameDot.define("game-dot");