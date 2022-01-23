module.exports = (...args) => args.map((arg, index) => {
  const n = parseFloat(arg);
  if (!isNaN(n)) return n;

  throw Object.extend(
    new Error(`Cannot parse argument`),
    {
      arg,
      index,
    }
  );
});
