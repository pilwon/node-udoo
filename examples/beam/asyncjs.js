/*
 * examples/beam/asyncjs.js
 */

'use strict';

var udoo = require('../..');

var DELAY_LED = 5,
    DELAY_LOOP = 500,
    PIN_NUMBER_FROM = 2,
    PIN_NUMBER_TO = 15,
    SLOWDOWN_FACTOR = 7;

var leds = [],
    slowDown = false,
    i;

function loop(cb) {
  var tasks = [];

  leds.forEach(function (led) {
    tasks.push(function (cb) {
      udoo.async.series([
        function (cb) {
          led.setHigh(cb);
        },
        function (cb) {
          setTimeout(cb, (slowDown ? SLOWDOWN_FACTOR : 1) * DELAY_LED);
        },
        function (cb) {
          led.setLow(cb);
        }
      ], cb);
    });
  });

  tasks.push(function (cb) {
    leds.reverse();
    slowDown = !slowDown;
    setTimeout(cb, DELAY_LOOP);
  });

  udoo.async.series(tasks, cb);
}

for (i = PIN_NUMBER_FROM; i <= PIN_NUMBER_TO; ++i) {
  leds.push(udoo.outputPin(i));
}

udoo.async.series([
  udoo.reset,
  function (cb) {
    udoo.async.forever(loop, cb);
  }
], function (err) {
  throw err;
});
