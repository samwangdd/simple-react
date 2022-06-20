import EventEmitter from '../utils/event-emitter';

const em = new EventEmitter();
let currentFn;
let obId = 1;

export const autorun = (fn) => {
  // why use warpFn?
  // push the warpFn to props watchList
  console.log('111', 111)
  const warpFn = () => {
    console.log('222', 222)
    currentFn = warpFn;
    fn();
    currentFn = null;
  };
  warpFn();
};

export const observable = (obj) => {
  // use Symbol as unique key, avoid enumerations
  const data = Symbol('data');
  // why set obj as value here?
  // To save the current value!
  obj[data] = JSON.parse(JSON.stringify(obj));

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      observable(obj[key]);
    } else {
      // generate unique channel ID for every key
      const id = String(obId++);
      // transverse the object props and bind the getter and setter
      Object.defineProperty(obj, key, {
        get: function () {
          // when here don't exist currentFn?
          if (currentFn) {
            console.log('currentFn', currentFn, 'id', id);
            em.on(id, currentFn);
          }
          // what`s the return? return current props
          // what's the point of this? this means current observable obj，every value was getter&setter props
          // And this[data] is current value, will be overwritten by next time
          return this[data][key];
        },
        set: function (value) {
          if (this[data][key] !== value) {
            this[data][key] = value;
            em.emit(id);
          }
        },
      });
    }
  });

  return obj;
};
