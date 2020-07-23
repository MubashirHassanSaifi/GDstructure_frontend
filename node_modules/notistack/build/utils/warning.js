"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable */
var __DEV__ = process.env.NODE_ENV !== 'production';

var _default = function _default(message) {
  if (!__DEV__) return;

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}

  ;
};

exports["default"] = _default;