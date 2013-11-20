/*
 * examples/arduino-tutorials/blink.js
 */

'use strict';

var async = require('async'),
    udoo = require('../..');

var led = udoo.outputPin(13);

async.forever(function (cb) {
  async.series([
    function (cb) {
      led.setHigh(cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    },
    function (cb) {
      led.setLow(cb);
    },
    function (cb) {
      setTimeout(cb, 1000);
    }
  ], cb);
}, function (err) {
  throw err;
});
