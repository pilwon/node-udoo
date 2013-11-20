/*
 * examples/flip.js
 */

'use strict';

var udoo = require('..');

var led = udoo.outputPin(13);

(function loop() {
  led.flip(function (err) {
    if (err) { throw err; }
    setTimeout(loop, 1000);
  });
}());
