const reduce = require('./reduce');
const mapTransducer = require('./map-transducer');
const filterTransducer = require('./filter-transducer');
const compose = require('./compose');
const pipe = require('./pipe');
const sum = require('./sum');
const concat = require('./concat');
const curry = require('./curry');

module.exports = {
  reduce,
  mapTransducer,
  filterTransducer,
  compose,
  pipe,
  sum,
  concat,
  curry
};
