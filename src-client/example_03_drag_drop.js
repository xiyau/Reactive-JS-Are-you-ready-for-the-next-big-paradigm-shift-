import Rx from 'rxjs/Rx';
import $ from 'jquery';

const $drag = $('#drag');
const $document = $(document);
const $dropAreas = $('.drop-area');

const beginDrag$ = Rx.Observable.fromEvent($drag, 'mousedown');
const endDrag$ = Rx.Observable.fromEvent($document, 'mouseup');
const mouseMove$ = Rx.Observable.fromEvent($document, 'mousemove');


// $("#dropAreas").mouseover(function(){
//   console.info(`CATCHED`);
// });
//
// $("#drag").off("mouseover mouseenter mouseleave mouseout");
// $(".drop-area").off("mouseover mouseenter mouseleave mouseout");


// $("#drag").mouseover(function(){
//   console.log('overing...');
// });
//  $("#drag").off("mouseover");

const currentOverArea$ = Rx.Observable.merge(
  Rx.Observable.fromEvent($dropAreas, 'mouseleave').map(e => {
    console.log("outside",e);
    return null;
  }),
Rx.Observable.fromEvent($dropAreas, 'mouseenter').map(e => {
  console.log("inside target");
  return $(e.target);
}));
// .do( e => console.log('value return', e));


// const test$ = Rx.Observable
// .fromEvent($dropAreas, 'mouseleave')
// .map(e => {
//   console.log("mouseleave target", Date.now(), e);
//   return ;
// });

// test$.subscribe((e) => console.log(e));



// const currentOverArea$ = Rx.Observable
// .fromEvent($dropAreas, 'mouseleave').map(e => {
//   // console.log("mouseleave target", Date.now(), e);
//   return $(e.target);
// }).takeUntil(endDrag$);
//
const drops$ = beginDrag$
.do( e => {
  e.preventDefault();
  // console.log(e);
  $drag.addClass('dragging');
})
.mergeMap(startEvent => {
  return mouseMove$
  .takeUntil(endDrag$)
  .do(mouseEvent => {
    moveDrag(startEvent, mouseEvent);
  })
  .last()
  .do((x) => {
    // console.log("hey from last event",x);
    $drag.removeClass('dragging')
    .animate({ top:0, left: 0}, 250);
  }
)
  .withLatestFrom(currentOverArea$, (_, $area) => {
    // console.log("withLatestFrom");
    console.log('area',$area);
    return $area;
  })
  ;
  // .do((x) => {
  //   console.log("after lastest infomation",x);
  // }
  // )
// }) // ending
}); //ending

drops$.subscribe($dropArea => {
  // console.log('no drop area, removing class dropped');
  $dropAreas.removeClass('dropped');
  if ($dropArea) {
    // console.log(console.log(`drop area is: `,$dropArea));
    $dropArea.addClass('dropped');
  }
});

function moveDrag(startEvent, moveEvent) {
  $drag.css({
    left: moveEvent.clientX - startEvent.offsetX,
    top: moveEvent.clientY - startEvent.offsetY
  });
}
