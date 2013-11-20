/*
 * lib/index.js
 */

'use strict';

var _ = require('lodash');

var C = require('./constant'),
    Pin = require('./pin');

function inputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C.PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.INPUT);
}

function outputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C.PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.OUTPUT);
}

// Public API
exports.inputPin = inputPin;
exports.outputPin = outputPin;

// Export constants as read-only values.
_.each(C, function (value, key) {
  Object.defineProperty(exports, key, {
    get: function () {
      return value;
    }
  });
});
