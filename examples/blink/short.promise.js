/*
 * examples/blink/short.promise.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13),
    on = false;

function loop() {
  led
    .set(on = !on)
    .done(function () {
      setTimeout(loop, 1000);
    });
}

udoo.reset().done(loop);
