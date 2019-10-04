"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Cursor;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Cursor(attrs) {
  this.id = attrs.id || "js-cursor";
  this.hovers = attrs.hovers || null;
  this.cursor = attrs.cursor === false ? false : true;
}

Cursor.prototype.create = function () {
  var cursor = document.createElement("div");
  var parent = document.getElementsByTagName("body")[0];
  var html = document.getElementsByTagName("html")[0];
  cursor.setAttribute("id", this.id);
  cursor.setAttribute("class", this.id);
  cursor.style = "position: absolute; pointer-events: none;";
  parent.append(cursor);
  if (!this.cursor) html.style.cursor = "none";
};

Cursor.prototype.status = function () {
  document.addEventListener("mousemove", this.moving.bind(this));
  if (this.hovers === null) return;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this.hovers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var hover = _step.value;

      var targets = _toConsumableArray(document.querySelectorAll(hover));

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = targets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var target = _step2.value;
          target.addEventListener("mouseover", this.hover.bind(this, target, hover));
          target.addEventListener("mouseleave", this.leave.bind(this, target, hover));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

Cursor.prototype.moving = function () {
  var cursor = document.getElementById(this.id);
  var _event = event,
      pageX = _event.pageX,
      pageY = _event.pageY;
  var posX = "".concat(pageX - cursor.offsetWidth / 2, "px");
  var posY = "".concat(pageY - cursor.offsetHeight / 2, "px");
  cursor.style.left = posX;
  cursor.style.top = posY;
};

Cursor.prototype.hover = function (target, hover) {
  var cursor = document.getElementById(this.id);
  var name = target.getAttribute("data-class");
  cursor.classList.add("".concat(this.id, "--").concat(hover));
};

Cursor.prototype.leave = function (target, hover) {
  var cursor = document.getElementById(this.id);
  var name = target.getAttribute("data-class");
  cursor.classList.remove("".concat(this.id, "--").concat(hover));
};

Cursor.prototype.init = function () {
  this.create();
  this.status();
};
