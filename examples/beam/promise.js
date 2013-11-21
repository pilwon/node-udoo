/*
 * examples/beam/promise.js
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

function loop() {
  var promise = udoo.Q();

  leds.forEach(function (led) {
    promise = promise.then(function () {
      return led
        .setHigh()
        .then(function () {
          return udoo.Q.delay((slowDown ? SLOWDOWN_FACTOR : 1) * DELAY_LED);
        })
        .then(function () {
          return led.setLow();
        });
    });
  });

  promise.done(function () {
    leds.reverse();
    slowDown = !slowDown;
    setTimeout(loop, DELAY_LOOP);
  });
}

for (i = PIN_NUMBER_FROM; i <= PIN_NUMBER_TO; ++i) {
  leds.push(udoo.outputPin(i));
}

udoo.reset().done(loop);
