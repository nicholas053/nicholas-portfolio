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
    note: "Incomplete",
  },
]

export type ExperienceTimelineEntry = {
  period: string
  /** Shown on the portfolio About timeline */
  body: string
  /** Shorter line for the resume; falls back to `body` if omitted */
  resumeBody?: string
  employer?: { name: string; url: string }
}

export const EXPERIENCE_TIMELINE: ExperienceTimelineEntry[] = [
  {
    period: "2020 Oct – 2024 Mar",
    body: "Pursued Software Engineering at University Malaysia Sabah. Self-funded studies while taking on freelance maintenance projects to support tuition.",
    resumeBody:
      "Software Engineering at UMS (self-funded), alongside freelance maintenance work to support tuition.",
  },
  {
    period: "2024 Mar – 2025 May",
    body: "Took a break from formal studies to manage family responsibilities. Continued freelancing — mostly system maintenance with some lightweight development, such as a Badminton Court Booking System and an HR Management System.",
    resumeBody:
      "Paused formal study for family responsibilities; continued freelancing (maintenance plus light product work, e.g. badminton court booking and HR tools).",
  },
  {
    period: "2025 Apr – 2025 Sept",
    body: "Designed and built three full-scale systems: a Church Management System, a Project & Task Management System (React, Next.js, Tailwind CSS, Prisma, PostgreSQL), and an Ecommerce Platform (C# .NET Core backend with React/Next.js/Tailwind frontend). Focused on creating scalable, workflow-driven solutions with advanced features like drag-and-drop task flows, voting, audit trails, and smooth backend–frontend integration.",
    resumeBody:
      "Delivered three end-to-end systems: church operations, a collaborative task platform (Next.js, Prisma, PostgreSQL), and e-commerce (.NET Core + React/Next). Emphasis on workflows, permissions, voting, audit trails, and clean API/UI integration.",
  },
  {
    period: "2025 Oct – Present",
    body: "Contributing to various web applications and gaining hands-on experience in a professional development environment.",
    resumeBody:
      "Web developer on multiple client web applications in a professional delivery environment.",
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
  {
    title: "Full-stack assessment: performance optimization & live debugging",
    tag: "Company-anonymous reflection",
    brief: "Laravel + Next take-home with third-party list API; live session surfaced a concurrency merge bug; post-session write-up.",
    challenge:
      "N+1-style latency from row detail fetches; infinite-scroll layout shift; out-of-order pooled responses + SWR revalidation caused inconsistent rows.",
    solution:
      "Laravel HTTP pooling; SWR + sentinel pagination + skeletons; post-session index-keyed merge + stricter SWR keys.",
    impact: "Reproduced locally, documented root cause and guardrails for the panel; kept AI use transparent vs devtools truth.",
    linkPath: "/notes/fullstack-assessment-debugging",
  },
]

export const RESUME_PHILOSOPHY =
  "Tools that help communities work better; writing and photography inform how I frame problems and design."
