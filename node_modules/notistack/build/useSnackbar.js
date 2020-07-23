"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _SnackbarContext = _interopRequireDefault(require("./SnackbarContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  return (0, _react.useContext)(_SnackbarContext["default"]);
};

exports["default"] = _default;