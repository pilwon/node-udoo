/*
 * examples/flip-sync.js
 */

'use strict';

var udoo = require('..');

var led = udoo.outputPin(13);

setInterval(function () {
  led.flipSync();
}, 1000);
