import Rx from 'rxjs/Rx';

// #1: promise is alway execute
 // const promise = new Promise((resolve, reject) => {
 //   console.log("IN PROMISE");
 //   resolve("hey");
 // });

// promise.then(item => console.log(item));

// Part 1

const simple$ = new Rx.Observable(observer => {
  console.log("Gererating observable");
  setTimeout( () => {
    observer.next(" an item!");
    setTimeout(() => {
      observer.next("another items!");
      observer.complete();
    },1000);
  },1000);
});

const error$ = new Rx.Observable( observer => {
  observer.error(new Error("STuff"));
});

error$.subscribe(
  item => console.log(`error.next ${item}`),
  error => console.error(`error.error ${error.stack}`),
  () => console.log(`error.complete`)
);

simple$.subscribe(
  item => console.log(`one.next ${item}`),
  error => console.error(`one.error ${error.stack}`),
  () => console.log(`one.complete`)
);

setTimeout( () => {
  simple$.subscribe({
    next: item => console.log(`two.next ${item}`),
    error: error => console.log(`two.error ${error}`),
    complete: function () {
      console.log(`two.complete`);
    }
  });
}, 3000);
