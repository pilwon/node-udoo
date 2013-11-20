/*
 * examples/blink/exact.sync.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

udoo.resetSync();

setInterval(function () {
  led.setSync(on = !on);
}, 1000);
