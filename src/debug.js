'use strict';

let argv = require('minimist')(process.argv.slice(2));
let tracer = require('tracer').colorConsole({
  format : [
    "[{{title}}] ({{file}}:{{line}}) {{message}}", //default format
    {
      error : "[{{title}}] ({{file}}:{{line}}) {{message}}\nCall Stack:\n{{stack}}" // error format
    }
  ]
});

console.log('DEBUG:', argv.debug);

module.exports.log = argv.debug ? tracer.debug : () => {};
module.exports.error = argv.debug ? tracer.error : () => {};
