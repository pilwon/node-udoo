/*
 * lib/constant.js
 */

'use strict';

var _ = require('lodash');

exports.PIN_MODE = {
  NONE: 0,
  INPUT: 1,
  OUTPUT: 2
};

exports.PIN_MODE_INVERT = _.invert(exports.PIN_MODE);
