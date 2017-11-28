module.exports = (transformFn) =>
  (reducingFn) =>
    (acc, item) =>
      reducingFn(acc, transformFn(item, acc));
