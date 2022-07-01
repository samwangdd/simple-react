// publish & subscription
export default class EventEmitter {
  // 缓存事件及回调函数
  list = {};

  // 订阅事件
  on(eventName: string, callback: () => void) {
    let watches = this.list[eventName];
    if (!watches) {
      this.list[eventName] = [];
      watches = this.list[eventName];
    }
    if (!watches.includes(callback)) {
      watches.push(callback);
    }
  }

  // 发布事件
  emit(eventName: string, ...args) {
    const watches = this.list[eventName];
    if (watches && watches.length > 0) {
      watches.forEach((callback) => callback?.(...args));
    }
  }
}
