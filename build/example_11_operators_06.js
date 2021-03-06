'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const simple$ = new Rx.Observable( observer => {
//   // console.log('generating sequence');
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.next(4);
//   observer.complete();
// });

// // #1 take first item then complete
// simple$.first()
// .subscribe(createSubscriber('first'));
//
// // #2 take last item then complete, not make sense with hot observable
// simple$.last()
// .subscribe(createSubscriber('last'));
//
//
// // #3 take single item then complete, but the source must be only one item
// simple$.single()
// .subscribe(createSubscriber('single'));
//
//
// // #4 take some items then complete
// simple$.take(2)
// .subscribe(createSubscriber('take'));

// // #5 skip some items then complete
// simple$.skip(2)
// .subscribe(createSubscriber('skip'));


// // #6 skip and take some items then complete
// simple$.skip(2).take(2)
// .subscribe(createSubscriber('skip'));


// -----------------------------------------------------

// Rx.Observable.interval(500)
// .skipWhile( i => i <  4)
// .takeWhile(i => i < 10)
// .subscribe(createSubscriber('skipWhile'));

_Rx2.default.Observable.interval(500).skipUntil(_Rx2.default.Observable.timer(2000)).takeUntil(_Rx2.default.Observable.timer(4000)).subscribe((0, _util.createSubscriber)('skipWhile'));