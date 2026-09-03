/*!
 * INEMA learn.js — camada de aprendizagem v2 (formato-curso-v2)
 * ------------------------------------------------------------------
 * Namespace unico: window.INEMA (IIFE inline, sem build, sem deps).
 * Enhancement progressivo: se isto quebrar ou o localStorage estiver
 * bloqueado, o curso continua 100% legivel. Toda I/O em wrappers
 * no-throw; falha sempre para o estado seguro. Modelo de dados = §1
 * do DESIGN-SPEC; API = §2; markup = §4.
 *
 * Chaves localStorage:
 *   inema.<courseId>.read   { "modulo-1-1#topico-3": true, ... }
 *   inema.<courseId>.doubts { "modulo-1-1#topico-3": { ts, resolved }, ... }
 *   inema.<courseId>.notes  { "<blockId>": [ {id,ts,color,quote,note,anchor,tags,orphan}, ... ], ... }
 *   inema.<courseId>.checks { "modulo-1-1#q1": { choice, correct, ts }, ... }
 *   inema.<courseId>.meta   { lastTopicAnchor, lastModuleHref, lastScroll, lastVisitedTs, completedAt? }
 *   inema.prefs (GLOBAL)    { schemaVersion, theme, font, fontScale, lineWidth, leading, accent, reducedMotionOverride? }
 */
