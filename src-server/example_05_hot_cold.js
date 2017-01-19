import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
//
// // HOT from COLD OBSERVABLE
// const interval$ = Rx.Observable.interval(1000)
// .take(10)
// .publish();
//
// setTimeout( () => {
//
//   interval$.connect();
// },5000);
//
// setTimeout( () => {
//   interval$.subscribe(createSubscriber("spectator (-_-'')"));
// }, 1200);
//
// setTimeout( () => {
//   interval$.subscribe(createSubscriber("spectator (^^)"));
// }, 3200);

// const socket = { on: () => {}};
//
// const chatMessages$ = new Rx.Observable( observer => {
//   console.log(`subscribed`,Date.now());
//   socket.on("chat: message", message => observer.next(message));
// })
// .publish();
//
// chatMessages$.connect();
//
// chatMessages$.subscribe(createSubscriber('spectator one -__-'));
// chatMessages$.subscribe(createSubscriber('spectator  two ^^'));

// const simple$ = new Rx.Observable( observer => {
//   observer.next('one');
//   observer.next('two');
//   observer.next('three');
//   observer.complete();
// });
//
// // const published$= simple$.publishLast();
// const published$= simple$.publishReplay(2);
//
// published$.subscribe(createSubscriber('one'));
// published$.connect();
// published$.subscribe(createSubscriber('two'));


// # if there is hot observable,  there is only one observable created, and only one disposed method will be call

// const simple$ = new Rx.Observable( observer => {
//   observer.next('one');
//   observer.next('two');
//   observer.next('three');
//   observer.complete();
//
//   return () => console.log('disposed');
// });
//
// // const published$= simple$.publishLast();
// const published$= simple$.publishReplay(2);
//
// published$.subscribe(createSubscriber('one'));
// published$.connect();
// published$.subscribe(createSubscriber('two'));

// //#  try to disposed
//
// const simple$ = new Rx.Observable( observer => {
//   observer.next('one');
//   observer.next('two');
//   observer.next('three');
//   // observer.complete();
//
//   return () => console.log('disposed');
// });
//
// // const published$= simple$.publishLast();
// const published$= simple$.publishReplay(2);
//
// const  sub1 = published$.subscribe(createSubscriber('one'));
// const connection = published$.connect();
// const  sub2 = published$.subscribe(createSubscriber('two'));
//
// sub1.unsubscribe();  // not working
// sub2.unsubscribe(); // not working
//
// connection.unsubscribe();  // working

// //#  Automaticly handle the connection and the unsubscribe of an object

// const simple$ = new Rx.Observable( observer => {
//   observer.next('one');
//   observer.next('two');
//   observer.next('three');
//   // observer.complete();
//
//   return () => console.log('disposed');
// });
//
// // const published$= simple$.publishLast();
// const published$= simple$.publishReplay().refCount();
//
// const  sub1 = published$.subscribe(createSubscriber('one')); // make connect
// const connection = published$.connect();
// const  sub2 = published$.subscribe(createSubscriber('two')); // make connect
//
// sub1.unsubscribe();  // unsubscribe first spectator
// sub2.unsubscribe(); // if unsubscribe second spectator, disposed will be call, if not, it will still listening... and not disposed


// //# using share: connect at first subscription and disconnect at last subscription
// There is also a share operator, which is the equivalent of applying both the publish and refCount

const simple$ = new Rx.Observable( observer => {
  observer.next('one');
  observer.next('two');
  observer.next('three');
  // observer.complete();

  return () => console.log('disposed');
});

// const published$= simple$.publishLast();
const published$= simple$.share();

const  sub1 = published$.subscribe(createSubscriber('one')); // make connect
// const connection = published$.connect();
const  sub2 = published$.subscribe(createSubscriber('two')); // make connect

sub1.unsubscribe();  // unsubscribe first spectator
sub2.unsubscribe(); // if unsubscribe second spectator, disposed will be call, if not, it will still listening... and not disposed
