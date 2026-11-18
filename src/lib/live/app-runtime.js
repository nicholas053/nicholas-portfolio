/** Site behaviour from the Live Trace prototype. Accent switcher removed; accent is fixed to Signal Lime. */
export function startSiteRuntime() {
  if (document.documentElement.dataset.ltSite === "1") return;
  document.documentElement.dataset.ltSite = "1";
// Prototype behaviour. Each block maps to one React component when ported (see PORTING.md).
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// 1. Scroll reveal + SVG line-draw (→ framer-motion whileInView, once: true)
//    Each element reveals on its own (low threshold + rootMargin), never waits for another, and stays revealed.
//    A scroll/hashchange sweep also reveals anything already passed, so fast scrolls and jump links never skip.
$$('.draw path,.draw line,.draw polyline').forEach(p => { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) {} });
const revealEls = $$('.rv,.draw');
const reveal = el => el.classList.add('in');
if (RM || !('IntersectionObserver' in window)) revealEls.forEach(reveal);
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach(el => io.observe(el));
  let ticking = false;
  const sweep = () => { ticking = false; const vh = innerHeight; revealEls.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * .94) { reveal(el); io.unobserve(el); } }); };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
  addEventListener('hashchange', () => requestAnimationFrame(sweep));
  addEventListener('load', sweep);
}

// 2. Hero rotator: one interval, one state index; paused while the tab is hidden; each phrase shows exactly once per cycle
const slot = $('#slot');
if (slot && !RM) {
  const items = $$('b', slot); let i = items.findIndex(b => b.classList.contains('on')); if (i < 0) i = 0;
  items.forEach((b, k) => b.classList.toggle('on', k === i));
  let timer = null;
  const step = () => {
    const cur = items[i]; i = (i + 1) % items.length; const nx = items[i];
    items.forEach(b => { if (b !== cur && b !== nx) b.classList.remove('on', 'out'); });
    cur.classList.remove('on'); cur.classList.add('out');
    nx.classList.remove('out'); void nx.offsetWidth; nx.classList.add('on');
  };
  const start = () => { if (timer === null) timer = setInterval(step, 2600); };
  const stop = () => { clearInterval(timer); timer = null; };
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  start();
}

// 3. Hero live trace — two phases, numbered steps, packet + log in lockstep (→ LiveTrace.tsx)
const svg = matchMedia('(max-width: 640px)').matches ? null : matchMedia('(max-width: 900px)').matches ? $('#traceM') : $('#trace');  // <=640px: hero uses the step-through (§15)
if (svg) {
  const pkt = svg.querySelector('#pkt'), halo = svg.querySelector('#pktHalo'), log = $('#log'), scn = $('#scn');
  const N = id => svg.querySelector('#' + id);
  const addLog = (t, c) => { const d = document.createElement('div'); d.textContent = t; if (c) d.className = c; log.appendChild(d); while (log.children.length > 5) log.firstChild.remove(); };
  const lit = (...ids) => { $$('.node,.chip', svg).forEach(n => n.classList.remove('lit')); ids.forEach(id => { const n = id && N(id); if (n) n.classList.add('lit'); }); };
  const put = p => { pkt.setAttribute('cx', p.x); pkt.setAttribute('cy', p.y); halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y); };
  const run = (path, dur) => new Promise(res => {
    const L = path.getTotalLength(), t0 = performance.now(); path.classList.add('flow');
    const f = now => { const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      put(path.getPointAtLength(e * L)); if (k < 1) requestAnimationFrame(f); else { path.classList.remove('flow'); res(); } };
    requestAnimationFrame(f);
  });
  const wait = ms => new Promise(r => setTimeout(r, ms));
  // [wire, node to light, log line, log class, extra lit]
  const phase1 = [
    [null, 'nJob', '01 job: claim the row first (only one worker wins)', 'hot'],
    ['w1', 'nAdOut', '02 adapter: build the provider-specific request', ''],
    ['w2', 'nApi1', '03 → third-party API: request sent', 'ok'],
  ];
  const callback = (status, outcome, chip, cls) => [
    ['wA', 'nApi2', `04 ← provider calls back · status=${status}`, ''],
    ['w3', 'nHandler', '05 handler: POST /callbacks/:acct received', ''],
    ['w4', 'nAdIn', '06 adapter: verify signature ✓ · normalise body', 'ok'],
    ['w5', 'nCore', `07 core: ${outcome}`, cls, chip],
    ['w6', 'nApi2', '08 → ack 200 returned to provider', 'hot'],
  ];
  const story = [
    ['phase 1 · outbound', phase1],
    ['phase 2 · pending', callback('pending', 'pending → no state change', 'cNoop', 'warn')],
    ['phase 2 · final', callback('final', 'final → state changes once', 'cFinal', 'ok')],
    ['phase 2 · duplicate', callback('final (again)', 'duplicate → already applied, no change', 'cNoop', 'warn')],
  ];
  if (RM) {
    lit('nCore', 'cFinal'); { const r = N('nCore').querySelector('rect'); put({ x: +r.getAttribute('x'), y: +r.getAttribute('y') + 20 }); }
    ['01 job claims a row', '02 adapter builds request', '03 request → third-party API', '04–06 callback → handler → adapter (verify, normalise)', '07 core: final changes state once; duplicate/pending do not', '08 ack 200 → provider'].forEach(t => addLog(t));
  } else (async () => {
    for (;;) {
      for (const [name, steps] of story) {
        scn.textContent = name;
        for (const [w, node, txt, cls, chip] of steps) {
          if (w) { const p = N(w); await run(p, w === 'wA' ? 1100 : 700); }
          lit(node, chip); addLog(txt, cls); await wait(650);
        }
        await wait(500);
      }
      scn.textContent = 'later'; lit('nRecon'); addLog('later: reconciliation job compares records', 'warn'); put({ x: -30, y: -30 });
      await wait(2200); log.innerHTML = '';
    }
  })();
}

