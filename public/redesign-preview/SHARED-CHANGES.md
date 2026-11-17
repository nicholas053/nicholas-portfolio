# Shared primitives — change log (owner: index + work/* worker)

Shared files: `assets/styles.css`, `assets/app.js`. Notes/resume use these plus their own `assets/notes.css` / `assets/notes.js`.
Stable tokens/classes (do not rename): `--trace`, `--trace-tint`, `--trace-glow`, `--ink`, `--ink-line`, `--paper`, `--mute-ink`, `--ack`, `html[data-accent]`,
`.nav`, `.menu-btn`, `#navlist`, `.accent-switch`, `.rv`/`.in` reveal, `.blk` details, `.diag-hero`, `.mm`, `.mmwrap`, `.mm-log`, `.mm-steps`, `.erc`/`.ent-c`/`.rels`, `.dtabs`, `.d-only`/`.m-only`, `.pager`.

## 2026-11-17 (MYT)
- Nav: added `<button class="menu-btn" aria-controls="navlist">` before `<ul id="navlist">`; ≤760px the list becomes a full-width panel (`.nav.open`), 44px+ targets. JS: app.js §14.
- Diagrams on mobile (≤760px): every lanes/graph render now emits `<div class="mmwrap d-only">svg</div>` + `<ol class="mm-steps m-only">` vertical step cards (auto-advance in view, tap = jump/next; static under reduced motion). JS: app.js §15. `.mm-log` inside `.diag-hero` hidden on mobile.
- Data model explorer: `.ent-c` cards have `data-e`, `.rels li` have `data-a`/`data-b`; click/tap/Enter toggles `.erc.sel` + `.on`/`.rel` highlights (no hover). JS: app.js §16. Adds `<p class="er-hint">`.
- Hero (index only): `#trace` desktop SVG + `#traceM` vertical mobile SVG; JS picks one by `(max-width:900px)`.
- Project template (work/* only): `.proj-hero h1 .acc`, `.facts4` (Role/Stack/Scope/Result), `.psec`, `.psec-h`, `.src`, `.pfig`.
- How I work icons (index only): `.ic`, `.ic1-3` keyframes; app.js §13.
- `hub_svg` (build.py) gained `kind`/`who` args and mobile `.mm-steps` output.
- `.pager` stacks to one column ≤760px.
