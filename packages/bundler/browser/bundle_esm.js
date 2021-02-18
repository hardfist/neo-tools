global = globalThis
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module, desc) => {
  __markAsModule(target);
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
};

// ../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js
var require_base64_js = __commonJS((exports) => {
  "use strict";
  exports.byteLength = byteLength;
  exports.toByteArray = toByteArray;
  exports.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
});

// ../../node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js
var require_ieee754 = __commonJS((exports) => {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  };
});

// ../../node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js
var require_buffer = __commonJS((exports) => {
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  "use strict";
  var base64 = require_base64_js();
  var ieee754 = require_ieee754();
  var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports.Buffer = Buffer3;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = {foo: function() {
        return 42;
      }};
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer3.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer3.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer3.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function Buffer3(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError('The "string" argument must be of type string. Received type number');
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer3.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer3.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
  }
  Buffer3.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer3, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer3.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer3.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer3.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer3.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer3.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer3.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer3.alloc(+length);
  }
  Buffer3.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer3.prototype;
  };
  Buffer3.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
      a = Buffer3.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
      b = Buffer3.from(b, b.offset, b.byteLength);
    if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b)
      return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer3.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer3.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer3.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer = Buffer3.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer3.isBuffer(buf))
            buf = Buffer3.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(buffer, buf, pos);
        }
      } else if (!Buffer3.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer3.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer3.prototype._isBuffer = true;
  function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer3.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer3.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer3.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer3.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
  Buffer3.prototype.equals = function equals(b) {
    if (!Buffer3.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer3.compare(this, b) === 0;
  };
  Buffer3.prototype.inspect = function inspect() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
  }
  Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer3.from(target, target.offset, target.byteLength);
    }
    if (!Buffer3.isBuffer(target)) {
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer3.from(val, encoding);
    }
    if (Buffer3.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer3.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer3.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer3.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer3.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength2] * mul;
    }
    return val;
  };
  Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer3.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer3.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
  };
  Buffer3.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) {
      return `${name} is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
  }, RangeError);
  E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
  }, TypeError);
  E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
  }, RangeError);
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength2 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
        }
      } else {
        range = `>= ${min}${n} and <= ${max}${n}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
  }
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  var hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
});

// ../../node_modules/.pnpm/esbuild-wasm@0.8.42/node_modules/esbuild-wasm/esm/browser.js
var require_browser = __commonJS((exports) => {
  __export(exports, {
    build: () => build2,
    buildSync: () => buildSync,
    serve: () => serve,
    startService: () => startService,
    transform: () => transform2,
    transformSync: () => transformSync,
    version: () => version3
  });
  var __assign = Object.assign;
  function encodePacket(packet) {
    let visit = (value) => {
      if (value === null) {
        bb.write8(0);
      } else if (typeof value === "boolean") {
        bb.write8(1);
        bb.write8(+value);
      } else if (typeof value === "number") {
        bb.write8(2);
        bb.write32(value | 0);
      } else if (typeof value === "string") {
        bb.write8(3);
        bb.write(encodeUTF8(value));
      } else if (value instanceof Uint8Array) {
        bb.write8(4);
        bb.write(value);
      } else if (value instanceof Array) {
        bb.write8(5);
        bb.write32(value.length);
        for (let item of value) {
          visit(item);
        }
      } else {
        let keys = Object.keys(value);
        bb.write8(6);
        bb.write32(keys.length);
        for (let key of keys) {
          bb.write(encodeUTF8(key));
          visit(value[key]);
        }
      }
    };
    let bb = new ByteBuffer();
    bb.write32(0);
    bb.write32(packet.id << 1 | +!packet.isRequest);
    visit(packet.value);
    writeUInt32LE(bb.buf, bb.len - 4, 0);
    return bb.buf.subarray(0, bb.len);
  }
  function decodePacket(bytes) {
    let visit = () => {
      switch (bb.read8()) {
        case 0:
          return null;
        case 1:
          return !!bb.read8();
        case 2:
          return bb.read32();
        case 3:
          return decodeUTF8(bb.read());
        case 4:
          return bb.read();
        case 5: {
          let count = bb.read32();
          let value2 = [];
          for (let i = 0; i < count; i++) {
            value2.push(visit());
          }
          return value2;
        }
        case 6: {
          let count = bb.read32();
          let value2 = {};
          for (let i = 0; i < count; i++) {
            value2[decodeUTF8(bb.read())] = visit();
          }
          return value2;
        }
        default:
          throw new Error("Invalid packet");
      }
    };
    let bb = new ByteBuffer(bytes);
    let id = bb.read32();
    let isRequest = (id & 1) === 0;
    id >>>= 1;
    let value = visit();
    if (bb.ptr !== bytes.length) {
      throw new Error("Invalid packet");
    }
    return {id, isRequest, value};
  }
  var ByteBuffer = class {
    constructor(buf = new Uint8Array(1024)) {
      this.buf = buf;
      this.len = 0;
      this.ptr = 0;
    }
    _write(delta) {
      if (this.len + delta > this.buf.length) {
        let clone = new Uint8Array((this.len + delta) * 2);
        clone.set(this.buf);
        this.buf = clone;
      }
      this.len += delta;
      return this.len - delta;
    }
    write8(value) {
      let offset = this._write(1);
      this.buf[offset] = value;
    }
    write32(value) {
      let offset = this._write(4);
      writeUInt32LE(this.buf, value, offset);
    }
    write(bytes) {
      let offset = this._write(4 + bytes.length);
      writeUInt32LE(this.buf, bytes.length, offset);
      this.buf.set(bytes, offset + 4);
    }
    _read(delta) {
      if (this.ptr + delta > this.buf.length) {
        throw new Error("Invalid packet");
      }
      this.ptr += delta;
      return this.ptr - delta;
    }
    read8() {
      return this.buf[this._read(1)];
    }
    read32() {
      return readUInt32LE(this.buf, this._read(4));
    }
    read() {
      let length = this.read32();
      let bytes = new Uint8Array(length);
      let ptr = this._read(bytes.length);
      bytes.set(this.buf.subarray(ptr, ptr + length));
      return bytes;
    }
  };
  var encodeUTF8;
  var decodeUTF8;
  if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder();
    encodeUTF8 = (text) => encoder.encode(text);
    decodeUTF8 = (bytes) => decoder.decode(bytes);
  } else if (typeof Buffer2 !== "undefined") {
    encodeUTF8 = (text) => Buffer2.from(text);
    decodeUTF8 = (bytes) => Buffer2.from(bytes).toString();
  } else {
    throw new Error("No UTF-8 codec found");
  }
  function readUInt32LE(buffer, offset) {
    return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
  }
  function writeUInt32LE(buffer, value, offset) {
    buffer[offset++] = value;
    buffer[offset++] = value >> 8;
    buffer[offset++] = value >> 16;
    buffer[offset++] = value >> 24;
  }
  function validateTarget(target) {
    target += "";
    if (target.indexOf(",") >= 0)
      throw new Error(`Invalid target: ${target}`);
    return target;
  }
  var canBeAnything = () => null;
  var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
  var mustBeBooleanOrObject = (value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object";
  var mustBeString = (value) => typeof value === "string" ? null : "a string";
  var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
  var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
  var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
  var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
  var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
  var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
  var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
  var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
  var mustBeStringOrArray = (value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
  var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
  function getFlag(object, keys, key, mustBeFn) {
    let value = object[key];
    keys[key + ""] = true;
    if (value === void 0)
      return void 0;
    let mustBe = mustBeFn(value);
    if (mustBe !== null)
      throw new Error(`"${key}" must be ${mustBe}`);
    return value;
  }
  function checkForInvalidFlags(object, keys, where) {
    for (let key in object) {
      if (!(key in keys)) {
        throw new Error(`Invalid option ${where}: "${key}"`);
      }
    }
  }
  function validateServiceOptions(options) {
    let keys = Object.create(null);
    let wasmURL = getFlag(options, keys, "wasmURL", mustBeString);
    let worker = getFlag(options, keys, "worker", mustBeBoolean);
    checkForInvalidFlags(options, keys, "in startService() call");
    return {
      wasmURL,
      worker
    };
  }
  function pushLogFlags(flags, options, keys, isTTY, logLevelDefault) {
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let logLevel = getFlag(options, keys, "logLevel", mustBeString);
    let errorLimit = getFlag(options, keys, "errorLimit", mustBeInteger);
    if (color)
      flags.push(`--color=${color}`);
    else if (isTTY)
      flags.push(`--color=true`);
    flags.push(`--log-level=${logLevel || logLevelDefault}`);
    flags.push(`--error-limit=${errorLimit || 0}`);
  }
  function pushCommonFlags(flags, options, keys) {
    let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
    let target = getFlag(options, keys, "target", mustBeStringOrArray);
    let format = getFlag(options, keys, "format", mustBeString);
    let globalName = getFlag(options, keys, "globalName", mustBeString);
    let minify = getFlag(options, keys, "minify", mustBeBoolean);
    let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
    let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
    let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
    let charset = getFlag(options, keys, "charset", mustBeString);
    let treeShaking = getFlag(options, keys, "treeShaking", mustBeStringOrBoolean);
    let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
    let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
    let define2 = getFlag(options, keys, "define", mustBeObject);
    let pure = getFlag(options, keys, "pure", mustBeArray);
    let avoidTDZ = getFlag(options, keys, "avoidTDZ", mustBeBoolean);
    let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
    let banner = getFlag(options, keys, "banner", mustBeString);
    let footer = getFlag(options, keys, "footer", mustBeString);
    if (sourcesContent !== void 0)
      flags.push(`--sources-content=${sourcesContent}`);
    if (target) {
      if (Array.isArray(target))
        flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
      else
        flags.push(`--target=${validateTarget(target)}`);
    }
    if (format)
      flags.push(`--format=${format}`);
    if (globalName)
      flags.push(`--global-name=${globalName}`);
    if (minify)
      flags.push("--minify");
    if (minifySyntax)
      flags.push("--minify-syntax");
    if (minifyWhitespace)
      flags.push("--minify-whitespace");
    if (minifyIdentifiers)
      flags.push("--minify-identifiers");
    if (charset)
      flags.push(`--charset=${charset}`);
    if (treeShaking !== void 0 && treeShaking !== true)
      flags.push(`--tree-shaking=${treeShaking}`);
    if (jsxFactory)
      flags.push(`--jsx-factory=${jsxFactory}`);
    if (jsxFragment)
      flags.push(`--jsx-fragment=${jsxFragment}`);
    if (define2) {
      for (let key in define2) {
        if (key.indexOf("=") >= 0)
          throw new Error(`Invalid define: ${key}`);
        flags.push(`--define:${key}=${define2[key]}`);
      }
    }
    if (pure)
      for (let fn of pure)
        flags.push(`--pure:${fn}`);
    if (avoidTDZ)
      flags.push(`--avoid-tdz`);
    if (keepNames)
      flags.push(`--keep-names`);
    if (banner)
      flags.push(`--banner=${banner}`);
    if (footer)
      flags.push(`--footer=${footer}`);
  }
  function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
    var _a;
    let flags = [];
    let keys = Object.create(null);
    let stdinContents = null;
    let stdinResolveDir = null;
    let watchMode = null;
    pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
    let watch = getFlag(options, keys, "watch", mustBeBooleanOrObject);
    let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
    let metafile = getFlag(options, keys, "metafile", mustBeString);
    let outfile = getFlag(options, keys, "outfile", mustBeString);
    let outdir = getFlag(options, keys, "outdir", mustBeString);
    let outbase = getFlag(options, keys, "outbase", mustBeString);
    let platform2 = getFlag(options, keys, "platform", mustBeString);
    let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
    let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
    let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
    let external = getFlag(options, keys, "external", mustBeArray);
    let loader = getFlag(options, keys, "loader", mustBeObject);
    let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
    let publicPath = getFlag(options, keys, "publicPath", mustBeString);
    let inject = getFlag(options, keys, "inject", mustBeArray);
    let entryPoints = getFlag(options, keys, "entryPoints", mustBeArray);
    let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
    let stdin = getFlag(options, keys, "stdin", mustBeObject);
    let write = (_a = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a : writeDefault;
    let incremental = getFlag(options, keys, "incremental", mustBeBoolean) === true;
    let plugins = getFlag(options, keys, "plugins", mustBeArray);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap)
      flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
    if (bundle)
      flags.push("--bundle");
    if (watch) {
      flags.push("--watch");
      if (typeof watch === "boolean") {
        watchMode = {};
      } else {
        let watchKeys = Object.create(null);
        let onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
        checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`);
        watchMode = {onRebuild};
      }
    }
    if (splitting)
      flags.push("--splitting");
    if (metafile)
      flags.push(`--metafile=${metafile}`);
    if (outfile)
      flags.push(`--outfile=${outfile}`);
    if (outdir)
      flags.push(`--outdir=${outdir}`);
    if (outbase)
      flags.push(`--outbase=${outbase}`);
    if (platform2)
      flags.push(`--platform=${platform2}`);
    if (tsconfig)
      flags.push(`--tsconfig=${tsconfig}`);
    if (resolveExtensions) {
      let values = [];
      for (let value of resolveExtensions) {
        value += "";
        if (value.indexOf(",") >= 0)
          throw new Error(`Invalid resolve extension: ${value}`);
        values.push(value);
      }
      flags.push(`--resolve-extensions=${values.join(",")}`);
    }
    if (publicPath)
      flags.push(`--public-path=${publicPath}`);
    if (mainFields) {
      let values = [];
      for (let value of mainFields) {
        value += "";
        if (value.indexOf(",") >= 0)
          throw new Error(`Invalid main field: ${value}`);
        values.push(value);
      }
      flags.push(`--main-fields=${values.join(",")}`);
    }
    if (external)
      for (let name of external)
        flags.push(`--external:${name}`);
    if (inject)
      for (let path6 of inject)
        flags.push(`--inject:${path6}`);
    if (loader) {
      for (let ext in loader) {
        if (ext.indexOf("=") >= 0)
          throw new Error(`Invalid loader extension: ${ext}`);
        flags.push(`--loader:${ext}=${loader[ext]}`);
      }
    }
    if (outExtension) {
      for (let ext in outExtension) {
        if (ext.indexOf("=") >= 0)
          throw new Error(`Invalid out extension: ${ext}`);
        flags.push(`--out-extension:${ext}=${outExtension[ext]}`);
      }
    }
    if (entryPoints) {
      for (let entryPoint of entryPoints) {
        entryPoint += "";
        if (entryPoint.startsWith("-"))
          throw new Error(`Invalid entry point: ${entryPoint}`);
        flags.push(entryPoint);
      }
    }
    if (stdin) {
      let stdinKeys = Object.create(null);
      let contents = getFlag(stdin, stdinKeys, "contents", mustBeString);
      let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
      let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
      let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
      checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
      if (sourcefile)
        flags.push(`--sourcefile=${sourcefile}`);
      if (loader2)
        flags.push(`--loader=${loader2}`);
      if (resolveDir)
        stdinResolveDir = resolveDir + "";
      stdinContents = contents ? contents + "" : "";
    }
    return {
      flags,
      write,
      plugins,
      stdinContents,
      stdinResolveDir,
      absWorkingDir,
      incremental,
      watch: watchMode
    };
  }
  function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
    let flags = [];
    let keys = Object.create(null);
    pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
    let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
    let loader = getFlag(options, keys, "loader", mustBeString);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap)
      flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
    if (tsconfigRaw)
      flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
    if (sourcefile)
      flags.push(`--sourcefile=${sourcefile}`);
    if (loader)
      flags.push(`--loader=${loader}`);
    return flags;
  }
  function createChannel(streamIn) {
    let responseCallbacks = new Map();
    let pluginCallbacks = new Map();
    let watchCallbacks = new Map();
    let serveCallbacks = new Map();
    let nextServeID = 0;
    let isClosed = false;
    let nextRequestID = 0;
    let nextBuildKey = 0;
    let stdout = new Uint8Array(16 * 1024);
    let stdoutUsed = 0;
    let readFromStdout = (chunk) => {
      let limit = stdoutUsed + chunk.length;
      if (limit > stdout.length) {
        let swap = new Uint8Array(limit * 2);
        swap.set(stdout);
        stdout = swap;
      }
      stdout.set(chunk, stdoutUsed);
      stdoutUsed += chunk.length;
      let offset = 0;
      while (offset + 4 <= stdoutUsed) {
        let length = readUInt32LE(stdout, offset);
        if (offset + 4 + length > stdoutUsed) {
          break;
        }
        offset += 4;
        handleIncomingPacket(stdout.slice(offset, offset + length));
        offset += length;
      }
      if (offset > 0) {
        stdout.set(stdout.slice(offset));
        stdoutUsed -= offset;
      }
    };
    let afterClose = () => {
      isClosed = true;
      for (let callback of responseCallbacks.values()) {
        callback("The service was stopped", null);
      }
      responseCallbacks.clear();
      for (let callbacks of serveCallbacks.values()) {
        callbacks.onWait("The service was stopped");
      }
      serveCallbacks.clear();
      for (let callback of watchCallbacks.values()) {
        try {
          callback(new Error("The service was stopped"), null);
        } catch (e) {
          console.error(e);
        }
      }
      watchCallbacks.clear();
    };
    let sendRequest = (refs, value, callback) => {
      if (isClosed)
        return callback("The service is no longer running", null);
      let id = nextRequestID++;
      responseCallbacks.set(id, (error, response) => {
        try {
          callback(error, response);
        } finally {
          if (refs)
            refs.unref();
        }
      });
      if (refs)
        refs.ref();
      streamIn.writeToStdin(encodePacket({id, isRequest: true, value}));
    };
    let sendResponse = (id, value) => {
      if (isClosed)
        throw new Error("The service is no longer running");
      streamIn.writeToStdin(encodePacket({id, isRequest: false, value}));
    };
    let handleRequest = async (id, request) => {
      try {
        switch (request.command) {
          case "ping": {
            sendResponse(id, {});
            break;
          }
          case "resolve": {
            let callback = pluginCallbacks.get(request.key);
            if (!callback)
              sendResponse(id, {});
            else
              sendResponse(id, await callback(request));
            break;
          }
          case "load": {
            let callback = pluginCallbacks.get(request.key);
            if (!callback)
              sendResponse(id, {});
            else
              sendResponse(id, await callback(request));
            break;
          }
          case "serve-request": {
            let callbacks = serveCallbacks.get(request.serveID);
            if (callbacks && callbacks.onRequest)
              callbacks.onRequest(request.args);
            sendResponse(id, {});
            break;
          }
          case "serve-wait": {
            let callbacks = serveCallbacks.get(request.serveID);
            if (callbacks)
              callbacks.onWait(request.error);
            sendResponse(id, {});
            break;
          }
          case "watch-rebuild": {
            let callback = watchCallbacks.get(request.watchID);
            try {
              if (callback)
                callback(null, request.args);
            } catch (err) {
              console.error(err);
            }
            sendResponse(id, {});
            break;
          }
          default:
            throw new Error(`Invalid command: ` + request.command);
        }
      } catch (e) {
        sendResponse(id, {errors: [extractErrorMessageV8(e, streamIn, null)]});
      }
    };
    let isFirstPacket = true;
    let handleIncomingPacket = (bytes) => {
      if (isFirstPacket) {
        isFirstPacket = false;
        let binaryVersion = String.fromCharCode(...bytes);
        if (binaryVersion !== "0.8.42") {
          throw new Error(`Cannot start service: Host version "${"0.8.42"}" does not match binary version ${JSON.stringify(binaryVersion)}`);
        }
        return;
      }
      let packet = decodePacket(bytes);
      if (packet.isRequest) {
        handleRequest(packet.id, packet.value);
      } else {
        let callback = responseCallbacks.get(packet.id);
        responseCallbacks.delete(packet.id);
        if (packet.value.error)
          callback(packet.value.error, {});
        else
          callback(null, packet.value);
      }
    };
    let handlePlugins = (plugins, request, buildKey, stash) => {
      if (streamIn.isSync)
        throw new Error("Cannot use plugins in synchronous API calls");
      let onResolveCallbacks = {};
      let onLoadCallbacks = {};
      let nextCallbackID = 0;
      let i = 0;
      request.plugins = [];
      for (let item of plugins) {
        let keys = {};
        if (typeof item !== "object")
          throw new Error(`Plugin at index ${i} must be an object`);
        let name = getFlag(item, keys, "name", mustBeString);
        let setup = getFlag(item, keys, "setup", mustBeFunction);
        if (typeof name !== "string" || name === "")
          throw new Error(`Plugin at index ${i} is missing a name`);
        if (typeof setup !== "function")
          throw new Error(`[${name}] Plugin is missing a setup function`);
        checkForInvalidFlags(item, keys, `on plugin ${JSON.stringify(name)}`);
        let plugin = {
          name,
          onResolve: [],
          onLoad: []
        };
        i++;
        setup({
          onResolve(options, callback2) {
            let keys2 = {};
            let filter = getFlag(options, keys2, "filter", mustBeRegExp);
            let namespace = getFlag(options, keys2, "namespace", mustBeString);
            checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${JSON.stringify(name)}`);
            if (filter == null)
              throw new Error(`[${plugin.name}] onResolve() call is missing a filter`);
            let id = nextCallbackID++;
            onResolveCallbacks[id] = {name, callback: callback2};
            plugin.onResolve.push({id, filter: filter.source, namespace: namespace || ""});
          },
          onLoad(options, callback2) {
            let keys2 = {};
            let filter = getFlag(options, keys2, "filter", mustBeRegExp);
            let namespace = getFlag(options, keys2, "namespace", mustBeString);
            checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${JSON.stringify(name)}`);
            if (filter == null)
              throw new Error(`[${plugin.name}] onLoad() call is missing a filter`);
            let id = nextCallbackID++;
            onLoadCallbacks[id] = {name, callback: callback2};
            plugin.onLoad.push({id, filter: filter.source, namespace: namespace || ""});
          }
        });
        request.plugins.push(plugin);
      }
      const callback = async (request2) => {
        switch (request2.command) {
          case "resolve": {
            let response = {};
            for (let id of request2.ids) {
              try {
                let {name, callback: callback2} = onResolveCallbacks[id];
                let result = await callback2({
                  path: request2.path,
                  importer: request2.importer,
                  namespace: request2.namespace,
                  resolveDir: request2.resolveDir,
                  pluginData: stash.load(request2.pluginData)
                });
                if (result != null) {
                  if (typeof result !== "object")
                    throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(name)} to return an object`);
                  let keys = {};
                  let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                  let path6 = getFlag(result, keys, "path", mustBeString);
                  let namespace = getFlag(result, keys, "namespace", mustBeString);
                  let external = getFlag(result, keys, "external", mustBeBoolean);
                  let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                  let errors = getFlag(result, keys, "errors", mustBeArray);
                  let warnings = getFlag(result, keys, "warnings", mustBeArray);
                  checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${JSON.stringify(name)}`);
                  response.id = id;
                  if (pluginName != null)
                    response.pluginName = pluginName;
                  if (path6 != null)
                    response.path = path6;
                  if (namespace != null)
                    response.namespace = namespace;
                  if (external != null)
                    response.external = external;
                  if (pluginData != null)
                    response.pluginData = stash.store(pluginData);
                  if (errors != null)
                    response.errors = sanitizeMessages(errors, "errors", stash);
                  if (warnings != null)
                    response.warnings = sanitizeMessages(warnings, "warnings", stash);
                  break;
                }
              } catch (e) {
                return {id, errors: [extractErrorMessageV8(e, streamIn, stash)]};
              }
            }
            return response;
          }
          case "load": {
            let response = {};
            for (let id of request2.ids) {
              try {
                let {name, callback: callback2} = onLoadCallbacks[id];
                let result = await callback2({
                  path: request2.path,
                  namespace: request2.namespace,
                  pluginData: stash.load(request2.pluginData)
                });
                if (result != null) {
                  if (typeof result !== "object")
                    throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(name)} to return an object`);
                  let keys = {};
                  let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                  let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                  let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                  let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                  let loader = getFlag(result, keys, "loader", mustBeString);
                  let errors = getFlag(result, keys, "errors", mustBeArray);
                  let warnings = getFlag(result, keys, "warnings", mustBeArray);
                  checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${JSON.stringify(name)}`);
                  response.id = id;
                  if (pluginName != null)
                    response.pluginName = pluginName;
                  if (contents instanceof Uint8Array)
                    response.contents = contents;
                  else if (contents != null)
                    response.contents = encodeUTF8(contents);
                  if (resolveDir != null)
                    response.resolveDir = resolveDir;
                  if (pluginData != null)
                    response.pluginData = stash.store(pluginData);
                  if (loader != null)
                    response.loader = loader;
                  if (errors != null)
                    response.errors = sanitizeMessages(errors, "errors", stash);
                  if (warnings != null)
                    response.warnings = sanitizeMessages(warnings, "warnings", stash);
                  break;
                }
              } catch (e) {
                return {id, errors: [extractErrorMessageV8(e, streamIn, stash)]};
              }
            }
            return response;
          }
          default:
            throw new Error(`Invalid command: ` + request2.command);
        }
      };
      let refCount = 0;
      return {
        ref() {
          if (++refCount === 1)
            pluginCallbacks.set(buildKey, callback);
        },
        unref() {
          if (--refCount === 0)
            pluginCallbacks.delete(buildKey);
        }
      };
    };
    let buildServeData = (refs, options, request) => {
      let keys = {};
      let port = getFlag(options, keys, "port", mustBeInteger);
      let host = getFlag(options, keys, "host", mustBeString);
      let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
      let serveID = nextServeID++;
      let onWait;
      let wait = new Promise((resolve2, reject) => {
        onWait = (error) => {
          serveCallbacks.delete(serveID);
          if (error !== null)
            reject(new Error(error));
          else
            resolve2();
        };
      });
      request.serve = {serveID};
      checkForInvalidFlags(options, keys, `in serve() call`);
      if (port !== void 0)
        request.serve.port = port;
      if (host !== void 0)
        request.serve.host = host;
      serveCallbacks.set(serveID, {
        onRequest,
        onWait
      });
      return {
        wait,
        stop() {
          sendRequest(refs, {command: "serve-stop", serveID}, () => {
          });
        }
      };
    };
    return {
      readFromStdout,
      afterClose,
      service: {
        buildOrServe(callName, callerRefs, serveOptions, options, isTTY, defaultWD, callback) {
          let pluginRefs;
          const details = createObjectStash();
          const logLevelDefault = "info";
          const refs = {
            ref() {
              if (pluginRefs)
                pluginRefs.ref();
              if (callerRefs)
                callerRefs.ref();
            },
            unref() {
              if (pluginRefs)
                pluginRefs.unref();
              if (callerRefs)
                callerRefs.unref();
            }
          };
          try {
            let key = nextBuildKey++;
            let writeDefault = !streamIn.isBrowser;
            let {
              flags,
              write,
              plugins,
              stdinContents,
              stdinResolveDir,
              absWorkingDir,
              incremental,
              watch
            } = flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault);
            let request = {
              command: "build",
              key,
              flags,
              write,
              stdinContents,
              stdinResolveDir,
              absWorkingDir: absWorkingDir || defaultWD,
              incremental,
              hasOnRebuild: !!(watch && watch.onRebuild)
            };
            let serve2 = serveOptions && buildServeData(refs, serveOptions, request);
            if (plugins && plugins.length > 0)
              pluginRefs = handlePlugins(plugins, request, key, details);
            let rebuild;
            let stop;
            let buildResponseToResult = (response, callback2) => {
              let errors = replaceDetailsInMessages(response.errors, details);
              let warnings = replaceDetailsInMessages(response.warnings, details);
              if (errors.length > 0)
                return callback2(failureErrorWithLog("Build failed", errors, warnings), null);
              let result = {warnings};
              if (response.outputFiles)
                result.outputFiles = response.outputFiles.map(convertOutputFiles);
              if (response.rebuildID !== void 0) {
                if (!rebuild) {
                  let isDisposed = false;
                  rebuild = () => new Promise((resolve2, reject) => {
                    if (isDisposed || isClosed)
                      throw new Error("Cannot rebuild");
                    sendRequest(refs, {command: "rebuild", rebuildID: response.rebuildID}, (error2, response2) => {
                      if (error2)
                        return callback2(new Error(error2), null);
                      buildResponseToResult(response2, (error3, result3) => {
                        if (error3)
                          reject(error3);
                        else
                          resolve2(result3);
                      });
                    });
                  });
                  refs.ref();
                  rebuild.dispose = () => {
                    if (isDisposed)
                      return;
                    isDisposed = true;
                    sendRequest(refs, {command: "rebuild-dispose", rebuildID: response.rebuildID}, () => {
                    });
                    refs.unref();
                  };
                }
                result.rebuild = rebuild;
              }
              if (response.watchID !== void 0) {
                if (!stop) {
                  let isStopped = false;
                  refs.ref();
                  stop = () => {
                    if (isStopped)
                      return;
                    isStopped = true;
                    watchCallbacks.delete(response.watchID);
                    sendRequest(refs, {command: "watch-stop", watchID: response.watchID}, () => {
                    });
                    refs.unref();
                  };
                  if (watch && watch.onRebuild) {
                    watchCallbacks.set(response.watchID, (serviceStopError, watchResponse) => {
                      if (serviceStopError)
                        return watch.onRebuild(serviceStopError, null);
                      let errors2 = replaceDetailsInMessages(watchResponse.errors, details);
                      let warnings2 = replaceDetailsInMessages(watchResponse.warnings, details);
                      if (errors2.length > 0)
                        return watch.onRebuild(failureErrorWithLog("Build failed", errors2, warnings2), null);
                      let result2 = {warnings: warnings2};
                      if (watchResponse.outputFiles)
                        result2.outputFiles = watchResponse.outputFiles.map(convertOutputFiles);
                      if (watchResponse.rebuildID !== void 0)
                        result2.rebuild = rebuild;
                      result2.stop = stop;
                      watch.onRebuild(null, result2);
                    });
                  }
                }
                result.stop = stop;
              }
              return callback2(null, result);
            };
            if (write && streamIn.isBrowser)
              throw new Error(`Cannot enable "write" in the browser`);
            if (incremental && streamIn.isSync)
              throw new Error(`Cannot use "incremental" with a synchronous build`);
            sendRequest(refs, request, (error, response) => {
              if (error)
                return callback(new Error(error), null);
              if (serve2) {
                let serveResponse = response;
                let isStopped = false;
                refs.ref();
                let result = {
                  port: serveResponse.port,
                  host: serveResponse.host,
                  wait: serve2.wait,
                  stop() {
                    if (isStopped)
                      return;
                    isStopped = true;
                    serve2.stop();
                    refs.unref();
                  }
                };
                refs.ref();
                serve2.wait.then(refs.unref, refs.unref);
                return callback(null, result);
              }
              return buildResponseToResult(response, callback);
            });
          } catch (e) {
            let flags = [];
            try {
              pushLogFlags(flags, options, {}, isTTY, logLevelDefault);
            } catch (e2) {
            }
            const error = extractErrorMessageV8(e, streamIn, details);
            sendRequest(refs, {command: "error", flags, error}, () => {
              error.detail = details.load(error.detail);
              callback(failureErrorWithLog("Build failed", [error], []), null);
            });
          }
        },
        transform(callName, refs, input, options, isTTY, fs3, callback) {
          const details = createObjectStash();
          const logLevelDefault = "silent";
          let start = (inputPath) => {
            try {
              let flags = flagsForTransformOptions(callName, options, isTTY, logLevelDefault);
              let request = {
                command: "transform",
                flags,
                inputFS: inputPath !== null,
                input: inputPath !== null ? inputPath : input
              };
              sendRequest(refs, request, (error, response) => {
                if (error)
                  return callback(new Error(error), null);
                let errors = replaceDetailsInMessages(response.errors, details);
                let warnings = replaceDetailsInMessages(response.warnings, details);
                let outstanding = 1;
                let next = () => --outstanding === 0 && callback(null, {warnings, code: response.code, map: response.map});
                if (errors.length > 0)
                  return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                if (response.codeFS) {
                  outstanding++;
                  fs3.readFile(response.code, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.code = contents;
                      next();
                    }
                  });
                }
                if (response.mapFS) {
                  outstanding++;
                  fs3.readFile(response.map, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.map = contents;
                      next();
                    }
                  });
                }
                next();
              });
            } catch (e) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, logLevelDefault);
              } catch (e2) {
              }
              const error = extractErrorMessageV8(e, streamIn, details);
              sendRequest(refs, {command: "error", flags, error}, () => {
                error.detail = details.load(error.detail);
                callback(failureErrorWithLog("Transform failed", [error], []), null);
              });
            }
          };
          if (input.length > 1024 * 1024) {
            let next = start;
            start = () => fs3.writeFile(input, next);
          }
          start(null);
        }
      }
    };
  }
  function createObjectStash() {
    const map = new Map();
    let nextID = 0;
    return {
      load(id) {
        return map.get(id);
      },
      store(value) {
        if (value === void 0)
          return -1;
        const id = nextID++;
        map.set(id, value);
        return id;
      }
    };
  }
  function extractErrorMessageV8(e, streamIn, stash) {
    let text = "Internal error";
    let location = null;
    try {
      text = (e && e.message || e) + "";
    } catch (e2) {
    }
    try {
      let stack = e.stack + "";
      let lines = stack.split("\n", 3);
      let at = "    at ";
      if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
        let line = lines[1].slice(at.length);
        while (true) {
          let match = /^\S+ \((.*)\)$/.exec(line);
          if (match) {
            line = match[1];
            continue;
          }
          match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
          if (match) {
            line = match[1];
            continue;
          }
          match = /^(\S+):(\d+):(\d+)$/.exec(line);
          if (match) {
            let contents = streamIn.readFileSync(match[1], "utf8");
            let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
            location = {
              file: match[1],
              namespace: "file",
              line: +match[2],
              column: +match[3] - 1,
              length: 0,
              lineText: lineText + "\n" + lines.slice(1).join("\n")
            };
          }
          break;
        }
      }
    } catch (e2) {
    }
    return {text, location, detail: stash ? stash.store(e) : -1};
  }
  function failureErrorWithLog(text, errors, warnings) {
    let limit = 5;
    let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
      if (i === limit)
        return "\n...";
      if (!e.location)
        return `
error: ${e.text}`;
      let {file, line, column} = e.location;
      return `
${file}:${line}:${column}: error: ${e.text}`;
    }).join("");
    let error = new Error(`${text}${summary}`);
    error.errors = errors;
    error.warnings = warnings;
    return error;
  }
  function replaceDetailsInMessages(messages, stash) {
    for (const message of messages) {
      message.detail = stash.load(message.detail);
    }
    return messages;
  }
  function sanitizeMessages(messages, property, stash) {
    let messagesClone = [];
    let index = 0;
    for (const message of messages) {
      let keys = {};
      let text = getFlag(message, keys, "text", mustBeString);
      let location = getFlag(message, keys, "location", mustBeObjectOrNull);
      let detail = getFlag(message, keys, "detail", canBeAnything);
      checkForInvalidFlags(message, keys, `in element ${index} of "${property}"`);
      let locationClone = null;
      if (location != null) {
        let keys2 = {};
        let file = getFlag(location, keys2, "file", mustBeString);
        let namespace = getFlag(location, keys2, "namespace", mustBeString);
        let line = getFlag(location, keys2, "line", mustBeInteger);
        let column = getFlag(location, keys2, "column", mustBeInteger);
        let length = getFlag(location, keys2, "length", mustBeInteger);
        let lineText = getFlag(location, keys2, "lineText", mustBeString);
        checkForInvalidFlags(location, keys2, `in element ${index} of "${property}"`);
        locationClone = {
          file: file || "",
          namespace: namespace || "",
          line: line || 0,
          column: column || 0,
          length: length || 0,
          lineText: lineText || ""
        };
      }
      messagesClone.push({
        text: text || "",
        location: locationClone,
        detail: stash.store(detail)
      });
      index++;
    }
    return messagesClone;
  }
  function convertOutputFiles({path: path6, contents}) {
    let text = null;
    return {
      path: path6,
      contents,
      get text() {
        if (text === null)
          text = decodeUTF8(contents);
        return text;
      }
    };
  }
  function longLivedService(getwd, startService2) {
    let entries = new Map();
    return async (options) => {
      let cwd2 = getwd();
      let optionsJSON = JSON.stringify(options || {});
      let key = optionsJSON;
      let entry = entries.get(key);
      if (entry === void 0) {
        entry = startService2(JSON.parse(optionsJSON));
        entries.set(key, entry);
      }
      try {
        let service = await entry;
        return {
          build: (options2 = {}) => {
            if (cwd2) {
              let absWorkingDir = options2.absWorkingDir;
              if (!absWorkingDir)
                options2 = __assign(__assign({}, options2), {absWorkingDir: cwd2});
            }
            return service.build(options2);
          },
          serve(serveOptions, buildOptions = {}) {
            if (cwd2) {
              let absWorkingDir = buildOptions.absWorkingDir;
              if (!absWorkingDir)
                buildOptions = __assign(__assign({}, buildOptions), {absWorkingDir: cwd2});
            }
            return service.serve(serveOptions, buildOptions);
          },
          transform(input, options2) {
            return service.transform(input, options2);
          },
          stop() {
          }
        };
      } catch (e) {
        entries.delete(key);
        throw e;
      }
    };
  }
  var version3 = "0.8.42";
  var build2 = () => {
    throw new Error(`The "build" API only works in node`);
  };
  var serve = () => {
    throw new Error(`The "serve" API only works in node`);
  };
  var transform2 = () => {
    throw new Error(`The "transform" API only works in node`);
  };
  var buildSync = () => {
    throw new Error(`The "buildSync" API only works in node`);
  };
  var transformSync = () => {
    throw new Error(`The "transformSync" API only works in node`);
  };
  var startService = longLivedService(() => "", async (options) => {
    if (!options)
      throw new Error('Must provide an options object to "startService"');
    options = validateServiceOptions(options);
    let wasmURL = options.wasmURL;
    let useWorker = options.worker !== false;
    if (!wasmURL)
      throw new Error('Must provide the "wasmURL" option');
    wasmURL += "";
    let res = await fetch(wasmURL);
    if (!res.ok)
      throw new Error(`Failed to download ${JSON.stringify(wasmURL)}`);
    let wasm = await res.arrayBuffer();
    let code = `{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

(() => {
	// Map multiple JavaScript environments to a single common API,
	// preferring web standards over Node.js API.
	//
	// Environments considered:
	// - Browsers
	// - Node.js
	// - Electron
	// - Parcel

	if (typeof global !== "undefined") {
		// global already exists
	} else if (typeof window !== "undefined") {
		window.global = window;
	} else if (typeof self !== "undefined") {
		self.global = self;
	} else {
		throw new Error("cannot export Go (neither global, window nor self is defined)");
	}

	if (!global.require && typeof require !== "undefined") {
		global.require = require;
	}

	if (!global.fs && global.require) {
		const fs = require("fs");
		if (Object.keys(fs) !== 0) {
			
    global.fs = Object.assign({}, fs, {
      // Hack around a Unicode bug in node: https://github.com/nodejs/node/issues/24550
      write(fd, buf, offset, length, position, callback) {
        if (offset === 0 && length === buf.length && position === null) {
          if (fd === process.stdout.fd) {
            try {
              process.stdout.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
          if (fd === process.stderr.fd) {
            try {
              process.stderr.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
        }
        fs.write(fd, buf, offset, length, position, callback);
      },
    });
  
		}
	}

	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!global.fs) {
		let outputBuf = "";
		global.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
			writeSync(fd, buf) {
				outputBuf += decoder.decode(buf);
				const nl = outputBuf.lastIndexOf("\\n");
				if (nl != -1) {
					console.log(outputBuf.substr(0, nl));
					outputBuf = outputBuf.substr(nl + 1);
				}
				return buf.length;
			},
			write(fd, buf, offset, length, position, callback) {
				if (offset !== 0 || length !== buf.length || position !== null) {
					callback(enosys());
					return;
				}
				const n = this.writeSync(fd, buf);
				callback(null, n);
			},
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!global.process) {
		global.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
		}
	}

	if (!global.crypto) {
		const nodeCrypto = require("crypto");
		global.crypto = {
			getRandomValues(b) {
				nodeCrypto.randomFillSync(b);
			},
		};
	}

	if (!global.performance) {
		global.performance = {
			now() {
				const [sec, nsec] = process.hrtime();
				return sec * 1000 + nsec / 1000000;
			},
		};
	}

	if (!global.TextEncoder) {
		global.TextEncoder = require("util").TextEncoder;
	}

	if (!global.TextDecoder) {
		global.TextDecoder = require("util").TextDecoder;
	}

	// End of polyfills for common API.

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	global.Go = class {
		constructor() {
			this.argv = ["js"];
			this.env = {};
			this.exit = (code) => {
				if (code !== 0) {
					console.warn("exit code:", code);
				}
			};
			this._exitPromise = new Promise((resolve) => {
				this._resolveExitPromise = resolve;
			});
			this._pendingEvent = null;
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
						id = this._values.length;
					}
					this._values[id] = v;
					this._goRefCounts[id] = 0;
					this._ids.set(v, id);
				}
				this._goRefCounts[id]++;
				let typeFlag = 0;
				switch (typeof v) {
					case "object":
						if (v !== null) {
							typeFlag = 1;
						}
						break;
					case "string":
						typeFlag = 2;
						break;
					case "symbol":
						typeFlag = 3;
						break;
					case "function":
						typeFlag = 4;
						break;
				}
				this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
				this.mem.setUint32(addr, id, true);
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				go: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
					"runtime.wasmExit": (sp) => {
						const code = this.mem.getInt32(sp + 8, true);
						this.exited = true;
						delete this._inst;
						delete this._values;
						delete this._goRefCounts;
						delete this._ids;
						delete this._idPool;
						this.exit(code);
					},

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime1() (sec int64, nsec int32)
					"runtime.walltime1": (sp) => {
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8) + 1, // setTimeout has been seen to fire up to 1 millisecond early
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
					"syscall/js.finalizeRef": (sp) => {
						const id = this.mem.getUint32(sp + 8, true);
						this._goRefCounts[id]--;
						if (this._goRefCounts[id] === 0) {
							const v = this._values[id];
							this._values[id] = null;
							this._ids.delete(v);
							this._idPool.push(id);
						}
					},

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp(); // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp(); // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp(); // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp(); // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
					"syscall/js.copyBytesToGo": (sp) => {
						const dst = loadSlice(sp + 8);
						const src = loadValue(sp + 32);
						if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
					"syscall/js.copyBytesToJS": (sp) => {
						const dst = loadValue(sp + 8);
						const src = loadSlice(sp + 16);
						if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					"debug": (value) => {
						console.log(value);
					},
				}
			};
		}

		async run(instance) {
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				global,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[global, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
				}
				return ptr;
			};

			const argc = this.argv.length;

			const argvPtrs = [];
			this.argv.forEach((arg) => {
				argvPtrs.push(strPtr(arg));
			});
			argvPtrs.push(0);

			const keys = Object.keys(this.env).sort();
			keys.forEach((key) => {
				argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
			});
			argvPtrs.push(0);

			const argv = offset;
			argvPtrs.forEach((ptr) => {
				this.mem.setUint32(offset, ptr, true);
				this.mem.setUint32(offset + 4, 0, true);
				offset += 8;
			});

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
		}

		_resume() {
			if (this.exited) {
				throw new Error("Go program has already exited");
			}
			this._inst.exports.resume();
			if (this.exited) {
				this._resolveExitPromise();
			}
		}

		_makeFuncWrapper(id) {
			const go = this;
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}

	if (
		global.require &&
		global.require.main === module &&
		global.process &&
		global.process.versions &&
		!global.process.versions.electron
	) {
		if (process.argv.length < 3) {
			console.error("usage: go_js_wasm_exec [wasm binary] [arguments]");
			process.exit(1);
		}

		const go = new Go();
		go.argv = process.argv.slice(2);
		go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
		go.exit = process.exit;
		WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then((result) => {
			process.on("exit", (code) => { // Node.js exits if no event handler is pending
				if (code === 0 && !go.exited) {
					// deadlock, make Go print error and stack traces
					go._pendingEvent = { id: 0 };
					go._resume();
				}
			});
			return go.run(result.instance);
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
})();
onmessage = ({data: wasm}) => {
  let decoder = new TextDecoder();
  let fs = global.fs;
  let stderr = "";
  fs.writeSync = (fd, buffer) => {
    if (fd === 1) {
      postMessage(buffer);
    } else if (fd === 2) {
      stderr += decoder.decode(buffer);
      let parts = stderr.split("\\n");
      if (parts.length > 1)
        console.log(parts.slice(0, -1).join("\\n"));
      stderr = parts[parts.length - 1];
    } else {
      throw new Error("Bad write");
    }
    return buffer.length;
  };
  let stdin = [];
  let resumeStdin;
  let stdinPos = 0;
  onmessage = ({data}) => {
    if (data.length > 0) {
      stdin.push(data);
      if (resumeStdin)
        resumeStdin();
    }
  };
  fs.read = (fd, buffer, offset, length, position, callback) => {
    if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
      throw new Error("Bad read");
    }
    if (stdin.length === 0) {
      resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
      return;
    }
    let first = stdin[0];
    let count = Math.max(0, Math.min(length, first.length - stdinPos));
    buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
    stdinPos += count;
    if (stdinPos === first.length) {
      stdin.shift();
      stdinPos = 0;
    }
    callback(null, count);
  };
  let go = new global.Go();
  go.argv = ["", \`--service=\${"0.8.42"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({instance}) => go.run(instance));
};}`;
    let worker;
    if (useWorker) {
      let blob = new Blob([code], {type: "application/javascript"});
      worker = new Worker(URL.createObjectURL(blob));
    } else {
      let fn = new Function("postMessage", code + `var onmessage; return m => onmessage(m)`);
      let onmessage = fn((data) => worker.onmessage({data}));
      worker = {
        onmessage: null,
        postMessage: (data) => onmessage({data}),
        terminate() {
        }
      };
    }
    worker.postMessage(wasm);
    worker.onmessage = ({data}) => readFromStdout(data);
    let {readFromStdout, afterClose, service} = createChannel({
      writeToStdin(bytes) {
        worker.postMessage(bytes);
      },
      isSync: false,
      isBrowser: true
    });
    return {
      build: (options2) => new Promise((resolve2, reject) => service.buildOrServe("build", null, null, options2, false, "/", (err, res2) => err ? reject(err) : resolve2(res2))),
      transform: (input, options2) => {
        input += "";
        return new Promise((resolve2, reject) => service.transform("transform", null, input, options2 || {}, false, {
          readFile(_, callback) {
            callback(new Error("Internal error"), null);
          },
          writeFile(_, callback) {
            callback(null);
          }
        }, (err, res2) => err ? reject(err) : resolve2(res2)));
      },
      serve() {
        throw new Error(`The "serve" API only works in node`);
      },
      buildSync() {
        throw new Error(`The "buildSync" API only works in node`);
      },
      transformSync() {
        throw new Error(`The "transformSync" API only works in node`);
      },
      stop() {
        worker.terminate();
        afterClose();
      }
    };
  });
});

// ../../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js
var require_path_browserify = __commonJS((exports, module) => {
  "use strict";
  function assertPath(path6) {
    if (typeof path6 !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path6));
    }
  }
  function normalizeStringPosix(path6, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for (var i = 0; i <= path6.length; ++i) {
      if (i < path6.length)
        code = path6.charCodeAt(i);
      else if (code === 47)
        break;
      else
        code = 47;
      if (code === 47) {
        if (lastSlash === i - 1 || dots === 1) {
        } else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              var lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0)
              res += "/..";
            else
              res = "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0)
            res += "/" + path6.slice(lastSlash + 1, i);
          else
            res = path6.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep + base;
  }
  var posix = {
    resolve: function resolve2() {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path6;
        if (i >= 0)
          path6 = arguments[i];
        else {
          if (cwd2 === void 0)
            cwd2 = process_exports.cwd();
          path6 = cwd2;
        }
        assertPath(path6);
        if (path6.length === 0) {
          continue;
        }
        resolvedPath = path6 + "/" + resolvedPath;
        resolvedAbsolute = path6.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0)
          return "/" + resolvedPath;
        else
          return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    },
    normalize: function normalize(path6) {
      assertPath(path6);
      if (path6.length === 0)
        return ".";
      var isAbsolute = path6.charCodeAt(0) === 47;
      var trailingSeparator = path6.charCodeAt(path6.length - 1) === 47;
      path6 = normalizeStringPosix(path6, !isAbsolute);
      if (path6.length === 0 && !isAbsolute)
        path6 = ".";
      if (path6.length > 0 && trailingSeparator)
        path6 += "/";
      if (isAbsolute)
        return "/" + path6;
      return path6;
    },
    isAbsolute: function isAbsolute(path6) {
      assertPath(path6);
      return path6.length > 0 && path6.charCodeAt(0) === 47;
    },
    join: function join() {
      if (arguments.length === 0)
        return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0)
            joined = arg;
          else
            joined += "/" + arg;
        }
      }
      if (joined === void 0)
        return ".";
      return posix.normalize(joined);
    },
    relative: function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to)
        return "";
      from = posix.resolve(from);
      to = posix.resolve(to);
      if (from === to)
        return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47)
          break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47)
          break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
          break;
        else if (fromCode === 47)
          lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0)
            out += "..";
          else
            out += "/..";
        }
      }
      if (out.length > 0)
        return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47)
          ++toStart;
        return to.slice(toStart);
      }
    },
    _makeLong: function _makeLong(path6) {
      return path6;
    },
    dirname: function dirname(path6) {
      assertPath(path6);
      if (path6.length === 0)
        return ".";
      var code = path6.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path6.length - 1; i >= 1; --i) {
        code = path6.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1)
        return hasRoot ? "/" : ".";
      if (hasRoot && end === 1)
        return "//";
      return path6.slice(0, end);
    },
    basename: function basename(path6, ext) {
      if (ext !== void 0 && typeof ext !== "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path6);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path6.length) {
        if (ext.length === path6.length && ext === path6)
          return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path6.length - 1; i >= 0; --i) {
          var code = path6.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end)
          end = firstNonSlashEnd;
        else if (end === -1)
          end = path6.length;
        return path6.slice(start, end);
      } else {
        for (i = path6.length - 1; i >= 0; --i) {
          if (path6.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1)
          return "";
        return path6.slice(start, end);
      }
    },
    extname: function extname(path6) {
      assertPath(path6);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path6.length - 1; i >= 0; --i) {
        var code = path6.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path6.slice(startDot, end);
    },
    format: function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      }
      return _format("/", pathObject);
    },
    parse: function parse(path6) {
      assertPath(path6);
      var ret = {root: "", dir: "", base: "", ext: "", name: ""};
      if (path6.length === 0)
        return ret;
      var code = path6.charCodeAt(0);
      var isAbsolute = code === 47;
      var start;
      if (isAbsolute) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path6.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path6.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute)
            ret.base = ret.name = path6.slice(1, end);
          else
            ret.base = ret.name = path6.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute) {
          ret.name = path6.slice(1, startDot);
          ret.base = path6.slice(1, end);
        } else {
          ret.name = path6.slice(startPart, startDot);
          ret.base = path6.slice(startPart, end);
        }
        ret.ext = path6.slice(startDot, end);
      }
      if (startPart > 0)
        ret.dir = path6.slice(0, startPart - 1);
      else if (isAbsolute)
        ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix.posix = posix;
  module.exports = posix;
});

