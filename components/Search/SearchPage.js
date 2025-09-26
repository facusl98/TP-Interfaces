import {BaseComponent} from '../BaseComponent.js';

class SearchPage extends aseComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._attachCSS(import.meta.url);
        this.shadowRoot.innerHTML += `
            <h1>Search Page</h1>
        `;
    }
}
SearchPage.define("search-page");