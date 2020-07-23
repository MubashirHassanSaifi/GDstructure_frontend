"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyle = (0, _styles.makeStyles)(function (theme) {
  return {
    root: _defineProperty({
      boxSizing: 'border-box',
      display: 'flex',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'fixed',
      flexDirection: 'column',
      zIndex: theme.zIndex.snackbar,
      height: 'auto',
      width: 'auto',
      minWidth: 288,
      transition: theme.transitions.create(['top', 'right', 'bottom', 'left'], {
        easing: 'ease'
      })
    }, theme.breakpoints.down('xs'), {
      left: '0 !important',
      right: '0 !important',
      width: '100%'
    }),
    reverseColumns: {
      flexDirection: 'column-reverse'
    },
    top: {
      top: _constants.SNACKBAR_INDENTS.view["default"] - _constants.SNACKBAR_INDENTS.snackbar["default"]
    },
    topDense: {
      top: _constants.SNACKBAR_INDENTS.view.dense - _constants.SNACKBAR_INDENTS.snackbar.dense
    },
    bottom: {
      bottom: _constants.SNACKBAR_INDENTS.view["default"] - _constants.SNACKBAR_INDENTS.snackbar["default"]
    },
    bottomDense: {
      bottom: _constants.SNACKBAR_INDENTS.view.dense - _constants.SNACKBAR_INDENTS.snackbar.dense
    },
    left: {
      left: _constants.SNACKBAR_INDENTS.view["default"]
    },
    leftDense: {
      left: _constants.SNACKBAR_INDENTS.view.dense
    },
    right: {
      right: _constants.SNACKBAR_INDENTS.view["default"]
    },
    rightDense: {
      right: _constants.SNACKBAR_INDENTS.view.dense
    },
    center: _defineProperty({}, theme.breakpoints.up('md'), {
      left: '50%',
      transform: 'translateX(-50%)'
    })
  };
});

var SnackbarContainer = function SnackbarContainer(props) {
  var classes = useStyle();

  var className = props.className,
      anchorOrigin = props.anchorOrigin,
      dense = props.dense,
      other = _objectWithoutProperties(props, ["className", "anchorOrigin", "dense"]);

  var combinedClassname = (0, _clsx["default"])(classes.root, classes[anchorOrigin.vertical], classes[anchorOrigin.horizontal], // @ts-ignore
  classes["".concat(anchorOrigin.vertical).concat(dense ? 'Dense' : '')], // @ts-ignore
  classes["".concat(anchorOrigin.horizontal).concat(dense ? 'Dense' : '')], className, anchorOrigin.vertical === 'bottom' && classes.reverseColumns);
  return _react["default"].createElement("div", _extends({
    className: combinedClassname
  }, other));
};

var _default = _react["default"].memo(SnackbarContainer);

exports["default"] = _default;