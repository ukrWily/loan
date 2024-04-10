import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    Array.from(this.slides).forEach((slide) => {
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
      this.slides[0].querySelector(".card__title").style.textShadow =
        "0 1px 2px black";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  nextSlide() {
    // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
    /**
     * Оскільки кнопки в одному блоці зі слайдами,
     * відфільтровуємо їх
     */
    if (
      this.slides[1].tagName == "BUTTON" &&
      this.slides[2].tagName == "BUTTON"
    ) {
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
        this.container.onmouseover = () => (pause = true);
        this.container.onmouseout = () => (pause = false);
        if (!pause) {
          this.nextSlide();
        }
      }, 5000);
    }
  }
}
