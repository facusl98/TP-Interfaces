import { BaseComponent } from "../../BaseComponent.js";

class CommentSection extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    await this._attachCSS(import.meta.url);
    this.shadowRoot.innerHTML += `
      <div class="comment-box">
        <h3>Share your thoughts</h3>
        <div class="write-box">
          <img src="/assets/images/UserIcon.png" alt="User Picture"/>
          <input type="text" class="comment-input" placeholder="Write your review here..."/>
        </div>
        <div class="btn-box">
          <custom-button
            width="100px"
            height="30px"
            class="secondary"
            text="Cancel"
          ></custom-button>
          <custom-button
            width="100px"
            height="30px"
            class="default"
            text="Comment"
          ></custom-button>
        </div>
      </div>
      <div class="comments-cont"></div>
    `;
  }
}

CommentSection.define("comment-section")