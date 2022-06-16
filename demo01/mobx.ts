import EventEmitter from '../utils/event-emitter';

const em = new EventEmitter();
let currentFn;
let obId = 1;

export const autorun = (fn) => {
  console.log(666);
  currentFn = fn;
  fn();
  console.log(777);
  currentFn = null; // why reassigned the value?
};

export const observable = (obj) => {
  // use Symbol as unique key, avoid enumerations
  const data = Symbol('data');
  // why set obj as value here?
  // Because to save current value
  obj[data] = JSON.parse(JSON.stringify(obj));

  Object.keys(obj).forEach(key => {
    // generate unique channel ID for every key
    const id = String(obId++);
    Object.defineProperty(obj, key, {
      get: function() {
        // when here don't exist currentFn?
        if (currentFn) {
          console.log('currentFn', currentFn, 'id', id);
          em.on(id, currentFn);
        }
        console.log('get', this[data], '&&', this);
        // what`s the return? return current props
        // what's the point of this? this means current observable obj，every value was getter&setter props
        // And this[data] is current value, will be overwritten by next time
        return this[data][key];
      },
      set: function(value) {
        console.log('set', this[data], '&&', this);
        if (this[data][key] !== value) {
          this[data][key] = value;
          em.emit(id);
        }
      },
    });
  });

  return obj;
};