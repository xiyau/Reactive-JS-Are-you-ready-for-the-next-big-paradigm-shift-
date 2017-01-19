import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// #1: khoảng thời gian
// Rx.Observable.interval(1000)
// .merge(Rx.Observable.interval(500))
// .take(7)
// .subscribe(createSubscriber('merge'));

// #2: ghép 2 observable, thường được sử dụng để theo dõi chung nhiều trạng thái
// Rx.Observable.merge(
//   Rx.Observable.interval(1000).map( i => `${i} seconds`),
//   Rx.Observable.interval(500).map( i => `${i} half seconds`)
// )
// .take(10)
// .subscribe(createSubscriber('merge2'));

// // for user login logout
// const currentUser$ = Rx.Observable.merge(
//   socket.on$('login').map(user => processUser(user)),
//   socket.on$('logout').map( () => null)
// );

// // #3: nối 2 mảnh
// // range ở javascript nếu cho 2 biến bắt đầu từ số 5, và lấy 1 phần từ
// Rx.Observable.range(5,1)
// .concat(Rx.Observable.range(10,3))
// .subscribe(createSubscriber('concat1'));

// Rx.Observable.interval(500)
// .take(3)
// .concat(Rx.Observable.range(10,3))
// .subscribe(createSubscriber('concat2'));

// Rx.Observable.concat(
//   Rx.Observable.interval(1000).map( i=> `${i} seconds`).take(3),
//   RxObservable.interval(500).map (i => `${i} seconds`).take(3)
// )
// .subscribe(createSubscriber('concat3'));
