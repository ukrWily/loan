export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
  }

  createPlayer(url) {
    this.player = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
    });

    console.log(this.player);
  }

  init() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("work");
      });
    });
  }
}
