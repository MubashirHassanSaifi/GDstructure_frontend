"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _SnackbarContext = _interopRequireDefault(require("./SnackbarContext"));

var _constants = require("./utils/constants");

var _SnackbarItem = _interopRequireDefault(require("./SnackbarItem"));

var _SnackbarContainer = _interopRequireDefault(require("./SnackbarContainer"));

var _warning = _interopRequireDefault(require("./utils/warning"));

var _defaultIconVariants = _interopRequireDefault(require("./utils/defaultIconVariants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SnackbarProvider = /*#__PURE__*/function (_Component) {
  _inherits(SnackbarProvider, _Component);

  function SnackbarProvider(props) {
    var _this;

    _classCallCheck(this, SnackbarProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SnackbarProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "enqueueSnackbar", function (message) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key = _ref.key,
          preventDuplicate = _ref.preventDuplicate,
          options = _objectWithoutProperties(_ref, ["key", "preventDuplicate"]);

      var hasSpecifiedKey = key || key === 0;
      var id = hasSpecifiedKey ? key : new Date().getTime() + Math.random();

      var snack = _objectSpread({
        key: id
      }, options, {
        message: message,
        open: true,
        entered: false,
        requestClose: false,
        variant: options.variant || _this.props.variant || 'default',
        autoHideDuration: options.autoHideDuration || _this.props.autoHideDuration || 5000,
        anchorOrigin: options.anchorOrigin || _this.props.anchorOrigin || {
          vertical: 'bottom',
          horizontal: 'left'
        }
      });

      if (options.persist) {
        snack.autoHideDuration = undefined;
      }

      _this.setState(function (state) {
        if (preventDuplicate === undefined && _this.props.preventDuplicate || preventDuplicate) {
          var compareFunction = function compareFunction(item) {
            return hasSpecifiedKey ? item.key === key : item.message === message;
          };

          var inQueue = state.queue.findIndex(compareFunction) > -1;
          var inView = state.snacks.findIndex(compareFunction) > -1;

          if (inQueue || inView) {
            return state;
          }
        }

        return _this.handleDisplaySnack(_objectSpread({}, state, {
          queue: [].concat(_toConsumableArray(state.queue), [snack])
        }));
      });

      return id;
    });

    _defineProperty(_assertThisInitialized(_this), "handleDisplaySnack", function (state) {
      var snacks = state.snacks;

      if (snacks.length >= _this.maxSnack) {
        return _this.handleDismissOldest(state);
      }

      return _this.processQueue(state);
    });

    _defineProperty(_assertThisInitialized(_this), "processQueue", function (state) {
      var queue = state.queue,
          snacks = state.snacks;

      if (queue.length > 0) {
        return _objectSpread({}, state, {
          snacks: [].concat(_toConsumableArray(snacks), [queue[0]]),
          queue: queue.slice(1, queue.length)
        });
      }

      return state;
    });

    _defineProperty(_assertThisInitialized(_this), "handleDismissOldest", function (state) {
      if (state.snacks.some(function (item) {
        return !item.open || item.requestClose;
      })) {
        return state;
      }

      var popped = false;
      var ignore = false;
      var persistentCount = state.snacks.reduce(function (acc, current) {
        return acc + (current.open && current.persist ? 1 : 0);
      }, 0);

      if (persistentCount === _this.maxSnack) {
        (0, _warning["default"])(_constants.MESSAGES.NO_PERSIST_ALL);
        ignore = true;
      }

      var snacks = state.snacks.map(function (item) {
        if (!popped && (!item.persist || ignore)) {
          popped = true;

          if (!item.entered) {
            return _objectSpread({}, item, {
              requestClose: true
            });
          }

          if (item.onClose) item.onClose(null, _constants.REASONS.MAXSNACK, item.key);
          if (_this.props.onClose) _this.props.onClose(null, _constants.REASONS.MAXSNACK, item.key);
          return _objectSpread({}, item, {
            open: false
          });
        }

        return _objectSpread({}, item);
      });
      return _objectSpread({}, state, {
        snacks: snacks
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnteredSnack", function (node, isAppearing, key) {
      if (_this.props.onEntered) {
        _this.props.onEntered(node, isAppearing, key);
      }

      _this.setState(function (_ref2) {
        var snacks = _ref2.snacks;
        return {
          snacks: snacks.map(function (item) {
            return item.key === key ? _objectSpread({}, item, {
              entered: true
            }) : _objectSpread({}, item);
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCloseSnack", function (event, reason, key) {
      if (_this.props.onClose) {
        _this.props.onClose(event, reason, key);
      }

      if (reason === _constants.REASONS.CLICKAWAY) return;
      var shouldCloseAll = key === undefined;

      _this.setState(function (_ref3) {
        var snacks = _ref3.snacks,
            queue = _ref3.queue;
        return {
          snacks: snacks.map(function (item) {
            if (!shouldCloseAll && item.key !== key) {
              return _objectSpread({}, item);
            }

            return item.entered ? _objectSpread({}, item, {
              open: false
            }) : _objectSpread({}, item, {
              requestClose: true
            });
          }),
          queue: queue.filter(function (item) {
            return item.key !== key;
          }) // eslint-disable-line react/no-unused-state

        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeSnackbar", function (key) {
      // call individual snackbar onClose callback passed through options parameter
      var toBeClosed = _this.state.snacks.find(function (item) {
        return item.key === key;
      });

      if (key && toBeClosed && toBeClosed.onClose) {
        toBeClosed.onClose(null, _constants.REASONS.INSTRUCTED, key);
      }

      _this.handleCloseSnack(null, _constants.REASONS.INSTRUCTED, key);
    });

    _defineProperty(_assertThisInitialized(_this), "handleExitedSnack", function (event, key) {
      _this.setState(function (state) {
        var newState = _this.processQueue(_objectSpread({}, state, {
          snacks: state.snacks.filter(function (item) {
            return item.key !== key;
          })
        }));

        if (newState.queue.length === 0) {
          return newState;
        }

        return _this.handleDismissOldest(newState);
      });

      if (_this.props.onExited) {
        _this.props.onExited(event, key);
      }
    });

    _this.state = {
      snacks: [],
      queue: [],
      // eslint-disable-line react/no-unused-state
      contextValue: {
        enqueueSnackbar: _this.enqueueSnackbar,
        closeSnackbar: _this.closeSnackbar
      }
    };
    return _this;
  }

  _createClass(SnackbarProvider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var contextValue = this.state.contextValue;

      var _this$props = this.props,
          variant = _this$props.variant,
          maxSnack = _this$props.maxSnack,
          anchorOrigin = _this$props.anchorOrigin,
          preventDuplicate = _this$props.preventDuplicate,
          domRoot = _this$props.domRoot,
          children = _this$props.children,
          _this$props$classes = _this$props.classes,
          classes = _this$props$classes === void 0 ? {} : _this$props$classes,
          _this$props$dense = _this$props.dense,
          dense = _this$props$dense === void 0 ? false : _this$props$dense,
          _this$props$hideIconV = _this$props.hideIconVariant,
          hideIconVariant = _this$props$hideIconV === void 0 ? false : _this$props$hideIconV,
          props = _objectWithoutProperties(_this$props, ["variant", "maxSnack", "anchorOrigin", "preventDuplicate", "domRoot", "children", "classes", "dense", "hideIconVariant"]);

      var categ = this.state.snacks.reduce(function (acc, current) {
        var category = (0, _constants.originKeyExtractor)(current.anchorOrigin);
        var existingOfCategory = acc[category] || [];
        return _objectSpread({}, acc, _defineProperty({}, category, [].concat(_toConsumableArray(existingOfCategory), [current])));
      }, {});

      var iconVariant = _objectSpread({}, _defaultIconVariants["default"], {}, this.props.iconVariant);

      var snackbars = Object.entries(categ).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            origin = _ref5[0],
            snacks = _ref5[1];

        return _react["default"].createElement(_SnackbarContainer["default"], {
          key: origin,
          dense: dense,
          anchorOrigin: snacks[0].anchorOrigin,
          className: classes["containerAnchorOrigin".concat(origin)]
        }, snacks.map(function (snack) {
          return _react["default"].createElement(_SnackbarItem["default"], _extends({}, props, {
            key: snack.key,
            dense: dense,
            snack: snack,
            hideIconVariant: hideIconVariant,
            iconVariant: iconVariant,
            classes: (0, _constants.omitContainerKeys)(classes),
            onClose: _this2.handleCloseSnack,
            onExited: _this2.handleExitedSnack,
            onEntered: _this2.handleEnteredSnack
          }));
        }));
      });
      return _react["default"].createElement(_SnackbarContext["default"].Provider, {
        value: contextValue
      }, children, domRoot ? (0, _reactDom.createPortal)(snackbars, domRoot) : snackbars);
    }
  }, {
    key: "maxSnack",
    get: function get() {
      return this.props.maxSnack || 3;
    }
    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     */

  }]);

  return SnackbarProvider;
}(_react.Component);

var _default = SnackbarProvider;
exports["default"] = _default;