// 4. Notes: progressive disclosure
const allBtn = $('#allNotes');
if (allBtn) allBtn.addEventListener('click', () => { const l = $('#log2'); const on = l.classList.toggle('all'); allBtn.setAttribute('aria-expanded', on); allBtn.textContent = on ? 'Show fewer ↑' : 'Show all 11 notes ↓'; });

// 5. Nav scroll-spy
const spies = $$('[data-spy]');
if (spies.length) {
  const spyHash = a => ((a.getAttribute('href') || '').split('#')[1] || '');
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) spies.forEach(a => a.classList.toggle('on', spyHash(a) === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  spies.forEach(a => { const id = spyHash(a); const t = id && document.getElementById(id); if (t) so.observe(t); });
}

// ===== Case study =====
// 6. Scroll-driven overall flow: each text step lights its node + wire
const fsteps = $$('.flow-steps li');
if (fsteps.length) {
  const light = i => { fsteps.forEach((li, j) => li.classList.toggle('on', j === i));
    const ids = (fsteps[i].dataset.nodes || '').split(' ');
    $$('.fnode,.fwire').forEach(n => n.classList.toggle('on', ids.includes(n.id))); };
  if (RM) { fsteps.forEach(li => li.classList.add('on')); $$('.fnode,.fwire').forEach(n => n.classList.add('on')); }
  else { const fo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) light(fsteps.indexOf(e.target)); }), { rootMargin: '-45% 0px -45% 0px' }); fsteps.forEach(li => fo.observe(li)); light(0); }
}

// 7. Sequence: messages appear in order when in view; replay button
const seq = $('#seq');
if (seq) {
  const msgs = $$('.msg', seq), btn = $('#seqPlay'); let timer;
  const play = () => { clearInterval(timer); msgs.forEach(m => m.classList.remove('on')); let i = 0;
    timer = setInterval(() => { if (i < msgs.length) msgs[i++].classList.add('on'); else clearInterval(timer); }, 650); };
  if (RM) msgs.forEach(m => m.classList.add('on'));
  else { const so = new IntersectionObserver(es => { if (es[0].isIntersecting) { play(); so.disconnect(); } }, { threshold: .4 }); so.observe(seq); }
  btn && btn.addEventListener('click', play);
}

// 8. ER explorer: hover/tap an entity to see its relations in words
const er = $('#er');
if (er) {
  const read = $('#erRead'), rels = $$('.rel', er);
  const pick = id => { const mine = rels.filter(r => r.dataset.a === id || r.dataset.b === id);
    $$('.ent', er).forEach(e => { const linked = e.id === id || mine.some(r => r.dataset.a === e.id || r.dataset.b === e.id); e.classList.toggle('on', e.id === id); e.classList.toggle('dim', !linked); });
    rels.forEach(r => r.classList.toggle('on', mine.includes(r))); $$('.relname', er).forEach(t => t.classList.toggle('on', mine.some(r => r.dataset.k === t.dataset.k)));
    read.innerHTML = mine.map(r => `<div><b>${r.dataset.a}</b> ${r.dataset.v} <b>${r.dataset.b}</b></div>`).join(''); };
  $$('.ent', er).forEach(e => { e.addEventListener('mouseenter', () => pick(e.id)); e.addEventListener('click', () => pick(e.id)); e.setAttribute('tabindex', '0'); e.addEventListener('focus', () => pick(e.id)); });
  pick('CHECKOUT_SESSION');
}

