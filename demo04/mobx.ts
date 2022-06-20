import EventEmitter from '../utils/event-emitter';

const em = new EventEmitter();
let currentFn;
let obId = 1;

export const autorun = (fn) => {
  // why use warpFn?
  // push the warpFn to props watchList
  const warpFn = () => {
    currentFn = warpFn;
    fn();
    currentFn = null;
  };
  warpFn();
};

// what does the map do?
const map = new WeakMap();

export const observable = (obj) => {
  return new Proxy(obj, {
    get: (target, propKey) => {
      console.log('%c [ propKey ]-24 ---------> ', 'font-size:13px; background:pink; color:#bf2c9f;', propKey)
      if (typeof target[propKey] === 'object') {
        return observable(target[propKey]);
      } else {
        if (currentFn) {
          console.log('target >> ', target)
          if (!map.get(target)) {
            map.set(target, {});
          }
          const mapObj = map.get(target);
          console.log('%c [ map ]-34', 'font-size:13px; background:pink; color:#bf2c9f;', map)
          console.log('%c [ mapObj ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', mapObj)
          const id = String(obId++);
          console.log('%c [ id ]-35', 'font-size:13px; background:pink; color:#bf2c9f;', id)
          mapObj[propKey] = id;
          console.log('%c [ mapObj ]-39', 'font-size:13px; background:pink; color:#bf2c9f;', mapObj)
          em.on(id, currentFn);
          console.log('%c [ currentFn ]-38', 'font-size:13px; background:pink; color:#bf2c9f;', currentFn)
        }
        return target[propKey];
      }
    },
    set: (target, propKey, value) => {
      console.log('%c [ set  propKey ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', propKey)
      console.log('%c [ set  target ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', target)
      if (target[propKey] !== value) {
        target[propKey] = value;
        const mapObj = map.get(target);
        if (mapObj && mapObj[propKey]) {
          em.emit(mapObj[propKey]);
        }
      }
      return true;
    },
  });
};