// ../../node_modules/.pnpm/debounce@1.2.0/node_modules/debounce/index.js
var require_debounce = __commonJS((exports, module) => {
  function debounce2(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    if (wait == null)
      wait = 100;
    function later() {
      var last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    }
    ;
    var debounced = function() {
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout)
        timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
    debounced.clear = function() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    debounced.flush = function() {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
        clearTimeout(timeout);
        timeout = null;
      }
    };
    return debounced;
  }
  debounce2.debounce = debounce2;
  module.exports = debounce2;
});

// ../../node_modules/.pnpm/punycode@1.3.2/node_modules/punycode/punycode.js
var require_punycode = __commonJS((exports, module) => {
  /*! https://mths.be/punycode v1.3.2 by @mathias */
  (function(root) {
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = typeof module == "object" && module && !module.nodeType && module;
    var freeGlobal = typeof global == "object" && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
      root = freeGlobal;
    }
    var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
    function error(type) {
      throw RangeError(errors[type]);
    }
    function map(array, fn) {
      var length = array.length;
      var result = [];
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output = [], counter = 0, length = string.length, value, extra;
      while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    function ucs2encode(array) {
      return map(array, function(value) {
        var output = "";
        if (value > 65535) {
          value -= 65536;
          output += stringFromCharCode(value >>> 10 & 1023 | 55296);
          value = 56320 | value & 1023;
        }
        output += stringFromCharCode(value);
        return output;
      }).join("");
    }
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base;
    }
    function digitToBasic(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    function decode(input) {
      var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
      basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        for (oldi = i, w = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return ucs2encode(output);
    }
    function encode(input) {
      var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
      input = ucs2decode(input);
      inputLength = input.length;
      n = initialN;
      delta = 0;
      bias = initialBias;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      handledCPCount = basicLength = output.length;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue == n) {
            for (q = delta, k = base; ; k += base) {
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              qMinusT = q - t;
              baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    }
    function toUnicode(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    }
    function toASCII(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    }
    punycode = {
      version: "1.3.2",
      ucs2: {
        decode: ucs2decode,
        encode: ucs2encode
      },
      decode,
      encode,
      toASCII,
      toUnicode
    };
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
      define("punycode", function() {
        return punycode;
      });
    } else if (freeExports && freeModule) {
      if (module.exports == freeExports) {
        freeModule.exports = punycode;
      } else {
        for (key in punycode) {
          punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
        }
      }
    } else {
      root.punycode = punycode;
    }
  })(exports);
});

// ../../node_modules/.pnpm/url@0.11.0/node_modules/url/util.js
var require_util = __commonJS((exports, module) => {
  "use strict";
  module.exports = {
    isString: function(arg) {
      return typeof arg === "string";
    },
    isObject: function(arg) {
      return typeof arg === "object" && arg !== null;
    },
    isNull: function(arg) {
      return arg === null;
    },
    isNullOrUndefined: function(arg) {
      return arg == null;
    }
  };
});

// ../../node_modules/.pnpm/querystring@0.2.0/node_modules/querystring/decode.js
var require_decode = __commonJS((exports, module) => {
  "use strict";
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  module.exports = function(qs, sep, eq, options) {
    sep = sep || "&";
    eq = eq || "=";
    var obj = {};
    if (typeof qs !== "string" || qs.length === 0) {
      return obj;
    }
    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1e3;
    if (options && typeof options.maxKeys === "number") {
      maxKeys = options.maxKeys;
    }
    var len = qs.length;
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }
    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = "";
      }
      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);
      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }
    return obj;
  };
});

// ../../node_modules/.pnpm/querystring@0.2.0/node_modules/querystring/encode.js
var require_encode = __commonJS((exports, module) => {
  "use strict";
  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case "string":
        return v;
      case "boolean":
        return v ? "true" : "false";
      case "number":
        return isFinite(v) ? v : "";
      default:
        return "";
    }
  };
  module.exports = function(obj, sep, eq, name) {
    sep = sep || "&";
    eq = eq || "=";
    if (obj === null) {
      obj = void 0;
    }
    if (typeof obj === "object") {
      return Object.keys(obj).map(function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }
    if (!name)
      return "";
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  };
});

// ../../node_modules/.pnpm/querystring@0.2.0/node_modules/querystring/index.js
var require_querystring = __commonJS((exports) => {
  "use strict";
  exports.decode = exports.parse = require_decode();
  exports.encode = exports.stringify = require_encode();
});

// ../../node_modules/.pnpm/url@0.11.0/node_modules/url/url.js
var require_url = __commonJS((exports) => {
  "use strict";
  var punycode = require_punycode();
  var util = require_util();
  exports.parse = urlParse;
  exports.resolve = urlResolve;
  exports.resolveObject = urlResolveObject;
  exports.format = urlFormat;
  exports.Url = Url;
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }
  var protocolPattern = /^([a-z0-9.+-]+:)/i;
  var portPattern = /:[0-9]*$/;
  var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
  var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
  var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
  var autoEscape = ["'"].concat(unwise);
  var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
  var hostEndingChars = ["/", "?", "#"];
  var hostnameMaxLen = 255;
  var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
  var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
  var unsafeProtocol = {
    javascript: true,
    "javascript:": true
  };
  var hostlessProtocol = {
    javascript: true,
    "javascript:": true
  };
  var slashedProtocol = {
    http: true,
    https: true,
    ftp: true,
    gopher: true,
    file: true,
    "http:": true,
    "https:": true,
    "ftp:": true,
    "gopher:": true,
    "file:": true
  };
  var querystring = require_querystring();
  function urlParse(url2, parseQueryString, slashesDenoteHost) {
    if (url2 && util.isObject(url2) && url2 instanceof Url)
      return url2;
    var u = new Url();
    u.parse(url2, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url2)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
    }
    var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, "/");
    url2 = uSplit.join(splitter);
    var rest = url2;
    rest = rest.trim();
    if (!slashesDenoteHost && url2.split("#").length === 1) {
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        return this;
      }
    }
    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === "//";
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      var auth, atSign;
      if (hostEnd === -1) {
        atSign = rest.lastIndexOf("@");
      } else {
        atSign = rest.lastIndexOf("@", hostEnd);
      }
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      if (hostEnd === -1)
        hostEnd = rest.length;
      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);
      this.parseHost();
      this.hostname = this.hostname || "";
      var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part)
            continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = "";
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                newpart += "x";
              } else {
                newpart += part[j];
              }
            }
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = "/" + notHost.join(".") + rest;
              }
              this.hostname = validParts.join(".");
              break;
            }
          }
        }
      }
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = "";
      } else {
        this.hostname = this.hostname.toLowerCase();
      }
      if (!ipv6Hostname) {
        this.hostname = punycode.toASCII(this.hostname);
      }
      var p = this.port ? ":" + this.port : "";
      var h = this.hostname || "";
      this.host = h + p;
      this.href += this.host;
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== "/") {
          rest = "/" + rest;
        }
      }
    }
    if (!unsafeProtocol[lowerProto]) {
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }
    var hash = rest.indexOf("#");
    if (hash !== -1) {
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf("?");
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      this.search = "";
      this.query = {};
    }
    if (rest)
      this.pathname = rest;
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = "/";
    }
    if (this.pathname || this.search) {
      var p = this.pathname || "";
      var s = this.search || "";
      this.path = p + s;
    }
    this.href = this.format();
    return this;
  };
  function urlFormat(obj) {
    if (util.isString(obj))
      obj = urlParse(obj);
    if (!(obj instanceof Url))
      return Url.prototype.format.call(obj);
    return obj.format();
  }
  Url.prototype.format = function() {
    var auth = this.auth || "";
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ":");
      auth += "@";
    }
    var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
      if (this.port) {
        host += ":" + this.port;
      }
    }
    if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }
    var search = this.search || query && "?" + query || "";
    if (protocol && protocol.substr(-1) !== ":")
      protocol += ":";
    if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = "//" + (host || "");
      if (pathname && pathname.charAt(0) !== "/")
        pathname = "/" + pathname;
    } else if (!host) {
      host = "";
    }
    if (hash && hash.charAt(0) !== "#")
      hash = "#" + hash;
    if (search && search.charAt(0) !== "?")
      search = "?" + search;
    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace("#", "%23");
    return protocol + host + pathname + search + hash;
  };
  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }
  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };
  function urlResolveObject(source, relative) {
    if (!source)
      return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }
  Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }
    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }
    result.hash = relative.hash;
    if (relative.href === "") {
      result.href = result.format();
      return result;
    }
    if (relative.slashes && !relative.protocol) {
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== "protocol")
          result[rkey] = relative[rkey];
      }
      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = "/";
      }
      result.href = result.format();
      return result;
    }
    if (relative.protocol && relative.protocol !== result.protocol) {
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }
      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || "").split("/");
        while (relPath.length && !(relative.host = relPath.shift()))
          ;
        if (!relative.host)
          relative.host = "";
        if (!relative.hostname)
          relative.hostname = "";
        if (relPath[0] !== "")
          relPath.unshift("");
        if (relPath.length < 2)
          relPath.unshift("");
        result.pathname = relPath.join("/");
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || "";
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      if (result.pathname || result.search) {
        var p = result.pathname || "";
        var s = result.search || "";
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
    if (psychotic) {
      result.hostname = "";
      result.port = null;
      if (result.host) {
        if (srcPath[0] === "")
          srcPath[0] = result.host;
        else
          srcPath.unshift(result.host);
      }
      result.host = "";
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === "")
            relPath[0] = relative.host;
          else
            relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
    }
    if (isRelAbs) {
      result.host = relative.host || relative.host === "" ? relative.host : result.host;
      result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
    } else if (relPath.length) {
      if (!srcPath)
        srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.href = result.format();
      return result;
    }
    if (!srcPath.length) {
      result.pathname = null;
      if (result.search) {
        result.path = "/" + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === ".") {
        srcPath.splice(i, 1);
      } else if (last === "..") {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift("..");
      }
    }
    if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
      srcPath.unshift("");
    }
    if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
      srcPath.push("");
    }
    var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
      var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift("");
    }
    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join("/");
    }
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };
  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ":") {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host)
      this.hostname = host;
  };
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/constants.js
var require_constants = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.constants = void 0;
  exports.constants = {
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 64,
    O_EXCL: 128,
    O_NOCTTY: 256,
    O_TRUNC: 512,
    O_APPEND: 1024,
    O_DIRECTORY: 65536,
    O_NOATIME: 262144,
    O_NOFOLLOW: 131072,
    O_SYNC: 1052672,
    O_DIRECT: 16384,
    O_NONBLOCK: 2048,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    UV_FS_COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_EXCL: 1,
    COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE_FORCE: 4
  };
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/getBigInt.js
var require_getBigInt = __commonJS((exports) => {
  if (typeof BigInt === "function")
    exports.default = BigInt;
  else
    exports.default = function BigIntNotSupported() {
      throw new Error("BigInt is not supported in this environment.");
    };
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/Stats.js
var require_Stats = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Stats = void 0;
  var constants_1 = require_constants();
  var getBigInt_1 = require_getBigInt();
  var S_IFMT = constants_1.constants.S_IFMT;
  var S_IFDIR = constants_1.constants.S_IFDIR;
  var S_IFREG = constants_1.constants.S_IFREG;
  var S_IFBLK = constants_1.constants.S_IFBLK;
  var S_IFCHR = constants_1.constants.S_IFCHR;
  var S_IFLNK = constants_1.constants.S_IFLNK;
  var S_IFIFO = constants_1.constants.S_IFIFO;
  var S_IFSOCK = constants_1.constants.S_IFSOCK;
  var Stats = function() {
    function Stats2() {
    }
    Stats2.build = function(node, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }
      var stats = new Stats2();
      var uid = node.uid, gid = node.gid, atime = node.atime, mtime = node.mtime, ctime = node.ctime;
      var getStatNumber = !bigint ? function(number) {
        return number;
      } : getBigInt_1.default;
      stats.uid = getStatNumber(uid);
      stats.gid = getStatNumber(gid);
      stats.rdev = getStatNumber(0);
      stats.blksize = getStatNumber(4096);
      stats.ino = getStatNumber(node.ino);
      stats.size = getStatNumber(node.getSize());
      stats.blocks = getStatNumber(1);
      stats.atime = atime;
      stats.mtime = mtime;
      stats.ctime = ctime;
      stats.birthtime = ctime;
      stats.atimeMs = getStatNumber(atime.getTime());
      stats.mtimeMs = getStatNumber(mtime.getTime());
      var ctimeMs = getStatNumber(ctime.getTime());
      stats.ctimeMs = ctimeMs;
      stats.birthtimeMs = ctimeMs;
      stats.dev = getStatNumber(0);
      stats.mode = getStatNumber(node.mode);
      stats.nlink = getStatNumber(node.nlink);
      return stats;
    };
    Stats2.prototype._checkModeProperty = function(property) {
      return (Number(this.mode) & S_IFMT) === property;
    };
    Stats2.prototype.isDirectory = function() {
      return this._checkModeProperty(S_IFDIR);
    };
    Stats2.prototype.isFile = function() {
      return this._checkModeProperty(S_IFREG);
    };
    Stats2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(S_IFBLK);
    };
    Stats2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(S_IFCHR);
    };
    Stats2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(S_IFLNK);
    };
    Stats2.prototype.isFIFO = function() {
      return this._checkModeProperty(S_IFIFO);
    };
    Stats2.prototype.isSocket = function() {
      return this._checkModeProperty(S_IFSOCK);
    };
    return Stats2;
  }();
  exports.Stats = Stats;
  exports.default = Stats;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/internal/buffer.js
