/**
 * Single source of truth for profile copy on the home page and `/resume`.
 * Case studies under `/projects` and write-ups under `/notes` stay as-is.
 */

export const PERSON = {
  legalName: "Nicholas Chong Shi Loong",
  preferredName: "Nic",
  role: "Full-Stack Developer & Product Engineer",
  phone: "+60122657856",
  email: "shiloong53bii@gmail.com",
  githubUsername: "nicholas053",
  instagramHandle: "nicholas_loong",
  /** Resume / contact — current bases */
  location: "KL, Seremban",
} as const

export const HERO = {
  greeting: `Hi, I'm ${PERSON.preferredName}`,
  roleLine: PERSON.role,
  lead:
    "I clarify messy requirements, sketch the architecture, and ship full-stack web apps — from client builds to products I run myself.",
  notesHint:
    "Technical notes with sequence diagrams — for the full story behind the bullets.",
} as const

export const SITE_SEO = {
  tagline:
    "Full-stack developer and product engineer — clarify requirements, ship pragmatic architecture.",
  description:
    "Portfolio of Nicholas Chong: full-stack apps in Next.js, React, and PostgreSQL; technical notes with sequence diagrams; case studies from independent products to enterprise delivery.",
} as const

export const HOME_CTA = {
  seeProjects: "See projects",
  contact: "Contact",
  technicalNotes: "Technical notes",
  resume: "Resume",
} as const

export const NOTES_PAGE = {
  metadataDescription:
    "Architecture write-ups with diagrams — deeper than project cards, NDA-safe where noted.",
  eyebrow: "Technical notes",
  heading: "Write-ups with diagrams",
  intro:
    "Architecture write-ups with diagrams — when you want the how, not just the bullet. Project demos and case studies live under",
  projectsLinkLabel: "Projects",
} as const

export const HOME_LOKATECH = {
  title: "Client work — LokaTech",
  body: "Alongside this portfolio I run LokaTech for scoped freelance and product engagements — discovery, build, and ongoing support.",
  linkLabel: "Visit lokatech.co →",
} as const

export const HOME_WORKFLOW = {
  title: "How I work",
  steps: [
    {
      icon: "users" as const,
      title: "Understand the rule",
      body:
        "Clarify requirements with stakeholders before coding. When specs and reality diverge, confirm scope early — don't build on wrong assumptions.",
    },
    {
      icon: "diagram" as const,
      title: "Make it legible",
      body:
        "Workflow and sequence diagrams, state models, and scoped tasks that everyone can review before the big build.",
    },
    {
      icon: "code" as const,
      title: "Ship and maintain",
      body:
        "Pragmatic stack choices, clean API and UI boundaries, and refactors that fix once across roles and surfaces.",
    },
  ],
} as const

export const HOME_PROJECTS_SECTION_TITLE = "Selected work"

export type HomeNdaBannerLink = {
  href: string
  label: string
  tone?: "primary" | "muted"
}

export type HomeNdaBanner = {
  badge: string
  title: string
  role: string
  body: string
  links?: readonly HomeNdaBannerLink[]
}

export const HOME_NDA_BANNERS: readonly HomeNdaBanner[] = [
  {
    badge: "Confidential / NDA",
    title: "Tiered Fee Engine",
    role: "Role: Backend developer · Go, PostgreSQL",
    body:
      "Percent-plus-fixed fees split across multiple levels of partners, with a read-only preview that shows every level's share before a rate change is saved. Migrated the fee model from a single rate to percent-plus-fixed without recalculating historical records. Also built third-party integrations and failure tracking and recovery for background jobs.",
  },
  {
    badge: "Confidential / NDA",
    title: "Enterprise system turnaround",
    role: "Role: Tech BA & front-end dev",
    body:
      "Joined mid-flight on a confidential enterprise CRM where logic and expectations had diverged. I stopped build-on-bad-assumptions, realigned scope, translated ambiguity into sequence diagrams and actionable work, and kept front-end architecture moving while advising client syncs on feasibility.",
    links: [
      { href: "/notes/flexible-financial-settlement", label: "Finance architecture note →" },
      { href: "/notes", label: "All technical notes →", tone: "muted" },
    ],
  },
]

export type HomeProjectCard = {
  title: string
  description: string
  linkPath: string
  linkLabel: string
}

