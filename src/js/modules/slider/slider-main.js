import Slider from "./slider";

export default class MainSlider extends Slider {
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

    Array.from(this.slides).forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }
  // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }
  // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>

  bindTriggers() {
    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });
      /** when click logo -> open first page */
      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.prevModule.forEach((item) => {
      item.addEventListener("click", (e) => {
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