var require_buffer2 = __commonJS((exports) => {
  "use strict";
  var __spreadArrays = exports && exports.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.bufferFrom = exports.bufferAllocUnsafe = exports.Buffer = void 0;
  var buffer_1 = require_buffer();
  Object.defineProperty(exports, "Buffer", {enumerable: true, get: function() {
    return buffer_1.Buffer;
  }});
  function bufferV0P12Ponyfill(arg0) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return new (buffer_1.Buffer.bind.apply(buffer_1.Buffer, __spreadArrays([void 0, arg0], args)))();
  }
  var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
  exports.bufferAllocUnsafe = bufferAllocUnsafe;
  var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
  exports.bufferFrom = bufferFrom;
});

// ../../node_modules/.pnpm/has-symbols@1.0.1/node_modules/has-symbols/shams.js
var require_shams = __commonJS((exports, module) => {
  "use strict";
  module.exports = function hasSymbols() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
});

// ../../node_modules/.pnpm/has-symbols@1.0.1/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS((exports, module) => {
  "use strict";
  var origSymbol = global.Symbol;
  var hasSymbolSham = require_shams();
  module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
});

// ../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/implementation.js
var require_implementation = __commonJS((exports, module) => {
  "use strict";
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var slice = Array.prototype.slice;
  var toStr = Object.prototype.toString;
  var funcType = "[object Function]";
  module.exports = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(this, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(that, args.concat(slice.call(arguments)));
      }
    };
    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs.push("$" + i);
    }
    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
});

// ../../node_modules/.pnpm/function-bind@1.1.1/node_modules/function-bind/index.js
var require_function_bind = __commonJS((exports, module) => {
  "use strict";
  var implementation = require_implementation();
  module.exports = Function.prototype.bind || implementation;
});

// ../../node_modules/.pnpm/has@1.0.3/node_modules/has/src/index.js
var require_src = __commonJS((exports, module) => {
  "use strict";
  var bind = require_function_bind();
  module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
});

// ../../node_modules/.pnpm/get-intrinsic@1.1.1/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS((exports, module) => {
  "use strict";
  var undefined2;
  var $SyntaxError = SyntaxError;
  var $Function = Function;
  var $TypeError = TypeError;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
    try {
      $gOPD({}, "");
    } catch (e) {
      $gOPD = null;
    }
  }
  var throwTypeError = function() {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols = require_has_symbols()();
  var getProto = Object.getPrototypeOf || function(x) {
    return x.__proto__;
  };
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
  var INTRINSICS = {
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
    "%AsyncFromSyncIteratorPrototype%": undefined2,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
    "%JSON%": typeof JSON === "object" ? JSON : undefined2,
    "%Map%": typeof Map === "undefined" ? undefined2 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined2 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
    "%Symbol%": hasSymbols ? Symbol : undefined2,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
  };
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = require_function_bind();
  var hasOwn = require_src();
  var $concat = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
});

// ../../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/index.js
var require_call_bind = __commonJS((exports, module) => {
  "use strict";
  var bind = require_function_bind();
  var GetIntrinsic = require_get_intrinsic();
  var $apply = GetIntrinsic("%Function.prototype.apply%");
  var $call = GetIntrinsic("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
  var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
  var $max = GetIntrinsic("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", {value: 1});
    } catch (e) {
      $defineProperty = null;
    }
  }
  module.exports = function callBind(originalFunction) {
    var func = $reflectApply(bind, $call, arguments);
    if ($gOPD && $defineProperty) {
      var desc = $gOPD(func, "length");
      if (desc.configurable) {
        $defineProperty(func, "length", {value: 1 + $max(0, originalFunction.length - (arguments.length - 1))});
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module.exports, "apply", {value: applyBind});
  } else {
    module.exports.apply = applyBind;
  }
});

// ../../node_modules/.pnpm/call-bind@1.0.2/node_modules/call-bind/callBound.js
var require_callBound = __commonJS((exports, module) => {
  "use strict";
  var GetIntrinsic = require_get_intrinsic();
  var callBind = require_call_bind();
  var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
  module.exports = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBind(intrinsic);
    }
    return intrinsic;
  };
});

// ../../node_modules/.pnpm/is-arguments@1.1.0/node_modules/is-arguments/index.js
var require_is_arguments = __commonJS((exports, module) => {
  "use strict";
  var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  var callBound = require_callBound();
  var $toString = callBound("Object.prototype.toString");
  var isStandardArguments = function isArguments(value) {
    if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return $toString(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
  }();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
});

// ../../node_modules/.pnpm/is-generator-function@1.0.8/node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS((exports, module) => {
  "use strict";
  var toStr = Object.prototype.toString;
  var fnToStr = Function.prototype.toString;
  var isFnRegex = /^\s*(?:function)?\*/;
  var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  var getProto = Object.getPrototypeOf;
  var getGeneratorFunc = function() {
    if (!hasToStringTag) {
      return false;
    }
    try {
      return Function("return function*() {}")();
    } catch (e) {
    }
  };
  var generatorFunc = getGeneratorFunc();
  var GeneratorFunction = getProto && generatorFunc ? getProto(generatorFunc) : false;
  module.exports = function isGeneratorFunction(fn) {
    if (typeof fn !== "function") {
      return false;
    }
    if (isFnRegex.test(fnToStr.call(fn))) {
      return true;
    }
    if (!hasToStringTag) {
      var str = toStr.call(fn);
      return str === "[object GeneratorFunction]";
    }
    return getProto && getProto(fn) === GeneratorFunction;
  };
});

// ../../node_modules/.pnpm/foreach@2.0.5/node_modules/foreach/index.js
var require_foreach = __commonJS((exports, module) => {
  var hasOwn = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;
  module.exports = function forEach(obj, fn, ctx) {
    if (toString.call(fn) !== "[object Function]") {
      throw new TypeError("iterator must be a function");
    }
    var l = obj.length;
    if (l === +l) {
      for (var i = 0; i < l; i++) {
        fn.call(ctx, obj[i], i, obj);
      }
    } else {
      for (var k in obj) {
        if (hasOwn.call(obj, k)) {
          fn.call(ctx, obj[k], k, obj);
        }
      }
    }
  };
});

// ../../node_modules/.pnpm/array-filter@1.0.0/node_modules/array-filter/index.js
var require_array_filter = __commonJS((exports, module) => {
  module.exports = function(arr, fn, self) {
    if (arr.filter)
      return arr.filter(fn, self);
    if (arr === void 0 || arr === null)
      throw new TypeError();
    if (typeof fn != "function")
      throw new TypeError();
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i))
        continue;
      var val = arr[i];
      if (fn.call(self, val, i, arr))
        ret.push(val);
    }
    return ret;
  };
  var hasOwn = Object.prototype.hasOwnProperty;
});

// ../../node_modules/.pnpm/available-typed-arrays@1.0.2/node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS((exports, module) => {
  "use strict";
  var filter = require_array_filter();
  module.exports = function availableTypedArrays() {
    return filter([
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ], function(typedArray) {
      return typeof global[typedArray] === "function";
    });
  };
});

// ../../node_modules/.pnpm/es-abstract@1.18.0-next.2/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js
var require_getOwnPropertyDescriptor = __commonJS((exports, module) => {
  "use strict";
  var GetIntrinsic = require_get_intrinsic();
  var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%");
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  module.exports = $gOPD;
});

// ../../node_modules/.pnpm/is-typed-array@1.1.4/node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS((exports, module) => {
  "use strict";
  var forEach = require_foreach();
  var availableTypedArrays = require_available_typed_arrays();
  var callBound = require_callBound();
  var $toString = callBound("Object.prototype.toString");
  var hasSymbols = require_has_symbols()();
  var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
  var typedArrays = availableTypedArrays();
  var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };
  var $slice = callBound("String.prototype.slice");
  var toStrTags = {};
  var gOPD = require_getOwnPropertyDescriptor();
  var getPrototypeOf = Object.getPrototypeOf;
  if (hasToStringTag && gOPD && getPrototypeOf) {
    forEach(typedArrays, function(typedArray) {
      var arr = new global[typedArray]();
      if (!(Symbol.toStringTag in arr)) {
        throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
      }
      var proto = getPrototypeOf(arr);
      var descriptor = gOPD(proto, Symbol.toStringTag);
      if (!descriptor) {
        var superProto = getPrototypeOf(proto);
        descriptor = gOPD(superProto, Symbol.toStringTag);
      }
      toStrTags[typedArray] = descriptor.get;
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var anyTrue = false;
    forEach(toStrTags, function(getter, typedArray) {
      if (!anyTrue) {
        try {
          anyTrue = getter.call(value) === typedArray;
        } catch (e) {
        }
      }
    });
    return anyTrue;
  };
  module.exports = function isTypedArray(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      return $indexOf(typedArrays, tag) > -1;
    }
    if (!gOPD) {
      return false;
    }
    return tryTypedArrays(value);
  };
});

// ../../node_modules/.pnpm/which-typed-array@1.1.4/node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS((exports, module) => {
  "use strict";
  var forEach = require_foreach();
  var availableTypedArrays = require_available_typed_arrays();
  var callBound = require_callBound();
  var $toString = callBound("Object.prototype.toString");
  var hasSymbols = require_has_symbols()();
  var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
  var typedArrays = availableTypedArrays();
  var $slice = callBound("String.prototype.slice");
  var toStrTags = {};
  var gOPD = require_getOwnPropertyDescriptor();
  var getPrototypeOf = Object.getPrototypeOf;
  if (hasToStringTag && gOPD && getPrototypeOf) {
    forEach(typedArrays, function(typedArray) {
      if (typeof global[typedArray] === "function") {
        var arr = new global[typedArray]();
        if (!(Symbol.toStringTag in arr)) {
          throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
        }
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        toStrTags[typedArray] = descriptor.get;
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var foundName = false;
    forEach(toStrTags, function(getter, typedArray) {
      if (!foundName) {
        try {
          var name = getter.call(value);
          if (name === typedArray) {
            foundName = name;
          }
        } catch (e) {
        }
      }
    });
    return foundName;
  };
  var isTypedArray = require_is_typed_array();
  module.exports = function whichTypedArray(value) {
    if (!isTypedArray(value)) {
      return false;
    }
    if (!hasToStringTag) {
      return $slice($toString(value), 8, -1);
    }
    return tryTypedArrays(value);
  };
});

// ../../node_modules/.pnpm/util@0.12.3/node_modules/util/support/types.js
var require_types = __commonJS((exports) => {
  "use strict";
  var isArgumentsObject = require_is_arguments();
  var isGeneratorFunction = require_is_generator_function();
  var whichTypedArray = require_which_typed_array();
  var isTypedArray = require_is_typed_array();
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var BigIntSupported = typeof BigInt !== "undefined";
  var SymbolSupported = typeof Symbol !== "undefined";
  var ObjectToString = uncurryThis(Object.prototype.toString);
  var numberValue = uncurryThis(Number.prototype.valueOf);
  var stringValue = uncurryThis(String.prototype.valueOf);
  var booleanValue = uncurryThis(Boolean.prototype.valueOf);
  if (BigIntSupported) {
    bigIntValue = uncurryThis(BigInt.prototype.valueOf);
  }
  var bigIntValue;
  if (SymbolSupported) {
    symbolValue = uncurryThis(Symbol.prototype.valueOf);
  }
  var symbolValue;
  function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") {
      return false;
    }
    try {
      prototypeValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  exports.isArgumentsObject = isArgumentsObject;
  exports.isGeneratorFunction = isGeneratorFunction;
  exports.isTypedArray = isTypedArray;
  function isPromise(input) {
    return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
  }
  exports.isPromise = isPromise;
  function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      return ArrayBuffer.isView(value);
    }
    return isTypedArray(value) || isDataView(value);
  }
  exports.isArrayBufferView = isArrayBufferView;
  function isUint8Array(value) {
    return whichTypedArray(value) === "Uint8Array";
  }
  exports.isUint8Array = isUint8Array;
  function isUint8ClampedArray(value) {
    return whichTypedArray(value) === "Uint8ClampedArray";
  }
  exports.isUint8ClampedArray = isUint8ClampedArray;
  function isUint16Array(value) {
    return whichTypedArray(value) === "Uint16Array";
  }
  exports.isUint16Array = isUint16Array;
  function isUint32Array(value) {
    return whichTypedArray(value) === "Uint32Array";
  }
  exports.isUint32Array = isUint32Array;
  function isInt8Array(value) {
    return whichTypedArray(value) === "Int8Array";
  }
  exports.isInt8Array = isInt8Array;
  function isInt16Array(value) {
    return whichTypedArray(value) === "Int16Array";
  }
  exports.isInt16Array = isInt16Array;
  function isInt32Array(value) {
    return whichTypedArray(value) === "Int32Array";
  }
  exports.isInt32Array = isInt32Array;
  function isFloat32Array(value) {
    return whichTypedArray(value) === "Float32Array";
  }
  exports.isFloat32Array = isFloat32Array;
  function isFloat64Array(value) {
    return whichTypedArray(value) === "Float64Array";
  }
  exports.isFloat64Array = isFloat64Array;
  function isBigInt64Array(value) {
    return whichTypedArray(value) === "BigInt64Array";
  }
  exports.isBigInt64Array = isBigInt64Array;
  function isBigUint64Array(value) {
    return whichTypedArray(value) === "BigUint64Array";
  }
  exports.isBigUint64Array = isBigUint64Array;
  function isMapToString(value) {
    return ObjectToString(value) === "[object Map]";
  }
  isMapToString.working = typeof Map !== "undefined" && isMapToString(new Map());
  function isMap(value) {
    if (typeof Map === "undefined") {
      return false;
    }
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
  }
  exports.isMap = isMap;
  function isSetToString(value) {
    return ObjectToString(value) === "[object Set]";
  }
  isSetToString.working = typeof Set !== "undefined" && isSetToString(new Set());
  function isSet(value) {
    if (typeof Set === "undefined") {
      return false;
    }
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
  }
  exports.isSet = isSet;
  function isWeakMapToString(value) {
    return ObjectToString(value) === "[object WeakMap]";
  }
  isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(new WeakMap());
  function isWeakMap(value) {
    if (typeof WeakMap === "undefined") {
      return false;
    }
    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
  }
  exports.isWeakMap = isWeakMap;
  function isWeakSetToString(value) {
    return ObjectToString(value) === "[object WeakSet]";
  }
  isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(new WeakSet());
  function isWeakSet(value) {
    return isWeakSetToString(value);
  }
  exports.isWeakSet = isWeakSet;
  function isArrayBufferToString(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
  }
  isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
  function isArrayBuffer(value) {
    if (typeof ArrayBuffer === "undefined") {
      return false;
    }
    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
  }
  exports.isArrayBuffer = isArrayBuffer;
  function isDataViewToString(value) {
    return ObjectToString(value) === "[object DataView]";
  }
  isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
  function isDataView(value) {
    if (typeof DataView === "undefined") {
      return false;
    }
    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
  }
  exports.isDataView = isDataView;
  function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
  }
  isSharedArrayBufferToString.working = typeof SharedArrayBuffer !== "undefined" && isSharedArrayBufferToString(new SharedArrayBuffer());
  function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBuffer === "undefined") {
      return false;
    }
    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBuffer;
  }
  exports.isSharedArrayBuffer = isSharedArrayBuffer;
  function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
  }
  exports.isAsyncFunction = isAsyncFunction;
  function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
  }
  exports.isMapIterator = isMapIterator;
  function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
  }
  exports.isSetIterator = isSetIterator;
  function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
  }
  exports.isGeneratorObject = isGeneratorObject;
  function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
  }
  exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
  function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
  }
  exports.isNumberObject = isNumberObject;
  function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
  }
  exports.isStringObject = isStringObject;
  function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
  }
  exports.isBooleanObject = isBooleanObject;
  function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
  }
  exports.isBigIntObject = isBigIntObject;
  function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
  }
  exports.isSymbolObject = isSymbolObject;
  function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
  }
  exports.isBoxedPrimitive = isBoxedPrimitive;
  function isAnyArrayBuffer(value) {
    return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
  }
  exports.isAnyArrayBuffer = isAnyArrayBuffer;
  ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
    Object.defineProperty(exports, method, {
      enumerable: false,
      value: function() {
        throw new Error(method + " is not supported in userland");
      }
    });
  });
});

// ../../node_modules/.pnpm/util@0.12.3/node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS((exports, module) => {
  module.exports = function isBuffer(arg) {
    return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
  };
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports, module) => {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// ../../node_modules/.pnpm/util@0.12.3/node_modules/util/util.js
var require_util2 = __commonJS((exports) => {
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };
  var formatRegExp = /%[sdj%]/g;
  exports.format = function(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x2) {
      if (x2 === "%%")
        return "%";
      if (i >= len)
        return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += " " + x;
      } else {
        str += " " + inspect(x);
      }
    }
    return str;
  };
  exports.deprecate = function(fn, msg) {
    if (typeof process_exports !== "undefined" && process_exports.noDeprecation === true) {
      return fn;
    }
    if (typeof process_exports === "undefined") {
      return function() {
        return exports.deprecate(fn, msg).apply(this, arguments);
      };
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process_exports.throwDeprecation) {
          throw new Error(msg);
        } else if (process_exports.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  };
  var debugs = {};
  var debugEnvRegex = /^$/;
  if (process_exports.env.NODE_DEBUG) {
    debugEnv = process_exports.env.NODE_DEBUG;
    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
    debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
  }
  var debugEnv;
  exports.debuglog = function(set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (debugEnvRegex.test(set)) {
        var pid = process_exports.pid;
        debugs[set] = function() {
          var msg = exports.format.apply(exports, arguments);
          console.error("%s %d: %s", set, pid, msg);
        };
      } else {
        debugs[set] = function() {
        };
      }
    }
    return debugs[set];
  };
  function inspect(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3)
      ctx.depth = arguments[2];
    if (arguments.length >= 4)
      ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      exports._extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden))
      ctx.showHidden = false;
    if (isUndefined(ctx.depth))
      ctx.depth = 2;
    if (isUndefined(ctx.colors))
      ctx.colors = false;
    if (isUndefined(ctx.customInspect))
      ctx.customInspect = true;
    if (ctx.colors)
      ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports.inspect = inspect;
  inspect.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  };
  inspect.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  };
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) {
      return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError(value);
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    var base = "", array = false, braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : "";
      base = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value))
      return ctx.stylize("" + value, "number");
    if (isBoolean(value))
      return ctx.stylize("" + value, "boolean");
    if (isNull(value))
      return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push("");
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf("\n") >= 0)
        numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  exports.types = require_types();
  function isArray(ar) {
    return Array.isArray(ar);
  }
  exports.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  exports.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  exports.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  exports.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  exports.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  exports.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  exports.isUndefined = isUndefined;
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  exports.isRegExp = isRegExp;
  exports.types.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports.isObject = isObject;
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  exports.isDate = isDate;
  exports.types.isDate = isDate;
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  exports.isError = isError;
  exports.types.isNativeError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  exports.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
  }
  exports.isPrimitive = isPrimitive;
  exports.isBuffer = require_isBufferBrowser();
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function timestamp() {
    var d = new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  exports.log = function() {
    console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
  };
  exports.inherits = require_inherits_browser();
  exports._extend = function(origin, add) {
    if (!add || !isObject(add))
      return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  };
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
  exports.promisify = function promisify(original) {
    if (typeof original !== "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      var fn = original[kCustomPromisifiedSymbol];
      if (typeof fn !== "function") {
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      }
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn;
    }
    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function(resolve2, reject) {
        promiseResolve = resolve2;
        promiseReject = reject;
      });
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      args.push(function(err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });
      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol)
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
  };
  exports.promisify.custom = kCustomPromisifiedSymbol;
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      var newReason = new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify(original) {
    if (typeof original !== "function") {
      throw new TypeError('The "original" argument must be of type Function');
    }
    function callbackified() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      var maybeCb = args.pop();
      if (typeof maybeCb !== "function") {
        throw new TypeError("The last argument must be of type Function");
      }
      var self = this;
      var cb = function() {
        return maybeCb.apply(self, arguments);
      };
      original.apply(this, args).then(function(ret) {
        process_exports.nextTick(cb.bind(null, null, ret));
      }, function(rej) {
        process_exports.nextTick(callbackifyOnRejected.bind(null, rej, cb));
      });
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
  }
  exports.callbackify = callbackify;
});

// ../../node_modules/.pnpm/assert@2.0.0/node_modules/assert/build/internal/errors.js
var require_errors = __commonJS((exports, module) => {
  "use strict";
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized(self);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}});
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var codes = {};
  var assert;
  var util;
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }
    var NodeError = /* @__PURE__ */ function(_Base) {
      _inherits(NodeError2, _Base);
      function NodeError2(arg1, arg2, arg3) {
        var _this;
        _classCallCheck(this, NodeError2);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError2).call(this, getMessage(arg1, arg2, arg3)));
        _this.code = code;
        return _this;
      }
      return NodeError2;
    }(Base);
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      var len = expected.length;
      expected = expected.map(function(i) {
        return String(i);
      });
      if (len > 2) {
        return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
      } else if (len === 2) {
        return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
      } else {
        return "of ".concat(thing, " ").concat(expected[0]);
      }
    } else {
      return "of ".concat(thing, " ").concat(String(expected));
    }
  }
  function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  }
  function endsWith(str, search, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
  }
  function includes(str, search, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search.length > str.length) {
      return false;
    } else {
      return str.indexOf(search, start) !== -1;
    }
  }
  createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    if (assert === void 0)
      assert = require_assert();
    assert(typeof name === "string", "'name' must be a string");
    var determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else {
      determiner = "must be";
    }
    var msg;
    if (endsWith(name, " argument")) {
      msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    } else {
      var type = includes(name, ".") ? "property" : "argument";
      msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    }
    msg += ". Received type ".concat(_typeof(actual));
    return msg;
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
    var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
    if (util === void 0)
      util = require_util2();
    var inspected = util.inspect(value);
    if (inspected.length > 128) {
      inspected = "".concat(inspected.slice(0, 128), "...");
    }
    return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
  }, TypeError, RangeError);
  createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
    var type;
    if (value && value.constructor && value.constructor.name) {
      type = "instance of ".concat(value.constructor.name);
    } else {
      type = "type ".concat(_typeof(value));
    }
    return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
  }, TypeError);
  createErrorType("ERR_MISSING_ARGS", function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (assert === void 0)
      assert = require_assert();
    assert(args.length > 0, "At least one arg needs to be specified");
    var msg = "The ";
    var len = args.length;
    args = args.map(function(a) {
      return '"'.concat(a, '"');
    });
    switch (len) {
      case 1:
        msg += "".concat(args[0], " argument");
        break;
      case 2:
        msg += "".concat(args[0], " and ").concat(args[1], " arguments");
        break;
      default:
        msg += args.slice(0, len - 1).join(", ");
        msg += ", and ".concat(args[len - 1], " arguments");
        break;
    }
    return "".concat(msg, " must be specified");
  }, TypeError);
  module.exports.codes = codes;
});

// ../../node_modules/.pnpm/assert@2.0.0/node_modules/assert/build/internal/assert/assertion_error.js
var require_assertion_error = __commonJS((exports, module) => {
  "use strict";
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized(self);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}});
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {constructor: {value: Wrapper, enumerable: false, writable: true, configurable: true}});
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  var _require = require_util2();
  var inspect = _require.inspect;
  var _require2 = require_errors();
  var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
  function endsWith(str, search, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
  }
  function repeat(str, count) {
    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return "";
    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
  var blue = "";
  var green = "";
  var red = "";
  var white = "";
  var kReadableOperator = {
    deepStrictEqual: "Expected values to be strictly deep-equal:",
    strictEqual: "Expected values to be strictly equal:",
    strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
    deepEqual: "Expected values to be loosely deep-equal:",
    equal: "Expected values to be loosely equal:",
    notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
    notStrictEqual: 'Expected "actual" to be strictly unequal to:',
    notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
    notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
    notEqual: 'Expected "actual" to be loosely unequal to:',
    notIdentical: "Values identical but not reference-equal:"
  };
  var kMaxShortLength = 10;
  function copyError(source) {
    var keys = Object.keys(source);
    var target = Object.create(Object.getPrototypeOf(source));
    keys.forEach(function(key) {
      target[key] = source[key];
    });
    Object.defineProperty(target, "message", {
      value: source.message
    });
    return target;
  }
  function inspectValue(val) {
    return inspect(val, {
      compact: false,
      customInspect: false,
      depth: 1e3,
      maxArrayLength: Infinity,
      showHidden: false,
      breakLength: Infinity,
      showProxy: false,
      sorted: true,
      getters: true
    });
  }
  function createErrDiff(actual, expected, operator) {
    var other = "";
    var res = "";
    var lastPos = 0;
    var end = "";
    var skipped = false;
    var actualInspected = inspectValue(actual);
    var actualLines = actualInspected.split("\n");
    var expectedLines = inspectValue(expected).split("\n");
    var i = 0;
    var indicator = "";
    if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
      operator = "strictEqualObject";
    }
    if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
      var inputLength = actualLines[0].length + expectedLines[0].length;
      if (inputLength <= kMaxShortLength) {
        if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
          return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
        }
      } else if (operator !== "strictEqualObject") {
        var maxLength = process_exports.stderr && process_exports.stderr.isTTY ? process_exports.stderr.columns : 80;
        if (inputLength < maxLength) {
          while (actualLines[0][i] === expectedLines[0][i]) {
            i++;
          }
          if (i > 2) {
            indicator = "\n  ".concat(repeat(" ", i), "^");
            i = 0;
          }
        }
      }
    }
    var a = actualLines[actualLines.length - 1];
    var b = expectedLines[expectedLines.length - 1];
    while (a === b) {
      if (i++ < 2) {
        end = "\n  ".concat(a).concat(end);
      } else {
        other = a;
      }
      actualLines.pop();
      expectedLines.pop();
      if (actualLines.length === 0 || expectedLines.length === 0)
        break;
      a = actualLines[actualLines.length - 1];
      b = expectedLines[expectedLines.length - 1];
    }
    var maxLines = Math.max(actualLines.length, expectedLines.length);
    if (maxLines === 0) {
      var _actualLines = actualInspected.split("\n");
      if (_actualLines.length > 30) {
        _actualLines[26] = "".concat(blue, "...").concat(white);
        while (_actualLines.length > 27) {
          _actualLines.pop();
        }
      }
      return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
    }
    if (i > 3) {
      end = "\n".concat(blue, "...").concat(white).concat(end);
      skipped = true;
    }
    if (other !== "") {
      end = "\n  ".concat(other).concat(end);
      other = "";
    }
    var printedLines = 0;
    var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
    var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
    for (i = 0; i < maxLines; i++) {
      var cur = i - lastPos;
      if (actualLines.length < i + 1) {
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(expectedLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(expectedLines[i - 1]);
          printedLines++;
        }
        lastPos = i;
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
        printedLines++;
      } else if (expectedLines.length < i + 1) {
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        lastPos = i;
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
        printedLines++;
      } else {
        var expectedLine = expectedLines[i];
        var actualLine = actualLines[i];
        var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
        if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
          divergingLines = false;
          actualLine += ",";
        }
        if (divergingLines) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(actualLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(actualLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
          other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
          printedLines += 2;
        } else {
          res += other;
          other = "";
          if (cur === 1 || i === 0) {
            res += "\n  ".concat(actualLine);
            printedLines++;
          }
        }
      }
      if (printedLines > 20 && i < maxLines - 2) {
        return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
      }
    }
    return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
  }
  var AssertionError = /* @__PURE__ */ function(_Error) {
    _inherits(AssertionError2, _Error);
    function AssertionError2(options) {
      var _this;
      _classCallCheck(this, AssertionError2);
      if (_typeof(options) !== "object" || options === null) {
        throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
      }
      var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
      var actual = options.actual, expected = options.expected;
      var limit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      if (message != null) {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, String(message)));
      } else {
        if (process_exports.stderr && process_exports.stderr.isTTY) {
          if (process_exports.stderr && process_exports.stderr.getColorDepth && process_exports.stderr.getColorDepth() !== 1) {
            blue = "[34m";
            green = "[32m";
            white = "[39m";
            red = "[31m";
          } else {
            blue = "";
            green = "";
            white = "";
            red = "";
          }
        }
        if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
          actual = copyError(actual);
          expected = copyError(expected);
        }
        if (operator === "deepStrictEqual" || operator === "strictEqual") {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, createErrDiff(actual, expected, operator)));
        } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
          var base = kReadableOperator[operator];
          var res = inspectValue(actual).split("\n");
          if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
            base = kReadableOperator.notStrictEqualObject;
          }
          if (res.length > 30) {
            res[26] = "".concat(blue, "...").concat(white);
            while (res.length > 27) {
              res.pop();
            }
          }
          if (res.length === 1) {
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, " ").concat(res[0])));
          } else {
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n")));
          }
        } else {
          var _res = inspectValue(actual);
          var other = "";
          var knownOperators = kReadableOperator[operator];
          if (operator === "notDeepEqual" || operator === "notEqual") {
            _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
            if (_res.length > 1024) {
              _res = "".concat(_res.slice(0, 1021), "...");
            }
          } else {
            other = "".concat(inspectValue(expected));
            if (_res.length > 512) {
              _res = "".concat(_res.slice(0, 509), "...");
            }
            if (other.length > 512) {
              other = "".concat(other.slice(0, 509), "...");
            }
            if (operator === "deepEqual" || operator === "equal") {
              _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
            } else {
              other = " ".concat(operator, " ").concat(other);
            }
          }
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(_res).concat(other)));
        }
      }
      Error.stackTraceLimit = limit;
      _this.generatedMessage = !message;
      Object.defineProperty(_assertThisInitialized(_this), "name", {
        value: "AssertionError [ERR_ASSERTION]",
        enumerable: false,
        writable: true,
        configurable: true
      });
      _this.code = "ERR_ASSERTION";
      _this.actual = actual;
      _this.expected = expected;
      _this.operator = operator;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
      }
      _this.stack;
      _this.name = "AssertionError";
      return _possibleConstructorReturn(_this);
    }
    _createClass(AssertionError2, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
      }
    }, {
      key: inspect.custom,
      value: function value(recurseTimes, ctx) {
        return inspect(this, _objectSpread({}, ctx, {
          customInspect: false,
          depth: 0
        }));
      }
    }]);
    return AssertionError2;
  }(_wrapNativeSuper(Error));
  module.exports = AssertionError;
});

// ../../node_modules/.pnpm/es6-object-assign@1.1.0/node_modules/es6-object-assign/index.js
var require_es6_object_assign = __commonJS((exports, module) => {
  "use strict";
  function assign(target, firstSource) {
    if (target === void 0 || target === null) {
      throw new TypeError("Cannot convert first argument to object");
    }
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      if (nextSource === void 0 || nextSource === null) {
        continue;
      }
      var keysArray = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }
  function polyfill() {
    if (!Object.assign) {
      Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: assign
      });
    }
  }
  module.exports = {
    assign,
    polyfill
  };
});

