/*
 * lib/pin.js
 */

'use strict';

var _ = require('lodash');

var C = require('./constant'),
    GPIO = require('./gpio');

//----------------------------------------

function _gpioDirectionForPinMode(pinMode) {
  switch (pinMode) {
  case C.PIN_MODE.INPUT:
    return 'in';
  case C.PIN_MODE.OUTPUT:
    return 'out';
  default:
    return null;
  }
}

function _gpioNumberForPinName(pinName) {
  if (_.isNumber(pinName)) {
    switch (pinName) {
    // TODO
    case 8:
      return 21;
    case 9:
      return 19;
    case 10:
      return 1;
    case 11:
      return 9
    case 12:
      return 3;
    case 13:
      return 40;
    default:
      return null;
    }
  } else if (_.isString(pinName)) {
    switch (pinName.toUpperCase()) {
    // TODO
    case 'PWM8':
      return 21;
    case 'PWM9':
      return 19;
    case 'PWM10':
      return 1;
    case 'PWM11':
      return 9
    case 'PWM12':
      return 3;
    case 'PWM13':
      return 40;
    default:
      return null;
    }
  } else {
    return null;
  }
}

function Pin(name, mode) {
  this._direction = C.PIN_MODE.NONE;
  this._gpio = new GPIO(_gpioNumberForPinName(name));
  this._name = name;
  this._mode = mode;
}

//----------------------------------------

Pin.prototype._ensureDirection = function (cb) {
  if (this._direction) { return cb(); }
  if (this._mode === C.PIN_MODE.NONE) {
    throw new Error('Mode not set for pin ' + this._name);
  }
  this._gpio.writeDirection(_gpioDirectionForPinMode(this._mode), cb);
};

Pin.prototype._ensureDirectionSync = function () {
  if (this._direction) { return; }
  if (this._mode === C.PIN_MODE.NONE) {
    throw new Error('Mode not set for pin ' + this._name);
  }
  return this._gpio.writeDirectionSync(_gpioDirectionForPinMode(this._mode));
};

//----------------------------------------

Pin.prototype.flip = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.readValue(function (err, value) {
      if (err) { return cb(err); }
      self._gpio.writeValue(!value, cb);
    });
  });

  return this;
};

Pin.prototype.flipSync = function () {
  this._ensureDirectionSync();

  return this._gpio.writeValueSync(!this._gpio.readValueSync());
};

//----------------------------------------

Pin.prototype.get = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.readValue(cb);
  });

  return this;
};

Pin.prototype.getSync = function () {
  this._ensureDirectionSync();

  return this._gpio.readValueSync();
};

//----------------------------------------

Pin.prototype.getMode = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.readDirection(cb);
  });

  return this;
};

Pin.prototype.getModeSync = function () {
  this._ensureDirectionSync();

  return this._gpio.readDirectionSync();
};

//----------------------------------------

Pin.prototype.set = function (value, cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.writeValue(value, cb);
  });

  return this;
};

Pin.prototype.setSync = function (value) {
  this._ensureDirectionSync();

  return this._gpio.writeValueSync(value);
};

//----------------------------------------

Pin.prototype.setHigh = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.setValue(true, cb);
  });

  return this;
};

Pin.prototype.setHighSync = function () {
  this._ensureDirectionSync();

  return this._gpio.setValueSync(true);
};

//----------------------------------------

Pin.prototype.setInputMode = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.setDirection(C.PIN_MODE.INPUT, cb);
  });

  return this;
};

Pin.prototype.setInputModeSync = function () {
  this._ensureDirectionSync();

  return this._gpio.setDirectionSync(C.PIN_MODE.INPUT);
};

//----------------------------------------

Pin.prototype.setLow = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.setValue(false, cb);
  });

  return this;
};

Pin.prototype.setLowSync = function () {
  this._ensureDirectionSync();

  return this._gpio.setValueSync(false);
};

//----------------------------------------

Pin.prototype.setOutputMode = function (cb) {
  var self = this;

  self._ensureDirection(function (err) {
    if (err) { return cb(err); }
    self._gpio.setDirection(C.PIN_MODE.OUTPUT);
  });

  return this;
};

Pin.prototype.setOutputModeSync = function () {
  this._ensureDirectionSync();

  return this._gpio.setDirectionSync(C.PIN_MODE.OUTPUT);
};

//----------------------------------------

// Public API
exports = module.exports = Pin;
