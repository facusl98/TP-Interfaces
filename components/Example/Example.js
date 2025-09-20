import {BaseComponent} from '../BaseComponent.js';

class Example extends BaseComponent{
  // constructor + super + getCSS are mandatory for any component. 
  // CSS file must have the exact same name as the component.
  constructor() {
    super();
    
    this.count = 0; // Assign instance variable
  }

  connectedCallback() { 
    // Executes on component creation
    this.render() // Draws component, see below

    this.addEventListener("click", () => this.increment())
    // Adds event to component.
    // Can use ".shadowRoot.querySelect("tag").addEventListener()" too.
  }

  disconnectedCallback() { 
    // Executes on component destruction
  }
  
  attributeChangedCallback(name, oldValue, newValue) { 
    // Triggers on attribute change.
    // name = name of attribute triggering this.
    // old/newValue = values before and after change.
  }

  static get observedAttributes() { return ["attr1", "attr2"]; } 
  // Params/Attributes the component can receive.

  async render() {
    // Standar function to draw component. Execute to refresh component and redraw.
    // Always execute on connectedCallback().
    // Add HTML to component through "shadowRoot.innerHTML +=" here.
    // await this._attachCSS is mandatory to link the stylesheet and reset component
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += ` 
      <h1>Clicks: ${this.count}</h1>
      <slot></slot>
      <div>
        <h3>${this.getAttribute("attr1")}</h3>
        <h3>${this.getAttribute("attr2")}</h3>
      </div> 
    `;

    // Slot gets replaced by any tag placed inside the component.
    // e.g:
    /* 
      <example-component>
        <p>Text</p>
      </example-component>
    */
    // <p> tag replaces <slot> inside the component.
  }

  increment() {
    // Example function for dispatching events.
    this.count++; // Increases internal variable
    this.render() // Refreshes component

    this.dispatchEvent(new CustomEvent("event-name", { // Creates event. 
      detail: {value: this.count}, // Value to pass to whoever listens
      bubbles: true, // Allows parent components to hear
      composed: true // Allows to bypass shadow DOM
    }))

    
    /*
      // Any component can use this to receive values.
      this.addEventListener("event-name", (value) => {
        Use value received.
      })
    */
  }
}

// Mandatory to define component. Use "[ClassName].define("[reference-tag]");"
// MUST include "-" somewhere.
Example.define("example-component");