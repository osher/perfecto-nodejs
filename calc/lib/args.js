module.exports = (...args) => args.map((arg, index) => {
  const n = parseFloat(arg);
  if (!isNaN(n)) return n;

  throw Object.assign(
    new Error(`Cannot parse argument`),
    {
      arg,
      index,
    }
  );
});
