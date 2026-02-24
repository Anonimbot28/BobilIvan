/* ==========================================
   SCROLL ANIMATIONS — PresentationLab
   Послідовні анімації при прокручуванні
   ========================================== */
(function () {
  'use strict';

  /* ── inject global CSS ── */
  var s = document.createElement('style');
  s.textContent = `
    /* --- reveal (legacy class) --- */
    .reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
    }
    .reveal.active { opacity:1; transform:none; }

    /* --- work-item: slide from left --- */
    .work-item {
      opacity: 0;
      transform: translateX(-28px);
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1),
                  border-color .3s, box-shadow .3s;
    }
    .work-item.anim-in { opacity:1; transform:none; }

    /* --- tip-card / feature-card / sw-card: rise up --- */
    .tip-card, .feature-card, .sw-card {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1),
                  border-color .3s, box-shadow .3s, background .3s;
    }
    .tip-card.anim-in, .feature-card.anim-in, .sw-card.anim-in { opacity:1; transform:none; }

    /* --- logo-card: pop in --- */
    .logo-card {
      opacity: 0;
      transform: translateY(18px) scale(.92);
      transition: opacity .5s cubic-bezier(.22,1,.36,1),
                  transform .5s cubic-bezier(.34,1.56,.64,1),
                  border-color .3s, box-shadow .3s;
    }
    .logo-card.anim-in { opacity:1; transform:none; }

    /* --- stat-item --- */
    .stat-item {
      opacity: 0;
      transform: translateY(18px) scale(.95);
      transition: opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1);
    }
    .stat-item.anim-in { opacity:1; transform:none; }

    /* --- footer boxes --- */
    .footer-contact-box {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .55s ease, transform .55s ease, background .3s, border-color .3s;
    }
    .footer-contact-box.anim-in { opacity:1; transform:none; }
    .footer-contact-box:hover { transform: translateY(-6px) !important; }

    /* --- footer columns --- */
    .footer-column {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .5s ease, transform .5s ease;
    }
    .footer-column.anim-in { opacity:1; transform:none; }

    /* --- table rows --- */
    .table-wrap tbody tr {
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity .4s ease, transform .4s ease, background .2s;
    }

    /* --- section accent line --- */
    .sa-line {
      display: block;
      height: 3px;
      width: 0;
      border-radius: 2px;
      background: linear-gradient(90deg,#6c63ff,#00c9a7);
      margin-bottom: 14px;
      transition: width .9s cubic-bezier(.22,1,.36,1);
    }
    .sa-line.anim-in { width: 56px; }

    /* --- hero cards from sides --- */
    .hero-grid .card:first-child {
      opacity: 0; transform: translateX(-32px);
      transition: opacity .8s cubic-bezier(.22,1,.36,1) .1s, transform .8s cubic-bezier(.22,1,.36,1) .1s;
    }
    .hero-grid .card:last-child {
      opacity: 0; transform: translateX(32px);
      transition: opacity .8s cubic-bezier(.22,1,.36,1) .2s, transform .8s cubic-bezier(.22,1,.36,1) .2s;
    }
    .hero-grid.anim-in .card:first-child,
    .hero-grid.anim-in .card:last-child { opacity:1; transform:none; }

    /* no-animations override */
    body.no-animations .reveal,
    body.no-animations .work-item,
    body.no-animations .tip-card,
    body.no-animations .feature-card,
    body.no-animations .sw-card,
    body.no-animations .logo-card,
    body.no-animations .stat-item,
    body.no-animations .footer-contact-box,
    body.no-animations .footer-column,
    body.no-animations .hero-grid .card,
    body.no-animations .table-wrap tbody tr,
    body.no-animations .sa-line {
      opacity:1 !important; transform:none !important; transition:none !important; width:56px !important;
    }
  `;
  document.head.appendChild(s);

  /* ── helper: make observer ── */
  function obs(threshold, margin, cb) {
    return new IntersectionObserver(cb, { threshold: threshold, rootMargin: margin });
  }

  /* ── generic sequential: animates children of each entering parent ── */
  function seqGroup(selector, delay) {
    var o = obs(0.08, '0px 0px -40px 0px', function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var siblings = e.target.parentElement
          ? Array.from(e.target.parentElement.querySelectorAll(selector))
          : [e.target];
        var idx = siblings.indexOf(e.target);
        setTimeout(function () { e.target.classList.add('anim-in'); }, idx * (delay || 90));
        o.unobserve(e.target);
      });
    });
    document.querySelectorAll(selector).forEach(function (el) { o.observe(el); });
  }

  /* ── reveal (legacy) ── */
  (function () {
    var o = obs(0.1, '0px 0px -80px 0px', function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = parseInt(e.target.dataset.delay || 0);
        setTimeout(function () { e.target.classList.add('active'); }, d);
        o.unobserve(e.target);
      });
    });
    document.querySelectorAll('.reveal').forEach(function (el) { o.observe(el); });
  })();

  /* ── hero-grid ── */
  (function () {
    var o = obs(0.05, '0px', function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('anim-in');
        o.unobserve(e.target);
      });
    });
    document.querySelectorAll('.hero-grid').forEach(function (el) { o.observe(el); });
  })();

  /* ── stats ── */
  (function () {
    var o = obs(0.2, '0px', function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var items = e.target.querySelectorAll('.stat-item');
        items.forEach(function (item, i) {
          setTimeout(function () { item.classList.add('anim-in'); }, i * 120);
        });
        /* counter */
        e.target.querySelectorAll('.stat-num[data-target]').forEach(function (el, i) {
          setTimeout(function () {
            var target = parseInt(el.dataset.target);
            var suffix = el.dataset.suffix || '';
            var start = performance.now();
            var dur = 1400;
            (function tick(now) {
              var p = Math.min((now - start) / dur, 1);
              var ease = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(ease * target) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            })(start);
          }, i * 120 + 100);
        });
        o.unobserve(e.target);
      });
    });
    document.querySelectorAll('.stats-row, .stats-bar').forEach(function (el) { o.observe(el); });
  })();

  /* ── logo grid ── */
  (function () {
    var o = obs(0.1, '0px 0px -40px 0px', function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.logo-card').forEach(function (c, i) {
          setTimeout(function () { c.classList.add('anim-in'); }, i * 100);
        });
        o.unobserve(e.target);
      });
    });
    document.querySelectorAll('.logos-grid').forEach(function (el) { o.observe(el); });
  })();

  /* ── table rows ── */
  (function () {
    document.querySelectorAll('.table-wrap').forEach(function (wrap) {
      var rows = wrap.querySelectorAll('tbody tr');
      var o = obs(0.05, '0px 0px -40px 0px', function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          rows.forEach(function (r, i) {
            setTimeout(function () { r.style.opacity = '1'; r.style.transform = 'none'; }, i * 60 + 80);
          });
          o.unobserve(e.target);
        });
      });
      o.observe(wrap);
    });
  })();

  /* ── section accent lines ── */
  (function () {
    document.querySelectorAll('.section h2, .section-title').forEach(function (h) {
      if (h.previousElementSibling && h.previousElementSibling.classList.contains('sa-line')) return;
      var line = document.createElement('span');
      line.className = 'sa-line';
      h.parentElement.insertBefore(line, h);
      var o = obs(0.5, '0px', function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { line.classList.add('anim-in'); o.unobserve(e.target); }
        });
      });
      o.observe(h);
    });
  })();

  /* ── sequential groups ── */
  seqGroup('.work-item',          100);
  seqGroup('.tip-card',            90);
  seqGroup('.feature-card',        80);
  seqGroup('.sw-card',             90);
  seqGroup('.footer-contact-box',  90);
  seqGroup('.footer-column',       90);

})();
