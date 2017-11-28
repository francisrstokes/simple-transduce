module.exports = (fn1, ...functions) =>
  (...args) =>
    functions.reduce((acc, fn) => fn(acc), fn1(...args));
