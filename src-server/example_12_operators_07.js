import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// #1
// function arrayZip(array1, array2, selector) {
//   const count = Math.min(array1.length, array2.length);
//   const results = [];
//
//   for (let i = 0; i < count; i ++) {
//     const combined = selector( array1[i], array2[i]);
//     results.push(combined);
//   }
//   return results;
// }
//
// const array1 = [1,2,3,4,5,6,7];
// const array2 = [1,0,10,1,0,1,10,100,1000];
// const results = arrayZip(array1,array2, (left,right) => left*right);
// console.log(results);

//#2: it is wonderful for logger without adding stupid code
// Rx.Observable.range(1,10)
// .zip(Rx.Observable.interval(500), (left,right) => `item: ${left}, at${right*500}`)
// .subscribe(createSubscriber('zip'));

// // #3: emit only lastest value from target
// Rx.Observable.interval(1000)
// .withLatestFrom(Rx.Observable.interval(500))
// .subscribe(createSubscriber('withLastestFrom'));


// // #4: emit value every time value change by target
// Rx.Observable.interval(1000)
// .combineLatest(Rx.Observable.interval(500))
// .take(5)
// .subscribe(createSubscriber('combineLastest'));

// // # can combine with function
// Rx.Observable.interval(1000)
// .combineLatest(Rx.Observable.interval(500),(left,right) => left * right)
// .take(5)
// .subscribe(createSubscriber('combineLastest'));

// #use case: authorization
const currentUser$ = new Rx.BehaviorSubject({ isLoggedIn: false});

Rx.Observable.interval(1000) // may be a event in action
// .withLatestFrom(currentUser$) // only new state being reconized
.combineLatest(currentUser$) // only new state being reconized and state before that, we can pause that observable until user login
.filter(([i,user]) => user.isLoggedIn)
.take(5)
.subscribe(createSubscriber('withLatestFrom'));

setTimeout(() =>{
  currentUser$.next({isLoggedIn: true});
},3000);
