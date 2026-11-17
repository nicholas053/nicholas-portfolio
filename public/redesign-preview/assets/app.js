// Prototype behaviour. Each block maps to one React component when ported (see PORTING.md).
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// 1. Scroll reveal + SVG line-draw (→ framer-motion whileInView)
$$('.draw path,.draw line,.draw polyline').forEach(p => { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) {} });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .18 });
$$('.rv,.draw').forEach(el => RM ? el.classList.add('in') : io.observe(el));

// 2. Hero rotator, synced with the three "How I work" steps
const slot = $('#slot');
if (slot && !RM) {
  const items = $$('b', slot); let i = 0;
  setInterval(() => { const cur = items[i]; cur.classList.remove('on'); cur.classList.add('out');
    i = (i + 1) % items.length; const nx = items[i]; nx.classList.remove('out'); void nx.offsetWidth; nx.classList.add('on');
    setTimeout(() => cur.classList.remove('out'), 650); }, 2600);
}

// 3. Live trace: a packet runs real paths through the adapter diagram; the log prints what each note says happens
const svg = $('#trace');
if (svg) {
  const pkt = $('#pkt'), halo = $('#pktHalo'), log = $('#log'), scn = $('#scn');
  const N = id => $('#' + id);
  const scenarios = [
    { name: 'final', steps: [['w1', 'nHandler', ['← POST /callbacks/acct_A   provider=A', '']], ['w2', 'nAdapter', ['adapter A: parse body · verify signature ✓', 'ok']], ['w3', 'nCore', ['normalised event: status=final', '']], ['w4a', 'nFinal', ['core: state changes once → recorded', 'ok']], ['w5', 'nApi', ['→ provider-specific ack 200', 'hot']]] },
    { name: 'pending', steps: [['w1', 'nHandler', ['← POST /callbacks/acct_B   provider=B', '']], ['w2', 'nAdapter', ['adapter B: parse body · verify signature ✓', 'ok']], ['w3', 'nCore', ['normalised event: status=pending', 'warn']], ['w4b', 'nPending', ['core: pending → acknowledged, no state change', 'warn']], ['w5', 'nApi', ['→ provider-specific ack 200', 'hot']]] },
    { name: 'duplicate', steps: [['w1', 'nHandler', ['← POST /callbacks/acct_A   (same event again)', '']], ['w2', 'nAdapter', ['adapter A: verify signature ✓', 'ok']], ['w3', 'nCore', ['core: already applied → duplicate does nothing', 'warn']], ['w5', 'nApi', ['→ ack 200 (idempotent)', 'hot']]] },
    { name: 'job', steps: [['w6', 'nApi', ['job: claim row before calling out', 'hot']], [null, 'nJob', ['job: record stage + last error → retry cannot send twice', 'ok']]] },
  ];
  const addLog = (t, c) => { const d = document.createElement('div'); d.textContent = t; if (c) d.className = c; log.appendChild(d); while (log.children.length > 6) log.firstChild.remove(); };
  const lit = id => { $$('.node', svg).forEach(n => n.classList.remove('lit')); if (id) N(id).classList.add('lit'); };
  const run = (path, dur, rev) => new Promise(res => {
    const L = path.getTotalLength(), t0 = performance.now(); path.classList.add('flow');
    const f = now => { const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = path.getPointAtLength((rev ? 1 - e : e) * L); pkt.setAttribute('cx', p.x); pkt.setAttribute('cy', p.y); halo.setAttribute('cx', p.x); halo.setAttribute('cy', p.y);
      if (k < 1) requestAnimationFrame(f); else { path.classList.remove('flow'); res(); } };
    requestAnimationFrame(f);
  });
  const wait = ms => new Promise(r => setTimeout(r, ms));
  if (RM) { // static: show the full picture and a complete log
    lit('nCore'); pkt.setAttribute('cx', 465); pkt.setAttribute('cy', 150); halo.setAttribute('cx', 465); halo.setAttribute('cy', 150);
    ['← POST /callbacks/:acct', 'adapter: verify signature ✓', 'status=final → state changes once', 'status=pending → no state change', 'duplicate → does nothing', 'job: claim row before calling out'].forEach(t => addLog(t));
  } else (async () => {
    lit('nApi'); await wait(700);
    for (let s = 0; ; s = (s + 1) % scenarios.length) {
      const sc = scenarios[s]; scn.textContent = sc.name;
      if (sc.name === 'job') lit('nJob'); else lit('nApi');
      addLog('— scenario: ' + sc.name, 'hot'); await wait(350);
      for (const [w, node, [txt, cls]] of sc.steps) {
        if (w) await run(N(w), 750, w === 'w5' || w === 'w6');
        lit(node); addLog(txt, cls); await wait(520);
      }
      await wait(900);
    }
  })();
}

// 4. Notes: progressive disclosure
const allBtn = $('#allNotes');
if (allBtn) allBtn.addEventListener('click', () => { const l = $('#log2'); const on = l.classList.toggle('all'); allBtn.setAttribute('aria-expanded', on); allBtn.textContent = on ? 'Show fewer ↑' : 'Show all 11 notes ↓'; });

// 5. Nav scroll-spy
const spies = $$('[data-spy]');
if (spies.length) { const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) spies.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  spies.forEach(a => { const t = $(a.getAttribute('href')); if (t) so.observe(t); }); }

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