// ../../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS((exports, module) => {
  "use strict";
  var toStr = Object.prototype.toString;
  module.exports = function isArguments(value) {
    var str = toStr.call(value);
    var isArgs = str === "[object Arguments]";
    if (!isArgs) {
      isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
    }
    return isArgs;
  };
});

// ../../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js
var require_implementation2 = __commonJS((exports, module) => {
  "use strict";
  var keysShim;
  if (!Object.keys) {
    has = Object.prototype.hasOwnProperty;
    toStr = Object.prototype.toString;
    isArgs = require_isArguments();
    isEnumerable = Object.prototype.propertyIsEnumerable;
    hasDontEnumBug = !isEnumerable.call({toString: null}, "toString");
    hasProtoEnumBug = isEnumerable.call(function() {
    }, "prototype");
    dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    equalsConstructorPrototype = function(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    hasAutomationEqualityBug = function() {
      if (typeof window === "undefined") {
        return false;
      }
      for (var k in window) {
        try {
          if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    }();
    equalsConstructorPrototypeIfNotBuggy = function(o) {
      if (typeof window === "undefined" || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    keysShim = function keys(object) {
      var isObject = object !== null && typeof object === "object";
      var isFunction = toStr.call(object) === "[object Function]";
      var isArguments = isArgs(object);
      var isString = isObject && toStr.call(object) === "[object String]";
      var theKeys = [];
      if (!isObject && !isFunction && !isArguments) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var skipProto = hasProtoEnumBug && isFunction;
      if (isString && object.length > 0 && !has.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }
      if (isArguments && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === "prototype") && has.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }
      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
  }
  var has;
  var toStr;
  var isArgs;
  var isEnumerable;
  var hasDontEnumBug;
  var hasProtoEnumBug;
  var dontEnums;
  var equalsConstructorPrototype;
  var excludedKeys;
  var hasAutomationEqualityBug;
  var equalsConstructorPrototypeIfNotBuggy;
  module.exports = keysShim;
});

// ../../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js
var require_object_keys = __commonJS((exports, module) => {
  "use strict";
  var slice = Array.prototype.slice;
  var isArgs = require_isArguments();
  var origKeys = Object.keys;
  var keysShim = origKeys ? function keys(o) {
    return origKeys(o);
  } : require_implementation2();
  var originalKeys = Object.keys;
  keysShim.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function() {
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      }(1, 2);
      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          if (isArgs(object)) {
            return originalKeys(slice.call(object));
          }
          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim;
    }
    return Object.keys || keysShim;
  };
  module.exports = keysShim;
});

// ../../node_modules/.pnpm/define-properties@1.1.3/node_modules/define-properties/index.js
var require_define_properties = __commonJS((exports, module) => {
  "use strict";
  var keys = require_object_keys();
  var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
  var toStr = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var origDefineProperty = Object.defineProperty;
  var isFunction = function(fn) {
    return typeof fn === "function" && toStr.call(fn) === "[object Function]";
  };
  var arePropertyDescriptorsSupported = function() {
    var obj = {};
    try {
      origDefineProperty(obj, "x", {enumerable: false, value: obj});
      for (var _ in obj) {
        return false;
      }
      return obj.x === obj;
    } catch (e) {
      return false;
    }
  };
  var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();
  var defineProperty = function(object, name, value, predicate) {
    if (name in object && (!isFunction(predicate) || !predicate())) {
      return;
    }
    if (supportsDescriptors) {
      origDefineProperty(object, name, {
        configurable: true,
        enumerable: false,
        value,
        writable: true
      });
    } else {
      object[name] = value;
    }
  };
  var defineProperties = function(object, map) {
    var predicates = arguments.length > 2 ? arguments[2] : {};
    var props = keys(map);
    if (hasSymbols) {
      props = concat.call(props, Object.getOwnPropertySymbols(map));
    }
    for (var i = 0; i < props.length; i += 1) {
      defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
    }
  };
  defineProperties.supportsDescriptors = !!supportsDescriptors;
  module.exports = defineProperties;
});

// ../../node_modules/.pnpm/object-is@1.1.4/node_modules/object-is/implementation.js
var require_implementation3 = __commonJS((exports, module) => {
  "use strict";
  var numberIsNaN = function(value) {
    return value !== value;
  };
  module.exports = function is(a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a === b) {
      return true;
    }
    if (numberIsNaN(a) && numberIsNaN(b)) {
      return true;
    }
    return false;
  };
});

// ../../node_modules/.pnpm/object-is@1.1.4/node_modules/object-is/polyfill.js
var require_polyfill = __commonJS((exports, module) => {
  "use strict";
  var implementation = require_implementation3();
  module.exports = function getPolyfill() {
    return typeof Object.is === "function" ? Object.is : implementation;
  };
});

// ../../node_modules/.pnpm/object-is@1.1.4/node_modules/object-is/shim.js
var require_shim = __commonJS((exports, module) => {
  "use strict";
  var getPolyfill = require_polyfill();
  var define2 = require_define_properties();
  module.exports = function shimObjectIs() {
    var polyfill = getPolyfill();
    define2(Object, {is: polyfill}, {
      is: function testObjectIs() {
        return Object.is !== polyfill;
      }
    });
    return polyfill;
  };
});

// ../../node_modules/.pnpm/object-is@1.1.4/node_modules/object-is/index.js
var require_object_is = __commonJS((exports, module) => {
  "use strict";
  var define2 = require_define_properties();
  var callBind = require_call_bind();
  var implementation = require_implementation3();
  var getPolyfill = require_polyfill();
  var shim = require_shim();
  var polyfill = callBind(getPolyfill(), Object);
  define2(polyfill, {
    getPolyfill,
    implementation,
    shim
  });
  module.exports = polyfill;
});

// ../../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js
var require_implementation4 = __commonJS((exports, module) => {
  "use strict";
  module.exports = function isNaN2(value) {
    return value !== value;
  };
});

// ../../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js
var require_polyfill2 = __commonJS((exports, module) => {
  "use strict";
  var implementation = require_implementation4();
  module.exports = function getPolyfill() {
    if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
      return Number.isNaN;
    }
    return implementation;
  };
});

// ../../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js
var require_shim2 = __commonJS((exports, module) => {
  "use strict";
  var define2 = require_define_properties();
  var getPolyfill = require_polyfill2();
  module.exports = function shimNumberIsNaN() {
    var polyfill = getPolyfill();
    define2(Number, {isNaN: polyfill}, {
      isNaN: function testIsNaN() {
        return Number.isNaN !== polyfill;
      }
    });
    return polyfill;
  };
});

// ../../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js
var require_is_nan = __commonJS((exports, module) => {
  "use strict";
  var callBind = require_call_bind();
  var define2 = require_define_properties();
  var implementation = require_implementation4();
  var getPolyfill = require_polyfill2();
  var shim = require_shim2();
  var polyfill = callBind(getPolyfill(), Number);
  define2(polyfill, {
    getPolyfill,
    implementation,
    shim
  });
  module.exports = polyfill;
});

// ../../node_modules/.pnpm/assert@2.0.0/node_modules/assert/build/internal/util/comparisons.js
var require_comparisons = __commonJS((exports, module) => {
  "use strict";
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  var regexFlagsSupported = /a/g.flags !== void 0;
  var arrayFromSet = function arrayFromSet2(set) {
    var array = [];
    set.forEach(function(value) {
      return array.push(value);
    });
    return array;
  };
  var arrayFromMap = function arrayFromMap2(map) {
    var array = [];
    map.forEach(function(value, key) {
      return array.push([key, value]);
    });
    return array;
  };
  var objectIs = Object.is ? Object.is : require_object_is();
  var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  };
  var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
  var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
  var objectToString = uncurryThis(Object.prototype.toString);
  var _require$types = require_util2().types;
  var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
  var isArrayBufferView = _require$types.isArrayBufferView;
  var isDate = _require$types.isDate;
  var isMap = _require$types.isMap;
  var isRegExp = _require$types.isRegExp;
  var isSet = _require$types.isSet;
  var isNativeError = _require$types.isNativeError;
  var isBoxedPrimitive = _require$types.isBoxedPrimitive;
  var isNumberObject = _require$types.isNumberObject;
  var isStringObject = _require$types.isStringObject;
  var isBooleanObject = _require$types.isBooleanObject;
  var isBigIntObject = _require$types.isBigIntObject;
  var isSymbolObject = _require$types.isSymbolObject;
  var isFloat32Array = _require$types.isFloat32Array;
  var isFloat64Array = _require$types.isFloat64Array;
  function isNonIndex(key) {
    if (key.length === 0 || key.length > 10)
      return true;
    for (var i = 0; i < key.length; i++) {
      var code = key.charCodeAt(i);
      if (code < 48 || code > 57)
        return true;
    }
    return key.length === 10 && key >= Math.pow(2, 32);
  }
  function getOwnNonIndexProperties(value) {
    return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  function compare(a, b) {
    if (a === b) {
      return 0;
    }
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  var ONLY_ENUMERABLE = void 0;
  var kStrict = true;
  var kLoose = false;
  var kNoIterator = 0;
  var kIsArray = 1;
  var kIsSet = 2;
  var kIsMap = 3;
  function areSimilarRegExps(a, b) {
    return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
  }
  function areSimilarFloatArrays(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    for (var offset = 0; offset < a.byteLength; offset++) {
      if (a[offset] !== b[offset]) {
        return false;
      }
    }
    return true;
  }
  function areSimilarTypedArrays(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
  }
  function areEqualArrayBuffers(buf1, buf2) {
    return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
  }
  function isEqualBoxedPrimitive(val1, val2) {
    if (isNumberObject(val1)) {
      return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
    }
    if (isStringObject(val1)) {
      return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
    }
    if (isBooleanObject(val1)) {
      return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
    }
    if (isBigIntObject(val1)) {
      return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
    }
    return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
  }
  function innerDeepEqual(val1, val2, strict, memos) {
    if (val1 === val2) {
      if (val1 !== 0)
        return true;
      return strict ? objectIs(val1, val2) : true;
    }
    if (strict) {
      if (_typeof(val1) !== "object") {
        return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
      }
      if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
        return false;
      }
      if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
        return false;
      }
    } else {
      if (val1 === null || _typeof(val1) !== "object") {
        if (val2 === null || _typeof(val2) !== "object") {
          return val1 == val2;
        }
        return false;
      }
      if (val2 === null || _typeof(val2) !== "object") {
        return false;
      }
    }
    var val1Tag = objectToString(val1);
    var val2Tag = objectToString(val2);
    if (val1Tag !== val2Tag) {
      return false;
    }
    if (Array.isArray(val1)) {
      if (val1.length !== val2.length) {
        return false;
      }
      var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
      var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
      if (keys1.length !== keys2.length) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
    }
    if (val1Tag === "[object Object]") {
      if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
        return false;
      }
    }
    if (isDate(val1)) {
      if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
        return false;
      }
    } else if (isRegExp(val1)) {
      if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
        return false;
      }
    } else if (isNativeError(val1) || val1 instanceof Error) {
      if (val1.message !== val2.message || val1.name !== val2.name) {
        return false;
      }
    } else if (isArrayBufferView(val1)) {
      if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
        if (!areSimilarFloatArrays(val1, val2)) {
          return false;
        }
      } else if (!areSimilarTypedArrays(val1, val2)) {
        return false;
      }
      var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
      var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
      if (_keys.length !== _keys2.length) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
    } else if (isSet(val1)) {
      if (!isSet(val2) || val1.size !== val2.size) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kIsSet);
    } else if (isMap(val1)) {
      if (!isMap(val2) || val1.size !== val2.size) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kIsMap);
    } else if (isAnyArrayBuffer(val1)) {
      if (!areEqualArrayBuffers(val1, val2)) {
        return false;
      }
    } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator);
  }
  function getEnumerables(val, keys) {
    return keys.filter(function(k) {
      return propertyIsEnumerable(val, k);
    });
  }
  function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
    if (arguments.length === 5) {
      aKeys = Object.keys(val1);
      var bKeys = Object.keys(val2);
      if (aKeys.length !== bKeys.length) {
        return false;
      }
    }
    var i = 0;
    for (; i < aKeys.length; i++) {
      if (!hasOwnProperty(val2, aKeys[i])) {
        return false;
      }
    }
    if (strict && arguments.length === 5) {
      var symbolKeysA = objectGetOwnPropertySymbols(val1);
      if (symbolKeysA.length !== 0) {
        var count = 0;
        for (i = 0; i < symbolKeysA.length; i++) {
          var key = symbolKeysA[i];
          if (propertyIsEnumerable(val1, key)) {
            if (!propertyIsEnumerable(val2, key)) {
              return false;
            }
            aKeys.push(key);
            count++;
          } else if (propertyIsEnumerable(val2, key)) {
            return false;
          }
        }
        var symbolKeysB = objectGetOwnPropertySymbols(val2);
        if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
          return false;
        }
      } else {
        var _symbolKeysB = objectGetOwnPropertySymbols(val2);
        if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
          return false;
        }
      }
    }
    if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
      return true;
    }
    if (memos === void 0) {
      memos = {
        val1: new Map(),
        val2: new Map(),
        position: 0
      };
    } else {
      var val2MemoA = memos.val1.get(val1);
      if (val2MemoA !== void 0) {
        var val2MemoB = memos.val2.get(val2);
        if (val2MemoB !== void 0) {
          return val2MemoA === val2MemoB;
        }
      }
      memos.position++;
    }
    memos.val1.set(val1, memos.position);
    memos.val2.set(val2, memos.position);
    var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
    memos.val1.delete(val1);
    memos.val2.delete(val2);
    return areEq;
  }
  function setHasEqualElement(set, val1, strict, memo) {
    var setValues = arrayFromSet(set);
    for (var i = 0; i < setValues.length; i++) {
      var val2 = setValues[i];
      if (innerDeepEqual(val1, val2, strict, memo)) {
        set.delete(val2);
        return true;
      }
    }
    return false;
  }
  function findLooseMatchingPrimitives(prim) {
    switch (_typeof(prim)) {
      case "undefined":
        return null;
      case "object":
        return void 0;
      case "symbol":
        return false;
      case "string":
        prim = +prim;
      case "number":
        if (numberIsNaN(prim)) {
          return false;
        }
    }
    return true;
  }
  function setMightHaveLoosePrim(a, b, prim) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null)
      return altValue;
    return b.has(altValue) && !a.has(altValue);
  }
  function mapMightHaveLoosePrim(a, b, prim, item, memo) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    var curB = b.get(altValue);
    if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
      return false;
    }
    return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
  }
  function setEquiv(a, b, strict, memo) {
    var set = null;
    var aValues = arrayFromSet(a);
    for (var i = 0; i < aValues.length; i++) {
      var val = aValues[i];
      if (_typeof(val) === "object" && val !== null) {
        if (set === null) {
          set = new Set();
        }
        set.add(val);
      } else if (!b.has(val)) {
        if (strict)
          return false;
        if (!setMightHaveLoosePrim(a, b, val)) {
          return false;
        }
        if (set === null) {
          set = new Set();
        }
        set.add(val);
      }
    }
    if (set !== null) {
      var bValues = arrayFromSet(b);
      for (var _i = 0; _i < bValues.length; _i++) {
        var _val = bValues[_i];
        if (_typeof(_val) === "object" && _val !== null) {
          if (!setHasEqualElement(set, _val, strict, memo))
            return false;
        } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
          return false;
        }
      }
      return set.size === 0;
    }
    return true;
  }
  function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
    var setValues = arrayFromSet(set);
    for (var i = 0; i < setValues.length; i++) {
      var key2 = setValues[i];
      if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
        set.delete(key2);
        return true;
      }
    }
    return false;
  }
  function mapEquiv(a, b, strict, memo) {
    var set = null;
    var aEntries = arrayFromMap(a);
    for (var i = 0; i < aEntries.length; i++) {
      var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
      if (_typeof(key) === "object" && key !== null) {
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      } else {
        var item2 = b.get(key);
        if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
          if (strict)
            return false;
          if (!mapMightHaveLoosePrim(a, b, key, item1, memo))
            return false;
          if (set === null) {
            set = new Set();
          }
          set.add(key);
        }
      }
    }
    if (set !== null) {
      var bEntries = arrayFromMap(b);
      for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
        var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), key = _bEntries$_i[0], item = _bEntries$_i[1];
        if (_typeof(key) === "object" && key !== null) {
          if (!mapHasEqualEntry(set, a, key, item, strict, memo))
            return false;
        } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
          return false;
        }
      }
      return set.size === 0;
    }
    return true;
  }
  function objEquiv(a, b, strict, keys, memos, iterationType) {
    var i = 0;
    if (iterationType === kIsSet) {
      if (!setEquiv(a, b, strict, memos)) {
        return false;
      }
    } else if (iterationType === kIsMap) {
      if (!mapEquiv(a, b, strict, memos)) {
        return false;
      }
    } else if (iterationType === kIsArray) {
      for (; i < a.length; i++) {
        if (hasOwnProperty(a, i)) {
          if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
            return false;
          }
        } else if (hasOwnProperty(b, i)) {
          return false;
        } else {
          var keysA = Object.keys(a);
          for (; i < keysA.length; i++) {
            var key = keysA[i];
            if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
              return false;
            }
          }
          if (keysA.length !== Object.keys(b).length) {
            return false;
          }
          return true;
        }
      }
    }
    for (i = 0; i < keys.length; i++) {
      var _key = keys[i];
      if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
        return false;
      }
    }
    return true;
  }
  function isDeepEqual(val1, val2) {
    return innerDeepEqual(val1, val2, kLoose);
  }
  function isDeepStrictEqual(val1, val2) {
    return innerDeepEqual(val1, val2, kStrict);
  }
  module.exports = {
    isDeepEqual,
    isDeepStrictEqual
  };
});

// ../../node_modules/.pnpm/assert@2.0.0/node_modules/assert/build/assert.js
var require_assert = __commonJS((exports, module) => {
  "use strict";
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _require = require_errors();
  var _require$codes = _require.codes;
  var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
  var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
  var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
  var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
  var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
  var AssertionError = require_assertion_error();
  var _require2 = require_util2();
  var inspect = _require2.inspect;
  var _require$types = require_util2().types;
  var isPromise = _require$types.isPromise;
  var isRegExp = _require$types.isRegExp;
  var objectAssign = Object.assign ? Object.assign : require_es6_object_assign().assign;
  var objectIs = Object.is ? Object.is : require_object_is();
  var errorCache = new Map();
  var isDeepEqual;
  var isDeepStrictEqual;
  function lazyLoadComparison() {
    var comparison = require_comparisons();
    isDeepEqual = comparison.isDeepEqual;
    isDeepStrictEqual = comparison.isDeepStrictEqual;
  }
  var warned = false;
  var assert = module.exports = ok;
  var NO_EXCEPTION_SENTINEL = {};
  function innerFail(obj) {
    if (obj.message instanceof Error)
      throw obj.message;
    throw new AssertionError(obj);
  }
  function fail(actual, expected, message, operator, stackStartFn) {
    var argsLen = arguments.length;
    var internalMessage;
    if (argsLen === 0) {
      internalMessage = "Failed";
    } else if (argsLen === 1) {
      message = actual;
      actual = void 0;
    } else {
      if (warned === false) {
        warned = true;
        var warn = process_exports.emitWarning ? process_exports.emitWarning : console.warn.bind(console);
        warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
      }
      if (argsLen === 2)
        operator = "!=";
    }
    if (message instanceof Error)
      throw message;
    var errArgs = {
      actual,
      expected,
      operator: operator === void 0 ? "fail" : operator,
      stackStartFn: stackStartFn || fail
    };
    if (message !== void 0) {
      errArgs.message = message;
    }
    var err = new AssertionError(errArgs);
    if (internalMessage) {
      err.message = internalMessage;
      err.generatedMessage = true;
    }
    throw err;
  }
  assert.fail = fail;
  assert.AssertionError = AssertionError;
  function innerOk(fn, argLen, value, message) {
    if (!value) {
      var generatedMessage = false;
      if (argLen === 0) {
        generatedMessage = true;
        message = "No value argument passed to `assert.ok()`";
      } else if (message instanceof Error) {
        throw message;
      }
      var err = new AssertionError({
        actual: value,
        expected: true,
        message,
        operator: "==",
        stackStartFn: fn
      });
      err.generatedMessage = generatedMessage;
      throw err;
    }
  }
  function ok() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    innerOk.apply(void 0, [ok, args.length].concat(args));
  }
  assert.ok = ok;
  assert.equal = function equal(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (actual != expected) {
      innerFail({
        actual,
        expected,
        message,
        operator: "==",
        stackStartFn: equal
      });
    }
  };
  assert.notEqual = function notEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (actual == expected) {
      innerFail({
        actual,
        expected,
        message,
        operator: "!=",
        stackStartFn: notEqual
      });
    }
  };
  assert.deepEqual = function deepEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (isDeepEqual === void 0)
      lazyLoadComparison();
    if (!isDeepEqual(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "deepEqual",
        stackStartFn: deepEqual
      });
    }
  };
  assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (isDeepEqual === void 0)
      lazyLoadComparison();
    if (isDeepEqual(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "notDeepEqual",
        stackStartFn: notDeepEqual
      });
    }
  };
  assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (isDeepEqual === void 0)
      lazyLoadComparison();
    if (!isDeepStrictEqual(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "deepStrictEqual",
        stackStartFn: deepStrictEqual
      });
    }
  };
  assert.notDeepStrictEqual = notDeepStrictEqual;
  function notDeepStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (isDeepEqual === void 0)
      lazyLoadComparison();
    if (isDeepStrictEqual(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "notDeepStrictEqual",
        stackStartFn: notDeepStrictEqual
      });
    }
  }
  assert.strictEqual = function strictEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (!objectIs(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "strictEqual",
        stackStartFn: strictEqual
      });
    }
  };
  assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (objectIs(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "notStrictEqual",
        stackStartFn: notStrictEqual
      });
    }
  };
  var Comparison = function Comparison2(obj, keys, actual) {
    var _this = this;
    _classCallCheck(this, Comparison2);
    keys.forEach(function(key) {
      if (key in obj) {
        if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && obj[key].test(actual[key])) {
          _this[key] = actual[key];
        } else {
          _this[key] = obj[key];
        }
      }
    });
  };
  function compareExceptionKey(actual, expected, key, message, keys, fn) {
    if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
      if (!message) {
        var a = new Comparison(actual, keys);
        var b = new Comparison(expected, keys, actual);
        var err = new AssertionError({
          actual: a,
          expected: b,
          operator: "deepStrictEqual",
          stackStartFn: fn
        });
        err.actual = actual;
        err.expected = expected;
        err.operator = fn.name;
        throw err;
      }
      innerFail({
        actual,
        expected,
        message,
        operator: fn.name,
        stackStartFn: fn
      });
    }
  }
  function expectedException(actual, expected, msg, fn) {
    if (typeof expected !== "function") {
      if (isRegExp(expected))
        return expected.test(actual);
      if (arguments.length === 2) {
        throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
      }
      if (_typeof(actual) !== "object" || actual === null) {
        var err = new AssertionError({
          actual,
          expected,
          message: msg,
          operator: "deepStrictEqual",
          stackStartFn: fn
        });
        err.operator = fn.name;
        throw err;
      }
      var keys = Object.keys(expected);
      if (expected instanceof Error) {
        keys.push("name", "message");
      } else if (keys.length === 0) {
        throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      keys.forEach(function(key) {
        if (typeof actual[key] === "string" && isRegExp(expected[key]) && expected[key].test(actual[key])) {
          return;
        }
        compareExceptionKey(actual, expected, key, msg, keys, fn);
      });
      return true;
    }
    if (expected.prototype !== void 0 && actual instanceof expected) {
      return true;
    }
    if (Error.isPrototypeOf(expected)) {
      return false;
    }
    return expected.call({}, actual) === true;
  }
  function getActual(fn) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
    }
    try {
      fn();
    } catch (e) {
      return e;
    }
    return NO_EXCEPTION_SENTINEL;
  }
  function checkIsPromise(obj) {
    return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
  }
  function waitForActual(promiseFn) {
    return Promise.resolve().then(function() {
      var resultPromise;
      if (typeof promiseFn === "function") {
        resultPromise = promiseFn();
        if (!checkIsPromise(resultPromise)) {
          throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
        }
      } else if (checkIsPromise(promiseFn)) {
        resultPromise = promiseFn;
      } else {
        throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
      }
      return Promise.resolve().then(function() {
        return resultPromise;
      }).then(function() {
        return NO_EXCEPTION_SENTINEL;
      }).catch(function(e) {
        return e;
      });
    });
  }
  function expectsError(stackStartFn, actual, error, message) {
    if (typeof error === "string") {
      if (arguments.length === 4) {
        throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
      }
      if (_typeof(actual) === "object" && actual !== null) {
        if (actual.message === error) {
          throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
        }
      } else if (actual === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
      }
      message = error;
      error = void 0;
    } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
      throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
    }
    if (actual === NO_EXCEPTION_SENTINEL) {
      var details = "";
      if (error && error.name) {
        details += " (".concat(error.name, ")");
      }
      details += message ? ": ".concat(message) : ".";
      var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
      innerFail({
        actual: void 0,
        expected: error,
        operator: stackStartFn.name,
        message: "Missing expected ".concat(fnType).concat(details),
        stackStartFn
      });
    }
    if (error && !expectedException(actual, error, message, stackStartFn)) {
      throw actual;
    }
  }
  function expectsNoError(stackStartFn, actual, error, message) {
    if (actual === NO_EXCEPTION_SENTINEL)
      return;
    if (typeof error === "string") {
      message = error;
      error = void 0;
    }
    if (!error || expectedException(actual, error)) {
      var details = message ? ": ".concat(message) : ".";
      var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
      innerFail({
        actual,
        expected: error,
        operator: stackStartFn.name,
        message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
        stackStartFn
      });
    }
    throw actual;
  }
  assert.throws = function throws(promiseFn) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
  };
  assert.rejects = function rejects(promiseFn) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return waitForActual(promiseFn).then(function(result) {
      return expectsError.apply(void 0, [rejects, result].concat(args));
    });
  };
  assert.doesNotThrow = function doesNotThrow(fn) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
  };
  assert.doesNotReject = function doesNotReject(fn) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }
    return waitForActual(fn).then(function(result) {
      return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
    });
  };
  assert.ifError = function ifError(err) {
    if (err !== null && err !== void 0) {
      var message = "ifError got unwanted exception: ";
      if (_typeof(err) === "object" && typeof err.message === "string") {
        if (err.message.length === 0 && err.constructor) {
          message += err.constructor.name;
        } else {
          message += err.message;
        }
      } else {
        message += inspect(err);
      }
      var newErr = new AssertionError({
        actual: err,
        expected: null,
        operator: "ifError",
        message,
        stackStartFn: ifError
      });
      var origStack = err.stack;
      if (typeof origStack === "string") {
        var tmp2 = origStack.split("\n");
        tmp2.shift();
        var tmp1 = newErr.stack.split("\n");
        for (var i = 0; i < tmp2.length; i++) {
          var pos = tmp1.indexOf(tmp2[i]);
          if (pos !== -1) {
            tmp1 = tmp1.slice(0, pos);
            break;
          }
        }
        newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
      }
      throw newErr;
    }
  };
  function strict() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    innerOk.apply(void 0, [strict, args.length].concat(args));
  }
  assert.strict = objectAssign(strict, assert, {
    equal: assert.strictEqual,
    deepEqual: assert.deepStrictEqual,
    notEqual: assert.notStrictEqual,
    notDeepEqual: assert.notDeepStrictEqual
  });
  assert.strict.strict = assert.strict;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/internal/errors.js
