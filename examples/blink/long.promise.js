/*
 * examples/blink/long.promise.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13);

function loop() {
  led
    .setHigh()
    .then(function () {
      return udoo.Q.delay(1000);
    })
    .then(function () {
      return led.setLow();
    })
    .done(function () {
      setTimeout(loop, 1000);
    });
}

udoo.reset().done(loop);
