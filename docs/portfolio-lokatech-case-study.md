# LokaTech — Internal Operations Platform

> **精辟描述**  
> 一套为专业数字服务团队打造的端到端运营系统：从标准化报价、协作式范围确认，到开票与交付文档——把散落在表格、邮件和 PDF 里的业务流程，收拢进一个可审计、可扩展的全栈应用里。

> **One-liner (EN)**  
> A full-stack operations platform for professional digital services teams — unifying scoped pricing, collaborative client sign-off, billing, and technical documentation in a single Next.js application.

---

## The Problem

Small and mid-sized digital service teams (web agencies, product studios, consultancies) routinely run sales, delivery, and finance on a patchwork of spreadsheets, email threads, and one-off PDFs. That fragmentation creates real operational pain:

| Pain point | What breaks in practice |
|------------|-------------------------|
| **Inconsistent quoting** | Every project type has different pricing rules (tiered pages, CMS add-ons, custom scope lines, percentage modifiers). Manual calculation leads to under-pricing, rework, and disputes. |
| **Scope creep with no audit trail** | Requirements change mid-negotiation and mid-build, but there is no single source of truth showing *what changed, when, and what the client agreed to*. |
| **Slow client sign-off** | Proposals go back and forth over email. Clients cannot easily acknowledge line items, leave structured feedback, or formally accept a baseline — so projects stall before development starts. |
| **Billing disconnected from contracts** | Invoices are typed from scratch, overdue status is inferred from memory, and there is no clear view of contract value vs. amount invoiced per project. |
| **Documentation scattered** | Requirements notebooks, architecture diagrams, and scope catalogs live in different tools. Clients who need read-only access get screenshots or exports instead of a controlled portal. |
| **No operational visibility** | Leadership cannot see at a glance what needs attention: unread client feedback, open review rounds, or overdue invoices across active projects. |

These are not niche problems — they are the default state for teams that outgrow spreadsheets but are not ready for heavyweight ERP or PSA suites.

---

## The Solution

**LokaTech** is a purpose-built internal operations platform that sits alongside a public marketing site in a single Next.js monorepo. It gives a small professional services team one system for the full pre-sale → delivery → billing loop:

1. **Master data hubs** — Clients and a categorized scope/pricing catalog form the foundation for every quote.
2. **Project-centric workspace** — Each engagement gets a typed project (portfolio, landing page, corporate site, or custom system) with a rules-based pricing engine, scope builder, requirements notebook, and live UML editor.
3. **Collaborative scope review** — Admins publish review rounds; clients interact via secure magic links — ticking lines, commenting, and accepting a locked baseline.
4. **Billing tied to projects** — Multi-line invoices, payment status, overdue detection, and PDF export per project.
5. **Command dashboard** — Billing metrics and a "needs attention" feed surface client feedback, open reviews, and overdue invoices in one place.

The architecture deliberately separates **admin** (authenticated staff), **marketing** (public), and **client portal** (token-based, no login) so each audience gets the right experience without compromising security.

---

## Impact

| Area | Before | After |
|------|--------|-------|
| **Quoting** | Manual math per project type; catalog prices copied by hand | Four project-type calculators with transparent step-by-step breakdown; catalog-driven custom scope with floors and modifiers |
| **Scope negotiation** | Email + PDF loops; unclear what changed between versions | Review rounds with NEW/MODIFIED flags, per-line client ticks, comments, and baseline lock on accept |
| **Change control** | Verbal agreements after kickoff | Post-baseline edits flagged as change orders with full `ScopeChangeHistory` audit trail |
| **Invoicing** | Ad-hoc line items; weak overdue visibility | Project-first billing hub with aggregates, filters, status badges, and branded invoice PDFs |
| **Client access** | Screenshots or full account creation | Two purpose-built magic links — interactive scope review vs. read-only project docs |
| **Daily operations** | Hunt across hubs for open items | Dashboard attention feed links directly to the project or invoice that needs action |

**Scale note:** Designed for agency-scale load (low concurrent users, modest row counts) with pragmatic performance choices — lazy-loaded module items, client-side PDF generation to avoid serverless limits, and hashed token storage.

---

## Features

### Admin Hubs

