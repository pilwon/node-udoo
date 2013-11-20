/*
 * lib/index.js
 */

'use strict';

var _ = require('lodash');

var C = require('./constant'),
    Pin = require('./pin');

function inputPin(name) {
  return new Pin(name, C.PIN_MODE.INPUT);
}

function outputPin(name) {
  return new Pin(name, C.PIN_MODE.OUTPUT);
}

function pin(name) {
  return new Pin(name);
}

// Export constants as read-only values.
_.each(C, function (value, key) {
  Object.defineProperty(exports, key, {
    get: function () {
      return value;
    }
  });
});

// Public API
exports.inputPin = inputPin;
exports.outputPin = outputPin;
exports.pin = pin;
