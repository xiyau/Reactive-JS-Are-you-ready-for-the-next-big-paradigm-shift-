'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #1: subject can observe (subscribe) and observer (manipulate like: next, complete...)
// const simple$ = new Rx.Subject();
//
// simple$.subscribe(createSubscriber('simple$'));
//
// simple$.next('hello');
// simple$.next('world');
// simple$.complete();

//
// // #2: subject acting like proxy, and many people can enjoy to observe that subject
// const interval$ = new Rx.Observable.interval(1000).take(5);
// // interval subject acting like proxy
// const intervalSubject$ = new Rx.Subject();
// interval$.subscribe(intervalSubject$);
// intervalSubject$.subscribe(createSubscriber('gao ranger 1 engaging match')); //spectator 1
// intervalSubject$.subscribe(createSubscriber('gao ranger 2 engaging match')); //spectator 2
// intervalSubject$.subscribe(createSubscriber('gao ranger 3 engaging match')); //spectator 3
//
// setTimeout(() => {
//   intervalSubject$.subscribe(createSubscriber('gao DRAGON engaging match ')); // spectator 4
// },2000);

// // #2: first problem, subject have no init state, only subscribe from first time watchinng. and spectator 2 have no init state only can listen after have new event
//
// const currentUser$ = new Rx.Subject();
// const isLoggedIn$ = currentUser$.map(u => u.isloggedIn);
//
// isLoggedIn$.subscribe(createSubscriber('isLoggIn')); // spectator 1
//
// currentUser$.next({isloggedIn: false}); //event
//
// setTimeout(() => {
//   currentUser$.next({isloggedIn: true, name: "nelson mandela"});
// },2000); // event
//
// setTimeout(() => {
//   isLoggedIn$.subscribe(createSubscriber('delayed')); // spectator 2
// },1000); // this data come later than nelson mandela because it not listening before, it can not continue the previous value

//
// // resolve problem: give subject a init state with BehaviorSubject
// it begins by emitting the item most recently emitted by the source Observable
// const currentUser$ = new Rx.BehaviorSubject({isloggedIn: null}); // have init state is false
// const isLoggedIn$ = currentUser$.map(u => u.isloggedIn);
//
// isLoggedIn$.subscribe(createSubscriber('isLoggIn')); // spectator 1
//
// currentUser$.next({isloggedIn: false}); // event
//
// setTimeout(() => {
//   currentUser$.next({isloggedIn: true, name: "nelson mandela"});  // true
// },2000);
//
// setTimeout(() => {
//   isLoggedIn$.subscribe(createSubscriber('delayed')); // spectator 2
// },1000); // spectator 2 can continue previous value

// // #3: REPLAY subject
// // ReplaySubject emits to any observer all of the items that were emitted by the source
// const replay$ = new Rx.ReplaySubject(2); // buffer size in cache, if not it buffer all.
// replay$.next(0);
// replay$.next(1);
// replay$.next(2);
//
// replay$.subscribe(createSubscriber("spectator1"));
//
// replay$.next(3);
// replay$.next(4);
// replay$.next(5);
//
// replay$.subscribe(createSubscriber('spectator2'));
//
// replay$.next(6);
// replay$.next(7);


// // #4: only take the last event
// // An AsyncSubject emits the last value (and only the last value) emitted by the source Observable, and only after that source Observable completes. (If the source Observable does not emit any values, the AsyncSubject also completes without emitting any values.)
// const apiCall$ = new Rx.AsyncSubject();
// apiCall$.next(1);
//
// apiCall$.subscribe(createSubscriber('spectator1'));
// apiCall$.next(2);
// apiCall$.complete();
// setTimeout( () => {
//   apiCall$.subscribe(createSubscriber('spectator2'));
// }, 2000);
//


// #5: opposite replay, it emit only new values
// emits to an observer only those items that are emitted by the source Observable(s) subsequent to the time of the subscription.
var xxx$ = new _Rx2.default.AsyncSubject();
xxx$.next(1);

xxx$.subscribe((0, _util.createSubscriber)('spectator1'));
xxx$.next(2);
xxx$.complete();
setTimeout(function () {
  xxx$.subscribe((0, _util.createSubscriber)('spectator2'));
}, 2000);