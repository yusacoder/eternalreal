/* ==========================================================================
   ui.js — navbar, hamburger yan menü ve küçük yardımcı fonksiyonlar
   ========================================================================== */

const UI = (() => {
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  }

  function renderNavbar(data) {
    return `
      <nav class="navbar">
        <div class="navbar-left">
          <button class="hamburger-btn" id="hamburger-toggle" aria-label="Menü">
            <span></span><span></span><span></span>
          </button>
          <a href="#/" class="brand">${escapeHtml(data.site.logoText)}<span>.</span></a>
        </div>
        <div class="navbar-right">
          <a href="#hakkimizda" class="nav-link">Hakkımızda</a>
          <a href="#sitelerimiz" class="nav-link">Sitelerimiz</a>
          <a href="#ekibimiz" class="nav-link">Ekibimiz</a>
          <a href="${escapeHtml(data.contact.adminApplication)}" target="_blank" rel="noopener" class="btn btn-primary">Ekibe Katıl</a>
        </div>
      </nav>
    `;
  }

  function renderSideMenu(data) {
    const sites = data.sites || [];
    return `
      <div class="side-overlay" id="side-overlay"></div>
      <aside class="side-menu" id="side-menu">
        <div class="side-menu-header">
          <span class="brand">${escapeHtml(data.site.logoText)}<span>.</span></span>
          <button class="side-menu-close" id="side-menu-close">✕</button>
        </div>

        <div class="side-menu-section">
          <p class="side-menu-title">Keşfet</p>
          <a href="#/" class="side-menu-link"><span class="icon">🏠</span> Anasayfa</a>
          <a href="#hakkimizda" class="side-menu-link"><span class="icon">✨</span> Hakkımızda</a>
          <a href="#ekibimiz" class="side-menu-link"><span class="icon">👥</span> Ekibimiz</a>
          <a href="#sss" class="side-menu-link"><span class="icon">❓</span> Sıkça Sorulanlar</a>
        </div>

        <div class="side-menu-section">
          <p class="side-menu-title">Sitelerimiz</p>
          ${sites
            .map(
              (s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" class="side-menu-link"><span class="icon">🔗</span> ${escapeHtml(s.name)} <span class="ext-mark">↗</span></a>`
            )
            .join("")}
        </div>

        <div class="side-menu-section">
          <p class="side-menu-title">Başvuru</p>
          <a href="${escapeHtml(data.contact.adminApplication)}" target="_blank" rel="noopener" class="side-menu-link"><span class="icon">📝</span> Ekibe Katıl <span class="ext-mark">↗</span></a>
        </div>
      </aside>
    `;
  }

  function wireSideMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("side-overlay");
    const toggleBtn = document.getElementById("hamburger-toggle");
    const closeBtn = document.getElementById("side-menu-close");

    function open() {
      menu.classList.add("is-open");
      overlay.classList.add("is-visible");
      toggleBtn.classList.add("is-open");
    }
    function close() {
      menu.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      toggleBtn.classList.remove("is-open");
    }
    toggleBtn.addEventListener("click", () => (menu.classList.contains("is-open") ? close() : open()));
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  return { escapeHtml, formatDate, renderNavbar, renderSideMenu, wireSideMenu };
})();
