"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _getDisplayName = _interopRequireDefault(require("./utils/getDisplayName"));

var _SnackbarContext = _interopRequireDefault(require("./SnackbarContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var withSnackbar = function withSnackbar(Component) {
  var WrappedComponent = _react["default"].forwardRef(function (props, ref) {
    return _react["default"].createElement(_SnackbarContext["default"].Consumer, null, function (context) {
      return _react["default"].createElement(Component, _extends({}, props, {
        ref: ref,
        enqueueSnackbar: context.enqueueSnackbar,
        closeSnackbar: context.closeSnackbar
      }));
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    WrappedComponent.displayName = "WithSnackbar(".concat((0, _getDisplayName["default"])(Component), ")");
  }

  (0, _hoistNonReactStatics["default"])(WrappedComponent, Component);
  return WrappedComponent;
};

var _default = withSnackbar;
exports["default"] = _default;