'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Component dependencies.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @private
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * The NewWindow class object.
 * @public
 */

var NewWindow = function (_React$PureComponent) {
  _inherits(NewWindow, _React$PureComponent);

  /**
   * The NewWindow function constructor.
   * @param {Object} props
   */
  function NewWindow(props) {
    _classCallCheck(this, NewWindow);

    var _this = _possibleConstructorReturn(this, (NewWindow.__proto__ || Object.getPrototypeOf(NewWindow)).call(this, props));

    _this.container = document.createElement('div');
    _this.window = null;
    _this.windowCheckerInterval = null;
    _this.released = false;
    _this.state = {
      mounted: false
    };
    return _this;
  }

  /**
   * Render the NewWindow component.
   */

  /**
   * NewWindow default props.
   */


  _createClass(NewWindow, [{
    key: 'render',
    value: function render() {
      if (!this.state.mounted) return null;
      return _reactDom2.default.createPortal(this.props.children, this.container);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.openChild();
      this.setState({ mounted: true });
    }

    /**
     * Create the new window when NewWindow component mount.
     */

  }, {
    key: 'openChild',
    value: function openChild() {
      var _this2 = this;

      var _props = this.props,
          url = _props.url,
          title = _props.title,
          name = _props.name,
          features = _props.features,
          onBlock = _props.onBlock,
          center = _props.center;

      // Prepare position of the new window to be centered against the 'parent' window or 'screen'.

      if (typeof center === 'string' && (features.width === undefined || features.height === undefined)) {
        console.warn('width and height window features must be present when a center prop is provided');
      } else if (center === 'parent') {
        features.left = window.top.outerWidth / 2 + window.top.screenX - features.width / 2;
        features.top = window.top.outerHeight / 2 + window.top.screenY - features.height / 2;
      } else if (center === 'screen') {
        var screenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var screenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        features.left = width / 2 - features.width / 2 + screenLeft;
        features.top = height / 2 - features.height / 2 + screenTop;
      }

      // Open a new window.
      this.window = window.open(url, name, toWindowFeatures(features));

      // When a new window use content from a cross-origin there's no way we can attach event
      // to it. Therefore, we need to detect in a interval when the new window was destroyed
      // or was closed.
      this.windowCheckerInterval = setInterval(function () {
        if (!_this2.window || _this2.window.closed) {
          _this2.release();
        }
      }, 50);

      // Check if the new window was succesfully opened.
      if (this.window) {
        this.window.document.title = title;
        this.window.document.body.appendChild(this.container);

        // If specified, copy styles from parent window's document.
        if (this.props.copyStyles) {
          setTimeout(function () {
            return copyStyles(document, _this2.window.document);
          }, 0);
        }

        // Release anything bound to this component before the new window unload.
        this.window.addEventListener('beforeunload', function () {
          return _this2.release();
        });
      } else {
        // Handle error on opening of new window.
        if (typeof onBlock === 'function') {
          onBlock.call(null);
        } else {
          console.warn('A new window could not be opened. Maybe it was blocked.');
        }
      }
    }

    /**
     * Close the opened window (if any) when NewWindow will unmount.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.window) {
        this.window.close();
      }
    }

    /**
     * Release the new window and anything that was bound to it.
     */

  }, {
    key: 'release',
    value: function release() {
      // This method can be called once.
      if (this.released) {
        return;
      }
      this.released = true;

      // Remove checker interval.
      clearInterval(this.windowCheckerInterval);

      // Call any function bound to the `onUnload` prop.
      var onUnload = this.props.onUnload;


      if (typeof onUnload === 'function') {
        onUnload.call(null);
      }
    }
  }]);

  return NewWindow;
}(_react2.default.PureComponent);

NewWindow.defaultProps = {
  url: '',
  name: '',
  title: '',
  features: { width: '600px', height: '640px' },
  onBlock: null,
  onUnload: null,
  center: 'parent',
  copyStyles: true };


NewWindow.propTypes = {
  children: _propTypes2.default.node,
  url: _propTypes2.default.string,
  name: _propTypes2.default.string,
  title: _propTypes2.default.string,
  features: _propTypes2.default.object,
  onUnload: _propTypes2.default.func,
  onBlock: _propTypes2.default.func,
  center: _propTypes2.default.oneOf(['parent', 'screen']),
  copyStyles: _propTypes2.default.bool

  /**
   * Utility functions.
   * @private
   */

  /**
   * Copy styles from a source document to a target.
   * @param {Object} source
   * @param {Object} target
   * @private
   */

};function copyStyles(source, target) {
  Array.from(source.styleSheets).forEach(function (styleSheet) {
    // For <style> elements
    var rules = void 0;
    try {
      rules = styleSheet.cssRules;
    } catch (err) {
      console.error(err);
    }
    if (rules) {
      var newStyleEl = source.createElement('style');

      // Write the text of each rule into the body of the style element
      Array.from(styleSheet.cssRules).forEach(function (cssRule) {
        var cssText = cssRule.cssText,
            type = cssRule.type;

        var returnText = cssText;
        // Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5) to handle local imports on a about:blank page
        // '/custom.css' turns to 'http://my-site.com/custom.css'
        if ([3, 5].includes(type)) {
          returnText = cssText.split('url(').map(function (line) {
            if (line[1] === '/') {
              return '' + line.slice(0, 1) + window.location.origin + line.slice(1);
            }
            return line;
          }).join('url(');
        }
        newStyleEl.appendChild(source.createTextNode(returnText));
      });

      target.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      var newLinkEl = source.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      target.head.appendChild(newLinkEl);
    }
  });
}

/**
 * Convert features props to window features format (name=value,other=value).
 * @param {Object} obj
 * @return {String}
 * @private
 */

function toWindowFeatures(obj) {
  return Object.keys(obj).reduce(function (features, name) {
    var value = obj[name];
    if (typeof value === 'boolean') {
      features.push(name + '=' + (value ? 'yes' : 'no'));
    } else {
      features.push(name + '=' + value);
    }
    return features;
  }, []).join(',');
}

/**
 * Component export.
 * @private
 */

exports.default = NewWindow;