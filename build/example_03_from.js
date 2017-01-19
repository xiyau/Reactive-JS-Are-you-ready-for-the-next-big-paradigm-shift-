'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #1: read filename normal
// fs.readdir('./src-server', (err,items) => {
//   if (err) console.error(err);
//   else {
//     console.log(items);
//   }
// });

// # read file name RXJS
// const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
// console.log(typeof(readdir$));
//
// readdir$('./src-server')
// .mergeMap(files=> Rx.Observable.from(files))
// .map(file => `Manipulated ${file}`)
// .subscribe(createSubscriber('readdir'));

// #2 working with promise
function getItem() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('hello');
    }, 1000);
  });
}

// #promise
var xxx = getItem();
xxx.then(function (mes) {
  return console.log(mes);
});

// #rxjs
_Rx2.default.Observable.fromPromise(getItem()).subscribe((0, _util.createSubscriber)("promise"));