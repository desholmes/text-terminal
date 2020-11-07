// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(prompt, separator) {
  return "\n  <div class=\"container\">\n    <output></output>\n    <div class=\"command\">\n      <div class=\"prompt\">".concat(prompt).concat(separator, "</div>\n      <input class=\"input\" spellcheck=\"false\" autofocus />\n    </div>\n  </div>\n");
};

exports.default = _default;
},{}],"../package.json":[function(require,module,exports) {
module.exports = {
  "name": "text-term",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "parcel ./src/index.html",
    "build": "parcel build ./src/index.html"
  },
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "parcel-bundler": "^1.12.4",
    "sass": "^1.28.0"
  }
};
},{}],"modules/defaultCommands.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  clear: function clear(terminal) {
    return terminal.clear();
  },
  version: function version(terminal) {
    return terminal.output("Text Terminal v".concat(_package.default.version));
  }
};
exports.default = _default;
},{"../../package.json":"../package.json"}],"modules/cloneCommandEl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(el) {
  var line = el.cloneNode(true);
  var input = line.querySelector('.input');
  input.autofocus = false;
  input.readOnly = true;
  input.insertAdjacentHTML('beforebegin', input.value);
  input.parentNode.removeChild(input);
  line.classList.add('line');
  return line;
};

exports.default = _default;
},{}],"modules/textTerminal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _template = _interopRequireDefault(require("./template"));

var _defaultCommands = require("./defaultCommands");