export const HOME_PROJECTS: HomeProjectCard[] = [
  {
    title: "Multi-Seller Marketplace Channel",
    description:
      "Added a multi-seller shop channel to an existing marketplace app: seller onboarding to refunds, with stock and money kept correct under concurrency and late payment events.",
    linkPath: "/projects/multi-seller-marketplace",
    linkLabel: "Read case study →",
  },
  {
    title: "LokaTech — Internal Operations Platform",
    description:
      "Agency ops monorepo: pricing, scope sign-off, and project-first billing — replaced spreadsheet quote loops and email scope churn.",
    linkPath: "/projects/lokatech",
    linkLabel: "Read case study →",
  },
  {
    title: "What I Applied",
    description:
      "Personal ATS and career prep with JD-grounded Gemini assets and follow-up nudges. Beta: ~50 users; live on Vercel.",
    linkPath: "/projects/what-i-applied",
    linkLabel: "Read case study →",
  },
  {
    title: "Church Management System",
    description:
      "Events, attendance, outings, and role-based admin — replaced scattered Forms/Sheets for 100+ users.",
    linkPath: "/projects/church-system",
    linkLabel: "Read case study →",
  },
  {
    title: "Task Management System",
    description:
      "Self-hosted Kanban with voting, comments, and dashboards — used by two startup teams (~5–10 people each).",
    linkPath: "/projects/task-system",
    linkLabel: "Read case study →",
  },
]

export const HOME_TECH_NOTES_INTRO =
  "Architecture write-ups with diagrams — when you want the how, not just the bullet."

/** Home selected-work list. `featureOnMobile` is the short set shown on a phone. */
export const HOME_TECH_NOTE_LINKS = [
  {
    href: "/notes/seller-onboarding-variants",
    title: "Seller onboarding and product variants",
    blurb: "Shops on existing accounts, two variant axes, per-variant price and stock (NDA).",
    featureOnMobile: false,
  },
  {
    href: "/notes/cart-stock-reservation",
    title: "Cart and stock reservation",
    blurb: "Holds at checkout summary so idle carts do not lock stock (NDA).",
    featureOnMobile: true,
  },
  {
    href: "/notes/cancel-vs-late-payment",
    title: "Cancel vs a late payment",
    blurb: "One locked path for cancel, a late confirmation, and a background check (NDA).",
    featureOnMobile: true,
  },
  {
    href: "/notes/order-lifecycle-refunds",
    title: "Order lifecycle and refunds",
    blurb: "Per-seller orders, returns, and idempotent refunds on a shared payment (NDA).",
    featureOnMobile: false,
  },
  {
    href: "/notes/multi-level-revenue-splits",
    title: "Multi-level revenue splits",
    blurb: "Percent-plus-fixed splits with a read-only preview before settle.",
    featureOnMobile: false,
  },
  {
    href: "/notes/third-party-api-adapters",
    title: "One interface for many third-party APIs",
    blurb: "Adapters, signature checks, and pending versus final callbacks.",
    featureOnMobile: false,
  },
  {
    href: "/notes/background-job-failures",
    title: "Background job failures",
    blurb: "Claim before calling out, and record why a row is stuck so retries stay safe.",
    featureOnMobile: false,
  },
  {
    href: "/notes/flexible-financial-settlement",
    title: "Flexible financial settlement",
    blurb: "Finance “shopping cart” batches, consolidated payment vouchers, commission states (NDA).",
    featureOnMobile: true,
  },
  {
    href: "/notes/performance-evaluation-360",
    title: "360° performance evaluation",
    blurb: "Assignment engine, JSONB, tokenized partner API, schema-driven Angular + mobile Likert layouts.",
    featureOnMobile: false,
  },
  {
    href: "/notes/frontend-architecture-refactoring",
    title: "Frontend architecture refactoring",
    blurb: "Unified dynamic forms, shared library, RBAC across admin and agent portals.",
    featureOnMobile: false,
  },
  {
    href: "/notes/fullstack-assessment-debugging",
    title: "Full-stack assessment reflection",
    blurb: "Pooling, infinite scroll stability, a live merge-order bug, and a transparent post-interview follow-up.",
    featureOnMobile: false,
  },
] as const

export const HOME_PHILOSOPHY =
  "Outside of work I write on philosophy and shoot photography — both push me to notice what people assume and what they overlook, which carries into how I gather requirements and design interfaces."

export const HOME_PHILOSOPHY_INSTAGRAM_LABEL = "Photography on Instagram"

export const HOME_CONTACT = {
  lead: "Happy to chat about backend and product engineering. Easiest reach: email or WhatsApp.",
} as const

/** Opening paragraph on the resume (keep short for print density). */
export const RESUME_SUMMARY =
  "Full-stack developer and product engineer: clarify requirements, sketch pragmatic architecture, ship maintainable web apps."