// ===== v2 =====
// 10. Mermaid-derived diagrams: lanes play message by message; graphs run a packet along real edges
const wait2 = ms => new Promise(r => setTimeout(r, ms));
const movePkt = (pkt, path, dur) => new Promise(res => {
  const L = path.getTotalLength(), t0 = performance.now(); path.classList.add('flow');
  const f = now => { const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; const p = path.getPointAtLength(e * L);
    pkt.setAttribute('cx', p.x); pkt.setAttribute('cy', p.y); if (k < 1) requestAnimationFrame(f); else { path.classList.remove('flow'); res(); } };
  requestAnimationFrame(f);
});
const logTo = (svg, html) => { const fig = svg.closest('.diag-hero'); const l = fig && $('.mm-log', fig); if (l) l.innerHTML = html; };
const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
function playLanes(svg) {
  const msgs = $$('.msg', svg), pkt = $('.pkt', svg);
  if (RM) { svg.classList.add('static'); return; }
  (async () => { for (;;) {
    msgs.forEach(m => m.classList.remove('on', 'cur'));
    for (const m of msgs) {
      if (!svg.isConnected) return;
      m.classList.add('on', 'cur'); const t = $$('text', m).pop().textContent; logTo(svg, '<b>' + ($('.num', m) ? $('.num', m).textContent : '··') + '</b> ' + esc(t));
      const p = $('.mline', m); if (p && svg.getBoundingClientRect().width) await movePkt(pkt, p, 650); else await wait2(650);
      await wait2(260); m.classList.remove('cur');
    }
    await wait2(1600);
  } })();
}
function playGraph(svg) {
  const traces = JSON.parse(svg.dataset.traces || '[]'), pkt = $('.pkt', svg);
  const lit = id => { $$('.node', svg).forEach(n => n.classList.remove('lit')); const n = id && svg.querySelector('#' + CSS.escape(id)); if (n) n.classList.add('lit'); };
  if (RM || !traces.length) { $$('.node', svg).forEach(n => n.classList.add('lit')); return; }
  (async () => { for (let t = 0; ; t = (t + 1) % traces.length) {
    for (const [e, n, label] of traces[t]) {
      const p = e && svg.querySelector('#' + CSS.escape(e));
      if (p && svg.getBoundingClientRect().width) await movePkt(pkt, p, 620);
      lit(n); logTo(svg, '<b>path ' + (t + 1) + '/' + traces.length + '</b> ' + esc(label)); await wait2(380);
    }
    await wait2(1100);
  } })();
}
const mmIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { mmIO.unobserve(e.target); (e.target.dataset.anim === 'lanes' ? playLanes : playGraph)(e.target); } }), { threshold: .15 });
$$('svg.mm').forEach(s => mmIO.observe(s));
$$('.diag-hero [data-replay]').forEach(b => b.addEventListener('click', () => location.reload()));

// 11. Tabs for the remaining diagrams
$$('.dtabs').forEach(t => { const tabs = $$('[role=tab]', t), panes = $$('[role=tabpanel]', t);
  tabs.forEach((b, i) => b.addEventListener('click', () => { tabs.forEach((x, j) => { x.setAttribute('aria-selected', i === j); panes[j].hidden = i !== j; }); })); });

// 12. Feature videos load only when their row is opened
$$('details video[data-src]').forEach(v => { const d = v.closest('details');
  const go = () => { if (d.open && !v.src) { v.src = v.dataset.src; if (!RM) v.play().catch(() => {}); } }; d.addEventListener('toggle', go); go(); });

// 13. How I work mini-illustrations: play once when in view; replay on hover / tap / focus
$$('.step .ic').forEach(ic => {
  const step = ic.closest('.step');
  const play = () => { if (RM) return; ic.classList.remove('play'); void ic.getBoundingClientRect(); ic.classList.add('play'); };
  if (!RM) { const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { play(); o.disconnect(); } }, { threshold: .4 }); o.observe(ic); }
  ['mouseenter', 'click', 'focus'].forEach(ev => step.addEventListener(ev, play));
});

// 14. Mobile nav panel
const nb = $('.menu-btn');
if (nb) nb.addEventListener('click', () => { const n = nb.closest('.nav'); const o = n.classList.toggle('open'); nb.setAttribute('aria-expanded', o); nb.textContent = o ? 'Close' : 'Menu'; });
$$('.nav ul a').forEach(a => a.addEventListener('click', () => { const n = a.closest('.nav'); n.classList.remove('open'); if (nb) { nb.setAttribute('aria-expanded', false); nb.textContent = 'Menu'; } }));

