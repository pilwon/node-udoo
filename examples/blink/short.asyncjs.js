/*
 * examples/blink/short.asyncjs.js
 */

'use strict';

var async = require('async'),
    udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

async.forever(function (cb) {
  async.series([
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
