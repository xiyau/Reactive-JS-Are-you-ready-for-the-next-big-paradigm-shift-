import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// #1: do only do something without effect to the value with sideeffect
Rx.Observable.range(1,10)
.do(a => console.log(`from do ${a}`))
.map (a => a*a)
.subscribe(createSubscriber('simple'));

// #2: finally only do something after the sequence finish
Rx.Observable.range(1,10)
.finally( () => console.log(' from finally'))
.map( a=> a*2)
.subscribe(createSubscriber('finally'));

// #3: filter, that all
Rx.Observable.range(1,10)
.filter(a => a < 5)
.subscribe(createSubscriber('filter'));

// #4: merge value, not from
Rx.Observable.interval(1000)
.startWith(5)
.subscribe(createSubscriber('interval'));