/** Substring of `RESUME_SUMMARY` emphasized on resume/PDF. */
export const RESUME_SUMMARY_ACCENT_PHRASE =
  "clarify requirements, sketch pragmatic architecture, ship maintainable web apps."

export type EducationEntry = {
  institution: string
  credential: string
  years: string
  note?: string
}

export const EDUCATION: EducationEntry[] = [
  {
    institution: "St Paul Institution",
    credential: "STPM",
    years: "2018 – 2019",
  },
  {
    institution: "University Malaysia Sabah (UMS)",
    credential: "Bachelor of Software Engineering",
    years: "2020 – 2024",
    // note: "Incomplete",
  },
]

export type ExperienceHighlight = {
  /** Bold lead, e.g. "End-to-End System Architecture (Mar 2024 – Sept 2025):" */
  label: string
  body: string
  /** Optional `/notes/...` path; resume & About show “See full →” after the body. */
  technicalNotePath?: string
  /** Substring of `body`; first match is shown in sky on resume/PDF only. */
  resumeAccentPhrase?: string
}

export type ExperienceTimelineEntry = {
  period: string
  /** Optional tenure label after dates (e.g. "3.5 years"); omit for current role if you prefer. */
  durationLabel?: string
  /** Shown on the portfolio About timeline */
  body: string
  /** Shorter line for the resume; falls back to `body` if omitted */
  resumeBody?: string
  employer?: { name: string; url?: string }
  /** One-line headline with `period`, e.g. "Independent Full-Stack Developer | Apr 2022 – Sept 2025" */
  roleTitle?: string
  /** Italic-style intro when `highlights` is used */
  summaryLead?: string
  /** Bulleted detail; when set, About/resume/PDF render this instead of a single `body` paragraph */
  highlights?: readonly ExperienceHighlight[]
  /** With `employer` + rich block: bold line under the company headline (e.g. “Web Developer / Product Engineer”). */
  jobTitle?: string
}

/** Company-first headline + optional role/summary/bullets (vs plain “Web Developer at …”). */
export function experienceUsesEmployerRichBlock(entry: ExperienceTimelineEntry): boolean {
  return Boolean(entry.employer && (entry.highlights?.length || entry.jobTitle || entry.summaryLead))
}

