// publish & subscription
export default class EventEmitter {
  list = {};

  on(event, fn) {
    let watches = this.list[event];
    if (!watches) {
      this.list[event] = [];
      watches = this.list[event];
    }
    if (!watches.includes(fn)) {
      watches.push(fn);
    }
  }

  emit(event, ...args) {
    const watches = this.list[event];
    if (watches && watches.length > 0) {
      watches.forEach(fn => fn?.(...args));
    }
  }
}