/* Notes + resume behaviour. Load BEFORE assets/app.js so looping mermaid players
   in app.js never attach to these pages. Stable reveals: each step has its own
   IntersectionObserver (low threshold), stays revealed, never skips on fast scroll. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ---- Disarm app.js before it runs (this file is included first) ---- */
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

  // Other diagrams: clean static SVG (all messages / nodes visible).
  $$('svg.mm').forEach(svg => {
    svg.classList.add('static');
    delete svg.dataset.anim;
    delete svg.dataset.traces;
    $$('.node', svg).forEach(n => n.classList.add('lit'));
    $$('.msg', svg).forEach(m => m.classList.add('on', 'revealed'));
  });

  // Take ownership of mobile steppers so app.js §15 does not auto-loop them.
  $$('.mm-steps').forEach(ol => {
    ol.classList.add('note-steps');
    ol.classList.remove('mm-steps');
  });

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
      pkt.setAttribute('cx', p.x);
      pkt.setAttribute('cy', p.y);
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

  /* ---- Hero: play once, in order, stay revealed ---- */
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
        i = msgs.length;
        finished = true;
        playing = false;
      };
      const play = async () => {
        if (playing || finished || cancelled) return;
        playing = true;
        while (i < msgs.length) {
          if (cancelled || !svg.isConnected) return;
          await reveal(i, true);
          await wait(200);
        }
        finished = true;
        playing = false;
      };
      const reset = () => {
        cancelled = true;
        playing = false;
        finished = false;
        i = 0;
        msgs.forEach(m => m.classList.remove('on', 'cur', 'revealed'));
        if (pkt) { pkt.setAttribute('cx', '-20'); pkt.setAttribute('cy', '-20'); }
        cancelled = false;
        play();
      };

      // Independent observer per message: if a later message is already on screen
      // (fast scroll / jump), reveal it and every prior step immediately, then continue.
      msgs.forEach((m, idx) => {
        const io = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          if (idx < i) return;
          // Reveal this and any skipped predecessors, then resume animation from here.
          for (let k = i; k <= idx; k++) {
            msgs[k].classList.add('on', 'revealed');
            msgs[k].classList.remove('cur');
          }
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
        i = hops.length;
        finished = true;
        playing = false;
      };
      const play = async () => {
        if (playing || finished || cancelled) return;
        playing = true;
        while (i < hops.length) {
          if (cancelled || !svg.isConnected) return;
          await reveal(i, true);
          await wait(240);
        }
        finished = true;
        playing = false;
      };
      const reset = () => {
        cancelled = true;
        playing = false;
        finished = false;
        i = 0;
        $$('.node', svg).forEach(n => n.classList.remove('lit'));
        $$('.wire', svg).forEach(w => w.classList.remove('flow'));
        if (pkt) { pkt.setAttribute('cx', '-20'); pkt.setAttribute('cy', '-20'); }
        cancelled = false;
        play();
      };

      // One observer per hop's destination node (or the svg if hops are empty).
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

  /* ---- Mobile steppers: tap-to-advance, independent IO, stay revealed ---- */
  function armStepper(ol) {
    const lis = $$('li', ol);
    if (!lis.length) return;
    let i = -1;
    const show = k => {
      i = Math.max(0, Math.min(k, lis.length - 1));
      lis.forEach((li, j) => {
        li.classList.toggle('on', j === i);
        li.classList.toggle('done', j < i);
        if (j <= i) li.classList.add('revealed');
        li.setAttribute('aria-current', j === i ? 'step' : 'false');
      });
      const nav = ol.nextElementSibling && ol.nextElementSibling.classList.contains('note-steps-nav')
        ? ol.nextElementSibling : null;
      if (nav) {
        const [prev, next] = $$('button', nav);
        if (prev) prev.disabled = i <= 0;
        if (next) { next.disabled = i >= lis.length - 1; next.textContent = i >= lis.length - 1 ? 'Done' : 'Next step'; }
      }
      const fig = ol.closest('figure.diag-hero, .dtabs, .psec, section, .wrap');
      const b = $('b', lis[i]);
      const who = $('.who', lis[i]);
      const num = $('.i', lis[i]);
      if (fig && b) logTo(fig.matches('figure.diag-hero') ? fig : ol.closest('figure') || fig, '<b>' + esc(num ? num.textContent : String(i + 1).padStart(2, '0')) + '</b> ' + esc((who ? who.textContent + ' · ' : '') + b.textContent));
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

    // Prev / next controls (44px), inserted after the list.
    const nav = document.createElement('div');
    nav.className = 'note-steps-nav';
    nav.innerHTML = '<button type="button" class="prev">Previous</button><button type="button" class="primary">Next step</button>';
    ol.after(nav);
    $$('button', nav)[0].addEventListener('click', () => show(i - 1));
    $$('button', nav)[1].addEventListener('click', () => show(i < 0 ? 0 : i + 1));

    if (RM) { lis.forEach(li => li.classList.add('done', 'revealed')); show(lis.length - 1); return; }

    // Each card reveals independently when it enters the viewport; earlier cards stay.
    lis.forEach((li, j) => {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && j > i) show(j);
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      io.observe(li);
    });
    requestAnimationFrame(() => { if (inViewport(ol) && i < 0) show(0); });
  }

  // Run after the remaining (sync) scripts — i.e. after app.js — so class
  // restorations win and we bind against the final DOM.
  const start = () => {
    heroes.forEach(armHero);
    $$('.note-steps').forEach(armStepper);
  };
  setTimeout(start, 0);
})();