| Hub | Route | Capabilities |
|-----|-------|--------------|
| **Dashboard** | `/dashboard` | Unpaid total, overdue count, MTD revenue, active projects; attention feed for unread client comments, open review rounds, overdue invoices; quick links |
| **Clients** | `/clients` | CRM list with search; detail view with projects and invoice history |
| **Scopes** | `/scopes` | Master pricing catalog by category (Foundation, CRUD, UI/UX, APIs, etc.); fixed, range, and percentage-modifier cost types |
| **Projects** | `/projects` | Create by type; Info tab with pricing breakdown and comments; Scope & Requirements (custom systems); Modules notebook; UML editor; Scope Review workflow |
| **Billing** | `/billing` | Project-level billing overview; per-project invoice CRUD; mark paid/unpaid; filters and PDF download |

### Project Workspace (per engagement)

- **Info** — Read/edit project metadata; live pricing breakdown; internal comment log; download Scope Proposal PDF
- **Scope & Requirements** — Catalog-driven scope lines for custom systems; bulk edit; per-item detail with change history; NEW / MODIFIED / change-order badges
- **Modules** — Hierarchical requirements notebook (modules → items); lazy-loaded items; URL auto-linking in read mode
- **Project UML** — Split-pane Mermaid editor with debounced live preview and version snapshots
- **Scope Review** — Publish rounds to client; generate/revoke magic links; view client ticks and comments; round history; baseline PDF after accept

### Client Portal (magic links, no account)

| Link | Route | Purpose |
|------|-------|---------|
| **Scope review** | `/portal/review/[token]` | View scope + fees; tick lines; comment; accept final baseline (14-day expiry) |
| **Project docs** | `/portal/docs/[token]` | Read-only modules notebook + UML diagrams (30-day expiry) |

### Document Generation

- **Scope Proposal PDF** — Cover, project overview, scope grouped by category, investment summary, terms
- **Invoice PDF** — Agency branding, line items, grand total, payment instructions; PAID watermark
- **Baseline Scope PDF** — Rendered from locked snapshot JSON after client acceptance

### Pricing Engine

Supports four `ProjectType` values with distinct formulas:

| Type | Logic highlights |
|------|------------------|
| Portfolio | Tiered per-page pricing + optional CMS multiplier |
| Landing page | Flat setup and maintenance |
| Corporate website | Base pages 1–5 + extras + CMS |
| Custom system | Sum of scope lines + mobile/QA/PM modifiers; minimum setup RM 5,500 / maintenance RM 1,500 |

Pure functions in `src/lib/pricing.ts` — unit-testable, decoupled from server actions.

---

## Engineering Spotlight

Highlights worth calling out in interviews or deep-dive portfolio sections:

### 1. Phased, spec-driven delivery

Four implementation phases with written specs and implementation records. Each phase shipped a usable vertical slice (auth → projects → billing → collaboration) rather than a horizontal "all CRUD, no workflow" build.

### 2. Consistent server action architecture

Every mutation follows the same contract:

- `"use server"` directive
- Zod validation before Prisma
- `requireSession()` auth gate (admin actions)
- Standardized `{ success, data } | { success, error }` returns
- `revalidatePath()` for immediate UI consistency

This pattern scales across 8+ action modules without ad-hoc error handling.

### 3. Route-group isolation in one Next.js app

```
src/app/(marketing)/   → Public site (unchanged URLs)
src/app/(app)/         → Admin hubs (session required)
src/app/admin-lokatech/ → Login
src/app/portal/        → Client magic-link pages (public, noindex)
```

Separate themes (`admin-theme.css`, `portal-theme.css`) without polluting the marketing site's black-brand layout.

### 4. Security-conscious client portal

- 32-byte random tokens; **SHA-256 hash at rest** (plain token shown once)
- Token type enforced per route (`scope_review` vs `project_docs`)
- Expiry and revoke checked on every request
- Scoped to a single `projectId` / `clientId`

### 5. Collaborative workflow as first-class data model

Not bolted-on comments — dedicated models for `ProposalReviewRound`, `ProposalScopeAcknowledgement`, `ProposalReviewComment`, `ProjectBaselineSnapshot`, and `ClientPortalToken`, with `changeFlag` / `isChangeOrder` on scope lines driving admin UX.

### 6. Pragmatic PDF strategy

`@react-pdf/renderer` runs **client-side only** via `<PDFDownloadLink>` to avoid Vercel serverless bundle limits. `useMounted()` guard prevents Next.js 16 / Turbopack SSR hydration errors.

### 7. RSC serialization discipline

