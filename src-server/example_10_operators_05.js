import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// #1: BUFFER  SPLIT BY ...
// realize: for pagination
// Rx.Observable.range(1,100)
// .bufferCount(10)
// .subscribe(createSubscriber('items'));

// #2: split by selected time
// Rx.Observable.interval(500)
// .bufferTime(2000)
// .subscribe(createSubscriber('items'));

// #3:


// Rx.Observable.interval(500)
// .buffer(Rx.Observable.interval(2000))
// .subscribe(createSubscriber('buffer'));

// # wait ultil next result from observvable then buffer flush
// const stopSubject$ = new Rx.Subject();
// Rx.Observable.interval(500)
// .buffer(stopSubject$)
// .subscribe(createSubscriber('buffer'));
//
// setTimeout(() =>{
//   stopSubject$.next();
// },3000);

// #4: wait every thing complete then send only one result
Rx.Observable.range(1,10)
.merge(Rx.Observable.never())
.toArray()
.subscribe(createSubscriber('range'));
