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
} as const

export const HERO = {
  title: `Hi, I'm ${PERSON.preferredName} — ${PERSON.role}`,
  lead:
    "Focusing on building scalable end-to-end systems and bridging the gap between ambiguous business requirements and technical execution.",
} as const

/** Opening paragraph on the resume (keep short for print density). */
export const RESUME_SUMMARY =
  "Full-stack developer and product engineer: clarify scope, design pragmatic architecture, ship maintainable web apps end-to-end."

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
}

export type ExperienceTimelineEntry = {
  period: string
  /** Shown on the portfolio About timeline */
  body: string
  /** Shorter line for the resume; falls back to `body` if omitted */
  resumeBody?: string
  employer?: { name: string; url: string }
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
    period: "Oct 2020 – Mar 2024",
    body: "Pursued Software Engineering at University Malaysia Sabah. Self-funded studies while taking on freelance maintenance projects to support tuition.",
    resumeBody: "UMS Software Engineering (self-funded); freelance maintenance alongside studies.",
  },
  {
    roleTitle: "Independent Full-Stack Developer",
    period: "Apr 2022 – Sept 2025",
    summaryLead:
      "Freelance during university → independent consultancy: shipped end-to-end web apps with strong workflows and client support.",
    highlights: [
      {
        label: "Web Development & Maintenance (Apr 2022 – Mar 2024):",
        body: "Landing pages, product catalogs, ongoing maintenance and feature work while completing the degree.",
      },
      {
        label: "End-to-End System Architecture (Mar 2024 – Sept 2025):",
        body:
          "HR and badminton booking systems; church, task, and e-commerce platforms; personal applicant-tracking / AI-assisted career prep (What I Applied). Workflows, RBAC, audit trails, voting, DnD task UX, clean API/UI (Next.js, Prisma, PostgreSQL, .NET).",
      },
      {
        label: "Tech Stack:",
        body: "Next.js, React, .NET Core, Prisma, PostgreSQL.",
      },
    ],
    body: "Independent Full-Stack Developer (Apr 2022 – Sept 2025). Part-time freelance work grew into full-time independent delivery: HR and badminton booking systems, then church, task, and e-commerce platforms with strong workflows, RBAC, and auditability, plus a personal applicant-tracking / AI-assisted career prep app. Earlier phase focused on landing pages, catalogs, and client maintenance.",
    resumeBody:
      "Independent full-stack (Apr 2022–Sept 2025): scaled from freelance maintenance to end-to-end systems (HR, booking, church, task, e-commerce, personal ATS/career prep); Next.js, .NET Core, Prisma, PostgreSQL.",
  },
  {
    period: "Oct 2025 – Present",
    jobTitle: "Web Developer / Product Engineer",
    summaryLead:
      "Lead delivery, refactors, and technical BA on enterprise apps; aligned schemas and UI with real finance/ops workflows.",
    highlights: [
      {
        label: "Architected Flexible Financial Settlement Engine:",
        body:
          "Lead dev & technical BA: commission payout redesign — batching, partial line items, locks/state aligned with accounting; cut post-launch finance rework.",
      },
      {
        label: "Engineered 360° Performance Evaluation Module:",
        body:
          "Owned KPI-linked 360° reviews: auto-assignment, tokenized external access, Angular schema-driven forms + JSONB — new question types via config.",
      },
      {
        label: "Led Frontend Architecture Refactoring:",
        body:
          "Unified duplicated portals: dynamic forms by route, RBAC-gated shared component library — fixes ship once across admin/agent views.",
      },
    ],
    body: "At Data Flows Sdn Bhd: led settlement-engine discovery and delivery, owned a KPI-linked 360° review module, and drove frontend architecture unification across enterprise apps.",
    resumeBody:
      "Data Flows: lead dev/technical BA on commission settlement redesign; owned 360° performance module (Angular, JSONB); led shared FE architecture and RBAC-gated component library.",
    employer: { name: "Data Flows Sdn Bhd", url: "https://www.dataflows.co/" },
  },
]

export const TECH_STACK_ITEMS = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "prisma", label: "Prisma" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "nodejs", label: "Node.js" },
  { id: "dotnet", label: ".NET (C#)" },
  { id: "vercel", label: "Vercel" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
  { id: "github", label: "GitHub" },
  { id: "angular", label: "Angular" },
  { id: "laravel", label: "Laravel" },
  { id: "php", label: "PHP" },
  { id: "typescript", label: "TypeScript" },
] as const

/** Comma-separated for resume / ATS-friendly plain text (same order as `TECH_STACK_ITEMS`). */
export const TECH_STACK_LINE = TECH_STACK_ITEMS.map((s) => s.label).join(", ")

export type TechStackId = (typeof TECH_STACK_ITEMS)[number]["id"]

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
}

