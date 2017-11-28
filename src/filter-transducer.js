module.exports = (testFn) =>
  (reducingFn) =>
    (acc, item) =>
      testFn(item, acc)
        ? reducingFn(acc, item)
        : acc;
