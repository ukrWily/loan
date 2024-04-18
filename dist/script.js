/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ difference)
/* harmony export */ });
class difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.items = items;
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (error) {}
  }
  bindTriggers(container, items, counter) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        items[counter].classList.add("animated", "slideInUp");
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[counter].classList.add("animated", "fadeIn");
        items[items.length - 1].remove();
      }
    });
  }
  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }
  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (error) {}
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Loading...",
      success: "Thank you! we'll call you soon.",
      failure: "Something going wrong... :("
    };
    this.path = "assets/question.php";
  }
  clearInputs() {
    this.inputs.forEach(input => {
      input.value = "";
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener("keypress", function (e) {
        /**check for only cyrillic letters in any register and numbers */
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    let setCursorPosition = (pos, elem) => {
      /**встановлюємо фокус */
      // elem.focus();

      if (elem.setSelectionRange) {
        /**встановлюємо курсор */
        /**.setSelectionRange - встановлює рамки виділення тексту,
         * якщо дві координати збігаються- замість виділення там буду встановлен курсор
         */
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };
    function createMask(event) {
      // console.log(event);
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  }
  init() {
    this.initMask();
    this.checkMailInputs();
    this.forms.forEach(item => {
      item.addEventListener("submit", e => {
        e.preventDefault();
        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
        margin-top: 15px;
        font-size: 18px;
        color:grey;
        `;
        item.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(item);
        this.postData(this.path, formData).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(() => {
          statusMessage.textContent = this.message.failure;
        }).finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 6000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    /**
     * Прив'язуємо до this бо при створенні нового екземпляра класа this буде губитись
     */
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(".module__video-item").nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (error) {}
      btn.addEventListener("click", () => {
        /**
         * Або нема такого елемента або е з даним атрибутом
         */
        if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true") {
          this.activeBtn = btn;
          /**
           * if already created- just show, else- create
           */
          if (document.querySelector("ifarme#frame")) {
            this.overlay.style.display = "flex";
            /**
             * if choice another video- create new player
             */
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      // this.player.stopVideo();
      this.player.destroy();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onStateChange: this.onPlayerStateChange
      }
    });
    this.overlay.style.display = "flex";
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);
      if (state.data === 0) {
        if (blockedElem.querySelector(".play__circle").classList.contains("closed")) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem.querySelector(".play__text").classList.remove("attention");
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = "none";
          blockedElem.setAttribute("data-disabled", "false");
        }
      }
    } catch (error) {}
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns, prevModule, nextModule) {
    super(btns, prevModule, nextModule);
  }

  // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson.style.opacity = "0";
      if (n === 3) {
        this.hanson.classList.add("animated");
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
        }, 3000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch (error) {}
    Array.from(this.slides).forEach(slide => {
      slide.style.display = "none";
    });
    this.slides[this.slideIndex - 1].style.display = "block";
  }
  // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>

  bindTriggers() {
    this.btns.forEach(item => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });
      /** when click logo -> open first page */
      item.parentNode.previousElementSibling.addEventListener("click", e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.prevModule.forEach(item => {
      item.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
    // this.nextModule.forEach((item) => {
    //   item.addEventListener("click", (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     this.plusSlides(1);
    //   });
    // });
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (error) {}

      // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SliderMini)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class SliderMini extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }
  decorizeSlides() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__title").style.textShadow = "";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });
    /**
     * Оскільки кнопки в одному блоці зі слайдами,
     * відфільтровуємо їх
     */
    if (!this.slides[0].closest("button")) {
      this.slides[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__title").style.textShadow = "0 1px 2px black";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }
  nextSlide() {
    // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
    /**
     * Оскільки кнопки в одному блоці зі слайдами,
     * відфільтровуємо їх
     */
    if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
      for (let i = 3; i > 0; i--) {
        this.container.appendChild(this.slides[0]); //slide
        this.decorizeSlides();
      }
      // this.container.appendChild(this.slides[0]); //slide
      // this.container.appendChild(this.slides[1]); //button-1
      // this.container.appendChild(this.slides[2]); //button-2
      // this.decorizeSlides();
    } else if (this.slides[1].tagName == "BUTTON") {
      this.container.appendChild(this.slides[0]); //slide
      this.container.appendChild(this.slides[1]); //button-1
      this.decorizeSlides();
    } else {
      // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    }
  }
  bindTriggers() {
    this.next.addEventListener("click", () => this.nextSlide());
    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }
  init() {
    try {
      let pause = false;
      this.container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;
    `;
      this.bindTriggers();
      this.decorizeSlides();
      if (this.autoplay) {
        setInterval(() => {
          this.container.onmouseover = () => pause = true;
          this.container.onmouseout = () => pause = false;
          if (!pause) {
            this.nextSlide();
          }
        }, 5000);
      }
    } catch (error) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    prevModule = null,
    activeClass = "",
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    this.prevModule = document.querySelectorAll(prevModule);
    try {
      this.slides = this.container.children;
    } catch (error) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");





window.addEventListener("DOMContentLoaded", () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: ".page",
    btns: ".next"
  });
  slider.render();
  const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: ".moduleapp",
    btns: ".next",
    prevModule: ".prevmodule"
  });
  modulePageSlider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active"
  });
  feedSlider.init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"](".showup .play", ".overlay").init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"](".module__video-item .play", ".overlay").init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officerold", ".officernew", ".officer__card-item").init();
  new _modules_form__WEBPACK_IMPORTED_MODULE_4__["default"](".form").init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map