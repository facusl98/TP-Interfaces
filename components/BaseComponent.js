export class BaseComponent extends HTMLElement {
  static _cssCache = {};
  static i = 0;
  static j = 0;
  constructor() {
    super()
    this.attachShadow({mode: "open"});
  }

  async _attachCSS(metaURL) {
    if (BaseComponent._cssCache[metaURL] === undefined) {
      BaseComponent._cssCache[metaURL] = this.#getCSS(metaURL);
    }
    const css = await BaseComponent._cssCache[metaURL];
    this.shadowRoot.innerHTML = `
      ${css}
   `;
  }

  async #getCSS(path) {
    const cssPath = path.replace(".js", ".css");
    let css = await fetch(cssPath) .then(res => res.text())
    return `<style>${css}</style>`;
  } 

  static define(tag){
    if (!customElements.get(tag)) 
      customElements.define(tag, this);
  }
}