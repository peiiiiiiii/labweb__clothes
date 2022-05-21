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
})({"JkLK":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// const header = document.querySelector('.put__video'),
// text = document.querySelector('.scoll__text'),
// content = document.querySelector('.section-about');
// sectionOffset = content.offsetTop,
// headerHeight = header.offsetHeight;
var points = document.querySelectorAll(".shogun-draggable-block__product__title");
var dot = document.querySelectorAll(".shogun-draggable-block__product");
var dot2 = document.querySelectorAll(".shogun-draggable-block__hotspot"); // slider

var Slider = /*#__PURE__*/function () {
  function Slider(sliderElem) {
    _classCallCheck(this, Slider);

    this.slider = sliderElem;
    this.sliderItems = sliderElem.getElementsByClassName("slider-item");
    this.indicators = sliderElem.getElementsByClassName("slide-indicator");
    this.nextBtn = sliderElem.querySelector(".slider-control-next");
    this.prevBtn = sliderElem.querySelector(".slider-control-prev");
    this.currentIndex = 0;
    this.prevItemIndex = this.sliderItems.length - 1;
    this.nextItemIndex = 1;
    this.isSliding = false; // Set Item Indexs if active class is specified on an element other than the first.

    for (var i = 0; i < this.sliderItems.length; i++) {
      if (this.sliderItems[i].classList.contains("active")) {
        this.currentIndex = i;

        if (i + 1 === this.sliderItems.length) {
          this.nextItemIndex = 0;
        }

        this.nextItemIndex = i + 1;

        if (i !== 0) {
          this.prevItemIndex = i - 1;
        }

        break;
      }
    }

    this.setEventListeners();
    this.indicators[this.currentIndex].classList.add("active");
  }

  _createClass(Slider, [{
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this.prevBtn.addEventListener("click", function () {
        _this.prev();
      });
      this.nextBtn.addEventListener("click", function () {
        _this.next();
      });
    }
  }, {
    key: "setIndices",
    value: function setIndices(direction) {
      var index;

      if (direction === "NEXT") {
        index = this.currentIndex === this.sliderItems.length - 1 ? 0 : this.currentIndex + 1;
      }

      if (direction === "PREV") {
        index = this.currentIndex === 0 ? this.sliderItems.length - 1 : this.currentIndex - 1;
      }

      if (index === 0) {
        this.currentIndex = index;
        this.nextItemIndex = index + 1;
        this.prevItemIndex = this.sliderItems.length - 1;
      } else if (index === this.sliderItems.length - 1) {
        this.currentIndex = this.sliderItems.length - 1;
        this.nextItemIndex = 0;
        this.prevItemIndex = this.currentIndex - 1;
      } else {
        this.currentIndex = index;
        this.nextItemIndex = index + 1;
        this.prevItemIndex = index - 1;
      }
    }
  }, {
    key: "next",
    value: function next() {
      var _this2 = this;

      if (this.isSliding) return;
      this.isSliding = !this.isSliding;
      this.sliderItems[this.nextItemIndex].classList.add("next-item");
      setTimeout(function () {
        _this2.sliderItems[_this2.currentIndex].classList.add("slide-next");

        _this2.sliderItems[_this2.nextItemIndex].classList.add("slide-end");

        _this2.sliderItems[_this2.nextItemIndex].classList.add("active");
      }, 20);
      setTimeout(function () {
        _this2.sliderItems[_this2.nextItemIndex].classList.remove("next-item", "slide-end");

        _this2.sliderItems[_this2.currentIndex].classList.remove("slide-next", "active");

        _this2.indicators[_this2.currentIndex].classList.remove("active");

        _this2.indicators[_this2.nextItemIndex].classList.add("active");

        _this2.setIndices("NEXT");

        _this2.isSliding = false;
      }, 400);
    }
  }, {
    key: "prev",
    value: function prev() {
      var _this3 = this;

      if (this.isSliding) return;
      this.isSliding = !this.isSliding;
      this.sliderItems[this.prevItemIndex].classList.add("prev-item");
      setTimeout(function () {
        _this3.sliderItems[_this3.currentIndex].classList.add("slide-prev");

        _this3.sliderItems[_this3.prevItemIndex].classList.add("slide-end");

        _this3.sliderItems[_this3.prevItemIndex].classList.add("active");
      }, 20);
      setTimeout(function () {
        _this3.sliderItems[_this3.prevItemIndex].classList.remove("prev-item", "slide-end");

        _this3.sliderItems[_this3.currentIndex].classList.remove("slide-prev", "active");

        _this3.indicators[_this3.currentIndex].classList.remove("active");

        _this3.indicators[_this3.prevItemIndex].classList.add("active");

        _this3.setIndices("PREV");

        _this3.isSliding = false;
      }, 400);
    }
  }]);

  return Slider;
}();

document.addEventListener('DOMContentLoaded', function () {
  // document.addEventListener('scroll', function() {
  //   const scrollVal = window.scrollY ;
  //   if(scrollVal < 800) {
  //     text.style.opacity = 1 - ( scrollVal / headerHeight);
  //     header.style.filter = 'grayscale('+ 1.5 * scrollVal / headerHeight +')';
  //     text.style.transform = `translateY(${scrollVal / 3}px)`;
  //     console.log('dziala');
  //   }
  // })
  var slider = new Slider(document.querySelector(".slider"));
  points.forEach(function (img, i) {
    img.addEventListener("mouseover", function (e) {
      // const captionElement = e.target.parentElement;
      // console.log(captionElement)
      dot[i].classList.add("active");
      console.log(dot[i]);
      dot2[i].classList.add("active");
    });
  });
  points.forEach(function (img, i) {
    img.addEventListener("mouseleave", function (e) {
      dot[i].classList.remove("active");
      dot2[i].classList.remove("active");
    });
  });
});
},{}]},{},["JkLK"], null)
//# sourceMappingURL=/home.70aed714.js.map