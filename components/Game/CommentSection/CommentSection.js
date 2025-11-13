import { BaseComponent } from "../../BaseComponent.js";
import { CommentClass } from  "./CommentClass.js";

class CommentSection extends BaseComponent {
  constructor() {
    super();
    
    this._comments = [
      new CommentClass("JohnSmith", "Blocka is addictive and really fun; its simple yet challenging mechanics keep you playing for hours.", 
        new Date(2024, 2, 10), [
        new CommentClass("EmilyJones07", "I totally agree! The gameplay is super addictive — I keep saying 'just one more round' and end up playing for an hour.", new Date(2025, 2, 10), [
          new CommentClass("JohnSmith", "Yes!", new Date(2025, 9, 3), []),
      ]),
      ]),
      new CommentClass("EmilyJones07", "The colors and animations are pleasant, and the minimalist design makes it easy to focus on the gameplay.", new Date(2025, 6, 12), []),
      new CommentClass("Wiresplash12", "It could use more levels or game modes, since it can feel a bit repetitive after a while.", new Date(2024, 3, 20), [
        new CommentClass("DavidWilson1992", "I wish they added a multiplayer mode though, that would make it even more fun!", new Date(2025, 1, 10), []),
        new CommentClass("SarahMiller", "Same here — it's a bit repetitive, but still satisfying. It's the perfect quick game to play during breaks.", new Date(2025, 3, 10), []),
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
          <img src="/TP-Interfaces/TP5/assets/images/UserIcon.png" alt="User Picture"/>
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