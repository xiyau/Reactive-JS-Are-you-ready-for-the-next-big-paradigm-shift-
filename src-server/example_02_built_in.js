import Rx from "rxjs/Rx";
import { createSubscriber } from './lib/util';
// // #1: lặp lại sau khoảng thời gian
// Rx.Observable.interval(500)
//   .take(5)
//   .subscribe(createSubscriber("interval"));
//
// // #2: đợi một khoảng thời gian
//   Rx.Observable.timer(2000)
//   .take(5)
//   .subscribe(createSubscriber("timer"));

// // #3: đợi mộ khoảng thời gian rồi lặp
//   Rx.Observable.timer(2000,500)
//   .take(5)
//   .subscribe(createSubscriber("timer"));

// CREATE OBSERVABLE

// // #4: tạo observable từ thành list phần tử  (multi argument)
// Rx.Observable.of("hello, world",["item1", "item2"])
//     .subscribe(createSubscriber("of"));
//
// // #5: tạo observable với các phần tử từ trong list hoặc trải các phần tử ra:
// // hey => h,e,y
// Rx.Observable.from([23,10,4])
//     .subscribe(createSubscriber("from"));
//
// const arr= [1,2,3,4,5];
// Rx.Observable.from(arr)
//     .map(i => i*5)
//     .subscribe(createSubscriber("from"));

// // #5.1: ném lỗi
// Rx.Observable.throw(new Error("hey"))
// .subscribe(createSubscriber("error"));
//
// // #5.2: lỗi không hiện ra và dừng chương trình  mà sẽ tiếp tục chạy nếu sử dụng array và of
// Rx.Observable.throw([new Error("hey")])
// .subscribe(createSubscriber("error"));
//
// // #6: trả về một observable rỗng và complete.
// sử dụng: trong trường hợp cần sử dụng tiếp một observabe hoặc cần một obseravble complete
// Rx.Observable.empty()
// .subscribe(createSubscriber("empty"));
//
//
// // #7: chờ
// sử dụng: tạo một observable từ một sideEffect.
// sử dụng: làm một thứ gì đó cho đến khi được subscribe.
// (sử dụng một biến bên ngoài để closesure( tời lên, biến phụ) sau đó dùng defer như là một bộ sinh tự động (generator) để mỗi lần subscribe là một lần nhận giá trị tiếp theo
// )

// let sideEffect = 0;
// const  defer$ = Rx.Observable.defer(() => {
//   sideEffect ++;
//   console.log("my name is: ",sideEffect);
//   return Rx.Observable.of(sideEffect);
// });
//
// defer$.subscribe(createSubscriber("defer$.one"));
// defer$.subscribe(createSubscriber("defer$.two"));
// defer$.subscribe(createSubscriber("defer$.three"));

// #8: không bao giờ hoàn thành
// empty thì trả về một observable rỗng (không có item) và complete, never thì không complete. dùng để ra tín hiệu cho observable khác
Rx.Observable.never()
.subscribe(createSubscriber("never"));

// #9: range giống python thôi [10,30)
Rx.Observable.range(10,30)
.subscribe(createSubscriber("range"));
