/*
 * examples/blink/exact.promise.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

setInterval(function () {
  led.set(on = !on).done();
}, 1000);