export const EXPERIENCE_TIMELINE: ExperienceTimelineEntry[] = [
  {
    period: "July 2026 – Present",
    jobTitle: "Backend Developer",
    summaryLead:
      "Own backend features from design to production on commerce and transaction systems. Passed probation early.",
    highlights: [
      {
        label: "Multi-seller marketplace channel (NDA):",
        body:
          "designed (lead-approved) and built a second sales channel on an existing marketplace app: seller onboarding, product variants, cart with stock reservation, one checkout across multiple sellers that stays correct when payment confirmations arrive late or twice, and the full order and refund lifecycle.",
        technicalNotePath: "/projects/multi-seller-marketplace",
      },
      {
        label: "Tiered fee engine (NDA):",
        body:
          "percent-plus-fixed fees split across multiple levels, with a read-only preview before any rate change; third-party integrations; failure tracking and recovery for background jobs.",
      },
      {
        label: "Internal operations and reconciliation tools.",
        body: "",
      },
      {
        label: "Tech Stack:",
        body: "Laravel, MySQL, Go, PostgreSQL",
        resumeAccentPhrase: "Laravel, MySQL, Go, PostgreSQL",
      },
    ],
    body: "At Ocean Hub Management Sdn Bhd: backend features from design to production on commerce and transaction systems, including a multi-seller marketplace channel and a tiered fee engine.",
    resumeBody:
      "Ocean Hub: backend on commerce and transaction systems — multi-seller marketplace channel (Laravel, MySQL) and a tiered fee engine (Go, PostgreSQL).",
    employer: { name: "Ocean Hub Management Sdn Bhd" },
  },
  {
    period: "Oct 2025 – June 2026",
    jobTitle: "Web Developer / Product Engineer",
    durationLabel: "8 months",
    summaryLead:
      "Lead delivery, refactors, and technical BA on enterprise apps; aligned schemas and UI with real finance/ops workflows.",
    highlights: [
      {
        label: "Architected Flexible Financial Settlement Engine:",
        body:
          "Lead dev & technical BA: commission payout redesign — batching, partial line items, locks/state aligned with accounting; cut post-launch finance rework.",
        technicalNotePath: "/notes/flexible-financial-settlement",
        resumeAccentPhrase: "cut post-launch finance rework",
      },
      {
        label: "Engineered 360° Performance Evaluation Module:",
        body:
          "Owned KPI-linked 360° reviews: auto-assignment, tokenized external access, Angular schema-driven forms + JSONB — new question types via config.",
        technicalNotePath: "/notes/performance-evaluation-360",
        resumeAccentPhrase: "new question types via config",
      },
      {
        label: "Led Frontend Architecture Refactoring:",
        body:
          "Unified duplicated portals: dynamic forms by route, RBAC-gated shared component library — fixes ship once across admin/agent views.",
        technicalNotePath: "/notes/frontend-architecture-refactoring",
        resumeAccentPhrase: "fixes ship once across admin/agent views",
      },
      {
        label: "Tech Stack:",
        body: "Laravel, Angular",
        resumeAccentPhrase: "Laravel, Angular",
      },
    ],
    body: "At Data Flows Sdn Bhd: led settlement-engine discovery and delivery, owned a KPI-linked 360° review module, and drove frontend architecture unification across enterprise apps.",
    resumeBody:
      "Data Flows: lead dev/technical BA on commission settlement redesign; owned 360° performance module (Angular, JSONB); led shared FE architecture and RBAC-gated component library.",
    employer: { name: "Data Flows Sdn Bhd", url: "https://www.dataflows.co/" },
  },
  {
    roleTitle: "Independent Full-Stack Developer",
    period: "Apr 2022 – Sept 2025",
    durationLabel: "3.5 years",
    summaryLead:
      "Part-time freelance during university grew into full-time independent delivery — church, task, and booking systems, plus products I still run.",
    highlights: [
      {
        label: "Web Development & Maintenance (Apr 2022 – Mar 2024):",
        body: "Landing pages, product catalogs, ongoing maintenance and feature work while completing the degree.",
        resumeAccentPhrase: "Landing pages, product catalogs, ongoing maintenance and feature work",
      },
      {
        label: "Systems & products (Mar 2024 – Sept 2025):",
        body:
          "HR and badminton booking systems; church, task, and e-commerce platforms; personal applicant-tracking / AI-assisted career prep (What I Applied). Workflows, RBAC, audit trails, voting, DnD task UX, clean API/UI (Next.js, Prisma, PostgreSQL, .NET).",
        resumeAccentPhrase: "RBAC, audit trails, voting, DnD task UX, clean API/UI (Next.js, Prisma, PostgreSQL, .NET)",
      },
      {
        label: "Tech Stack:",
        body: "Next.js, React, .NET Core, Prisma, PostgreSQL.",
        resumeAccentPhrase: "Next.js, React, .NET Core, Prisma, PostgreSQL.",
      },
    ],
    body: "Independent Full-Stack Developer (Apr 2022 – Sept 2025). Part-time freelance work grew into full-time independent delivery: HR and badminton booking systems, then church, task, and e-commerce platforms with workflows, RBAC, and auditability, plus a personal applicant-tracking / AI-assisted career prep app. Earlier phase focused on landing pages, catalogs, and client maintenance.",
    resumeBody:
      "Independent full-stack (Apr 2022–Sept 2025): scaled from freelance maintenance to multi-app systems (HR, booking, church, task, e-commerce, personal ATS/career prep); Next.js, .NET Core, Prisma, PostgreSQL.",
  },
  {
    period: "Oct 2020 – Mar 2024",
    body: "Pursued Software Engineering at University Malaysia Sabah. Self-funded studies while taking on freelance maintenance projects to support tuition.",
    resumeBody: "UMS Software Engineering (self-funded); freelance maintenance alongside studies.",
  },
]

export const TECH_STACK_ITEMS = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "prisma", label: "Prisma" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "angular", label: "Angular" },
  { id: "laravel", label: "Laravel" },
  { id: "golang", label: "Golang" },
  { id: "system-design", label: "System Design" },
  { id: "typescript", label: "TypeScript" },
  { id: "php", label: "PHP" },
  { id: "nodejs", label: "Node.js" },
  { id: "dotnet", label: ".NET (C#)" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "vercel", label: "Vercel" },
  { id: "github", label: "GitHub" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
] as const

/** Comma-separated for resume / ATS-friendly plain text (same order as `TECH_STACK_ITEMS`). */
export const TECH_STACK_LINE = TECH_STACK_ITEMS.map((s) => s.label).join(", ")

export type TechStackId = (typeof TECH_STACK_ITEMS)[number]["id"]

export const TECH_STACK_MARQUEE_IDS = [
  "next",
  "react",
  "postgresql",
  "laravel",
  "golang",
  "angular",
  "nodejs",
  "system-design",
] as const satisfies readonly TechStackId[]

