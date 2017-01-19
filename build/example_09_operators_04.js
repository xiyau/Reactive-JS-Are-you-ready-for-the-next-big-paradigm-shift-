'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #0: reduce function
function arrayReduce(array, accumulator, startValue) {
  var value = startValue;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      value = accumulator(value, item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return value;
}

var values = [1, 2, 1];

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
_Rx2.default.Observable.range(1, 10).map(function (i) {
  return i * i;
}).scan(function (_ref, current) {
  var _ref2 = _slicedToArray(_ref, 1),
      last = _ref2[0];

  return [current, last];
}, []) // if we remove [] of last, it will show the list of last value
.subscribe((0, _util.createSubscriber)('reduce'));

function scanLast(acc, value) {
  var last = acc[0];
  return [value, last];
}