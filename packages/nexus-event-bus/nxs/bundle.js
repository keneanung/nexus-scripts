/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/EventBus.ts":
/*!*************************!*\
  !*** ./src/EventBus.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"../../node_modules/@babel/runtime/helpers/interopRequireDefault.js\");var _slicedToArray2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"../../node_modules/@babel/runtime/helpers/slicedToArray.js\"));var _asyncToGenerator2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"../../node_modules/@babel/runtime/helpers/asyncToGenerator.js\"));var _classCallCheck2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../../node_modules/@babel/runtime/helpers/classCallCheck.js\"));var _createClass2=_interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../../node_modules/@babel/runtime/helpers/createClass.js\"));Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.EventBus=void 0;var uuid_1=__webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/commonjs-browser/index.js\");var createRandomHexArray=function createRandomHexArray(){var array=new Uint8Array(16);for(var index=0;index<array.length;index++){array[index]=Math.floor(Math.random()*0xff);}return array;};var EventBus=function(){function EventBus(){(0,_classCallCheck2.default)(this,EventBus);this.subscriptions=new Map();this.subscriptionsToAll=new Map();}(0,_createClass2.default)(EventBus,[{key:\"subscribe\",value:function subscribe(eventName,callback){var callbackName=arguments.length>2&&arguments[2]!==undefined?arguments[2]:(0,uuid_1.v4)({rng:createRandomHexArray});var overwrite=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var eventCallbacks;if(eventName==='*'){eventCallbacks=this.subscriptionsToAll;}else{if(this.subscriptions.has(eventName)===false){var subscriptions=new Map();this.subscriptions.set(eventName,subscriptions);eventCallbacks=subscriptions;}else{eventCallbacks=this.subscriptions.get(eventName);}}this.subscribeToEvent(eventCallbacks,callback,eventName,callbackName,overwrite);}},{key:\"subscribeToEvent\",value:function subscribeToEvent(eventCallbacks,callback,eventName,callbackName,overwrite){if(eventCallbacks.has(callbackName)&&!overwrite){throw new Error(`Callback \"${callbackName}\" already exists for event \"${eventName}\"`);}eventCallbacks.set(callbackName,callback);}},{key:\"raise\",value:function(){var _raise=(0,_asyncToGenerator2.default)(function*(eventName,eventArgument){var subscriptions=this.subscriptions.get(eventName);yield this.runCallbacks(subscriptions,eventArgument,eventName);yield this.runCallbacks(this.subscriptionsToAll,eventArgument,eventName);});function raise(_x,_x2){return _raise.apply(this,arguments);}return raise;}()},{key:\"runCallbacks\",value:function(){var _runCallbacks=(0,_asyncToGenerator2.default)(function*(subscriptions,eventArgument,eventName){if(subscriptions!==undefined){for(var _ref of subscriptions){var _ref2=(0,_slicedToArray2.default)(_ref,2);var name=_ref2[0];var callback=_ref2[1];try{yield callback(eventArgument);}catch(e){console.error(`Error in callback '${name}' for event '${eventName}'`,e);}}}});function runCallbacks(_x3,_x4,_x5){return _runCallbacks.apply(this,arguments);}return runCallbacks;}()},{key:\"unsubscribe\",value:function unsubscribe(eventName,callback){var subscriptions;if(eventName==='*'){subscriptions=this.subscriptionsToAll;}else{if(this.subscriptions.has(eventName)===false){return;}subscriptions=this.subscriptions.get(eventName);}this.unsubscribeFromEvent(subscriptions,callback);}},{key:\"unsubscribeFromEvent\",value:function unsubscribeFromEvent(eventCallbackList,callback){if(typeof callback==='string'){eventCallbackList.delete(callback);}else{var keys=eventCallbackList.keys();for(var key of keys){if(eventCallbackList.get(key)===callback){eventCallbackList.delete(key);}}}}},{key:\"getSubscribers\",value:function getSubscribers(eventName){var result=[];var collectSubscribers=function collectSubscribers(name,callback){result.push({callback:callback,name:name});};if(eventName!=='*'){var subscriptions=this.subscriptions.get(eventName);if(subscriptions!==undefined){for(var _ref3 of subscriptions){var _ref4=(0,_slicedToArray2.default)(_ref3,2);var subscriptionName=_ref4[0];var callback=_ref4[1];collectSubscribers(subscriptionName,callback);}}}for(var _ref5 of this.subscriptionsToAll){var _ref6=(0,_slicedToArray2.default)(_ref5,2);var _subscriptionName=_ref6[0];var _callback=_ref6[1];collectSubscribers(_subscriptionName,_callback);}return result;}}]);return EventBus;}();exports.EventBus=EventBus;\n\n//# sourceURL=webpack://eventBus/./src/EventBus.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("var __createBinding=void 0&&(void 0).__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||(\"get\"in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function get(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __exportStar=void 0&&(void 0).__exportStar||function(m,exports){for(var p in m)if(p!==\"default\"&&!Object.prototype.hasOwnProperty.call(exports,p))__createBinding(exports,m,p);};Object.defineProperty(exports, \"__esModule\", ({value:true}));__exportStar(__webpack_require__(/*! ./EventBus */ \"./src/EventBus.ts\"),exports);\n\n//# sourceURL=webpack://eventBus/./src/index.ts?");

