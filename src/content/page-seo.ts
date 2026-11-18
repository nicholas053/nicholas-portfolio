import { NOTES_PAGE } from "@/content/content"

/** Titles and descriptions already shipped on the live site. */
export const PAGE_SEO = {
  "/notes": {
    title: NOTES_PAGE.eyebrow,
    description: NOTES_PAGE.metadataDescription,
  },
  "/notes/seller-onboarding-variants": {
    title: "Seller onboarding and product variants",
    description:
      "NDA note: shop applications, category attributes, and up to two variant axes with a price and stock row per variant.",
  },
  "/notes/cart-stock-reservation": {
    title: "Cart and stock reservation",
    description:
      "NDA note: a shared cart that checks availability on add, and holds stock only when the buyer opens the checkout summary.",
  },
  "/notes/cancel-vs-late-payment": {
    title: "Cancel vs a late or duplicate payment confirmation",
    description:
      "NDA note: one locked mark-paid path so cancel, a late confirmation, and a background check cannot leave a checkout in two states.",
  },
  "/notes/order-lifecycle-refunds": {
    title: "Order lifecycle and refunds",
    description:
      "NDA note: one checkout, one child order per seller, and idempotent refunds on a payment those orders share.",
  },
  "/notes/multi-level-revenue-splits": {
    title: "Multi-level revenue splits with a dry-run preview",
    description:
      "Illustrative note: percent-plus-fixed fees walked down a partner chain, with the same function used for a read-only preview and for settle.",
  },
  "/notes/third-party-api-adapters": {
    title: "One interface for many third-party APIs",
    description:
      "Illustrative note: one internal interface and a registry of adapters for providers that differ in auth, payloads, and status names.",
  },
  "/notes/background-job-failures": {
    title: "Making background job failures visible and safe to retry",
    description:
      "Illustrative note: claim a row before calling out, record the stage and last error, and retry without sending twice.",
  },
  "/notes/flexible-financial-settlement": {
    title: "Flexible Financial Settlement Engine",
    description:
      "Architecture notes: finance shopping cart model, consolidated payment vouchers, and enterprise CRM commission flow (NDA).",
  },
  "/notes/performance-evaluation-360": {
    title: "360° performance evaluation module",
    description:
      "Full-stack HR 360°: generation engine and tokenized partner API on the backend; Angular schema-driven forms, shared UI, and responsive Likert layouts on the frontend.",
  },
  "/notes/frontend-architecture-refactoring": {
    title: "Frontend architecture refactoring",
    description:
      "Component-driven refactor: unified forms, shared library, RBAC across admin and agent portals — less duplication and faster maintenance.",
  },
  "/notes/fullstack-assessment-debugging": {
    title: "Full-stack assessment — performance & live debugging",
    description:
      "Take-home reflection: Laravel Http pooling, Next.js + SWR infinite scroll, live-session bug, and a concise post-interview follow-up.",
  },
  "/projects/multi-seller-marketplace": {
    title: "Multi-Seller Marketplace Channel",
    description:
      "Confidential case study: a second sales channel on an existing marketplace — seller onboarding, stock holds, multi-seller checkout, and refunds (Laravel, MySQL).",
  },
  "/projects/lokatech": {
    title: "LokaTech — internal operations platform",
    description:
      "Case study: scoped pricing, collaborative scope review, billing, client portal magic links, PDF generation — Next.js, Prisma, PostgreSQL, Auth.js.",
  },
  "/projects/what-i-applied": {
    title: "What I Applied — applicant tracking & career prep",
    description:
      "Case study: personal ATS with JD or no-JD flows, match score, pipeline overlap hints, job search direction (Gemini), PostgreSQL, NextAuth, Prisma, Zod. Live on Vercel.",
  },
  "/projects/church-system": {
    title: "Church management system",
    description:
      "Case study: Next.js community management — event registration, attendance, outing approvals, roles, and Cloudinary walkthroughs.",
  },
  "/projects/task-system": {
    title: "Task management system",
    description:
      "Case study: collaborative Kanban, drag-and-drop, comments, voting, dashboards — Next.js, Prisma, PostgreSQL, self-hosted friendly.",
  },
} as const

export type SeoPath = keyof typeof PAGE_SEO