(function (window, document) {
  'use strict';

  // Idempotencia dura: se ja existe um INEMA inicializado, nao recria.
  if (window.INEMA && window.INEMA.__core) {
    return;
  }

  // ===================================================================
  // 0. CONSTANTES E ESTADO INTERNO
  // ===================================================================

  var SCHEMA_VERSION = 1;

  // Nomes canonicos das CSS vars (espelham §3.5 / learn.css).
  var coreVars = {
    fontScale: '--inema-font-scale',   // multiplicador no :root (1 | 1.12 | 1.25)
    measure: '--measure',              // largura da prosa (ch)
    leading: '--lh-body',              // entrelinha (multiplicador sem unidade)
    fontBody: '--font-body',           // familia da prosa
    accentH: '--accent-h',
    accentS: '--accent-s',
    accentL: '--accent-l',
    accent: '--accent'
  };

  // Defaults das prefs (sempre completos via getPrefs/migrate).
  var PREFS_DEFAULTS = {
    schemaVersion: SCHEMA_VERSION,
    theme: 'inema-dark',     // inema-dark | claro | sepia | foco | contraste
    font: 'inter',           // inter | system | leitura
    fontScale: 100,          // 100 | 112 | 125
    lineWidth: 68,           // 60 | 68 | 75  (ch)
    leading: 1.7,            // 1.45 | 1.7
    accent: 'emerald',       // slug de trilha INEMA
    reducedMotionOverride: null // null | true | false
  };

  // Temas conhecidos -> como projetam nos dois layers (.dark + data-theme).
  // dark: classe .dark do Tailwind ON?  attr: valor de data-theme (null = ausente).
  var THEMES = {
    'inema-dark': { dark: true, attr: null, colorScheme: 'dark' },
    'claro': { dark: false, attr: null, colorScheme: 'light' },
    'sepia': { dark: false, attr: 'sepia', colorScheme: 'light' },
    'foco': { dark: 'inherit', attr: 'foco', colorScheme: 'inherit' }, // herda eixo claro/escuro atual
    'contraste': { dark: true, attr: 'contraste', colorScheme: 'dark' }
  };

  var FONTS = ['inter', 'system', 'leitura'];
  var FONT_SCALES = [100, 112, 125];
  var LINE_WIDTHS = [60, 68, 75];
  var LEADINGS = [1.45, 1.7];
  // Paleta travada nas 6 trilhas INEMA (h,s,l por slug). So afeta componentes novos.
  var ACCENTS = {
    emerald: { h: 152, s: 76, l: 45 },
    blue: { h: 217, s: 91, l: 60 },
    purple: { h: 258, s: 90, l: 66 },
    amber: { h: 38, s: 92, l: 50 },
    teal: { h: 174, s: 72, l: 41 },
    rose: { h: 350, s: 89, l: 60 }
  };
  var ACCENT_ORDER = ['emerald', 'blue', 'purple', 'amber', 'teal', 'rose'];
  var SWATCHES = ['yellow', 'green', 'blue', 'pink', 'doubt']; // 'doubt' reservado p/ duvida

  // Estado de runtime.
  var S = {
    courseId: null,
    inited: false,
    ephemeral: false,       // true => storage indisponivel, estado em memoria
    mem: {},                // backing store em memoria (modo efemero / espelho)
    bound: false,           // listeners globais ja montados?
    selPopover: null,       // elemento do popover de selecao
    journeyEl: null,        // overlay da jornada aberta
    journeyReturnFocus: null,
    checks: {},             // registros de checagem declarados (registerCheck)
    debouncers: {}          // timers nomeados
  };

  // ===================================================================
  // 1. UTILITARIOS BLINDADOS (§2.10) — nao-publicos, no-throw
  // ===================================================================

  function warn() {
    try { if (window.console && console.warn) console.warn.apply(console, arguments); } catch (e) {}
  }

  // JSON.parse defensivo: nunca lanca, devolve fallback.
  function safeJSON(str, fallback) {
    if (str == null) return fallback;
    if (typeof str !== 'string') return str;
    try {
      var v = JSON.parse(str);
      return (v == null) ? fallback : v;
    } catch (e) {
      warn('[INEMA] JSON corrompido, usando fallback:', e);
      return fallback;
    }
  }

  // Probe de storage: tenta set/get/remove de chave-sonda. False => efemero.
  function probeStorage() {
    try {
      var ls = window.localStorage;
      if (!ls) return false;
      var k = '__inema_probe__';
      ls.setItem(k, '1');
      var ok = ls.getItem(k) === '1';
      ls.removeItem(k);
      return ok;
    } catch (e) {
      return false;
    }
  }

  // Leitura crua blindada (string | null). Modo efemero le do espelho memoria.
  function rawGet(key) {
    if (S.ephemeral) {
      return Object.prototype.hasOwnProperty.call(S.mem, key) ? S.mem[key] : null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      warn('[INEMA] getItem falhou:', e);
      return null;
    }
  }

  // Escrita crua blindada. Trata QuotaExceededError sem derrubar a UI.
  function rawSet(key, value) {
    if (S.ephemeral) {
      S.mem[key] = value;
      return true;
    }
    try {
      window.localStorage.setItem(key, value);
      // espelha em memoria p/ leituras rapidas tolerantes
      S.mem[key] = value;
      return true;
    } catch (e) {
      // Cota estourada: mantem estado anterior, sugere export, segue legivel.
      warn('[INEMA] setItem falhou (cota?):', e);
      notify('Armazenamento cheio. Exporte sua jornada para nao perder dados.', 'warn');
      return false;
    }
  }

  function rawRemove(key) {
    if (S.ephemeral) {
      delete S.mem[key];
      return true;
    }
    try {
      window.localStorage.removeItem(key);
      delete S.mem[key];
      return true;
    } catch (e) {
      warn('[INEMA] removeItem falhou:', e);
      return false;
    }
  }

  // storageGet: le e faz parse defensivo de JSON. Corrompido => reset SO da chave.
  function storageGet(key, fallback) {
    var raw = rawGet(key);
    if (raw == null) return (fallback === undefined ? null : fallback);
    var parsed = safeJSON(raw, undefined);
    if (parsed === undefined) {
      // estado corrompido: reseta so esta chave, nao quebra a pagina
      rawRemove(key);
      return (fallback === undefined ? null : fallback);
    }
    return parsed;
  }

  // storageSet: serializa e grava. Sempre no-throw.
  function storageSet(key, obj) {
    var str;
    try {
      str = JSON.stringify(obj);
    } catch (e) {
      warn('[INEMA] JSON.stringify falhou:', e);
      return false;
    }
    return rawSet(key, str);
  }

  // Debounce nomeado (eventos de alto volume).
  function debounce(name, fn, wait) {
    if (S.debouncers[name]) clearTimeout(S.debouncers[name]);
    S.debouncers[name] = setTimeout(function () {
      S.debouncers[name] = null;
      try { fn(); } catch (e) { warn('[INEMA] debounce cb erro:', e); }
    }, wait);
  }

  // Toast/aviso discreto, NAO-bloqueante. Tolerante a ausencia de DOM.
  function notify(msg, kind) {
    try {
      var host = document.getElementById('inema-toast-host');
      if (!host) {
        host = document.createElement('div');
        host.id = 'inema-toast-host';
        host.setAttribute('aria-live', 'polite');
        host.className = 'inema-toast-host';
        (document.body || document.documentElement).appendChild(host);
      }
      var t = document.createElement('div');
      t.className = 'inema-toast' + (kind ? ' inema-toast--' + kind : '');
      t.setAttribute('data-open', 'false');
      t.textContent = msg; // textContent => anti-XSS
      host.appendChild(t);
      // revela com gating [data-open] no proximo frame (dispara a transicao)
      try {
        var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
        raf(function () { try { t.setAttribute('data-open', 'true'); } catch (e) {} });
      } catch (e) { t.setAttribute('data-open', 'true'); }
      // animacao de saida respeita reduced-motion via CSS; timer e seguro
      setTimeout(function () {
        try { t.setAttribute('data-open', 'false'); } catch (e) {}
        setTimeout(function () { try { host.removeChild(t); } catch (e) {} }, 400);
      }, 3200);
    } catch (e) {
      warn('[INEMA] notify:', msg);
    }
  }

  // Id unico para nota.
  function genId() {
    var rnd = Math.random().toString(36).slice(2, 6);
    return 'n_' + Date.now() + '_' + rnd;
  }

  // Escapa atributo de seletor (so usamos getAttribute, mas util pra querySelector seguro).
  function cssAttrEsc(v) {
    return String(v).replace(/["\\]/g, '\\$&');
  }

  function reducedMotion() {
    var p = getPrefs();
    if (p.reducedMotionOverride === true) return true;
    if (p.reducedMotionOverride === false) return false;
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { return false; }
  }

  function emit(name, detail) {
    try {
      var ev;
      try {
        ev = new CustomEvent('inema:' + name, { detail: detail || {}, bubbles: true });
      } catch (e) {
        // IE/old fallback
        ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('inema:' + name, true, false, detail || {});
      }
      (document || window).dispatchEvent(ev);
    } catch (e) { warn('[INEMA] emit falhou:', name, e); }
  }

  // ===================================================================
  // 2. COURSE ID + CHAVES
  // ===================================================================

  function detectCourseId() {
    var id = null;
    try {
      var m = document.querySelector('meta[name="inema-course"]');
      if (m && m.getAttribute('content')) id = m.getAttribute('content').trim();
    } catch (e) {}
    if (!id) {
      // fallback = slug da pasta (penultimo segmento ou nome de arquivo)
      try {
        var parts = (window.location.pathname || '').split('/').filter(Boolean);
        var slug = parts.length ? parts[parts.length - (/\.html?$/i.test(parts[parts.length - 1]) ? 2 : 1)] : '';
        id = (slug || 'curso').replace(/[^a-z0-9\-_]/gi, '-').toLowerCase();
      } catch (e2) { id = 'curso'; }
    }
    return id || 'curso';
  }

  function key(name) {
    return 'inema.' + S.courseId + '.' + name;
  }

  function getRead() { return storageGet(key('read'), {}) || {}; }
  function getDoubts() { return storageGet(key('doubts'), {}) || {}; }
  function getNotes() { return storageGet(key('notes'), {}) || {}; }
  function getChecks() { return storageGet(key('checks'), {}) || {}; }
  function getMeta() { return storageGet(key('meta'), {}) || {}; }

  function setRead(o) { return storageSet(key('read'), o); }
  function setDoubts(o) { return storageSet(key('doubts'), o); }
  function setNotes(o) { return storageSet(key('notes'), o); }
  function setChecks(o) { return storageSet(key('checks'), o); }
  function setMeta(o) { return storageSet(key('meta'), o); }

  // ===================================================================
  // 3. PREFS / TEMA (§2.8, §3) — global inema.prefs + fallback legado
  // ===================================================================

  function migratePrefs(p) {
    var out = {};
    for (var k in PREFS_DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(PREFS_DEFAULTS, k)) out[k] = PREFS_DEFAULTS[k];
    }
    if (p && typeof p === 'object') {
      // preserva campos conhecidos + desconhecidos (forward-compat)
      for (var j in p) {
        if (Object.prototype.hasOwnProperty.call(p, j)) out[j] = p[j];
      }
    }
    out.schemaVersion = SCHEMA_VERSION;
    // saneia valores fora do dominio -> default
    if (!THEMES[out.theme]) out.theme = PREFS_DEFAULTS.theme;
    if (FONTS.indexOf(out.font) === -1) out.font = PREFS_DEFAULTS.font;
    if (FONT_SCALES.indexOf(+out.fontScale) === -1) out.fontScale = PREFS_DEFAULTS.fontScale; else out.fontScale = +out.fontScale;
    if (LINE_WIDTHS.indexOf(+out.lineWidth) === -1) out.lineWidth = PREFS_DEFAULTS.lineWidth; else out.lineWidth = +out.lineWidth;
    if (LEADINGS.indexOf(+out.leading) === -1) out.leading = PREFS_DEFAULTS.leading; else out.leading = +out.leading;
    if (!ACCENTS[out.accent]) out.accent = PREFS_DEFAULTS.accent;
    if (out.reducedMotionOverride !== true && out.reducedMotionOverride !== false) out.reducedMotionOverride = null;
    return out;
  }

  function getPrefs() {
    var stored = storageGet('inema.prefs', null);
    if (!stored) {
      // 1a carga: fallback ao localStorage.theme legado do v1 (nao resetar dark/light)
      var legacy = null;
      try { legacy = rawGet('theme'); } catch (e) {}
      var seed = {};
      for (var k in PREFS_DEFAULTS) if (Object.prototype.hasOwnProperty.call(PREFS_DEFAULTS, k)) seed[k] = PREFS_DEFAULTS[k];
      if (legacy === 'light') seed.theme = 'claro';
      else if (legacy === 'dark') seed.theme = 'inema-dark';
      return migratePrefs(seed);
    }
    return migratePrefs(stored);
  }

  function savePrefs(p) {
    var merged = migratePrefs(p);
    storageSet('inema.prefs', merged);
    // mantem o legado em sincronia p/ paginas v1 que so leem localStorage.theme
    try {
      var t = THEMES[merged.theme];
      if (t && t.dark === true) rawSet('theme', 'dark');
      else if (t && t.dark === false) rawSet('theme', 'light');
    } catch (e) {}
    return merged;
  }

  // Aplica prefs no <html>: classe .dark + data-theme + data-font + data-accent + CSS vars.
  function applyPrefs() {
    var p = getPrefs();
    var html = document.documentElement;
    if (!html) return p;
    var t = THEMES[p.theme] || THEMES[PREFS_DEFAULTS.theme];

    try {
      // Eixo claro/escuro (Tailwind .dark). 'inherit' (foco) nao mexe.
      if (t.dark === true) html.classList.add('dark');
      else if (t.dark === false) html.classList.remove('dark');
      // se 'inherit', preserva o que ja estiver (foco herda eixo atual)

      // Eixo de leitura (data-theme ortogonal).
      if (t.attr) html.setAttribute('data-theme', t.attr);
      else html.removeAttribute('data-theme');

      // color-scheme nativo (scrollbars/inputs). 'inherit' nao seta.
      if (t.colorScheme && t.colorScheme !== 'inherit') {
        html.style.colorScheme = t.colorScheme;
      } else {
        html.style.colorScheme = html.classList.contains('dark') ? 'dark' : 'light';
      }

      // Fonte e acento como atributos (componentes novos leem via [data-*]).
      html.setAttribute('data-font', p.font);
      html.setAttribute('data-accent', p.accent);

      // CSS vars (leitura).
      var st = html.style;
      st.setProperty(coreVars.fontScale, (p.fontScale / 100).toString());
      // font-size do :root em % (resto em rem escala junto) — nunca px
      st.setProperty('font-size', p.fontScale + '%');
      st.setProperty(coreVars.measure, p.lineWidth + 'ch');
      st.setProperty(coreVars.leading, p.leading.toString());

      // .inema-prose REDECLARA --measure/--lh-body; o CSS so muda via atributos
      // no <html>. Deriva o slug numerico/semantico do valor salvo.
      var lwNum = parseInt(p.lineWidth, 10);
      var lw = (LINE_WIDTHS.indexOf(lwNum) !== -1) ? lwNum : PREFS_DEFAULTS.lineWidth;
      html.setAttribute('data-line-width', String(lw));
      var leadNum = parseFloat(p.leading);
      html.setAttribute('data-leading', (leadNum <= 1.5) ? 'compacto' : 'confortavel');
      var fam = p.font === 'system'
        ? 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
        : (p.font === 'leitura'
          ? '"Atkinson Hyperlegible", "Inter", system-ui, sans-serif'
          : '"Inter", system-ui, sans-serif');
      st.setProperty(coreVars.fontBody, fam);

      // Acento (HSL) — travado na familia INEMA.
      var a = ACCENTS[p.accent] || ACCENTS.emerald;
      st.setProperty(coreVars.accentH, a.h + '');
      st.setProperty(coreVars.accentS, a.s + '%');
      st.setProperty(coreVars.accentL, a.l + '%');
      st.setProperty(coreVars.accent, 'hsl(' + a.h + ' ' + a.s + '% ' + a.l + '%)');

      // reduced motion override via atributo (CSS: html[data-reduced-motion="reduce"])
      if (p.reducedMotionOverride === true) html.setAttribute('data-reduced-motion', 'reduce');
      else html.removeAttribute('data-reduced-motion');
    } catch (e) {
      warn('[INEMA] applyPrefs:', e);
    }
    return p;
  }

  function setPref(k, val) {
    var p = getPrefs();
    if (!Object.prototype.hasOwnProperty.call(PREFS_DEFAULTS, k)) {
      warn('[INEMA] setPref: chave desconhecida', k);
      return p;
    }
    p[k] = val;
    var saved = savePrefs(p); // migratePrefs saneia tema desconhecido -> dark default
    applyPrefs();
    syncAppearanceUI();
    emit('progress', { kind: 'prefs', prefs: saved });
    return saved;
  }

  function cyclePref(k) {
    var p = getPrefs();
    var list = null, cur, idx;
    if (k === 'theme') list = Object.keys(THEMES);
    else if (k === 'font') list = FONTS;
    else if (k === 'fontScale') list = FONT_SCALES;
    else if (k === 'lineWidth') list = LINE_WIDTHS;
    else if (k === 'leading') list = LEADINGS;
    else if (k === 'accent') list = ACCENT_ORDER;
    if (!list) { warn('[INEMA] cyclePref: chave nao-ciclavel', k); return p; }
    cur = p[k];
    idx = list.indexOf(typeof cur === 'number' ? +cur : cur);
    var next = list[(idx + 1 + list.length) % list.length];
    return setPref(k, next);
  }

  // ===================================================================
  // 4. PROGRESSO (derivado do DOM) — §2.2
  // ===================================================================

  // Lista todos os ids de topico (data-inema-topic) no DOM, com escopo.
  function topicEls() {
    try {
      return Array.prototype.slice.call(document.querySelectorAll('[data-inema-topic]'));
    } catch (e) { return []; }
  }

  // Filtra elementos de topico por escopo. scope: 'curso' | 'trilha:N' | 'modulo:X-Y'
  function topicsInScope(scope) {
    var els = topicEls();
    if (!scope || scope === 'curso') return els;
    var m;
    if ((m = /^trilha:(.+)$/.exec(scope))) {
      var trk = m[1];
      return els.filter(function (el) {
        var holder = el.closest('[data-inema-track]');
        return holder && holder.getAttribute('data-inema-track') === trk;
      });
    }
    if ((m = /^modulo:(.+)$/.exec(scope))) {
      var mod = m[1];
      return els.filter(function (el) {
        var id = el.getAttribute('data-inema-topic') || '';
        // id estavel = "modulo-X-Y#topico-N"; o prefixo de modulo bate com "modulo-X-Y"
        if (id.indexOf('modulo-' + mod + '#') === 0) return true;
        var holder = el.closest('[data-inema-module]');
        return holder && holder.getAttribute('data-inema-module') === mod;
      });
    }
    return els;
  }

  // domTotals(scope) -> conta itens reais p/ derivar %.
  function domTotals(scope) {
    var els = topicsInScope(scope);
    var read = getRead();
    var done = 0;
    for (var i = 0; i < els.length; i++) {
      var id = els[i].getAttribute('data-inema-topic');
      if (id && read[id] === true) done++;
    }
    return { done: done, total: els.length };
  }

  // ---- Manifesto do curso (agregacao cross-pagina de progresso) ----
  // Cada pagina pode declarar a estrutura COMPLETA do curso via
  //   <script type="application/json" data-inema-manifest>{...}</script>
  // ou window.INEMA_MANIFEST. Sem manifesto, o progresso degrada para o DOM
  // da pagina atual (so o modulo corrente) — por isso a agregacao curso/trilha
  // entre paginas SO funciona com manifesto.
  var _manifest; // undefined = nao tentou; null = ausente
  function getManifest() {
    if (_manifest !== undefined) return _manifest;
    _manifest = null;
    try {
      if (window.INEMA_MANIFEST && typeof window.INEMA_MANIFEST === 'object') {
        _manifest = window.INEMA_MANIFEST;
      } else {
        var s = document.querySelector('script[data-inema-manifest]');
        if (s) _manifest = safeJSON(s.textContent, null);
      }
    } catch (e) { _manifest = null; }
    return _manifest;
  }

  // Lista plana de modulos do manifesto: [{id, track, topics, title, href}]
  function manifestModules() {
    var man = getManifest();
    if (!man || !man.tracks) return [];
    var out = [];
    for (var i = 0; i < man.tracks.length; i++) {
      var tk = man.tracks[i];
      var trk = String(tk.n != null ? tk.n : (tk.track != null ? tk.track : ''));
      var mods = tk.modules || [];
      for (var j = 0; j < mods.length; j++) {
        var md = mods[j];
        out.push({ id: String(md.id), track: trk, topics: (+md.topics || 0), title: md.title || ('Modulo ' + md.id), href: md.href || null });
      }
    }
    return out;
  }

  // Total de topicos do escopo segundo o manifesto (null se indisponivel).
  function manifestTotal(scope) {
    var mods = manifestModules();
    if (!mods.length) return null;
    var m;
    if (!scope || scope === 'curso') {
      return mods.reduce(function (a, x) { return a + x.topics; }, 0);
    }
    if ((m = /^trilha:(.+)$/.exec(scope))) {
      var f = mods.filter(function (x) { return x.track === m[1]; });
      return f.length ? f.reduce(function (a, x) { return a + x.topics; }, 0) : null;
    }
    if ((m = /^modulo:(.+)$/.exec(scope))) {
      for (var i = 0; i < mods.length; i++) if (mods[i].id === m[1]) return mods[i].topics;
      return null;
    }
    return null;
  }

  // Mapeia uma chave de leitura "modulo-X-Y#topico-N" -> {module, track}.
  function keyParts(id) {
    var m = /^modulo-(.+?)#/.exec(id || '');
    var mod = m ? m[1] : null;
    return { module: mod, track: mod ? mod.split('-')[0] : null };
  }

  // done a partir do read-map persistido (cross-pagina), filtrado por escopo.
  function readDone(scope) {
    var read = getRead();
    var ids = [];
    for (var k in read) if (read[k] === true) ids.push(k);
    if (!scope || scope === 'curso') return ids.length;
    var m;
    if ((m = /^trilha:(.+)$/.exec(scope))) {
      return ids.filter(function (id) { return keyParts(id).track === m[1]; }).length;
    }
    if ((m = /^modulo:(.+)$/.exec(scope))) {
      return ids.filter(function (id) { return keyParts(id).module === m[1]; }).length;
    }
    return ids.length;
  }

  function progress(scope) {
    scope = scope || 'curso';
    // Com manifesto: done do read-map (cross-pagina), total do manifesto.
    var total = manifestTotal(scope);
    if (total != null) {
      var done = readDone(scope);
      if (done > total) done = total; // seguranca contra chaves orfas
      var pctM = total ? Math.round((done / total) * 100) : 0;
      return { done: done, total: total, pct: pctM };
    }
    // Fallback sem manifesto: deriva do DOM da pagina atual.
    var t = domTotals(scope);
    var pct = t.total ? Math.round((t.done / t.total) * 100) : 0;
    return { done: t.done, total: t.total, pct: pct };
  }

  function isRead(itemId) {
    if (!itemId) return false;
    var read = getRead();
    return read[itemId] === true;
  }

  function markRead(itemId, bool) {
    if (!itemId) return;
    var read = getRead();
    var was = read[itemId] === true;
    var now = (bool === undefined) ? true : !!bool;
    if (now === was) { renderMeters(); return; }
    if (now) read[itemId] = true; // ausencia = nao-lido; nunca grava false
    else delete read[itemId];
    setRead(read);
    // atualiza os controles visuais do topico no mesmo tick (localStorage sincrono)
    paintReadControls(itemId, now);
    renderMeters();
    saveCheckpoint(itemId);
    maybeCelebrate();
    emit('read', { id: itemId, read: now, progress: progress('curso') });
    emit('progress', { kind: 'read', id: itemId, progress: progress('curso') });
  }

  // Pinta o estado de um botao "marcar lido" e a secao correspondente.
  function paintReadControls(itemId, isOn) {
    try {
      var btns = document.querySelectorAll('[data-inema-read-toggle]');
      for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var sec = b.closest('[data-inema-topic]');
        var id = sec ? sec.getAttribute('data-inema-topic') : b.getAttribute('data-inema-read-toggle');
        if (id !== itemId) continue;
        setReadButtonVisual(b, isOn, sec);
      }
    } catch (e) { warn('[INEMA] paintReadControls:', e); }
  }

  function setReadButtonVisual(btn, isOn, sec) {
    btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    btn.classList.toggle('is-read', isOn);
    // estado por icone+texto+cor (1.4.1): atualiza label se houver slot
    var lbl = btn.querySelector('[data-inema-read-label]');
    if (lbl) lbl.textContent = isOn ? 'Lido' : 'Marcar como lido';
    else if (!btn.querySelector('svg') && !btn.children.length) {
      btn.textContent = isOn ? 'Lido' : 'Marcar como lido';
    }
    if (sec) sec.classList.toggle('is-read', isOn);
  }

  // Repinta todos os medidores visiveis (aneis/barras) no mesmo tick.
  function renderMeters() {
    try {
      var meters = document.querySelectorAll('[data-inema-meter]');
      for (var i = 0; i < meters.length; i++) {
        var el = meters[i];
        var scope = el.getAttribute('data-inema-meter') || 'curso';
        var pr = progress(scope);
        paintMeter(el, pr);
      }
    } catch (e) { warn('[INEMA] renderMeters:', e); }
  }

  function paintMeter(el, pr) {
    // Atualiza atributos ARIA e texto "N de M" + %.
    el.setAttribute('role', el.getAttribute('role') || 'progressbar');
    el.setAttribute('aria-valuemin', '0');
    el.setAttribute('aria-valuemax', '100');
    el.setAttribute('aria-valuenow', String(pr.pct));
    el.setAttribute('aria-valuetext', pr.done + ' de ' + pr.total + ' (' + pr.pct + '%)');
    // CSS multiplica por 1% (calc(var(--inema-pct) * 1%)) -> var unitless
    el.style.setProperty('--inema-pct', String(pr.pct));
    el.style.setProperty('--inema-pct-num', String(pr.pct));
    // estado 100% dispara a celebracao contida do CSS ([data-complete="true"])
    el.setAttribute('data-complete', (pr.total > 0 && pr.done === pr.total) ? 'true' : 'false');

    // Slots opcionais de texto.
    var pctSlot = el.querySelector('[data-inema-meter-pct]');
    if (pctSlot) pctSlot.textContent = pr.pct + '%';
    var fracSlot = el.querySelector('[data-inema-meter-frac]');
    if (fracSlot) fracSlot.textContent = pr.done + ' de ' + pr.total;

    // Barra: filete interno opcional.
    var fill = el.querySelector('[data-inema-meter-fill]');
    if (fill) fill.style.width = pr.pct + '%';

    // Anel SVG: se houver <circle data-inema-ring> usa stroke-dashoffset.
    var ring = el.querySelector('[data-inema-ring]');
    if (ring) {
      try {
        var r = parseFloat(ring.getAttribute('r')) || 0;
        var c = 2 * Math.PI * r;
        ring.style.strokeDasharray = c + ' ' + c;
        ring.style.strokeDashoffset = (c * (1 - pr.pct / 100)).toString();
      } catch (e) {}
    }
  }

  function maybeCelebrate() {
    var pr = progress('curso');
    if (pr.total > 0 && pr.done === pr.total) {
      var meta = getMeta();
      if (!meta.completedAt) {
        meta.completedAt = new Date().toISOString();
        setMeta(meta);
        notify('Curso concluido. Parabens pelo esforco.', 'ok');
      }
    }
  }

  // ===================================================================
  // 5. DUVIDA — §2.3
  // ===================================================================

  function toggleDoubt(itemId) {
    if (!itemId) return;
    var d = getDoubts();
    if (d[itemId]) {
      delete d[itemId];
    } else {
      d[itemId] = { ts: Date.now(), resolved: false };
    }
    setDoubts(d);
    paintDoubtControls(itemId, !!d[itemId]);
    emit('doubt', { id: itemId, active: !!d[itemId] });
    return !!d[itemId];
  }

  function setDoubtResolved(itemId, bool) {
    if (!itemId) return;
    var d = getDoubts();
    if (!d[itemId]) d[itemId] = { ts: Date.now(), resolved: false };
    d[itemId].resolved = !!bool;
    setDoubts(d);
    emit('doubt', { id: itemId, resolved: !!bool });
    return d[itemId];
  }

  function paintDoubtControls(itemId, isOn) {
    try {
      var btns = document.querySelectorAll('[data-inema-doubt-toggle]');
      for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var sec = b.closest('[data-inema-topic]');
        var id = sec ? sec.getAttribute('data-inema-topic') : b.getAttribute('data-inema-doubt-toggle');
        if (id !== itemId) continue;
        b.setAttribute('aria-pressed', isOn ? 'true' : 'false');
        b.classList.toggle('is-doubt', isOn);
        if (sec) sec.classList.toggle('has-doubt', isOn);
      }
    } catch (e) {}
  }

  // Unifica duvidas de topico + highlights color:doubt para a jornada.
  function listDoubts() {
    var out = [];
    var d = getDoubts();
    for (var id in d) {
      if (!Object.prototype.hasOwnProperty.call(d, id)) continue;
      out.push({
        kind: 'topic', id: id, ts: d[id].ts || 0,
        resolved: !!d[id].resolved, quote: null, note: null
      });
    }
    var notes = getNotes();
    for (var block in notes) {
      if (!Object.prototype.hasOwnProperty.call(notes, block)) continue;
      var arr = notes[block] || [];
      for (var i = 0; i < arr.length; i++) {
        var n = arr[i];
        var isDoubt = n.color === 'doubt' || (n.tags && n.tags.indexOf('duvida') !== -1);
        if (!isDoubt) continue;
        out.push({
          kind: 'note', id: n.id, ts: n.ts || 0, resolved: false,
          quote: n.quote || '', note: n.note || null, blockId: block,
          orphan: !!n.orphan, anchor: n.anchor || null
        });
      }
    }
    out.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); });
    return out;
  }

  // ===================================================================
  // 6. NOTAS / HIGHLIGHT — §2.4 (TreeWalker, nunca surroundContents)
  // ===================================================================

  // Acha o bloco anotavel (data-inema-block) que contem o node.
  function blockOf(node) {
    var el = (node && node.nodeType === 3) ? node.parentNode : node;
    if (!el || !el.closest) return null;
    return el.closest('[data-inema-block]');
  }

  // Calcula offset de char dentro do bloco para um (node, offset) DOM.
  function charOffsetInBlock(block, node, offset) {
    var total = 0;
    var walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walker.nextNode())) {
      if (n === node) return total + offset;
      total += n.nodeValue.length;
    }
    // node nao e text (ex.: selecao terminou num elemento) -> aproxima pelo total
    return total;
  }

  // Envolve [start,end) de chars do bloco em <mark>, pedaco a pedaco por text node.
  // NUNCA usa Range.surroundContents (lanca em selecao cross-node, E8).
  function wrapRangeInBlock(block, startOffset, endOffset, opts) {
    if (endOffset <= startOffset) return [];
    var made = [];
    var walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null, false);
    var pos = 0;
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) {
      // pula text nodes que ja estao dentro de um highlight (evita aninhar)
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest('mark.inema-hl')) {
        pos += n.nodeValue.length;
        continue;
      }
      textNodes.push({ node: n, start: pos, end: pos + n.nodeValue.length });
      pos += n.nodeValue.length;
    }
    for (var i = 0; i < textNodes.length; i++) {
      var tn = textNodes[i];
      if (tn.end <= startOffset || tn.start >= endOffset) continue;
      var s = Math.max(startOffset, tn.start) - tn.start;
      var e = Math.min(endOffset, tn.end) - tn.start;
      if (e <= s) continue;
      var node = tn.node;
      var before = node.nodeValue.slice(0, s);
      var mid = node.nodeValue.slice(s, e);
      var after = node.nodeValue.slice(e);
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      var mark = document.createElement('mark');
      mark.className = 'inema-hl inema-hl--' + (opts.color || 'yellow');
      mark.setAttribute('data-inema-note', opts.id);
      mark.setAttribute('data-inema-color', opts.color || 'yellow');
      mark.setAttribute('data-hl', opts.color || 'yellow');
      if (opts.note) mark.setAttribute('data-has-note', 'true');
      mark.appendChild(document.createTextNode(mid)); // textContent => anti-XSS
      frag.appendChild(mark);
      if (after) frag.appendChild(document.createTextNode(after));
      node.parentNode.replaceChild(frag, node);
      made.push(mark);
    }
    return made;
  }

  // Cria highlight/nota a partir de um Range. Devolve id (ou null).
  function highlight(range, opts) {
    opts = opts || {};
    if (!range || range.collapsed) return null;
    var quote = '';
    try { quote = range.toString(); } catch (e) {}
    if (!quote) return null;

    // MVP: restringe a UM bloco anotavel (contiguidade + robustez).
    var block = blockOf(range.startContainer);
    var endBlock = blockOf(range.endContainer);
    if (!block) { notify('Selecione dentro de um paragrafo anotavel.', 'warn'); return null; }
    if (endBlock && endBlock !== block) {
      // colapsa a selecao ao bloco inicial (E8: nao tenta cross-node)
      notify('Selecao limitada a um paragrafo.', 'warn');
    }
    var blockId = block.getAttribute('data-inema-block');
    if (!blockId) { notify('Este trecho nao e anotavel.', 'warn'); return null; }

    var startOffset, endOffset;
    try {
      startOffset = charOffsetInBlock(block, range.startContainer, range.startOffset);
      var ec = (endBlock === block) ? range.endContainer : null;
      var eo = (endBlock === block) ? range.endOffset : block.textContent.length;
      endOffset = ec ? charOffsetInBlock(block, ec, eo) : Math.min(startOffset + quote.length, block.textContent.length);
    } catch (e) {
      warn('[INEMA] offsets falharam:', e);
      return null;
    }
    if (endOffset <= startOffset) endOffset = startOffset + quote.length;

    var color = (SWATCHES.indexOf(opts.color) !== -1) ? opts.color : 'yellow';
    var tags = (opts.tags && opts.tags.slice) ? opts.tags.slice() : [];
    if (color === 'doubt' && tags.indexOf('duvida') === -1) tags.push('duvida');

    var rec = {
      id: genId(),
      ts: Date.now(),
      color: color,
      quote: quote, // SEMPRE gravado
      note: (opts.note != null && opts.note !== '') ? String(opts.note) : null,
      anchor: { blockId: blockId, startOffset: startOffset, endOffset: endOffset },
      tags: tags,
      orphan: false
    };

    // aplica no DOM
    var marks = wrapRangeInBlock(block, startOffset, endOffset, rec);
    if (!marks.length) {
      // re-ancoragem por quote dentro do bloco
      marks = applyByQuote(block, rec);
    }
    rec.orphan = !marks.length;

    // persiste
    var notes = getNotes();
    if (!notes[blockId]) notes[blockId] = [];
    notes[blockId].push(rec);
    setNotes(notes);

    emit('note', { id: rec.id, color: rec.color, hasNote: rec.note != null, blockId: blockId });
    if (rec.color === 'doubt') emit('doubt', { id: rec.id, active: true, kind: 'note' });
    return rec.id;
  }

  // Re-ancoragem por busca literal do quote (fallbacks §1.4).
  function applyByQuote(block, rec) {
    var text = block.textContent || '';
    var idx = text.indexOf(rec.quote);
    if (idx === -1) return [];
    rec.anchor.startOffset = idx;
    rec.anchor.endOffset = idx + rec.quote.length;
    return wrapRangeInBlock(block, idx, rec.anchor.endOffset, rec);
  }

  function findNote(id) {
    var notes = getNotes();
    for (var b in notes) {
      if (!Object.prototype.hasOwnProperty.call(notes, b)) continue;
      var arr = notes[b];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return { blockId: b, idx: i, rec: arr[i], notes: notes };
      }
    }
    return null;
  }

  function promoteToNote(id, text) {
    var f = findNote(id);
    if (!f) return false;
    f.rec.note = (text != null) ? String(text) : '';
    f.notes[f.blockId][f.idx] = f.rec;
    setNotes(f.notes);
    // marca visual de "tem nota"
    try {
      var marks = document.querySelectorAll('mark[data-inema-note="' + cssAttrEsc(id) + '"]');
      for (var i = 0; i < marks.length; i++) marks[i].setAttribute('data-has-note', 'true');
    } catch (e) {}
    emit('note', { id: id, hasNote: true });
    return true;
  }

  function editNote(id, patch) {
    var f = findNote(id);
    if (!f || !patch) return false;
    var rec = f.rec;
    if (patch.note !== undefined) {
      rec.note = (patch.note === null) ? null : String(patch.note);
      // sincroniza o indicador visual de nota nos marks
      try {
        var nmarks = document.querySelectorAll('mark[data-inema-note="' + cssAttrEsc(id) + '"]');
        for (var k = 0; k < nmarks.length; k++) {
          if (rec.note != null && rec.note !== '') nmarks[k].setAttribute('data-has-note', 'true');
          else nmarks[k].removeAttribute('data-has-note');
        }
      } catch (e) {}
    }
    if (patch.color !== undefined && SWATCHES.indexOf(patch.color) !== -1) {
      rec.color = patch.color;
      try {
        var marks = document.querySelectorAll('mark[data-inema-note="' + cssAttrEsc(id) + '"]');
        for (var i = 0; i < marks.length; i++) {
          marks[i].className = 'inema-hl inema-hl--' + rec.color;
          marks[i].setAttribute('data-inema-color', rec.color);
          marks[i].setAttribute('data-hl', rec.color);
        }
      } catch (e) {}
    }
    if (patch.tags !== undefined && patch.tags && patch.tags.slice) rec.tags = patch.tags.slice();
    if (rec.color === 'doubt' && rec.tags.indexOf('duvida') === -1) rec.tags.push('duvida');
    f.notes[f.blockId][f.idx] = rec;
    setNotes(f.notes);
    emit('note', { id: id, color: rec.color, hasNote: rec.note != null });
    return true;
  }

  // Desfaz spans (substitui por text node + normalize) e remove o registro.
  function removeNote(id) {
    try {
      var marks = document.querySelectorAll('mark[data-inema-note="' + cssAttrEsc(id) + '"]');
      var parents = [];
      for (var i = 0; i < marks.length; i++) {
        var mk = marks[i];
        var parent = mk.parentNode;
        if (!parent) continue;
        var tn = document.createTextNode(mk.textContent);
        parent.replaceChild(tn, mk);
        if (parents.indexOf(parent) === -1) parents.push(parent);
      }
      for (var j = 0; j < parents.length; j++) {
        try { parents[j].normalize(); } catch (e) {}
      }
    } catch (e) { warn('[INEMA] removeNote DOM:', e); }

    var f = findNote(id);
    if (f) {
      f.notes[f.blockId].splice(f.idx, 1);
      if (!f.notes[f.blockId].length) delete f.notes[f.blockId];
      setNotes(f.notes);
    }
    emit('note', { id: id, removed: true });
    return true;
  }

  // Re-aplica highlights do storage. Tolerante por nota: uma orfa nao derruba as outras.
  function renderHighlights(container) {
    var notes = getNotes();
    var root = container || document;
    for (var blockId in notes) {
      if (!Object.prototype.hasOwnProperty.call(notes, blockId)) continue;
      var arr = notes[blockId] || [];
      var block = null;
      try { block = root.querySelector('[data-inema-block="' + cssAttrEsc(blockId) + '"]'); } catch (e) {}
      // ordena por offset desc p/ nao invalidar offsets ao inserir marks
      var ordered = arr.slice().sort(function (a, b) {
        var ao = (a.anchor && a.anchor.startOffset) || 0;
        var bo = (b.anchor && b.anchor.startOffset) || 0;
        return bo - ao;
      });
      var dirty = false;
      for (var i = 0; i < ordered.length; i++) {
        var rec = ordered[i];
        try {
          // ja aplicada? (re-entrante)
          if (document.querySelector('mark[data-inema-note="' + cssAttrEsc(rec.id) + '"]')) continue;
          var marks = [];
          if (block && rec.anchor) {
            marks = wrapRangeInBlock(block, rec.anchor.startOffset, rec.anchor.endOffset, rec);
            if (!marks.length && rec.quote) marks = applyByQuote(block, rec); // fallback no bloco
          }
          if (!marks.length && rec.quote) {
            // bloco sumiu: busca quote no <main>
            var main = document.querySelector('main') || document.body;
            marks = applyByQuoteAnywhere(main, rec);
          }
          var wasOrphan = !!rec.orphan;
          rec.orphan = !marks.length;
          if (rec.orphan !== wasOrphan) dirty = true;
        } catch (e) {
          // nota individual falhou: marca orfa, segue para as outras (tolerante)
          rec.orphan = true; dirty = true;
          warn('[INEMA] renderHighlights nota orfa:', rec.id, e);
        }
      }
      if (dirty) {
        notes[blockId] = arr;
        setNotes(notes);
      }
    }
  }

  function applyByQuoteAnywhere(root, rec) {
    // procura primeiro bloco anotavel cujo texto contem o quote
    try {
      var blocks = root.querySelectorAll('[data-inema-block]');
      for (var i = 0; i < blocks.length; i++) {
        if ((blocks[i].textContent || '').indexOf(rec.quote) !== -1) {
          return applyByQuote(blocks[i], rec);
        }
      }
    } catch (e) {}
    return [];
  }

  // ---- Popover de selecao -------------------------------------------

  function buildSelectionPopover() {
    if (S.selPopover) return S.selPopover;
    var pop = document.createElement('div');
    pop.className = 'inema-selpop';
    pop.setAttribute('role', 'toolbar');
    pop.setAttribute('aria-label', 'Anotar selecao');
    pop.style.position = 'absolute';
    pop.style.display = 'none';
    pop.style.zIndex = '60';
    pop.setAttribute('data-open', 'false');

    // swatches (1 reservado = duvida)
    SWATCHES.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'inema-swatch inema-swatch--' + c;
      b.setAttribute('data-inema-swatch', c);
      b.setAttribute('data-hl', c);
      b.setAttribute('aria-label', c === 'doubt' ? 'Marcar como duvida' : ('Marcar com cor ' + c));
      b.textContent = c === 'doubt' ? '?' : '';
      pop.appendChild(b);
    });

    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'inema-selpop__action';
    addBtn.setAttribute('data-inema-act', 'note');
    addBtn.textContent = 'Adicionar nota';
    pop.appendChild(addBtn);

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'inema-selpop__action';
    copyBtn.setAttribute('data-inema-act', 'copy');
    copyBtn.textContent = 'Copiar';
    pop.appendChild(copyBtn);

    (document.body || document.documentElement).appendChild(pop);
    S.selPopover = pop;
    return pop;
  }

  function hideSelectionPopover() {
    if (S.selPopover) {
      S.selPopover.setAttribute('data-open', 'false');
      S.selPopover.style.display = 'none';
    }
  }

  function showSelectionPopoverForRange(range) {
    var rect;
    try { rect = range.getBoundingClientRect(); } catch (e) { return; }
    if (!rect || (rect.width === 0 && rect.height === 0)) return;
    var pop = buildSelectionPopover();
    pop.style.display = 'flex';
    pop.setAttribute('data-open', 'true');
    // posiciona acima da selecao, considerando scroll
    var sx = window.scrollX || window.pageXOffset || 0;
    var sy = window.scrollY || window.pageYOffset || 0;
    var top = rect.top + sy - pop.offsetHeight - 8;
    var left = rect.left + sx + (rect.width / 2) - (pop.offsetWidth / 2);
    // reposiciona se transbordar
    if (top < sy + 4) top = rect.bottom + sy + 8;
    var maxLeft = sx + document.documentElement.clientWidth - pop.offsetWidth - 8;
    if (left > maxLeft) left = maxLeft;
    if (left < sx + 8) left = sx + 8;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  }

  function currentRange() {
    try {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;
      var r = sel.getRangeAt(0);
      if (r.collapsed || !r.toString()) return null;
      return r;
    } catch (e) { return null; }
  }

  function onSelectionEnd() {
    var r = currentRange();
    if (!r) { hideSelectionPopover(); return; }
    // so dentro de bloco anotavel
    if (!blockOf(r.startContainer)) { hideSelectionPopover(); return; }
    showSelectionPopoverForRange(r);
  }

  // Clipboard com fallback file:// (textarea + execCommand).
  function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          notify('Copiado.', 'ok');
        }, function () { fallbackCopy(text); });
        return;
      }
    } catch (e) {}
    fallbackCopy(text);
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      (document.body || document.documentElement).appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      notify(ok ? 'Copiado.' : 'Nao foi possivel copiar.', ok ? 'ok' : 'warn');
    } catch (e) {
      notify('Nao foi possivel copiar.', 'warn');
    }
  }

  // ===================================================================
  // 7. JORNADA — §2.5 (modal acessivel)
  // ===================================================================

  function getFocusable(root) {
    var sel = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    return Array.prototype.slice.call(root.querySelectorAll(sel)).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }

  function setInertSiblings(dialog, on) {
    try {
      var nodes = (document.body || document.documentElement).children;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n === dialog || n.id === 'inema-toast-host') continue;
        if (on) {
          if (n.getAttribute('data-inema-prev-inert') == null) {
            n.setAttribute('data-inema-prev-inert', n.hasAttribute('inert') ? '1' : '0');
          }
          n.setAttribute('inert', '');
          n.setAttribute('aria-hidden', 'true');
        } else {
          var prev = n.getAttribute('data-inema-prev-inert');
          if (prev === '0' || prev == null) { n.removeAttribute('inert'); n.removeAttribute('aria-hidden'); }
          n.removeAttribute('data-inema-prev-inert');
        }
      }
    } catch (e) {}
  }

  function openJourney() {
    if (S.journeyEl) return;
    S.journeyReturnFocus = document.activeElement;

    var backdrop = document.createElement('div');
    backdrop.className = 'inema-journey-backdrop';
    backdrop.addEventListener('mousedown', function (e) {
      if (e.target === backdrop) closeJourney();
    });

    var dialog = document.createElement('div');
    dialog.className = 'inema-journey';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'inema-journey-title');
    dialog.setAttribute('tabindex', '-1');

    backdrop.appendChild(dialog);
    (document.body || document.documentElement).appendChild(backdrop);
    S.journeyEl = backdrop;

    renderJourney(dialog);
    setInertSiblings(backdrop, true);

    // revela com gating [data-open] no proximo frame (dispara a transicao)
    try {
      var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
      raf(function () {
        dialog.setAttribute('data-open', 'true');
        backdrop.setAttribute('data-open', 'true');
      });
    } catch (e) {
      dialog.setAttribute('data-open', 'true');
      backdrop.setAttribute('data-open', 'true');
    }

    // foco preso
    dialog.focus();
    backdrop.addEventListener('keydown', journeyKeydown);
  }

  function journeyKeydown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      closeJourney();
      return;
    }
    if (e.key === 'Tab' || e.keyCode === 9) {
      var dialog = S.journeyEl ? S.journeyEl.querySelector('.inema-journey') : null;
      if (!dialog) return;
      var f = getFocusable(dialog);
      if (!f.length) { e.preventDefault(); dialog.focus(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function closeJourney() {
    if (!S.journeyEl) return;
    var backdrop = S.journeyEl;
    var dialog = backdrop.querySelector('.inema-journey');
    setInertSiblings(backdrop, false);
    backdrop.removeEventListener('keydown', journeyKeydown);
    // gating de saida: data-open=false ANTES de remover (deixa a transicao rodar)
    try { if (dialog) dialog.setAttribute('data-open', 'false'); } catch (e) {}
    backdrop.setAttribute('data-open', 'false');
    var removed = false;
    function doRemove() {
      if (removed) return;
      removed = true;
      try { backdrop.parentNode.removeChild(backdrop); } catch (e) {}
    }
    // remove apos a transicao (transitionend) ou um timeout de seguranca
    try {
      var slide = dialog || backdrop;
      slide.addEventListener('transitionend', doRemove);
    } catch (e) {}
    setTimeout(doRemove, reducedMotion() ? 0 : 360);
    S.journeyEl = null;
    // devolve foco ao gatilho
    try { if (S.journeyReturnFocus && S.journeyReturnFocus.focus) S.journeyReturnFocus.focus(); } catch (e) {}
    S.journeyReturnFocus = null;
  }

  // helper: cria elemento com texto seguro
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text; // anti-XSS
    return e;
  }

  function renderJourney(mountEl) {
    if (!mountEl) return;
    mountEl.innerHTML = '';

    // header
    var head = el('div', 'inema-journey__header');
    var h = el('h2', 'inema-journey__title', 'Minha jornada');
    h.id = 'inema-journey-title';
    head.appendChild(h);
    var closeB = el('button', 'inema-journey__close', 'Fechar');
    closeB.type = 'button';
    closeB.setAttribute('aria-label', 'Fechar minha jornada');
    closeB.addEventListener('click', closeJourney);
    head.appendChild(closeB);
    mountEl.appendChild(head);

    var body = el('div', 'inema-journey__body');
    mountEl.appendChild(body);

    // ---- Progresso (curso/trilhas/modulos) ----
    var secP = el('section', 'inema-journey-sec');
    secP.appendChild(el('h3', 'inema-journey__section-title', 'Progresso'));
    var cur = progress('curso');
    body.appendChild(secP);
    secP.appendChild(meterRow('Curso', cur));

    // trilhas/modulos: do MANIFESTO (curso inteiro, em qualquer pagina) se houver;
    // senao, do DOM da pagina atual (so o modulo corrente).
    var man = getManifest();
    if (man && man.tracks && man.tracks.length) {
      man.tracks.forEach(function (tk) {
        var trk = String(tk.n != null ? tk.n : tk.track);
        secP.appendChild(meterRow(tk.title || ('Trilha ' + trk), progress('trilha:' + trk)));
        (tk.modules || []).forEach(function (md) {
          secP.appendChild(meterRow(md.title || ('Modulo ' + md.id), progress('modulo:' + md.id)));
        });
      });
    } else {
      var tracks = uniqueAttr('[data-inema-track]', 'data-inema-track');
      tracks.forEach(function (tk) {
        secP.appendChild(meterRow('Trilha ' + tk, progress('trilha:' + tk)));
      });
      var mods = uniqueAttr('[data-inema-module]', 'data-inema-module');
      mods.forEach(function (md) {
        secP.appendChild(meterRow('Modulo ' + md, progress('modulo:' + md)));
      });
    }

    // ---- Continuar de onde parei ----
    var meta = getMeta();
    if (meta.lastTopicAnchor || meta.lastModuleHref) {
      var secC = el('section', 'inema-journey-sec');
      secC.appendChild(el('h3', 'inema-journey__section-title', 'Continuar de onde parei'));
      var resumeBtn = el('button', 'inema-journey__resume', 'Voltar ao ultimo ponto');
      resumeBtn.type = 'button';
      resumeBtn.addEventListener('click', function () { closeJourney(); resume(); });
      secC.appendChild(resumeBtn);
      body.appendChild(secC);
    }

    // ---- Duvidas (filtravel, com link de volta) ----
    var doubts = listDoubts();
    var secD = el('section', 'inema-journey-sec');
    secD.appendChild(el('h3', 'inema-journey__section-title', 'Duvidas (' + doubts.length + ')'));
    var filterWrap = el('div', 'inema-journey__filters');
    var onlyOpen = el('label', null, null);
    var cb = document.createElement('input'); cb.type = 'checkbox';
    onlyOpen.appendChild(cb); onlyOpen.appendChild(document.createTextNode(' so nao resolvidas'));
    filterWrap.appendChild(onlyOpen);
    secD.appendChild(filterWrap);
    var doubtList = el('ul', 'inema-journey__list');
    secD.appendChild(doubtList);
    function paintDoubts() {
      doubtList.innerHTML = '';
      doubts.forEach(function (d) {
        if (cb.checked && d.resolved) return;
        var li = el('li', 'inema-journey__item' + (d.resolved ? ' is-resolved' : ''));
        var label = d.kind === 'topic'
          ? ('Topico: ' + d.id)
          : (d.quote ? ('"' + truncate(d.quote, 90) + '"') : 'Trecho marcado');
        var a = el('a', 'inema-journey-link', label);
        a.href = '#';
        a.addEventListener('click', function (ev) {
          ev.preventDefault(); closeJourney(); jumpTo(d);
        });
        li.appendChild(a);
        var tag = el('span', 'inema-journey__tag', 'duvida');
        tag.setAttribute('data-tag', 'duvida');
        li.appendChild(tag);
        if (d.note) li.appendChild(el('p', 'inema-journey__note', d.note));
        if (d.kind === 'topic') {
          var rb = el('button', 'inema-btn inema-btn--ghost', d.resolved ? 'Reabrir' : 'Marcar resolvida');
          rb.type = 'button';
          rb.addEventListener('click', function () {
            setDoubtResolved(d.id, !d.resolved); d.resolved = !d.resolved; paintDoubts();
          });
          li.appendChild(rb);
        }
        doubtList.appendChild(li);
      });
      if (!doubtList.children.length) doubtList.appendChild(el('li', 'inema-journey-empty', 'Nenhuma duvida.'));
    }
    cb.addEventListener('change', paintDoubts);
    paintDoubts();
    body.appendChild(secD);

    // ---- Notas (filtravel por cor "duvida") ----
    var allNotes = flatNotes();
    var secN = el('section', 'inema-journey-sec');
    secN.appendChild(el('h3', 'inema-journey__section-title', 'Notas e marcacoes (' + allNotes.length + ')'));
    var nFilter = el('div', 'inema-journey__filters');
    var selColor = document.createElement('select');
    ['todas'].concat(SWATCHES).forEach(function (c) {
      var o = document.createElement('option'); o.value = c; o.textContent = c; selColor.appendChild(o);
    });
    nFilter.appendChild(el('span', null, 'Cor: '));
    nFilter.appendChild(selColor);
    secN.appendChild(nFilter);
    var noteList = el('ul', 'inema-journey__list');
    secN.appendChild(noteList);
    function paintNotes() {
      noteList.innerHTML = '';
      allNotes.forEach(function (n) {
        if (selColor.value !== 'todas' && n.color !== selColor.value) return;
        var li = el('li', 'inema-journey__item inema-color--' + n.color + (n.orphan ? ' is-orphan' : ''));
        if (n.quote) li.appendChild(el('blockquote', 'inema-journey__quote', truncate(n.quote, 160)));
        if (n.note) li.appendChild(el('p', 'inema-journey__note', n.note));
        if (n.color === 'doubt') {
          var ntag = el('span', 'inema-journey__tag', 'duvida');
          ntag.setAttribute('data-tag', 'duvida');
          li.appendChild(ntag);
        }
        if (n.orphan) li.appendChild(el('span', 'inema-journey-orphan', 'nota sem ancora'));
        var actions = el('div', 'inema-journey-actions');
        if (!n.orphan) {
          var go = el('button', 'inema-btn inema-btn--ghost', 'Ir ao trecho');
          go.type = 'button';
          go.addEventListener('click', function () { closeJourney(); jumpTo({ kind: 'note', id: n.id, blockId: n.blockId }); });
          actions.appendChild(go);
        }
        var del = el('button', 'inema-btn inema-btn--ghost', 'Excluir');
        del.type = 'button';
        del.addEventListener('click', function () {
          removeNote(n.id);
          allNotes = flatNotes(); paintNotes();
        });
        actions.appendChild(del);
        li.appendChild(actions);
        noteList.appendChild(li);
      });
      if (!noteList.children.length) noteList.appendChild(el('li', 'inema-journey-empty', 'Nenhuma nota.'));
    }
    selColor.addEventListener('change', paintNotes);
    paintNotes();
    body.appendChild(secN);

    // ---- Export / Import / Reset ----
    var secX = el('section', 'inema-journey-sec');
    secX.appendChild(el('h3', 'inema-journey__section-title', 'Backup'));
    var row = el('div', 'inema-journey__footer');

    var expBtn = el('button', 'inema-btn', 'Exportar .json');
    expBtn.type = 'button';
    expBtn.addEventListener('click', downloadJSON);
    row.appendChild(expBtn);

    var impLabel = el('label', 'inema-btn', 'Importar .json');
    var impInput = document.createElement('input');
    impInput.type = 'file'; impInput.accept = 'application/json,.json';
    impInput.style.display = 'none';
    impInput.addEventListener('change', function () {
      var file = impInput.files && impInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var res = importJSON(String(reader.result), { mode: 'merge' });
        if (res.ok) {
          notify('Importado: ' + res.applied + ' itens.', 'ok');
          rehydrateAll();
          renderJourney(mountEl);
        } else {
          notify('Arquivo invalido. Nada foi alterado.', 'warn');
        }
      };
      reader.readAsText(file);
    });
    impLabel.appendChild(impInput);
    row.appendChild(impLabel);

    var resetBtn = el('button', 'inema-btn inema-danger', 'Apagar tudo');
    resetBtn.type = 'button';
    resetBtn.addEventListener('click', function () {
      if (window.confirm('Apagar TODO o progresso, duvidas e notas deste curso? Esta acao nao pode ser desfeita.')) {
        resetCourse();
        rehydrateAll();
        renderJourney(mountEl);
        notify('Estado do curso apagado.', 'ok');
      }
    });
    row.appendChild(resetBtn);

    secX.appendChild(row);
    body.appendChild(secX);
  }

  function meterRow(label, pr) {
    var row = el('div', 'inema-journey-meter');
    row.appendChild(el('span', 'inema-journey-meter-label', label));
    var bar = el('div', 'inema-bar');
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(pr.pct));
    bar.setAttribute('aria-valuetext', pr.done + ' de ' + pr.total + ' (' + pr.pct + '%)');
    var fill = el('div', 'inema-bar__fill');
    fill.style.width = pr.pct + '%';
    bar.appendChild(fill);
    row.appendChild(bar);
    row.appendChild(el('span', 'inema-journey-meter-frac', pr.done + ' de ' + pr.total + ' (' + pr.pct + '%)'));
    return row;
  }

  function flatNotes() {
    var notes = getNotes();
    var out = [];
    for (var b in notes) {
      if (!Object.prototype.hasOwnProperty.call(notes, b)) continue;
      var arr = notes[b];
      for (var i = 0; i < arr.length; i++) {
        var n = arr[i];
        out.push({
          id: n.id, blockId: b, color: n.color, quote: n.quote || '',
          note: n.note || null, orphan: !!n.orphan, ts: n.ts || 0
        });
      }
    }
    out.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); });
    return out;
  }

  function uniqueAttr(sel, attr) {
    var seen = {}, out = [];
    try {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        var v = els[i].getAttribute(attr);
        if (v && !seen[v]) { seen[v] = 1; out.push(v); }
      }
    } catch (e) {}
    out.sort();
    return out;
  }

  function truncate(s, n) {
    s = String(s);
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  // pula para um item (topico ou nota) por ancora estavel
  function jumpTo(item) {
    var target = null;
    if (item.kind === 'topic') {
      try { target = document.querySelector('[data-inema-topic="' + cssAttrEsc(item.id) + '"]'); } catch (e) {}
    } else if (item.kind === 'note') {
      try { target = document.querySelector('mark[data-inema-note="' + cssAttrEsc(item.id) + '"]'); } catch (e) {}
      if (!target && item.blockId) {
        try { target = document.querySelector('[data-inema-block="' + cssAttrEsc(item.blockId) + '"]'); } catch (e) {}
      }
    }
    if (target && target.scrollIntoView) {
      // abre accordion ancestral se colapsado
      openAncestors(target);
      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      flashTarget(target);
    }
  }

  function openAncestors(el) {
    try {
      var p = el;
      while (p && p !== document.body) {
        if (p.matches && p.matches('.topic-explanation') && !p.classList.contains('active')) {
          p.classList.add('active');
        }
        if (p.tagName === 'DETAILS' && !p.open) p.open = true;
        p = p.parentNode;
      }
    } catch (e) {}
  }

  function flashTarget(target) {
    if (reducedMotion()) return;
    try {
      target.classList.add('inema-flash');
      setTimeout(function () { target.classList.remove('inema-flash'); }, 1200);
    } catch (e) {}
  }

  // ===================================================================
  // 8. CONTINUAR DE ONDE PAREI — §2.6
  // ===================================================================

  function saveCheckpoint(topicId) {
    debounce('checkpoint', function () {
      var meta = getMeta();
      if (topicId) meta.lastTopicAnchor = topicId;
      else {
        // melhor esforco: topico mais alto visivel
        var vis = topMostVisibleTopic();
        if (vis) meta.lastTopicAnchor = vis;
      }
      meta.lastModuleHref = window.location.pathname + window.location.search;
      meta.lastScroll = window.scrollY || window.pageYOffset || 0;
      meta.lastVisitedTs = Date.now();
      setMeta(meta);
    }, 400);
  }

  function topMostVisibleTopic() {
    var els = topicEls();
    var best = null, bestTop = Infinity;
    for (var i = 0; i < els.length; i++) {
      try {
        var r = els[i].getBoundingClientRect();
        if (r.bottom > 0 && r.top < bestTop) { bestTop = r.top; best = els[i]; }
      } catch (e) {}
    }
    return best ? best.getAttribute('data-inema-topic') : null;
  }

  function resume() {
    var meta = getMeta();
    var anchor = meta.lastTopicAnchor;
    if (anchor) {
      var target = null;
      try { target = document.querySelector('[data-inema-topic="' + cssAttrEsc(anchor) + '"]'); } catch (e) {}
      if (target && target.scrollIntoView) {
        openAncestors(target);
        target.scrollIntoView({ behavior: 'auto', block: 'start' }); // ancora estavel, nao scrollY cru
        flashTarget(target);
        return true;
      }
    }
    // fallback best-effort por scroll cru
    if (typeof meta.lastScroll === 'number') {
      try { window.scrollTo(0, meta.lastScroll); return true; } catch (e) {}
    }
    return false;
  }

  // ===================================================================
  // 9. EXPORT / IMPORT — §2.7 (round-trip lossless)
  // ===================================================================

  function buildExportObject() {
    return {
      schemaVersion: SCHEMA_VERSION,
      courseId: S.courseId,
      exportedAt: new Date().toISOString(),
      read: getRead(),
      doubts: getDoubts(),
      notes: getNotes(),
      checks: getChecks(),
      meta: getMeta()
    };
  }

  function exportJSON() {
    // sempre produz arquivo valido, mesmo com estado vazio
    var obj = buildExportObject();
    var str;
    try { str = JSON.stringify(obj, null, 2); }
    catch (e) { str = '{"schemaVersion":' + SCHEMA_VERSION + ',"courseId":"' + S.courseId + '","read":{},"doubts":{},"notes":{},"checks":{},"meta":{}}'; }
    return str;
  }

  function downloadJSON() {
    var str = exportJSON();
    try {
      var blob = new Blob([str], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'inema-' + S.courseId + '-' + new Date().toISOString().slice(0, 10) + '.json';
      (document.body || document.documentElement).appendChild(a);
      a.click();
      setTimeout(function () {
        try { document.body.removeChild(a); URL.revokeObjectURL(url); } catch (e) {}
      }, 100);
    } catch (e) {
      warn('[INEMA] download falhou, fallback data-uri:', e);
      try {
        var a2 = document.createElement('a');
        a2.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(str);
        a2.download = 'inema-' + S.courseId + '.json';
        a2.click();
      } catch (e2) { notify('Nao foi possivel exportar.', 'warn'); }
    }
  }

  // migrate(state): qualquer schemaVersion <= atual -> shape corrente, defaults p/ faltantes.
  // Preserva campos desconhecidos (forward-compat).
  function migrate(state) {
    var s = (state && typeof state === 'object') ? state : {};
    var out = {};
    // preserva tudo que veio (campos desconhecidos sobrevivem ao round-trip)
    for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) out[k] = s[k];
    out.schemaVersion = SCHEMA_VERSION;
    if (out.read == null || typeof out.read !== 'object') out.read = {};
    if (out.doubts == null || typeof out.doubts !== 'object') out.doubts = {};
    if (out.notes == null || typeof out.notes !== 'object') out.notes = {};
    if (out.checks == null || typeof out.checks !== 'object') out.checks = {};
    if (out.meta == null || typeof out.meta !== 'object') out.meta = {};
    return out;
  }

  function importJSON(text, opts) {
    opts = opts || {};
    var mode = opts.mode === 'replace' ? 'replace' : 'merge';
    var res = { ok: false, applied: 0, skipped: 0, errors: [] };

    // parse em variavel temporaria (nao muta estado se invalido)
    var parsed = safeJSON(text, undefined);
    if (parsed === undefined || typeof parsed !== 'object' || parsed === null) {
      res.errors.push('JSON invalido ou ilegivel.');
      return res;
    }
    if (typeof parsed.schemaVersion !== 'number' || parsed.schemaVersion > SCHEMA_VERSION) {
      // versao futura desconhecida: nao commita (evita corromper)
      if (typeof parsed.schemaVersion !== 'number') {
        res.errors.push('schemaVersion ausente.');
        return res;
      }
      // se for futura, ainda tentamos preservar via migrate, mas avisamos
      res.errors.push('schemaVersion ' + parsed.schemaVersion + ' mais nova que a suportada (' + SCHEMA_VERSION + ').');
    }

    var incoming = migrate(parsed);

    if (mode === 'replace') {
      if (!opts.__confirmed) {
        var ok = window.confirm('Substituir TODO o estado atual pelo arquivo importado? O progresso atual sera perdido.');
        if (!ok) { res.errors.push('cancelado pelo usuario'); return res; }
      }
      setRead(incoming.read || {});
      setDoubts(incoming.doubts || {});
      setNotes(incoming.notes || {});
      setChecks(incoming.checks || {});
      setMeta(incoming.meta || {});
      res.applied = countItems(incoming);
      res.ok = true;
      return res;
    }

    // merge nao-destrutivo (uniao; nada apagado)
    var curRead = getRead(), curDoubts = getDoubts(), curNotes = getNotes(),
        curChecks = getChecks(), curMeta = getMeta();

    // read: uniao de true
    for (var rId in incoming.read) {
      if (incoming.read[rId] === true) {
        if (curRead[rId] !== true) { curRead[rId] = true; res.applied++; }
        else res.skipped++;
      }
    }
    // doubts: mantem o existente, adiciona novos
    for (var dId in incoming.doubts) {
      if (!curDoubts[dId]) { curDoubts[dId] = incoming.doubts[dId]; res.applied++; }
      else res.skipped++;
    }
    // notes: por blockId, dedup por id
    for (var b in incoming.notes) {
      var inArr = incoming.notes[b] || [];
      if (!curNotes[b]) curNotes[b] = [];
      var existingIds = {};
      for (var x = 0; x < curNotes[b].length; x++) existingIds[curNotes[b][x].id] = 1;
      for (var y = 0; y < inArr.length; y++) {
        if (!existingIds[inArr[y].id]) { curNotes[b].push(inArr[y]); res.applied++; }
        else res.skipped++;
      }
    }
    // checks: adiciona ausentes
    for (var cId in incoming.checks) {
      if (!curChecks[cId]) { curChecks[cId] = incoming.checks[cId]; res.applied++; }
      else res.skipped++;
    }
    // meta: pega o mais recente
    if (incoming.meta && (incoming.meta.lastVisitedTs || 0) > (curMeta.lastVisitedTs || 0)) {
      for (var mk in incoming.meta) curMeta[mk] = incoming.meta[mk];
      res.applied++;
    }

    setRead(curRead); setDoubts(curDoubts); setNotes(curNotes);
    setChecks(curChecks); setMeta(curMeta);
    res.ok = true;
    return res;
  }

  function countItems(o) {
    var n = 0;
    for (var k in (o.read || {})) if (o.read[k] === true) n++;
    for (var d in (o.doubts || {})) n++;
    for (var b in (o.notes || {})) n += (o.notes[b] || []).length;
    for (var c in (o.checks || {})) n++;
    return n;
  }

  function resetCourse() {
    rawRemove(key('read'));
    rawRemove(key('doubts'));
    rawRemove(key('notes'));
    rawRemove(key('checks'));
    rawRemove(key('meta'));
  }

  // ===================================================================
  // 10. CHECAGEM LEVE — §2.9 (nunca bloqueia)
  // ===================================================================

  function registerCheck(id, def) {
    if (!id || !def) return;
    S.checks[id] = {
      q: def.q || '',
      options: def.options || [],
      answer: def.answer,
      explain: def.explain || {} // { indice: "feedback explicativo" }
    };
  }

  function submitCheck(id, choice) {
    var def = S.checks[id];
    var checks = getChecks();
    var correct = false;
    if (def) correct = (choice === def.answer);
    checks[id] = { choice: choice, correct: correct, ts: Date.now() };
    setChecks(checks);
    // feedback explicativo por opcao — NUNCA bloqueia avanco
    paintCheckFeedback(id, choice, correct, def);
    emit('progress', { kind: 'check', id: id, correct: correct });
    return { correct: correct };
  }

  function paintCheckFeedback(id, choice, correct, def) {
    try {
      var host = document.querySelector('[data-inema-check="' + cssAttrEsc(id) + '"]');
      if (!host) return;
      var fb = host.querySelector('[data-inema-check-feedback]');
      if (!fb) {
        fb = el('div', 'inema-check-feedback');
        fb.setAttribute('data-inema-check-feedback', '');
        host.appendChild(fb);
      }
      fb.innerHTML = '';
      fb.classList.toggle('is-correct', correct);
      fb.classList.toggle('is-wrong', !correct);
      var msg = correct ? 'Correto. ' : 'Reveja: ';
      var expl = (def && def.explain && def.explain[choice]) ? def.explain[choice] : '';
      fb.appendChild(el('p', null, msg + expl));
      // realca a opcao escolhida
      var opts = host.querySelectorAll('[data-inema-check-option]');
      for (var i = 0; i < opts.length; i++) {
        var v = opts[i].getAttribute('data-inema-check-option');
        opts[i].classList.toggle('is-chosen', String(v) === String(choice));
        opts[i].classList.toggle('is-answer', def && String(v) === String(def.answer));
      }
    } catch (e) { warn('[INEMA] check feedback:', e); }
  }

  // ===================================================================
  // 11. SELETOR DE APARENCIA (popover na nav) — §3.8
  // ===================================================================

  function syncAppearanceUI() {
    // reflete estado por icone+texto nos controles existentes
    try {
      var p = getPrefs();
      var panels = document.querySelectorAll('[data-inema-appearance]');
      for (var i = 0; i < panels.length; i++) {
        var panel = panels[i];
        markActive(panel, '[data-inema-set-theme]', 'data-inema-set-theme', p.theme);
        markActive(panel, '[data-inema-set-font]', 'data-inema-set-font', p.font);
        markActive(panel, '[data-inema-set-fontscale]', 'data-inema-set-fontscale', String(p.fontScale));
        markActive(panel, '[data-inema-set-linewidth]', 'data-inema-set-linewidth', String(p.lineWidth));
        markActive(panel, '[data-inema-set-leading]', 'data-inema-set-leading', String(p.leading));
        markActive(panel, '[data-inema-set-accent]', 'data-inema-set-accent', p.accent);
      }
      // toggle sol/lua legado: mantem icones coerentes se existirem
      syncLegacyThemeIcons();
    } catch (e) {}
  }

  function markActive(panel, sel, attr, val) {
    var btns = panel.querySelectorAll(sel);
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute(attr) === val;
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      btns[i].classList.toggle('is-active', on);
    }
  }

  function syncLegacyThemeIcons() {
    var darkIcon = document.getElementById('theme-toggle-dark-icon');
    var lightIcon = document.getElementById('theme-toggle-light-icon');
    if (!darkIcon || !lightIcon) return;
    var isDark = document.documentElement.classList.contains('dark');
    // mostra o icone da acao oposta, como no v1
    if (isDark) { darkIcon.classList.add('hidden'); lightIcon.classList.remove('hidden'); }
    else { lightIcon.classList.add('hidden'); darkIcon.classList.remove('hidden'); }
  }

  // ===================================================================
  // 12. DELEGACAO DE EVENTOS (um listener) + BOOT
  // ===================================================================

  function onMainClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // marcar lido
    var rt = t.closest('[data-inema-read-toggle]');
    if (rt) {
      var sec = rt.closest('[data-inema-topic]');
      var id = sec ? sec.getAttribute('data-inema-topic') : rt.getAttribute('data-inema-read-toggle');
      if (id) { markRead(id, !isRead(id)); }
      return;
    }
    // duvida rapida
    var dt = t.closest('[data-inema-doubt-toggle]');
    if (dt) {
      var dsec = dt.closest('[data-inema-topic]');
      var did = dsec ? dsec.getAttribute('data-inema-topic') : dt.getAttribute('data-inema-doubt-toggle');
      if (did) toggleDoubt(did);
      return;
    }
    // abrir jornada
    var jo = t.closest('[data-inema-journey-open]');
    if (jo) { e.preventDefault(); openJourney(); return; }

    // remover/editar highlight clicando no mark (abre prompt simples)
    var mk = t.closest('mark.inema-hl');
    if (mk) {
      onMarkClick(mk, e);
      return;
    }

    // seletor de aparencia (botoes data-inema-set-*)
    handleAppearanceClick(t);

    // checagem leve
    var opt = t.closest('[data-inema-check-option]');
    if (opt) {
      var checkHost = opt.closest('[data-inema-check]');
      if (checkHost) {
        var cid = checkHost.getAttribute('data-inema-check');
        submitCheck(cid, opt.getAttribute('data-inema-check-option'));
      }
      return;
    }
  }

  function handleAppearanceClick(t) {
    var map = [
      ['data-inema-set-theme', 'theme'],
      ['data-inema-set-font', 'font'],
      ['data-inema-set-fontscale', 'fontScale'],
      ['data-inema-set-linewidth', 'lineWidth'],
      ['data-inema-set-leading', 'leading'],
      ['data-inema-set-accent', 'accent']
    ];
    for (var i = 0; i < map.length; i++) {
      var btn = t.closest('[' + map[i][0] + ']');
      if (btn) {
        var raw = btn.getAttribute(map[i][0]);
        var prefKey = map[i][1];
        var val = (prefKey === 'fontScale' || prefKey === 'lineWidth') ? parseInt(raw, 10)
          : (prefKey === 'leading' ? parseFloat(raw) : raw);
        setPref(prefKey, val);
        return true;
      }
    }
    // botoes de ciclo
    var cyc = t.closest('[data-inema-cycle]');
    if (cyc) { cyclePref(cyc.getAttribute('data-inema-cycle')); return true; }
    // toggle de painel de aparencia
    var toggleBtn = t.closest('[data-inema-appearance-toggle]');
    if (toggleBtn) {
      var targetSel = toggleBtn.getAttribute('data-inema-appearance-toggle');
      var panel = targetSel ? document.querySelector(targetSel) : document.querySelector('[data-inema-appearance]');
      if (panel) {
        var open = panel.getAttribute('data-open') !== 'true';
        panel.setAttribute('data-open', open ? 'true' : 'false');
        toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      return true;
    }
    return false;
  }

  function onMarkClick(mark, e) {
    var id = mark.getAttribute('data-inema-note');
    if (!id) return;
    // mini-menu: nota / cor / excluir
    var existing = document.getElementById('inema-mark-menu');
    if (existing) try { existing.parentNode.removeChild(existing); } catch (err) {}
    var menu = el('div', 'inema-mark-menu');
    menu.id = 'inema-mark-menu';
    menu.style.position = 'absolute';
    var r = mark.getBoundingClientRect();
    menu.style.top = (r.bottom + (window.scrollY || 0) + 4) + 'px';
    menu.style.left = (r.left + (window.scrollX || 0)) + 'px';

    var noteBtn = el('button', 'inema-btn inema-btn--ghost', 'Nota');
    noteBtn.type = 'button';
    noteBtn.addEventListener('click', function () {
      var f = findNote(id);
      var cur = f && f.rec.note ? f.rec.note : '';
      var txt = window.prompt('Sua anotacao:', cur);
      if (txt !== null) promoteToNote(id, txt);
      removeMarkMenu();
    });
    menu.appendChild(noteBtn);

    var delBtn = el('button', 'inema-btn inema-btn--ghost', 'Excluir');
    delBtn.type = 'button';
    delBtn.addEventListener('click', function () { removeNote(id); removeMarkMenu(); });
    menu.appendChild(delBtn);

    (document.body || document.documentElement).appendChild(menu);
  }

  function removeMarkMenu() {
    var m = document.getElementById('inema-mark-menu');
    if (m) try { m.parentNode.removeChild(m); } catch (e) {}
  }

  // popover de selecao: clique nos swatches / acoes
  function onSelPopClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var sw = t.closest('[data-inema-swatch]');
    if (sw) {
      var color = sw.getAttribute('data-inema-swatch');
      var r = currentRange();
      if (r) highlight(r, { color: color });
      clearSelectionAndHide();
      return;
    }
    var act = t.closest('[data-inema-act]');
    if (act) {
      var a = act.getAttribute('data-inema-act');
      var rng = currentRange();
      if (a === 'copy' && rng) { copyText(rng.toString()); clearSelectionAndHide(); return; }
      if (a === 'note' && rng) {
        var txt = window.prompt('Sua anotacao:', '');
        var nid = highlight(rng, { color: 'yellow' });
        if (nid && txt !== null && txt !== '') promoteToNote(nid, txt);
        clearSelectionAndHide();
        return;
      }
    }
  }

  function clearSelectionAndHide() {
    try { var s = window.getSelection(); if (s) s.removeAllRanges(); } catch (e) {}
    hideSelectionPopover();
  }

  // scrollspy / TOC
  function setupTOC() {
    var toc = document.querySelector('[data-inema-toc]');
    var topics = topicEls();
    if (!topics.length) return;
    // indicador "Secao N de M"
    var counter = document.querySelector('[data-inema-section-counter]');
    if (!('IntersectionObserver' in window)) {
      // sem IO: degrade silencioso (links do TOC ainda funcionam)
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.getAttribute('data-inema-topic');
        if (toc) {
          var links = toc.querySelectorAll('a[href]');
          for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href') || '';
            var on = href.indexOf(en.target.id) !== -1 && en.target.id;
            links[i].classList.toggle('is-active', !!on);
            if (on) links[i].setAttribute('aria-current', 'true');
            else links[i].removeAttribute('aria-current');
          }
        }
        if (counter) {
          var idx = topics.indexOf(en.target);
          counter.textContent = 'Secao ' + (idx + 1) + ' de ' + topics.length;
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    topics.forEach(function (s) { io.observe(s); });
  }

  function rehydrateAll() {
    // pinta lidos
    try {
      var read = getRead();
      for (var id in read) if (read[id] === true) paintReadControls(id, true);
      // garante estado off coerente p/ os demais botoes
      var btns = document.querySelectorAll('[data-inema-read-toggle]');
      for (var i = 0; i < btns.length; i++) {
        var sec = btns[i].closest('[data-inema-topic]');
        var bid = sec ? sec.getAttribute('data-inema-topic') : btns[i].getAttribute('data-inema-read-toggle');
        setReadButtonVisual(btns[i], read[bid] === true, sec);
      }
    } catch (e) {}
    // pinta duvidas
    try {
      var d = getDoubts();
      var dbtns = document.querySelectorAll('[data-inema-doubt-toggle]');
      for (var k = 0; k < dbtns.length; k++) {
        var dsec = dbtns[k].closest('[data-inema-topic]');
        var did = dsec ? dsec.getAttribute('data-inema-topic') : dbtns[k].getAttribute('data-inema-doubt-toggle');
        paintDoubtControls(did, !!d[did]);
      }
    } catch (e) {}
    // re-aplica highlights (tolerante por nota)
    try { renderHighlights(document); } catch (e) {}
    // medidores
    renderMeters();
    // badge da jornada
    updateJourneyBadge();
  }

  function updateJourneyBadge() {
    try {
      var badges = document.querySelectorAll('[data-inema-journey-badge]');
      if (!badges.length) return;
      var doubts = listDoubts().filter(function (d) { return !d.resolved; }).length;
      var pr = progress('curso');
      for (var i = 0; i < badges.length; i++) {
        badges[i].classList.add('inema-journey-badge');
        badges[i].textContent = String(doubts);
        badges[i].setAttribute('data-doubts', String(doubts));
        // data-count gateia o display via CSS ([data-count="0"]{display:none})
        badges[i].setAttribute('data-count', String(doubts));
      }
    } catch (e) {}
  }

  function bindGlobalListeners() {
    if (S.bound) return;
    // A navegacao v2 e compartilhada e fica fora de <main>. Delegar no documento
    // mantem os controles globais (Jornada/Aparencia) e os controles de conteudo
    // sob um unico listener, inclusive nas paginas legadas do FEP.
    document.addEventListener('click', onMainClick);

    // teclado: Space/Enter em botoes de lido (aria-pressed) ja e nativo em <button>

    // selecao -> popover
    document.addEventListener('mouseup', function () {
      // debounce curto pra deixar a selecao estabilizar
      debounce('selend', onSelectionEnd, 10);
    });
    document.addEventListener('touchend', function () {
      debounce('selend', onSelectionEnd, 10);
    });

    // fechar popover em mousedown fora / selecao vazia
    document.addEventListener('mousedown', function (e) {
      if (S.selPopover && S.selPopover.style.display !== 'none') {
        if (!e.target.closest || !e.target.closest('.inema-selpop')) {
          // se clicou fora do popover, deixa o mouseup decidir; mas se selecao colapsou, esconde
          if (!currentRange()) hideSelectionPopover();
        }
      }
      // fecha mini-menu do mark
      if (!e.target.closest || !e.target.closest('#inema-mark-menu')) removeMarkMenu();
    });

    // clicks no proprio popover de selecao
    buildSelectionPopover().addEventListener('click', onSelPopClick);

    // checkpoint em visibilitychange (melhor que beforeunload no mobile)
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') saveCheckpoint();
    });
    window.addEventListener('pagehide', function () { saveCheckpoint(); });

    // ESC global fecha mini-menus
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { removeMarkMenu(); if (S.selPopover) hideSelectionPopover(); }
    });

    S.bound = true;
  }

  // ===================================================================
  // 13. INIT — idempotente e re-entrant
  // ===================================================================

  function init(opts) {
    opts = opts || {};
    // probe de storage -> modo efemero se indisponivel
    if (!S.inited) {
      var ok = probeStorage();
      S.ephemeral = !ok;
      if (S.ephemeral) {
        notify('Modo leitura: seu progresso nao sera salvo neste navegador.', 'warn');
      }
      S.courseId = opts.courseId || detectCourseId();
    }

    // aplica prefs (anti-FOUC ja rodou; aqui garante consistencia total)
    applyPrefs();
    syncAppearanceUI();

    // feature-detect: so ativa o que existe
    bindGlobalListeners();   // re-entrant via S.bound guard
    rehydrateAll();
    setupTOC();

    // resume automatico opt-in
    if (opts.autoResume) resume();

    S.inited = true;
    emit('progress', { kind: 'init', progress: progress('curso') });
    return window.INEMA;
  }

  // ===================================================================
  // 14. API PUBLICA
  // ===================================================================

  var API = {
    __core: true,
    // boot
    init: init,
    applyPrefs: applyPrefs,
    // progresso
    markRead: markRead,
    isRead: isRead,
    progress: progress,
    renderMeters: renderMeters,
    // duvida
    toggleDoubt: toggleDoubt,
    setDoubtResolved: setDoubtResolved,
    listDoubts: listDoubts,
    // notas / highlight
    highlight: highlight,
    promoteToNote: promoteToNote,
    editNote: editNote,
    removeNote: removeNote,
    renderHighlights: renderHighlights,
    // jornada
    openJourney: openJourney,
    closeJourney: closeJourney,
    renderJourney: renderJourney,
    // continuar
    saveCheckpoint: saveCheckpoint,
    resume: resume,
    // export / import
    exportJSON: exportJSON,
    importJSON: importJSON,
    downloadJSON: downloadJSON,
    // tema / prefs
    setPref: setPref,
    getPrefs: getPrefs,
    cyclePref: cyclePref,
    // checagem
    registerCheck: registerCheck,
    submitCheck: submitCheck,
    // utilitarios expostos (uso avancado / testes)
    _internal: {
      storageGet: storageGet, storageSet: storageSet, safeJSON: safeJSON,
      probeStorage: probeStorage, migrate: migrate, domTotals: domTotals,
      coreVars: coreVars, resetCourse: resetCourse, courseId: function () { return S.courseId; }
    }
  };

  window.INEMA = API;

  // auto-boot leve: aplica prefs assim que possivel; init completo no DOMContentLoaded
  // (o anti-FOUC bloqueante no <head> ja aplicou tema antes do paint; isto reforca)
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        // nao auto-init: a pagina chama INEMA.init() no fim do body (snippet canonico).
        // mas aplica prefs cedo p/ componentes que dependem das CSS vars.
        applyPrefs();
      });
    }
  } catch (e) {}

})(window, document);
