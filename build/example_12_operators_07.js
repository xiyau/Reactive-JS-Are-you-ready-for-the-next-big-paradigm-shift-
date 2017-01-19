'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var currentUser$ = new _Rx2.default.BehaviorSubject({ isLoggedIn: false });

_Rx2.default.Observable.interval(1000) // may be a event in action
// .withLatestFrom(currentUser$) // only new state being reconized
.combineLatest(currentUser$) // only new state being reconized and state before that, we can pause that observable until user login
.filter(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      i = _ref2[0],
      user = _ref2[1];

  return user.isLoggedIn;
}).take(5).subscribe((0, _util.createSubscriber)('withLatestFrom'));

setTimeout(function () {
  currentUser$.next({ isLoggedIn: true });
}, 3000);