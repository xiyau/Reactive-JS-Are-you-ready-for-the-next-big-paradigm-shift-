'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #problem if throw error, data not keep generating
// Rx.Observable
// .concat(
//   Rx.Observable.of(42),
//   Rx.Observable.throw(new Error('blegh')),
//   Rx.Observable.of(10),
// )
// .subscribe(createSubscriber('catch'));


// // #1 resolve problem if throw error, data not keep generating
//
// Rx.Observable.fromPromise(getApi())
// // .retry() // not working with promise
// .catch( error => Rx.Observable.of(error)) // you don't want break chain
// .do(() => console.log("logging status"))
// .subscribe(createSubscriber('api'));
//
// function getApi() {
//   console.log('getting api');
//   return new Promise((resolve, reject) => {
//     setTimeout( () => {
//         // resolve('data: 4141234134');
//         reject(new Error());
//     },1000) ;
//   });
// }


// #retry-ing from an observable

getApi().retry(3).catch(function (error) {
  return _Rx2.default.Observable.of(error);
}) // you don't want break chain
.do(function () {
  return console.log("logging status");
}).subscribe((0, _util.createSubscriber)('api'));

function getApi() {
  return new _Rx2.default.Observable(function (observer) {
    console.log('getting api');
    setTimeout(function () {
      // observer.next('hey');
      // observer.complete();
      observer.error(new Error());
    }, 1000);
  });
}