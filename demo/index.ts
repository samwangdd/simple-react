import EventEmitter from '../utils/event-emitter';

const em = new EventEmitter();

const store = { a: 1, b: 1 };

// autorun
const fn = () => console.log(store.a);

// observable
Object.defineProperty(store, 'a', {
  get: function() {
    em.on('store.a', fn);
    return 100
  },
  set: function() {
    em.emit('store.a');
  },
});

// collect dependencies
fn();

// set state
store.a = 2;
