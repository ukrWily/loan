import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor(container, next, prev) {
    super(container, next, prev);
  }

  init() {
    console.log(this.container, this.next, this.prev);
  }
}