var require_errors2 = __commonJS((exports) => {
  "use strict";
  var __extends = exports && exports.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.E = exports.AssertionError = exports.message = exports.RangeError = exports.TypeError = exports.Error = void 0;
  var assert = require_assert();
  var util = require_util2();
  var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
  var messages = {};
  function makeNodeError(Base) {
    return function(_super) {
      __extends(NodeError, _super);
      function NodeError(key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, message(key, args)) || this;
        _this.code = key;
        _this[kCode] = key;
        _this.name = _super.prototype.name + " [" + _this[kCode] + "]";
        return _this;
      }
      return NodeError;
    }(Base);
  }
  var AssertionError = function(_super) {
    __extends(AssertionError2, _super);
    function AssertionError2(options) {
      var _this = this;
      if (typeof options !== "object" || options === null) {
        throw new exports.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
      }
      if (options.message) {
        _this = _super.call(this, options.message) || this;
      } else {
        _this = _super.call(this, util.inspect(options.actual).slice(0, 128) + " " + (options.operator + " " + util.inspect(options.expected).slice(0, 128))) || this;
      }
      _this.generatedMessage = !options.message;
      _this.name = "AssertionError [ERR_ASSERTION]";
      _this.code = "ERR_ASSERTION";
      _this.actual = options.actual;
      _this.expected = options.expected;
      _this.operator = options.operator;
      exports.Error.captureStackTrace(_this, options.stackStartFunction);
      return _this;
    }
    return AssertionError2;
  }(global.Error);
  exports.AssertionError = AssertionError;
  function message(key, args) {
    assert.strictEqual(typeof key, "string");
    var msg = messages[key];
    assert(msg, "An invalid error message key was used: " + key + ".");
    var fmt;
    if (typeof msg === "function") {
      fmt = msg;
    } else {
      fmt = util.format;
      if (args === void 0 || args.length === 0)
        return msg;
      args.unshift(msg);
    }
    return String(fmt.apply(null, args));
  }
  exports.message = message;
  function E(sym, val) {
    messages[sym] = typeof val === "function" ? val : String(val);
  }
  exports.E = E;
  exports.Error = makeNodeError(global.Error);
  exports.TypeError = makeNodeError(global.TypeError);
  exports.RangeError = makeNodeError(global.RangeError);
  E("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
  E("ERR_ASSERTION", "%s");
  E("ERR_BUFFER_OUT_OF_BOUNDS", bufferOutOfBounds);
  E("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
  E("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
  E("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
  E("ERR_DNS_SET_SERVERS_FAILED", function(err, servers) {
    return 'c-ares failed to set servers: "' + err + '" [' + servers + "]";
  });
  E("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
  E("ERR_ENCODING_NOT_SUPPORTED", function(enc) {
    return 'The "' + enc + '" encoding is not supported';
  });
  E("ERR_ENCODING_INVALID_ENCODED_DATA", function(enc) {
    return "The encoded data was not valid for encoding " + enc;
  });
  E("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
  E("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
  E("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
  E("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
  E("ERR_INVALID_ARG_TYPE", invalidArgType);
  E("ERR_INVALID_ARRAY_LENGTH", function(name, len, actual) {
    assert.strictEqual(typeof actual, "number");
    return 'The array "' + name + '" (length ' + actual + ") must be of length " + len + ".";
  });
  E("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
  E("ERR_INVALID_CALLBACK", "Callback must be a function");
  E("ERR_INVALID_CHAR", "Invalid character in %s");
  E("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
  E("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
  E("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
  E("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
  E("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
  E("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
  E("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + String(value) + '" is invalid for option "' + name + '"';
  });
  E("ERR_INVALID_OPT_VALUE_ENCODING", function(value) {
    return 'The value "' + String(value) + '" is invalid for option "encoding"';
  });
  E("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
  E("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
  E("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
  E("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
  E("ERR_INVALID_URL", "Invalid URL: %s");
  E("ERR_INVALID_URL_SCHEME", function(expected) {
    return "The URL must be " + oneOf(expected, "scheme");
  });
  E("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
  E("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
  E("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
  E("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
  E("ERR_MISSING_ARGS", missingArgs);
  E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  E("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
  E("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
  E("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
  E("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
  E("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
  E("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
  E("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
  E("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
  E("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
  E("ERR_SOCKET_CLOSED", "Socket is closed");
  E("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
  E("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
  E("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
  E("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
  E("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
  E("ERR_TLS_DH_PARAM_SIZE", function(size) {
    return "DH parameter size " + size + " is less than 2048";
  });
  E("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
  E("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
  E("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
  E("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
  E("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
  E("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
  E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
  E("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
  E("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
  E("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
  E("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
  function invalidArgType(name, expected, actual) {
    assert(name, "name is required");
    var determiner;
    if (expected.includes("not ")) {
      determiner = "must not be";
      expected = expected.split("not ")[1];
    } else {
      determiner = "must be";
    }
    var msg;
    if (Array.isArray(name)) {
      var names = name.map(function(val) {
        return '"' + val + '"';
      }).join(", ");
      msg = "The " + names + " arguments " + determiner + " " + oneOf(expected, "type");
    } else if (name.includes(" argument")) {
      msg = "The " + name + " " + determiner + " " + oneOf(expected, "type");
    } else {
      var type = name.includes(".") ? "property" : "argument";
      msg = 'The "' + name + '" ' + type + " " + determiner + " " + oneOf(expected, "type");
    }
    if (arguments.length >= 3) {
      msg += ". Received type " + (actual !== null ? typeof actual : "null");
    }
    return msg;
  }
  function missingArgs() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    assert(args.length > 0, "At least one arg needs to be specified");
    var msg = "The ";
    var len = args.length;
    args = args.map(function(a) {
      return '"' + a + '"';
    });
    switch (len) {
      case 1:
        msg += args[0] + " argument";
        break;
      case 2:
        msg += args[0] + " and " + args[1] + " arguments";
        break;
      default:
        msg += args.slice(0, len - 1).join(", ");
        msg += ", and " + args[len - 1] + " arguments";
        break;
    }
    return msg + " must be specified";
  }
  function oneOf(expected, thing) {
    assert(expected, "expected is required");
    assert(typeof thing === "string", "thing is required");
    if (Array.isArray(expected)) {
      var len = expected.length;
      assert(len > 0, "At least one expected value needs to be specified");
      expected = expected.map(function(i) {
        return String(i);
      });
      if (len > 2) {
        return "one of " + thing + " " + expected.slice(0, len - 1).join(", ") + ", or " + expected[len - 1];
      } else if (len === 2) {
        return "one of " + thing + " " + expected[0] + " or " + expected[1];
      } else {
        return "of " + thing + " " + expected[0];
      }
    } else {
      return "of " + thing + " " + String(expected);
    }
  }
  function bufferOutOfBounds(name, isWriting) {
    if (isWriting) {
      return "Attempt to write outside buffer bounds";
    } else {
      return '"' + name + '" is outside of buffer bounds';
    }
  }
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/encoding.js
var require_encoding = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.strToEncoding = exports.assertEncoding = exports.ENCODING_UTF8 = void 0;
  var buffer_1 = require_buffer2();
  var errors = require_errors2();
  exports.ENCODING_UTF8 = "utf8";
  function assertEncoding(encoding) {
    if (encoding && !buffer_1.Buffer.isEncoding(encoding))
      throw new errors.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
  }
  exports.assertEncoding = assertEncoding;
  function strToEncoding(str, encoding) {
    if (!encoding || encoding === exports.ENCODING_UTF8)
      return str;
    if (encoding === "buffer")
      return new buffer_1.Buffer(str);
    return new buffer_1.Buffer(str).toString(encoding);
  }
  exports.strToEncoding = strToEncoding;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/Dirent.js
var require_Dirent = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Dirent = void 0;
  var constants_1 = require_constants();
  var encoding_1 = require_encoding();
  var S_IFMT = constants_1.constants.S_IFMT;
  var S_IFDIR = constants_1.constants.S_IFDIR;
  var S_IFREG = constants_1.constants.S_IFREG;
  var S_IFBLK = constants_1.constants.S_IFBLK;
  var S_IFCHR = constants_1.constants.S_IFCHR;
  var S_IFLNK = constants_1.constants.S_IFLNK;
  var S_IFIFO = constants_1.constants.S_IFIFO;
  var S_IFSOCK = constants_1.constants.S_IFSOCK;
  var Dirent = function() {
    function Dirent2() {
      this.name = "";
      this.mode = 0;
    }
    Dirent2.build = function(link, encoding) {
      var dirent = new Dirent2();
      var mode = link.getNode().mode;
      dirent.name = encoding_1.strToEncoding(link.getName(), encoding);
      dirent.mode = mode;
      return dirent;
    };
    Dirent2.prototype._checkModeProperty = function(property) {
      return (this.mode & S_IFMT) === property;
    };
    Dirent2.prototype.isDirectory = function() {
      return this._checkModeProperty(S_IFDIR);
    };
    Dirent2.prototype.isFile = function() {
      return this._checkModeProperty(S_IFREG);
    };
    Dirent2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(S_IFBLK);
    };
    Dirent2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(S_IFCHR);
    };
    Dirent2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(S_IFLNK);
    };
    Dirent2.prototype.isFIFO = function() {
      return this._checkModeProperty(S_IFIFO);
    };
    Dirent2.prototype.isSocket = function() {
      return this._checkModeProperty(S_IFSOCK);
    };
    return Dirent2;
  }();
  exports.Dirent = Dirent;
  exports.default = Dirent;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/setImmediate.js
var require_setImmediate = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  var _setImmediate;
  if (typeof setImmediate === "function")
    _setImmediate = setImmediate.bind(global);
  else
    _setImmediate = setTimeout.bind(global);
  exports.default = _setImmediate;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/process.js
var require_process = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.createProcess = void 0;
  var maybeReturnProcess = function() {
    if (typeof process_exports !== "undefined") {
      return process_exports;
    }
    try {
      return require("process");
    } catch (_a) {
      return void 0;
    }
  };
  function createProcess() {
    var p = maybeReturnProcess() || {};
    if (!p.getuid)
      p.getuid = function() {
        return 0;
      };
    if (!p.getgid)
      p.getgid = function() {
        return 0;
      };
    if (!p.cwd)
      p.cwd = function() {
        return "/";
      };
    if (!p.nextTick)
      p.nextTick = require_setImmediate().default;
    if (!p.emitWarning)
      p.emitWarning = function(message, type) {
        console.warn("" + type + (type ? ": " : "") + message);
      };
    if (!p.env)
      p.env = {};
    return p;
  }
  exports.createProcess = createProcess;
  exports.default = createProcess();
});

// ../../node_modules/.pnpm/events@3.2.0/node_modules/events/events.js
var require_events = __commonJS((exports, module) => {
  "use strict";
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn)
      console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  module.exports = EventEmitter;
  module.exports.once = once2;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit2(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++)
      args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== void 0)
      doError = doError && events.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    var handler = events[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === void 0) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events.newListener !== void 0) {
        target.emit("newListener", type, listener.listener ? listener.listener : listener);
        events = target._events;
      }
      existing = events[type];
    }
    if (existing === void 0) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener2(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state = {fired: false, wrapFn: void 0, target, type, listener};
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once3(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener2(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === void 0)
      return this;
    list = events[type];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = Object.create(null);
      else {
        delete events[type];
        if (events.removeListener)
          this.emit("removeListener", type, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list.shift();
      else {
        spliceOne(list, position);
      }
      if (list.length === 1)
        events[type] = list[0];
      if (events.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners2(type) {
    var listeners, events, i;
    events = this._events;
    if (events === void 0)
      return this;
    if (events.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else
          delete events[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === "removeListener")
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") {
      this.removeListener(type, listeners);
    } else if (listeners !== void 0) {
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === void 0)
      return [];
    var evlistener = events[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;
    if (events !== void 0) {
      var evlistener = events[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  function once2(emitter, name) {
    return new Promise(function(resolve2, reject) {
      function eventListener() {
        if (errorListener !== void 0) {
          emitter.removeListener("error", errorListener);
        }
        resolve2([].slice.call(arguments));
      }
      ;
      var errorListener;
      if (name !== "error") {
        errorListener = function errorListener2(err) {
          emitter.removeListener(name, eventListener);
          reject(err);
        };
        emitter.once("error", errorListener);
      }
      emitter.once(name, eventListener);
    });
  }
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/node.js
var require_node = __commonJS((exports) => {
  "use strict";
  var __extends = exports && exports.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.File = exports.Link = exports.Node = exports.SEP = void 0;
  var process_1 = require_process();
  var buffer_1 = require_buffer2();
  var constants_1 = require_constants();
  var events_1 = require_events();
  var Stats_1 = require_Stats();
  var S_IFMT = constants_1.constants.S_IFMT;
  var S_IFDIR = constants_1.constants.S_IFDIR;
  var S_IFREG = constants_1.constants.S_IFREG;
  var S_IFLNK = constants_1.constants.S_IFLNK;
  var O_APPEND = constants_1.constants.O_APPEND;
  exports.SEP = "/";
  var Node = function(_super) {
    __extends(Node2, _super);
    function Node2(ino, perm) {
      if (perm === void 0) {
        perm = 438;
      }
      var _this = _super.call(this) || this;
      _this.uid = process_1.default.getuid();
      _this.gid = process_1.default.getgid();
      _this.atime = new Date();
      _this.mtime = new Date();
      _this.ctime = new Date();
      _this.perm = 438;
      _this.mode = S_IFREG;
      _this.nlink = 1;
      _this.perm = perm;
      _this.mode |= perm;
      _this.ino = ino;
      return _this;
    }
    Node2.prototype.getString = function(encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      return this.getBuffer().toString(encoding);
    };
    Node2.prototype.setString = function(str) {
      this.buf = buffer_1.bufferFrom(str, "utf8");
      this.touch();
    };
    Node2.prototype.getBuffer = function() {
      if (!this.buf)
        this.setBuffer(buffer_1.bufferAllocUnsafe(0));
      return buffer_1.bufferFrom(this.buf);
    };
    Node2.prototype.setBuffer = function(buf) {
      this.buf = buffer_1.bufferFrom(buf);
      this.touch();
    };
    Node2.prototype.getSize = function() {
      return this.buf ? this.buf.length : 0;
    };
    Node2.prototype.setModeProperty = function(property) {
      this.mode = this.mode & ~S_IFMT | property;
    };
    Node2.prototype.setIsFile = function() {
      this.setModeProperty(S_IFREG);
    };
    Node2.prototype.setIsDirectory = function() {
      this.setModeProperty(S_IFDIR);
    };
    Node2.prototype.setIsSymlink = function() {
      this.setModeProperty(S_IFLNK);
    };
    Node2.prototype.isFile = function() {
      return (this.mode & S_IFMT) === S_IFREG;
    };
    Node2.prototype.isDirectory = function() {
      return (this.mode & S_IFMT) === S_IFDIR;
    };
    Node2.prototype.isSymlink = function() {
      return (this.mode & S_IFMT) === S_IFLNK;
    };
    Node2.prototype.makeSymlink = function(steps) {
      this.symlink = steps;
      this.setIsSymlink();
    };
    Node2.prototype.write = function(buf, off2, len, pos) {
      if (off2 === void 0) {
        off2 = 0;
      }
      if (len === void 0) {
        len = buf.length;
      }
      if (pos === void 0) {
        pos = 0;
      }
      if (!this.buf)
        this.buf = buffer_1.bufferAllocUnsafe(0);
      if (pos + len > this.buf.length) {
        var newBuf = buffer_1.bufferAllocUnsafe(pos + len);
        this.buf.copy(newBuf, 0, 0, this.buf.length);
        this.buf = newBuf;
      }
      buf.copy(this.buf, pos, off2, off2 + len);
      this.touch();
      return len;
    };
    Node2.prototype.read = function(buf, off2, len, pos) {
      if (off2 === void 0) {
        off2 = 0;
      }
      if (len === void 0) {
        len = buf.byteLength;
      }
      if (pos === void 0) {
        pos = 0;
      }
      if (!this.buf)
        this.buf = buffer_1.bufferAllocUnsafe(0);
      var actualLen = len;
      if (actualLen > buf.byteLength) {
        actualLen = buf.byteLength;
      }
      if (actualLen + pos > this.buf.length) {
        actualLen = this.buf.length - pos;
      }
      this.buf.copy(buf, off2, pos, pos + actualLen);
      return actualLen;
    };
    Node2.prototype.truncate = function(len) {
      if (len === void 0) {
        len = 0;
      }
      if (!len)
        this.buf = buffer_1.bufferAllocUnsafe(0);
      else {
        if (!this.buf)
          this.buf = buffer_1.bufferAllocUnsafe(0);
        if (len <= this.buf.length) {
          this.buf = this.buf.slice(0, len);
        } else {
          var buf = buffer_1.bufferAllocUnsafe(0);
          this.buf.copy(buf);
          buf.fill(0, len);
        }
      }
      this.touch();
    };
    Node2.prototype.chmod = function(perm) {
      this.perm = perm;
      this.mode = this.mode & ~511 | perm;
      this.touch();
    };
    Node2.prototype.chown = function(uid, gid) {
      this.uid = uid;
      this.gid = gid;
      this.touch();
    };
    Node2.prototype.touch = function() {
      this.mtime = new Date();
      this.emit("change", this);
    };
    Node2.prototype.canRead = function(uid, gid) {
      if (uid === void 0) {
        uid = process_1.default.getuid();
      }
      if (gid === void 0) {
        gid = process_1.default.getgid();
      }
      if (this.perm & 4) {
        return true;
      }
      if (gid === this.gid) {
        if (this.perm & 32) {
          return true;
        }
      }
      if (uid === this.uid) {
        if (this.perm & 256) {
          return true;
        }
      }
      return false;
    };
    Node2.prototype.canWrite = function(uid, gid) {
      if (uid === void 0) {
        uid = process_1.default.getuid();
      }
      if (gid === void 0) {
        gid = process_1.default.getgid();
      }
      if (this.perm & 2) {
        return true;
      }
      if (gid === this.gid) {
        if (this.perm & 16) {
          return true;
        }
      }
      if (uid === this.uid) {
        if (this.perm & 128) {
          return true;
        }
      }
      return false;
    };
    Node2.prototype.del = function() {
      this.emit("delete", this);
    };
    Node2.prototype.toJSON = function() {
      return {
        ino: this.ino,
        uid: this.uid,
        gid: this.gid,
        atime: this.atime.getTime(),
        mtime: this.mtime.getTime(),
        ctime: this.ctime.getTime(),
        perm: this.perm,
        mode: this.mode,
        nlink: this.nlink,
        symlink: this.symlink,
        data: this.getString()
      };
    };
    return Node2;
  }(events_1.EventEmitter);
  exports.Node = Node;
  var Link = function(_super) {
    __extends(Link2, _super);
    function Link2(vol, parent, name) {
      var _this = _super.call(this) || this;
      _this.children = {};
      _this.steps = [];
      _this.ino = 0;
      _this.length = 0;
      _this.vol = vol;
      _this.parent = parent;
      _this.steps = parent ? parent.steps.concat([name]) : [name];
      return _this;
    }
    Link2.prototype.setNode = function(node) {
      this.node = node;
      this.ino = node.ino;
    };
    Link2.prototype.getNode = function() {
      return this.node;
    };
    Link2.prototype.createChild = function(name, node) {
      if (node === void 0) {
        node = this.vol.createNode();
      }
      var link = new Link2(this.vol, this, name);
      link.setNode(node);
      if (node.isDirectory()) {
      }
      this.setChild(name, link);
      return link;
    };
    Link2.prototype.setChild = function(name, link) {
      if (link === void 0) {
        link = new Link2(this.vol, this, name);
      }
      this.children[name] = link;
      link.parent = this;
      this.length++;
      this.emit("child:add", link, this);
      return link;
    };
    Link2.prototype.deleteChild = function(link) {
      delete this.children[link.getName()];
      this.length--;
      this.emit("child:delete", link, this);
    };
    Link2.prototype.getChild = function(name) {
      if (Object.hasOwnProperty.call(this.children, name)) {
        return this.children[name];
      }
    };
    Link2.prototype.getPath = function() {
      return this.steps.join(exports.SEP);
    };
    Link2.prototype.getName = function() {
      return this.steps[this.steps.length - 1];
    };
    Link2.prototype.walk = function(steps, stop, i) {
      if (stop === void 0) {
        stop = steps.length;
      }
      if (i === void 0) {
        i = 0;
      }
      if (i >= steps.length)
        return this;
      if (i >= stop)
        return this;
      var step = steps[i];
      var link = this.getChild(step);
      if (!link)
        return null;
      return link.walk(steps, stop, i + 1);
    };
    Link2.prototype.toJSON = function() {
      return {
        steps: this.steps,
        ino: this.ino,
        children: Object.keys(this.children)
      };
    };
    return Link2;
  }(events_1.EventEmitter);
  exports.Link = Link;
  var File = function() {
    function File2(link, node, flags, fd) {
      this.position = 0;
      this.link = link;
      this.node = node;
      this.flags = flags;
      this.fd = fd;
    }
    File2.prototype.getString = function(encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      return this.node.getString();
    };
    File2.prototype.setString = function(str) {
      this.node.setString(str);
    };
    File2.prototype.getBuffer = function() {
      return this.node.getBuffer();
    };
    File2.prototype.setBuffer = function(buf) {
      this.node.setBuffer(buf);
    };
    File2.prototype.getSize = function() {
      return this.node.getSize();
    };
    File2.prototype.truncate = function(len) {
      this.node.truncate(len);
    };
    File2.prototype.seekTo = function(position) {
      this.position = position;
    };
    File2.prototype.stats = function() {
      return Stats_1.default.build(this.node);
    };
    File2.prototype.write = function(buf, offset, length, position) {
      if (offset === void 0) {
        offset = 0;
      }
      if (length === void 0) {
        length = buf.length;
      }
      if (typeof position !== "number")
        position = this.position;
      if (this.flags & O_APPEND)
        position = this.getSize();
      var bytes = this.node.write(buf, offset, length, position);
      this.position = position + bytes;
      return bytes;
    };
    File2.prototype.read = function(buf, offset, length, position) {
      if (offset === void 0) {
        offset = 0;
      }
      if (length === void 0) {
        length = buf.byteLength;
      }
      if (typeof position !== "number")
        position = this.position;
      var bytes = this.node.read(buf, offset, length, position);
      this.position = position + bytes;
      return bytes;
    };
    File2.prototype.chmod = function(perm) {
      this.node.chmod(perm);
    };
    File2.prototype.chown = function(uid, gid) {
      this.node.chown(uid, gid);
    };
    return File2;
  }();
  exports.File = File;
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/setTimeoutUnref.js
var require_setTimeoutUnref = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function setTimeoutUnref(callback, time, args) {
    var ref = setTimeout.apply(null, arguments);
    if (ref && typeof ref === "object" && typeof ref.unref === "function")
      ref.unref();
    return ref;
  }
  exports.default = setTimeoutUnref;
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/stream-browser.js
var require_stream_browser = __commonJS((exports, module) => {
  module.exports = require_events().EventEmitter;
});

// empty:/Users/admin/github/neo/node_modules/.pnpm/node_modules/util/util.js
var require_util3 = __commonJS(() => {
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS((exports, module) => {
  "use strict";
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var _require = require_buffer();
  var Buffer3 = _require.Buffer;
  var _require2 = require_util3();
  var inspect = _require2.inspect;
  var custom = inspect && inspect.custom || "inspect";
  function copyBuffer(src, target, offset) {
    Buffer3.prototype.copy.call(src, target, offset);
  }
  module.exports = /* @__PURE__ */ function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass(BufferList, [{
      key: "push",
      value: function push(v) {
        var entry = {
          data: v,
          next: null
        };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      }
    }, {
      key: "unshift",
      value: function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
    }, {
      key: "join",
      value: function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      }
    }, {
      key: "concat",
      value: function concat(n) {
        if (this.length === 0)
          return Buffer3.alloc(0);
        var ret = Buffer3.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
    }, {
      key: "consume",
      value: function consume(n, hasStrings) {
        var ret;
        if (n < this.head.data.length) {
          ret = this.head.data.slice(0, n);
          this.head.data = this.head.data.slice(n);
        } else if (n === this.head.data.length) {
          ret = this.shift();
        } else {
          ret = hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        return ret;
      }
    }, {
      key: "first",
      value: function first() {
        return this.head.data;
      }
    }, {
      key: "_getString",
      value: function _getString(n) {
        var p = this.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length)
            ret += str;
          else
            ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
    }, {
      key: "_getBuffer",
      value: function _getBuffer(n) {
        var ret = Buffer3.allocUnsafe(n);
        var p = this.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
    }, {
      key: custom,
      value: function value(_, options) {
        return inspect(this, _objectSpread({}, options, {
          depth: 0,
          customInspect: false
        }));
      }
    }]);
    return BufferList;
  }();
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS((exports, module) => {
  "use strict";
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          process_exports.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          process_exports.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          process_exports.nextTick(emitErrorAndCloseNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          process_exports.nextTick(emitErrorAndCloseNT, _this, err2);
        } else {
          process_exports.nextTick(emitCloseNT, _this);
        }
      } else if (cb) {
        process_exports.nextTick(emitCloseNT, _this);
        cb(err2);
      } else {
        process_exports.nextTick(emitCloseNT, _this);
      }
    });
    return this;
  }
  function emitErrorAndCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
  }
  function emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose)
      return;
    if (self._readableState && !self._readableState.emitClose)
      return;
    self.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self, err) {
    self.emit("error", err);
  }
  function errorOrDestroy(stream, err) {
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy)
      stream.destroy(err);
    else
      stream.emit("error", err);
  }
  module.exports = {
    destroy,
    undestroy,
    errorOrDestroy
  };
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/errors-browser.js
var require_errors_browser = __commonJS((exports, module) => {
  "use strict";
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var codes = {};
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }
    var NodeError = /* @__PURE__ */ function(_Base) {
      _inheritsLoose(NodeError2, _Base);
      function NodeError2(arg1, arg2, arg3) {
        return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
      }
      return NodeError2;
    }(Base);
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      var len = expected.length;
      expected = expected.map(function(i) {
        return String(i);
      });
      if (len > 2) {
        return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
      } else if (len === 2) {
        return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
      } else {
        return "of ".concat(thing, " ").concat(expected[0]);
      }
    } else {
      return "of ".concat(thing, " ").concat(String(expected));
    }
  }
  function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  }
  function endsWith(str, search, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
  }
  function includes(str, search, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search.length > str.length) {
      return false;
    } else {
      return str.indexOf(search, start) !== -1;
    }
  }
  createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    var determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else {
      determiner = "must be";
    }
    var msg;
    if (endsWith(name, " argument")) {
      msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    } else {
      var type = includes(name, ".") ? "property" : "argument";
      msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    }
    msg += ". Received type ".concat(typeof actual);
    return msg;
  }, TypeError);
  createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
  });
  createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
  });
  createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
  }, TypeError);
  createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  module.exports.codes = codes;
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS((exports, module) => {
  "use strict";
  var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
        var name = isDuplex ? duplexKey : "highWaterMark";
        throw new ERR_INVALID_OPT_VALUE(name, hwm);
      }
      return Math.floor(hwm);
    }
    return state.objectMode ? 16 : 16 * 1024;
  }
  module.exports = {
    getHighWaterMark
  };
});

// ../../node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/browser.js
var require_browser2 = __commonJS((exports, module) => {
  module.exports = deprecate;
  function deprecate(fn, msg) {
    if (config2("noDeprecation")) {
      return fn;
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (config2("throwDeprecation")) {
          throw new Error(msg);
        } else if (config2("traceDeprecation")) {
          console.trace(msg);
        } else {
          console.warn(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function config2(name) {
    try {
      if (!global.localStorage)
        return false;
    } catch (_) {
      return false;
    }
    var val = global.localStorage[name];
    if (val == null)
      return false;
    return String(val).toLowerCase() === "true";
  }
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS((exports, module) => {
  "use strict";
  module.exports = Writable;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var Duplex;
  Writable.WritableState = WritableState;
  var internalUtil = {
    deprecate: require_browser2()
  };
  var Stream = require_stream_browser();
  var Buffer3 = require_buffer().Buffer;
  var OurUint8Array = global.Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer3.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer3.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = require_destroy();
  var _require = require_state();
  var getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = require_errors_browser().codes;
  var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
  var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
  var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
  var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
  var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  require_inherits_browser()(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function writableStateBufferGetter() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function value(object) {
        if (realHasInstance.call(this, object))
          return true;
        if (this !== Writable)
          return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function realHasInstance2(object) {
      return object instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require_stream_duplex();
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
      return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    errorOrDestroy(stream, er);
    process_exports.nextTick(cb, er);
  }
  function validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) {
      er = new ERR_STREAM_NULL_VALUES();
    } else if (typeof chunk !== "string" && !state.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    }
    if (er) {
      errorOrDestroy(stream, er);
      process_exports.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer3.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state.ending)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
        clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer3.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed)
      state.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      process_exports.nextTick(cb, er);
      process_exports.nextTick(finishMaybe, stream, state);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
      finishMaybe(stream, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function")
      throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(state) || stream.destroyed;
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }
      if (sync) {
        process_exports.nextTick(afterWrite, stream, state, finished, cb);
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  }
  function afterWrite(stream, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite(stream, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0)
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending)
      endWritable(this, state, cb);
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream, state) {
    stream._final(function(err) {
      state.pendingcb--;
      if (err) {
        errorOrDestroy(stream, err);
      }
      state.prefinished = true;
      stream.emit("prefinish");
      finishMaybe(stream, state);
    });
  }
  function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream._final === "function" && !state.destroyed) {
        state.pendingcb++;
        state.finalCalled = true;
        process_exports.nextTick(callFinal, stream, state);
      } else {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream.emit("finish");
        if (state.autoDestroy) {
          var rState = stream._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) {
            stream.destroy();
          }
        }
      }
    }
    return need;
  }
  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished)
        process_exports.nextTick(cb);
      else
        stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function set(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS((exports, module) => {
  "use strict";
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj) {
      keys2.push(key);
    }
    return keys2;
  };
  module.exports = Duplex;
  var Readable = require_stream_readable();
  var Writable = require_stream_writable();
  require_inherits_browser()(Duplex, Readable);
  {
    keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  var keys;
  var method;
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
      if (options.readable === false)
        this.readable = false;
      if (options.writable === false)
        this.writable = false;
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend);
      }
    }
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend() {
    if (this._writableState.ended)
      return;
    process_exports.nextTick(onEndNT, this);
  }
  function onEndNT(self) {
    self.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
});

// ../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS((exports, module) => {
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var buffer = require_buffer();
  var Buffer3 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer3(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer3.prototype);
  copyProps(Buffer3, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer3(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer3(size);
    if (fill !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer3(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});

// ../../node_modules/.pnpm/string_decoder@1.3.0/node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS((exports) => {
  "use strict";
  var Buffer3 = require_safe_buffer().Buffer;
  var isEncoding = Buffer3.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer3.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  exports.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer3.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self.lastNeed = 0;
      return "\uFFFD";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self.lastNeed = 1;
        return "\uFFFD";
      }
      if (self.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self.lastNeed = 2;
          return "\uFFFD";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== void 0)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "\uFFFD";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS((exports, module) => {
  "use strict";
  var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function once2(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      callback.apply(this, args);
    };
  }
  function noop2() {
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function eos(stream, opts, callback) {
    if (typeof opts === "function")
      return eos(stream, null, opts);
    if (!opts)
      opts = {};
    callback = once2(callback || noop2);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish2() {
      if (!stream.writable)
        onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish2() {
      writable = false;
      writableEnded = true;
      if (!readable)
        callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend2() {
      readable = false;
      readableEnded = true;
      if (!writable)
        callback.call(stream);
    };
    var onerror = function onerror2(err) {
      callback.call(stream, err);
    };
    var onclose = function onclose2() {
      var err;
      if (readable && !readableEnded) {
        if (!stream._readableState || !stream._readableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
      if (writable && !writableEnded) {
        if (!stream._writableState || !stream._writableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
    };
    var onrequest = function onrequest2() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  }
  module.exports = eos;
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS((exports, module) => {
  "use strict";
  var _Object$setPrototypeO;
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var finished = require_end_of_stream();
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value, done) {
    return {
      value,
      done
    };
  }
  function readAndResolve(iter) {
    var resolve2 = iter[kLastResolve];
    if (resolve2 !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve2(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    process_exports.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve2, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve2(createIterResult(void 0, true));
          return;
        }
        iter[kHandlePromise](resolve2, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error = this[kError];
      if (error !== null) {
        return Promise.reject(error);
      }
      if (this[kEnded]) {
        return Promise.resolve(createIterResult(void 0, true));
      }
      if (this[kStream].destroyed) {
        return new Promise(function(resolve2, reject) {
          process_exports.nextTick(function() {
            if (_this[kError]) {
              reject(_this[kError]);
            } else {
              resolve2(createIterResult(void 0, true));
            }
          });
        });
      }
      var lastPromise = this[kLastPromise];
      var promise;
      if (lastPromise) {
        promise = new Promise(wrapForNext(lastPromise, this));
      } else {
        var data = this[kStream].read();
        if (data !== null) {
          return Promise.resolve(createIterResult(data, false));
        }
        promise = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise;
      return promise;
    }
  }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve2, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve2(createIterResult(void 0, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
      value: stream,
      writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kEnded, {
      value: stream._readableState.endEmitted,
      writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
      value: function value(resolve2, reject) {
        var data = iterator[kStream].read();
        if (data) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve2(createIterResult(data, false));
        } else {
          iterator[kLastResolve] = resolve2;
          iterator[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator[kLastReject];
        if (reject !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          reject(err);
        }
        iterator[kError] = err;
        return;
      }
      var resolve2 = iterator[kLastResolve];
      if (resolve2 !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve2(createIterResult(void 0, true));
      }
      iterator[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator));
    return iterator;
  };
  module.exports = createReadableStreamAsyncIterator;
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/from-browser.js
var require_from_browser = __commonJS((exports, module) => {
  module.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS((exports, module) => {
  "use strict";
  module.exports = Readable;
  var Duplex;
  Readable.ReadableState = ReadableState;
  var EE = require_events().EventEmitter;
  var EElistenerCount = function EElistenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = require_stream_browser();
  var Buffer3 = require_buffer().Buffer;
  var OurUint8Array = global.Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer3.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer3.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = require_util3();
  var debug;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function debug2() {
    };
  }
  var BufferList = require_buffer_list();
  var destroyImpl = require_destroy();
  var _require = require_state();
  var getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = require_errors_browser().codes;
  var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
  var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder;
  var createReadableStreamAsyncIterator;
  var from;
  require_inherits_browser()(Readable, Stream);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function set(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer3.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state, chunk);
      if (er) {
        errorOrDestroy(stream, er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer3.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted)
            errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else
            addChunk(stream, state, chunk, true);
        } else if (state.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state.destroyed) {
          return false;
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0)
              addChunk(stream, state, chunk, false);
            else
              maybeReadMore(stream, state);
          } else {
            addChunk(stream, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
        maybeReadMore(stream, state);
      }
    }
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
  }
  function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      state.awaitDrain = 0;
      stream.emit("data", chunk);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream);
    }
    maybeReadMore(stream, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
    }
    return er;
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = require_string_decoder().StringDecoder;
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "")
      this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;
      state.awaitDrain = 0;
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream, state) {
    debug("onEofChunk");
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    if (state.sync) {
      emitReadable(stream);
    } else {
      state.needReadable = false;
      if (!state.emittedReadable) {
        state.emittedReadable = true;
        emitReadable_(stream);
      }
    }
  }
  function emitReadable(stream) {
    var state = stream._readableState;
    debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      process_exports.nextTick(emitReadable_, stream);
    }
  }
  function emitReadable_(stream) {
    var state = stream._readableState;
    debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
      stream.emit("readable");
      state.emittedReadable = false;
    }
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      process_exports.nextTick(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
      var len = state.length;
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length)
        break;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process_exports.stdout && dest !== process_exports.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      process_exports.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug("onunpipe");
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state.awaitDrain);
          state.awaitDrain++;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        errorOrDestroy(dest, er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
      hasUnpiped: false
    };
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0; i < len; i++) {
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      }
      return this;
    }
    var index = indexOf(state.pipes, dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;
      if (state.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;
        debug("on readable", state.length, state.reading);
        if (state.length) {
          emitReadable(this);
        } else if (!state.reading) {
          process_exports.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process_exports.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      process_exports.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self) {
    var state = self._readableState;
    state.readableListening = self.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) {
      state.flowing = true;
    } else if (self.listenerCount("data") > 0) {
      self.resume();
    }
  }
  function nReadingNextTick(self) {
    debug("readable nexttick read 0");
    self.read(0);
  }
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = !state.readableListening;
      resume(this, state);
    }
    state.paused = false;
    return this;
  };
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      process_exports.nextTick(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    debug("resume", state.reading);
    if (!state.reading) {
      stream.read(0);
    }
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream.read() !== null) {
      ;
    }
  }
  Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === void 0))
        return;
      else if (!state.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (this[i] === void 0 && typeof stream[i] === "function") {
        this[i] = function methodWrap(method) {
          return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") {
    Readable.prototype[Symbol.asyncIterator] = function() {
      if (createReadableStreamAsyncIterator === void 0) {
        createReadableStreamAsyncIterator = require_async_iterator();
      }
      return createReadableStreamAsyncIterator(this);
    };
  }
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable.prototype, "readableBuffer", {
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable.prototype, "readableFlowing", {
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state) {
      if (this._readableState) {
        this._readableState.flowing = state;
      }
    }
  });
  Readable._fromList = fromList;
  Object.defineProperty(Readable.prototype, "readableLength", {
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.first();
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = state.buffer.consume(n, state.decoder);
    }
    return ret;
  }
  function endReadable(stream) {
    var state = stream._readableState;
    debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
      state.ended = true;
      process_exports.nextTick(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    debug("endReadableNT", state.endEmitted, state.length);
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
      if (state.autoDestroy) {
        var wState = stream._writableState;
        if (!wState || wState.autoDestroy && wState.finished) {
          stream.destroy();
        }
      }
    }
  }
  if (typeof Symbol === "function") {
    Readable.from = function(iterable, opts) {
      if (from === void 0) {
        from = require_from_browser();
      }
      return from(Readable, iterable, opts);
    };
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS((exports, module) => {
  "use strict";
  module.exports = Transform;
  var _require$codes = require_errors_browser().codes;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
  var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
  var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
  var Duplex = require_stream_duplex();
  require_inherits_browser()(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) {
      return this.emit("error", new ERR_MULTIPLE_CALLBACK());
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
    });
  };
  function done(stream, er, data) {
    if (er)
      return stream.emit("error", er);
    if (data != null)
      stream.push(data);
    if (stream._writableState.length)
      throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming)
      throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
  }
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS((exports, module) => {
  "use strict";
  module.exports = PassThrough;
  var Transform = require_stream_transform();
  require_inherits_browser()(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
});

// ../../node_modules/.pnpm/readable-stream@3.6.0/node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS((exports, module) => {
  "use strict";
  var eos;
  function once2(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      callback.apply(void 0, arguments);
    };
  }
  var _require$codes = require_errors_browser().codes;
  var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
  var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  function noop2(err) {
    if (err)
      throw err;
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function destroyer(stream, reading, writing, callback) {
    callback = once2(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    if (eos === void 0)
      eos = require_end_of_stream();
    eos(stream, {
      readable: reading,
      writable: writing
    }, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isRequest(stream))
        return stream.abort();
      if (typeof stream.destroy === "function")
        return stream.destroy();
      callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
  }
  function call(fn) {
    fn();
  }
  function pipe(from, to) {
    return from.pipe(to);
  }
  function popCallback(streams) {
    if (!streams.length)
      return noop2;
    if (typeof streams[streams.length - 1] !== "function")
      return noop2;
    return streams.pop();
  }
  function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
      streams[_key] = arguments[_key];
    }
    var callback = popCallback(streams);
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    var error;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream, reading, writing, function(err) {
        if (!error)
          error = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error);
      });
    });
    return streams.reduce(pipe);
  }
  module.exports = pipeline;
});

// ../../node_modules/.pnpm/stream-browserify@3.0.0/node_modules/stream-browserify/index.js
var require_stream_browserify = __commonJS((exports, module) => {
  module.exports = Stream;
  var EE = require_events().EventEmitter;
  var inherits = require_inherits_browser();
  inherits(Stream, EE);
  Stream.Readable = require_stream_readable();
  Stream.Writable = require_stream_writable();
  Stream.Duplex = require_stream_duplex();
  Stream.Transform = require_stream_transform();
  Stream.PassThrough = require_stream_passthrough();
  Stream.finished = require_end_of_stream();
  Stream.pipeline = require_pipeline();
  Stream.Stream = Stream;
  function Stream() {
    EE.call(this);
  }
  Stream.prototype.pipe = function(dest, options) {
    var source = this;
    function ondata(chunk) {
      if (dest.writable) {
        if (dest.write(chunk) === false && source.pause) {
          source.pause();
        }
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    var didOnEnd = false;
    function onend() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      if (typeof dest.destroy === "function")
        dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) {
        throw er;
      }
    }
    source.on("error", onerror);
    dest.on("error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/promises.js
var require_promises = __commonJS((exports) => {
  "use strict";
  var __spreadArrays = exports && exports.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.FileHandle = void 0;
  function promisify(vol, fn, getResult) {
    if (getResult === void 0) {
      getResult = function(input) {
        return input;
      };
    }
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new Promise(function(resolve2, reject) {
        vol[fn].bind(vol).apply(void 0, __spreadArrays(args, [function(error, result) {
          if (error)
            return reject(error);
          return resolve2(getResult(result));
        }]));
      });
    };
  }
  var FileHandle = function() {
    function FileHandle2(vol, fd) {
      this.vol = vol;
      this.fd = fd;
    }
    FileHandle2.prototype.appendFile = function(data, options) {
      return promisify(this.vol, "appendFile")(this.fd, data, options);
    };
    FileHandle2.prototype.chmod = function(mode) {
      return promisify(this.vol, "fchmod")(this.fd, mode);
    };
    FileHandle2.prototype.chown = function(uid, gid) {
      return promisify(this.vol, "fchown")(this.fd, uid, gid);
    };
    FileHandle2.prototype.close = function() {
      return promisify(this.vol, "close")(this.fd);
    };
    FileHandle2.prototype.datasync = function() {
      return promisify(this.vol, "fdatasync")(this.fd);
    };
    FileHandle2.prototype.read = function(buffer, offset, length, position) {
      return promisify(this.vol, "read", function(bytesRead) {
        return {bytesRead, buffer};
      })(this.fd, buffer, offset, length, position);
    };
    FileHandle2.prototype.readFile = function(options) {
      return promisify(this.vol, "readFile")(this.fd, options);
    };
    FileHandle2.prototype.stat = function(options) {
      return promisify(this.vol, "fstat")(this.fd, options);
    };
    FileHandle2.prototype.sync = function() {
      return promisify(this.vol, "fsync")(this.fd);
    };
    FileHandle2.prototype.truncate = function(len) {
      return promisify(this.vol, "ftruncate")(this.fd, len);
    };
    FileHandle2.prototype.utimes = function(atime, mtime) {
      return promisify(this.vol, "futimes")(this.fd, atime, mtime);
    };
    FileHandle2.prototype.write = function(buffer, offset, length, position) {
      return promisify(this.vol, "write", function(bytesWritten) {
        return {bytesWritten, buffer};
      })(this.fd, buffer, offset, length, position);
    };
    FileHandle2.prototype.writeFile = function(data, options) {
      return promisify(this.vol, "writeFile")(this.fd, data, options);
    };
    return FileHandle2;
  }();
  exports.FileHandle = FileHandle;
  function createPromisesApi(vol) {
    if (typeof Promise === "undefined")
      return null;
    return {
      FileHandle,
      access: function(path6, mode) {
        return promisify(vol, "access")(path6, mode);
      },
      appendFile: function(path6, data, options) {
        return promisify(vol, "appendFile")(path6 instanceof FileHandle ? path6.fd : path6, data, options);
      },
      chmod: function(path6, mode) {
        return promisify(vol, "chmod")(path6, mode);
      },
      chown: function(path6, uid, gid) {
        return promisify(vol, "chown")(path6, uid, gid);
      },
      copyFile: function(src, dest, flags) {
        return promisify(vol, "copyFile")(src, dest, flags);
      },
      lchmod: function(path6, mode) {
        return promisify(vol, "lchmod")(path6, mode);
      },
      lchown: function(path6, uid, gid) {
        return promisify(vol, "lchown")(path6, uid, gid);
      },
      link: function(existingPath, newPath) {
        return promisify(vol, "link")(existingPath, newPath);
      },
      lstat: function(path6, options) {
        return promisify(vol, "lstat")(path6, options);
      },
      mkdir: function(path6, options) {
        return promisify(vol, "mkdir")(path6, options);
      },
      mkdtemp: function(prefix, options) {
        return promisify(vol, "mkdtemp")(prefix, options);
      },
      open: function(path6, flags, mode) {
        return promisify(vol, "open", function(fd) {
          return new FileHandle(vol, fd);
        })(path6, flags, mode);
      },
      readdir: function(path6, options) {
        return promisify(vol, "readdir")(path6, options);
      },
      readFile: function(id, options) {
        return promisify(vol, "readFile")(id instanceof FileHandle ? id.fd : id, options);
      },
      readlink: function(path6, options) {
        return promisify(vol, "readlink")(path6, options);
      },
      realpath: function(path6, options) {
        return promisify(vol, "realpath")(path6, options);
      },
      rename: function(oldPath, newPath) {
        return promisify(vol, "rename")(oldPath, newPath);
      },
      rmdir: function(path6) {
        return promisify(vol, "rmdir")(path6);
      },
      stat: function(path6, options) {
        return promisify(vol, "stat")(path6, options);
      },
      symlink: function(target, path6, type) {
        return promisify(vol, "symlink")(target, path6, type);
      },
      truncate: function(path6, len) {
        return promisify(vol, "truncate")(path6, len);
      },
      unlink: function(path6) {
        return promisify(vol, "unlink")(path6);
      },
      utimes: function(path6, atime, mtime) {
        return promisify(vol, "utimes")(path6, atime, mtime);
      },
      writeFile: function(id, data, options) {
        return promisify(vol, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
      }
    };
  }
  exports.default = createPromisesApi;
});

// ../../node_modules/.pnpm/fs-monkey@1.0.1/node_modules/fs-monkey/lib/correctPath.js
var require_correctPath = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unixify = unixify;
  exports.correctPath = correctPath;
  var isWin = process_exports.platform === "win32";
  function removeTrailingSeparator(str) {
    var i = str.length - 1;
    if (i < 2) {
      return str;
    }
    while (isSeparator(str, i)) {
      i--;
    }
    return str.substr(0, i + 1);
  }
  function isSeparator(str, i) {
    var char = str[i];
    return i > 0 && (char === "/" || isWin && char === "\\");
  }
  function normalizePath(str, stripTrailing) {
    if (typeof str !== "string") {
      throw new TypeError("expected a string");
    }
    str = str.replace(/[\\\/]+/g, "/");
    if (stripTrailing !== false) {
      str = removeTrailingSeparator(str);
    }
    return str;
  }
  function unixify(filepath) {
    var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (isWin) {
      filepath = normalizePath(filepath, stripTrailing);
      return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
    }
    return filepath;
  }
  function correctPath(filepath) {
    return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
  }
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/volume.js
var require_volume = __commonJS((exports) => {
  "use strict";
  var __extends = exports && exports.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __spreadArrays = exports && exports.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.FSWatcher = exports.StatWatcher = exports.Volume = exports.toUnixTimestamp = exports.bufferToEncoding = exports.dataToBuffer = exports.dataToStr = exports.pathToSteps = exports.filenameToSteps = exports.pathToFilename = exports.flagsToNumber = exports.FLAGS = void 0;
  var pathModule = require_path_browserify();
  var node_1 = require_node();
  var Stats_1 = require_Stats();
  var Dirent_1 = require_Dirent();
  var buffer_1 = require_buffer2();
  var setImmediate_1 = require_setImmediate();
  var process_1 = require_process();
  var setTimeoutUnref_1 = require_setTimeoutUnref();
  var stream_1 = require_stream_browserify();
  var constants_1 = require_constants();
  var events_1 = require_events();
  var encoding_1 = require_encoding();
  var errors = require_errors2();
  var util = require_util2();
  var promises_1 = require_promises();
  var resolveCrossPlatform = pathModule.resolve;
  var O_RDONLY = constants_1.constants.O_RDONLY;
  var O_WRONLY = constants_1.constants.O_WRONLY;
  var O_RDWR = constants_1.constants.O_RDWR;
  var O_CREAT = constants_1.constants.O_CREAT;
  var O_EXCL = constants_1.constants.O_EXCL;
  var O_TRUNC = constants_1.constants.O_TRUNC;
  var O_APPEND = constants_1.constants.O_APPEND;
  var O_SYNC = constants_1.constants.O_SYNC;
  var O_DIRECTORY = constants_1.constants.O_DIRECTORY;
  var F_OK = constants_1.constants.F_OK;
  var COPYFILE_EXCL = constants_1.constants.COPYFILE_EXCL;
  var COPYFILE_FICLONE_FORCE = constants_1.constants.COPYFILE_FICLONE_FORCE;
  var _a = pathModule.posix ? pathModule.posix : pathModule;
  var sep = _a.sep;
  var relative = _a.relative;
  var join = _a.join;
  var dirname = _a.dirname;
  var isWin = process_1.default.platform === "win32";
  var kMinPoolSpace = 128;
  var ERRSTR = {
    PATH_STR: "path must be a string or Buffer",
    FD: "fd must be a file descriptor",
    MODE_INT: "mode must be an int",
    CB: "callback must be a function",
    UID: "uid must be an unsigned int",
    GID: "gid must be an unsigned int",
    LEN: "len must be an integer",
    ATIME: "atime must be an integer",
    MTIME: "mtime must be an integer",
    PREFIX: "filename prefix is required",
    BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
    OFFSET: "offset must be an integer",
    LENGTH: "length must be an integer",
    POSITION: "position must be an integer"
  };
  var ERRSTR_OPTS = function(tipeof) {
    return "Expected options to be either an object or a string, but got " + tipeof + " instead";
  };
  var ENOENT = "ENOENT";
  var EBADF = "EBADF";
  var EINVAL = "EINVAL";
  var EPERM = "EPERM";
  var EPROTO = "EPROTO";
  var EEXIST = "EEXIST";
  var ENOTDIR = "ENOTDIR";
  var EMFILE = "EMFILE";
  var EACCES = "EACCES";
  var EISDIR = "EISDIR";
  var ENOTEMPTY = "ENOTEMPTY";
  var ENOSYS = "ENOSYS";
  function formatError(errorCode, func, path6, path22) {
    if (func === void 0) {
      func = "";
    }
    if (path6 === void 0) {
      path6 = "";
    }
    if (path22 === void 0) {
      path22 = "";
    }
    var pathFormatted = "";
    if (path6)
      pathFormatted = " '" + path6 + "'";
    if (path22)
      pathFormatted += " -> '" + path22 + "'";
    switch (errorCode) {
      case ENOENT:
        return "ENOENT: no such file or directory, " + func + pathFormatted;
      case EBADF:
        return "EBADF: bad file descriptor, " + func + pathFormatted;
      case EINVAL:
        return "EINVAL: invalid argument, " + func + pathFormatted;
      case EPERM:
        return "EPERM: operation not permitted, " + func + pathFormatted;
      case EPROTO:
        return "EPROTO: protocol error, " + func + pathFormatted;
      case EEXIST:
        return "EEXIST: file already exists, " + func + pathFormatted;
      case ENOTDIR:
        return "ENOTDIR: not a directory, " + func + pathFormatted;
      case EISDIR:
        return "EISDIR: illegal operation on a directory, " + func + pathFormatted;
      case EACCES:
        return "EACCES: permission denied, " + func + pathFormatted;
      case ENOTEMPTY:
        return "ENOTEMPTY: directory not empty, " + func + pathFormatted;
      case EMFILE:
        return "EMFILE: too many open files, " + func + pathFormatted;
      case ENOSYS:
        return "ENOSYS: function not implemented, " + func + pathFormatted;
      default:
        return errorCode + ": error occurred, " + func + pathFormatted;
    }
  }
  function createError(errorCode, func, path6, path22, Constructor) {
    if (func === void 0) {
      func = "";
    }
    if (path6 === void 0) {
      path6 = "";
    }
    if (path22 === void 0) {
      path22 = "";
    }
    if (Constructor === void 0) {
      Constructor = Error;
    }
    var error = new Constructor(formatError(errorCode, func, path6, path22));
    error.code = errorCode;
    return error;
  }
  var FLAGS;
  (function(FLAGS2) {
    FLAGS2[FLAGS2["r"] = O_RDONLY] = "r";
    FLAGS2[FLAGS2["r+"] = O_RDWR] = "r+";
    FLAGS2[FLAGS2["rs"] = O_RDONLY | O_SYNC] = "rs";
    FLAGS2[FLAGS2["sr"] = FLAGS2.rs] = "sr";
    FLAGS2[FLAGS2["rs+"] = O_RDWR | O_SYNC] = "rs+";
    FLAGS2[FLAGS2["sr+"] = FLAGS2["rs+"]] = "sr+";
    FLAGS2[FLAGS2["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
    FLAGS2[FLAGS2["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
    FLAGS2[FLAGS2["xw"] = FLAGS2.wx] = "xw";
    FLAGS2[FLAGS2["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
    FLAGS2[FLAGS2["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
    FLAGS2[FLAGS2["xw+"] = FLAGS2["wx+"]] = "xw+";
    FLAGS2[FLAGS2["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a";
    FLAGS2[FLAGS2["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
    FLAGS2[FLAGS2["xa"] = FLAGS2.ax] = "xa";
    FLAGS2[FLAGS2["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+";
    FLAGS2[FLAGS2["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
    FLAGS2[FLAGS2["xa+"] = FLAGS2["ax+"]] = "xa+";
  })(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
  function flagsToNumber(flags) {
    if (typeof flags === "number")
      return flags;
    if (typeof flags === "string") {
      var flagsNum = FLAGS[flags];
      if (typeof flagsNum !== "undefined")
        return flagsNum;
    }
    throw new errors.TypeError("ERR_INVALID_OPT_VALUE", "flags", flags);
  }
  exports.flagsToNumber = flagsToNumber;
  function getOptions(defaults, options) {
    var opts;
    if (!options)
      return defaults;
    else {
      var tipeof = typeof options;
      switch (tipeof) {
        case "string":
          opts = Object.assign({}, defaults, {encoding: options});
          break;
        case "object":
          opts = Object.assign({}, defaults, options);
          break;
        default:
          throw TypeError(ERRSTR_OPTS(tipeof));
      }
    }
    if (opts.encoding !== "buffer")
      encoding_1.assertEncoding(opts.encoding);
    return opts;
  }
  function optsGenerator(defaults) {
    return function(options) {
      return getOptions(defaults, options);
    };
  }
  function validateCallback(callback) {
    if (typeof callback !== "function")
      throw TypeError(ERRSTR.CB);
    return callback;
  }
  function optsAndCbGenerator(getOpts) {
    return function(options, callback) {
      return typeof options === "function" ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
    };
  }
  var optsDefaults = {
    encoding: "utf8"
  };
  var getDefaultOpts = optsGenerator(optsDefaults);
  var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
  var readFileOptsDefaults = {
    flag: "r"
  };
  var getReadFileOptions = optsGenerator(readFileOptsDefaults);
  var writeFileDefaults = {
    encoding: "utf8",
    mode: 438,
    flag: FLAGS[FLAGS.w]
  };
  var getWriteFileOptions = optsGenerator(writeFileDefaults);
  var appendFileDefaults = {
    encoding: "utf8",
    mode: 438,
    flag: FLAGS[FLAGS.a]
  };
  var getAppendFileOpts = optsGenerator(appendFileDefaults);
  var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
  var realpathDefaults = optsDefaults;
  var getRealpathOptions = optsGenerator(realpathDefaults);
  var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
  var mkdirDefaults = {
    mode: 511,
    recursive: false
  };
  var getMkdirOptions = function(options) {
    if (typeof options === "number")
      return Object.assign({}, mkdirDefaults, {mode: options});
    return Object.assign({}, mkdirDefaults, options);
  };
  var rmdirDefaults = {
    recursive: false
  };
  var getRmdirOptions = function(options) {
    return Object.assign({}, rmdirDefaults, options);
  };
  var readdirDefaults = {
    encoding: "utf8",
    withFileTypes: false
  };
  var getReaddirOptions = optsGenerator(readdirDefaults);
  var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
  var statDefaults = {
    bigint: false
  };
  var getStatOptions = function(options) {
    if (options === void 0) {
      options = {};
    }
    return Object.assign({}, statDefaults, options);
  };
  var getStatOptsAndCb = function(options, callback) {
    return typeof options === "function" ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
  };
  function getPathFromURLPosix(url2) {
    if (url2.hostname !== "") {
      throw new errors.TypeError("ERR_INVALID_FILE_URL_HOST", process_1.default.platform);
    }
    var pathname = url2.pathname;
    for (var n = 0; n < pathname.length; n++) {
      if (pathname[n] === "%") {
        var third = pathname.codePointAt(n + 2) | 32;
        if (pathname[n + 1] === "2" && third === 102) {
          throw new errors.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  function pathToFilename(path6) {
    if (typeof path6 !== "string" && !buffer_1.Buffer.isBuffer(path6)) {
      try {
        if (!(path6 instanceof require_url().URL))
          throw new TypeError(ERRSTR.PATH_STR);
      } catch (err) {
        throw new TypeError(ERRSTR.PATH_STR);
      }
      path6 = getPathFromURLPosix(path6);
    }
    var pathString = String(path6);
    nullCheck(pathString);
    return pathString;
  }
  exports.pathToFilename = pathToFilename;
  var resolve2 = function(filename, base) {
    if (base === void 0) {
      base = process_1.default.cwd();
    }
    return resolveCrossPlatform(base, filename);
  };
  if (isWin) {
    _resolve_1 = resolve2;
    unixify_1 = require_correctPath().unixify;
    resolve2 = function(filename, base) {
      return unixify_1(_resolve_1(filename, base));
    };
  }
  var _resolve_1;
  var unixify_1;
  function filenameToSteps(filename, base) {
    var fullPath = resolve2(filename, base);
    var fullPathSansSlash = fullPath.substr(1);
    if (!fullPathSansSlash)
      return [];
    return fullPathSansSlash.split(sep);
  }
  exports.filenameToSteps = filenameToSteps;
  function pathToSteps(path6) {
    return filenameToSteps(pathToFilename(path6));
  }
  exports.pathToSteps = pathToSteps;
  function dataToStr(data, encoding) {
    if (encoding === void 0) {
      encoding = encoding_1.ENCODING_UTF8;
    }
    if (buffer_1.Buffer.isBuffer(data))
      return data.toString(encoding);
    else if (data instanceof Uint8Array)
      return buffer_1.bufferFrom(data).toString(encoding);
    else
      return String(data);
  }
  exports.dataToStr = dataToStr;
  function dataToBuffer(data, encoding) {
    if (encoding === void 0) {
      encoding = encoding_1.ENCODING_UTF8;
    }
    if (buffer_1.Buffer.isBuffer(data))
      return data;
    else if (data instanceof Uint8Array)
      return buffer_1.bufferFrom(data);
    else
      return buffer_1.bufferFrom(String(data), encoding);
  }
  exports.dataToBuffer = dataToBuffer;
  function bufferToEncoding(buffer, encoding) {
    if (!encoding || encoding === "buffer")
      return buffer;
    else
      return buffer.toString(encoding);
  }
  exports.bufferToEncoding = bufferToEncoding;
  function nullCheck(path6, callback) {
    if (("" + path6).indexOf("\0") !== -1) {
      var er = new Error("Path must be a string without null bytes");
      er.code = ENOENT;
      if (typeof callback !== "function")
        throw er;
      process_1.default.nextTick(callback, er);
      return false;
    }
    return true;
  }
  function _modeToNumber(mode, def) {
    if (typeof mode === "number")
      return mode;
    if (typeof mode === "string")
      return parseInt(mode, 8);
    if (def)
      return modeToNumber(def);
    return void 0;
  }
  function modeToNumber(mode, def) {
    var result = _modeToNumber(mode, def);
    if (typeof result !== "number" || isNaN(result))
      throw new TypeError(ERRSTR.MODE_INT);
    return result;
  }
  function isFd(path6) {
    return path6 >>> 0 === path6;
  }
  function validateFd(fd) {
    if (!isFd(fd))
      throw TypeError(ERRSTR.FD);
  }
  function toUnixTimestamp(time) {
    if (typeof time === "string" && +time == time) {
      return +time;
    }
    if (time instanceof Date) {
      return time.getTime() / 1e3;
    }
    if (isFinite(time)) {
      if (time < 0) {
        return Date.now() / 1e3;
      }
      return time;
    }
    throw new Error("Cannot parse time: " + time);
  }
  exports.toUnixTimestamp = toUnixTimestamp;
  function validateUid(uid) {
    if (typeof uid !== "number")
      throw TypeError(ERRSTR.UID);
  }
  function validateGid(gid) {
    if (typeof gid !== "number")
      throw TypeError(ERRSTR.GID);
  }
  function flattenJSON(nestedJSON) {
    var flatJSON = {};
    function flatten(pathPrefix, node) {
      for (var path6 in node) {
        var contentOrNode = node[path6];
        var joinedPath = join(pathPrefix, path6);
        if (typeof contentOrNode === "string") {
          flatJSON[joinedPath] = contentOrNode;
        } else if (typeof contentOrNode === "object" && contentOrNode !== null && Object.keys(contentOrNode).length > 0) {
          flatten(joinedPath, contentOrNode);
        } else {
          flatJSON[joinedPath] = null;
        }
      }
    }
    flatten("", nestedJSON);
    return flatJSON;
  }
  var Volume = function() {
    function Volume2(props) {
      if (props === void 0) {
        props = {};
      }
      this.ino = 0;
      this.inodes = {};
      this.releasedInos = [];
      this.fds = {};
      this.releasedFds = [];
      this.maxFiles = 1e4;
      this.openFiles = 0;
      this.promisesApi = promises_1.default(this);
      this.statWatchers = {};
      this.props = Object.assign({Node: node_1.Node, Link: node_1.Link, File: node_1.File}, props);
      var root = this.createLink();
      root.setNode(this.createNode(true));
      var self = this;
      this.StatWatcher = function(_super) {
        __extends(StatWatcher2, _super);
        function StatWatcher2() {
          return _super.call(this, self) || this;
        }
        return StatWatcher2;
      }(StatWatcher);
      var _ReadStream = FsReadStream;
      this.ReadStream = function(_super) {
        __extends(class_1, _super);
        function class_1() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return _super.apply(this, __spreadArrays([self], args)) || this;
        }
        return class_1;
      }(_ReadStream);
      var _WriteStream = FsWriteStream;
      this.WriteStream = function(_super) {
        __extends(class_2, _super);
        function class_2() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return _super.apply(this, __spreadArrays([self], args)) || this;
        }
        return class_2;
      }(_WriteStream);
      this.FSWatcher = function(_super) {
        __extends(FSWatcher2, _super);
        function FSWatcher2() {
          return _super.call(this, self) || this;
        }
        return FSWatcher2;
      }(FSWatcher);
      this.root = root;
    }
    Volume2.fromJSON = function(json, cwd2) {
      var vol = new Volume2();
      vol.fromJSON(json, cwd2);
      return vol;
    };
    Volume2.fromNestedJSON = function(json, cwd2) {
      var vol = new Volume2();
      vol.fromNestedJSON(json, cwd2);
      return vol;
    };
    Object.defineProperty(Volume2.prototype, "promises", {
      get: function() {
        if (this.promisesApi === null)
          throw new Error("Promise is not supported in this environment.");
        return this.promisesApi;
      },
      enumerable: false,
      configurable: true
    });
    Volume2.prototype.createLink = function(parent, name, isDirectory, perm) {
      if (isDirectory === void 0) {
        isDirectory = false;
      }
      if (!parent) {
        return new this.props.Link(this, null, "");
      }
      if (!name) {
        throw new Error("createLink: name cannot be empty");
      }
      return parent.createChild(name, this.createNode(isDirectory, perm));
    };
    Volume2.prototype.deleteLink = function(link) {
      var parent = link.parent;
      if (parent) {
        parent.deleteChild(link);
        return true;
      }
      return false;
    };
    Volume2.prototype.newInoNumber = function() {
      var releasedFd = this.releasedInos.pop();
      if (releasedFd)
        return releasedFd;
      else {
        this.ino = (this.ino + 1) % 4294967295;
        return this.ino;
      }
    };
    Volume2.prototype.newFdNumber = function() {
      var releasedFd = this.releasedFds.pop();
      return typeof releasedFd === "number" ? releasedFd : Volume2.fd--;
    };
    Volume2.prototype.createNode = function(isDirectory, perm) {
      if (isDirectory === void 0) {
        isDirectory = false;
      }
      var node = new this.props.Node(this.newInoNumber(), perm);
      if (isDirectory)
        node.setIsDirectory();
      this.inodes[node.ino] = node;
      return node;
    };
    Volume2.prototype.getNode = function(ino) {
      return this.inodes[ino];
    };
    Volume2.prototype.deleteNode = function(node) {
      node.del();
      delete this.inodes[node.ino];
      this.releasedInos.push(node.ino);
    };
    Volume2.prototype.genRndStr = function() {
      var str = (Math.random() + 1).toString(36).substr(2, 6);
      if (str.length === 6)
        return str;
      else
        return this.genRndStr();
    };
    Volume2.prototype.getLink = function(steps) {
      return this.root.walk(steps);
    };
    Volume2.prototype.getLinkOrThrow = function(filename, funcName) {
      var steps = filenameToSteps(filename);
      var link = this.getLink(steps);
      if (!link)
        throw createError(ENOENT, funcName, filename);
      return link;
    };
    Volume2.prototype.getResolvedLink = function(filenameOrSteps) {
      var steps = typeof filenameOrSteps === "string" ? filenameToSteps(filenameOrSteps) : filenameOrSteps;
      var link = this.root;
      var i = 0;
      while (i < steps.length) {
        var step = steps[i];
        link = link.getChild(step);
        if (!link)
          return null;
        var node = link.getNode();
        if (node.isSymlink()) {
          steps = node.symlink.concat(steps.slice(i + 1));
          link = this.root;
          i = 0;
          continue;
        }
        i++;
      }
      return link;
    };
    Volume2.prototype.getResolvedLinkOrThrow = function(filename, funcName) {
      var link = this.getResolvedLink(filename);
      if (!link)
        throw createError(ENOENT, funcName, filename);
      return link;
    };
    Volume2.prototype.resolveSymlinks = function(link) {
      return this.getResolvedLink(link.steps.slice(1));
    };
    Volume2.prototype.getLinkAsDirOrThrow = function(filename, funcName) {
      var link = this.getLinkOrThrow(filename, funcName);
      if (!link.getNode().isDirectory())
        throw createError(ENOTDIR, funcName, filename);
      return link;
    };
    Volume2.prototype.getLinkParent = function(steps) {
      return this.root.walk(steps, steps.length - 1);
    };
    Volume2.prototype.getLinkParentAsDirOrThrow = function(filenameOrSteps, funcName) {
      var steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps(filenameOrSteps);
      var link = this.getLinkParent(steps);
      if (!link)
        throw createError(ENOENT, funcName, sep + steps.join(sep));
      if (!link.getNode().isDirectory())
        throw createError(ENOTDIR, funcName, sep + steps.join(sep));
      return link;
    };
    Volume2.prototype.getFileByFd = function(fd) {
      return this.fds[String(fd)];
    };
    Volume2.prototype.getFileByFdOrThrow = function(fd, funcName) {
      if (!isFd(fd))
        throw TypeError(ERRSTR.FD);
      var file = this.getFileByFd(fd);
      if (!file)
        throw createError(EBADF, funcName);
      return file;
    };
    Volume2.prototype.getNodeByIdOrCreate = function(id, flags, perm) {
      if (typeof id === "number") {
        var file = this.getFileByFd(id);
        if (!file)
          throw Error("File nto found");
        return file.node;
      } else {
        var steps = pathToSteps(id);
        var link = this.getLink(steps);
        if (link)
          return link.getNode();
        if (flags & O_CREAT) {
          var dirLink = this.getLinkParent(steps);
          if (dirLink) {
            var name_1 = steps[steps.length - 1];
            link = this.createLink(dirLink, name_1, false, perm);
            return link.getNode();
          }
        }
        throw createError(ENOENT, "getNodeByIdOrCreate", pathToFilename(id));
      }
    };
    Volume2.prototype.wrapAsync = function(method, args, callback) {
      var _this = this;
      validateCallback(callback);
      setImmediate_1.default(function() {
        try {
          callback(null, method.apply(_this, args));
        } catch (err) {
          callback(err);
        }
      });
    };
    Volume2.prototype._toJSON = function(link, json, path6) {
      var _a2;
      if (link === void 0) {
        link = this.root;
      }
      if (json === void 0) {
        json = {};
      }
      var isEmpty = true;
      var children = link.children;
      if (link.getNode().isFile()) {
        children = (_a2 = {}, _a2[link.getName()] = link.parent.getChild(link.getName()), _a2);
        link = link.parent;
      }
      for (var name_2 in children) {
        isEmpty = false;
        var child = link.getChild(name_2);
        if (!child) {
          throw new Error("_toJSON: unexpected undefined");
        }
        var node = child.getNode();
        if (node.isFile()) {
          var filename = child.getPath();
          if (path6)
            filename = relative(path6, filename);
          json[filename] = node.getString();
        } else if (node.isDirectory()) {
          this._toJSON(child, json, path6);
        }
      }
      var dirPath = link.getPath();
      if (path6)
        dirPath = relative(path6, dirPath);
      if (dirPath && isEmpty) {
        json[dirPath] = null;
      }
      return json;
    };
    Volume2.prototype.toJSON = function(paths, json, isRelative) {
      if (json === void 0) {
        json = {};
      }
      if (isRelative === void 0) {
        isRelative = false;
      }
      var links = [];
      if (paths) {
        if (!(paths instanceof Array))
          paths = [paths];
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
          var path6 = paths_1[_i];
          var filename = pathToFilename(path6);
          var link = this.getResolvedLink(filename);
          if (!link)
            continue;
          links.push(link);
        }
      } else {
        links.push(this.root);
      }
      if (!links.length)
        return json;
      for (var _a2 = 0, links_1 = links; _a2 < links_1.length; _a2++) {
        var link = links_1[_a2];
        this._toJSON(link, json, isRelative ? link.getPath() : "");
      }
      return json;
    };
    Volume2.prototype.fromJSON = function(json, cwd2) {
      if (cwd2 === void 0) {
        cwd2 = process_1.default.cwd();
      }
      for (var filename in json) {
        var data = json[filename];
        filename = resolve2(filename, cwd2);
        if (typeof data === "string") {
          var dir = dirname(filename);
          this.mkdirpBase(dir, 511);
          this.writeFileSync(filename, data);
        } else {
          this.mkdirpBase(filename, 511);
        }
      }
    };
    Volume2.prototype.fromNestedJSON = function(json, cwd2) {
      this.fromJSON(flattenJSON(json), cwd2);
    };
    Volume2.prototype.reset = function() {
      this.ino = 0;
      this.inodes = {};
      this.releasedInos = [];
      this.fds = {};
      this.releasedFds = [];
      this.openFiles = 0;
      this.root = this.createLink();
      this.root.setNode(this.createNode(true));
    };
    Volume2.prototype.mountSync = function(mountpoint, json) {
      this.fromJSON(json, mountpoint);
    };
    Volume2.prototype.openLink = function(link, flagsNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }
      if (this.openFiles >= this.maxFiles) {
        throw createError(EMFILE, "open", link.getPath());
      }
      var realLink = link;
      if (resolveSymlinks)
        realLink = this.resolveSymlinks(link);
      if (!realLink)
        throw createError(ENOENT, "open", link.getPath());
      var node = realLink.getNode();
      if (node.isDirectory()) {
        if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY)
          throw createError(EISDIR, "open", link.getPath());
      } else {
        if (flagsNum & O_DIRECTORY)
          throw createError(ENOTDIR, "open", link.getPath());
      }
      if (!(flagsNum & O_WRONLY)) {
        if (!node.canRead()) {
          throw createError(EACCES, "open", link.getPath());
        }
      }
      if (flagsNum & O_RDWR) {
      }
      var file = new this.props.File(link, node, flagsNum, this.newFdNumber());
      this.fds[file.fd] = file;
      this.openFiles++;
      if (flagsNum & O_TRUNC)
        file.truncate();
      return file;
    };
    Volume2.prototype.openFile = function(filename, flagsNum, modeNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }
      var steps = filenameToSteps(filename);
      var link = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps);
      if (!link && flagsNum & O_CREAT) {
        var dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1));
        if (!dirLink)
          throw createError(ENOENT, "open", sep + steps.join(sep));
        if (flagsNum & O_CREAT && typeof modeNum === "number") {
          link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
        }
      }
      if (link)
        return this.openLink(link, flagsNum, resolveSymlinks);
      throw createError(ENOENT, "open", filename);
    };
    Volume2.prototype.openBase = function(filename, flagsNum, modeNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }
      var file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
      if (!file)
        throw createError(ENOENT, "open", filename);
      return file.fd;
    };
    Volume2.prototype.openSync = function(path6, flags, mode) {
      if (mode === void 0) {
        mode = 438;
      }
      var modeNum = modeToNumber(mode);
      var fileName = pathToFilename(path6);
      var flagsNum = flagsToNumber(flags);
      return this.openBase(fileName, flagsNum, modeNum);
    };
    Volume2.prototype.open = function(path6, flags, a, b) {
      var mode = a;
      var callback = b;
      if (typeof a === "function") {
        mode = 438;
        callback = a;
      }
      mode = mode || 438;
      var modeNum = modeToNumber(mode);
      var fileName = pathToFilename(path6);
      var flagsNum = flagsToNumber(flags);
      this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
    };
    Volume2.prototype.closeFile = function(file) {
      if (!this.fds[file.fd])
        return;
      this.openFiles--;
      delete this.fds[file.fd];
      this.releasedFds.push(file.fd);
    };
    Volume2.prototype.closeSync = function(fd) {
      validateFd(fd);
      var file = this.getFileByFdOrThrow(fd, "close");
      this.closeFile(file);
    };
    Volume2.prototype.close = function(fd, callback) {
      validateFd(fd);
      this.wrapAsync(this.closeSync, [fd], callback);
    };
    Volume2.prototype.openFileOrGetById = function(id, flagsNum, modeNum) {
      if (typeof id === "number") {
        var file = this.fds[id];
        if (!file)
          throw createError(ENOENT);
        return file;
      } else {
        return this.openFile(pathToFilename(id), flagsNum, modeNum);
      }
    };
    Volume2.prototype.readBase = function(fd, buffer, offset, length, position) {
      var file = this.getFileByFdOrThrow(fd);
      return file.read(buffer, Number(offset), Number(length), position);
    };
    Volume2.prototype.readSync = function(fd, buffer, offset, length, position) {
      validateFd(fd);
      return this.readBase(fd, buffer, offset, length, position);
    };
    Volume2.prototype.read = function(fd, buffer, offset, length, position, callback) {
      var _this = this;
      validateCallback(callback);
      if (length === 0) {
        return process_1.default.nextTick(function() {
          if (callback)
            callback(null, 0, buffer);
        });
      }
      setImmediate_1.default(function() {
        try {
          var bytes = _this.readBase(fd, buffer, offset, length, position);
          callback(null, bytes, buffer);
        } catch (err) {
          callback(err);
        }
      });
    };
    Volume2.prototype.readFileBase = function(id, flagsNum, encoding) {
      var result;
      var isUserFd = typeof id === "number";
      var userOwnsFd = isUserFd && isFd(id);
      var fd;
      if (userOwnsFd)
        fd = id;
      else {
        var filename = pathToFilename(id);
        var steps = filenameToSteps(filename);
        var link = this.getResolvedLink(steps);
        if (link) {
          var node = link.getNode();
          if (node.isDirectory())
            throw createError(EISDIR, "open", link.getPath());
        }
        fd = this.openSync(id, flagsNum);
      }
      try {
        result = bufferToEncoding(this.getFileByFdOrThrow(fd).getBuffer(), encoding);
      } finally {
        if (!userOwnsFd) {
          this.closeSync(fd);
        }
      }
      return result;
    };
    Volume2.prototype.readFileSync = function(file, options) {
      var opts = getReadFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      return this.readFileBase(file, flagsNum, opts.encoding);
    };
    Volume2.prototype.readFile = function(id, a, b) {
      var _a2 = optsAndCbGenerator(getReadFileOptions)(a, b), opts = _a2[0], callback = _a2[1];
      var flagsNum = flagsToNumber(opts.flag);
      this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
    };
    Volume2.prototype.writeBase = function(fd, buf, offset, length, position) {
      var file = this.getFileByFdOrThrow(fd, "write");
      return file.write(buf, offset, length, position);
    };
    Volume2.prototype.writeSync = function(fd, a, b, c, d) {
      validateFd(fd);
      var encoding;
      var offset;
      var length;
      var position;
      var isBuffer = typeof a !== "string";
      if (isBuffer) {
        offset = (b || 0) | 0;
        length = c;
        position = d;
      } else {
        position = b;
        encoding = c;
      }
      var buf = dataToBuffer(a, encoding);
      if (isBuffer) {
        if (typeof length === "undefined") {
          length = buf.length;
        }
      } else {
        offset = 0;
        length = buf.length;
      }
      return this.writeBase(fd, buf, offset, length, position);
    };
    Volume2.prototype.write = function(fd, a, b, c, d, e) {
      var _this = this;
      validateFd(fd);
      var offset;
      var length;
      var position;
      var encoding;
      var callback;
      var tipa = typeof a;
      var tipb = typeof b;
      var tipc = typeof c;
      var tipd = typeof d;
      if (tipa !== "string") {
        if (tipb === "function") {
          callback = b;
        } else if (tipc === "function") {
          offset = b | 0;
          callback = c;
        } else if (tipd === "function") {
          offset = b | 0;
          length = c;
          callback = d;
        } else {
          offset = b | 0;
          length = c;
          position = d;
          callback = e;
        }
      } else {
        if (tipb === "function") {
          callback = b;
        } else if (tipc === "function") {
          position = b;
          callback = c;
        } else if (tipd === "function") {
          position = b;
          encoding = c;
          callback = d;
        }
      }
      var buf = dataToBuffer(a, encoding);
      if (tipa !== "string") {
        if (typeof length === "undefined")
          length = buf.length;
      } else {
        offset = 0;
        length = buf.length;
      }
      var cb = validateCallback(callback);
      setImmediate_1.default(function() {
        try {
          var bytes = _this.writeBase(fd, buf, offset, length, position);
          if (tipa !== "string") {
            cb(null, bytes, buf);
          } else {
            cb(null, bytes, a);
          }
        } catch (err) {
          cb(err);
        }
      });
    };
    Volume2.prototype.writeFileBase = function(id, buf, flagsNum, modeNum) {
      var isUserFd = typeof id === "number";
      var fd;
      if (isUserFd)
        fd = id;
      else {
        fd = this.openBase(pathToFilename(id), flagsNum, modeNum);
      }
      var offset = 0;
      var length = buf.length;
      var position = flagsNum & O_APPEND ? void 0 : 0;
      try {
        while (length > 0) {
          var written = this.writeSync(fd, buf, offset, length, position);
          offset += written;
          length -= written;
          if (position !== void 0)
            position += written;
        }
      } finally {
        if (!isUserFd)
          this.closeSync(fd);
      }
    };
    Volume2.prototype.writeFileSync = function(id, data, options) {
      var opts = getWriteFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      var modeNum = modeToNumber(opts.mode);
      var buf = dataToBuffer(data, opts.encoding);
      this.writeFileBase(id, buf, flagsNum, modeNum);
    };
    Volume2.prototype.writeFile = function(id, data, a, b) {
      var options = a;
      var callback = b;
      if (typeof a === "function") {
        options = writeFileDefaults;
        callback = a;
      }
      var cb = validateCallback(callback);
      var opts = getWriteFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      var modeNum = modeToNumber(opts.mode);
      var buf = dataToBuffer(data, opts.encoding);
      this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
    };
    Volume2.prototype.linkBase = function(filename1, filename2) {
      var steps1 = filenameToSteps(filename1);
      var link1 = this.getLink(steps1);
      if (!link1)
        throw createError(ENOENT, "link", filename1, filename2);
      var steps2 = filenameToSteps(filename2);
      var dir2 = this.getLinkParent(steps2);
      if (!dir2)
        throw createError(ENOENT, "link", filename1, filename2);
      var name = steps2[steps2.length - 1];
      if (dir2.getChild(name))
        throw createError(EEXIST, "link", filename1, filename2);
      var node = link1.getNode();
      node.nlink++;
      dir2.createChild(name, node);
    };
    Volume2.prototype.copyFileBase = function(src, dest, flags) {
      var buf = this.readFileSync(src);
      if (flags & COPYFILE_EXCL) {
        if (this.existsSync(dest)) {
          throw createError(EEXIST, "copyFile", src, dest);
        }
      }
      if (flags & COPYFILE_FICLONE_FORCE) {
        throw createError(ENOSYS, "copyFile", src, dest);
      }
      this.writeFileBase(dest, buf, FLAGS.w, 438);
    };
    Volume2.prototype.copyFileSync = function(src, dest, flags) {
      var srcFilename = pathToFilename(src);
      var destFilename = pathToFilename(dest);
      return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
    };
    Volume2.prototype.copyFile = function(src, dest, a, b) {
      var srcFilename = pathToFilename(src);
      var destFilename = pathToFilename(dest);
      var flags;
      var callback;
      if (typeof a === "function") {
        flags = 0;
        callback = a;
      } else {
        flags = a;
        callback = b;
      }
      validateCallback(callback);
      this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
    };
    Volume2.prototype.linkSync = function(existingPath, newPath) {
      var existingPathFilename = pathToFilename(existingPath);
      var newPathFilename = pathToFilename(newPath);
      this.linkBase(existingPathFilename, newPathFilename);
    };
    Volume2.prototype.link = function(existingPath, newPath, callback) {
      var existingPathFilename = pathToFilename(existingPath);
      var newPathFilename = pathToFilename(newPath);
      this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
    };
    Volume2.prototype.unlinkBase = function(filename) {
      var steps = filenameToSteps(filename);
      var link = this.getLink(steps);
      if (!link)
        throw createError(ENOENT, "unlink", filename);
      if (link.length)
        throw Error("Dir not empty...");
      this.deleteLink(link);
      var node = link.getNode();
      node.nlink--;
      if (node.nlink <= 0) {
        this.deleteNode(node);
      }
    };
    Volume2.prototype.unlinkSync = function(path6) {
      var filename = pathToFilename(path6);
      this.unlinkBase(filename);
    };
    Volume2.prototype.unlink = function(path6, callback) {
      var filename = pathToFilename(path6);
      this.wrapAsync(this.unlinkBase, [filename], callback);
    };
    Volume2.prototype.symlinkBase = function(targetFilename, pathFilename) {
      var pathSteps = filenameToSteps(pathFilename);
      var dirLink = this.getLinkParent(pathSteps);
      if (!dirLink)
        throw createError(ENOENT, "symlink", targetFilename, pathFilename);
      var name = pathSteps[pathSteps.length - 1];
      if (dirLink.getChild(name))
        throw createError(EEXIST, "symlink", targetFilename, pathFilename);
      var symlink = dirLink.createChild(name);
      symlink.getNode().makeSymlink(filenameToSteps(targetFilename));
      return symlink;
    };
    Volume2.prototype.symlinkSync = function(target, path6, type) {
      var targetFilename = pathToFilename(target);
      var pathFilename = pathToFilename(path6);
      this.symlinkBase(targetFilename, pathFilename);
    };
    Volume2.prototype.symlink = function(target, path6, a, b) {
      var callback = validateCallback(typeof a === "function" ? a : b);
      var targetFilename = pathToFilename(target);
      var pathFilename = pathToFilename(path6);
      this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
    };
    Volume2.prototype.realpathBase = function(filename, encoding) {
      var steps = filenameToSteps(filename);
      var realLink = this.getResolvedLink(steps);
      if (!realLink)
        throw createError(ENOENT, "realpath", filename);
      return encoding_1.strToEncoding(realLink.getPath(), encoding);
    };
    Volume2.prototype.realpathSync = function(path6, options) {
      return this.realpathBase(pathToFilename(path6), getRealpathOptions(options).encoding);
    };
    Volume2.prototype.realpath = function(path6, a, b) {
      var _a2 = getRealpathOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      var pathFilename = pathToFilename(path6);
      this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
    };
    Volume2.prototype.lstatBase = function(filename, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }
      var link = this.getLink(filenameToSteps(filename));
      if (!link)
        throw createError(ENOENT, "lstat", filename);
      return Stats_1.default.build(link.getNode(), bigint);
    };
    Volume2.prototype.lstatSync = function(path6, options) {
      return this.lstatBase(pathToFilename(path6), getStatOptions(options).bigint);
    };
    Volume2.prototype.lstat = function(path6, a, b) {
      var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      this.wrapAsync(this.lstatBase, [pathToFilename(path6), opts.bigint], callback);
    };
    Volume2.prototype.statBase = function(filename, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }
      var link = this.getResolvedLink(filenameToSteps(filename));
      if (!link)
        throw createError(ENOENT, "stat", filename);
      return Stats_1.default.build(link.getNode(), bigint);
    };
    Volume2.prototype.statSync = function(path6, options) {
      return this.statBase(pathToFilename(path6), getStatOptions(options).bigint);
    };
    Volume2.prototype.stat = function(path6, a, b) {
      var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      this.wrapAsync(this.statBase, [pathToFilename(path6), opts.bigint], callback);
    };
    Volume2.prototype.fstatBase = function(fd, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }
      var file = this.getFileByFd(fd);
      if (!file)
        throw createError(EBADF, "fstat");
      return Stats_1.default.build(file.node, bigint);
    };
    Volume2.prototype.fstatSync = function(fd, options) {
      return this.fstatBase(fd, getStatOptions(options).bigint);
    };
    Volume2.prototype.fstat = function(fd, a, b) {
      var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      this.wrapAsync(this.fstatBase, [fd, opts.bigint], callback);
    };
    Volume2.prototype.renameBase = function(oldPathFilename, newPathFilename) {
      var link = this.getLink(filenameToSteps(oldPathFilename));
      if (!link)
        throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
      var newPathSteps = filenameToSteps(newPathFilename);
      var newPathDirLink = this.getLinkParent(newPathSteps);
      if (!newPathDirLink)
        throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
      var oldLinkParent = link.parent;
      if (oldLinkParent) {
        oldLinkParent.deleteChild(link);
      }
      var name = newPathSteps[newPathSteps.length - 1];
      link.steps = __spreadArrays(newPathDirLink.steps, [name]);
      newPathDirLink.setChild(link.getName(), link);
    };
    Volume2.prototype.renameSync = function(oldPath, newPath) {
      var oldPathFilename = pathToFilename(oldPath);
      var newPathFilename = pathToFilename(newPath);
      this.renameBase(oldPathFilename, newPathFilename);
    };
    Volume2.prototype.rename = function(oldPath, newPath, callback) {
      var oldPathFilename = pathToFilename(oldPath);
      var newPathFilename = pathToFilename(newPath);
      this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
    };
    Volume2.prototype.existsBase = function(filename) {
      return !!this.statBase(filename);
    };
    Volume2.prototype.existsSync = function(path6) {
      try {
        return this.existsBase(pathToFilename(path6));
      } catch (err) {
        return false;
      }
    };
    Volume2.prototype.exists = function(path6, callback) {
      var _this = this;
      var filename = pathToFilename(path6);
      if (typeof callback !== "function")
        throw Error(ERRSTR.CB);
      setImmediate_1.default(function() {
        try {
          callback(_this.existsBase(filename));
        } catch (err) {
          callback(false);
        }
      });
    };
    Volume2.prototype.accessBase = function(filename, mode) {
      var link = this.getLinkOrThrow(filename, "access");
    };
    Volume2.prototype.accessSync = function(path6, mode) {
      if (mode === void 0) {
        mode = F_OK;
      }
      var filename = pathToFilename(path6);
      mode = mode | 0;
      this.accessBase(filename, mode);
    };
    Volume2.prototype.access = function(path6, a, b) {
      var mode = F_OK;
      var callback;
      if (typeof a !== "function") {
        mode = a | 0;
        callback = validateCallback(b);
      } else {
        callback = a;
      }
      var filename = pathToFilename(path6);
      this.wrapAsync(this.accessBase, [filename, mode], callback);
    };
    Volume2.prototype.appendFileSync = function(id, data, options) {
      if (options === void 0) {
        options = appendFileDefaults;
      }
      var opts = getAppendFileOpts(options);
      if (!opts.flag || isFd(id))
        opts.flag = "a";
      this.writeFileSync(id, data, opts);
    };
    Volume2.prototype.appendFile = function(id, data, a, b) {
      var _a2 = getAppendFileOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      if (!opts.flag || isFd(id))
        opts.flag = "a";
      this.writeFile(id, data, opts, callback);
    };
    Volume2.prototype.readdirBase = function(filename, options) {
      var steps = filenameToSteps(filename);
      var link = this.getResolvedLink(steps);
      if (!link)
        throw createError(ENOENT, "readdir", filename);
      var node = link.getNode();
      if (!node.isDirectory())
        throw createError(ENOTDIR, "scandir", filename);
      if (options.withFileTypes) {
        var list_1 = [];
        for (var name_3 in link.children) {
          var child = link.getChild(name_3);
          if (!child) {
            continue;
          }
          list_1.push(Dirent_1.default.build(child, options.encoding));
        }
        if (!isWin && options.encoding !== "buffer")
          list_1.sort(function(a, b) {
            if (a.name < b.name)
              return -1;
            if (a.name > b.name)
              return 1;
            return 0;
          });
        return list_1;
      }
      var list = [];
      for (var name_4 in link.children) {
        list.push(encoding_1.strToEncoding(name_4, options.encoding));
      }
      if (!isWin && options.encoding !== "buffer")
        list.sort();
      return list;
    };
    Volume2.prototype.readdirSync = function(path6, options) {
      var opts = getReaddirOptions(options);
      var filename = pathToFilename(path6);
      return this.readdirBase(filename, opts);
    };
    Volume2.prototype.readdir = function(path6, a, b) {
      var _a2 = getReaddirOptsAndCb(a, b), options = _a2[0], callback = _a2[1];
      var filename = pathToFilename(path6);
      this.wrapAsync(this.readdirBase, [filename, options], callback);
    };
    Volume2.prototype.readlinkBase = function(filename, encoding) {
      var link = this.getLinkOrThrow(filename, "readlink");
      var node = link.getNode();
      if (!node.isSymlink())
        throw createError(EINVAL, "readlink", filename);
      var str = sep + node.symlink.join(sep);
      return encoding_1.strToEncoding(str, encoding);
    };
    Volume2.prototype.readlinkSync = function(path6, options) {
      var opts = getDefaultOpts(options);
      var filename = pathToFilename(path6);
      return this.readlinkBase(filename, opts.encoding);
    };
    Volume2.prototype.readlink = function(path6, a, b) {
      var _a2 = getDefaultOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
      var filename = pathToFilename(path6);
      this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
    };
    Volume2.prototype.fsyncBase = function(fd) {
      this.getFileByFdOrThrow(fd, "fsync");
    };
    Volume2.prototype.fsyncSync = function(fd) {
      this.fsyncBase(fd);
    };
    Volume2.prototype.fsync = function(fd, callback) {
      this.wrapAsync(this.fsyncBase, [fd], callback);
    };
    Volume2.prototype.fdatasyncBase = function(fd) {
      this.getFileByFdOrThrow(fd, "fdatasync");
    };
    Volume2.prototype.fdatasyncSync = function(fd) {
      this.fdatasyncBase(fd);
    };
    Volume2.prototype.fdatasync = function(fd, callback) {
      this.wrapAsync(this.fdatasyncBase, [fd], callback);
    };
    Volume2.prototype.ftruncateBase = function(fd, len) {
      var file = this.getFileByFdOrThrow(fd, "ftruncate");
      file.truncate(len);
    };
    Volume2.prototype.ftruncateSync = function(fd, len) {
      this.ftruncateBase(fd, len);
    };
    Volume2.prototype.ftruncate = function(fd, a, b) {
      var len = typeof a === "number" ? a : 0;
      var callback = validateCallback(typeof a === "number" ? b : a);
      this.wrapAsync(this.ftruncateBase, [fd, len], callback);
    };
    Volume2.prototype.truncateBase = function(path6, len) {
      var fd = this.openSync(path6, "r+");
      try {
        this.ftruncateSync(fd, len);
      } finally {
        this.closeSync(fd);
      }
    };
    Volume2.prototype.truncateSync = function(id, len) {
      if (isFd(id))
        return this.ftruncateSync(id, len);
      this.truncateBase(id, len);
    };
    Volume2.prototype.truncate = function(id, a, b) {
      var len = typeof a === "number" ? a : 0;
      var callback = validateCallback(typeof a === "number" ? b : a);
      if (isFd(id))
        return this.ftruncate(id, len, callback);
      this.wrapAsync(this.truncateBase, [id, len], callback);
    };
    Volume2.prototype.futimesBase = function(fd, atime, mtime) {
      var file = this.getFileByFdOrThrow(fd, "futimes");
      var node = file.node;
      node.atime = new Date(atime * 1e3);
      node.mtime = new Date(mtime * 1e3);
    };
    Volume2.prototype.futimesSync = function(fd, atime, mtime) {
      this.futimesBase(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };
    Volume2.prototype.futimes = function(fd, atime, mtime, callback) {
      this.wrapAsync(this.futimesBase, [fd, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };
    Volume2.prototype.utimesBase = function(filename, atime, mtime) {
      var fd = this.openSync(filename, "r+");
      try {
        this.futimesBase(fd, atime, mtime);
      } finally {
        this.closeSync(fd);
      }
    };
    Volume2.prototype.utimesSync = function(path6, atime, mtime) {
      this.utimesBase(pathToFilename(path6), toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };
    Volume2.prototype.utimes = function(path6, atime, mtime, callback) {
      this.wrapAsync(this.utimesBase, [pathToFilename(path6), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };
    Volume2.prototype.mkdirBase = function(filename, modeNum) {
      var steps = filenameToSteps(filename);
      if (!steps.length) {
        throw createError(EEXIST, "mkdir", filename);
      }
      var dir = this.getLinkParentAsDirOrThrow(filename, "mkdir");
      var name = steps[steps.length - 1];
      if (dir.getChild(name))
        throw createError(EEXIST, "mkdir", filename);
      dir.createChild(name, this.createNode(true, modeNum));
    };
    Volume2.prototype.mkdirpBase = function(filename, modeNum) {
      var steps = filenameToSteps(filename);
      var link = this.root;
      for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        if (!link.getNode().isDirectory())
          throw createError(ENOTDIR, "mkdir", link.getPath());
        var child = link.getChild(step);
        if (child) {
          if (child.getNode().isDirectory())
            link = child;
          else
            throw createError(ENOTDIR, "mkdir", child.getPath());
        } else {
          link = link.createChild(step, this.createNode(true, modeNum));
        }
      }
    };
    Volume2.prototype.mkdirSync = function(path6, options) {
      var opts = getMkdirOptions(options);
      var modeNum = modeToNumber(opts.mode, 511);
      var filename = pathToFilename(path6);
      if (opts.recursive)
        this.mkdirpBase(filename, modeNum);
      else
        this.mkdirBase(filename, modeNum);
    };
    Volume2.prototype.mkdir = function(path6, a, b) {
      var opts = getMkdirOptions(a);
      var callback = validateCallback(typeof a === "function" ? a : b);
      var modeNum = modeToNumber(opts.mode, 511);
      var filename = pathToFilename(path6);
      if (opts.recursive)
        this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);
      else
        this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
    };
    Volume2.prototype.mkdirpSync = function(path6, mode) {
      this.mkdirSync(path6, {mode, recursive: true});
    };
    Volume2.prototype.mkdirp = function(path6, a, b) {
      var mode = typeof a === "function" ? void 0 : a;
      var callback = validateCallback(typeof a === "function" ? a : b);
      this.mkdir(path6, {mode, recursive: true}, callback);
    };
    Volume2.prototype.mkdtempBase = function(prefix, encoding, retry) {
      if (retry === void 0) {
        retry = 5;
      }
      var filename = prefix + this.genRndStr();
      try {
        this.mkdirBase(filename, 511);
        return encoding_1.strToEncoding(filename, encoding);
      } catch (err) {
        if (err.code === EEXIST) {
          if (retry > 1)
            return this.mkdtempBase(prefix, encoding, retry - 1);
          else
            throw Error("Could not create temp dir.");
        } else
          throw err;
      }
    };
    Volume2.prototype.mkdtempSync = function(prefix, options) {
      var encoding = getDefaultOpts(options).encoding;
      if (!prefix || typeof prefix !== "string")
        throw new TypeError("filename prefix is required");
      nullCheck(prefix);
      return this.mkdtempBase(prefix, encoding);
    };
    Volume2.prototype.mkdtemp = function(prefix, a, b) {
      var _a2 = getDefaultOptsAndCb(a, b), encoding = _a2[0].encoding, callback = _a2[1];
      if (!prefix || typeof prefix !== "string")
        throw new TypeError("filename prefix is required");
      if (!nullCheck(prefix))
        return;
      this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
    };
    Volume2.prototype.rmdirBase = function(filename, options) {
      var opts = getRmdirOptions(options);
      var link = this.getLinkAsDirOrThrow(filename, "rmdir");
      if (link.length && !opts.recursive)
        throw createError(ENOTEMPTY, "rmdir", filename);
      this.deleteLink(link);
    };
    Volume2.prototype.rmdirSync = function(path6, options) {
      this.rmdirBase(pathToFilename(path6), options);
    };
    Volume2.prototype.rmdir = function(path6, a, b) {
      var opts = getRmdirOptions(a);
      var callback = validateCallback(typeof a === "function" ? a : b);
      this.wrapAsync(this.rmdirBase, [pathToFilename(path6), opts], callback);
    };
    Volume2.prototype.fchmodBase = function(fd, modeNum) {
      var file = this.getFileByFdOrThrow(fd, "fchmod");
      file.chmod(modeNum);
    };
    Volume2.prototype.fchmodSync = function(fd, mode) {
      this.fchmodBase(fd, modeToNumber(mode));
    };
    Volume2.prototype.fchmod = function(fd, mode, callback) {
      this.wrapAsync(this.fchmodBase, [fd, modeToNumber(mode)], callback);
    };
    Volume2.prototype.chmodBase = function(filename, modeNum) {
      var fd = this.openSync(filename, "r+");
      try {
        this.fchmodBase(fd, modeNum);
      } finally {
        this.closeSync(fd);
      }
    };
    Volume2.prototype.chmodSync = function(path6, mode) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path6);
      this.chmodBase(filename, modeNum);
    };
    Volume2.prototype.chmod = function(path6, mode, callback) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path6);
      this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
    };
    Volume2.prototype.lchmodBase = function(filename, modeNum) {
      var fd = this.openBase(filename, O_RDWR, 0, false);
      try {
        this.fchmodBase(fd, modeNum);
      } finally {
        this.closeSync(fd);
      }
    };
    Volume2.prototype.lchmodSync = function(path6, mode) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path6);
      this.lchmodBase(filename, modeNum);
    };
    Volume2.prototype.lchmod = function(path6, mode, callback) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path6);
      this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
    };
    Volume2.prototype.fchownBase = function(fd, uid, gid) {
      this.getFileByFdOrThrow(fd, "fchown").chown(uid, gid);
    };
    Volume2.prototype.fchownSync = function(fd, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.fchownBase(fd, uid, gid);
    };
    Volume2.prototype.fchown = function(fd, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.fchownBase, [fd, uid, gid], callback);
    };
    Volume2.prototype.chownBase = function(filename, uid, gid) {
      var link = this.getResolvedLinkOrThrow(filename, "chown");
      var node = link.getNode();
      node.chown(uid, gid);
    };
    Volume2.prototype.chownSync = function(path6, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.chownBase(pathToFilename(path6), uid, gid);
    };
    Volume2.prototype.chown = function(path6, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.chownBase, [pathToFilename(path6), uid, gid], callback);
    };
    Volume2.prototype.lchownBase = function(filename, uid, gid) {
      this.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
    };
    Volume2.prototype.lchownSync = function(path6, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.lchownBase(pathToFilename(path6), uid, gid);
    };
    Volume2.prototype.lchown = function(path6, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.lchownBase, [pathToFilename(path6), uid, gid], callback);
    };
    Volume2.prototype.watchFile = function(path6, a, b) {
      var filename = pathToFilename(path6);
      var options = a;
      var listener = b;
      if (typeof options === "function") {
        listener = a;
        options = null;
      }
      if (typeof listener !== "function") {
        throw Error('"watchFile()" requires a listener function');
      }
      var interval = 5007;
      var persistent = true;
      if (options && typeof options === "object") {
        if (typeof options.interval === "number")
          interval = options.interval;
        if (typeof options.persistent === "boolean")
          persistent = options.persistent;
      }
      var watcher = this.statWatchers[filename];
      if (!watcher) {
        watcher = new this.StatWatcher();
        watcher.start(filename, persistent, interval);
        this.statWatchers[filename] = watcher;
      }
      watcher.addListener("change", listener);
      return watcher;
    };
    Volume2.prototype.unwatchFile = function(path6, listener) {
      var filename = pathToFilename(path6);
      var watcher = this.statWatchers[filename];
      if (!watcher)
        return;
      if (typeof listener === "function") {
        watcher.removeListener("change", listener);
      } else {
        watcher.removeAllListeners("change");
      }
      if (watcher.listenerCount("change") === 0) {
        watcher.stop();
        delete this.statWatchers[filename];
      }
    };
    Volume2.prototype.createReadStream = function(path6, options) {
      return new this.ReadStream(path6, options);
    };
    Volume2.prototype.createWriteStream = function(path6, options) {
      return new this.WriteStream(path6, options);
    };
    Volume2.prototype.watch = function(path6, options, listener) {
      var filename = pathToFilename(path6);
      var givenOptions = options;
      if (typeof options === "function") {
        listener = options;
        givenOptions = null;
      }
      var _a2 = getDefaultOpts(givenOptions), persistent = _a2.persistent, recursive = _a2.recursive, encoding = _a2.encoding;
      if (persistent === void 0)
        persistent = true;
      if (recursive === void 0)
        recursive = false;
      var watcher = new this.FSWatcher();
      watcher.start(filename, persistent, recursive, encoding);
      if (listener) {
        watcher.addListener("change", listener);
      }
      return watcher;
    };
    Volume2.fd = 2147483647;
    return Volume2;
  }();
  exports.Volume = Volume;
  function emitStop(self) {
    self.emit("stop");
  }
  var StatWatcher = function(_super) {
    __extends(StatWatcher2, _super);
    function StatWatcher2(vol) {
      var _this = _super.call(this) || this;
      _this.onInterval = function() {
        try {
          var stats = _this.vol.statSync(_this.filename);
          if (_this.hasChanged(stats)) {
            _this.emit("change", stats, _this.prev);
            _this.prev = stats;
          }
        } finally {
          _this.loop();
        }
      };
      _this.vol = vol;
      return _this;
    }
    StatWatcher2.prototype.loop = function() {
      this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
    };
    StatWatcher2.prototype.hasChanged = function(stats) {
      if (stats.mtimeMs > this.prev.mtimeMs)
        return true;
      if (stats.nlink !== this.prev.nlink)
        return true;
      return false;
    };
    StatWatcher2.prototype.start = function(path6, persistent, interval) {
      if (persistent === void 0) {
        persistent = true;
      }
      if (interval === void 0) {
        interval = 5007;
      }
      this.filename = pathToFilename(path6);
      this.setTimeout = persistent ? setTimeout : setTimeoutUnref_1.default;
      this.interval = interval;
      this.prev = this.vol.statSync(this.filename);
      this.loop();
    };
    StatWatcher2.prototype.stop = function() {
      clearTimeout(this.timeoutRef);
      process_1.default.nextTick(emitStop, this);
    };
    return StatWatcher2;
  }(events_1.EventEmitter);
  exports.StatWatcher = StatWatcher;
  var pool;
  function allocNewPool(poolSize) {
    pool = buffer_1.bufferAllocUnsafe(poolSize);
    pool.used = 0;
  }
  util.inherits(FsReadStream, stream_1.Readable);
  exports.ReadStream = FsReadStream;
  function FsReadStream(vol, path6, options) {
    if (!(this instanceof FsReadStream))
      return new FsReadStream(vol, path6, options);
    this._vol = vol;
    options = Object.assign({}, getOptions(options, {}));
    if (options.highWaterMark === void 0)
      options.highWaterMark = 64 * 1024;
    stream_1.Readable.call(this, options);
    this.path = pathToFilename(path6);
    this.fd = options.fd === void 0 ? null : options.fd;
    this.flags = options.flags === void 0 ? "r" : options.flags;
    this.mode = options.mode === void 0 ? 438 : options.mode;
    this.start = options.start;
    this.end = options.end;
    this.autoClose = options.autoClose === void 0 ? true : options.autoClose;
    this.pos = void 0;
    this.bytesRead = 0;
    if (this.start !== void 0) {
      if (typeof this.start !== "number") {
        throw new TypeError('"start" option must be a Number');
      }
      if (this.end === void 0) {
        this.end = Infinity;
      } else if (typeof this.end !== "number") {
        throw new TypeError('"end" option must be a Number');
      }
      if (this.start > this.end) {
        throw new Error('"start" option must be <= "end" option');
      }
      this.pos = this.start;
    }
    if (typeof this.fd !== "number")
      this.open();
    this.on("end", function() {
      if (this.autoClose) {
        if (this.destroy)
          this.destroy();
      }
    });
  }
  FsReadStream.prototype.open = function() {
    var self = this;
    this._vol.open(this.path, this.flags, this.mode, function(er, fd) {
      if (er) {
        if (self.autoClose) {
          if (self.destroy)
            self.destroy();
        }
        self.emit("error", er);
        return;
      }
      self.fd = fd;
      self.emit("open", fd);
      self.read();
    });
  };
  FsReadStream.prototype._read = function(n) {
    if (typeof this.fd !== "number") {
      return this.once("open", function() {
        this._read(n);
      });
    }
    if (this.destroyed)
      return;
    if (!pool || pool.length - pool.used < kMinPoolSpace) {
      allocNewPool(this._readableState.highWaterMark);
    }
    var thisPool = pool;
    var toRead = Math.min(pool.length - pool.used, n);
    var start = pool.used;
    if (this.pos !== void 0)
      toRead = Math.min(this.end - this.pos + 1, toRead);
    if (toRead <= 0)
      return this.push(null);
    var self = this;
    this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
    if (this.pos !== void 0)
      this.pos += toRead;
    pool.used += toRead;
    function onread(er, bytesRead) {
      if (er) {
        if (self.autoClose && self.destroy) {
          self.destroy();
        }
        self.emit("error", er);
      } else {
        var b = null;
        if (bytesRead > 0) {
          self.bytesRead += bytesRead;
          b = thisPool.slice(start, start + bytesRead);
        }
        self.push(b);
      }
    }
  };
  FsReadStream.prototype._destroy = function(err, cb) {
    this.close(function(err2) {
      cb(err || err2);
    });
  };
  FsReadStream.prototype.close = function(cb) {
    var _this = this;
    if (cb)
      this.once("close", cb);
    if (this.closed || typeof this.fd !== "number") {
      if (typeof this.fd !== "number") {
        this.once("open", closeOnOpen);
        return;
      }
      return process_1.default.nextTick(function() {
        return _this.emit("close");
      });
    }
    this.closed = true;
    this._vol.close(this.fd, function(er) {
      if (er)
        _this.emit("error", er);
      else
        _this.emit("close");
    });
    this.fd = null;
  };
  function closeOnOpen(fd) {
    this.close();
  }
  util.inherits(FsWriteStream, stream_1.Writable);
  exports.WriteStream = FsWriteStream;
  function FsWriteStream(vol, path6, options) {
    if (!(this instanceof FsWriteStream))
      return new FsWriteStream(vol, path6, options);
    this._vol = vol;
    options = Object.assign({}, getOptions(options, {}));
    stream_1.Writable.call(this, options);
    this.path = pathToFilename(path6);
    this.fd = options.fd === void 0 ? null : options.fd;
    this.flags = options.flags === void 0 ? "w" : options.flags;
    this.mode = options.mode === void 0 ? 438 : options.mode;
    this.start = options.start;
    this.autoClose = options.autoClose === void 0 ? true : !!options.autoClose;
    this.pos = void 0;
    this.bytesWritten = 0;
    if (this.start !== void 0) {
      if (typeof this.start !== "number") {
        throw new TypeError('"start" option must be a Number');
      }
      if (this.start < 0) {
        throw new Error('"start" must be >= zero');
      }
      this.pos = this.start;
    }
    if (options.encoding)
      this.setDefaultEncoding(options.encoding);
    if (typeof this.fd !== "number")
      this.open();
    this.once("finish", function() {
      if (this.autoClose) {
        this.close();
      }
    });
  }
  FsWriteStream.prototype.open = function() {
    this._vol.open(this.path, this.flags, this.mode, function(er, fd) {
      if (er) {
        if (this.autoClose && this.destroy) {
          this.destroy();
        }
        this.emit("error", er);
        return;
      }
      this.fd = fd;
      this.emit("open", fd);
    }.bind(this));
  };
  FsWriteStream.prototype._write = function(data, encoding, cb) {
    if (!(data instanceof buffer_1.Buffer))
      return this.emit("error", new Error("Invalid data"));
    if (typeof this.fd !== "number") {
      return this.once("open", function() {
        this._write(data, encoding, cb);
      });
    }
    var self = this;
    this._vol.write(this.fd, data, 0, data.length, this.pos, function(er, bytes) {
      if (er) {
        if (self.autoClose && self.destroy) {
          self.destroy();
        }
        return cb(er);
      }
      self.bytesWritten += bytes;
      cb();
    });
    if (this.pos !== void 0)
      this.pos += data.length;
  };
  FsWriteStream.prototype._writev = function(data, cb) {
    if (typeof this.fd !== "number") {
      return this.once("open", function() {
        this._writev(data, cb);
      });
    }
    var self = this;
    var len = data.length;
    var chunks = new Array(len);
    var size = 0;
    for (var i = 0; i < len; i++) {
      var chunk = data[i].chunk;
      chunks[i] = chunk;
      size += chunk.length;
    }
    var buf = buffer_1.Buffer.concat(chunks);
    this._vol.write(this.fd, buf, 0, buf.length, this.pos, function(er, bytes) {
      if (er) {
        if (self.destroy)
          self.destroy();
        return cb(er);
      }
      self.bytesWritten += bytes;
      cb();
    });
    if (this.pos !== void 0)
      this.pos += size;
  };
  FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
  FsWriteStream.prototype.close = FsReadStream.prototype.close;
  FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
  var FSWatcher = function(_super) {
    __extends(FSWatcher2, _super);
    function FSWatcher2(vol) {
      var _this = _super.call(this) || this;
      _this._filename = "";
      _this._filenameEncoded = "";
      _this._recursive = false;
      _this._encoding = encoding_1.ENCODING_UTF8;
      _this._onNodeChange = function() {
        _this._emit("change");
      };
      _this._onParentChild = function(link) {
        if (link.getName() === _this._getName()) {
          _this._emit("rename");
        }
      };
      _this._emit = function(type) {
        _this.emit("change", type, _this._filenameEncoded);
      };
      _this._persist = function() {
        _this._timer = setTimeout(_this._persist, 1e6);
      };
      _this._vol = vol;
      return _this;
    }
    FSWatcher2.prototype._getName = function() {
      return this._steps[this._steps.length - 1];
    };
    FSWatcher2.prototype.start = function(path6, persistent, recursive, encoding) {
      if (persistent === void 0) {
        persistent = true;
      }
      if (recursive === void 0) {
        recursive = false;
      }
      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }
      this._filename = pathToFilename(path6);
      this._steps = filenameToSteps(this._filename);
      this._filenameEncoded = encoding_1.strToEncoding(this._filename);
      this._recursive = recursive;
      this._encoding = encoding;
      try {
        this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
      } catch (err) {
        var error = new Error("watch " + this._filename + " " + err.code);
        error.code = err.code;
        error.errno = err.code;
        throw error;
      }
      this._link.getNode().on("change", this._onNodeChange);
      this._link.on("child:add", this._onNodeChange);
      this._link.on("child:delete", this._onNodeChange);
      var parent = this._link.parent;
      if (parent) {
        parent.setMaxListeners(parent.getMaxListeners() + 1);
        parent.on("child:delete", this._onParentChild);
      }
      if (persistent)
        this._persist();
    };
    FSWatcher2.prototype.close = function() {
      clearTimeout(this._timer);
      this._link.getNode().removeListener("change", this._onNodeChange);
      var parent = this._link.parent;
      if (parent) {
        parent.removeListener("child:delete", this._onParentChild);
      }
    };
    return FSWatcher2;
  }(events_1.EventEmitter);
  exports.FSWatcher = FSWatcher;
});

// ../../node_modules/.pnpm/fs-monkey@1.0.1/node_modules/fs-monkey/lib/util/lists.js
var require_lists = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var fsProps = exports.fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
  var fsSyncMethods = exports.fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "createReadStream", "createWriteStream"];
  var fsAsyncMethods = exports.fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "watchFile", "unwatchFile", "watch"];
});

// ../../node_modules/.pnpm/memfs@3.2.0/node_modules/memfs/lib/index.js
var require_lib = __commonJS((exports, module) => {
  "use strict";
  var __assign = exports && exports.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.fs = exports.createFsFromVolume = exports.vol = exports.Volume = void 0;
  var Stats_1 = require_Stats();
  var Dirent_1 = require_Dirent();
  var volume_1 = require_volume();
  var _a = require_lists();
  var fsSyncMethods = _a.fsSyncMethods;
  var fsAsyncMethods = _a.fsAsyncMethods;
  var constants_1 = require_constants();
  var F_OK = constants_1.constants.F_OK;
  var R_OK = constants_1.constants.R_OK;
  var W_OK = constants_1.constants.W_OK;
  var X_OK = constants_1.constants.X_OK;
  exports.Volume = volume_1.Volume;
  exports.vol = new volume_1.Volume();
  function createFsFromVolume(vol) {
    var fs3 = {F_OK, R_OK, W_OK, X_OK, constants: constants_1.constants, Stats: Stats_1.default, Dirent: Dirent_1.default};
    for (var _i = 0, fsSyncMethods_1 = fsSyncMethods; _i < fsSyncMethods_1.length; _i++) {
      var method = fsSyncMethods_1[_i];
      if (typeof vol[method] === "function")
        fs3[method] = vol[method].bind(vol);
    }
    for (var _a2 = 0, fsAsyncMethods_1 = fsAsyncMethods; _a2 < fsAsyncMethods_1.length; _a2++) {
      var method = fsAsyncMethods_1[_a2];
      if (typeof vol[method] === "function")
        fs3[method] = vol[method].bind(vol);
    }
    fs3.StatWatcher = vol.StatWatcher;
    fs3.FSWatcher = vol.FSWatcher;
    fs3.WriteStream = vol.WriteStream;
    fs3.ReadStream = vol.ReadStream;
    fs3.promises = vol.promises;
    fs3._toUnixTimestamp = volume_1.toUnixTimestamp;
    return fs3;
  }
  exports.createFsFromVolume = createFsFromVolume;
  exports.fs = createFsFromVolume(exports.vol);
  module.exports = __assign(__assign({}, module.exports), exports.fs);
  module.exports.semantic = true;
});

// external:chokidar
var require_chokidar = __commonJS((exports, module) => {
  module.exports = chokidar;
});

// ../../node_modules/.pnpm/p-defer@3.0.0/node_modules/p-defer/index.js
var require_p_defer = __commonJS((exports, module) => {
  "use strict";
  var pDefer2 = () => {
    const deferred = {};
    deferred.promise = new Promise((resolve2, reject) => {
      deferred.resolve = resolve2;
      deferred.reject = reject;
    });
    return deferred;
  };
  module.exports = pDefer2;
});

// external:yargs
var require_yargs = __commonJS((exports, module) => {
  module.exports = yargs;
});

// src/shim/process.js
var process_exports = {};
__export(process_exports, {
  addListener: () => addListener,
  argv: () => argv,
  binding: () => binding,
  browser: () => browser,
  chdir: () => chdir,
  config: () => config,
  cwd: () => cwd,
  default: () => process_default,
  emit: () => emit,
  env: () => env,
  hrtime: () => hrtime,
  nextTick: () => nextTick,
  off: () => off,
  on: () => on,
  once: () => once,
  platform: () => platform,
  release: () => release,
  removeAllListeners: () => removeAllListeners,
  removeListener: () => removeListener,
  title: () => title,
  umask: () => umask,
  uptime: () => uptime,
  version: () => version,
  versions: () => versions
});
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global.setTimeout === "function") {
  cachedSetTimeout = setTimeout;
}
if (typeof global.clearTimeout === "function") {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var title = "browser";
var platform = "browser";
var browser = true;
var env = {};
var argv = [];
var version = "";
var versions = {};
var release = {};
var config = {};
function noop() {
}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
var performance = global.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
  return new Date().getTime();
};
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var browser$1 = {
  nextTick,
  title,
  browser,
  env,
  argv,
  version,
  versions,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  binding,
  cwd,
  chdir,
  umask,
  hrtime,
  platform,
  release,
  config,
  uptime
};
var process_default = browser$1;
delete versions["node"];

// src/shim/node.js
var Buffer2 = require_buffer().Buffer;

// ../../node_modules/.pnpm/esbuild-wasm@0.8.42/node_modules/esbuild-wasm/package.json
var version2 = "0.8.42";

// src/lib/esbuild.ts
var getService = async () => {
  const esbuild = require_browser();
  const service = await esbuild.startService({
    worker: true,
    wasmURL: `https://unpkg.com/esbuild-wasm@${version2}/esbuild.wasm`
  });
  return service;
};
var wasmBuild = async (options) => {
  const service = await getService();
  try {
    return service.build(options);
  } finally {
  }
};
var wasmTransform = async (input, options) => {
  const service = await getService();
  try {
    return service.transform(input, options);
  } finally {
  }
};
var build = false ? null.build : wasmBuild;
var transform = false ? null.transform : wasmTransform;

// ../helpers/src/path.ts
var import_path = __toModule(require_path_browserify());
function ensureAbsolutePath(filepath, cwd2) {
  return import_path.default.isAbsolute(filepath) ? filepath : import_path.default.join(cwd2, filepath);
}

// src/plugins/memfs.ts
var import_path2 = __toModule(require_path_browserify());
var MemfsNamespace = "memfsNZ";
function resolve({id, importer, fs: fs3}) {
  let resolvedPath = id;
  if (importer && id.startsWith(".")) {
    resolvedPath = import_path2.default.resolve(import_path2.default.dirname(importer), id);
  }
  for (const x of ["", ".ts", ".js", ".css"]) {
    const realPath = resolvedPath + x;
    if (fs3.existsSync(realPath)) {
      return realPath;
    }
  }
  throw new Error(`${resolvedPath} not exists`);
}
var pluginMemfs = (context) => {
  return {
    name: "memfs-plugin",
    setup(build2) {
      build2.onResolve({filter: /.*/, namespace: MemfsNamespace}, (args) => {
        return {
          path: args.path,
          pluginData: args.pluginData,
          namespace: MemfsNamespace
        };
      });
      build2.onLoad({filter: /.*/, namespace: MemfsNamespace}, async (args) => {
        let realPath = args.path;
        const fs3 = context.options.fileSystem;
        const resolvePath = resolve({
          id: args.path,
          importer: args.pluginData.importer,
          fs: context.options.fileSystem
        });
        if (!resolvePath) {
          throw new Error("not found");
        }
        realPath = resolvePath;
        const content = (await context.options.fileSystem.promises.readFile(realPath)).toString();
        return {
          contents: content,
          pluginData: {
            importer: realPath
          },
          loader: import_path2.default.extname(realPath).slice(1)
        };
      });
    }
  };
};

// src/plugins/node-polyfill.ts
var import_path3 = __toModule(require_path_browserify());
var pluginNodePolyfill = () => {
  return {
    name: "plugin-node-polyfill",
    setup(build2) {
      build2.onResolve({filter: /.*/}, async (args) => {
        const polyfillMap = {
          url: require.resolve("url/"),
          assert: require.resolve("assert/"),
          buffer: require.resolve("buffer/"),
          fs: require.resolve("memfs"),
          "jest-worker": import_path3.default.resolve(__dirname, "../src/utils/jest-worker.ts"),
          path: require.resolve("path-browserify"),
          stream: require.resolve("stream-browserify"),
          os: require.resolve("os-browserify/browser"),
          crypto: require.resolve("crypto-browserify"),
          vm: require.resolve("vm-browserify"),
          tty: require.resolve("tty-browserify")
        };
        if (Object.keys(polyfillMap).includes(args.path)) {
          return {
            path: polyfillMap[args.path]
          };
        }
      });
    }
  };
};

// src/lib/compiler.ts
var import_debounce = __toModule(require_debounce());

// external:node-fetch
var node_fetch_default = fetch;

// src/plugins/http.ts
var import_url = __toModule(require_url());
async function fetchPkg(url2) {
  const res = await node_fetch_default(url2);
  return {
    url: res.url,
    content: await res.text()
  };
}
var pluginHttp = () => {
  return {
    name: "http",
    setup(build2) {
      build2.onResolve({filter: /^https?:\/\//}, async (args) => {
        return {
          namespace: "http-url",
          path: args.path
        };
      });
      process_exports.abort;
      build2.onResolve({filter: /.*/, namespace: "http-url"}, async (args) => {
        const path6 = new import_url.default.URL(args.path, args.resolveDir.replace(/^\//, "")).toString();
        return {
          path: path6,
          namespace: "http-url"
        };
      });
      build2.onLoad({filter: /.*/, namespace: "http-url"}, async (args) => {
        const {content, url: url2} = await fetchPkg(args.path);
        return {
          contents: content,
          loader: "ts",
          resolveDir: `/${url2}`
        };
      });
    }
  };
};

// src/plugins/unpkg.ts
var UnpkgNamepsace = "unpkg";
var UnpkgHost = "https://unpkg.com/";
var pluginUnpkg = () => {
  return {
    name: "unpkg",
    setup(build2) {
      build2.onLoad({namespace: UnpkgNamepsace, filter: /.*/}, async (args) => {
        const pathUrl = new URL(args.path, args.pluginData.parentUrl).toString();
        const {url: url2, content} = await fetchPkg(pathUrl);
        return {
          contents: content,
          pluginData: {
            parentUrl: url2
          }
        };
      });
      build2.onResolve({namespace: UnpkgNamepsace, filter: /.*/}, async (args) => {
        return {
          namespace: UnpkgNamepsace,
          path: args.path,
          pluginData: args.pluginData
        };
      });
    }
  };
};

// src/plugins/bare.ts
var import_path4 = __toModule(require_path_browserify());
var pluginBareModule = (context) => {
  return {
    name: "bare",
    setup(build2) {
      if (context.options.unpkg) {
        build2.onResolve({filter: /.*/}, (args) => {
          if (/^(?!\.).*/.test(args.path) && !import_path4.default.isAbsolute(args.path)) {
            if (args.path === "esbuild" || args.path === "@neo-tools/helpers") {
              return;
            }
            return {
              path: args.path,
              namespace: UnpkgNamepsace,
              pluginData: {
                parentUrl: UnpkgHost
              }
            };
          }
        });
      }
    }
  };
};

// src/plugins/watch.ts
var watchPlugin = () => {
  return {
    name: "watch-file",
    load(id) {
      this.addWatchFile(id);
      return void 0;
    }
  };
};

// src/plugins/rollup-proxy.ts
var rollupProxyPlugin = (plugins, context) => ({
  name: "rollup-proxy",
  setup(build2) {
    build2.onResolve({filter: /.*/}, (args) => {
      for (const plugin of plugins) {
        const result = plugin?.resolveId?.call(context, args.path, args.importer, {});
        if (result == null) {
          continue;
        }
        if (typeof result === "string") {
          return {
            path: result,
            namespace: "file"
          };
        }
        if (typeof result === "object") {
          return {
            path: result.id,
            external: result.external
          };
        }
      }
    });
    build2.onLoad({filter: /.*/, namespace: "file"}, async (args) => {
      for (const plugin of plugins) {
        const result = await plugin?.load?.call(context, args.path);
        if (result == null) {
          continue;
        }
        if (typeof result !== "string") {
          throw new Error("\u6682\u65F6\u4E0D\u652F\u6301load\u8FD4\u56DE\u5176\u4ED6\u7ED3\u679C");
        }
        return {
          contents: result,
          loader: "js"
        };
      }
    });
  }
});

// src/lib/compiler.ts
var import_path5 = __toModule(require_path_browserify());
var import_fs = __toModule(require_lib());

// src/plugins/entry.ts
var pluginEntry = (context) => {
  return {
    name: "virtual-entry",
    setup(build2) {
      build2.onResolve({filter: /^<stdin>$/}, (args) => {
        return {
          path: context.options.input,
          namespace: context.options.memfs ? MemfsNamespace : "file",
          pluginData: {
            importer: ""
          }
        };
      });
    }
  };
};

// src/plugins/external-global.ts
var pluginGlobalExternal = () => {
  return {
    name: "plugin-global-external",
    setup(build2) {
      build2.onResolve({filter: /.*/}, (args) => {
        if (["chokidar", "yargs", "node-fetch"].includes(args.path)) {
          return {
            path: args.path,
            namespace: "external"
          };
        }
      });
      build2.onLoad({filter: /.*/, namespace: "external"}, (args) => {
        if (args.path === "node-fetch") {
          return {
            contents: "export default fetch"
          };
        }
        return {
          contents: `module.exports = ${args.path}`
        };
      });
    }
  };
};

// src/lib/compiler.ts
function normalizeOptions(options) {
  const cwd2 = options.cwd ?? process_exports.cwd();
  return {
    input: ensureAbsolutePath(options.input, cwd2),
    output: ensureAbsolutePath(options.output, cwd2),
    fileSystem: options.fileSystem ?? import_fs.default,
    unpkg: options.unpkg ?? false,
    watch: options.watch ?? false,
    plugins: options.plugins ?? [],
    hooks: options.hooks ?? {},
    cwd: cwd2,
    platform: options.platform ?? "node",
    format: options.format ?? "cjs",
    memfs: options.memfs ?? false,
    http: options.http ?? false
  };
}
var defaultEsbuildOptions = {
  platform: "node",
  logLevel: "error",
  bundle: true,
  plugins: [],
  external: ["fsevents"]
};
function normalizeEsbuildOptions(options) {
  const ret = {
    ...defaultEsbuildOptions,
    ...options
  };
  return ret;
}
var Compiler = class {
  constructor(options) {
    this.firstBuildPass = false;
    this.options = normalizeOptions(options);
    if (this.options.watch && !this.watcher) {
      this.watcher = require_chokidar().watch([]);
      this.watcher?.on("all", import_debounce.default(() => {
        if (this.firstBuildPass) {
          this.build(false);
        }
      }, 500, true));
    }
  }
  addWatchFile(id) {
    this.watcher?.add(id);
  }
  async build(watch = false) {
    const context = this;
    this.options.hooks?.start?.();
    try {
      const context2 = this;
      if (this.result) {
        this.result = await this.result?.rebuild?.();
      }
      const plugins = [watchPlugin(), ...this.options.plugins];
      this.result = await build(normalizeEsbuildOptions({
        entryPoints: ["<stdin>"],
        incremental: watch,
        logLevel: "error",
        write: !context2.options.memfs,
        outfile: this.options.output,
        format: context2.options.format,
        globalName: "bundler",
        define: {
          __NODE__: JSON.stringify(context2.options.platform === "node")
        },
        external: this.options.platform === "node" ? ["esbuild", "fsevents"] : ["esbuild", "fsevents", "chokidar", "yargs"],
        platform: this.options.platform,
        banner: this.options.platform === "browser" ? "global = globalThis" : "",
        inject: this.options.platform === "node" ? [] : [import_path5.default.join(__dirname, "../shim/node.js")],
        plugins: [
          context2.options.platform === "browser" && pluginNodePolyfill(),
          context2.options.platform === "browser" && pluginGlobalExternal(),
          pluginEntry(context2),
          rollupProxyPlugin(plugins, context2),
          pluginBareModule(context2),
          context2.options.http && pluginHttp(),
          context2.options.unpkg && pluginUnpkg(),
          context2.options.memfs && pluginMemfs(context2)
        ].filter(Boolean)
      }));
      if (context2.options.memfs) {
        this.result?.outputFiles?.forEach((x) => {
          if (!context2.options.fileSystem.existsSync(import_path5.default.dirname(x.path))) {
            context2.options.fileSystem.mkdirSync(import_path5.default.dirname(x.path));
          }
          context2.options.fileSystem.writeFileSync(x.path, x.text);
        });
      }
      this.options?.hooks?.done?.(this.result);
    } finally {
      this.firstBuildPass = true;
    }
  }
};

// src/lib/yargsOptions.ts
function yargsBuildOptions(yargs2) {
  return yargs2.positional("input", {
    type: "string",
    default: ".",
    describe: "source file"
  }).positional("output", {
    type: "string",
    default: "bundle.js",
    describe: "output file"
  }).option("unpkg", {
    type: "boolean",
    default: false,
    describe: "unpkg"
  }).option("memfs", {
    type: "boolean",
    default: false,
    describe: "memfs"
  }).option("http", {
    type: "boolean",
    default: false,
    describe: "http"
  }).option("platform", {
    type: "string",
    default: "node",
    description: "platform"
  }).option("format", {
    type: "string",
    default: "cjs",
    description: "format",
    choices: ["iife", "cjs", "esm"]
  });
}

// src/index.ts
var import_fs2 = __toModule(require_lib());
var import_memfs3 = __toModule(require_lib());
var import_p_defer = __toModule(require_p_defer());
async function run() {
  const yargs2 = await Promise.resolve().then(() => __toModule(require_yargs()));
  yargs2.scriptName("neo-bundler").usage("$0 <cmd> [args]").command("bundle <input> <output>", "output a single Javascript file with all dependencies\n neo-bundler bundle ", yargsBuildOptions, async (args) => {
    const compiler = new Compiler({
      ...args,
      plugins: [],
      watch: false,
      fileSystem: import_fs2.default
    });
    const result = await compiler.build();
  }).command("watch <input> <output>", "watch build", yargsBuildOptions, async (args) => {
    const compiler = new Compiler({
      ...args,
      plugins: [],
      watch: true,
      fileSystem: import_fs2.default,
      hooks: {
        start() {
          console.log("start compile");
        },
        done(result) {
          console.log("finish compile");
        }
      }
    });
    await compiler.build();
  }).demandCommand(1, "").recommendCommands().strict().help().argv;
}
function compileMemfs(json, input) {
  const defer = import_p_defer.default();
  import_memfs3.default.vol.fromJSON(json, "/");
  const result = new Compiler({
    memfs: true,
    fileSystem: import_memfs3.default,
    cwd: process_exports.cwd(),
    output: "bundle.js",
    input: input ?? "src/index.js",
    unpkg: true,
    http: false,
    plugins: [],
    hooks: {
      done(result2) {
        const compileResult = {};
        result2?.outputFiles?.forEach((x) => {
          compileResult[x.path] = x.text;
        });
        defer.resolve(compileResult);
      }
    }
  }).build();
  return defer.promise;
}
var export_memfs = import_memfs3.default;
export {
  Compiler,
  compileMemfs,
  export_memfs as memfs,
  run
};
