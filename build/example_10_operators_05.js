'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
_Rx2.default.Observable.range(1, 10).merge(_Rx2.default.Observable.never()).toArray().subscribe((0, _util.createSubscriber)('range'));