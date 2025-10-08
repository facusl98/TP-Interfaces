import { BaseComponent } from "../../BaseComponent.js";
import { CommentClass } from  "./CommentClass.js";

class CommentSection extends BaseComponent {
  constructor() {
    super();
    
    this._comments = [
      new CommentClass("User-001", "Muito texto", 
        new Date(2024, 2, 10), [
        new CommentClass("User-002", "Muito texto", new Date(2025, 2, 10), [
          new CommentClass("User-003", "Muito textum", new Date(2025, 9, 3), []),
      ]),
      new CommentClass("User-003", "Muito texto", new Date(2024, 2, 10), []),
      ]),
      new CommentClass("User-002", "Muito texto", new Date(2025, 6, 12), []),
      new CommentClass("User-005", "Muito texto", new Date(2024, 3, 20), [
        new CommentClass("User-003", "Muito texto", new Date(2025, 1, 10), []),
        new CommentClass("User-004", "Muito texto", new Date(2025, 3, 10), []),
      ]),
    ]
  }

  async connectedCallback() {
    await import("../CommentItem/CommentItem.js");
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
      <div class="comments-cont">
      
      </div>
    `;

    const cont = this.shadowRoot.querySelector(".comments-cont");
    this._comments.map((c) => {
      const comment = document.createElement("comment-item");
      comment.setAttribute("user", c.user);
      comment.setAttribute("comment", c.comment);
      comment.time = c.time.getTime();
      comment.comments = c.responses; 
      cont.appendChild(comment);
    });
  }
}

CommentSection.define("comment-section")