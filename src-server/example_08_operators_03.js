import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
//
// // #1: map
// Rx.Observable.interval(1000)
// .take(3)
// .map(a => a *a)
// .subscribe( createSubscriber('map'));

// // #2: flatmap mergemap
// function arrayMap(array, projection) {
//   const returnArray = [];
//   for (let item of array ) {
//     const projected = projection(item);
//     returnArray.push(projected);
//   }
//   return returnArray;
// }
//
// arrayMap([1,2,3], a => a*a);
//
// function arrayMergeMap(array, projection) {
//   const returnArray = [];
//   for ( let item of array) {
//     const projectedArray = projection(item);
//     for (let projected of projectedArray) {
//       returnArray.push(projected);
//     }
//   }
//   return returnArray;
// }
//
// const albums = [
//   {title: 'album 1', tracks: [{ id: 1, title: 'track 1'},{ id: 2, title: 'track 2'},{ id: 3, title: 'track 3'}]},
//   {title: 'album 2', tracks: [{ id: 1, title: 'track 2-1'},{ id: 2, title: 'track 2-2'},{ id: 3, title: 'track 2-3'}]}
// ];
//
// const tracksWrong = arrayMap( albums, album => album.tracks);
// const tracksRight = arrayMergeMap( albums, album => album.tracks);
// console.log(JSON.stringify(tracksRight));

// // #Problem resolve with RXJS:
// Rx.Observable.range(1,3)
// .mergeMap(i => Rx.Observable.timer(i*1000).map(() => `after ${i*2} secondss`))
// .subscribe(createSubscriber('mergeMap'));
//

// # other
Rx.Observable.fromPromise(getTracks())
.mergeMap( tracks => Rx.Observable.from(tracks)) // return observable, argument 2 can be function
// .map( x => x) // take a function
// .switchMap(x => x+'tail') // take a function
.subscribe(createSubscriber('tracks'));

function getTracks() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve(['track 1', 'track 2', 'track 3']);
    },1000);
  });
}


// Rx.Observable.of('my query')
// .do( () => console.log('querying'))
// .mergeMap ( a => query(a))
// .do(() => console.log('after querying'))
// .subscribe(createSubscriber('query'));
//
// function query( value) {
//   return new Promise((resolve, reject) => {
//     setTimeout( () => {
//       resolve("This is the value return");
//     },1000);
//   });
// }