/** Personal / shipped product work (`/projects/...`). */
export const RESUME_PROJECTS: ResumeCaseStudy[] = [
  {
    title: "What I Applied — applicant tracking & career prep",
    brief:
      "Personal ATS: profile + applications + interview pipeline, Gemini JD-specific assets (Zod-validated JSON), follow-up nudges — Next.js, Prisma, PostgreSQL, NextAuth.",
    challenge:
      "Job seekers lose context across tools, redo cover letters from scratch, and miss follow-ups; hiring ATS is not built for one candidate’s pipeline.",
    solution:
      "Single profile and per-job JD storage; stage timeline; one server-side Gemini generation stored on the job; 7-day stale reminder with non-AI email template; PDF text-only bootstrap (file not stored).",
    impact:
      "Schema-bound AI outputs + retries reduce bad saves; per-user Postgres isolation; free-tier UI caps successful regen per job for predictable API cost.",
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
      "Prisma aggregations + constraints replaced spreadsheet workflows; JWT + middleware RBAC matched hierarchy without public signup spam.",
    linkPath: "/projects/church-system",
  },
  {
    title: "Project & task management system",
    brief: "Self-hosted Kanban team workspace: tasks, voting, comments, dashboards (Next.js, Prisma, PostgreSQL).",
    challenge: "Small team needed PM features and data sovereignty without enterprise SaaS cost or public cloud risk.",
    solution: "Self-hosted app: boards, voting, threads, mentions, personal dashboards — no vendor lock-in.",
    impact:
      "@dnd-kit sensors (touch delay) for scroll vs drag; optimistic UI + DB sync; lifted stats so headers stay live without heavy global state.",
    linkPath: "/projects/task-system",
  },
  {
    title: "E-commerce platform",
    brief: "Full-stack shop: catalog, cart/checkout, orders, admin inventory & reports (.NET Core + React/Next).",
    challenge: "Split stack needed safe JWT handling, persistent cart, and usable admin for inventory and exports.",
    solution:
      "API routes set HttpOnly JWT cookies; Zustand + localStorage cart; admin CRUD, stock adjustments, sales/order exports.",
    impact: "Traceable orders/stock, finance-friendly exports, credentials kept out of client JS.",
    linkPath: "/projects/ecommerce-system",
  },
]

/** Technical notes & professional delivery (`/notes/...`) — resume snapshot only. */
export const RESUME_ENGINEERING: ResumeCaseStudy[] = [
  {
    title: "Flexible financial settlement engine (enterprise CRM)",
    tag: "Confidential / NDA",
    brief: "Lead dev & technical BA: discovery + schema so commission payouts match finance’s real batching model.",
    challenge:
      "Model assumed one deal → one payout; reality needed partial line items across partners/times, merged to one payment voucher per agent.",
    solution:
      "Finance “shopping cart”: pick commission rows, lock draft batch, generate one PV per agent; aligned schema, locks, and lifecycle states with UI/UX.",
    impact: "Lowered risk of post-launch finance rework by matching accounting before go-live.",
    linkPath: "/notes/flexible-financial-settlement",
  },
  {
    title: "End-to-end 360° performance evaluation module",
    brief: "Owned KPI-linked 360° reviews: assignment engine + JSONB storage + Angular schema-driven forms (desktop/mobile).",
    challenge:
      "Dynamic hierarchies, tokenized partner access without accounts, audit-friendly payloads, and dense Likert matrices on small screens.",
    solution:
      "Auto-assignment from rank/relationship; JSONB answers; public token API; shared Angular library + schema-driven form component; matchMedia reflow for matrices.",
    impact: "Automated cycle end-to-end; new question types via config instead of new screens per change.",
    linkPath: "/notes/performance-evaluation-360",
  },
  {
    title: "Frontend architecture refactoring & component standardization",
    brief: "Lead FE: dedupe admin vs agent UIs — one source of truth for forms, lists, shared widgets.",
    challenge: "Forked add/edit pages, duplicated portal trees, copied utilities — high touch count for small changes.",
    solution: "Unified dynamic forms by route; RBAC-gated shared views; centralized shared component library.",
    impact: "Fixes land once and propagate across portals instead of hunting siloed copies.",
    linkPath: "/notes/frontend-architecture-refactoring",
  },
  // {
  //   title: "Full-stack assessment: performance optimization & live debugging",
  //   tag: "Company-anonymous reflection",
  //   brief: "Laravel + Next take-home with third-party list API; live session surfaced a concurrency merge bug; post-session write-up.",
  //   challenge:
  //     "N+1-style latency from row detail fetches; infinite-scroll layout shift; out-of-order pooled responses + SWR revalidation caused inconsistent rows.",
  //   solution:
  //     "Laravel HTTP pooling; SWR + sentinel pagination + skeletons; post-session index-keyed merge + stricter SWR keys.",
  //   impact: "Reproduced locally, documented root cause and guardrails for the panel; kept AI use transparent vs devtools truth.",
  //   linkPath: "/notes/fullstack-assessment-debugging",
  // },
]

export const RESUME_PHILOSOPHY =
  "Tools that help communities work better; writing and photography inform how I frame problems and design."
