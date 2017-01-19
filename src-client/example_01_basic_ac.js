import $ from "jquery";

const $title = $('#title');
const $results=$('#results');

let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;
$title.on("keyup", e => {
  const title = e.target.value;
  // #1 for clear query by arrow key
  if (title == lastQuery) {
    return;
  }
  lastQuery = title;

  // #2 for reset timeout if new query
  if (lastTimeout)
    window.clearTimeout(lastTimeout);

  let ourQueryId = ++nextQueryId;
 console.log(ourQueryId, nextQueryId)
  lastTimeout = window.setTimeout( () => {
    getItems(title)
    .then(items => {
      // #3 if queryID doesn't equal next query ID then return
      if (ourQueryId != nextQueryId)
        return;

      $results.empty();
      const $items = items.map( item => $(`<li />`).text(item));
      $results.append($items);
    });
  }, 500);

});

// -------------------------------
// library

function getItems(title) {
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) =>{
    window.setTimeout(() => {
      resolve([title, "item 2", `another ${Math.random()}`]);
    }, 500 + (Math.random()*1000));
  });
}
