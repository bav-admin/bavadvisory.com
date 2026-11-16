/* Budaya Alam Advisory — interaksi situs */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'bav-a11y';

  /* ---------- Penyimpanan preferensi (aman bila storage diblokir) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  var state = load();
  var TOGGLES = ['contrast', 'spacing', 'font', 'links', 'motion'];

  function apply() {
    if (state.size) root.setAttribute('data-size', state.size);
    else root.removeAttribute('data-size');
    TOGGLES.forEach(function (k) { root.classList.toggle('a11y-' + k, !!state[k]); });
  }

  /* ---------- Panel aksesibilitas ---------- */
  var panel = document.getElementById('a11y-panel');
  var trigger = document.querySelector('.a11y-trigger');

  if (panel && trigger) {
    function sync() {
      panel.querySelectorAll('input[name="size"]').forEach(function (r) {
        r.checked = (r.value === (state.size || ''));
      });
      TOGGLES.forEach(function (k) {
        var el = panel.querySelector('input[name="' + k + '"]');
        if (el) el.checked = !!state[k];
      });
    }

    trigger.addEventListener('click', function () {
      sync();
      if (typeof panel.showModal === 'function') panel.showModal();
      else panel.setAttribute('open', '');
      trigger.setAttribute('aria-expanded', 'true');
    });

    panel.addEventListener('close', function () {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    });

    panel.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'size') state.size = t.value || undefined;
      else if (TOGGLES.indexOf(t.name) > -1) state[t.name] = t.checked || undefined;
      apply(); save(state);
    });

    panel.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (typeof panel.close === 'function') panel.close(); else panel.removeAttribute('open');
      });
    });

    var reset = panel.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', function () {
      state = {}; apply(); save(state); sync();
    });

    /* Klik di luar kotak dialog menutup panel */
    panel.addEventListener('click', function (e) {
      if (e.target === panel) panel.close();
    });

    trigger.setAttribute('aria-expanded', 'false');
  }

  /* ---------- Menu seluler ---------- */
  var nav = document.querySelector('.site-nav');
  var navBtn = document.querySelector('.nav-toggle');
  if (nav && navBtn) {
    function setNav(open) {
      nav.classList.toggle('is-open', open);
      navBtn.setAttribute('aria-expanded', String(open));
    }
    navBtn.addEventListener('click', function () {
      setNav(navBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.querySelectorAll('ul a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); navBtn.focus(); }
    });
  }

  /* ---------- Visual titik untuk Adat dan Iklim (dekoratif) ---------- */
  var atlas = document.getElementById('atlas-dots');
  if (atlas) {
    var ns = 'http://www.w3.org/2000/svg';
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    /* Pita kepulauan yang menurun dari barat laut ke tenggara */
    for (var row = 0; row < 12; row++) {
      for (var col = 0; col < 15; col++) {
        var x = 18 + col * 23, y = 20 + row * 24;
        var band = Math.abs(row - (2 + col * 0.45));
        if (band > 3.2 || rnd() < 0.18) continue;
        var c = document.createElementNS(ns, 'circle');
        var on = rnd() < 0.16;
        c.setAttribute('cx', x); c.setAttribute('cy', y);
        c.setAttribute('r', on ? 7 : 3);
        if (on) c.setAttribute('class', 'on');
        atlas.appendChild(c);
      }
    }
  }

  var tahun = document.getElementById('tahun');
  if (tahun) tahun.textContent = new Date().getFullYear();
})();
