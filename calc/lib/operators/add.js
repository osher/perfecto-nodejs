module.exports = (...args) => {
    return args.reduce((s, n) => s + n, 0);
}