Prisma `Decimal` fields serialized to plain numbers before crossing the server/client boundary — prevents common Next.js App Router serialization failures.

### 8. Database evolution with real migrations

Schema grew across phases with explicit migrations: initial schema → project modules → bill line items → proposal/portal models. Seed script upserts 37 catalog scope rows for realistic dev/prod bootstrap.

### 9. Lazy loading where it matters

Module items load on expand, not on project page load — keeps the project detail page fast as notebooks grow.

### 10. Live Mermaid with safe defaults

Client-only dynamic import, 400ms debounced render, `securityLevel: 'loose'`, unique render IDs — balances DX with parse-error feedback inline.

---

## Tech Stack

| Layer | Choice | Role |
|-------|--------|------|
| **Framework** | Next.js (App Router) | SSR/RSC, routing, middleware |
| **Language** | TypeScript | End-to-end type safety |
| **UI** | Tailwind CSS v4, Shadcn UI, Lucide icons | Admin shell, forms, tables, dialogs |
| **Auth** | Auth.js v5 (NextAuth beta) | Credentials provider, JWT sessions |
| **Database** | PostgreSQL | Relational data, migrations |
| **ORM** | Prisma 6 | Schema, migrations, seed, local `prisma dev` |
| **Validation** | Zod | Server action input schemas |
| **Diagrams** | Mermaid 11 | In-browser UML preview |
| **PDF** | @react-pdf/renderer 4 | Client-side document generation |
| **Password hashing** | bcryptjs | Admin seed + login |
| **Hosting (target)** | Vercel + Neon | Pooled `DATABASE_URL` for serverless; direct URL for migrations |

**Data model scale:** 17 Prisma models, 5 enums — `User`, `Client`, `Project`, `Scope`, `ProjectScope`, `ScopeChangeHistory`, `Bill`, `BillLineItem`, `ProjectModule`, `ProjectModuleItem`, `ProjectUML`, `ProjectUMLVersion`, `ProjectCommentLog`, `ProposalReviewRound`, `ProposalScopeAcknowledgement`, `ProposalReviewComment`, `ProjectBaselineSnapshot`, `ClientPortalToken`.

---

## Future Roadmap

Planned next waves (specs written; not yet implemented):

### Wave A — Platform hardening & lifecycle

- [ ] **Project status pipeline** — `lead` → `scoping` → `proposal_sent` → `won` → `in_progress` → `completed` → `archived`; gates for billing and scope edits
- [ ] **Middleware refactor** — Single matcher for all admin routes; defense-in-depth session check in `(app)/layout.tsx`
- [ ] **Roles & audit log** — Beyond single admin tier; immutable action log for compliance

### Wave B — Billing enhancements

- [ ] Sequential invoice numbers (e.g. `INV-2026-0001`)
- [ ] `dueDate` field and smarter overdue logic
- [ ] Invoice templates — 50% deposit, milestone, maintenance presets
- [ ] % invoiced vs contract value on billing overview
- [ ] SST / tax line on invoice PDFs (Malaysia compliance)

### Wave C — Delivery & UX polish

- [ ] **Delivery tracker** — Lightweight milestones and tasks linked optionally to module items
- [ ] Drag-and-drop reorder (`@dnd-kit`) for modules, line items, milestones
- [ ] Markdown rendering in module descriptions and scope specs
- [ ] Global search across clients, projects, invoices

### Wave D — Integrations

- [ ] Email notifications (Resend) — scope review published, invoice sent, payment received, proposal accepted
- [ ] CSV export for accounting tools
- [ ] Scheduled overdue reminders

### Wave E — Portal extensions (optional)

- [ ] Admin reply threads on client comments
- [ ] Per-item strict gate before client can accept
- [ ] E-signature integration

---

## Suggested Talking Points (Interviews)

1. *"I designed a phased roadmap so each release delivered end-user value — not just infrastructure."*
2. *"The pricing engine is pure functions separated from server actions, which made the business rules testable and the UI breakdown transparent."*
3. *"Client collaboration uses hashed magic links with separate token types — scope negotiation and read-only docs are intentionally not the same URL."*
4. *"I chose client-side PDF generation to stay within serverless constraints on Vercel while still shipping branded documents."*
5. *"Change orders after baseline lock are a first-class concept — flagged scope lines with audit history, not an afterthought."*

---

*Generated from `docs/internal-system-development/` specs and implementation records (Phases 1–4, June 2025–2026).*
