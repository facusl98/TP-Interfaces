export class BaseComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: "open"});
  }

  async _attachCSS(metaURL) {
   let css = await this.#getCSS(metaURL);
   this.shadowRoot.innerHTML = `
    ${css}
   `;
  }

  async #getCSS(path) {
    const cssPath = path.replace(".js", ".css");
    let css = await fetch(cssPath)
      .then(res => res.text())
    let style = `<style>${css}</style>`;
    return style;
  } 

  static define(tag){
    if (!customElements.get(tag)) 
      customElements.define(tag, this);
  }
}