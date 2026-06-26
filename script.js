/* =============================================
   script.js – Save Our Wildlife
   Toggle: Play video if paused/hidden,
           Hide video if it is currently playing
   ============================================= */

(function () {
  "use strict";

  const video     = document.getElementById("wildlifeVideo");
  const toggleBtn = document.getElementById("toggleBtn");

  /**
   * Update the button label and ARIA state to reflect
   * the current video status (playing vs. hidden/paused).
   */
  function syncButton() {
    const isPlaying = !video.paused && !video.ended;

    if (isPlaying) {
      toggleBtn.textContent  = "⏹ Hide Video";
      toggleBtn.classList.add("playing");
      toggleBtn.setAttribute("aria-pressed", "true");
    } else {
      toggleBtn.textContent  = "▶ Play Video";
      toggleBtn.classList.remove("playing");
      toggleBtn.setAttribute("aria-pressed", "false");
    }
  }

  /**
   * Main toggle logic:
   *  - If the video is currently playing → pause it and hide it.
   *  - If the video is paused / hidden   → show it and play it.
   */
  function handleToggle() {
    if (!video.paused && !video.ended) {
      // Video IS playing → hide it
      video.pause();
      video.style.display = "none";
    } else {
      // Video is NOT playing → show and play
      video.style.display = "block";
      video.play().catch(function (err) {
        // Autoplay may be blocked by the browser; inform the user gracefully.
        console.warn("Playback was prevented by the browser:", err);
        alert(
          "Automatic playback was blocked by your browser.\n" +
          "Please use the video controls to start playback."
        );
      });
    }

    syncButton();
  }

  /* Keep button label in sync when playback ends naturally */
  video.addEventListener("ended", syncButton);
  video.addEventListener("pause", syncButton);
  video.addEventListener("play",  syncButton);

  toggleBtn.addEventListener("click", handleToggle);
})();
