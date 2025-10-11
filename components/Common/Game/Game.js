import {BaseComponent} from '../../BaseComponent';

class Game extends BaseComponent {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        await this._attachCSS(import.meta.url);
        this.shadowRoot.innerHTML = `
            <h1>Game component</h1>
        `;
    }
}
Game.define('game');