/* Notes + resume behaviour. Load BEFORE assets/app.js.
   - Disarms looping mermaid players in app.js
   - Stable hero reveals (note articles only)
   - Layout fixer: edge-label pills on clear path segments, zero text overlaps */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const NS = 'http://www.w3.org/2000/svg';

  /* ---- Disarm app.js before it runs ---- */
  const heroes = [];
  $$('figure.diag-hero svg.mm').forEach(svg => {
    heroes.push({
      svg,
      anim: svg.dataset.anim || (svg.classList.contains('lanes') ? 'lanes' : 'graph'),
      traces: svg.dataset.traces || ''
    });
    svg.classList.add('nmm');
    svg.classList.remove('mm');
    delete svg.dataset.anim;
    delete svg.dataset.traces;
  });

  $$('svg.mm').forEach(svg => {
    svg.classList.add('static');
    delete svg.dataset.anim;
    delete svg.dataset.traces;
    $$('.node', svg).forEach(n => n.classList.add('lit'));
    $$('.msg', svg).forEach(m => m.classList.add('on', 'revealed'));
  });

  $$('.mm-steps').forEach(ol => {
    ol.classList.add('note-steps');
    ol.classList.remove('mm-steps');
  });

  /* ========================================================================
     Label layout: solid pills on clear segments, no hidden / overlapping text
     ======================================================================== */
  function boxOf(el) {
    try { return el.getBBox(); } catch (e) { return null; }
  }
  function infl(b, p) {
    return { x: b.x - p, y: b.y - p, width: b.width + 2 * p, height: b.height + 2 * p };
  }
  function hit(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }
  function areaHit(a, b) {
    const x = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
    const y = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
    return x * y;
  }

  function wrapLabel(text, max) {
    const raw = (text.textContent || '').replace(/\s+/g, ' ').trim();
    if (!raw || raw.length <= max) return;
    const words = raw.split(' ');
    if (words.length < 2) return;
    let line1 = words[0], i = 1;
    while (i < words.length && (line1 + ' ' + words[i]).length <= max) {
      line1 += ' ' + words[i++];
    }
    const line2 = words.slice(i).join(' ');
    if (!line2) return;
    const x = text.getAttribute('x') || '0';
    text.textContent = '';
    const t1 = document.createElementNS(NS, 'tspan');
    t1.setAttribute('x', x);
    t1.setAttribute('dy', '-0.4em');
    t1.textContent = line1;
    const t2 = document.createElementNS(NS, 'tspan');
    t2.setAttribute('x', x);
    t2.setAttribute('dy', '1.2em');
    t2.textContent = line2;
    text.append(t1, t2);
  }

  function setTspanX(text, x) {
    $$('tspan', text).forEach(ts => ts.setAttribute('x', x));
  }

  function pathPoint(path, t) {
    let L = 0;
    try { L = path.getTotalLength(); } catch (e) { return null; }
    if (!L) return null;
    const u = Math.max(0, Math.min(1, t)) * L;
    const p = path.getPointAtLength(u);
    const p2 = path.getPointAtLength(Math.max(0, Math.min(L, u + Math.max(2, L * 0.01))));
    const ang = Math.atan2(p2.y - p.y, p2.x - p.x);
    return { x: p.x, y: p.y, nx: -Math.sin(ang), ny: Math.cos(ang), ang, L };
  }

  function obstaclesFor(svg, skipG) {
    const out = [];
    $$('.node rect, .node circle, .actor rect', svg).forEach(el => {
      const b = boxOf(el);
      if (b) out.push(infl(b, 8)); // include stroke and a readable gap
    });
    $$('.node text, .actor text', svg).forEach(el => {
      const b = boxOf(el);
      if (b) out.push(infl(b, 4));
    });
    $$('g.elab', svg).forEach(g => {
      if (g === skipG) return;
      const r = $('rect', g);
      const b = r && boxOf(r);
      if (b && b.width > 0) out.push(infl(b, 3));
    });
    return out;
  }

  function viewBoxOf(svg) {
    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (vb && vb.width) return { x: vb.x, y: vb.y, width: vb.width, height: vb.height };
    const a = (svg.getAttribute('viewBox') || svg.getAttribute('viewbox') || '0 0 100 100').split(/[\s,]+/).map(Number);
    return { x: a[0], y: a[1], width: a[2], height: a[3] };
  }

  function placePill(text, rect, x, y) {
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    setTspanX(text, x);
    const bb = boxOf(text);
    if (!bb) return null;
    const padX = 6, padY = 3;
    rect.setAttribute('x', bb.x - padX);
    rect.setAttribute('y', bb.y - padY);
    rect.setAttribute('width', Math.max(8, bb.width + padX * 2));
    rect.setAttribute('height', Math.max(12, bb.height + padY * 2));
    rect.setAttribute('rx', 3);
    return boxOf(rect);
  }

  function scoreBox(box, obstacles, vb) {
    if (!box) return 1e9;
    let s = 0;
    const inset = { x: vb.x + 2, y: vb.y + 2, width: vb.width - 4, height: vb.height - 4 };
    if (!hit(box, inset) || box.x < vb.x || box.y < vb.y ||
        box.x + box.width > vb.x + vb.width || box.y + box.height > vb.y + vb.height) {
      s += 800;
      if (box.x < vb.x) s += (vb.x - box.x) * 4;
      if (box.y < vb.y) s += (vb.y - box.y) * 4;
      if (box.x + box.width > vb.x + vb.width) s += (box.x + box.width - vb.x - vb.width) * 4;
      if (box.y + box.height > vb.y + vb.height) s += (box.y + box.height - vb.y - vb.height) * 4;
    }
    obstacles.forEach(o => {
      if (hit(box, o)) s += 200 + areaHit(box, o) * 3;
    });
    return s;
  }

  function layoutSvg(svg) {
    if (!svg || svg.dataset.laidout === 'busy') return;
    // Use user-unit type so labels scale with the viewBox.
    svg.setAttribute('font-size', '13');
    $$('text', svg).forEach(t => { t.style.fontSize = ''; });

    const elabs = $$('g.elab', svg);
    if (!elabs.length) return;

    const vb0 = viewBoxOf(svg);

    const items = elabs.map(g => {
      let path = g.previousElementSibling;
      while (path && !(path.tagName && path.tagName.toLowerCase() === 'path' && path.classList.contains('wire'))) {
        path = path.previousElementSibling;
      }
      const text = $('text', g);
      let rect = $('rect', g);
      if (!rect) {
        rect = document.createElementNS(NS, 'rect');
        g.insertBefore(rect, text);
      }
      return { g, path, text, rect };
    }).filter(it => it.text);

    // Wrap long labels first so pills are narrower.
    items.forEach(it => wrapLabel(it.text, 22));

    const ts = [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.2, 0.8, 0.16, 0.84];
    const offs = [0, 12, -12, 18, -18, 26, -26, 34, -34, 44, -44, 56, -56, 70, -70];

    // Longer labels first — they are harder to place.
    items.sort((a, b) => (b.text.textContent || '').length - (a.text.textContent || '').length);

    items.forEach(it => {
      const obs = obstaclesFor(svg, it.g);
      let best = { score: 1e12, t: 0.5, off: 16, box: null };
      if (!it.path) {
        // Keep current position, just resize the pill.
        const x = parseFloat(it.text.getAttribute('x')) || 0;
        const y = parseFloat(it.text.getAttribute('y')) || 0;
        const box = placePill(it.text, it.rect, x, y);
        it.box = box;
        return;
      }
      for (const t of ts) {
        const pt = pathPoint(it.path, t);
        if (!pt) continue;
        // Prefer a modest perpendicular offset so the pill sits *beside* the stroke.
        for (const off of offs) {
          const use = off === 0 ? 10 : off; // never sit exactly on the stroke
          const x = pt.x + pt.nx * use;
          const y = pt.y + pt.ny * use;
          const box = placePill(it.text, it.rect, x, y);
          const sc = scoreBox(box, obs, vb0) + Math.abs(t - 0.5) * 8 + Math.abs(use) * 0.15;
          if (sc < best.score) best = { score: sc, t, off: use, box, x, y };
          if (sc < 1) break;
        }
        if (best.score < 1) break;
      }
      placePill(it.text, it.rect, best.x, best.y);
      it.box = best.box;
    });

    // Second pass: resolve leftover elab–elab collisions with a slightly larger offset.
    items.forEach(it => {
      if (!it.path) return;
      const obs = obstaclesFor(svg, it.g);
      const cur = boxOf(it.rect);
      if (!cur || scoreBox(cur, obs, vb0) < 4) return;
      let best = { score: scoreBox(cur, obs, vb0), x: parseFloat(it.text.getAttribute('x')), y: parseFloat(it.text.getAttribute('y')) };
      for (const t of ts) {
        const pt = pathPoint(it.path, t);
        if (!pt) continue;
        for (const off of [-80, 80, -96, 96, 14, -14, 40, -40, 60, -60]) {
          const x = pt.x + pt.nx * off, y = pt.y + pt.ny * off;
          const box = placePill(it.text, it.rect, x, y);
          const sc = scoreBox(box, obs, vb0);
          if (sc < best.score) best = { score: sc, x, y };
        }
      }
      placePill(it.text, it.rect, best.x, best.y);
    });

    // Third pass: leftover collisions search a grid of nearby empty space.
    items.forEach(it => {
      if (!it.path) return;
      const obs = obstaclesFor(svg, it.g);
      const cur = boxOf(it.rect);
      const sc0 = scoreBox(cur, obs, vb0);
      if (!cur || sc0 < 4) return;
      let best = { score: sc0, x: parseFloat(it.text.getAttribute('x')), y: parseFloat(it.text.getAttribute('y')) };
      let pb = null;
      try { pb = it.path.getBBox(); } catch (e) { return; }
      const x0 = pb.x - 90, x1 = pb.x + pb.width + 90;
      const y0 = pb.y - 90, y1 = pb.y + pb.height + 90;
      for (let x = x0; x <= x1; x += 10) {
        for (let y = y0; y <= y1; y += 10) {
          const box = placePill(it.text, it.rect, x, y);
          const mid = { x: x, y: y, width: 1, height: 1 };
          const dist = Math.hypot(x - (pb.x + pb.width / 2), y - (pb.y + pb.height / 2));
          const sc = scoreBox(box, obs, vb0) + dist * 0.08;
          if (sc < best.score) best = { score: sc, x, y };
          if (best.score < 1) break;
        }
        if (best.score < 1) break;
      }
      placePill(it.text, it.rect, best.x, best.y);
    });

    // Grow the viewBox if a pill had to sit just outside the original frame.
    const pills = items.map(it => boxOf(it.rect)).filter(Boolean);
    if (pills.length) {
      const vb = viewBoxOf(svg);
      let x = vb.x, y = vb.y, w = vb.width, h = vb.height, pad = 8, changed = false;
      pills.forEach(b => {
        if (b.x < x + pad) { const d = x + pad - b.x; x -= d; w += d; changed = true; }
        if (b.y < y + pad) { const d = y + pad - b.y; y -= d; h += d; changed = true; }
        if (b.x + b.width > x + w - pad) { w = b.x + b.width + pad - x; changed = true; }
        if (b.y + b.height > y + h - pad) { h = b.y + b.height + pad - y; changed = true; }
      });
      if (changed) svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
    }
  }

  function withVisibleSvg(svg, fn) {
    const hidden = [];
    let el = svg;
    while (el && el !== document.body) {
      if (el.hasAttribute && el.hasAttribute('hidden')) {
        hidden.push([el, el.hidden, el.getAttribute('hidden')]);
        el.hidden = false;
        el.removeAttribute('hidden');
      }
      const cs = el instanceof Element ? getComputedStyle(el) : null;
      if (cs && cs.display === 'none') {
        hidden.push([el, 'style', el.style.display]);
        el.style.display = 'block';
      }
      el = el.parentElement;
    }
    try { fn(); }
    finally {
      hidden.reverse().forEach(([node, kind, val]) => {
        if (kind === 'style') node.style.display = val;
        else { node.hidden = true; if (val !== null && val !== '') node.setAttribute('hidden', val); }
      });
    }
  }

  function layoutAll() {
    $$('svg.mm, svg.nmm').forEach(svg => {
      try { withVisibleSvg(svg, () => layoutSvg(svg)); }
      catch (e) { console.warn('notes layout', e); }
    });
  }

  /* ---- Hero animation (article pages only) ---- */
  const movePkt = (pkt, path, dur) => new Promise(res => {
    if (!pkt || !path || RM) return res();
    let L = 0;
    try { L = path.getTotalLength(); } catch (e) { return res(); }
    if (!L || !path.ownerSVGElement || !path.ownerSVGElement.getBoundingClientRect().width) return res();
    const t0 = performance.now();
    path.classList.add('flow');
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur);
      const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = path.getPointAtLength(e * L);
      pkt.setAttribute('cx', p.x); pkt.setAttribute('cy', p.y);
      if (k < 1) requestAnimationFrame(tick);
      else { path.classList.remove('flow'); res(); }
    };
    requestAnimationFrame(tick);
  });

  const captionOf = fig => {
    if (!fig) return null;
    let cap = $('.note-caption', fig);
    if (!cap) {
      cap = document.createElement('div');
      cap.className = 'note-caption';
      cap.setAttribute('aria-live', 'polite');
      fig.appendChild(cap);
    }
    return cap;
  };
  const logTo = (fig, html) => {
    if (!fig) return;
    const l = $('.mm-log', fig);
    if (l) l.innerHTML = html;
    const cap = captionOf(fig);
    if (cap) cap.innerHTML = html;
  };
  function inViewport(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight * 0.96;
  }

  function armHero(cfg) {
    const svg = cfg.svg;
    svg.classList.add('mm');
    const fig = svg.closest('figure.diag-hero');
    const pkt = $('.pkt', svg);
    const isLanes = cfg.anim === 'lanes' || svg.classList.contains('lanes');

    const ensureReplay = () => {
      if (!fig) return null;
      const head = $('header', fig);
      if (!head) return null;
      let btn = $('[data-replay]', head);
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.replay = '1';
        btn.textContent = 'Replay';
        head.appendChild(btn);
      }
      return btn;
    };

    if (RM) {
      svg.classList.add('static');
      $$('.node', svg).forEach(n => n.classList.add('lit'));
      $$('.msg', svg).forEach(m => m.classList.add('on', 'revealed'));
      return;
    }

    if (isLanes) {
      const msgs = $$('.msg', svg);
      let i = 0, playing = false, finished = false, cancelled = false;
      const labelOf = m => {
        const texts = $$('text', m);
        return texts.length ? texts[texts.length - 1].textContent : '';
      };
      const reveal = async (idx, animate) => {
        const m = msgs[idx];
        if (!m) return;
        m.classList.add('on', 'cur', 'revealed');
        const num = $('.num', m);
        logTo(fig, '<b>' + esc(num ? num.textContent : String(idx + 1).padStart(2, '0')) + '</b> ' + esc(labelOf(m)));
        const p = $('.mline', m);
        if (animate) await movePkt(pkt, p, 620);
        m.classList.remove('cur');
        i = idx + 1;
      };
      const snapRest = () => {
        msgs.forEach((m, k) => { if (k >= i) m.classList.add('on', 'revealed'); m.classList.remove('cur'); });
        i = msgs.length; finished = true; playing = false;
      };
      const play = async () => {
        if (playing || finished || cancelled) return;
        playing = true;
        while (i < msgs.length) {
          if (cancelled || !svg.isConnected) return;
          await reveal(i, true);
          await wait(200);
        }
        finished = true; playing = false;
      };
      const reset = () => {
        cancelled = true; playing = false; finished = false; i = 0;
        msgs.forEach(m => m.classList.remove('on', 'cur', 'revealed'));
        if (pkt) { pkt.setAttribute('cx', '-20'); pkt.setAttribute('cy', '-20'); }
        cancelled = false; play();
      };
      msgs.forEach((m, idx) => {
        const io = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          if (idx < i) return;
          for (let k = i; k <= idx; k++) { msgs[k].classList.add('on', 'revealed'); msgs[k].classList.remove('cur'); }
          i = Math.max(i, idx);
          if (!playing && !finished) play();
        }), { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
        io.observe(m);
      });
      const figIO = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) play();
        else if (playing && !finished) snapRest();
      }), { threshold: 0.08 });
      figIO.observe(fig || svg);
      if (inViewport(fig || svg)) play();
      const btn = ensureReplay();
      if (btn) btn.addEventListener('click', reset);
    } else {
      let traces = [];
      try { traces = cfg.traces ? JSON.parse(cfg.traces) : []; } catch (e) { traces = []; }
      const hops = [];
      traces.forEach((tr, ti) => tr.forEach(h => hops.push({ edge: h[0], node: h[1], label: h[2] || '', path: ti, paths: traces.length })));
      let i = 0, playing = false, finished = false, cancelled = false;
      const lit = id => {
        if (!id) return;
        const n = svg.querySelector('#' + CSS.escape(id));
        if (n) n.classList.add('lit');
      };
      const reveal = async (idx, animate) => {
        const h = hops[idx];
        if (!h) return;
        const p = h.edge && svg.querySelector('#' + CSS.escape(h.edge));
        if (animate) await movePkt(pkt, p, 620);
        lit(h.node);
        logTo(fig, '<b>path ' + (h.path + 1) + '/' + h.paths + '</b> ' + esc(h.label));
        i = idx + 1;
      };
      const snapRest = () => {
        hops.forEach(h => lit(h.node));
        $$('.node', svg).forEach(n => n.classList.add('lit'));
        i = hops.length; finished = true; playing = false;
      };
      const play = async () => {
        if (playing || finished || cancelled) return;
        playing = true;
        while (i < hops.length) {
          if (cancelled || !svg.isConnected) return;
          await reveal(i, true);
          await wait(240);
        }
        finished = true; playing = false;
      };
      const reset = () => {
        cancelled = true; playing = false; finished = false; i = 0;
        $$('.node', svg).forEach(n => n.classList.remove('lit'));
        $$('.wire', svg).forEach(w => w.classList.remove('flow'));
        if (pkt) { pkt.setAttribute('cx', '-20'); pkt.setAttribute('cy', '-20'); }
        cancelled = false; play();
      };
      hops.forEach((h, idx) => {
        const target = (h.node && svg.querySelector('#' + CSS.escape(h.node))) || svg;
        const io = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          if (idx < i) return;
          for (let k = i; k <= idx; k++) lit(hops[k].node);
          i = Math.max(i, idx);
          if (!playing && !finished) play();
        }), { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
        io.observe(target);
      });
      const figIO = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
          if (!hops.length) $$('.node', svg).forEach(n => n.classList.add('lit'));
          else play();
        } else if (playing && !finished) snapRest();
      }), { threshold: 0.08 });
      figIO.observe(fig || svg);
      if (inViewport(fig || svg)) play();
      const btn = ensureReplay();
      if (btn) btn.addEventListener('click', reset);
    }
  }

  function findStepperSvg(ol) {
    const root = ol.closest('figure, [role=tabpanel], .diag-hero, .dtabs, section, .wrap') || ol.parentElement;
    return (root && (root.querySelector('.mmwrap svg') || root.querySelector('svg.mm, svg.nmm'))) || null;
  }

  function ensureOverlay() {
    let ov = $('.diag-overlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.className = 'diag-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Full diagram');
    ov.innerHTML = '<div class="diag-overlay-bar"><span>Full view</span><button type="button" class="diag-overlay-close">Close</button></div><div class="diag-overlay-body"></div>';
    document.body.appendChild(ov);
    const close = () => {
      ov.classList.remove('open');
      document.body.classList.remove('diag-lock');
      $('.diag-overlay-body', ov).innerHTML = '';
    };
    $('.diag-overlay-close', ov).addEventListener('click', close);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) close(); });
    ov._close = close;
    return ov;
  }

  function openFullView(svg, title) {
    if (!svg) return;
    const ov = ensureOverlay();
    const body = $('.diag-overlay-body', ov);
    const bar = $('.diag-overlay-bar span', ov);
    if (bar) bar.textContent = title || 'Full view';
    body.innerHTML = '';
    const clone = svg.cloneNode(true);
    clone.classList.add('mm');
    clone.removeAttribute('data-anim');
    const vb = clone.viewBox && clone.viewBox.baseVal;
    const natural = vb && vb.width ? vb.width * (14 / 13) : 720;
    const w = Math.max(720, Math.round(natural));
    clone.style.setProperty('min-width', w + 'px', 'important');
    clone.style.setProperty('width', w + 'px', 'important');
    body.appendChild(clone);
    try { withVisibleSvg(clone, () => layoutSvg(clone)); } catch (e) {}
    ov.classList.add('open');
    document.body.classList.add('diag-lock');
    const c = $('.diag-overlay-close', ov);
    if (c) c.focus();
  }

  function armStepper(ol) {
    const lis = $$('li', ol);
    if (!lis.length) return;
    let i = -1;
    const bar = document.createElement('div');
    bar.className = 'note-steps-bar';
    bar.innerHTML = '<span class="note-steps-count"></span><button type="button" class="note-full-btn">Full view</button>';
    ol.before(bar);
    const count = $('.note-steps-count', bar);
    const fullBtn = $('.note-full-btn', bar);
    const show = k => {
      i = Math.max(0, Math.min(k, lis.length - 1));
      lis.forEach((li, j) => {
        li.classList.toggle('on', j === i);
        li.classList.toggle('peek', j === i + 1);
        li.classList.toggle('done', j < i);
        if (j <= i) li.classList.add('revealed');
        li.setAttribute('aria-current', j === i ? 'step' : 'false');
      });
      if (count) count.textContent = (i + 1) + ' / ' + lis.length;
      const nav = ol.nextElementSibling && ol.nextElementSibling.classList.contains('note-steps-nav')
        ? ol.nextElementSibling : null;
      if (nav) {
        const [prev, next] = $$('button', nav);
        if (prev) prev.disabled = i <= 0;
        if (next) { next.disabled = i >= lis.length - 1; next.textContent = i >= lis.length - 1 ? 'Done' : 'Next step'; }
      }
      const fig = ol.closest('figure.diag-hero');
      const b = $('b', lis[i]);
      const who = $('.who', lis[i]);
      const num = $('.i', lis[i]);
      if (fig && b) logTo(fig, '<b>' + esc(num ? num.textContent : String(i + 1).padStart(2, '0')) + '</b> ' + esc((who ? who.textContent + ' · ' : '') + b.textContent));
    };
    lis.forEach((li, j) => {
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      const go = () => show(j === i ? Math.min(j + 1, lis.length - 1) : j);
      li.addEventListener('click', go);
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
    const nav = document.createElement('div');
    nav.className = 'note-steps-nav';
    nav.innerHTML = '<button type="button" class="prev">Previous</button><button type="button" class="primary">Next step</button>';
    ol.after(nav);
    $$('button', nav)[0].addEventListener('click', () => show(i - 1));
    $$('button', nav)[1].addEventListener('click', () => show(i < 0 ? 0 : i + 1));
    fullBtn.addEventListener('click', () => {
      const svg = findStepperSvg(ol);
      const fig = ol.closest('figure.diag-hero, .dtabs, section');
      const title = fig && fig.querySelector('header span, .sub-h, h2');
      openFullView(svg, title ? title.textContent.trim() : 'Full view');
    });
    // Swipe left/right to advance
    let x0 = 0, y0 = 0;
    const surface = ol.parentElement || ol;
    surface.addEventListener('touchstart', e => {
      if (!e.changedTouches[0]) return;
      x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    surface.addEventListener('touchend', e => {
      if (!e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) show(i + (dx < 0 ? 1 : -1));
    }, { passive: true });
    if (RM) { lis.forEach(li => li.classList.add('done', 'revealed')); show(0); return; }
    show(0);
  }

  function armCarousel(scroller, itemSel) {
    const items = $$(itemSel, scroller);
    if (items.length < 2) return;
    if (scroller.nextElementSibling && scroller.nextElementSibling.classList.contains('note-dots')) return;
    const dots = document.createElement('div');
    dots.className = 'note-dots';
    dots.setAttribute('role', 'tablist');
    dots.setAttribute('aria-label', 'Cards');
    dots.innerHTML = items.map((_, n) => '<button type="button" aria-label="Card ' + (n + 1) + '"></button>').join('');
    scroller.after(dots);
    const btns = $$('button', dots);
    const sync = () => {
      const w = items[0].getBoundingClientRect().width || 1;
      const gap = 12;
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(scroller.scrollLeft / (w + gap))));
      btns.forEach((b, j) => b.setAttribute('aria-current', j === idx ? 'true' : 'false'));
    };
    scroller.addEventListener('scroll', sync, { passive: true });
    btns.forEach((b, j) => b.addEventListener('click', () => {
      items[j].scrollIntoView({ behavior: RM ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
    }));
    sync();
  }

  function mobileTighten() {
    if (!matchMedia('(max-width:640px)').matches) return;
    $$('details.blk[open]').forEach(d => { d.open = false; });
    $$('.ents').forEach(el => armCarousel(el, '.ent-c'));
    $$('.rels').forEach(ul => {
      if (ul.closest('details.note-rels')) return;
      const n = $$('li', ul).length;
      if (n < 3) return;
      const wrap = document.createElement('details');
      wrap.className = 'note-rels blk';
      const sum = document.createElement('summary');
      sum.innerHTML = '<span class="n">··</span><div><h3>Relationships</h3><span class="one">' + n + ' links — open to read</span></div><span class="pm">+</span>';
      ul.parentNode.insertBefore(wrap, ul);
      wrap.appendChild(sum);
      wrap.appendChild(ul);
    });
  }

  const start = () => {
    heroes.forEach(armHero);
    $$('.note-steps').forEach(armStepper);
    mobileTighten();
    const run = () => layoutAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run).catch(run);
    else run();
    setTimeout(run, 60);
    setTimeout(run, 400);
    $$('.dtabs [role=tab]').forEach(tab => tab.addEventListener('click', () => setTimeout(run, 0)));
    let timer = null;
    addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(run, 120); }, { passive: true });
  };
  setTimeout(start, 0);
})();
