/*
 * examples/blink/short.sync.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

(function loop() {
  led.setSync(on = !on);
  setTimeout(loop, 1000);
}());