export const TECH_STACK_MARQUEE_CAPTION =
  "Mostly Next.js, React, and PostgreSQL; also Laravel, Angular, Node.js, and Go."

/** Emphasized on resume/PDF skills line (core stack). */
export const RESUME_SKILL_ACCENT_IDS = new Set<TechStackId>(["next", "react", "typescript", "prisma", "postgresql", "angular", "laravel", "system-design"])

export const LOKATECH = {
  label: "LokaTech",
  url: "https://lokatech.co",
  shortPitch:
    "Independent practice for freelance and scoped product work — discovery, build, and ongoing support.",
} as const

/** One portfolio build: copy here is for the resume only; case study pages stay separate. */
export type ResumeCaseStudy = {
  title: string
  brief: string
  challenge: string
  solution: string
  impact: string
  linkPath: string
  /** Shown next to the title when relevant (e.g. NDA). */
  tag?: string
  /** Substring of `impact`; first match is emphasized on resume/PDF. */
  impactAccentPhrase?: string
}

/** Personal / shipped product work (`/projects/...`). */
export const RESUME_PROJECTS: ResumeCaseStudy[] = [
  {
    title: "LokaTech — internal operations platform",
    brief:
      "Agency ops monorepo: pricing engine, scope review portal, billing, PDFs — Next.js, Prisma, PostgreSQL, Auth.js.",
    challenge:
      "Quoting, scope sign-off, invoicing, and docs lived in spreadsheets, email, and PDFs with no audit trail or single source of truth.",
    solution:
      "Catalog-driven pricing; magic-link client review with baseline lock; project-first billing and branded PDFs; admin/marketing/portal route groups in one app.",
    impact:
      "Replaced manual quote math and email scope loops with typed workflows, change-order history, and a dashboard attention feed. Powers my practice at lokatech.co.",
    impactAccentPhrase: "Replaced manual quote math and email scope loops with typed workflows",
    linkPath: "/projects/lokatech",
  },
  {
    title: "What I Applied — applicant tracking & career prep",
    brief:
      "Personal ATS: profile + applications + interview pipeline, Gemini JD-specific assets (Zod-validated JSON), follow-up nudges — Next.js, Prisma, PostgreSQL, NextAuth.",
    challenge:
      "Job seekers lose context across tools, redo cover letters from scratch, and miss follow-ups; hiring ATS is not built for one candidate’s pipeline.",
    solution:
      "Single profile and per-job JD storage; stage timeline; one server-side Gemini generation stored on the job; job search direction; 7-day stale reminder with non-AI email template; PDF text-only bootstrap (file not stored).",
    impact:
      "Schema-bound AI outputs + retries reduce bad saves; per-user Postgres isolation; free-tier UI caps successful regen per job for predictable API cost. Beta: ~50 users; most said the tool was helpful and easy to use.",
    impactAccentPhrase: "Beta: ~50 users; most said the tool was helpful and easy to use.",
    linkPath: "/projects/what-i-applied",
  },
  {
    title: "Church / community management system",
    brief: "Events, attendance, outings, roles — Next.js, Prisma, PostgreSQL for ministry operations.",
    challenge:
      "Data in scattered Forms/Sheets; manual transport counts; duplicate sign-ups; slow year-end attendance audits.",
    solution:
      "Member portal for registrations; logistics dashboards; leader-scoped attendance; phone-based dedupe; CSV import with strict rules.",
    impact:
      "Prisma aggregations + constraints replaced spreadsheet workflows; JWT + middleware RBAC matched hierarchy without public signup spam. Used by 100+ users.",
    impactAccentPhrase: "Used by 100+ users.",
    linkPath: "/projects/church-system",
  },
  {
    title: "Project & task management system",
    brief: "Self-hosted Kanban team workspace: tasks, voting, comments, dashboards (Next.js, Prisma, PostgreSQL).",
    challenge: "Small team needed PM features and data sovereignty without enterprise SaaS cost or public cloud risk.",
    solution: "Self-hosted app: boards, voting, threads, mentions, personal dashboards — no vendor lock-in.",
    impact:
      "@dnd-kit sensors (touch delay) for scroll vs drag; optimistic UI + DB sync; lifted stats so headers stay live without heavy global state. Used by two startup teams (about 5–10 people each).",
    impactAccentPhrase: "Used by two startup teams (about 5–10 people each).",
    linkPath: "/projects/task-system",
  },
]

export const RESUME_PHILOSOPHY =
  "Tools that help communities work better; writing and photography inform how I frame problems and design."
