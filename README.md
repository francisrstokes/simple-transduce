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
const notMuliplipleOf3 = (value) => value % 3 !== 0;
const sqaure = (value) => value * value;
const notMuliplipleOf4 = (value) => value % 4 !== 0;

const newCollection = collection
  .map(multiplyBy5)
  .filter(notMuliplipleOf3)
  .map(sqaure)
  .filter(notMuliplipleOf4);

// Result = [ 49, 121, 169 ]
// Total elements of all intermediate collections: 34
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
const notMuliplipleOf3 = st.filterTransducer((value) => value % 3 !== 0);
const sqaure = st.mapTransducer((value) => value * value);
const notMuliplipleOf4 = st.filterTransducer((value) => value % 4 !== 0);

const transducer = st.compose(multiplyBy5, notMuliplipleOf3, sqaure, notMuliplipleOf4);

const newCollection = st.reduce(transducer(st.concat), [], collection);

// Result = [ 49, 121, 169 ]
```

Note that `compose`, `reduce` and `concat` are not special functions - they are found in many common functional libraries (and lodash)
and are thus interchangable with those.
