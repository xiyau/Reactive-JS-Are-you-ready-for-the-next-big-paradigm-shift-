"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #1: promise is alway execute
// const promise = new Promise((resolve, reject) => {
//   console.log("IN PROMISE");
//   resolve("hey");
// });

// promise.then(item => console.log(item));

// Part 1

var simple$ = new _Rx2.default.Observable(function (observer) {
  console.log("Gererating observable");
  setTimeout(function () {
    observer.next(" an item!");
    setTimeout(function () {
      observer.next("another items!");
      observer.complete();
    }, 1000);
  }, 1000);
});

var error$ = new _Rx2.default.Observable(function (observer) {
  observer.error(new Error("STuff"));
});

error$.subscribe(function (item) {
  return console.log("error.next " + item);
}, function (error) {
  return console.error("error.error " + error.stack);
}, function () {
  return console.log("error.complete");
});

simple$.subscribe(function (item) {
  return console.log("one.next " + item);
}, function (error) {
  return console.error("one.error " + error.stack);
}, function () {
  return console.log("one.complete");
});

setTimeout(function () {
  simple$.subscribe({
    next: function next(item) {
      return console.log("two.next " + item);
    },
    error: function error(_error) {
      return console.log("two.error " + _error);
    },
    complete: function complete() {
      console.log("two.complete");
    }
  });
}, 3000);