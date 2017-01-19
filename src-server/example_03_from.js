import Rx from'rxjs/Rx';
import {createSubscriber } from './lib/util';
import fs from 'fs';

// #1: read filename normal
// fs.readdir('./src-server', (err,items) => {
//   if (err) console.error(err);
//   else {
//     console.log(items);
//   }
// });

// # read file name RXJS
// const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
// console.log(typeof(readdir$));
//
// readdir$('./src-server')
// .mergeMap(files=> Rx.Observable.from(files))
// .map(file => `Manipulated ${file}`)
// .subscribe(createSubscriber('readdir'));

// #2 working with promise
function getItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello');
    },1000);
  });
}

// #promise
var xxx = getItem();
xxx.then( mes=> console.log(mes));

// #rxjs
Rx.Observable.fromPromise(getItem())
.subscribe(createSubscriber("promise"));
