/*
 * examples/blink-sync.js
 */

'use strict';

var udoo = require('..');

var led = udoo.outputPin(13),
    on = false;

setInterval(function () {
  led.setSync(on = !on);
}, 1000);
