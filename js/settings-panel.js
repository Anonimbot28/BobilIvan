(function () {
  var panelHTML = `
    <button id="settings-toggle" title="Налаштування" aria-label="Налаштування" aria-expanded="false">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>

    <div id="settings-panel" role="dialog" aria-modal="true" aria-label="Налаштування">
      <div class="sp-header">
        <span class="sp-header-icon">⚙️</span>
        <div><div class="sp-header-text">Налаштування</div><div class="sp-header-sub">Персоналізуй сайт під себе</div></div>
        <button class="sp-close-btn" id="sp-close-btn" aria-label="Закрити">✕</button>
      </div>

      <div class="sp-section">
        <div class="sp-section-title">Вигляд</div>
        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🌙</span>Тема</span>
          <button class="sp-btn" id="sp-theme-btn">☀️ Світла</button>
        </div>
        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🔆</span>Контраст</span>
          <button class="sp-btn" id="sp-contrast-btn">Увімк.</button>
        </div>
        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">🖼</span>Фон</span>
          <div class="sp-slider-wrap">
            <input class="sp-slider" type="range" min="0" max="100" value="100" id="sp-bg-slider">
            <span class="sp-slider-val" id="sp-bg-val">100%</span>
          </div>
        </div>
      </div>

      <div class="sp-section">
        <div class="sp-section-title">Текст</div>
        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">📝</span>Розмір</span>
          <div class="sp-size-controls">
            <button id="sp-size-down">−</button>
            <span id="sp-size-val">100%</span>
            <button id="sp-size-up">+</button>
          </div>
        </div>
        <div class="sp-row">
          <span class="sp-label"><span class="sp-label-icon">📖</span>Режим читання</span>
          <button class="sp-btn" id="sp-read-btn">Увімк.</button>
        </div>
      </div>

      <div class="sp-section">
        <div class="sp-section-title">Режими</div>
        <div class="sp-compact-row">
          <button class="sp-compact-btn" id="sp-anim-btn"><span class="cb-icon">✨</span><span class="cb-label">Анімації</span></button>
          <button class="sp-compact-btn" id="sp-compact-btn"><span class="cb-icon">⬜</span><span class="cb-label">Компактно</span></button>
          <button class="sp-compact-btn" id="sp-focus-btn"><span class="cb-icon">🎯</span><span class="cb-label">Фокус</span></button>
          <button class="sp-compact-btn" id="sp-cursor-btn"><span class="cb-icon">🖱</span><span class="cb-label">Курсор</span></button>
        </div>
      </div>

      <div class="sp-section">
        <div class="sp-section-title">Швидкість анімацій</div>
        <div class="sp-speed-btns">
          <button class="sp-speed-btn" data-speed="0.5">0.5×</button>
          <button class="sp-speed-btn active" data-speed="1">1×</button>
          <button class="sp-speed-btn" data-speed="1.5">1.5×</button>
          <button class="sp-speed-btn" data-speed="2">2×</button>
        </div>
      </div>

      <a class="sp-vpu-link" href="https://vpu1.inf.ua/" target="_blank" rel="noopener">
        <div class="sp-vpu-icon">🎓</div>
        <div class="sp-vpu-text">ВПУ №1 міста Рівного<div class="sp-vpu-sub">vpu1.inf.ua — офіційний сайт</div></div>
        <span style="margin-left:auto;color:rgba(255,255,255,0.2);font-size:12px;">↗</span>
      </a>

      <div class="sp-footer-zone">
        <button id="sp-reset-btn">↺ Скинути всі налаштування</button>
        <button id="sp-exit-btn">→ Вийти з сайту</button>
      </div>
    </div>
  `;

  var wrapper = document.createElement('div');
  wrapper.innerHTML = panelHTML;
  document.body.appendChild(wrapper);

  var toggle = document.getElementById('settings-toggle'),
      panel  = document.getElementById('settings-panel'),
      closeBtn = document.getElementById('sp-close-btn'),
      themeBtn = document.getElementById('sp-theme-btn'),
      contrastBtn = document.getElementById('sp-contrast-btn'),
      readBtn = document.getElementById('sp-read-btn'),
      sizeUp = document.getElementById('sp-size-up'),
      sizeDown = document.getElementById('sp-size-down'),
      sizeVal = document.getElementById('sp-size-val'),
      bgSlider = document.getElementById('sp-bg-slider'),
      bgVal = document.getElementById('sp-bg-val'),
      animBtn = document.getElementById('sp-anim-btn'),
      compactBtn = document.getElementById('sp-compact-btn'),
      focusBtn = document.getElementById('sp-focus-btn'),
      cursorBtn = document.getElementById('sp-cursor-btn'),
      resetBtn = document.getElementById('sp-reset-btn'),
      exitBtn = document.getElementById('sp-exit-btn'),
      speedBtns = document.querySelectorAll('.sp-speed-btn');

  var isOpen = false;
  var closeTimer = null;

  var state = {
    fontSize:  parseInt(localStorage.getItem('sp_fontSize') || '100', 10),
    lightMode: localStorage.getItem('sp_light') === 'true',
    readMode:  localStorage.getItem('sp_reading') === 'true',
    contrast:  localStorage.getItem('sp_contrast') === 'true',
    noAnim:    localStorage.getItem('sp_noAnim') === 'true',
    compact:   localStorage.getItem('sp_compact') === 'true',
    focus:     localStorage.getItem('sp_focus') === 'true',
    cursor:    localStorage.getItem('sp_cursor') !== 'false',
    bgOpacity: parseInt(localStorage.getItem('sp_bgOpacity') || '100', 10),
    speed:     parseFloat(localStorage.getItem('sp_speed') || '1'),
  };

  applyAll();

  function openPanel() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    isOpen = true;
    panel.classList.remove('sp-closing');
    panel.classList.add('sp-open');
    toggle.classList.add('sp-open-btn');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove('sp-open');
    panel.classList.add('sp-closing');
    toggle.classList.remove('sp-open-btn');
    toggle.setAttribute('aria-expanded', 'false');
    closeTimer = setTimeout(function() {
      panel.classList.remove('sp-closing');
    }, 350);
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen ? closePanel() : openPanel();
  });

  if (closeBtn) closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closePanel();
  });

  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && e.target !== toggle) closePanel();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  themeBtn.addEventListener('click', function() { state.lightMode = !state.lightMode; localStorage.setItem('sp_light', state.lightMode); applyTheme(); });
  contrastBtn.addEventListener('click', function() { state.contrast = !state.contrast; localStorage.setItem('sp_contrast', state.contrast); applyContrast(); });
  readBtn.addEventListener('click', function() { state.readMode = !state.readMode; localStorage.setItem('sp_reading', state.readMode); applyReading(); });
  sizeUp.addEventListener('click', function() { if (state.fontSize < 150) { state.fontSize += 10; localStorage.setItem('sp_fontSize', state.fontSize); applyFontSize(); } });
  sizeDown.addEventListener('click', function() { if (state.fontSize > 70) { state.fontSize -= 10; localStorage.setItem('sp_fontSize', state.fontSize); applyFontSize(); } });
  bgSlider.value = state.bgOpacity;
  bgSlider.addEventListener('input', function() { state.bgOpacity = parseInt(this.value, 10); localStorage.setItem('sp_bgOpacity', state.bgOpacity); applyBgOpacity(); });
  animBtn.addEventListener('click', function() { state.noAnim = !state.noAnim; localStorage.setItem('sp_noAnim', state.noAnim); applyAnimations(); });
  compactBtn.addEventListener('click', function() { state.compact = !state.compact; localStorage.setItem('sp_compact', state.compact); applyCompact(); });
  focusBtn.addEventListener('click', function() { state.focus = !state.focus; localStorage.setItem('sp_focus', state.focus); applyFocus(); });
  cursorBtn.addEventListener('click', function() { state.cursor = !state.cursor; localStorage.setItem('sp_cursor', state.cursor); applyCursor(); });
  speedBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.speed = parseFloat(this.dataset.speed);
      localStorage.setItem('sp_speed', state.speed);
      applySpeed();
      speedBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });
  resetBtn.addEventListener('click', function() { localStorage.clear(); location.reload(); });
  exitBtn.addEventListener('click', function() { if (confirm('Справді бажаєте вийти?')) window.location.href = 'about:blank'; });

  function applyAll() { applyTheme(); applyContrast(); applyReading(); applyFontSize(); applyBgOpacity(); applyAnimations(); applyCompact(); applyFocus(); applyCursor(); applySpeed(); syncSpeedBtns(); }
  function applyTheme() { document.body.classList.toggle('light-mode', state.lightMode); themeBtn.innerHTML = state.lightMode ? '🌙 Темна' : '☀️ Світла'; themeBtn.classList.toggle('active', state.lightMode); }
  function applyContrast() { document.body.classList.toggle('high-contrast', state.contrast); contrastBtn.innerHTML = state.contrast ? 'Вимк.' : 'Увімк.'; contrastBtn.classList.toggle('active', state.contrast); }
  function applyReading() { document.body.classList.toggle('reading-mode', state.readMode); readBtn.innerHTML = state.readMode ? 'Вимк.' : 'Увімк.'; readBtn.classList.toggle('active', state.readMode); }
  function applyFontSize() { document.documentElement.style.fontSize = state.fontSize + '%'; sizeVal.textContent = state.fontSize + '%'; }
  function applyBgOpacity() { var el = document.querySelector('.logo-bg'); if (el) el.style.opacity = state.bgOpacity / 100; bgVal.textContent = state.bgOpacity + '%'; bgSlider.value = state.bgOpacity; }
  function applyAnimations() { document.body.classList.toggle('no-animations', state.noAnim); animBtn.classList.toggle('active', !state.noAnim); animBtn.querySelector('.cb-label').textContent = state.noAnim ? 'Вимкн.' : 'Анімації'; }
  function applyCompact() { document.body.classList.toggle('compact-mode', state.compact); compactBtn.classList.toggle('active', state.compact); }
  function applyFocus() { document.body.classList.toggle('focus-mode', state.focus); focusBtn.classList.toggle('active', state.focus); }
  function applyCursor() { var cur = document.querySelector('.custom-cursor'); if (cur) cur.style.display = state.cursor ? 'block' : 'none'; cursorBtn.classList.toggle('active', state.cursor); }
  function applySpeed() {
    var s = document.getElementById('sp-speed-style'); if (s) s.remove();
    var st = document.createElement('style'); st.id = 'sp-speed-style';
    st.textContent = state.speed !== 1 ? `*,*::before,*::after{animation-duration:calc(var(--sp-dur,1s)/${state.speed})!important;transition-duration:calc(0.3s/${state.speed})!important;}` : '';
    document.head.appendChild(st);
  }
  function syncSpeedBtns() { speedBtns.forEach(function(b) { b.classList.toggle('active', parseFloat(b.dataset.speed) === state.speed); }); }
})();
