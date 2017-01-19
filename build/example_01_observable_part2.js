'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $part2
function createSubscriber(tag) {
  return {
    next: function next(item) {
      console.log(tag + '.next ' + item);
    },
    error: function (_error) {
      function error(_x) {
        return _error.apply(this, arguments);
      }

      error.toString = function () {
        return _error.toString();
      };

      return error;
    }(function (error) {
      console.log(tag + '.error ' + (error.stack || error));
    }),
    complete: function complete() {
      console.log(tag + '.complete');
    }
  };
}

function createInterval$(time) {
  return new _Rx2.default.Observable(function (observer) {
    var index = 0;
    var interval = setInterval(function () {
      console.log(' Generating ' + index);
      observer.next(index++);
    }, time);

    return function () {
      clearInterval(interval);
    };
  });
}

function take$(sourceObservable, amount) {
  return new _Rx2.default.Observable(function (observer) {
    var count = 0;
    var subscription = sourceObservable.subscribe({
      next: function next(item) {
        observer.next(item);
        if (++count >= amount) observer.complete();
      },
      error: function (_error2) {
        function error(_x2) {
          return _error2.apply(this, arguments);
        }

        error.toString = function () {
          return _error2.toString();
        };

        return error;
      }(function (item) {
        observer.error(error);
      }),
      complete: function complete() {
        observer.complete();
      }
    });
    return function () {
      return subscription.unsubscribe();
    };
  });
}

var everySecond$ = createInterval$(1000);
var firstFiveSecond$ = take$(everySecond$, 5);
var subscription = firstFiveSecond$.subscribe(createSubscriber('one'));

// setTimeout (() => {
//   subscription.unsubscribe();
// },3500);