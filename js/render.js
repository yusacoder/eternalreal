/* ==========================================================================
   render.js — anasayfa bölümlerini ve ekip üyesi detay sayfasını üretir
   Tüm içerik data.json'dan gelir.
   ========================================================================== */

const Render = (() => {
  const { escapeHtml, formatDate } = UI;

  // ------------------------------------------------------------------
  // ANASAYFA
  // ------------------------------------------------------------------
  function home(data) {
    return `
      ${hero(data)}
      ${statsStrip(data)}
      ${about(data)}
      ${sitesSection(data)}
      ${teamSection(data)}
      ${faqSection(data)}
      ${ctaBanner(data)}
    `;
  }

  function hero(data) {
    const h = data.hero;
    const words = h.heading.split(" ");
    const last = words.pop();
    return `
      <section class="hero">
        <div class="wrap hero-grid">
          <div>
            <p class="eyebrow">${escapeHtml(h.eyebrow)}</p>
            <h1 class="hero-heading">${escapeHtml(words.join(" "))} <span class="accent-word">${escapeHtml(last)}</span></h1>
            <p class="hero-sub">${escapeHtml(h.subheading)}</p>
            <div class="hero-ctas">
              <a href="${escapeHtml(h.primaryCtaLink)}" class="btn btn-primary">${escapeHtml(h.primaryCtaText)}</a>
              <a href="${escapeHtml(h.secondaryCtaLink)}" target="_blank" rel="noopener" class="btn btn-outline">${escapeHtml(h.secondaryCtaText)}</a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image-frame">
              <img src="${escapeHtml(h.heroImage)}" alt="${escapeHtml(data.site.title)}"/>
            </div>
            <div class="glass-card floating-chip chip-1">
              <div class="chip-icon">👥</div>
              <div>
                <div class="chip-value">${escapeHtml(data.stats[0].value)}</div>
                <div class="chip-label">${escapeHtml(data.stats[0].label)}</div>
              </div>
            </div>
            <div class="glass-card floating-chip chip-2">
              <div class="chip-icon">📖</div>
              <div>
                <div class="chip-value">${escapeHtml(data.stats[1].value)}</div>
                <div class="chip-label">${escapeHtml(data.stats[1].label)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function statsStrip(data) {
    return `
      <div class="wrap">
        <div class="glass-card stats-strip">
          ${data.stats
            .map(
              (s) => `
            <div class="stat-block">
              <div class="num">${escapeHtml(s.value)}</div>
              <div class="lbl">${escapeHtml(s.label)}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function about(data) {
    const a = data.about;
    return `
      <section id="hakkimizda">
        <div class="wrap">
          <p class="eyebrow">${escapeHtml(a.eyebrow)}</p>
          <h2 class="section-title">${escapeHtml(a.title)}</h2>
          <div class="about-grid">
            <p class="section-sub">${escapeHtml(a.description)}</p>
            <div class="highlight-grid">
              ${a.highlights
                .map(
                  (h) => `
                <div class="glass-card highlight-card">
                  <div class="h-icon">${h.icon}</div>
                  <div class="h-title">${escapeHtml(h.title)}</div>
                  <div class="h-text">${escapeHtml(h.text)}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function sitesSection(data) {
    return `
      <section id="sitelerimiz">
        <div class="wrap">
          <p class="eyebrow">Ekosistemimiz</p>
          <h2 class="section-title">Sitelerimiz</h2>
          <p class="section-sub">Üç farklı platformda, tek bir topluluk ruhuyla içerik üretiyoruz.</p>
          <div class="site-grid">
            ${data.sites
              .map(
                (s) => `
              <div class="glass-card site-card">
                <div class="site-card-image" style="background-image:url('${escapeHtml(s.image)}');">
                  <span class="site-card-tag">${escapeHtml(s.tag)}</span>
                </div>
                <div class="site-card-body">
                  <div class="site-card-name">${escapeHtml(s.name)}</div>
                  <p class="site-card-desc">${escapeHtml(s.description)}</p>
                  <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" class="site-card-link">Siteyi Ziyaret Et →</a>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function teamSection(data) {
    return `
      <section id="ekibimiz">
        <div class="wrap">
          <p class="eyebrow">Arkamızdaki İsimler</p>
          <h2 class="section-title">Ekibimiz</h2>
          <p class="section-sub">Eternal Production'ı gönüllü emeğiyle ayakta tutan ekip.</p>
          <div class="team-grid">
            ${data.team
              .map(
                (m) => `
              <div class="glass-card team-card" data-open="${escapeHtml(m.username)}">
                <img class="team-avatar" src="${escapeHtml(m.avatar)}" alt="${escapeHtml(m.firstName)}"/>
                <div class="team-name">${escapeHtml(m.firstName)} ${escapeHtml(m.lastName)}</div>
                <div class="team-title">${escapeHtml(m.title)}</div>
                <div class="team-tags">
                  ${(m.tags || []).slice(0, 3).map((t) => `<span class="badge-tag">#${escapeHtml(t)}</span>`).join("")}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function faqSection(data) {
    return `
      <section id="sss">
        <div class="wrap">
          <p class="eyebrow">Merak Edilenler</p>
          <h2 class="section-title">Sıkça Sorulan Sorular</h2>
          <div class="glass-card faq-list">
            ${data.faq
              .map(
                (f, i) => `
              <div class="faq-item" data-faq="${i}">
                <div class="faq-question">
                  <span>${escapeHtml(f.question)}</span>
                  <span class="arrow">+</span>
                </div>
                <div class="faq-answer">${escapeHtml(f.answer)}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function ctaBanner(data) {
    return `
      <section>
        <div class="wrap">
          <div class="glass-card cta-banner">
            <div>
              <h3>Bu hikayenin bir parçası olmak ister misin?</h3>
              <p>Çevirmen, editör, tasarımcı veya geliştirici fark etmeksizin; tutkulu herkese kapımız açık.</p>
            </div>
            <a href="${escapeHtml(data.contact.adminApplication)}" target="_blank" rel="noopener" class="btn btn-primary">Hemen Başvur</a>
          </div>
        </div>
      </section>
    `;
  }

  function footer(data) {
    const s = data.social;
    return `
      <footer>
        <div class="wrap">
          <div class="footer-grid">
            <div>
              <span class="brand">${escapeHtml(data.site.logoText)}<span>.</span></span>
              <p class="section-sub" style="margin-top:10px; font-size:13px;">${escapeHtml(data.site.tagline)}</p>
            </div>
            <div class="footer-social">
              ${s.twitter ? `<a href="${escapeHtml(s.twitter)}" target="_blank" rel="noopener">𝕏</a>` : ""}
              ${s.instagram ? `<a href="${escapeHtml(s.instagram)}" target="_blank" rel="noopener">◎</a>` : ""}
              ${s.youtube ? `<a href="${escapeHtml(s.youtube)}" target="_blank" rel="noopener">▶</a>` : ""}
              ${s.discord ? `<a href="${escapeHtml(s.discord)}" target="_blank" rel="noopener">◆</a>` : ""}
            </div>
          </div>
          <p class="footer-bottom">© ${data.site.foundedYear}–${new Date().getFullYear()} ${escapeHtml(data.site.title)}. Tüm hakları saklıdır. İletişim: ${escapeHtml(data.contact.email)}</p>
        </div>
      </footer>
    `;
  }

  function wireHomeEvents() {
    document.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", () => {
        location.hash = `#/ekip/${el.dataset.open}`;
      });
    });
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("is-open");
      });
    });
  }

  // ------------------------------------------------------------------
  // EKİP ÜYESİ DETAY SAYFASI (#/ekip/:username)
  // ------------------------------------------------------------------
  function teamDetail(data, username) {
    const m = Store.getTeamMember(username);
    if (!m) return notFound("Ekip üyesi bulunamadı.");

    return `
      <div class="wrap detail-page">
        <a href="#/" class="back-link">← Anasayfaya dön</a>
        <div class="glass-card">
          <div class="detail-banner" style="background-image:url('${escapeHtml(m.banner || "")}'); background-color:#eeecff;"></div>
          <div class="detail-header">
            <img class="avatar-lg" src="${escapeHtml(m.avatar)}" alt="${escapeHtml(m.firstName)}"/>
            <div>
              <p class="detail-fullname">${escapeHtml(m.firstName)} ${escapeHtml(m.lastName)}</p>
              <p class="detail-title">${escapeHtml(m.title)}</p>
            </div>
          </div>
          <div style="padding:0 28px 32px;">
            <div class="team-tags" style="justify-content:flex-start; margin-bottom:20px;">
              ${(m.tags || []).map((t) => `<span class="badge-tag">#${escapeHtml(t)}</span>`).join("")}
            </div>
            <p class="section-sub" style="max-width:100%;">${escapeHtml(m.bio)}</p>
            <p class="section-sub" style="max-width:100%; margin-top:14px; font-size:13px;">Ekibe katılım: ${formatDate(m.joinDate)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function notFound(message) {
    return `<div class="wrap detail-page"><div class="glass-card empty-state">${escapeHtml(message)}</div></div>`;
  }

  return { home, teamDetail, wireHomeEvents, footer };
})();