/***/ }),

/***/ "./webpack/webpack.ts":
/*!****************************!*\
  !*** ./webpack/webpack.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));var index_1=__webpack_require__(/*! ../src/index */ \"./src/index.ts\");console.log('loading event bus version 0.5.1...');if(typeof Map!=='function'){var frame=document.createElement('iframe');var tab=document.getElementById('tab_content_main_output');tab==null?void 0:tab.appendChild(frame);Map=frame.contentWindow.Map;tab==null?void 0:tab.removeChild(frame);}var eventBus=new index_1.EventBus();exports[\"default\"]=eventBus;console.log('event bus loaded.');\n\n//# sourceURL=webpack://eventBus/./webpack/webpack.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nObject.defineProperty(exports, \"NIL\", ({\n  enumerable: true,\n  get: function get() {\n    return _nil.default;\n  }\n}));\nObject.defineProperty(exports, \"parse\", ({\n  enumerable: true,\n  get: function get() {\n    return _parse.default;\n  }\n}));\nObject.defineProperty(exports, \"stringify\", ({\n  enumerable: true,\n  get: function get() {\n    return _stringify.default;\n  }\n}));\nObject.defineProperty(exports, \"v1\", ({\n  enumerable: true,\n  get: function get() {\n    return _v.default;\n  }\n}));\nObject.defineProperty(exports, \"v3\", ({\n  enumerable: true,\n  get: function get() {\n    return _v2.default;\n  }\n}));\nObject.defineProperty(exports, \"v4\", ({\n  enumerable: true,\n  get: function get() {\n    return _v3.default;\n  }\n}));\nObject.defineProperty(exports, \"v5\", ({\n  enumerable: true,\n  get: function get() {\n    return _v4.default;\n  }\n}));\nObject.defineProperty(exports, \"validate\", ({\n  enumerable: true,\n  get: function get() {\n    return _validate.default;\n  }\n}));\nObject.defineProperty(exports, \"version\", ({\n  enumerable: true,\n  get: function get() {\n    return _version.default;\n  }\n}));\n\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/commonjs-browser/v1.js\"));\n\nvar _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ \"./node_modules/uuid/dist/commonjs-browser/v3.js\"));\n\nvar _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ \"./node_modules/uuid/dist/commonjs-browser/v4.js\"));\n\nvar _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ \"./node_modules/uuid/dist/commonjs-browser/v5.js\"));\n\nvar _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ \"./node_modules/uuid/dist/commonjs-browser/nil.js\"));\n\nvar _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ \"./node_modules/uuid/dist/commonjs-browser/version.js\"));\n\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\n\nvar _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\"));\n\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/index.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/md5.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\n/*\n * Browser-compatible JavaScript MD5\n *\n * Modification of JavaScript MD5\n * https://github.com/blueimp/JavaScript-MD5\n *\n * Copyright 2011, Sebastian Tschan\n * https://blueimp.net\n *\n * Licensed under the MIT license:\n * https://opensource.org/licenses/MIT\n *\n * Based on\n * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message\n * Digest Algorithm, as defined in RFC 1321.\n * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009\n * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet\n * Distributed under the BSD License\n * See http://pajhome.org.uk/crypt/md5 for more info.\n */\nfunction md5(bytes) {\n  if (typeof bytes === 'string') {\n    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = new Uint8Array(msg.length);\n\n    for (let i = 0; i < msg.length; ++i) {\n      bytes[i] = msg.charCodeAt(i);\n    }\n  }\n\n  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));\n}\n/*\n * Convert an array of little-endian words to an array of bytes\n */\n\n\nfunction md5ToHexEncodedArray(input) {\n  const output = [];\n  const length32 = input.length * 32;\n  const hexTab = '0123456789abcdef';\n\n  for (let i = 0; i < length32; i += 8) {\n    const x = input[i >> 5] >>> i % 32 & 0xff;\n    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);\n    output.push(hex);\n  }\n\n  return output;\n}\n/**\n * Calculate output length with padding and bit length\n */\n\n\nfunction getOutputLength(inputLength8) {\n  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;\n}\n/*\n * Calculate the MD5 of an array of little-endian words, and a bit length.\n */\n\n\nfunction wordsToMd5(x, len) {\n  /* append padding */\n  x[len >> 5] |= 0x80 << len % 32;\n  x[getOutputLength(len) - 1] = len;\n  let a = 1732584193;\n  let b = -271733879;\n  let c = -1732584194;\n  let d = 271733878;\n\n  for (let i = 0; i < x.length; i += 16) {\n    const olda = a;\n    const oldb = b;\n    const oldc = c;\n    const oldd = d;\n    a = md5ff(a, b, c, d, x[i], 7, -680876936);\n    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);\n    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);\n    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);\n    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);\n    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);\n    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);\n    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);\n    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);\n    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);\n    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);\n    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);\n    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);\n    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);\n    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);\n    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);\n    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);\n    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);\n    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);\n    b = md5gg(b, c, d, a, x[i], 20, -373897302);\n    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);\n    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);\n    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);\n    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);\n    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);\n    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);\n    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);\n    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);\n    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);\n    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);\n    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);\n    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);\n    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);\n    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);\n    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);\n    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);\n    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);\n    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);\n    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);\n    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);\n    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);\n    d = md5hh(d, a, b, c, x[i], 11, -358537222);\n    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);\n    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);\n    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);\n    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);\n    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);\n    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);\n    a = md5ii(a, b, c, d, x[i], 6, -198630844);\n    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);\n    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);\n    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);\n    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);\n    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);\n    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);\n    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);\n    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);\n    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);\n    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);\n    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);\n    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);\n    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);\n    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);\n    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);\n    a = safeAdd(a, olda);\n    b = safeAdd(b, oldb);\n    c = safeAdd(c, oldc);\n    d = safeAdd(d, oldd);\n  }\n\n  return [a, b, c, d];\n}\n/*\n * Convert an array bytes to an array of little-endian words\n * Characters >255 have their high-byte silently ignored.\n */\n\n\nfunction bytesToWords(input) {\n  if (input.length === 0) {\n    return [];\n  }\n\n  const length8 = input.length * 8;\n  const output = new Uint32Array(getOutputLength(length8));\n\n  for (let i = 0; i < length8; i += 8) {\n    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;\n  }\n\n  return output;\n}\n/*\n * Add integers, wrapping at 2^32. This uses 16-bit operations internally\n * to work around bugs in some JS interpreters.\n */\n\n\nfunction safeAdd(x, y) {\n  const lsw = (x & 0xffff) + (y & 0xffff);\n  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n  return msw << 16 | lsw & 0xffff;\n}\n/*\n * Bitwise rotate a 32-bit number to the left.\n */\n\n\nfunction bitRotateLeft(num, cnt) {\n  return num << cnt | num >>> 32 - cnt;\n}\n/*\n * These functions implement the four basic operations the algorithm uses.\n */\n\n\nfunction md5cmn(q, a, b, x, s, t) {\n  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);\n}\n\nfunction md5ff(a, b, c, d, x, s, t) {\n  return md5cmn(b & c | ~b & d, a, b, x, s, t);\n}\n\nfunction md5gg(a, b, c, d, x, s, t) {\n  return md5cmn(b & d | c & ~d, a, b, x, s, t);\n}\n\nfunction md5hh(a, b, c, d, x, s, t) {\n  return md5cmn(b ^ c ^ d, a, b, x, s, t);\n}\n\nfunction md5ii(a, b, c, d, x, s, t) {\n  return md5cmn(c ^ (b | ~d), a, b, x, s, t);\n}\n\nvar _default = md5;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/md5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/native.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/native.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\nvar _default = {\n  randomUUID\n};\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/nil.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _default = '00000000-0000-0000-0000-000000000000';\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/nil.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/parse.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction parse(uuid) {\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  let v;\n  const arr = new Uint8Array(16); // Parse ########-....-....-....-............\n\n  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;\n  arr[1] = v >>> 16 & 0xff;\n  arr[2] = v >>> 8 & 0xff;\n  arr[3] = v & 0xff; // Parse ........-####-....-....-............\n\n  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;\n  arr[5] = v & 0xff; // Parse ........-....-####-....-............\n\n  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;\n  arr[7] = v & 0xff; // Parse ........-....-....-####-............\n\n  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;\n  arr[9] = v & 0xff; // Parse ........-....-....-....-############\n  // (Use \"/\" to avoid 32-bit truncation when bit-shifting high-order bytes)\n\n  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;\n  arr[11] = v / 0x100000000 & 0xff;\n  arr[12] = v >>> 24 & 0xff;\n  arr[13] = v >>> 16 & 0xff;\n  arr[14] = v >>> 8 & 0xff;\n  arr[15] = v & 0xff;\n  return arr;\n}\n\nvar _default = parse;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/parse.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/regex.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/rng.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = rng;\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\n\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\n// Adapted from Chris Veness' SHA1 code at\n// http://www.movable-type.co.uk/scripts/sha1.html\nfunction f(s, x, y, z) {\n  switch (s) {\n    case 0:\n      return x & y ^ ~x & z;\n\n    case 1:\n      return x ^ y ^ z;\n\n    case 2:\n      return x & y ^ x & z ^ y & z;\n\n    case 3:\n      return x ^ y ^ z;\n  }\n}\n\nfunction ROTL(x, n) {\n  return x << n | x >>> 32 - n;\n}\n\nfunction sha1(bytes) {\n  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];\n  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];\n\n  if (typeof bytes === 'string') {\n    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = [];\n\n    for (let i = 0; i < msg.length; ++i) {\n      bytes.push(msg.charCodeAt(i));\n    }\n  } else if (!Array.isArray(bytes)) {\n    // Convert Array-like to Array\n    bytes = Array.prototype.slice.call(bytes);\n  }\n\n  bytes.push(0x80);\n  const l = bytes.length / 4 + 2;\n  const N = Math.ceil(l / 16);\n  const M = new Array(N);\n\n  for (let i = 0; i < N; ++i) {\n    const arr = new Uint32Array(16);\n\n    for (let j = 0; j < 16; ++j) {\n      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];\n    }\n\n    M[i] = arr;\n  }\n\n  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);\n  M[N - 1][14] = Math.floor(M[N - 1][14]);\n  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;\n\n  for (let i = 0; i < N; ++i) {\n    const W = new Uint32Array(80);\n\n    for (let t = 0; t < 16; ++t) {\n      W[t] = M[i][t];\n    }\n\n    for (let t = 16; t < 80; ++t) {\n      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);\n    }\n\n    let a = H[0];\n    let b = H[1];\n    let c = H[2];\n    let d = H[3];\n    let e = H[4];\n\n    for (let t = 0; t < 80; ++t) {\n      const s = Math.floor(t / 20);\n      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;\n      e = d;\n      d = c;\n      c = ROTL(b, 30) >>> 0;\n      b = a;\n      a = T;\n    }\n\n    H[0] = H[0] + a >>> 0;\n    H[1] = H[1] + b >>> 0;\n    H[2] = H[2] + c >>> 0;\n    H[3] = H[3] + d >>> 0;\n    H[4] = H[4] + e >>> 0;\n  }\n\n  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];\n}\n\nvar _default = sha1;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/sha1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!**************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nexports.unsafeStringify = unsafeStringify;\n\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nconst byteToHex = [];\n\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\n\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\n\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\nvar _default = stringify;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/commonjs-browser/rng.js\"));\n\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\nlet _nodeId;\n\nlet _clockseq; // Previous uuid creation time\n\n\nlet _lastMSecs = 0;\nlet _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details\n\nfunction v1(options, buf, offset) {\n  let i = buf && offset || 0;\n  const b = buf || new Array(16);\n  options = options || {};\n  let node = options.node || _nodeId;\n  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n\n  if (node == null || clockseq == null) {\n    const seedBytes = options.random || (options.rng || _rng.default)();\n\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n\n\n  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n\n  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)\n\n  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression\n\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n\n\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  } // Per 4.2.1.2 Throw error if too many uuids are requested\n\n\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n\n  msecs += 12219292800000; // `time_low`\n\n  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff; // `time_mid`\n\n  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff; // `time_high_and_version`\n\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n\n  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n\n  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`\n\n  b[i++] = clockseq & 0xff; // `node`\n\n  for (let n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf || (0, _stringify.unsafeStringify)(b);\n}\n\nvar _default = v1;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v3.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/commonjs-browser/v35.js\"));\n\nvar _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ \"./node_modules/uuid/dist/commonjs-browser/md5.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst v3 = (0, _v.default)('v3', 0x30, _md.default);\nvar _default = v3;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/v3.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v35.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.URL = exports.DNS = void 0;\nexports[\"default\"] = v35;\n\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\n\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction stringToBytes(str) {\n  str = unescape(encodeURIComponent(str)); // UTF8 escape\n\n  const bytes = [];\n\n  for (let i = 0; i < str.length; ++i) {\n    bytes.push(str.charCodeAt(i));\n  }\n\n  return bytes;\n}\n\nconst DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';\nexports.DNS = DNS;\nconst URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';\nexports.URL = URL;\n\nfunction v35(name, version, hashfunc) {\n  function generateUUID(value, namespace, buf, offset) {\n    var _namespace;\n\n    if (typeof value === 'string') {\n      value = stringToBytes(value);\n    }\n\n    if (typeof namespace === 'string') {\n      namespace = (0, _parse.default)(namespace);\n    }\n\n    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {\n      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');\n    } // Compute hash of namespace and value, Per 4.3\n    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =\n    // hashfunc([...namespace, ... value])`\n\n\n    let bytes = new Uint8Array(16 + value.length);\n    bytes.set(namespace);\n    bytes.set(value, namespace.length);\n    bytes = hashfunc(bytes);\n    bytes[6] = bytes[6] & 0x0f | version;\n    bytes[8] = bytes[8] & 0x3f | 0x80;\n\n    if (buf) {\n      offset = offset || 0;\n\n      for (let i = 0; i < 16; ++i) {\n        buf[offset + i] = bytes[i];\n      }\n\n      return buf;\n    }\n\n    return (0, _stringify.unsafeStringify)(bytes);\n  } // Function#name is not settable on some platforms (#270)\n\n\n  try {\n    generateUUID.name = name; // eslint-disable-next-line no-empty\n  } catch (err) {} // For CommonJS default export support\n\n\n  generateUUID.DNS = DNS;\n  generateUUID.URL = URL;\n  return generateUUID;\n}\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/v35.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v4.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/commonjs-browser/native.js\"));\n\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/commonjs-browser/rng.js\"));\n\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction v4(options, buf, offset) {\n  if (_native.default.randomUUID && !buf && !options) {\n    return _native.default.randomUUID();\n  }\n\n  options = options || {};\n\n  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0, _stringify.unsafeStringify)(rnds);\n}\n\nvar _default = v4;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v5.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/commonjs-browser/v35.js\"));\n\nvar _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ \"./node_modules/uuid/dist/commonjs-browser/sha1.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst v5 = (0, _v.default)('v5', 0x50, _sha.default);\nvar _default = v5;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/v5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/validate.js":
