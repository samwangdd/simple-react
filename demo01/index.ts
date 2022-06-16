import { observable, autorun } from './mobx';

const store = observable({ a: 1, b: 2 });

autorun(() => console.log(store.a, '----->'));
// autorun(() => console.log(store.b, '----->'));
store.a = 5;
store.a = 6;
// store.b = 3;