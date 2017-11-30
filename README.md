# simple-transduce

A really simple transducer module to easily convert map-filter-reduce chains to single pass transducers.

## Install

```bash
npm install simple-transduce
```

## Concept

Take some existing code like this:

```javascript
const collection = [1,2,3,4,5,6,7,8,9,10];

const multiplyBy5 = (value) => value + 5;
const notMultipleOf3 = (value) => value % 3 !== 0;
const square = (value) => value * value;
const notMultipleOf4 = (value) => value % 4 !== 0;

const newCollection = collection
  .map(multiplyBy5)
  .filter(notMultipleOf3)
  .map(square)
  .filter(notMultipleOf4);

// Result = [ 49, 121, 169 ]
// Total elements of all intermediate collections, including original: 34
```

This works fine, and the original list is transformed from 10 members to just 3 in the end, as expected.
However this transformation happens over multiple intermediate collections, meaning while the original array has 10 elements,
you actually iterate over 4 collections of 10, and thus (potentially) 40 elements. A transducer allows for a generic method that
lets you do just a single pass of the 10 elements without sacrificing the clarity of having those 4 distinct transformation functions.

### Converting map-filter to transduce

```javascript
const st = require('simple-transduce');

const collection = [1,2,3,4,5,6,7,8,9,10];

const multiplyBy5 = st.mapTransducer((value) => value + 5);
const notMultipleOf3 = st.filterTransducer((value) => value % 3 !== 0);
const square = st.mapTransducer((value) => value * value);
const notMultipleOf4 = st.filterTransducer((value) => value % 4 !== 0);

const transducer = st.compose(multiplyBy5, notMultipleOf3, square, notMultipleOf4);

const newCollection = st.reduce(transducer(st.concat), [], collection);

// Result = [ 49, 121, 169 ]
// Total elements of all intermediate collections, including original: 10
```

Note that `compose`, `reduce` and `concat` are not special functions - they are found in many common functional libraries (and lodash)
and are thus interchangable with those.

## Functions

- `mapTransducer(mapFunction)` -> creates a composable transducer from the map function
- `filterTransducer(filter)` -> creates a composable transducer from the filter function
- `reduce(reducerFunction, start, collection)` -> generic reduce
- `compose(...fns)` -> generic compose. Example: `compose(f, g) = (x) => f(g(x))`
- `pipe(...fns)` -> generic pipe (compose inverse). Example: `pipe(f, g) = (x) => g(f(x))`
- `concat(acc, item)` -> generic concat reducer
- `sum(acc, item` -> generic sum reducer
