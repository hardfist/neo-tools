var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// http-url:https://unpkg.com/lodash@4.17.20/_freeGlobal
var require_freeGlobal = __commonJS((exports2, module2) => {
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  module2.exports = freeGlobal;
});

// http-url:https://unpkg.com/lodash@4.17.20/_root
var require_root = __commonJS((exports2, module2) => {
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  module2.exports = root;
});

// http-url:https://unpkg.com/lodash@4.17.20/_Symbol
var require_Symbol = __commonJS((exports2, module2) => {
  var root = require_root();
  var Symbol = root.Symbol;
  module2.exports = Symbol;
});

// http-url:https://unpkg.com/lodash@4.17.20/_getRawTag
var require_getRawTag = __commonJS((exports2, module2) => {
  var Symbol = require_Symbol();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  module2.exports = getRawTag;
});

// http-url:https://unpkg.com/lodash@4.17.20/_objectToString
var require_objectToString = __commonJS((exports2, module2) => {
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  module2.exports = objectToString;
});

// http-url:https://unpkg.com/lodash@4.17.20/_baseGetTag
var require_baseGetTag = __commonJS((exports2, module2) => {
  var Symbol = require_Symbol();
  var getRawTag = require_getRawTag();
  var objectToString = require_objectToString();
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  module2.exports = baseGetTag;
});

// http-url:https://unpkg.com/lodash@4.17.20/isObjectLike
var require_isObjectLike = __commonJS((exports2, module2) => {
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  module2.exports = isObjectLike;
});

// http-url:https://unpkg.com/lodash@4.17.20/isSymbol
var require_isSymbol = __commonJS((exports2, module2) => {
  var baseGetTag = require_baseGetTag();
  var isObjectLike = require_isObjectLike();
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  module2.exports = isSymbol;
});

// http-url:https://unpkg.com/lodash@4.17.20/_baseToNumber
var require_baseToNumber = __commonJS((exports2, module2) => {
  var isSymbol = require_isSymbol();
  var NAN = 0 / 0;
  function baseToNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    return +value;
  }
  module2.exports = baseToNumber;
});

// http-url:https://unpkg.com/lodash@4.17.20/_arrayMap
var require_arrayMap = __commonJS((exports2, module2) => {
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  module2.exports = arrayMap;
});

// http-url:https://unpkg.com/lodash@4.17.20/isArray
var require_isArray = __commonJS((exports2, module2) => {
  var isArray = Array.isArray;
  module2.exports = isArray;
});

// http-url:https://unpkg.com/lodash@4.17.20/_baseToString
var require_baseToString = __commonJS((exports2, module2) => {
  var Symbol = require_Symbol();
  var arrayMap = require_arrayMap();
  var isArray = require_isArray();
  var isSymbol = require_isSymbol();
  var INFINITY = 1 / 0;
  var symbolProto = Symbol ? Symbol.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  module2.exports = baseToString;
});

// http-url:https://unpkg.com/lodash@4.17.20/_createMathOperation
var require_createMathOperation = __commonJS((exports2, module2) => {
  var baseToNumber = require_baseToNumber();
  var baseToString = require_baseToString();
  function createMathOperation(operator, defaultValue) {
    return function(value, other) {
      var result;
      if (value === void 0 && other === void 0) {
        return defaultValue;
      }
      if (value !== void 0) {
        result = value;
      }
      if (other !== void 0) {
        if (result === void 0) {
          return other;
        }
        if (typeof value == "string" || typeof other == "string") {
          value = baseToString(value);
          other = baseToString(other);
        } else {
          value = baseToNumber(value);
          other = baseToNumber(other);
        }
        result = operator(value, other);
      }
      return result;
    };
  }
  module2.exports = createMathOperation;
});

// http-url:https://unpkg.com/lodash/add.js
var require_add = __commonJS((exports2, module2) => {
  var createMathOperation = require_createMathOperation();
  var add2 = createMathOperation(function(augend, addend) {
    return augend + addend;
  }, 0);
  module2.exports = add2;
});

// __tests__/fixtures/http/index.js
var import_add = __toModule(require_add());
console.log("add:", import_add.default(1, 2));
