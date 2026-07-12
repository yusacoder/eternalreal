/* ==========================================================================
   main.js — tanıtım sitesini başlatır
   ========================================================================== */

(async function bootstrap() {
  const shell = document.getElementById("app-shell");
  try {
    const data = await Store.load();

    shell.innerHTML = `
      ${UI.renderNavbar(data)}
      ${UI.renderSideMenu(data)}
      <div id="home-content">
        ${Render.home(data)}
        ${Render.footer(data)}
      </div>
      <div id="detail-content" style="display:none;"></div>
    `;

    UI.wireSideMenu();
    Render.wireHomeEvents();
    Router.init(data);
  } catch (err) {
    console.error(err);
    shell.innerHTML = `
      <div style="padding:120px 24px 60px; text-align:center; font-family:sans-serif;">
        <h2>data.json yüklenemedi</h2>
        <p style="color:#888;">Bu sitenin çalışması için bir yerel sunucu üzerinden açılması gerekir
        (tarayıcılar dosya:// protokolünde fetch isteklerini engeller).</p>
        <p style="color:#888; font-size:13px;">Örnek: <code>python -m http.server 8080</code> komutunu bu klasörde çalıştırıp
        <code>http://localhost:8080</code> adresini açın.</p>
        <p style="color:#c00; font-size:12px;">Hata: ${err.message}</p>
      </div>
    `;
  }
})();
