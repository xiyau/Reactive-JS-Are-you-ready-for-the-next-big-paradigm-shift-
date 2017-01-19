'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Rx2.default.Observable.interval(1000).take(3).map(function (a) {
  return a * a;
}).subscribe((0, _util.createSubscriber)('map'));

// function