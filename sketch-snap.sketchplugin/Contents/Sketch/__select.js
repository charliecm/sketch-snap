var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/select.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/select.js":
/*!***********************!*\
  !*** ./src/select.js ***!
  \***********************/
/*! exports provided: selectAbove, selectBelow, selectLeft, selectRight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAbove", function() { return selectAbove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectBelow", function() { return selectBelow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLeft", function() { return selectLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRight", function() { return selectRight; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/**
 * Select
 */



function select(direction) {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Document.getSelectedDocument();
  var selection = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getSingleSelection"])();
  if (!selection) return; // Get layers

  var _getSettings = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getSettings"])(),
      userContext = _getSettings.context,
      ignoreHidden = _getSettings.ignoreHidden,
      ignoreLocked = _getSettings.ignoreLocked;

  var context = selection.type === "Artboard" ? doc.selectedPage : userContext === "artboard" ? Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getArtboard"])(selection) : selection.parent;

  var _getLayers = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getLayers"])(direction, selection, context, ignoreHidden, ignoreLocked),
      layers = _getLayers.layers; // Check layers


  var directionText = direction === "above" || direction === "below" ? direction : direction === "left" ? "left of" : "right of";

  if (layers.length === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\u26A0\uFE0F There are no layers ".concat(directionText, " '").concat(selection.name, "' to select."));
    return;
  } // Select layers


  doc.selectedLayers = layers;
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\u2705 Selected ".concat(layers.length, " layer").concat(layers.length > 1 ? "s" : "", " ").concat(directionText, " '").concat(selection.name, "'."));
}

function selectAbove() {
  select("above");
}
function selectBelow() {
  select("below");
}
function selectLeft() {
  select("left");
}
function selectRight() {
  select("right");
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getSettings, getSingleSelection, getArtboard, getParentIds, getLayers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSingleSelection", function() { return getSingleSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArtboard", function() { return getArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentIds", function() { return getParentIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayers", function() { return getLayers; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Utilities
 */



function getSettings() {
  var context = sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.settingForKey("context");
  var ignoreHidden = sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.settingForKey("ignoreHidden");
  var ignoreLocked = sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.settingForKey("ignoreLocked");
  context = context === "group" ? context : "artboard";
  ignoreHidden = ignoreHidden ? true : false;
  ignoreLocked = ignoreLocked ? true : false;
  sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSettingForKey("context", context);
  sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSettingForKey("ignoreHidden", ignoreHidden);
  sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSettingForKey("ignoreLocked", ignoreLocked);
  return {
    context: context,
    ignoreHidden: ignoreHidden,
    ignoreLocked: ignoreLocked
  };
}

function getSingleSelection() {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Document.getSelectedDocument();
  var selections = doc.selectedLayers;

  if (selections.isEmpty) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("⚠️ Please select a layer or artboard.");
    return null;
  } else if (selections.length !== 1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("⚠️ Please select only one layer or artboard.");
    return null;
  }

  return selections.layers[0];
}

function getArtboard(layer) {
  if (layer.type === "Artboard") {
    return layer;
  } else if (layer.parent) {
    return getArtboard(layer.parent);
  }

  return null;
}

function getParentIds(layer, parents) {
  parents = parents || [];
  if (!layer.parent) return parents;
  parents.push(layer.parent.id);
  return getParentIds(layer.parent, parents);
}

function getLayers(direction, target, context, ignoreHidden, ignoreLocked, targetFrame, targetParentIds, layer, output) {
  output = output || {
    layers: [],
    position: direction === "above" || direction === "left" ? -Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER
  };
  targetFrame = targetFrame || target.frame.changeBasis({
    from: target.parent,
    to: context
  });
  targetParentIds = targetParentIds || getParentIds(target);
  layer = !layer && target.type === "Artboard" ?
  /* If target is an artboard, start from page */
  target.parent : layer || context;
  if (layer.id === target.id) return output; // Determine if layer is in region

  var frame = layer.frame.changeBasis({
    from: layer.type === "Page" ?
    /* Use page coordinate space */
    layer : layer.parent,
    to: context
  });
  var position = 0;
  var isInRegion = false;

  if (direction === "above") {
    // Layer is above target's bottom edge
    position = frame.y + frame.height;
    isInRegion = position <= targetFrame.y + targetFrame.height;
  } else if (direction === "below") {
    // Layer is below target's top edge
    position = frame.y;
    isInRegion = position >= targetFrame.y;
  } else if (direction === "left") {
    // Layer is left of target's right edge
    position = frame.x + frame.width;
    isInRegion = position <= targetFrame.x + targetFrame.width;
  } else {
    // Layer is right of target's left edge
    position = frame.x;
    isInRegion = position >= targetFrame.x;
  }

  var isIgnored = ignoreHidden && layer.hidden || ignoreLocked && layer.locked;

  if (!targetParentIds.includes(layer.id) && !isIgnored && isInRegion) {
    // Add to list
    output.layers.push(layer);
    output.position = direction === "above" || direction === "left" ? Math.max(output.position, position) : Math.min(output.position, position);
  } else if (!isIgnored) {
    // Traverse child layers
    var children = layer.layers;

    if (children && children.length) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          output = getLayers(direction, target, context, ignoreHidden, ignoreLocked, targetFrame, targetParentIds, child, output);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  return output;
}



/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['selectAbove'] = __skpm_run.bind(this, 'selectAbove');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['selectBelow'] = __skpm_run.bind(this, 'selectBelow');
globalThis['selectLeft'] = __skpm_run.bind(this, 'selectLeft');
globalThis['selectRight'] = __skpm_run.bind(this, 'selectRight')

//# sourceMappingURL=__select.js.map