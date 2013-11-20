/*
 * examples/blink/long.sync.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13);

(function loop() {
  led.setHighSync();
  setTimeout(function () {
    led.setLowSync();
    setTimeout(loop, 1000);
  }, 1000);
}());
