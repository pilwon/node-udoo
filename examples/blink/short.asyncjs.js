/*
 * examples/blink/short.asyncjs.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

udoo.async.forever(function (cb) {
  udoo.async.series([
    function (cb) {
      led.set(on = !on, cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    }
  ], cb);
}, function (err) {
  throw err;
});
