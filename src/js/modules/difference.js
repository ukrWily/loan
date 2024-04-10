export default class difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.items = items;
  }

  hideItems() {
    // [this.oldOfficer, this.newOfficer].forEach((item) => {
    //   item.document.querySelectorAll(this.items).forEach((item, i, arr) => {
    //     if (i !== arr.length - 1) {
    //       item.style.display = "none";
    //     }
    //   });
    // });
    this.oldOfficer.document
      .querySelectorAll(this.items)
      .forEach((item, i, arr) => {
        if (i !== arr.length - 1) {
          item.style.display = "none";
        }
      });
  }
}
