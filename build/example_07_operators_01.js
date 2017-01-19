'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #1: do only do something without effect to the value with sideeffect
_Rx2.default.Observable.range(1, 10).do(function (a) {
  return console.log('from do ' + a);
}).map(function (a) {
  return a * a;
}).subscribe((0, _util.createSubscriber)('simple'));

// #2: finally only do something after the sequence finish
_Rx2.default.Observable.range(1, 10).finally(function () {
  return console.log(' from finally');
}).map(function (a) {
  return a * 2;
}).subscribe((0, _util.createSubscriber)('finally'));

// #3: filter, that all
_Rx2.default.Observable.range(1, 10).filter(function (a) {
  return a < 5;
}).subscribe((0, _util.createSubscriber)('filter'));

// #4: merge value, not from
_Rx2.default.Observable.interval(1000).startWith(5).subscribe((0, _util.createSubscriber)('interval'));