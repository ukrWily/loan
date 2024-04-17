export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
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
            this.player.loadVideoById({ videoId: this.path });
          }
        } else {
          this.path = btn.getAttribute("data-url");

          this.createPlayer(this.path);
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
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.overlay.style.display = "flex";
  }

  onPlayerStateChange(state) {
    const blockedElem = this.activeBtn.closest(
      ".module__video-item"
    ).nextElementSibling;
    const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

    if (state.data === 0) {
      blockedElem.querySelector(".play__circle").classList.remove("closed");
    }
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
