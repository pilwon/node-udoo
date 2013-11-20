/*
 * examples/blink/long.promise.js
 */

'use strict';

var udoo = require('../..');

var led = udoo.outputPin(13);

(function loop() {
  led
    .setHigh()
    .then(function () {
      var dfd = udoo.Q.defer();
      setTimeout(dfd.resolve, 1000);
      return dfd.promise;
    })
    .then(function () {
      return led.setLow();
    })
    .done(function () {
      setTimeout(loop, 1000);
    });
}());