/*!*************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/commonjs-browser/regex.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex.default.test(uuid);\n}\n\nvar _default = validate;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/validate.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/version.js":
/*!************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/version.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction version(uuid) {\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  return parseInt(uuid.slice(14, 15), 16);\n}\n\nvar _default = version;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://eventBus/./node_modules/uuid/dist/commonjs-browser/version.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("function _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\nmodule.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ (function(module) {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\nmodule.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n      args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n      _next(undefined);\n    });\n  };\n}\nmodule.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/asyncToGenerator.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function(module) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\nmodule.exports = _classCallCheck, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/createClass.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/createClass.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ \"../../node_modules/@babel/runtime/helpers/toPropertyKey.js\");\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);\n  }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\nmodule.exports = _createClass, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**************************************************************************/
/***/ (function(module) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\nmodule.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/interopRequireDefault.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ (function(module) {

eval("function _iterableToArrayLimit(arr, i) {\n  var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"];\n  if (null != _i) {\n    var _s,\n      _e,\n      _x,\n      _r,\n      _arr = [],\n      _n = !0,\n      _d = !1;\n    try {\n      if (_x = (_i = _i.call(arr)).next, 0 === i) {\n        if (Object(_i) !== _i) return;\n        _n = !1;\n      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);\n    } catch (err) {\n      _d = !0, _e = err;\n    } finally {\n      try {\n        if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return;\n      } finally {\n        if (_d) throw _e;\n      }\n    }\n    return _arr;\n  }\n}\nmodule.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nmodule.exports = _nonIterableRest, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ \"../../node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ \"../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ \"../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js\");\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ \"../../node_modules/@babel/runtime/helpers/nonIterableRest.js\");\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();\n}\nmodule.exports = _slicedToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var _typeof = (__webpack_require__(/*! ./typeof.js */ \"../../node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"]);\nfunction _toPrimitive(input, hint) {\n  if (_typeof(input) !== \"object\" || input === null) return input;\n  var prim = input[Symbol.toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || \"default\");\n    if (_typeof(res) !== \"object\") return res;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (hint === \"string\" ? String : Number)(input);\n}\nmodule.exports = _toPrimitive, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/toPrimitive.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var _typeof = (__webpack_require__(/*! ./typeof.js */ \"../../node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"]);\nvar toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ \"../../node_modules/@babel/runtime/helpers/toPrimitive.js\");\nfunction _toPropertyKey(arg) {\n  var key = toPrimitive(arg, \"string\");\n  return _typeof(key) === \"symbol\" ? key : String(key);\n}\nmodule.exports = _toPropertyKey, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/toPropertyKey.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/typeof.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/typeof.js ***!
  \***********************************************************/
/***/ (function(module) {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  return (module.exports = _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) {\n    return typeof obj;\n  } : function (obj) {\n    return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports), _typeof(obj);\n}\nmodule.exports = _typeof, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ \"../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js\");\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);\n}\nmodule.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://eventBus/../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./webpack/webpack.ts");
/******/ 	self.eventBus = __webpack_exports__["default"];
/******/ 	
/******/ })()
;