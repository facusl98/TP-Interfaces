import { BaseComponent } from "../../BaseComponent.js";

class CommentItem extends BaseComponent {
  constructor() {
    super();

    this._user = "";
    this._comment = "";
    this._time = null;
    this._comments = [];
    this._container = document.createElement("div");
    this._container.className = "comment-container"
    this._open = false;

    this._timeUnits = [
      " seconds ago",
      " minutes ago",
      " hours ago",
      " days ago",
      " months ago",
      " years ago"
    ]
  }

  set comments(comms) {
    this._comments = comms;
    this.render();
  }

  set time(time) {
    this._time = time;
    this.render();
  }

  async connectedCallback() {
    await import("../../Common/CustomIcon/CustomIcon.js")
    this._user = this.getAttribute("user") ?? "Random-User";
    this._comment = this.getAttribute("comment") ?? "Comment-Or-Something";

    await this.render();
  }

  async render() {
    this.shadowRoot.innerHTML = "";
    await this._attachCSS(import.meta.url);
    let count = 0;
    let ago = Math.floor((Date.now() - this._time) / 1000); // Seconds
    const divisors = [60, 60, 24, 30, 12]; // Min, horas, días, meses, años

    for (let d of divisors) {
      if (ago > d) {
        ago = Math.floor(ago / d);
        count++;
      } else break;
    }


    this._container.innerHTML = `
    <div class="user">
      <span class="user-name"><img src="/TP-Interfaces/TP3/assets/images/UserIcon.png" alt="User Pic" /> ${this._user}</span> 
      <span class="time">${ago} ${this._timeUnits[count]}</span>
    </div>
    <p class="comment">${this._comment}</p>

    ${this._comments.length > 0 ? `
      <p class="toggle-responses">
        ${this._open ? `
          <custom-icon
            icon="/TP-Interfaces/TP3/assets/icons/common/ArrowUp.svg"
            size="20px"
          ></custom-icon>
          <span>Hide Responses</span>
        ` : `
          <custom-icon
            icon="/TP-Interfaces/TP3/assets/icons/common/ArrowDown.svg"
            size="20px"
          ></custom-icon>
          <span>See Responses</span>
        `}
      </p>` : ""} 

    <div class="responses"></div>
    `;

    if (this._open) {
      const responses = this._container.querySelector(".responses");
      this._comments.map((c) => {
      const comment = document.createElement("comment-item");
      comment.setAttribute("user", c.user);
      comment.setAttribute("comment", c.comment);
      comment.time = c.time.getTime();
      comment.comments = c.responses; 
      responses.appendChild(comment);
    })
    }

    const toggleOpen = this._container.querySelector(".toggle-responses");
    toggleOpen?.addEventListener("click", () => {
      this._open = !this._open;
      this.render();
    })

    this.shadowRoot.appendChild(this._container)
  }


  static get observedAttributes() {
    return ["user", "comment"];
  }
}

CommentItem.define("comment-item")