import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';


// #0: reduce function
function arrayReduce(array, accumulator, startValue) {
  let value = startValue;
  for (let item of array) {
    value = accumulator( value, item);
  }
  return value;
}


const values = [1,2,1];

// # turn many value to one
// // #1: sum
// function accumulator1 (acc, i) {
//   return acc+i;
// }
// const sum = arrayReduce (values,  accumulator1, 0);
// console.log(sum);

// // #2: Find maximum value
// const max = arrayReduce(
//   values,
//   function (acc,value) {
//     if (value>acc) {
//       return value;
//     }
//     return acc;
//   },
//   -1
// );
// // or we just.....
// // const max = arrayReduce( values, Math.max, -1);
// console.log(max);

// this will sum the value of range
// Rx.Observable.range(1,10)
// // .merge( Rx.Observable.never()) // show nothing
// .reduce( (acc, value) => acc+value)
// .subscribe(createSubscriber('reduce'));


// // #3 Scan:
// Rx.Observable.range(1,10)
// // .merge(Rx.Observable.never()) // if add this the observeing never complete
// .scan((acc,value) => acc+ value)
// .subscribe(createSubscriber('reduce'));
//


// // #4 get the lastValue and current value
Rx.Observable.range(1,10)
.map(i => i*i)
.scan(([last], current) => [current, last],[]) // if we remove [] of last, it will show the list of last value
.subscribe(createSubscriber('reduce'));

function scanLast ( acc, value) {
  const last = acc[0];
  return [value, last];
}
