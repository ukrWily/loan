export default class VideoPlayer {
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
        const blockedElem = btn.closest(
          ".module__video-item"
        ).nextElementSibling;

        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (error) {}

      btn.addEventListener("click", () => {
        /**
         * Або нема такого елемента або е з даним атрибутом
         */
        if (
          !btn.closest(".module__video-item") ||
          btn.closest(".module__video-item").getAttribute("data-disabled") !==
            "true"
        ) {
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
    try {
      const blockedElem = this.activeBtn.closest(
        ".module__video-item"
      ).nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

      if (state.data === 0) {
        if (
          blockedElem
            .querySelector(".play__circle")
            .classList.contains("closed")
        ) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem
            .querySelector(".play__text")
            .classList.remove("attention");
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