// 15. Mobile step-through (shared pattern: any ol.mm-steps). One step + the next one peeking, counter,
//     prev/next (44px), swipe or tap to advance, auto-advance while in view, and a "Full view" overlay
//     that shows the full diagram (pinch / scroll / zoom). Source svg: data-full selector, else the figure's .mmwrap svg.
function openFull(src, title) {
  // same bar as notes.js .diag-overlay: title + 44px Close; Escape closes; pan / pinch inside
  const ov = document.createElement('div'); ov.className = 'fv'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Full view: ' + title);
  ov.innerHTML = `<div class="fv-bar"><span>${esc(title || 'Full view')}</span><button type="button" class="fv-x">Close</button></div><div class="fv-body"></div>`;
  const c = src.cloneNode(true); c.classList.add('fv-svg'); $$('[id]', c).forEach(n => n.removeAttribute('id'));
  $$('.node,.msg,.wire,.edge', c).forEach(n => n.classList.add('lit', 'on'));
  const vb = (src.getAttribute('viewBox') || '0 0 1000 600').split(/\s+/).map(Number);
  c.style.width = Math.max(720, vb[2]) + 'px'; c.style.height = 'auto';
  $('.fv-body', ov).appendChild(c); document.body.appendChild(ov); document.body.classList.add('fv-open');
  const prev = document.activeElement;
  const key = e => { if (e.key === 'Escape') close(); };
  const close = () => { ov.remove(); document.body.classList.remove('fv-open'); removeEventListener('keydown', key); prev && prev.focus && prev.focus(); };
  addEventListener('keydown', key);
  $('.fv-x', ov).addEventListener('click', close); $('.fv-x', ov).focus();
}
// Same interaction as notes.js armStepper: top bar "i / n" + "Full view"; below: Previous / Next step (Done at the end);
// tap a step; swipe left/right; plus auto-advance once while in view (stops at the last step or on any interaction).
const onNotes = document.body.classList.contains('notes-page') || document.body.classList.contains('resume-page') || !!document.querySelector('.notes-page, .resume-page');
$$('.mm-steps').forEach(ol => {
  if (onNotes || ol.classList.contains('note-steps')) return;   // notes.js owns steppers there
  if (ol.closest('.trace-card') && matchMedia('(max-width: 640px)').matches) return;   // hero diagram is not shown on phones
  const lis = $$('li', ol); if (!lis.length) return; let i = 0, t = null, seen = false;
  const fig = ol.closest('figure') || ol.parentNode;
  const src = ol.dataset.full ? $(ol.dataset.full) : fig.querySelector('.mmwrap svg');
  const title = ol.dataset.title || ((fig.querySelector('header span') || {}).textContent || 'Full view');
  const bar = document.createElement('div'); bar.className = 'stp-bar';
  bar.innerHTML = `<span class="stp-c" aria-live="polite"></span>${src ? '<button type="button" class="stp-f">Full view</button>' : ''}`;
  const nav = document.createElement('div'); nav.className = 'stp-nav';
  nav.innerHTML = '<button type="button" class="prev">Previous</button><button type="button" class="primary">Next step</button>';
  ol.classList.add('stp'); ol.before(bar); ol.after(nav);
  const [pb, nb2] = $$('button', nav);
  const show = k => { i = Math.max(0, Math.min(k, lis.length - 1));
    lis.forEach((li, j) => { li.classList.toggle('on', j === i); li.classList.toggle('nxt', j === i + 1); li.classList.toggle('done', j < i); li.setAttribute('aria-current', j === i ? 'step' : 'false'); });
    $('.stp-c', bar).textContent = (i + 1) + ' / ' + lis.length;
    pb.disabled = i <= 0; nb2.disabled = i >= lis.length - 1; nb2.textContent = i >= lis.length - 1 ? 'Done' : 'Next step'; };
  const stop = () => { clearInterval(t); t = null; };
  const auto = () => { if (t || RM || i >= lis.length - 1) return; t = setInterval(() => { if (i >= lis.length - 1) return stop(); show(i + 1); }, 2600); };
  let touched = false; const user = f => () => { touched = true; stop(); f(); };
  show(0);
  pb.addEventListener('click', user(() => show(i - 1))); nb2.addEventListener('click', user(() => show(i + 1)));
  if (src) $('.stp-f', bar).addEventListener('click', user(() => openFull(src, title)));
  lis.forEach((li, j) => { li.tabIndex = 0; li.removeAttribute('role');
    const go = user(() => show(j === i ? i + 1 : j)); li.addEventListener('click', go);
    li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
  let x0 = 0, y0 = 0;
  ol.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY; }, { passive: true });
  ol.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) { touched = true; stop(); show(i + (dx < 0 ? 1 : -1)); } }, { passive: true });
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !touched) { if (!seen) { seen = true; show(0); } auto(); } else stop(); }), { threshold: .35 }).observe(ol);
});

