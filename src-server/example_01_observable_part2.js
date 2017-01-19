import Rx from 'rxjs/Rx';

// $part2
function createSubscriber (tag) {
  return {
    next(item) { console.log(`${tag}.next ${item}`);},
    error(error) {console.log(`${tag}.error ${ error.stack || error}`);},
    complete() { console.log(`${tag}.complete`);}
  };
}



function createInterval$(time) {
  return new Rx.Observable( observer => {
    let index = 0;
    let interval = setInterval(() => {
      console.log(` Generating ${index}`);
      observer.next(index++);
    }, time);

    return () => {
      clearInterval(interval);
    };
  });

}

function take$ (sourceObservable, amount) {
  return new Rx.Observable( observer => {
  let count = 0;
  const subscription = sourceObservable.subscribe( {
    next(item) {
        observer.next(item);
        if (++ count >= amount )
        observer.complete();
    },
    error(item) {
      observer.error(error);
    },
    complete() {
      observer.complete();
    }
  });
  return () => subscription.unsubscribe();
  });
}

const everySecond$ = createInterval$(1000);
const firstFiveSecond$ = take$(everySecond$, 5);
const subscription = firstFiveSecond$.subscribe(createSubscriber(`one`));

// setTimeout (() => {
//   subscription.unsubscribe();
// },3500);
