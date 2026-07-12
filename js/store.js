/* ==========================================================================
   store.js — tanıtım sitesi tüm içeriğini data.json'dan okur.
   Bu site sadece görüntüleme amaçlıdır; admin panelinin aksine
   herhangi bir CRUD/düzenleme işlemi içermez.
   ========================================================================== */

const Store = (() => {
  let state = null;

  async function load() {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("data.json yüklenemedi (" + res.status + ")");
    state = await res.json();
    return state;
  }

  function get() {
    return state;
  }

  function getTeamMember(username) {
    return state.team.find((m) => m.username === username);
  }

  function getSite(key) {
    return state.sites.find((s) => s.key === key);
  }

  return { load, get, getTeamMember, getSite };
})();
