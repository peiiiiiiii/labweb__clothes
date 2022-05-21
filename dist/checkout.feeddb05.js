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
})({"epB2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = convert;

var _shoppingCart = _interopRequireWildcard(require("./shoppingCart.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var navbtn = document.querySelector(".js-header-nav");
var closebtn = document.querySelector("#nav-close");
var bgheader = document.querySelector(".js-header-bg");
var header_navArea = document.querySelector(".js-header-navArea");
var moblie_toogle = document.querySelectorAll(".js-header-toggleClick");
var add_cart = document.querySelector(".js-cart-btn");
var header__side = document.querySelector(".js-header-cartArea");
var search__btn = document.querySelector(".js-search-btn");
var search__inner = document.querySelector(".js-header-searchArea");
var r__mypage = document.querySelector(".r__mypage");
var nav__search = document.getElementById("nav__search2222");
var inpt__ss = document.querySelector("#ssssss");
var mobile__cart = document.querySelector(".js-header-cart");
var mobile__cart2 = document.querySelector(".js-cart-two");
var header__cart = document.querySelector(".js-item-count"); // if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready);
//     // console.log('hihihi');
// } else {
//     console.log("nonno");
//     ready();
// }

document.addEventListener("DOMContentLoaded", function () {
  // login__href();
  // login__href();
  if (localStorage.getItem('user')) {
    r__mypage.setAttribute("href", "profile.html");
  } else {
    r__mypage.setAttribute("href", "login.html");
  }

  _shoppingCart.default.init();

  (0, _shoppingCart.showCart)();
  (0, _shoppingCart.incres)();
  (0, _shoppingCart.decrea)();
  nav__search.addEventListener('click', function (e) {
    e.preventDefault();
    var params = [];
    params.push({
      selection: inpt__ss.value
    });
    localStorage.setItem("search", JSON.stringify(params));
    window.location.href = "collection.html"; // console.log(typeof(res));
  }, false);
  navbtn.addEventListener('click', function (e) {
    navbtn.classList.toggle("is-active"); // header_navArea.classList.toggle("is-open");

    if (header__side.classList.contains('is-open') || search__inner.classList.contains('is-open')) {
      setTimeout(function () {
        header__side.style.display = "none";
        search__inner.style.display = "none"; // bgheader.style.display = "none";
      }, 300);
    }

    if (navbtn.classList.contains('is-active')) {
      dis2(header_navArea);
      dis2(bgheader);
    } else {
      dis2(header_navArea);
      dis2(bgheader);
      setTimeout(function () {
        bgheader.style.display = "none";
      }, 300);
      setTimeout(function () {
        header_navArea.style.display = "none";
      }, 300);
    }
  }, false);
  add_cart.addEventListener('click', function (e) {
    cart();
  }, false);
  mobile__cart.addEventListener('click', function (e) {
    cart();
    (0, _shoppingCart.incres)();
    (0, _shoppingCart.decrea)();
  }, false);
  mobile__cart2.addEventListener('click', function (e) {
    cart();
    (0, _shoppingCart.incres)();
    (0, _shoppingCart.decrea)();
  }, false);
  search__btn.addEventListener('click', function (e) {
    if (!header_navArea.classList.contains('is-open')) {
      navbtn.classList.toggle("is-active");
    }

    if (navbtn.classList.contains('is-active')) {
      dis2(search__inner); // header__side.style.display = "block";

      dis2(bgheader);
    } else {
      dis2(search__inner);
      dis2(bgheader);
      setTimeout(function () {
        search__inner.style.display = "none";
        bgheader.style.display = "none";
      }, 300);
    }
  }, false);
  Array.from(moblie_toogle).forEach(function (element, i) {
    element.addEventListener('click', function (l) {
      element.classList.toggle("is-active");
      document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
      document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
    });
  });
}); // export default;

function ready() {
  _shoppingCart.default.init();

  (0, _shoppingCart.showCart)();
  (0, _shoppingCart.incres)();
  (0, _shoppingCart.decrea)();
  navbtn.addEventListener('click', function (e) {
    navbtn.classList.toggle("is-active"); // header_navArea.classList.toggle("is-open");

    if (header__side.classList.contains('is-open') || search__inner.classList.contains('is-open')) {
      setTimeout(function () {
        header__side.style.display = "none";
        search__inner.style.display = "none"; // bgheader.style.display = "none";
      }, 300);
    }

    if (navbtn.classList.contains('is-active')) {
      dis2(header_navArea);
      dis2(bgheader);
    } else {
      dis2(header_navArea);
      dis2(bgheader);
      setTimeout(function () {
        bgheader.style.display = "none";
      }, 300);
      setTimeout(function () {
        header_navArea.style.display = "none";
      }, 300);
    }
  }, false);
  add_cart.addEventListener('click', function (e) {
    cart();
  }, false);
  mobile__cart.addEventListener('click', function (e) {
    cart();
    (0, _shoppingCart.incres)();
    (0, _shoppingCart.decrea)();
  }, false);
  mobile__cart2.addEventListener('click', function (e) {
    cart();
    (0, _shoppingCart.incres)();
    (0, _shoppingCart.decrea)();
  }, false);
  search__btn.addEventListener('click', function (e) {
    if (!header_navArea.classList.contains('is-open')) {
      navbtn.classList.toggle("is-active");
    }

    if (navbtn.classList.contains('is-active')) {
      dis2(search__inner); // header__side.style.display = "block";

      dis2(bgheader);
    } else {
      dis2(search__inner);
      dis2(bgheader);
      setTimeout(function () {
        search__inner.style.display = "none";
        bgheader.style.display = "none";
      }, 300);
    }
  }, false);
  Array.from(moblie_toogle).forEach(function (element, i) {
    element.addEventListener('click', function (l) {
      element.classList.toggle("is-active");
      document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
      document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
    });
  });
}

function login__href() {
  var href__location = document.querySelectorAll(".href__location");
  Array.from(href__location).forEach(function (element, i) {// element.addEventListener('click',() =>{
    //     element.classList.toggle("is-open");
    //     toggle__content[i].style.display = toggledispaly(element)[0];
    //     console.log(toggle__content[i]);
    // })
  });
}

function dis(element) {
  var isor = element.classList.contains("is-active") ? "block" : "none";
  var opa = element.classList.contains("is-active") ? "1" : "0";
  return [isor, opa];
}

function dis2(element) {
  if (navbtn.classList.contains("is-active")) {
    element.style.display = "block";
    element.classList.add("is-open");
    element.classList.remove("out");
  } else {
    element.classList.remove("is-open");
    element.classList.remove("out");
  }
}

function cart() {
  if (!header_navArea.classList.contains('is-open')) {
    navbtn.classList.toggle("is-active");
  }

  if (search__inner.classList.contains('is-open')) {
    setTimeout(function () {
      search__inner.style.display = "none";
    }, 300);
  }

  if (navbtn.classList.contains('is-active')) {
    dis2(header__side); // header__side.style.display = "block";

    dis2(bgheader);
  } else {
    dis2(header__side);
    dis2(bgheader);
    setTimeout(function () {
      header__side.style.display = "none";
      bgheader.style.display = "none";
    }, 300);
  }
} // export default dis2();


function convert(money) {
  var internationalNumberFormat = new Intl.NumberFormat('en-US');
  var s = internationalNumberFormat.format(money);
  return s;
}
},{"./shoppingCart.js":"QiuZ"}],"QiuZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItem = addItem;
exports.decrea = decrea;
exports.default = void 0;
exports.errorMessage = errorMessage;
exports.incres = incres;
exports.showCart = showCart;
exports.showProducts = showProducts;
exports.showProducts2 = showProducts2;

var _main = require("./main.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var token = localStorage.getItem("token");
var CART = {
  KEY: "shopping cart",
  contents: [],
  init: function init() {
    var _contents = localStorage.getItem(CART.KEY);

    if (_contents) {
      CART.contents = JSON.parse(_contents);
    }

    CART.count__cart();
  },
  sync: function sync() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _cart;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _cart = JSON.stringify(CART.contents);
              _context.next = 3;
              return localStorage.setItem(CART.KEY, _cart);

            case 3:
              _context.next = 5;
              return CART.count__cart();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  count__cart: function count__cart() {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var count_s, a;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              count_s = JSON.parse(localStorage.getItem("shopping cart"));

              if (count_s) {
                a = _toConsumableArray(count_s).length;
                document.querySelector(".js-item-count").innerHTML = a;
              } else {
                document.querySelector(".js-item-count").innerHTML = 0;
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  find: function find(id, color, size) {
    var match = CART.contents.filter(function (item) {
      // console.log('item',item.id);
      // console.log('id',id);
      // console.log('item',item.color);
      // console.log('id',color);
      // console.log('item',item.size);
      // console.log('id',size);
      // console.log(item.color !== color);
      // console.log(item.size !== size);
      if (item.id === id && item.color === color && item.size === size) return true;
    });

    if (match && match[0]) {
      return match[0];
    }
  },
  add: function add(id, qty_input, size, color, img) {
    var obj = {
      id: PRODUCTS.CommodityId,
      title: PRODUCTS.CommodityName,
      size: size,
      color: color,
      img: img,
      qty: qty_input,
      itemPrice: PRODUCTS.S_Price
    };

    if (CART.find(id, color, size)) {
      CART.increase(id, qty_input);
    } else {
      // console.log('product',PRODUCTS);
      CART.contents.push(obj); // console.log('ooo');
      // doAjaxThings(pust);

      CART.sync(); // console.log('p', PRODUCTS)
      // var result = Object.entries(PRODUCTS);
      // console.log('r',result)
      // let arr = PRODUCTS.filter(product=>{
      //     if(product.id == id){
      //         return true;
      //     }
      // });
      // if(arr && arr[0]){
      //     let obj = {
      //         id: arr[0].id,
      //         title: arr[0].title,
      //         qty: 1,
      //         itemPrice: arr[0].price
      //     };
      //     CART.contents.push(obj);
      //     //update localStorage
      //     CART.sync();
      // }else{
      //     //product id does not exist in products data
      //     console.error('Invalid Product');
      // }
    }
  },
  increase: function increase(id) {
    var qty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var color = arguments.length > 2 ? arguments[2] : undefined;
    var size = arguments.length > 3 ? arguments[3] : undefined;
    // console.log(CART.contents);
    CART.contents = CART.contents.map(function (item) {
      if (item.id === id && item.color === color && item.size === size) {
        item.qty = item.qty + qty; // console.log(item.qty);
      }

      return item;
    });
    CART.sync();
  },
  reduce: function reduce(id) {
    var qty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var color = arguments.length > 2 ? arguments[2] : undefined;
    var size = arguments.length > 3 ? arguments[3] : undefined;
    CART.contents = CART.contents.map(function (item) {
      if (item.id === id && item.color === color && item.size === size) item.qty = item.qty - qty;
      return item;
    });
    CART.contents.forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(item.id === id && item.qty === 0 && item.color === color && item.size === size)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return CART.remove(id, color, size);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    CART.sync();
  },
  remove: function remove(id, color, size) {
    CART.contents = CART.contents.filter(function (item) {
      if (!(item.id === parseInt(id) && item.color === color && item.size === size)) return true;
    });
    CART.sync();
    CART.count__cart();
  },
  empty: function empty() {
    CART.contents = [];
    CART.sync();
  },
  logContents: function logContents(prefix) {// console.log(prefix, CART.contents)
  },
  totalPrice: function totalPrice() {
    var totalCart = 0;
    var a = CART.contents.map(function (item) {
      totalCart += item.itemPrice * item.qty;
    });
    return Number(totalCart.toFixed(2));
  }
};
var PRODUCTS = [];
document.addEventListener('DOMContentLoaded', function () {// CART.init();
  // showCart();
  // incres();
  // decrea();
});

function incres() {
  // console.log("incr");
  var plus_item = document.querySelectorAll(".product__amount-plus");
  var total_cart2 = document.getElementById("total-cart");
  Array.from(plus_item).forEach(function (element, i) {
    // console.log('increa',i)
    element.addEventListener('click', function (ev) {
      // console.log("click");
      ev.preventDefault();
      var controls = ev.target.parentElement;
      var id = parseInt(controls.getAttribute('data-id'));
      var color = controls.getAttribute('data-color');
      var size = controls.getAttribute('data-size');
      CART.increase(id, 1, color, size);
      var qty = controls.querySelector('div:nth-child(2)');
      var item = CART.find(id, color, size);

      if (item) {
        qty.textContent = item.qty;
      } else {
        document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement);
      } // console.log(CART.totalPrice());


      total_cart2.innerHTML = "";
      total_cart2.innerHTML = (0, _main.convert)(CART.totalPrice()); // document.getElementById("total-cart")
    });
  });
}

function decrea() {
  var mins_item = document.querySelectorAll(".product__amount-minus");
  var total_cart3 = document.getElementById("total-cart");
  Array.from(mins_item).forEach(function (element, i) {
    element.addEventListener('click', function (ev) {
      ev.preventDefault();
      var controls = ev.target.parentElement;
      var id = parseInt(controls.getAttribute('data-id'));
      var color = controls.getAttribute('data-color');
      var size = controls.getAttribute('data-size');
      CART.reduce(id, 1, color, size);
      var qty = controls.querySelector('div:nth-child(2)');
      var item = CART.find(id, color, size);

      if (item) {
        qty.textContent = item.qty;
      } else {
        document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement.parentElement.parentElement);
        showCart();
      }

      total_cart3.innerHTML = "";
      total_cart3.innerHTML = (0, _main.convert)(CART.totalPrice());
    });
  });
} // navbar cart


function showCart() {
  // add id 把 ul 改掉
  // <div class="l-header__cart js-header-cartArea" id="cart__inner">
  var cartSection = document.getElementById('cart__inner');
  var total_cart = document.getElementById("total-cart");
  cartSection.innerHTML = "";
  var s = CART.contents; // console.log('s2',CART.contents);

  var total = (0, _main.convert)(CART.totalPrice()); // console.log('s3',CART.contents);

  var cc = document.querySelector(".l-header__cart-bottom");
  var output__cart = ''; // console.log(s.length !== 0)
  // console.log(s)

  if (s.length !== 0 || s) {
    s.forEach(function (item) {
      output__cart += "\n                <div class=\"product__list-item\">\n                    <figure>\n                        <div class=\"product__img\">\n                            <a href= 'detail.html?id=".concat(item.id, "'>\n                            <img src=").concat(item.img, ">\n                            </a>\n                        </div>\n                        <figcaption>\n                            <dl>\n                            <dt>\n                                <a href='detail.html?id=").concat(item.id, "'>\n                                    ").concat(item.title, "\n                                </a>\n                                <p>").concat(item.size, " / ").concat(item.color, "</p>\n                            </dt>\n                            <dd>\n                                <ul class=\"product__prices\">\n                                    <li class=\"product__price\">NT").concat((0, _main.convert)(item.itemPrice), "</li>\n                                </ul>\n                            </dd>\n                            <div class=\"product__amount\" data-id= ").concat(item.id, "  data-quantity=").concat(item.qty, " data-color= ").concat(item.color, " data-size= ").concat(item.size, ">\n                                <div class=\"product__amount-minus\" data-id= ").concat(item.id, "></div>\n                                <div class=\"product__amount-curr\">").concat(item.qty, "</div>\n                                <div class=\"product__amount-plus\" data-id= ").concat(item.id, "></div>\n                            </div>\n                            </dl>\n                        </figcaption>\n                    </figure>\n                </div>\n            \n            ");
    });
    cc.style.display = "block";
    total_cart.innerHTML = total;
  }

  if (s.length == 0) {
    cc.style.display = "none";
    output__cart = "\n            <div class=\"l-header__cart-message js-header-cartMessage\" style=\"display:block;\">\n                <span>\u4F60\u7684\u8CFC\u7269\u8ECA\u662F\u7A7A\u7684</span>\n            </div>\n        ";
  }

  cartSection.insertAdjacentHTML('afterbegin', output__cart);
}

function showProducts(product) {
  // console.log("p",product)
  console.log(product); // console.log(JSON.stringify(product))
  // console.log( JSON.parse(product))

  PRODUCTS = product; //take data.products and display inside <section id="products">

  var productSection = document.getElementById('product__item');
  productSection.innerHTML = "";
  var relatedSection = document.getElementById('related__list');
  relatedSection.innerHTML = ""; // slider

  var sliders = product.CommodityImages; // console.log(sliders);

  var slider__content = "";
  var active__slider = '';

  for (var slider in sliders) {
    active__slider = slider == 0 ? 'active ' : '';
    slider__content += "\n            <div class=\"slider-item ".concat(active__slider, " slide\" >\n                <img src=").concat(sliders[slider], " alt=\"\">\n            </div>\n        ");
  } // size


  var sizes = product.CommoditySizes; // console.log(sizes);

  var collator = new Intl.Collator('en');
  var size__content = "";

  function SortArray(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  }

  sizes = sizes.sort(SortArray);

  for (var size in sizes) {
    size__content += "\n            <li class=\"s-select__item\">\n                <input type=\"radio\" class=\"input_radio\" id=\"option-size-".concat(size, "\" value=").concat(sizes[size], " name=\"option-size\">    \n                <label for=\"option-size-").concat(size, "\" class=\"size-radio\">").concat(sizes[size], "</label>\n            </li>\n        ");
  } // color


  var colors = product.CommodityColors;
  var color_content = "";
  var c = [];
  var d = [];

  for (var color in colors) {
    if (color % 2 == 0) {
      c.push(colors[color]);
    } else {
      d.push(colors[color]);
    }
  }

  Array.from(c).forEach(function (element, i) {
    color_content += "\n            <li class=\"color__wrapper--item\">\n                <input type=\"radio\" class=\"input_radio\" id=\"option-color-".concat(i, "\" value=").concat(element, " name=\"option-color\">    \n                <label for=\"option-color-").concat(i, "\" class=\"color-radio\">\n                    <img src=").concat(d[i], " alt=\"\">\n                </label>\n            </li>\n        ");
  }); // kind

  var kinds = product.CommodityTags;
  var lind__text = "";

  for (var kind in kinds) {
    lind__text += "\n            <li class=\"productTag-item\"><a href=\"\">".concat(kinds[kind], "</a></li>\n        ");
  }

  var product__list = "";
  product__list = "\n\n    <div class=\"item__wrapper\" >\n        <div class=\"item__wrapper-left\">\n            <div class=\"item__wrapper-slider slider slides\" id=\"slides\">\n                \n                \n                ".concat(slider__content, "\n                <ol class=\"slide-indicators\">\n                    <li class=\"slide-indicator\"></li>\n                    <li class=\"slide-indicator\"></li>\n                    <li class=\"slide-indicator\"></li>\n                    <li class=\"slide-indicator\"></li>\n                    <li class=\"slide-indicator\"></li>\n                </ol>\n                \n            </div>\n            <span class=\"slider-control-prev control prev\" role=\"button\" id=\"prev\">\n                    \n            </span>\n            <span class=\"slider-control-next control next\" role=\"button\" id=\"next\">\n                \n            </span>\n        </div>\n        <div class=\"item__wrapper-right\">\n            <div class=\"item__wrapper-list\">\n                <h3 class=\"item__wrapper-title u-margin-bottom-small\">").concat(product.CommodityName, "</h3>\n                <p class=\"item__wrapper-price u-margin-bottom-medium\">NT ").concat((0, _main.convert)(product.S_Price), "</p>\n                <div class=\"item__wrapper-select\">\n                    <p class=\"s_title\">\n                        \u5C3A\u5BF8\n                    </p>\n                    <div>\n                        <ul class=\"s-select__list u-margin-bottom-small\">\n                            ").concat(size__content, "\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"color__wrapper u-margin-bottom-small\">\n                    <p class=\"s_title\">\n                        \u984F\u8272\n                    </p>\n                    <div>\n                        <ul class=\"color__wrapper--list\">\n                            ").concat(color_content, "\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"quantity__wrapper u-margin-bottom-medium\">\n                    <p class=\"s_title\">\u6578\u91CF</p>\n                    <div class=\"quantity__border\">\n                        <span class=\"quantity__Button Link Link--secondary js-detail-mins\" >\n                            <svg class=\"Icon Icon--minus\" role=\"presentation\" viewBox=\"0 0 16 2\">\n                                <path d=\"M1,1 L15,1\" stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"square\"></path>\n                            </svg>\n                        </span>\n                        <input  id=\"add__input\" type=\"text\" class=\"quantity__current\" pattern=\"[0-9]*\" value=\"1\" >\n                        <span class=\"quantity__Button Link Link--secondary js-detail-add\">\n                            <svg class=\"Icon Icon--plus\" role=\"presentation\" viewBox=\"0 0 16 16\">\n                                <g stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"square\">\n                                <path d=\"M8,1 L8,15\"></path>\n                                <path d=\"M1,8 L15,8\"></path>\n                                </g>\n                            </svg>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"addcart__wrapper\">\n                    \n\n                    <div class=\"btn__box detail__btn js-add-cart\" >\n                        <button class=\"form__btn\" data-id=").concat(product.CommodityId, "><span>\u52A0\u5165\u8CFC\u7269\u8ECA</span></button>\n                    </div>\n\n                    \n                </div>\n                <div class=\"wishlist__wrapper\">\n                    <button class=\"wishtlist\">\n                        <div>\n                            <svg version=\"1.1\" xmlns=\"https://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 64 64\">\n                                <path d=\"M47.199 4c-6.727 0-12.516 5.472-15.198 11.188-2.684-5.715-8.474-11.188-15.201-11.188-9.274 0-16.8 7.527-16.8 16.802 0 18.865 19.031 23.812 32.001 42.464 12.26-18.536 31.999-24.2 31.999-42.464 0-9.274-7.527-16.802-16.801-16.802z\" fill=\"#000\"></path>\n                            </svg>\n                            <span>\u6536\u85CF</span>\n                        </div>\n                    </button>\n                </div>\n                <div class=\"description__wrapper\">\n                    <dl class=\"description__wrapper-des\">\n                        <dt class=\"description__wrapper-title js-toggleClick\">\n                            \u63CF\u8FF0\n                        </dt>\n                        <dd class=\"description__wrapper-content js-toggleClickArea\">\n                            <ul>\n                                <li>").concat(product.Description, "</li>\n                            </ul>\n                        </dd>\n                    </dl>\n                    <dl class=\"description__wrapper-matrial\">\n                        <dt class=\"description__wrapper-title js-toggleClick\">\n                            \u6750\u8CEA\n                        </dt>\n                        <dd class=\"description__wrapper-content js-toggleClickArea\">\n                            <ul>\n                                <li>").concat(product.Material, "</li>\n                            </ul>\n                        </dd>\n                    </dl>\n                    <dl class=\"description__wrapper-size\">\n                        <dt class=\"description__wrapper-title js-toggleClick\">\n                            \u5C3A\u5BF8\n                        </dt>\n                        <dd class=\"description__wrapper-content js-toggleClickArea\">\n                            <ul>\n                                <li>MARK - 184cm / 75kg / size XL</li>\n                                <li>WILLY - 182cm / 75kg / size XL</li>\n                                <li>\u9EC3\u7FCA - 182cm / 64kg /size L</li>\n                            </ul>\n                        </dd>\n                    </dl>\n                </div>\n\n                <div class=\"productTag__wrapper\">\n                    <ul class=\"productTag-list\">\n                        ").concat(lind__text, "\n                    </ul>\n                </div>\n            </div>\n        </div>\n\n    \n    </div>\n    ");
  productSection.insertAdjacentHTML('afterbegin', product__list); // des js

  var toggle__title = document.querySelectorAll(".js-toggleClick");
  var toggle__content = document.querySelectorAll(".js-toggleClickArea");

  function toggledispaly(element) {
    var isor = element.classList.contains("is-open") ? "block" : "none";
    var opa = element.classList.contains("is-open") ? "1" : "0";
    return [isor, opa];
  }

  Array.from(toggle__title).forEach(function (element, i) {
    element.addEventListener('click', function () {
      element.classList.toggle("is-open");
      toggle__content[i].style.display = toggledispaly(element)[0]; // console.log(toggle__content[i]);
    });
  });
}

function showProducts2(product) {
  // console.log(product)
  var relatedSection = document.getElementById('related__list');
  relatedSection.innerHTML = "";
  var like__content = "";
  product.forEach(function (item) {
    // console.log(item)
    var image = item.CommodityImages[0];
    like__content += "\n            <li class=\"item__list-item\">\n                <a href=\"detail.html?id=".concat(item.CommodityId, "\">\n                    <figure>\n                        <div class=\"item__list-photo js-follower-Area\">\n                            <img src=\"").concat(image, "\" alt=\"\">\n                        </div>\n                        <figcaption>\n                        <p class=\"item__list-sale\"></p>\n                        <p class=\"item__list-name\">").concat(item.CommodityName, "</p>\n                        \n                        <ul class=\"item__list-prices price-group item__state\">\n                                <li class=\"item__list-price\">\n                                    <del class=\"price-delete\">\n                                        <span class=\"price-amount\">NT$ ").concat(item.Price, "</span>\n                                    </del>\n                                    <ins class=\"price-insert\">\n                                        <span class=\"price-amount\">NT$ ").concat(item.S_Price, "</span>\n                                    </ins>\n                                </li>\n                        </ul>\n                        </figcaption>\n                    </figure>\n                </a>\n            </li>\n        ");
  });
  relatedSection.insertAdjacentHTML('beforeEnd', like__content);
}

var QTY = 0;
var IMG = '';

function addItem(ev, qty_input, size, color) {
  ev.preventDefault(); // console.log(ev.target);
  // console.log(ev.target);
  // console.log(qty_input);

  getslider0();
  var id = parseInt(ev.target.getAttribute('data-id')); // console.log('add to cart item', id);
  // console.log(CART.contents)

  QTY = qty_input;
  CART.add(id, qty_input, size, color, IMG);
  showCart();
}

function errorMessage(err) {//display the error message to the user
  // console.error(err);
}

function getslider0() {
  var sliderss = PRODUCTS.CommodityImages;

  for (var slider in sliderss) {
    IMG = sliderss[0];
  }
}

var _default = CART; // post add cart
// async function doAjaxThings(params) {
//     // console.log("收到");
//     let result = await makeRequest("POST", "https://localhost:7206/api/Commodity/addshoppingcart",params);
//     // console.log(result);
// }
// function makeRequest(method, url,params) {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(JSON.stringify(params));
//         if(token != null)
//         {
//             xhr.setRequestHeader('Authorization', token );
//         }
//         xhr.onload = function () {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(JSON.parse(xhr.responseText));
//                 // console.log('addd post done')
//                 return;
//                 // console.log(xhr.responseText);
//             } else {
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//             }
//         };
//         xhr.onerror = function () {
//             reject({
//                 status: this.status,
//                 statusText: xhr.statusText
//             });
//         };
//     });
// }

exports.default = _default;
},{"./main.js":"epB2"}],"Je6K":[function(require,module,exports) {
"use strict";

var _shoppingCart = _interopRequireWildcard(require("./shoppingCart.js"));

var _main = require("./main.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkout = localStorage.getItem("shopping cart");
var ccheck = JSON.parse(checkout);
var put__conent = '';
var table__content = '';
var pay = '';
var addOption = "";
var cart__form = document.querySelector(".cart__form"); // cart__form

// 
var circles = document.querySelectorAll('.circle');
var progress = document.querySelector('.progress');
var next = document.querySelector('#next');
var prev = document.querySelector('#prev');
var currentNumber = 1; // 

document.addEventListener('DOMContentLoaded', function () {
  _shoppingCart.default.init();

  (0, _shoppingCart.showCart)();
  (0, _shoppingCart.incres)();
  (0, _shoppingCart.decrea)();
  outcheck(1); // button

  next.addEventListener('click', function (e) {
    e.preventDefault();
    currentNumber++;

    if (currentNumber > 3) {
      currentNumber = 3;
    }

    update();
  });
  prev.addEventListener('click', function (e) {
    e.preventDefault();
    currentNumber--;

    if (currentNumber < 1) {
      currentNumber = 1;
    }

    update();
  }); // 

  function update() {
    circles.forEach(function (circle, index) {
      if (index < currentNumber) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    var actives = document.querySelectorAll('.active');
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';
    cart__form.innerHTML = "";

    if (currentNumber === 1) {
      prev.disabled = true;
      cart__form.innerHTML = "";
      next.childNodes[0].innerHTML = "結帳";
    } else if (currentNumber === 3) {
      prev.disabled = true;
      next.disabled = true;
      prev.style.cursor = 'not-allowed';
    } else {
      prev.disabled = false;
      next.disabled = false;
      next.childNodes[0].innerHTML = "確認";
    }

    outcheck(currentNumber);
  }

  var circle__text = document.querySelectorAll(".circle__text");
  Array.from(circle__text).forEach(function (element, i) {
    // console.log('increa',i)
    element.addEventListener('click', function (ev) {
      ev.preventDefault();
      var step__level = parseInt(element.dataset.step); // update();

      if (step__level === 1) {
        currentNumber--;
        console.log(currentNumber);
      } else if (step__level === 2) {
        currentNumber++;
      } else {
        currentNumber++;
        circle__text[0].style.cursor = 'not-allowed';
        circle__text[1].style.cursor = 'not-allowed';
        element.disabled = true;
      }

      update();
    });
  });
});

function outcheck(_x) {
  return _outcheck.apply(this, arguments);
}

function _outcheck() {
  _outcheck = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(count) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(count);
            put__conent = '';
            table__content = '';

            if (count === 1) {
              Array.from(ccheck).forEach(function (element, i) {
                var subtotal = element.qty * element.itemPrice; // console.log(element);

                put__conent += "\n                <div class=\"table__row\">\n                    <div class=\"table__cell table__cell--product\">\n                        <div class=\"product\">\n                            <div class=\"product__thumb\">\n                                <a href=\"detail.html?id=".concat(element.id, "\">\n                                    <img src=").concat(element.img, " alt=").concat(element.title, ">\n                                </a>\n                            </div>\n                            <div class=\"product__des\">\n                                <p class=\"product__title\">\n                                    <a href=\"detail.html?id=").concat(element.id, "\"><span class=\"product__ja\"></span><span class=\"product__en\">").concat(element.title, "</span>\n                                    </a>\n                                </p>\n                                <p class=\"product__property\">").concat(element.size, " / ").concat(element.color, "</p></div>\n                        </div>\n                    </div>\n                    <div class=\"table__cell table__cell--price h-no-sp\">\n                        <p class=\"price item__price\" id=\"item__price\" data-price=").concat(element.itemPrice, ">NT ").concat((0, _main.convert)(element.itemPrice), "</p>\n                    </div>\n                    <div class=\"table__cell table__cell--quantity\">\n                        \n                        \n                        <div class=\"form__select\">\n                            <div class=\"quantity__border\"  data-id=").concat(element.id, " data-color= ").concat(element.color, " data-size= ").concat(element.size, ">\n                                <span class=\"quantity__Button Link Link--secondary  form__select-btn js-detail-mins\">\n                                    <svg class=\"Icon Icon--minus\" role=\"presentation\" viewBox=\"0 0 16 2\">\n                                        <path d=\"M1,1 L15,1\" stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"square\"></path>\n                                    </svg>\n                                </span>\n                                <input type=\"text\" class=\"quantity__current\" id=\"add__input\" pattern=\"[0-9]*\" value=").concat(element.qty, ">\n                                <span class=\"quantity__Button Link Link--secondary  form__select-btn js-detail-add\">\n                                    <svg class=\"Icon Icon--plus\" role=\"presentation\" viewBox=\"0 0 16 16\">\n                                        <g stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"square\">\n                                        <path d=\"M8,1 L8,15\"></path>\n                                        <path d=\"M1,8 L15,8\"></path>\n                                        </g>\n                                    </svg>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"table__cell table__cell--total h-no-sp\">\n                        <p class=\"price small_count\" data-total= ").concat(subtotal, ">\n                            ").concat((0, _main.convert)(subtotal), "\n                        </p>\n                    </div>\n                    <div class=\"table__cell table__cell--remove\">\n                        <p class=\"remove productTag-item\" data-id=").concat(element.id, " data-color= ").concat(element.color, " data-size= ").concat(element.size, ">\n                            <span>\u522A\u9664</span>\n                        </p>\n                    </div>\n                </div>\n            ");
              });
              table__content = "\n        <div class=\"table\">\n            <div class=\"table__row table__row--head\">\n                <div class=\"table__cell table__cell--product\">\n                    <p class=\"table__head\">\u5546\u54C1</p>\n                </div>\n                <div class=\"table__cell table__cell--price\">\n                    <p class=\"table__head\">\u50F9\u683C</p>\n                </div>\n                <div class=\"table__cell table__cell--quantity\">\n                    <p class=\"table__head\">\u6578\u91CF</p>\n                </div>\n                <div class=\"table__cell table__cell--total\">\n                    <p class=\"table__head\">\u5408\u8A08</p>\n                </div>\n                <div class=\"table__cell table__cell--remove\">\n                </div>\n            </div>\n            \n        </div>\n        <div class=\"all\" id=\"checkout__form\">\n            ".concat(put__conent, "\n        </div>\n        <div class=\"total\">\n            \n            <p class=\"total__price\"><small class=\"total__label\">\u7E3D\u8A08  NT</small><span class=\"total__yen\" id=\"total__yen\"></span></p>\n        </div>\n        ");
            } else if (count === 2) {
              table__content = "\n        <div class=\"payment__wrapper\">\n        <div class=\"payment__wrapper-left\">\n            <div class=\"location step\">\n                <h2 class=\"h2__payment\">\u904B\u9001\u65B9\u5F0F</h2>\n                \n                <label for=\"p3-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p3-option\" name=\"pay\" tabindex=\"1\" value=\"family\">\n                    <span>\u5168\u5BB6\u8D85\u5546\u53D6\u8CA8</span>\n                </label>\n                <label for=\"p2-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p2-option\" name=\"pay\" tabindex=\"1\" value=\"711\">\n                    <span>7-11\u8D85\u5546\u53D6\u8CA8</span>\n                </label>\n                <label for=\"p1-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p1-option\" name=\"pay\" tabindex=\"2\" value=\"home\">\n                    <span>\u5B85\u914D</span>\n                </label>\n            </div>\n            <div class=\"location step\">\n                <h2 class=\"h2__payment\">\u4ED8\u6B3E\u65B9\u5F0F</h2>\n                <label for=\"p4-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p4-option\" name=\"paymentway\" tabindex=\"1\" value=\"credit\">\n                    <span>\u4FE1\u7528\u5361\u4ED8\u6B3E</span>\n                </label>\n                <label for=\"p5-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p5-option\" name=\"paymentway\" tabindex=\"1\" value=\"store\">\n                    <span>\u8CA8\u5230\u4ED8\u6B3E</span>\n                </label>\n                <label for=\"p6-option\" class=\"l-radio-btn\">\n                    <input type=\"radio\" id=\"p6-option\" name=\"paymentway\" tabindex=\"2\" value=\"atm\">\n                    <span>ATM\u8F49\u5E33</span>\n                </label>\n            </div>\n        </div>\n        <div class=\"payment__wrapper-right\">\n            <h2 class=\"h2__payment\">\u8A02\u8CFC\u8CC7\u6599</h2>\n            <div class=\"wrapper__input\">\n                \n                <div class=\"iput__info\">\n                    <label for=\"name__info\"><span>\u59D3\u540D</span></label>\n                    <input type=\"text\" class=\"field__input\" id=\"name__info\" placeholder=\"\u59D3\u540D\">\n                </div>\n                <div class=\"iput__info\">\n                    <label for=\"email__info\"><span>\u96FB\u5B50\u90F5\u4EF6</span></label>\n                    <input type=\"text\" class=\"field__input\" id=\"email__info\" placeholder=\"Email\">\n                </div>\n                <div class=\"iput__info\">\n                    <label for=\"phone__info\"><span>\u884C\u52D5\u96FB\u8A71</span></label>\n                    <input type=\"text\" class=\"field__input\" id=\"phone__info\" placeholder=\"\u884C\u52D5\u96FB\u8A71\">\n                </div>\n                <div class=\"iput__info\">\n                    <label ><span>\u6536\u4EF6\u5730\u5740</span></label>\n\n                    <div class=\"right\">\n                        <select class=\"door__option\" >\n                            <option>\u8ACB\u9078\u64C7\u9580\u5E02</option>\n                            <option value=\"1\" >\u9580\u5E021</option>\n                            <option value=\"2\">\u9580\u5E022</option>\n                            <option value=\"3\">\u9580\u5E023</option>\n                            <option value=\"4\">\u9580\u5E024</option>\n                        </select>\n                    <input type=\"text\" class=\"field__input\" id=\"address__info\" placeholder=\"\u6536\u4EF6\u5730\u5740\">\n                    </div>\n                </div>\n                \n                \n                \n            </div>\n        </div>\n    </div>\n        ";
            } else {
              table__content = "\n            <div class=\"modal\" id=\"modal-one\">\n                <div class=\"modal-container\">\n                    <div>\n                        <h1>\u60A8\u7684\u8A02\u55AE\u5DF2\u5B8C\u6210\u4ED8\u6B3E\uFF01</h1>\n                        <div class=\"www\">\n                            <img src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1NTAgNTUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NTAgNTUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRCNEI0Qjt9Cgkuc3Qxe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qye2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTtmaWxsOiM0QjRCNEI7fQoJLnN0M3tjbGlwLXBhdGg6dXJsKCNTVkdJRF82Xyk7fQoJLnN0NHtjbGlwLXBhdGg6dXJsKCNTVkdJRF84Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDV7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMTBfKTt9Cgkuc3Q2e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzEyXyk7ZmlsbDojQ0FDQUNBO30KCS5zdDd7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMTRfKTt9Cgkuc3Q4e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzE2Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDl7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMThfKTt9Cgkuc3QxMHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8yMF8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QxMXtjbGlwLXBhdGg6dXJsKCNTVkdJRF8yMl8pO30KCS5zdDEye2NsaXAtcGF0aDp1cmwoI1NWR0lEXzI0Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDEze2NsaXAtcGF0aDp1cmwoI1NWR0lEXzI2Xyk7fQoJLnN0MTR7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMjhfKTtmaWxsOiNDQUNBQ0E7fQoJLnN0MTV7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMzBfKTt9Cgkuc3QxNntjbGlwLXBhdGg6dXJsKCNTVkdJRF8zMl8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QxN3tjbGlwLXBhdGg6dXJsKCNTVkdJRF8zNF8pO30KCS5zdDE4e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzM2Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDE5e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzM4Xyk7fQoJLnN0MjB7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNDBfKTtmaWxsOiNDQUNBQ0E7fQoJLnN0MjF7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNDJfKTt9Cgkuc3QyMntjbGlwLXBhdGg6dXJsKCNTVkdJRF80NF8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QyM3tjbGlwLXBhdGg6dXJsKCNTVkdJRF80Nl8pO30KCS5zdDI0e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzQ4Xyk7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzIzLjExLDI4My40NWMtMTAuMzItMTMuNzEtMjMuMDEtMjguMTktMzcuNDEtNDIuNTljLTE5LjIzLTE5LjIxLTM4LjU1LTM1LjM4LTU2LjAyLTQ2LjkzCgkJYy04Ljc1LTUuNzgtMTcuMDMtMTAuNDEtMjQuNzctMTMuN2MtNy43NC0zLjI2LTE0LjkxLTUuMjctMjEuOTEtNS4zMWMtMy4wNiwwLjAxLTYuMTEsMC40Mi05LjA2LDEuNDYKCQljLTIuOTUsMS4wMi01Ljc3LDIuNzMtOC4wNSw1LjAyYy0yLjMsMi4yOS00LjAxLDUuMTEtNS4wNCw4LjA1Yy0wLjc1LDIuMTctMS4xNyw0LjM5LTEuMzUsNi42Mkw4Ny40NCw0MjcuMzIKCQljLTMuODksMi45MS03LjE5LDUuODQtOS45Nyw4LjgyYy01LjUsNS44NS04Ljk4LDExLjk3LTEwLjksMTcuOTdjLTEuOTUsNi0yLjM2LDExLjczLTIuMzYsMTYuOTJjMC4wMSw1LDAuMzcsOS41NSwwLjM1LDEzLjY5CgkJYzAuMDEsMi44My0wLjE0LDUuNDQtMC41OCw3Ljk0Yy0wLjY5LDMuNzUtMS45NCw3LjIyLTQuNTksMTEuMDhjLTIuNjcsMy44NC02Ljg4LDguMDktMTMuNjUsMTIuNzFsOC45MiwxMy4wOQoJCWM1LjMzLTMuNjIsOS42NS03LjI5LDEzLjEzLTExLjA1YzUuMjQtNS42Miw4LjU1LTExLjUzLDEwLjQtMTcuMzRjMS44NC01LjgsMi4yNC0xMS4zNywyLjI0LTE2LjQzCgkJYy0wLjAyLTQuOTctMC4zNy05LjUyLTAuMzUtMTMuNjljMC0yLjg5LDAuMTUtNS42MSwwLjYzLTguMmMwLjcyLTMuOSwyLjA0LTcuNTYsNC45LTExLjY1YzIuMzItMy4zLDUuNzYtNi45MSwxMC44NC0xMC43NwoJCWwyMzMuNC03My4zMmMyLjQ2LTAuMTUsNC44OC0wLjU2LDcuMjUtMS4zOWMyLjkzLTEuMDMsNS43Ni0yLjczLDguMDUtNS4wMmwtNi40LTYuNDFsNi40LDYuNGMyLjMtMi4yOSwzLjk5LTUuMTEsNS4wMi04LjA1CgkJYzEuMDUtMi45NSwxLjQ0LTYuMDEsMS40NC05LjA3Yy0wLjAzLTctMi4wNC0xNC4xNy01LjMtMjEuOTJDMzQxLjM4LDMxMC4wNSwzMzMuNDMsMjk3LjE3LDMyMy4xMSwyODMuNDV6IE0xMDkuNTQsNDE3LjI5CgkJbDExLjU4LTM3LjE3bDEzLjkxLDI5LjE2TDEwOS41NCw0MTcuMjl6IE0xNDUuOTQsNDA1Ljg2bC0xOS44Ni00MS42NGwxNC4yNy00NS44M2wzNy4wMyw3Ny41OUwxNDUuOTQsNDA1Ljg2eiBNMTg4LjI4LDM5Mi41NgoJCWwtNDIuOTctOTAuMDdsMTQuMjgtNDUuODNsNjAuMTQsMTI2LjAyTDE4OC4yOCwzOTIuNTZ6IE0yMzAuNjQsMzc5LjI2bC02Ni4xLTEzOC41bDMuODktMTIuNDVjNC44NSw5LjQ1LDExLjQ0LDE5LjYzLDE5LjQ3LDMwLjMyCgkJYzEwLjMyLDEzLjcxLDIzLjAyLDI4LjE5LDM3LjQzLDQyLjU5YzIuNjMsMi42NCw1LjI3LDUuMjEsNy45MSw3LjczbDI4Ljg0LDYwLjQ0TDIzMC42NCwzNzkuMjZ6IE0yNzIuOTgsMzY1Ljk1bC0xNy44OS0zNy41CgkJYzkuMDMsNy41LDE3Ljg2LDE0LjE0LDI2LjI2LDE5LjdjNS44MiwzLjg1LDExLjQxLDcuMTMsMTYuOCw5LjlMMjcyLjk4LDM2NS45NXoiLz4KCQoJCTxyZWN0IHg9IjIxMi4yNSIgeT0iMTIyLjUyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjMwOTkgLTAuOTUwOCAwLjk1MDggMC4zMDk5IDUzLjM5MDYgMzI5LjkxMDcpIiBjbGFzcz0ic3QwIiB3aWR0aD0iODMuNDEiIGhlaWdodD0iMTEuMzIiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMzYzLjk2LDI4MC44NiAzNjcuNTEsMjkxLjYyIDQzNC4zNywyNjkuNjUgNDMwLjg0LDI1OC44OSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMwNC45NCwxNjIuMTUgMzE0LjI4LDE2OC41NyAzNjMuMzYsOTcuMzIgMzU0LjA0LDkwLjkgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzMjcuNzUsMjQxLjQ4IDQ0Mi42NCwxNjIuODEgNDM2LjI1LDE1My40NyAzMjEuMzQsMjMyLjE1IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNDg1LjU1LDIxOS42MSA0NjcuMzgsMjMxLjM0IDQ0Ny40MywyMjMuMDIgNDUyLjk2LDI0My45MiA0MzguODcsMjYwLjMzIDQ2MC40NywyNjEuNTIgNDcxLjcyLDI3OS45OSAKCQk0NzkuNTIsMjU5LjgyIDUwMC41NywyNTQuODIgNDgzLjgxLDI0MS4xNiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM3My45MSwxMzkuNDUgMzYzLjEsMTM0Ljk1IDM2Ni4wOSwxNDYuMjcgMzU4LjQ2LDE1NS4xNiAzNzAuMTYsMTU1LjgxIDM3Ni4yNiwxNjUuODIgMzgwLjUsMTU0Ljg5IAoJCTM5MS44OSwxNTIuMTggMzgyLjgsMTQ0Ljc4IDM4My43NiwxMzMuMSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM4Ny4zMiwyNDMuNDUgMzkyLjA1LDI1MS4yMSAzOTUuMzMsMjQyLjc0IDQwNC4xOCwyNDAuNjMgMzk3LjEzLDIzNC44OSAzOTcuODcsMjI1LjgzIDM5MC4yMiwyMzAuNzUgCgkJMzgxLjg0LDIyNy4yNSAzODQuMTUsMjM2LjA1IDM3OC4yNCwyNDIuOTUgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyODguMDMsMTg4Ljc4IDI5Mi43NiwxOTYuNTQgMjk2LjA1LDE4OC4wNiAzMDQuODksMTg1Ljk2IDI5Ny44NCwxODAuMjEgMjk4LjU4LDE3MS4xNSAyOTAuOTMsMTc2LjA4IAoJCTI4Mi41NSwxNzIuNTggMjg0Ljg4LDE4MS4zNyAyNzguOTUsMTg4LjI4IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjE0LjM4LDEyMS41MiAyMTkuMTEsMTI5LjI4IDIyMi4zOSwxMjAuOCAyMzEuMjQsMTE4LjcgMjI0LjE5LDExMi45NiAyMjQuOTMsMTAzLjg5IDIxNy4yOCwxMDguODIgCgkJMjA4Ljg5LDEwNS4zMiAyMTEuMjEsMTE0LjEyIDIwNS4yOSwxMjEuMDIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0MDkuMzMsMzEzLjU2IDQwMy42MywzMDYuNDggNDAxLjQ2LDMxNS4zMSAzOTIuOTcsMzE4LjU0IDQwMC42OSwzMjMuMzIgNDAxLjE0LDMzMi40MSA0MDguMDgsMzI2LjUzIAoJCTQxNi44NSwzMjguOTEgNDEzLjQxLDMyMC41IDQxOC40LDMxMi45IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjc3LjExLDcwLjU4IDI4Ni4wNyw4NS4yNiAyOTIuMjksNjkuMjMgMzA5LjAxLDY1LjI1IDI5NS42OCw1NC40IDI5Ny4wNiwzNy4yNiAyODIuNjEsNDYuNTggCgkJMjY2Ljc1LDM5Ljk2IDI3MS4xNSw1Ni41OCAyNTkuOTQsNjkuNjMgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNjkuNSw2Ni42OCAzNzcuNjYsOTEuNjUgMzkyLjUxLDcwIDQxOC43Nyw2OS45NSA0MDIuNzcsNDkuMTQgNDEwLjg1LDI0LjE2IDM4Ni4xMSwzMi45NCAKCQkzNjQuODMsMTcuNTQgMzY1LjU0LDQzLjc4IDM0NC4zMiw1OS4yNSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjQ2MS4wNywxNjIuNDYgNDc3LjkzLDE1MS4yMyA0OTYuNzYsMTU4Ljc3IDQ5MS4yOSwxMzkuMjYgNTA0LjI3LDEyMy42OCA0ODQuMDEsMTIyLjg1IDQ3My4yMywxMDUuNyAKCQk0NjYuMTYsMTI0LjcgNDQ2LjUyLDEyOS42NiA0NjIuNDIsMTQyLjIzIAkiLz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF8xXyIgZD0iTS0xOTg2Ljk4LDE0Ni4wNGMtNC4zNiwxMi45Ni0xNC4xMywyMS41MS0yMS43OCwxOS4wOGMtNy42NC0yLjM4LTEwLjM3LTE0Ljg2LTUuOTYtMjcuODMKCQkJYzQuMzgtMTIuOTgsMTQuMjEtMjEuNSwyMS44Mi0xOS4wOEMtMTk4NS4yNSwxMjAuNi0xOTgyLjUxLDEzMy4wOC0xOTg2Ljk4LDE0Ni4wNHogTS0xOTcxLjQ4LDEwMS41bC0xMC4wMSw2LjkyCgkJCWMtMTAuNDctOC4yMi0yMC4wNi0xMy4zMS0zOC41MS00LjcyYy0yNS4xMiwxMS42OC00Ni4xNSwxMDEuMzgsMjMuMDUsNzEuODRsMy45Nyw0LjY4bDI3LjIzLDAuN2wxNy44Ny04MS40OEwtMTk3MS40OCwxMDEuNXoKCQkJIE0tMTkwMC45NSwxOTcuNjVjLTkuMSwxOS40My0xNy43NywzMC43NC0yMi44NywzNi4wMmMtNS4xMiw1LjIxLTE1LjIyLDE3LjMxLTM5LjU2LDE2LjRsMi4wOC0xNC44MwoJCQljMjAuNS02LjMzLDMxLjU4LTM0Ljg1LDM3Ljg5LTQ3LjVsLTcuNTMtOTMuMDdsMTUuODMtMC4yMWgxMy4yOWwxLjQ0LDU4LjM4bDI0LjkyLTU4LjM4aDI1LjIzTC0xOTAwLjk1LDE5Ny42NXogTS0yMTEzLjQsMTA1LjkxCgkJCWgyNy41NmM3LjIyLDAsMTIuOTItMS42NiwxNy4wOS00Ljk5YzQuMTItMy4zNSw2Ljg0LTguNDcsOC4zOC0xNS40MmMwLjI0LTEuMjcsMC4zOC0yLjQyLDAuNTctMy41YzAuMDgtMC45OSwwLjIxLTIsMC4yMS0yLjk4CgkJCWMwLTQuOTYtMS43Ny04LjU2LTUuMjktMTAuOGMtMy41Mi0yLjMtOS4wNS0zLjM5LTE2LjY3LTMuMzloLTIzLjQ3TC0yMTEzLjQsMTA1LjkxeiBNLTIxMjguOTQsNDAuODVoNjIuMDUKCQkJYzExLjk1LDAsMjEuMTgsMi42OSwyNy41MSw4LjAzYzYuMzIsNS4zOCw5LjQ5LDEzLjExLDkuNDgsMjMuMjF2MC4yOWMwLDEuOTItMC4xNCw0LjA5LTAuMzEsNi40M2MtMC4zMSwyLjMxLTAuNjgsNC42Ni0xLjIxLDcuMQoJCQljLTIuMzQsMTIuNjItOS4wMywyNC4wMS0xOC44OSwzMi4xOWMtOS44MSw4LjExLTIyLjIsMTIuNDItMzQuOTEsMTIuMTdoLTMzLjI3bC0xMC4yOSw1MC42NWgtMjguODJMLTIxMjguOTQsNDAuODV6CgkJCSBNLTIyOTAuNjEsMTU3LjJjNC4xNy00LjU0LDcuMTYtMTEuNDMsOC45OC0yMC41OWMwLjMxLTEuNDYsMC41NC0yLjkzLDAuNjgtNC40MWMwLjE1LTEuMzUsMC4yMi0yLjcxLDAuMjItNC4wOAoJCQljMC01LjM0LTEuMzQtOS40OC00LjA4LTEyLjRjLTIuNjktMi45Ny02LjUzLTQuNDEtMTEuNTItNC40MWMtNi4xMS0wLjE5LTExLjk5LDIuMzQtMTYuMDYsNi45MmMtNC4yNCw0LjY0LTcuMjMsMTEuNjQtOS4xMiwyMC45NwoJCQljLTAuMjQsMS40My0wLjQ3LDIuODctMC42Niw0LjI3Yy0wLjE0LDEuMzItMC4yLDIuNjUtMC4xOCwzLjk4YzAsNS4yOSwxLjM3LDkuMzcsNC4wOSwxMi4yN2MyLjY4LDIuOSw2LjUxLDQuMzMsMTEuNTIsNC4zMwoJCQlDLTIzMDAuNjEsMTY0LjI1LTIyOTQuNzIsMTYxLjc0LTIyOTAuNjEsMTU3LjJ6IE0tMjMzNS43MiwxNzQuMzJjLTYuMi01Ljk1LTkuMzMtMTMuOTUtOS4zNy0yNC4xMmMwLTEuNzQsMC4xMy0zLjcxLDAuMzQtNS44OAoJCQljMC4yNS0yLjE5LDAuNTMtNC4zMywwLjk0LTYuMzJjMi44MS0xNC4wMyw4LjgxLTI1LjE3LDE4LjAzLTMzLjM5YzkuMTEtOC4yMywyMS4wMS0xMi42NiwzMy4yNy0xMi40CgkJCWMxMC42MywwLDE5LjA5LDIuOTgsMjUuMjYsOC45NWM2LjE3LDUuOTksOS4yNiwxNC4xLDkuMjYsMjQuNDFjMCwxLjc1LTAuMTMsMy43OC0wLjM1LDUuOTljLTAuMjgsMi4yMS0wLjYsNC4zNi0wLjk5LDYuNDMKCQkJYy0yLjc0LDEzLjg1LTguNywyNC44OC0xNy45MywzMi45NGMtOS4xNCw4LjEtMjAuOTksMTIuNDUtMzMuMTksMTIuMTdDLTIzMjEuMTQsMTgzLjEyLTIzMjkuNTYsMTgwLjE4LTIzMzUuNzIsMTc0LjMyegoJCQkgTS0yMzcyLjkyLDYyLjk4aDIzLjg5bC00LjQ3LDIwLjk4aC0yMy44OEwtMjM3Mi45Miw2Mi45OHogTS0yMzgwLjM3LDk0LjQ3aDIzLjY5bC0xOC41Niw4Ni40M2gtMjMuNjJMLTIzODAuMzcsOTQuNDd6CgkJCSBNLTIyMzQuNTksOTQuNDRoMjEuMzhsLTIuNDMsMTIuNDhsMy4wNC0zLjU3YzYuNDMtNy4xOSwxNS42NC0xMS4yNCwyNS4yNy0xMS4xMWM4Ljk4LDAsMTUuNDgsMi42MywxOS41MSw3Ljg5CgkJCWMzLjk4LDUuMjgsNS4xMiwxMi41NSwzLjE4LDIxLjg5bC0xMS43MSw1OC45aC0yMS45NmwxMC42MS01My4zOGMxLjEtNS41MiwwLjgtOS42Mi0wLjg3LTEyLjI3Yy0xLjc1LTIuNjYtNC44Ny0zLjk1LTkuNDUtMy45NQoJCQljLTUuMjYtMC4xNC0xMC4zOCwxLjc0LTE0LjMxLDUuMjVjLTQuMDgsMy45Mi02Ljc3LDkuMDgtNy42NSwxNC42OGwtOS44Nyw0OS42N2gtMjEuOTVMLTIyMzQuNTksOTQuNDR6IE0tMjQ3OS40OSw5NC40NGgyMS4zMgoJCQlsLTIuNCwxMi40OGwzLjA2LTMuNTdjNi40Mi03LjIsMTUuNjMtMTEuMjUsMjUuMjYtMTEuMTFjOC45NiwwLDE1LjQ3LDIuNjMsMTkuNTEsNy44OWM0LjAzLDUuMjgsNS4xMiwxMi41NSwzLjI0LDIxLjg5CgkJCWwtMTEuNzcsNTguOWgtMjEuOTVsMTAuNjEtNTMuMzhjMS4wOS01LjUyLDAuNzgtOS42Mi0wLjg5LTEyLjI3Yy0xLjY4LTIuNjUtNC44NC0zLjk1LTkuNDctMy45NQoJCQljLTUuMjUtMC4xNS0xMC4zNSwxLjczLTE0LjI2LDUuMjVjLTQuMDksMy45My02LjgsOS4wOC03LjcyLDE0LjY4bC05Ljc2LDQ5LjY3aC0yMi4wMkwtMjQ3OS40OSw5NC40NHogTS0yNTA3LjM2LDEzMi41NwoJCQljLTMuMzUsMTYuNC0xMS4wNywyOS4wMi0yMy4xMSwzNy45OWMtMTEuOSw4LjgtMjcuMjQsMTMuMi00Ni4wMywxMy4yMWMtMTcuNjgsMC0zMC42NS00LjUyLTM4LjkzLTEzLjU2CgkJCWMtNS43Mi02LjQxLTguNTctMTQuNTktOC41Ny0yNC40NmMwLjA0LTQuNDMsMC41My04Ljg1LDEuNDUtMTMuMThsMjAuMDItOTYuODRoMzAuMjNsLTE5LjczLDk1Ljc0CgkJCWMtMC41NywyLjQxLTAuODUsNC44OC0wLjgyLDcuMzVjLTAuMjEsNC4zMSwxLjA3LDguNTcsMy42MywxMi4wNWMzLjU5LDQuNjYsOS40LDYuOTksMTcuNTIsNi45OWM5LjI4LDAsMTYuOTUtMi4zLDIyLjkxLTYuODkKCQkJYzUuOTMtNC41OCw5LjgyLTExLjA1LDExLjU3LTE5LjVsMTkuOC05NS43NGgzMC4wOUwtMjUwNy4zNiwxMzIuNTd6IE0tMjAxNi42NywyNTYuODVoODcuOTNsLTUuMTgsMTguMjhoLTI3Ljk4bC00LjgsMTYuOTloMjcuOTcKCQkJbC01LjIxLDE4LjI1aC0zMS4xMWwtNy4wNiwxMC42N2gxNS4yNWwzLjUzLDIxLjQyYzAuNDIsMi4xNCwyLjI4LDMuMTgsNS41MiwzLjE4aDQuNzNsLTUsMTcuNjJoLTE2LjczCgkJCWMtOC42OCwwLjQyLTEzLjE4LTIuNDktMTMuNTctOC44MWwtNC4wNC0xOS41NGwtMTMuODgsMjAuOGMtMi44Miw1LjY1LTguODUsOC45Mi0xNS4xMSw4LjE5aC0yNS41OWw0Ljk3LTE3LjYzaDgKCQkJYzMuMzYtMC4wNyw2LjQ5LTEuNyw4LjQ4LTQuNDFsMjEuNy0zMS40OWgtMjcuOTlsNS4xOS0xOC4yNWgzMC4zN2w0LjgyLTE2Ljk5aC0zMC4zOEwtMjAxNi42NywyNTYuODV6IE0tMjAwOC43MiwyMjAuMzNoMjcuMTYKCQkJbDEuMTYsMTAuMDRjLTAuMTgsMi41NiwxLjMxLDMuOCw0LjU1LDMuOGg0LjhsLTQuODYsMTdoLTE5Ljk1Yy03LjYyLDAuNDEtMTEuNTUtMi41Mi0xMS45MS04LjgyTC0yMDA4LjcyLDIyMC4zM3oKCQkJIE0tMjA3OC41LDMzNi44Mmw1LjUtMTkuNTVoLTIxLjU2bC01LjU0LDE5LjU1SC0yMDc4LjV6IE0tMjA4My45NCwyNzkuNTJsLTcuMzcsMjYuOTZjMCwwLDEzLjkyLTYuODgsMjMuNS03LjQ1CgkJCWMyLjc2LTEwLjQyLDUuNS0xOS41MSw1LjUtMTkuNTFILTIwODMuOTR6IE0tMjA3My4yLDI0MS43M2wtNy4zMiwyNS43NGM3LjU3LTIuODYsMTUuNDEtNC45NSwyMy40LTYuMjIKCQkJYzIuMzktOC45OCw1LjUtMTkuNTMsNS41LTE5LjUzSC0yMDczLjJ6IE0tMjEwNC4zNSwyNDEuNzNsNS43Mi0yMC4xNGgyOC44N2wtMS4yMyw3LjM4YzAsMCwxNC43Mi03LjM4LDI1LjM3LTcuMzhoMzUuNjcKCQkJbC01LjY1LDIwLjE0aC01LjYxbC0yNi45NSw5NS4wOWg1LjYzbC01LjM1LDE4Ljg4aC01LjYxbC0yLjMzLDguMTloLTI3Ljk3bDIuMzMtOC4xOWgtNTUuMTVsNS4zOC0xOC44OGg1LjUybDI2Ljk1LTk1LjA5CgkJCUgtMjEwNC4zNXogTS0yMjA4Ljk4LDMwMi43MmgyNC42M2wtMC40NiwxMC42OWg2LjU1YzMuMzEsMCw0Ljk2LTEuMDUsNC45Ni0zLjE4bDEuOTEtNi45MWgyMC40OGwtMi43NCwxMC4wOAoJCQljLTIuMjksOC40LTguNDMsMTIuNzktMTguMzksMTMuMjJoLTEzLjExbC0wLjA2LDE4LjI2Yy0wLjI0LDIuOTMsMi40LDQuNDMsNy44Miw0LjQzaDEyLjMzbC0zLjk4LDE0LjQ1aC0yOS41NwoJCQljLTguMjcsMC4zOS0xMi4zNy0zLjU2LTEyLjI5LTExLjk4TC0yMjA4Ljk4LDMwMi43MnogTS0yMTgwLjE4LDI4MS4yN2MzLjE3LDAuNDMsNC45MS0wLjgzLDUuMTItMy43OGwyLjYxLTkuNDRoLTQyLjcxCgkJCWwtMy41NywxMy4yMkgtMjE4MC4xOHogTS0yMTY0LjcyLDIzOS43M2gtNDIuNjZsLTUuMSwxNy45YzAsMCw3LjExLTUuMTQsMTguOTctNS4zMmMxMS44My0wLjE4LDI1LjM0LDAsMjUuMzQsMEwtMjE2NC43MiwyMzkuNzN6CgkJCSBNLTIyMDUuMiwyMjAuOThsLTEuMTksMTAuMzFjMCwwLDE0LjIzLTEwLjcsMjcuMTctMTAuN2g0Ny43OWwtMTguMjgsNjYuMzZjLTEuNTIsNy41Ni04LjAyLDExLjM1LTE5LjQ5LDExLjM2aC01NC4xNgoJCQlsLTEyLjY4LDQ2LjU5Yy0wLjc0LDIuNDksMC4zMSwzLjc4LDMuMDMsMy43OGgxMC42NWwtMy45MiwxNC40N2gtMjcuMDljLTEwLjQsMC0xNC43Mi0zLjE0LTEzLjAxLTkuNDVsMzUuODctMTMyLjcxSC0yMjA1LjJ6CgkJCSBNLTIzMjUuNjgsMjY0LjI4aDc1LjUxbC00LjgyLDE3LjYzaC0zMC40bC00LjYxLDE3LjAyaDI5LjU0bC00LjgsMTcuNjNoLTI5LjU3bC02LjgzLDI1LjE2Yy0xLjY5LDQuMiwwLjUzLDYuMDksNi42NSw1LjY2aDI0LjEKCQkJbC00LjQ4LDE2LjM5aC00Ni4yM2MtOC43NCwwLTExLjc1LTUuMDMtOS4wMi0xNS4xbDguOC0zMi4xaC0xOC44OWw0LjgtMTcuNjNoMTguODhsNC42NC0xNy4wMmgtMTguMDVMLTIzMjUuNjgsMjY0LjI4egoJCQkgTS0yMzIwLjk1LDI0MS4wMmg0LjEyYzMuNzgsMCw2LjM0LTEuMjksNy41NC0zLjgxbDEwLjcyLTE2LjExaDI4Ljc2bC01Ljk5LDEwLjU5aDM0LjQzbC00LjM2LDE2LjIzaC00MS4wMQoJCQljLTQuNzIsNy4xNC0xMC41NCwxMC40OC0xNy41NCwxMC4wN2gtMjEuMzNMLTIzMjAuOTUsMjQxLjAyeiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8yXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzNfIiB4PSItNzc0My41NCIgeT0iLTI0MTguNTMiIHdpZHRoPSI5Mzc5LjMxIiBoZWlnaHQ9IjYyNTIuODgiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF81XyIgZD0iTS03NjEuNCwxMDQyLjJoLTI0Ni4zMlY5MDkuNDVoMjQ2LjMyVjEwNDIuMnogTS03NTMuNDEsODg5LjE2aC0yNjIuM2MtNi43OSwwLTEyLjI5LDUuNS0xMi4yOSwxMi4yOQoJCQl2MTQ4Ljc0YzAsNi43OSw1LjUsMTIuMjksMTIuMjksMTIuMjloMjYyLjNjNi43OSwwLDEyLjI5LTUuNSwxMi4yOS0xMi4yOVY5MDEuNDZDLTc0MS4xMiw4OTQuNjctNzQ2LjYyLDg4OS4xNi03NTMuNDEsODg5LjE2eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF82XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QzIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzdfIiB4PSItNjY1MC42NyIgeT0iLTEyNDYuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF84XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF85XyIgZD0iTS04MDguMjYsOTY1LjA1bDEuMTUsNS4xN2wzLjk1LDE3LjI2aC0xNC4xN2gwTC04MDguMjYsOTY1LjA1eiBNLTg0Mi40MSwxMDA3Ljg3CgkJCWMwLjM1LDAuNTIsMC45NSwwLjgzLDEuNiwwLjgzaDEzLjY3YzAuNzksMCwxLjUtMC40NywxLjc4LTEuMTdjMS42OC00LjI0LDIuNzYtNi45MywzLjExLTcuODFjMC45MSwwLDUuMTEsMCw5LjYxLDAuMDFoMC4yNQoJCQljNS4xNywwLjAxLDEwLjY3LDAuMDEsMTEuOTksMC4wMWMwLjM5LDEuNTksMS4zNSw1Ljc5LDEuNzUsNy41MmMwLjE5LDAuODQsMC45NywxLjQzLDEuODYsMS40M2gxMS45MmMwLjU4LDAsMS4xMi0wLjI1LDEuNDktMC42OAoJCQljMC4zNi0wLjQzLDAuNS0wLjk5LDAuMzgtMS41M2wtMTIuOTctNTYuMTNjLTAuMTktMC44My0wLjk3LTEuNDMtMS44Ni0xLjQzaC0xMS42NWMtNC42NiwwLTcuMzMsMS40OC04Ljk0LDQuOTZsLTI0LjE1LDUyLjI1CgkJCUMtODQyLjgyLDEwMDYuNzEtODQyLjc2LDEwMDcuMzYtODQyLjQxLDEwMDcuODd6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzEwXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfOV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3Q1Ij4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzExXyIgeD0iLTY2NTAuNjciIHk9Ii0xMjQ2LjIxIiB3aWR0aD0iODMxOS42MiIgaGVpZ2h0PSI1NTQ2LjQxIi8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMTJfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMTFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF8xM18iIGQ9Ik0tODg5LjEzLDEwMDYuMThjNC45NSwxLjUxLDExLjg3LDIuNDYsMTguNDksMi41MmMwLjAxLDAsMC4wMSwwLDAuMDIsMGMxOS4wMSwwLDMxLjM3LTcuNzcsMzEuNTEtMTkuNzkKCQkJYzAuMDctNi42MS00Ljc2LTExLjYtMTUuMTUtMTUuN2MtNi4zNi0yLjY5LTEwLjI2LTQuNDgtMTAuMjItNy4yMmMwLTIuNDYsMy41Ni00Ljk2LDEwLjQxLTQuOTZjMC4xNywwLDAuMzYsMCwwLjU1LDAKCQkJYzUuNjksMCw5LjcsMS4xMiwxMi4yMywxLjk3YzAuNTksMC4yLDEuMjQsMC4xNSwxLjc5LTAuMTJjMC41NS0wLjI3LDAuOTItMC43NCwxLjAzLTEuMjhsMS43LTguN2MwLjE3LTAuOS0wLjQzLTEuNzctMS40My0yLjA1CgkJCWMtMy4xMi0wLjg3LTguMTctMS45MS0xNC40OS0xLjkxYy0xNy45MSwwLTMwLjQ5LDcuODYtMzAuNTksMTkuMWMtMC4xMSw4LjMzLDguOTksMTIuOTcsMTUuODYsMTUuNzQKCQkJYzcuMDQsMi44Myw5LjQxLDQuNjQsOS4zNyw3LjE4Yy0wLjA1LDMuODgtNS42NCw1LjY1LTEwLjgyLDUuNjVjLTcuMzcsMC0xMS4zNC0wLjk3LTE2Ljk2LTMuMDFjLTAuNTktMC4yMS0xLjI2LTAuMTgtMS44MiwwLjA5CgkJCWMtMC41NiwwLjI3LTAuOTUsMC43NC0xLjA1LDEuMjlsLTEuOCw5LjE2Qy04OTAuNjgsMTAwNS4wMi04OTAuMSwxMDA1Ljg4LTg4OS4xMywxMDA2LjE4eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8xNF8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzEzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDciPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMTVfIiB4PSItNjY1MC42NyIgeT0iLTEyNDYuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8xNl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzE3XyIgZD0iTS05ODQuOTMsOTQ2Ljg5YzEwLjY5LDQuMTgsMTkuNDQsMTAuODEsMjUuMywxOS4xN2MwLjM2LDAuNTIsMC45MiwwLjgsMS40OSwwLjgKCQkJYzAuMjYsMCwwLjUzLTAuMDYsMC43OC0wLjE4YzAuNzktMC4zOSwxLjIzLTEuMzMsMS4wNS0yLjI2bC0zLjExLTE1Ljk3Yy0wLjAxLTAuMDMtMC4wMS0wLjA3LTAuMDItMC4xCgkJCWMtMS4xMi00LjU2LTQuNjYtNS4yNC03LjIzLTUuMzVjLTAuMDIsMC0wLjA1LDAtMC4wNywwbC0xNy41NC0wLjAzYzAsMCwwLDAsMCwwYy0wLjkxLDAtMS42OCwwLjcxLTEuODQsMS42OAoJCQlDLTk4Ni4yOSw5NDUuNi05ODUuNzgsOTQ2LjU1LTk4NC45Myw5NDYuODl6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzE4XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMTdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0OSI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8xOV8iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzIwXyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzE5XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjFfIiBkPSJNLTkyMC4wMiwxMDA4LjA1YzAuMzIsMC40MSwwLjc5LDAuNjUsMS4yOSwwLjY1aDExLjY3YzAuODIsMCwxLjUyLTAuNjQsMS42Ni0xLjUxbDguODctNTYuMTMKCQkJYzAuMDgtMC41My0wLjA1LTEuMDctMC4zNy0xLjQ4Yy0wLjMyLTAuNDEtMC43OS0wLjY1LTEuMjktMC42NWgtMTEuNjhjLTAuODIsMC0xLjUyLDAuNjQtMS42NiwxLjUxbC04Ljg2LDU2LjEzCgkJCUMtOTIwLjQ4LDEwMDcuMS05MjAuMzQsMTAwNy42NC05MjAuMDIsMTAwOC4wNXoiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMjJfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8yMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxMSI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8yM18iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzI0XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzIzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjVfIiBkPSJNLTk3MS4wNCw5NjEuODNjLTAuNjgtMC40OC0xLjYxLTAuNS0yLjMyLTAuMDZjLTAuNywwLjQ1LTEuMDIsMS4yNi0wLjc4LDIuMDJsMTMuODEsNDMuNgoJCQljMC4yNSwwLjc4LDEuMDIsMS4zMSwxLjg5LDEuMzFjMCwwLDAsMCwwLDBsMTUuOTEtMC4wMmMwLjc5LDAsMS41LTAuNDMsMS44MS0xLjFsMjYuMTEtNTYuMWMwLjI2LTAuNTYsMC4yLTEuMjEtMC4xNi0xLjcyCgkJCWMtMC4zNi0wLjUxLTAuOTgtMC44Mi0xLjY1LTAuODJoMGwtMTQuMzYsMC4wMWMtMC44MSwwLTEuNTQsMC40Ni0xLjg0LDEuMTZsLTE2LjgsMzkuNjZsLTEuODEtNi4wNAoJCQljLTAuMDItMC4wOC0wLjA1LTAuMTYtMC4wOS0wLjI0Qy05NTMuOTYsOTc3Ljc5LTk2MS4wOSw5NjguODktOTcxLjA0LDk2MS44M3oiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMjZfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8yNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxMyI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8yN18iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzI4XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzI3XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjlfIiBkPSJNLTQ4MS4wOSw5NzQuNDRjLTIuODUsMC00LjkxLDMuMjctNC45MSw4LjAxYzAsMy4xNiwxLjAzLDQuNzQsMy4yLDQuNzRjMi45NywwLDUuMTQtMy4yNyw1LjE0LTguMTIKCQkJQy00NzcuNjcsOTc2LjAyLTQ3OC45Miw5NzQuNDQtNDgxLjA5LDk3NC40NHogTS00NjguNDIsOTYzLjE2bC00LjkxLDI5LjU3aC02LjA1bDAuMzQtMi4xNGMtMS44MywxLjgxLTMuNTQsMi42LTUuOTMsMi42CgkJCWMtNC42OCwwLTcuNzYtMy45NS03Ljc2LTkuOTNjMC04LjAxLDQuNzktMTQuNzgsMTAuNS0xNC43OGMyLjQsMCw0LjM0LDEuMDIsNi4wNSwzLjI3bDEuMzctOC41OEwtNDY4LjQyLDk2My4xNkwtNDY4LjQyLDk2My4xNnoKCQkJIE0tNDkzLjMsOTc1LjU3Yy0zLjY1LTAuMzQtNC4xMSwyLjQ4LTYuNTEsMTcuMTVoLTYuMzlsMC4zNC0xLjU4YzEuMzctNy40NSwyLjUxLTE1LjAxLDMuMzEtMjIuNDZoNS45MwoJCQljMCwxLjI0LTAuMjMsMi40OC0wLjQ2LDMuNzJjMi4wNS0yLjkzLDMuNTQtNC40LDYuMTYtMy44NEMtNDkxLjcxLDk2OS45My00OTIuNzMsOTcyLjUyLTQ5My4zLDk3NS41N3ogTS01MTUuNDUsOTgyCgkJCWMtMy42NSwwLTUuNDgsMS4yNC01LjQ4LDMuNjFjMCwxLjQ3LDAuOTEsMi40OCwyLjI4LDIuNDhjMi42MiwwLDQuNDUtMi40OCw0LjU3LTYuMDlILTUxNS40NXogTS01MDcuNDYsOTc5Ljk3CgkJCWMtMC41NywzLjUtMS43MSwxMC45NS0xLjk0LDEyLjc1aC01LjI1bDAuMTEtMi40OGMtMS42LDIuMDMtMy43NywyLjkzLTYuNzMsMi45M2MtMy41NCwwLTUuODItMi43MS01LjgyLTYuNTQKCQkJYzAtNS44Nyw0LjExLTkuMjUsMTEuMTktOS4yNWMwLjgsMCwxLjcxLDAsMi42MiwwLjExYzAuMjMtMC43OSwwLjIzLTEuMTMsMC4yMy0xLjQ3YzAtMS42OS0xLjE0LTIuMjYtNC4xMS0yLjI2CgkJCWMtMy4wOCwwLTUuNzEsMC43OS02LjczLDEuMTNjMCwwLDAtMC40NSwwLjkxLTUuNDJjMy4yLTAuOSw1LjI1LTEuMjQsNy42NS0xLjI0YzUuNDgsMCw4LjMzLDIuMzcsOC4zMyw3CgkJCUMtNTA3LDk3Ni40Ny01MDcuMTEsOTc3Ljk0LTUwNy40Niw5NzkuOTd6IE0tNTI2LjUyLDk3MC4zOGMtMi4yOC0xLjEzLTMuODgtMS41OC01LjcxLTEuNThjLTQuNzksMC04LjEsNC42My04LjEsMTEuMDYKCQkJYzAsNC41MSwyLjE3LDcuMjIsNS45NCw3LjIyYzEuNiwwLDMuMzEtMC40NSw1LjQ4LTEuNDdsLTEuMTQsNi42NmMtMi40LDAuNjgtMy44OCwwLjktNS43MSwwLjljLTYuODUsMC0xMS4xOS00Ljg1LTExLjE5LTEyLjc1CgkJCWMwLTEwLjYxLDUuOTQtMTcuOTQsMTQuNS0xNy45NGMyLjc0LDAsNi4wNSwxLjEzLDYuOTYsMS40N0wtNTI2LjUyLDk3MC4zOHogTS01NDkuMzUsOTc1LjU3Yy0zLjU0LTAuMzQtNC4xMSwyLjQ4LTYuMzksMTcuMTUKCQkJaC02LjM5bDAuMzQtMS41OGMxLjI2LTcuNDUsMi41MS0xNS4wMSwzLjMxLTIyLjQ2aDUuODJjMC4xMSwxLjI0LTAuMjMsMi40OC0wLjM0LDMuNzJjMS45NC0yLjkzLDMuNDItNC40LDYuMTYtMy44NAoJCQlDLTU0Ny42Myw5NjkuOTMtNTQ4LjY2LDk3Mi41Mi01NDkuMzUsOTc1LjU3eiBNLTU2OC42NCw5NzcuOTRjMC0wLjQ1LDAuNjgtNC4yOS0yLjk3LTQuMjljLTIuMDYsMC0zLjU0LDEuNTgtNC4xMSw0LjI5SC01NjguNjR6CgkJCSBNLTU2My41LDk4Mi43OWgtMTIuNjdjLTAuNDYsMy41LDEuODMsNC45Niw1LjQ4LDQuOTZjMi4yOCwwLDQuMzQtMC40NSw2LjYyLTEuNThsLTEuMDMsNi4wOWMtMi4xNywwLjU2LTQuMzQsMC45LTYuNTEsMC45CgkJCWMtNy4xOSwwLTEwLjg0LTMuNzItMTAuODQtMTAuNzJjMC04LjI0LDQuNjgtMTQuMjIsMTEuMDctMTQuMjJjNS4yNSwwLDguNjcsMy4zOSw4LjY3LDguNjkKCQkJQy01NjIuNyw5NzguNjItNTYyLjkzLDk4MC40Mi01NjMuNSw5ODIuNzl6IE0tNTgyLjY3LDk2OC42OWwtMC44LDUuODdoLTMuMzFjLTAuNjgsNC41MS0xLjgzLDEwLjI3LTEuODMsMTAuOTUKCQkJYzAsMS4yNCwwLjY4LDEuODEsMi4xNywxLjgxYzAuNjIsMCwxLjIzLTAuMDcsMS44My0wLjIzbC0wLjkxLDUuM2MtMS43MSwwLjU2LTMuMDgsMC43OS00LjU3LDAuNzljLTMuMzEsMC01LjAyLTEuODEtNS4xNC01LjMKCQkJYzAtMS4wMiwwLjQ2LTMuODQsMC45MS02LjMyYzAsMCwwLjM0LTIuMjYsMi44NS0xNi40OGg2LjI4bC0wLjY5LDMuNjFMLTU4Mi42Nyw5NjguNjlMLTU4Mi42Nyw5NjguNjl6IE0tNTk2LjgzLDk3NC4yMgoJCQljLTEuNzEtMC4yMy0zLjQyLTAuMzQtNC42OC0wLjM0Yy0yLjA2LDAtMy4wOCwwLjY4LTMuMDgsMS45MmMwLDEuMTMsMC4yMywxLjQ3LDIuOTcsMi42YzMuMiwxLjQ3LDQuNTcsMy41LDQuNTcsNi43NwoJCQljMCw1LjUzLTMuMiw4LjEyLTkuOTMsOC4wMWMtMy44OCwwLTUuMjUtMC4zNC02LjYyLTAuNjhjMCwwLDAtMC4yMywwLjgtNS41M2MyLjA1LDAuNTYsMy44OCwwLjksNS44MiwwLjkKCQkJYzIuNTEsMCwzLjY1LTAuNjgsMy42NS0yLjE0YzAtMS4xMy0wLjQ2LTEuNDctMi45Ny0yLjcxYy0zLjQyLTEuNTgtNC45MS0zLjYxLTQuOTEtNi42NmMwLTQuNTEsMi40LTguMTIsOS41OS04LjEyCgkJCWMxLjQ4LDAsMy45OSwwLjExLDUuNzEsMC40NUwtNTk2LjgzLDk3NC4yMnogTS02MjIuMjgsOTgyYy0zLjU0LDAtNS4zNiwxLjI0LTUuMzYsMy42MWMwLDEuNDcsMC44LDIuNDgsMi4yOCwyLjQ4CgkJCWMyLjYzLDAsNC40NS0yLjQ4LDQuNTctNi4wOUgtNjIyLjI4eiBNLTYxNC4xOCw5NzkuOTdjLTAuNTcsMy41LTEuODMsMTAuOTUtMS45NCwxMi43NWgtNS4zNmwwLjExLTIuNDgKCQkJYy0xLjYsMi4wMy0zLjc3LDIuOTMtNi42MiwyLjkzYy0zLjU0LDAtNS45NC0yLjcxLTUuOTQtNi41NGMwLTUuODcsNC4yMi05LjI1LDExLjMtOS4yNWMwLjY5LDAsMS42LDAsMi42MywwLjExCgkJCWMwLjExLTAuNzksMC4yMy0xLjEzLDAuMjMtMS40N2MwLTEuNjktMS4xNC0yLjI2LTQuMTEtMi4yNmMtMy4yLDAtNS43MSwwLjc5LTYuNzMsMS4xM2MwLDAsMC0wLjQ1LDAuOC01LjQyCgkJCWMzLjItMC45LDUuMzYtMS4yNCw3LjY1LTEuMjRjNS41OSwwLDguNDUsMi4zNyw4LjQ1LDdDLTYxMy43Miw5NzYuNDctNjEzLjk1LDk3Ny45NC02MTQuMTgsOTc5Ljk3eiBNLTYzMi42Nyw5NjMuMTZsLTUuMDIsMjkuNTcKCQkJaC02LjM5bDMuNjUtMjIuNjhsLTguMSwyMi42OGgtNC40NWwtMC40Ni0yMi41N2wtMy44OCwyMi41N2gtNi4wNWw1LjAyLTI5LjU3aDkuMjVsMC4yMywxOC4zOWw2LjI4LTE4LjM5SC02MzIuNjd6CgkJCSBNLTUyNC4yNCw5MTYuNDRjLTE0LjA0LDAtMjYuOTQsNC42My0zNy40NCwxMi40MWM5LjM2LDguNDYsMTYuMjEsMTkuNTIsMTkuNTIsMzIuMDVoLTUuNzFjLTMuMzEtMTEuMTctOS41OS0yMC45OS0xOC4wMy0yOC41NQoJCQljLTguNDUsNy41Ni0xNC43MiwxNy4zOC0xOC4wMywyOC41NWgtNS43MWMzLjMxLTEyLjUzLDEwLjE2LTIzLjU5LDE5LjUyLTMyLjA1Yy0xMC41LTcuNzktMjMuNC0xMi40MS0zNy40NC0xMi40MQoJCQljLTM0LjM2LDAtNjIuMDksMjcuNTMtNjIuMDksNjEuMzlzMjcuNzQsNjEuMzksNjIuMDksNjEuMzljMTQuMDQsMCwyNi45NC00LjYzLDM3LjQ0LTEyLjQxYy04Ljc5LTguMDEtMTUuNDEtMTguMjgtMTguODMtMjkuNzkKCQkJaDUuNzFjMy40MiwxMC4xNiw5LjQ3LDE5LjMsMTcuMzUsMjYuMjljNy44OC03LDEzLjkyLTE2LjE0LDE3LjM1LTI2LjI5aDUuNzFjLTMuNDIsMTEuNTEtMTAuMDQsMjEuNzgtMTguODMsMjkuNzkKCQkJYzEwLjUsNy43OSwyMy40LDEyLjQxLDM3LjQ0LDEyLjQxYzM0LjM2LDAsNjIuMDktMjcuNTMsNjIuMDktNjEuMzlTLTQ4OS44OCw5MTYuNDQtNTI0LjI0LDkxNi40NHogTS00MzQuNDEsMTA1MC4wNAoJCQljMCw3LjktNi42MiwxNC40NC0xNC42MSwxNC40NGgtMjMzLjc2Yy03Ljk5LDAtMTQuNjEtNi41NC0xNC42MS0xNC40NFY5MDUuNjFjMC03LjksNi42Mi0xNC40NCwxNC42MS0xNC40NGgyMzMuNzYKCQkJYzcuOTksMCwxNC42MSw2LjU0LDE0LjYxLDE0LjQ0VjEwNTAuMDR6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzMwXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMjlfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MTUiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMzFfIiB4PSItNjYzNC42NyIgeT0iLTEyNDQuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8zMl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzMzXyIgZD0iTS0xNTkuOTYsOTkzLjU1Yy0wLjQ1LDAuMTEtMS40OSwwLjIzLTIuMDYsMC4yM2gtMTcuNTl2LTE1LjY1aDE3LjU5YzAuNTcsMCwxLjYxLDAuMTEsMi4wNiwwLjIyCgkJCWMzLjQ1LDAuNjgsNi4yMiwzLjY5LDYuMjIsNy42Qy0xNTMuNzQsOTg5Ljk3LTE1Ni41LDk5Mi44OC0xNTkuOTYsOTkzLjU1eiBNLTE3OS42MSw5NTQuODdoMTUuOTljMC41NywwLDEuMzcsMC4xMSwxLjczLDAuMTEKCQkJYzMuMzMsMC41Niw2LjA4LDMuMjQsNi4wOCw3LjE1YzAsMy45MS0yLjc1LDYuNDktNi4wOCw3LjA0Yy0wLjM1LDAuMTEtMS4xNiwwLjExLTEuNzMsMC4xMWgtMTUuOTlWOTU0Ljg3eiBNLTE0NS4zNiw5NzMuODh2LTAuMzMKCQkJYzguOTYtMS4yMywxMy45MS02LjkzLDEzLjkxLTEzLjUyYzAtOC41LTcuMjQtMTMuNDItMTcuMDEtMTMuODdjLTAuNjksMC0xLjk0LTAuMTEtMi45OC0wLjExaC01Mi4zdjU3aDU2LjQzCgkJCWMxMS4xNCwwLDE5LjQyLTUuODEsMTkuNDItMTQuODZDLTEyNy44OCw5NzkuOTItMTM1LjQ3LDk3NC41NS0xNDUuMzYsOTczLjg4eiBNLTI4OC4xMSw5NzQuNTVjMCwxNi4yMSwxMS41LDMxLjc0LDUxLjk0LDI5Ljk2CgkJCWMwLDAsMTEuNjEtMC40NSwyMy45MS0zLjQ3di0xMi42M2MtNS45NywzLjAyLTEzLjU2LDUuOTItMjIuOTksNi42Yy0xNi41NCwxLjIyLTI2LjQyLTYuNi0yNi40Mi0yMC40NnM5Ljg5LTIxLjY4LDI2LjQyLTIwLjQ2CgkJCWM5LjQzLDAuNjgsMTYuOTEsMy40NywyMi45OSw2LjQ5di0xMi41MWMtMTIuMy0zLjAyLTIzLjkxLTMuNDctMjMuOTEtMy40N0MtMjc2LjYxLDk0Mi44MS0yODguMTEsOTU4LjM1LTI4OC4xMSw5NzQuNTV6CgkJCSBNLTMyMC41MSw5ODAuNDdjMCw4LjM4LTUuODYsMTQuNjQtMTYuNDQsMTQuNjRjLTguOTYsMC0xNy44MS0yLjU3LTI2LjMyLTYuNTl2MTIuNTFjMTMuNzksMy42OSwzMS4yNywzLjY5LDMxLjI3LDMuNjkKCQkJYzI5LjE5LDAsMzcuNy0xMC44NCwzNy43LTI0LjI2di0zNC40MmgtMjYuMjFWOTgwLjQ3eiBNLTEyMy40MiwxMDQ2LjQxYzAsNS4zNi00LjY2LDkuODktMTAuMTcsOS44OWgtMjMwLjAyCgkJCWMtNS41MSwwLTEwLjE3LTQuNTMtMTAuMTctOS44OVY5MDYuNmMwLTUuMzYsNC42Ni05Ljg5LDEwLjE3LTkuODloMjMwLjAyYzUuNTEsMCwxMC4xNyw0LjUzLDEwLjE3LDkuODlWMTA0Ni40MXogTS0xMjAuNDcsODkzLjg1CgkJCWMtMy41My0zLjQzLTguMTktNS4zMi0xMy4xMS01LjMyaC0yMzAuMDJjLTQuOTMsMC05LjU4LDEuODktMTMuMTEsNS4zMmMtMy41MywzLjQzLTUuNDcsNy45Ni01LjQ3LDEyLjc1djEzOS44MQoJCQljMCw0Ljc5LDEuOTQsOS4zMiw1LjQ3LDEyLjc1YzMuNTMsMy40Myw4LjE5LDUuMzIsMTMuMTEsNS4zMmgyMzAuMDJjNC45MywwLDkuNTgtMS44OSwxMy4xMS01LjMyYzMuNTMtMy40Myw1LjQ3LTcuOTYsNS40Ny0xMi43NQoJCQlWOTA2LjZDLTExNSw5MDEuODEtMTE2Ljk0LDg5Ny4yOS0xMjAuNDcsODkzLjg1eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8zNF8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzMzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDE3Ij4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzM1XyIgeD0iLTY3MDUuMzMiIHk9Ii0xMjc5LjI5IiB3aWR0aD0iODQ0Ni4wNiIgaGVpZ2h0PSI1NjMwLjciLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8zNl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzM3XyIgZD0iTTE3NS42OCw5MzcuNzZILTQwLjU1di0xNS41MmMwLTkuNjUsNy44LTE3LjQ5LDE3LjM5LTE3LjQ5aDE4MS40NmM5LjU5LDAsMTcuMzksNy44NCwxNy4zOSwxNy40OVY5MzcuNzZ6CgkJCSBNMTc1LjY4LDEwMzAuOTdjMCw5LjY1LTcuOCwxNy40OS0xNy4zOSwxNy40OUgtMjMuMTZjLTkuNTksMC0xNy4zOS03Ljg0LTE3LjM5LTE3LjQ5di02OS45aDIxNi4yNFYxMDMwLjk3eiBNMTU4LjI5LDg4OS4yCgkJCUgtMjMuMTZDLTQxLjI5LDg4OS4yLTU2LDkwNC01Niw5MjIuMjN2MTA4LjczYzAsMTguMjQsMTQuNzEsMzMuMDMsMzIuODQsMzMuMDNoMTgxLjQ2YzE4LjEzLDAsMzIuODQtMTQuNzksMzIuODQtMzMuMDNWOTIyLjIzCgkJCUMxOTEuMTMsOTA0LDE3Ni40Miw4ODkuMiwxNTguMjksODg5LjJ6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzM4XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMzdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MTkiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMzlfIiB4PSItMzk4NS40NyIgeT0iLTI0MTcuOTkiIHdpZHRoPSI4MzkwLjMzIiBoZWlnaHQ9IjU1OTMuNTUiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80MF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zOV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHJlY3QgaWQ9IlNWR0lEXzQxXyIgeD0iLTQ5LjAxIiB5PSI5NTkuMTIiIHdpZHRoPSIyMzAuNzMiIGhlaWdodD0iOTAuOSIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF80Ml8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzQxXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDIxIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzQzXyIgeD0iLTM5ODUuNDciIHk9Ii0yNDE3Ljk5IiB3aWR0aD0iODM5MC4zMyIgaGVpZ2h0PSI1NTkzLjU1Ii8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfNDRfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNDNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxyZWN0IGlkPSJTVkdJRF80NV8iIHg9IjgzLjg0IiB5PSI5NTkuMTIiIHdpZHRoPSI5MC45IiBoZWlnaHQ9IjM0Ljk2Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzQ2XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNDVfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MjMiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfNDdfIiB4PSItMzk4NS40NyIgeT0iLTI0MTcuOTkiIHdpZHRoPSI4MzkwLjMzIiBoZWlnaHQ9IjU1OTMuNTUiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80OF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF80N18iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=\" alt=\"\u60A8\u7684\u8A02\u55AE\u5DF2\u5B8C\u6210\u4ED8\u6B3E\uFF01\" />\n                        </div>\n                        <a class=\"form__btn\" href=\"index.html\"><span>\u78BA\u8A8D</span></a>\n                    </div>\n                \n                </div>\n            </div>\n        ";
              document.querySelector(".checkout").style.display = 'none';
            }

            cart__form.insertAdjacentHTML('afterBegin', table__content);

            if (count === 1) {
              aftercheckout();
            } else if (count === 2) {
              onchangepay();
              payment();
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _outcheck.apply(this, arguments);
}

function onchangepay() {
  return _onchangepay.apply(this, arguments);
}

function _onchangepay() {
  _onchangepay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var shipOption;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shipOption = document.getElementsByName("pay");
            shipOption.forEach(function (element) {
              console.log(element);
              element.addEventListener("click", function (i) {
                if (i.target.value === "home") {
                  document.querySelector(".door__option").style.display = "none";
                } else {
                  document.querySelector(".door__option").style.display = "block";
                }
              });
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _onchangepay.apply(this, arguments);
}

function aftercheckout() {
  return _aftercheckout.apply(this, arguments);
}

function _aftercheckout() {
  _aftercheckout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var small_count, totalllllll, TOTAL, mins_detail, add__input, del__btn, PRICE, addtext, getdataset, add_detail, update__total;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            update__total = function _update__total() {
              var totallll = 0;
              Array.from(small_count).forEach(function (element, i) {
                // console.log(element.dataset.total)
                totallll += parseInt(element.dataset.total);
              }); // totallll.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              // let total__c = totalllllll.text;
              // function separator(numb) {
              //     console.log(total__c);
              //     var str = numb.toString().split(".");
              //     console.log(str);
              //     str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              //     return str.join(".");
              // }
              // console.log(separator(total__c))

              totalllllll.innerHTML = (0, _main.convert)(totallll);
            };

            getdataset = function _getdataset7(element) {
              var id = parseInt(element.dataset.id);
              var color = element.dataset.color;
              var size = element.dataset.size;
              return [id, color, size];
            };

            small_count = document.querySelectorAll('.small_count');
            totalllllll = document.querySelector('#total__yen');
            TOTAL = 0; // console.log(total__c.replace(/\B(?=(\d{3})+(?!\d))/g, ",")) 
            // console.log(convert(parseInt(totalllllll.innerHTML)))

            update__total(); // detail add

            mins_detail = document.querySelectorAll(".js-detail-mins");
            add__input = document.querySelectorAll("#add__input");
            del__btn = document.querySelectorAll(".productTag-item");
            PRICE = document.querySelectorAll('.item__price');
            addtext = document.getElementById("checkout__form");
            // console.log(small_count[0])
            Array.from(mins_detail).forEach(function (element, i) {
              // console.log('increa',i)
              element.addEventListener('click', function (ev) {
                ev.preventDefault();

                if (parseInt(add__input[i].value) <= 1) {
                  add__input[i].value = parseInt(1);
                } else {
                  add__input[i].value = parseInt(add__input[i].value) - parseInt(1);
                } // console.log(PRICE.dataset.price);


                small_count[i].innerHTML = "";
                small_count[i].innerHTML = (0, _main.convert)(add__input[i].value * PRICE[i].dataset.price);
                small_count[i].setAttribute("data-total", add__input[i].value * PRICE[i].dataset.price);

                var _getdataset = getdataset(element.parentElement),
                    _getdataset2 = _slicedToArray(_getdataset, 3),
                    id = _getdataset2[0],
                    color = _getdataset2[1],
                    size = _getdataset2[2];

                _shoppingCart.default.reduce(id, 1, color, size);

                _shoppingCart.default.count__cart();

                update__total();
              });
            });
            add_detail = document.querySelectorAll(".js-detail-add");
            Array.from(add_detail).forEach(function (element, i) {
              // console.log('increa',i)
              element.addEventListener('click', function (ev) {
                ev.preventDefault();
                add__input[i].value = parseInt(add__input[i].value) + parseInt(1);
                small_count[i].innerHTML = "";
                var mul = parseInt(add__input[i].value * PRICE[i].dataset.price); // console.log(convert(mul));

                small_count[i].innerHTML = (0, _main.convert)(mul);
                small_count[i].setAttribute("data-total", mul);

                var _getdataset3 = getdataset(element.parentElement),
                    _getdataset4 = _slicedToArray(_getdataset3, 3),
                    id = _getdataset4[0],
                    color = _getdataset4[1],
                    size = _getdataset4[2];

                _shoppingCart.default.increase(id, 1, color, size);

                _shoppingCart.default.count__cart();

                update__total();
              });
            });
            // del
            Array.from(del__btn).forEach(function (element, i) {
              element.addEventListener('click', function (ev) {
                ev.preventDefault();

                var _getdataset5 = getdataset(element),
                    _getdataset6 = _slicedToArray(_getdataset5, 3),
                    id = _getdataset6[0],
                    color = _getdataset6[1],
                    size = _getdataset6[2];

                _shoppingCart.default.remove(id, color, size);

                addtext.removeChild(document.querySelectorAll(".table__row")[i]);

                _shoppingCart.default.count__cart();
              });
            }); // const modals = document.querySelectorAll("[data-modal]");
            //     modals.forEach(function (trigger) {
            //     trigger.addEventListener("click", function (event) {
            //         event.preventDefault();
            //         const modal = document.getElementById(trigger.dataset.modal);
            //         modal.classList.add("open");
            //         const exits = modal.querySelectorAll(".modal-exit");
            //         exits.forEach(function (exit) {
            //         exit.addEventListener("click", function (event) {
            //             event.preventDefault();
            //             modal.classList.remove("open");
            //         });
            //         });
            //     });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _aftercheckout.apply(this, arguments);
}

function payment() {
  return _payment.apply(this, arguments);
} // ※付款後，1-3 個工作天內出貨。訂單之預購商品，最晚將於 2020/01/30 前出貨，出貨後將以 Email 通知您。
// ※結帳若含多商品，為加速出貨速度，商品可能分開出貨。
// ※到貨另需 2-4 天，恕無法指定日期，您也可於訂單查詢追蹤配送進度。


function _payment() {
  _payment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var tt;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tt = document.querySelector(".vvv");
            tt.addEventListener("click", function () {
              var shipOption = document.getElementsByName("pay");

              var _iterator = _createForOfIteratorHelper(shipOption),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var radio = _step.value;

                  if (radio.checked) {
                    console.log(radio.value);
                    addOption = radio.value;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _payment.apply(this, arguments);
}
},{"./shoppingCart.js":"QiuZ","./main.js":"epB2"}]},{},["Je6K"], null)
//# sourceMappingURL=/checkout.feeddb05.js.map