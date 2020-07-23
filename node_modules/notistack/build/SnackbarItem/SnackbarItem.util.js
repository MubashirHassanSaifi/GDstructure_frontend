"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.omitNonCollapseKeys = exports.omitNonMuiKeys = exports.getTransitionDirection = void 0;

var _clsx = _interopRequireDefault(require("clsx"));

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DIRECTION = {
  right: 'left',
  left: 'right',
  bottom: 'up',
  top: 'down'
};

var getTransitionDirection = function getTransitionDirection(anchorOrigin) {
  if (anchorOrigin.horizontal !== 'center') {
    return DIRECTION[anchorOrigin.horizontal];
  }

  return DIRECTION[anchorOrigin.vertical];
};
/**
 * Omit all class keys except those allowed in material-ui snackbar
 */


exports.getTransitionDirection = getTransitionDirection;

var omitNonMuiKeys = function omitNonMuiKeys(classes) {
  var snackbarMuiClasses = Object.keys(classes) // @ts-ignore
  .filter(function (key) {
    return _constants.allClasses.mui[key] !== undefined;
  }).reduce(function (obj, key) {
    return _objectSpread({}, obj, _defineProperty({}, key, classes[key]));
  }, {});
  return _objectSpread({}, snackbarMuiClasses, {
    root: (0, _clsx["default"])(classes.root, classes.wrappedRoot)
  });
};
/**
 * Omit all class keys except what we need for collapse component
 */


exports.omitNonMuiKeys = omitNonMuiKeys;

var omitNonCollapseKeys = function omitNonCollapseKeys(classes, dense) {
  return {
    container: classes.collapseContainer,
    wrapper: (0, _clsx["default"])(classes.collapseWrapper, dense && classes.collapseWrapperDense)
  };
};

exports.omitNonCollapseKeys = omitNonCollapseKeys;