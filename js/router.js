/* ==========================================================================
   router.js — anasayfa tek sayfa (scroll) olarak kalır,
   sadece "#/ekip/:username" gibi rotalar için ayrı bir detay görünümü açılır.
   "#hakkimizda", "#sitelerimiz" gibi normal çapa (anchor) linkleri
   tarayıcının doğal kaydırmasına bırakılır.
   ========================================================================== */

const Router = (() => {
  let data = null;

  function isDetailRoute(hash) {
    return hash.startsWith("/ekip/");
  }

  function render() {
    const raw = location.hash.replace(/^#/, "");
    const homeEl = document.getElementById("home-content");
    const detailEl = document.getElementById("detail-content");

    if (isDetailRoute(raw)) {
      const username = raw.split("/")[2];
      detailEl.innerHTML = Render.teamDetail(data, username);
      detailEl.style.display = "block";
      homeEl.style.display = "none";
      window.scrollTo(0, 0);
    } else {
      detailEl.style.display = "none";
      homeEl.style.display = "block";

      if (raw === "" || raw === "/" || raw === "/#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elementId = raw.startsWith("/") ? raw.slice(1) : raw;
        const targetEl = document.getElementById(elementId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    }
  }

  function init(loadedData) {
    data = loadedData;
    window.addEventListener("hashchange", render);
    render();
  }

  return { init, render };
})();
