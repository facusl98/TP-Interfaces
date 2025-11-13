
export class CommentClass {
  constructor(user, comment, time, responses) {
    this._user = user ?? "Random-User";
    this._comment = comment;
    this._time = time;
    this._responses = responses;
  }

  get user() {
    return this._user;
  }

  get comment() {
    return this._comment;
  }

  get time() {
    return this._time;
  }

  get responses() {
    return this._responses;
  }
}