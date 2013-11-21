/*
 * lib/index.js
 */

'use strict';

var fs = require('fs'),
    util = require('util');

var _ = require('lodash'),
    Q = require('q'),
    async = require('async');

var C = require('./constant'),
    Pin = require('./pin');

var _resetted = false;

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
  var dfd = Q.defer();

  async.map(_.uniq(_.values(C._PIN_MAPPING)), function (gpioNumber, cb) {
    fs.writeFile(
      util.format(C._PATH_FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT,
      cb
    );
  }, function (err) {
    if (err) {
      if (_.isFunction(cb)) { cb(err); }
      return dfd.reject(err);
    }
    _resetted = true;
    if (_.isFunction(cb)) { cb(); }
    dfd.resolve();
  });

  return dfd.promise;
}

function resetSync() {
  _.uniq(_.values(C._PIN_MAPPING)).forEach(function (gpioNumber) {
    fs.writeFileSync(
      util.format(C._PATH_FORMAT.DIRECTION, gpioNumber),
      C.PIN_MODE.INPUT
    );
  });
  _resetted = true;
}

process.on('exit', function () {
  if (_resetted) {
    resetSync();
  }
});

// Public API
exports.inputPin = inputPin;
exports.outputPin = outputPin;
exports.reset = reset;
exports.resetSync = resetSync;

// Export constants as read-only values.
_.each(C, function (val, key) {
  if (key[0] === '_') { return; }
  Object.defineProperty(exports, key, {
    get: function () {
      return val;
    }
  });
});

// Export dependencies.
_.each({
  _: require('lodash'),
  Q: require('q'),
  async : require('async')
}, function (val, key) {
  Object.defineProperty(exports, key, {
    get: function () {
      return val;
    }
  });
});
