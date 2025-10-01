import { BaseComponent } from "../../BaseComponent";

 class GameDot extends BaseComponent {

    construct() {
        super();
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        await this._attachCSS(import.meta.url);
        this.shadowRoot.innerHTML += `
            <h1>Mini Game</h1>
        `;
    }
}
GameDot.define("game-dot");