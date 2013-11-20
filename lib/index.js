/*
 * lib/index.js
 */

'use strict';

var fs = require('fs'),
    util = require('util');

var _ = require('lodash'),
    async = require('async');

var C = require('./constant'),
    Pin = require('./pin');

function inputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C._PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.INPUT);
}

function outputPin(name) {
  if (_.isString(name)) { name = name.toUpperCase(); }

  if (!_.has(C._PIN_MAPPING, name)) {
    throw new Error('Invalid pin name - ' + name);
  }

  return new Pin(name, C.PIN_MODE.OUTPUT);
}

function reset(cb) {
  async.map(_.uniq(_.values(C._PIN_MAPPING)), function (gpioNumber, cb) {
    fs.writeFile(
      util.format(C.PATH.FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT,
      cb
    );
  }, cb);

  return exports;
}

function resetSync() {
  _.uniq(_.values(C._PIN_MAPPING)).forEach(function (gpioNumber) {
    fs.writeFileSync(
      util.format(C.PATH_FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT
    );
  });

  return exports;
}

// Public API
exports.inputPin = inputPin;
exports.outputPin = outputPin;
exports.reset = reset;
exports.resetSync = resetSync;

// Export constants as read-only values.
_.each(C, function (value, key) {
  if (key[0] === '_') { return; }
  Object.defineProperty(exports, key, {
    get: function () {
      return value;
    }
  });
});
