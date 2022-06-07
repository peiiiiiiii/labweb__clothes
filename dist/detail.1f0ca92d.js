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
},{"./main.js":"epB2"}],"FUi9":[function(require,module,exports) {
"use strict";

var _shoppingCart = _interopRequireWildcard(require("./shoppingCart.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import dis2 from "./main";
var token = localStorage.getItem('token'); // Array.from(moblie_toogle).forEach((element,i) => {
//     element.addEventListener('click', (l)=>{
//         element.classList.toggle("is-active");
//         document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
//         document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
//     });
// });
// get url

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var productID = urlParams.get('id'); // new
// <div class="btn__box detail__btn js-add-cart">

// let PRODUCTS = [];
document.addEventListener('DOMContentLoaded', function () {
  // getProducts( showProducts, errorMessage );
  doAjaxThings(1);
  doAjaxThings(2);

  _shoppingCart.default.init();

  (0, _shoppingCart.showCart)();
  (0, _shoppingCart.incres)();
  (0, _shoppingCart.decrea)(); // plus_item.addEventListener("click" , function(ev){
  //     ev.preventDefault();
  //     let id = parseInt(ev.target.getAttribute('data-id'));
  //     CART.increase(id, 1);
  //     let controls = ev.target.parentElement;
  //     let qty = controls.querySelector('div:nth-child(2)');
  //     let item = CART.find(id);
  //     if(item){
  //         qty.textContent = item.qty;
  //     }else{
  //         document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement);
  //     }
  // });
});

function doAjaxThings(_x) {
  return _doAjaxThings.apply(this, arguments);
} //猜你喜歡
// function getProducts(){
//     const res = {
//         id:123,
//         title:"Bell",
//         desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//         img:"bell-lg.png",
//         price:12.34,
//     }
//     showProducts(res);
//     const slider = new Slider(
//         document.querySelector(".slider")
//     );
// }


function _doAjaxThings() {
  _doAjaxThings = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    var src, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            src = ''; // console.log('getp'+params);

            if (params == 1) {
              // console.log(params);
              src = "https://localhost:7206/api/Commodity/GetCommodity/full_info/" + productID, params;
            } else {
              src = "https://localhost:7206/api/Commodity/GetRandom/4";
            } // console.log(src);


            _context.next = 4;
            return makeRequest("GET", src, params);

          case 4:
            result = _context.sent;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _doAjaxThings.apply(this, arguments);
}

function getProducts(res, params) {
  // console.log(params,res)
  if (params == 1) {
    var showcartlist = function showcartlist(element) {
      element.style.display = "block";
      element.classList.add("is-open");
      element.classList.remove("out");
    };

    (0, _shoppingCart.showProducts)(res);
    var slider = document.getElementById('slider'),
        sliderItems = document.getElementById('slides'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next');
    slide(slider, sliderItems, prev, next); // detail add

    var mins_detail = document.querySelector(".js-detail-mins");
    var add__input = document.querySelector("#add__input");
    mins_detail.addEventListener("click", function (ev) {
      ev.preventDefault();

      if (parseInt(add__input.value) <= 1) {
        add__input.value = parseInt(1);
      } else {
        add__input.value = parseInt(add__input.value) - parseInt(1);
      }
    });
    var add_detail = document.querySelector(".js-detail-add");
    add_detail.addEventListener("click", function (ev) {
      ev.preventDefault();
      add__input.value = parseInt(add__input.value) + 1;
    });
    var add__cart = document.querySelector(".js-add-cart");
    var input__q = document.querySelector("#add__input");
    var navbtn = document.querySelector(".js-header-nav");
    var bgheader = document.querySelector(".js-header-bg");
    var header__side = document.querySelector(".js-header-cartArea");
    var final__size = document.getElementsByName('option-size');
    var final__color = document.getElementsByName('option-color');
    var SIZE = '';
    var COLOR = ''; // cart show

    console.log('hihih');
    add__cart.addEventListener("click", function (e) {
      e.preventDefault(); // size

      for (var i in final__size) {
        if (final__size[i].checked) {
          SIZE = final__size[i].value;
          break;
        }
      } // color


      for (var _i in final__color) {
        if (final__color[_i].checked) {
          COLOR = final__color[_i].value;
          break;
        }
      } // console.log(COLOR);
      // color


      var qty_input = parseInt(input__q.value);
      (0, _shoppingCart.addItem)(e, qty_input, SIZE, COLOR); // location.reload();

      navbtn.classList.toggle("is-active");
      showcartlist(header__side);
      showcartlist(bgheader);
      (0, _shoppingCart.incres)();
      (0, _shoppingCart.decrea)();
    }); // size
    // for (var i = 0, length = radios.length; i < length; i++) {
    // if (radios[i].checked) {
    //     // do whatever you want with the checked radio
    //     alert(radios[i].value);
    //     // only one radio can be logically checked, don't check the rest
    //     break;
    // }
    // }
  } else {
    // console.log('gogo');
    (0, _shoppingCart.showProducts2)(res);
  }
}

function makeRequest(method, url, params) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');

    if (token != null) {
      xhr.setRequestHeader('Authorization', token);
    }

    if (method == "GET") {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(params));
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response)); // console.log(JSON.parse(xhr.response));

        var res = JSON.parse(xhr.response);
        getProducts(res, params); // console.log(xhr.responseText);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
  });
}

function errorMessage(err) {
  //display the error message to the user
  console.error(err);
} // slider


function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide); // wrapper.classList.add('loaded');
  // Mouse events

  items.onmousedown = dragStart; // Touch events

  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction); // Click events

  prev.addEventListener('click', function () {
    shiftSlide(-1);
  });
  next.addEventListener('click', function () {
    shiftSlide(1);
  }); // Transition events

  items.addEventListener('transitionend', checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      console.log(posInitial - slideSize);
      console.log(posInitial - slideSize);

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    ;
    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}
},{"./shoppingCart.js":"QiuZ"}]},{},["FUi9"], null)
//# sourceMappingURL=/detail.1f0ca92d.js.map