// 17. Mobile carousels (shared pattern: any .mcar). <=640px the grid becomes a scroll-snap strip (card ≈85%, next peeks);
//     a bar under it shows "n / N", dots and 44px prev/next buttons. Above 640px nothing changes.
$$('.mcar').forEach(car => {
  if (car.matches('#about .xp.mcar, #about .about.mcar')) return;
  const items = [...car.children].filter(c => !c.classList.contains('ps2-mid')); if (items.length < 2) return;
  const nav = document.createElement('div'); nav.className = 'mcar-nav';
  nav.innerHTML = `<button type="button" class="mc-p" aria-label="Previous card">←</button><span class="mc-dots" aria-hidden="true">${items.map(() => '<i></i>').join('')}</span><span class="mc-c" aria-live="polite"></span><button type="button" class="mc-n" aria-label="Next card">→</button>`;
  car.after(nav);
  const dots = $$('.mc-dots i', nav);
  const cur = () => { const L = car.getBoundingClientRect().left; let b = 0, bd = 1e9; items.forEach((it, k) => { const d = Math.abs(it.getBoundingClientRect().left - L - parseFloat(getComputedStyle(car).paddingLeft || 0)); if (d < bd) { bd = d; b = k; } }); return b; };
  const paint = () => { const k = cur(); dots.forEach((d, j) => d.classList.toggle('on', j === k)); $('.mc-c', nav).textContent = `${k + 1} / ${items.length}`; };
  const go = k => { const it = items[Math.max(0, Math.min(items.length - 1, k))]; car.scrollTo({ left: it.offsetLeft - car.offsetLeft - parseFloat(getComputedStyle(car).paddingLeft || 0), behavior: RM ? 'auto' : 'smooth' }); };
  $('.mc-p', nav).addEventListener('click', () => go(cur() - 1)); $('.mc-n', nav).addEventListener('click', () => go(cur() + 1));
  let raf = 0; car.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }, { passive: true });
  paint(); addEventListener('resize', paint);
});

// 18. Mobile "show more" (shared pattern: [data-mclamp="<px>"]). <=640px whole children that end past <px> are hidden
//     (no half-cut lines, nothing under the button); a 44px toggle with its own spacing reveals them.
const mq640 = matchMedia('(max-width: 640px)');
$$('[data-mclamp]').forEach(el => {
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'mclamp-btn'; btn.setAttribute('aria-expanded', 'false'); el.after(btn);
  let open = false;
  const apply = () => {
    const kids = [...el.children]; kids.forEach(k => k.classList.remove('mc-off')); el.classList.remove('mclamp');
    const lim = +el.dataset.mclamp; const top = el.getBoundingClientRect().top;
    const over = mq640.matches ? kids.filter((k, n) => n > 0 && k.getBoundingClientRect().bottom - top > lim) : [];
    btn.hidden = over.length === 0;
    if (!over.length) return;
    if (!open) { over.forEach(k => k.classList.add('mc-off')); el.classList.add('mclamp'); }
    btn.textContent = open ? 'Show less ↑' : `Show ${over.length} more ↓`; btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', () => { open = !open; apply(); });
  apply(); mq640.addEventListener('change', apply); addEventListener('load', apply);
});
if (mq640.matches) $$('.xp details[open]').forEach(d => d.removeAttribute('open'));

// 16. Data model: click/tap (not hover) highlights a table, its relations and linked tables
$$('.erc').forEach(er => {
  const cards = $$('.ent-c', er), rels = $$('.rels li', er);
  const pick = name => {
    const same = er.dataset.sel === name; er.dataset.sel = same ? '' : name; er.classList.toggle('sel', !same);
    cards.forEach(c => c.classList.remove('on', 'rel')); rels.forEach(r => r.classList.remove('on'));
    if (same) return;
    rels.forEach(r => { if (r.dataset.a === name || r.dataset.b === name) { r.classList.add('on'); const o = r.dataset.a === name ? r.dataset.b : r.dataset.a; cards.forEach(c => c.dataset.e === o && c.classList.add('rel')); } });
    cards.forEach(c => c.dataset.e === name && c.classList.add('on'));
  };
  cards.forEach(c => { c.addEventListener('click', () => pick(c.dataset.e)); c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(c.dataset.e); } }); });
});

}
