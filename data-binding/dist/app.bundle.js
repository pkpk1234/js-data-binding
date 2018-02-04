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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(1);

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenizer = __webpack_require__(2);

var _tokenizer2 = _interopRequireDefault(_tokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author 李佳明 https://github.com/pkpk1234
 */
var Engine = function () {
    function Engine() {
        _classCallCheck(this, Engine);
    }

    _createClass(Engine, [{
        key: "compile",

        /**
         * 使用输入的模板构造渲染函数
         * @param {*} template 
         */
        value: function compile(template) {
            var tokens = _tokenizer2.default.getTokens(template);
            var functionBody = tokens.join(' + ');
            return {
                "render": new Function("context", " with(context) {return " + functionBody + " };")
            };
        }
    }]);

    return Engine;
}();

exports.default = new Engine();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(3);

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var startToken = "{{";
var endToken = "}}";

/**
 * @author 李佳明 https://github.com/pkpk1234
 */

var Tokenizer = function () {
    function Tokenizer() {
        _classCallCheck(this, Tokenizer);
    }

    _createClass(Tokenizer, [{
        key: "getTokens",

        /**
         * 根据输入构造模板
         * @param {*} templateString 
         */
        value: function getTokens(templateString) {
            var str = templateString;
            var tokens = [];

            var index = str.indexOf(startToken);
            //如果没有包含{{，认为是普通字符串
            if (index == -1) {
                tokens.push(new _token2.default(templateString, "text"));
                return tokens;
            }

            //遍历模板，构造token
            while ((index = str.indexOf(startToken)) != -1) {
                //获取{{之前的内容
                var textValue = str.slice(0, index);
                tokens.push(new _token2.default(textValue, "text"));
                //将str设置为{{之后的内容
                str = str.slice(index);

                index = str.indexOf(endToken);
                //如果没有配对的}}，抛出异常
                if (index == -1) {
                    throw new Error("template error");
                }
                //获取占位符
                var variable = str.slice(2, index);
                tokens.push(new _token2.default(variable, "variable"));
                //将str设置为}}之后的内容
                str = str.slice(index + 2);
            }
            //如果最后一个}}之后还有值，则构造text类型的token
            if (str.length > 0) {
                tokens.push(new _token2.default(str, "text"));
            }
            return tokens;
        }
    }]);

    return Tokenizer;
}();

exports.default = new Tokenizer();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 将双引号进行转义
 * @param {*} str 
 */
function quote(str) {
  var newStr = str.replace(/\"/g, '"');
  return newStr;
}
/**
 * @author 李佳明 https://github.com/pkpk1234
 */

var Token = function () {
  function Token(value, type) {
    _classCallCheck(this, Token);

    this.value = value;
    this.type = type;
  }
  /**
   * 输出Token的值
   * 如果是text类型，将值包含在双引号中，并将值中的双引号进行转义
   * 如果是variable类型，将值包含在小括号中
   */


  _createClass(Token, [{
    key: 'toString',
    value: function toString() {
      if (this.type === "text") {
        return '"' + quote(this.value) + '"';
      } else {
        return "(" + this.value + ")";
      }
    }
  }]);

  return Token;
}();

exports.default = Token;

/***/ })
/******/ ]);