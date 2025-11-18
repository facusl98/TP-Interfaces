
class _Events {
  constructor(type) {
    this.type = type
    this.events = [];
  }

  push(event) {
    this.events.push(event);
  }
}

export const Hover = new _Events("Hover");

export const Click = new _Events("Click");