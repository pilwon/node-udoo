/*
 * examples/blink/long.async.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13);

(function loop() {
  led.setHigh(function (err) {
    if (err) { throw err; }
    setTimeout(function () {
      led.setLow(function () {
        if (err) { throw err; }
        setTimeout(loop, 1000);
      });
    }, 1000);
  });
}());
