/*
 * examples/blink/exact.async.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

udoo.reset(function (err) {
  if (err) { throw err; }
  setInterval(function () {
    led.set(on = !on, function (err) {
      if (err) { throw err; }
    });
  }, 1000);
});
