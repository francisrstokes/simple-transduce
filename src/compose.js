const pipe = require('./pipe');
module.exports = (...functions) => pipe(...functions.reverse());