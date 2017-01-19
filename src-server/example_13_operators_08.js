import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

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

getApi()
.retry(3)
.catch( error => Rx.Observable.of(error)) // you don't want break chain
.do(() => console.log("logging status"))
.subscribe(createSubscriber('api'));

function getApi() {
  return new Rx.Observable( observer => {
    console.log('getting api');
    setTimeout( () => {
      // observer.next('hey');
      // observer.complete();
      observer.error(new Error());
    },1000) ;
  });
}
