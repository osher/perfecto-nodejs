#!/usr/bin/node

const calc = require('../lib');
const argv = process.argv.slice(2);
const argsParser = require('../lib/args');

const cmd = argv.shift();

let args;
try {
  args = argsParser(...argv);
} catch(e) {
  console.log(e.message, {
      ...e
  })
  process.exit(1);
}

const result = calc(cmd, args);
console.log('calculated', { cmd, args, result });

