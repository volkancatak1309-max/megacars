/* Mega Cars 360° viewer: one canvas, no dependencies, no Three.js.
 * Rule (Volkan, 22.10.2026): seen from above the car turns clockwise, one turn ≈ 40 s,
 * speed and direction come from one setting; drag follows the pointer, release coasts to a stop,
 * after 3 s without input it slowly turns again; reduced motion disables auto-turn and inertia.
 *
 * MCSpin.mount(el, {
 *   frames: ['f/000.webp', …],      // ordered by camera angle
 *   framesSmall: […],               // optional, used below 900 px width
 *   loop: true,                     // false = partial arc (demo clips only)
 *   cameraDirection: 'cw' | 'ccw',  // camera path around the car, seen from above
 *   autoRotate: { degPerSec: 9, direction: 'cw', resumeAfterMs: 3000, rampMs: 1200 },
 *   degPerFrame: 5,
 *   label: 'Mercedes-Benz …, 360-Grad-Ansicht'
 * })
 */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mount(root, opt) {
    var small = (opt.framesSmall && Math.min(window.innerWidth, screen.width) < 900);
    var srcs = small ? opt.framesSmall : opt.frames;
    var n = srcs.length;
    var loop = opt.loop !== false;
    var ar = Object.assign({ degPerSec: 9, direction: 'cw', resumeAfterMs: 3000, rampMs: 1200 }, opt.autoRotate || {});
    var degPerFrame = opt.degPerFrame || 360 / n;
    // frame index step that makes the car turn clockwise (seen from above)
    var cwSign = opt.cameraDirection === 'ccw' ? 1 : -1;
    var autoSign = (ar.direction === 'ccw' ? -1 : 1) * cwSign;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.setAttribute('aria-hidden', 'true');
    root.classList.add('mcs');
    root.tabIndex = 0;
    root.setAttribute('role', 'img');
    root.setAttribute('aria-roledescription', '360-Grad-Ansicht');
    root.setAttribute('aria-label', (opt.label || '360-Grad-Ansicht') + '. Mit den Pfeiltasten drehen, mit Plus und Minus zoomen.');
    root.insertBefore(canvas, root.firstChild);

    var imgs = new Array(n), ready = new Array(n);
    var pos = 0, vel = 0, zoom = 1, panX = 0, panY = 0;
    var lastInput = -1e9, autoGain = reduce ? 0 : 1, dragging = false, firstDrawn = false;
    var pointers = new Map(), lastX = 0, lastT = 0, startX = 0, startY = 0, lock = null, pinch0 = 0, zoom0 = 1;
    var bounceSign = 1, shown = -1;

    function load(i) {
      if (imgs[i]) return;
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () { ready[i] = true; if (!firstDrawn || i === nearestReady()) draw(); };
      im.src = srcs[i];
      imgs[i] = im;
    }
    function loadTier(step) { for (var i = 0; i < n; i += step) load(i); }
    function nearestReady() {
      var c = Math.round(pos);
      for (var d = 0; d < n; d++) {
        var a = loop ? ((c + d) % n + n) % n : Math.min(n - 1, c + d);
        var b = loop ? ((c - d) % n + n) % n : Math.max(0, c - d);
        if (ready[a]) return a; if (ready[b]) return b;
      }
      return -1;
    }

    function resize() {
      var r = root.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      draw();
    }
    function draw() {
      var i = nearestReady(); if (i < 0) return;
      if (i !== shown) { shown = i; root.setAttribute('data-frame', i); }
      var im = imgs[i], cw = canvas.width, ch = canvas.height;
      var s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight) * zoom;
      var w = im.naturalWidth * s, h = im.naturalHeight * s;
      var maxX = Math.max(0, (w - cw) / 2), maxY = Math.max(0, (h - ch) / 2);
      panX = Math.max(-maxX, Math.min(maxX, panX)); panY = Math.max(-maxY, Math.min(maxY, panY));
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(im, (cw - w) / 2 + panX, (ch - h) / 2 + panY, w, h);
      if (!firstDrawn) { firstDrawn = true; try { performance.mark('spin-first-frame'); } catch (e) {} root.dispatchEvent(new CustomEvent('spin:first')); }
    }
    function setPos(p) {
      pos = loop ? ((p % n) + n) % n : Math.max(0, Math.min(n - 1, p));
    }

    // animation loop: auto-turn + inertia
    var prev = performance.now(), visible = true;
    function tick(t) {
      var dt = Math.min(0.05, (t - prev) / 1000); prev = t;
      if (!dragging) {
        if (Math.abs(vel) > 0.05 && !reduce) { setPos(pos + vel * dt); vel *= Math.pow(0.9, dt * 60); }
        else vel = 0;
        if (!reduce && visible && document.visibilityState === 'visible' && t - lastInput > ar.resumeAfterMs) {
          autoGain = Math.min(1, autoGain + dt * 1000 / ar.rampMs);
          var fps = ar.degPerSec / degPerFrame;
          var next = pos + autoSign * bounceSign * fps * autoGain * dt;
          // partial arc (demo clips only): turn back at the ends instead of jumping
          if (!loop && (next >= n - 1 || next <= 0)) bounceSign = -bounceSign;
          setPos(next);
        }
      }
      draw();
      requestAnimationFrame(tick);
    }
    function input() { lastInput = performance.now(); autoGain = 0; }

    // pointer: horizontal drag turns, vertical scroll stays with the page (touch-action: pan-y)
    canvas.style.touchAction = 'pan-y';
    canvas.addEventListener('pointerdown', function (e) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) { var p = [...pointers.values()]; pinch0 = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); zoom0 = zoom; lock = 'pinch'; return; }
      startX = lastX = e.clientX; startY = e.clientY; lastT = performance.now(); lock = null; vel = 0; input();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (lock === 'pinch' && pointers.size === 2) {
        var p = [...pointers.values()]; setZoom(zoom0 * Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) / pinch0); return;
      }
      if (!lock) {
        var dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY);
        if (dx < 8 && dy < 8) return;
        lock = dx >= dy ? 'h' : 'v';
        if (lock === 'h') { dragging = true; try { canvas.setPointerCapture(e.pointerId); } catch (err) {} root.classList.add('is-dragging'); hideHint(); }
      }
      if (lock !== 'h') return;
      var now = performance.now(), d = e.clientX - lastX;
      if (zoom > 1.01) { panX += d * (window.devicePixelRatio || 1); panY += (e.movementY || 0) * (window.devicePixelRatio || 1); }
      else {
        var perPx = (n / 360) * (window.matchMedia('(pointer: coarse)').matches ? 0.9 : 0.5); // frames per px (0.5°/px desktop, 0.9°/px touch)
        // the car follows the pointer: dragging right moves its near side right, i.e. counter-clockwise seen from above
        var df = -d * perPx * cwSign;
        setPos(pos + df);
        var dtm = Math.max(1, now - lastT), vmax = 180 / degPerFrame; // coast at most 180°/s
        vel = Math.max(-vmax, Math.min(vmax, 0.8 * vel + 0.2 * (df / (dtm / 1000))));
      }
      lastX = e.clientX; lastT = now; input(); draw();
    });
    function end(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2 && lock === 'pinch') lock = null;
      if (dragging) { dragging = false; root.classList.remove('is-dragging'); if (reduce) vel = 0; input(); }
    }
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);

    // zoom: Ctrl/⌘ + wheel or trackpad pinch anywhere; plain wheel only in full screen (page scroll is never hijacked)
    function setZoom(z) { zoom = Math.max(1, Math.min(2.5, z)); if (zoom === 1) { panX = panY = 0; } root.classList.toggle('is-zoomed', zoom > 1.01); input(); draw(); }
    canvas.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey || document.fullscreenElement === root || root.classList.contains('is-full'))) return;
      e.preventDefault(); setZoom(zoom * Math.exp(-e.deltaY * 0.0015));
    }, { passive: false });
    canvas.addEventListener('dblclick', function () { setZoom(zoom > 1.01 ? 1 : 2); });

    function step(k) { vel = 0; input(); setPos(Math.round(pos) + k); draw(); }
    root.addEventListener('keydown', function (e) {
      var big = e.shiftKey ? Math.round(45 / degPerFrame) : 1;
      // arrows behave like a short drag: → moves the near side right, ← moves it left
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(big * cwSign); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(-big * cwSign); }
      else if (e.key === '+' || e.key === '=') setZoom(zoom * 1.25);
      else if (e.key === '-') setZoom(zoom / 1.25);
      else if (e.key === 'f' || e.key === 'F') toggleFull();
    });

    function toggleFull() {
      if (document.fullscreenElement === root) { document.exitFullscreen(); return; }
      if (root.classList.contains('is-full')) { root.classList.remove('is-full'); resize(); return; }
      if (root.requestFullscreen) root.requestFullscreen().catch(function () { root.classList.add('is-full'); resize(); });
      else { root.classList.add('is-full'); resize(); }
    }
    document.addEventListener('fullscreenchange', function () { setTimeout(resize, 50); });

    // controls (buttons need labels; icons are plain strokes)
    var ui = document.createElement('div'); ui.className = 'mcs-ui';
    ui.innerHTML =
      '<button type="button" class="mcs-btn" data-a="l" aria-label="Nach links drehen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>' +
      '<button type="button" class="mcs-btn" data-a="r" aria-label="Nach rechts drehen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '<button type="button" class="mcs-btn" data-a="f" aria-label="Vollbild"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>';
    ui.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var big = Math.round(15 / degPerFrame) || 1;
      if (b.dataset.a === 'l') step(big * cwSign); else if (b.dataset.a === 'r') step(-big * cwSign); else toggleFull();
    });
    root.appendChild(ui);
    var hint = document.createElement('div'); hint.className = 'mcs-hint'; hint.textContent = opt.hint || 'Zum Drehen ziehen';
    root.appendChild(hint);
    function hideHint() { hint.classList.add('is-gone'); }

    // progressive loading: first frame now; the rest only after it has arrived and the viewer is on screen
    load(0);
    var started = false, onScreen = false;
    imgs[0].addEventListener('load', function () { if (onScreen) startLoading(); });
    function startLoading() {
      onScreen = true;
      if (started || !ready[0]) return; started = true;
      loadTier(Math.max(1, Math.round(n / 12)));
      setTimeout(function () { loadTier(Math.max(1, Math.round(n / 36))); }, 400);
      (window.requestIdleCallback || function (f) { setTimeout(f, 1200); })(function () { loadTier(1); });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (x) { visible = x.isIntersecting; if (visible) startLoading(); }); }, { rootMargin: '200px' }).observe(root);
    } else startLoading();
    new ResizeObserver(resize).observe(root);
    resize();
    requestAnimationFrame(tick);

    return {
      destroy: function () { root.innerHTML = ''; },
      get angle() { return pos * degPerFrame; }
    };
  }

  window.MCSpin = { mount: mount };
})();
