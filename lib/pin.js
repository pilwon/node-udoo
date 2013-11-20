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
  if (_.isString(pinName)) {
    pinName = pinName.toUpperCase();
  }

  switch (pinName) {
  // TODO: map all pins.
  case 8:
  case 'PWM8':
    return 21;
  case 9:
  case 'PWM9':
    return 19;
  case 10:
  case 'PWM10':
    return 1;
  case 11:
  case 'PWM11':
    return 9
  case 12:
  case 'PWM12':
    return 3;
  case 13:
  case 'PWM13':
    return 40;
  default:
    return null;
  }
}

function Pin(name, mode) {
  this._isDirectionSet = false;
  this._gpio = new GPIO(_gpioNumberForPinName(name));
  this._name = name;
  this._mode = mode;
}

//----------------------------------------

Pin.prototype._ensureDirection = function (cb) {
  var self = this;

  if (self._isDirectionSet) { return cb(); }

  if (self._mode === C.PIN_MODE.NONE) {
    return cb(new Error('Mode not set for pin ' + self._name));
  }

  self._gpio.writeDirection(_gpioDirectionForPinMode(self._mode), function (err) {
    if (err) { return cb(err); }
    self._isDirectionSet = true;
    cb();
  });
};

Pin.prototype._ensureDirectionSync = function () {
  if (this._isDirectionSet) { return; }

  if (this._mode === C.PIN_MODE.NONE) {
    throw new Error('Mode not set for pin ' + this._name);
  }

  var result = this._gpio.writeDirectionSync(_gpioDirectionForPinMode(this._mode));

  this._isDirectionSet = true;

  return result;
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

  self._gpio.writeDirection(C.PIN_MODE.INPUT, function (err) {
    if (err) { return cb(err); }

    self._isDirectionSet = true;
    self._mode = C.PIN_MODE.INPUT;

    cb();
  });

  return this;
};

Pin.prototype.setInputModeSync = function () {
  var result = this._gpio.writeDirectionSync(C.PIN_MODE.INPUT);

  this._isDirectionSet = true;
  this._mode = C.PIN_MODE.INPUT;

  return result;
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

  self._gpio.writeDirection(C.PIN_MODE.OUTPUT, function (err) {
    if (err) { return cb(err); }

    self._isDirectionSet = true;
    self._mode = C.PIN_MODE.OUTPUT;

    cb();
  });

  return this;
};

Pin.prototype.setOutputModeSync = function () {
  var result = this._gpio.writeDirectionSync(C.PIN_MODE.OUTPUT);

  this._isDirectionSet = true;
  this._mode = C.PIN_MODE.OUTPUT;

  return result;
};

//----------------------------------------

// Public API
exports = module.exports = Pin;