var _cloneCommandEl = _interopRequireDefault(require("./cloneCommandEl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _id = new WeakMap();

var _dom = new WeakMap();

var TextTerminal = /*#__PURE__*/function () {
  function TextTerminal() {
    var _this = this;

    var configProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TextTerminal);

    _id.set(this, {
      writable: true,
      value: "TextTerminal"
    });

    _dom.set(this, {
      writable: true,
      value: {}
    });

    _defineProperty(this, "commands", {});

    _defineProperty(this, "history", []);

    _defineProperty(this, "historyCursor", 0);

    _defineProperty(this, "prompt", void 0);

    _defineProperty(this, "separator", void 0);

    _defineProperty(this, "theme", void 0);

    _defineProperty(this, "welcome", void 0);

    _defineProperty(this, "onKeyDown", function (event) {
      var commandInput = _classPrivateFieldGet(_this, _dom).input.value.trim();

      if (event.keyCode !== 13 || !commandInput) {
        return;
      }

      var _commandInput$split = commandInput.split(" "),
          _commandInput$split2 = _toArray(_commandInput$split),
          command = _commandInput$split2[0],
          parameters = _commandInput$split2.slice(1); // if (state.prompt) {
      //   state.prompt = false;
      //   this.onAskCallback(command);
      //   this.setPrompt();
      //   this.resetCommand();
      //   return;
      // }
      // Add commands to history


      _this.history.push(commandInput);

      localStorage[_classPrivateFieldGet(_this, _id)] = JSON.stringify(_this.history);
      _this.historyCursor = _this.history.length; // Clone command as a new output line

      _classPrivateFieldGet(_this, _dom).output.appendChild((0, _cloneCommandEl.default)(_classPrivateFieldGet(_this, _dom).command));

      _classPrivateFieldGet(_this, _dom).input.value = ""; // Dispatch command

      if (Object.keys(_this.commands).includes(command)) {
        var callback = _this.commands[command];

        if (callback) {
          callback(_this, parameters);
        } // if (onInputCallback) {
        //   onInputCallback(command, parameters);
        // }

      } else {
        _this.output("<u>".concat(command, "</u>: command not found."));
      }
    });

    _defineProperty(this, "onKeyUp", function (event) {
      _classPrivateFieldGet(_this, _dom).input.focus();

      event.stopPropagation();
      event.preventDefault(); // ESC

      if (event.keyCode === 27) {
        _classPrivateFieldGet(_this, _dom).input.value = "";
        event.stopPropagation();
        event.preventDefault();
      }

      if (event.keyCode === 38 || event.keyCode === 40) {
        // UP key
        if (event.keyCode === 38 && _this.historyCursor > 0) {
          _this.historyCursor -= 1;
        } // DOWN key


        if (event.keyCode === 40 && _this.historyCursor < _this.history.length - 1) {
          _this.historyCursor -= 1;
        }

        if (_this.history[_this.historyCursor]) {
          _classPrivateFieldGet(_this, _dom).input.value = _this.history[_this.historyCursor];
        }
      }
    });

    _defineProperty(this, "resetCommand", function () {
      _classPrivateFieldGet(_this, _dom).input.value = "";

      _classPrivateFieldGet(_this, _dom).command.classList.remove("input"); // DOM.command.classList.remove('hidden');


      if (_classPrivateFieldGet(_this, _dom).input.scrollIntoView) {
        _classPrivateFieldGet(_this, _dom).input.scrollIntoView();
      }
    });

    var _configProps$containe = configProps.containerId,
        containerId = _configProps$containe === void 0 ? "text-terminal" : _configProps$containe,
        _configProps$commands = configProps.commands,
        commands = _configProps$commands === void 0 ? {} : _configProps$commands,
        _configProps$prompt = configProps.prompt,
        prompt = _configProps$prompt === void 0 ? "" : _configProps$prompt,
        _configProps$theme = configProps.theme,
        theme = _configProps$theme === void 0 ? "dark" : _configProps$theme,
        _configProps$welcome = configProps.welcome,
        welcome = _configProps$welcome === void 0 ? "Welcome!" : _configProps$welcome,
        _configProps$separato = configProps.separator,
        separator = _configProps$separato === void 0 ? ":" : _configProps$separato;
    var containerEl = document.getElementById(containerId);

    if (!containerEl) {
      throw Error("Container #".concat(containerId, " does not exist!"));
    }

    this.commands = Object.assign({}, commands, _defaultCommands.defaultCommands);
    this.history = localStorage[_classPrivateFieldGet(this, _id)] ? JSON.parse(localStorage[_classPrivateFieldGet(this, _id)]) : [];
    this.historyCursor = this.history.length;
    this.prompt = prompt;
    this.separator = separator;
    this.theme = theme;
    this.welcome = welcome;
    this.createDom(containerEl);
    this.addListeners();
    if (this.welcome) this.output(this.welcome);
  }

  _createClass(TextTerminal, [{
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      _classPrivateFieldGet(this, _dom).output.addEventListener("DOMSubtreeModified", function () {
        setTimeout(function () {
          return _classPrivateFieldGet(_this2, _dom).input.scrollIntoView();
        }, 10);
      }, false);

      if (window) {
        window.addEventListener("click", function () {
          return _classPrivateFieldGet(_this2, _dom).input.focus();
        }, false);
      }

      _classPrivateFieldGet(this, _dom).output.addEventListener("click", function (event) {
        return event.stopPropagation();
      }, false);

      _classPrivateFieldGet(this, _dom).command.addEventListener("click", function () {
        return _classPrivateFieldGet(_this2, _dom).input.focus();
      }, false);

      _classPrivateFieldGet(this, _dom).input.addEventListener("keyup", this.onKeyUp, false);

      _classPrivateFieldGet(this, _dom).input.addEventListener("keydown", this.onKeyDown, false);
    }
  }, {
    key: "createDom",
    value: function createDom(containerEl) {
      containerEl.classList.add(_classPrivateFieldGet(this, _id));
      containerEl.insertAdjacentHTML("beforeEnd", (0, _template.default)(this.prompt, this.separator));
      document.querySelector("body").classList.add(this.theme);

      _classPrivateFieldSet(this, _dom, {
        container: containerEl.querySelector(".container"),
        output: containerEl.querySelector("output"),
        command: containerEl.querySelector(".command"),
        input: containerEl.querySelector(".command .input"),
        prompt: containerEl.querySelector(".command .prompt")
      });
    }
  }, {
    key: "output",
    value: function output() {
      var command = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "&nbsp;";

      _classPrivateFieldGet(this, _dom).output.insertAdjacentHTML("beforeEnd", "<span>".concat(command, "</span>"));

      this.resetCommand();
    }
  }]);

  return TextTerminal;
}();

if (window) {
  window.TextTerminal = TextTerminal;
}

var _default = TextTerminal;
exports.default = _default;
},{"./template":"modules/template.js","./defaultCommands":"modules/defaultCommands.js","./cloneCommandEl":"modules/cloneCommandEl.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _textTerminal = _interopRequireDefault(require("./modules/textTerminal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  prompt: "Bash",
  theme: "sunset"
};
var terminal = new _textTerminal.default(config);
},{"./modules/textTerminal":"modules/textTerminal.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55863" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map