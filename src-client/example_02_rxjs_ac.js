import $ from 'jquery';
import Rx from 'rxjs/Rx';

const $title = $('#title');
const $results = $('#results');

// # Hot Observable: you only expect data from this moment, not history.
Rx.Observable.fromEvent($title,"keyup")
.map(e => e.target.value)
.distinctUntilChanged()
.debounceTime(500)
.switchMap(getItems)
.subscribe( items => {
  $results.empty();
  $results.append(items.map(i => $('<li />').text(i)));
});


// const keyUps$ = Rx.Observable.fromEvent($title, "keyup");
// const queries$ = keyUps$
//     .map(e => e.target.value)
//     .distinctUntilChanged()
//     .debounceTime(350)
//     .switchMap( query => getItems(query));
//
// queries$.subscribe( query => {
//   getItems(query)
//   .then( items => {
//     $results.empty();
//     $results.append( items.map(r => $(`<li />`).text(r)));
//   });
// });

// -------------------------------
// library


function getItems(title) {
  console.log(`Querying `,title);
  return new Promise((resolve, reject) =>{
    window.setTimeout(() => {
      resolve([title, "item 2", `another ${Math.random()}`]);
    }, 500 + (Math.random()*5000));
  });
}
