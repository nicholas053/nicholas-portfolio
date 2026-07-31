import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiVercel } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { FiExternalLink, FiArrowLeft } from "react-icons/fi"
import Link from "next/link"
import type { Metadata } from "next"
import FeatureRow from "@/components/FeatureRow"
import { PageJsonLd } from "@/components/PageJsonLd"
import {
  breadcrumbList,
  creativeWorkJsonLd,
  pageSocialMeta,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/projects/lokatech"
const TITLE = "LokaTech — internal operations platform"
const DESCRIPTION =
  "Case study: scoped pricing, collaborative scope review, billing, client portal magic links, PDF generation — Next.js, Prisma, PostgreSQL, Auth.js."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function LokaTechPage() {
  const siteUrl = getSiteUrl()

  return (
    <main className="px-4 md:px-12 py-12 space-y-24 max-w-6xl mx-auto">
      <PageJsonLd
        data={[
          creativeWorkJsonLd({
            siteUrl,
            name: TITLE,
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "LokaTech", path: PATH },
          ]),
        ]}
      />
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">LokaTech — Internal Operations Platform</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A full-stack operations platform for professional digital services teams — unifying scoped pricing,
          collaborative client sign-off, billing, and technical documentation in a single Next.js monorepo.
        </p>
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href="https://lokatech.co"
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black inline-flex items-center gap-2 shadow"
          >
            Visit lokatech.co <FiExternalLink />
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            The internal admin and ops platform is private. This case study documents the system I built; the public
            site is the marketing front.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Problem</span>
          </div>
          <h3 className="text-2xl font-bold">Fragmented agency operations</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Inconsistent quoting:</strong> Every project type
              had different pricing rules; manual calculation led to under-pricing and rework.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">No audit trail:</strong> Scope changed mid-negotiation
              with no single source of truth for what changed or what the client agreed to.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Slow sign-off:</strong> Proposals bounced over email
              and PDF with no structured feedback or formal baseline acceptance.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Disconnected billing & docs:</strong> Invoices were
              typed from scratch; requirements and architecture lived in separate tools.
            </li>
          </ul>
        </div>

        <div className="space-y-4 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Solution</span>
          </div>
          <h3 className="text-2xl font-bold">One system for pre-sale → billing</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Catalog + pricing engine:</strong> Master scope
              catalog and rules-based calculators with transparent step-by-step breakdowns.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Collaborative scope review:</strong> Admins publish
              rounds; clients interact via magic links — ticks, comments, and baseline lock on accept.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Project-first billing:</strong> Multi-line invoices,
              payment status, overdue detection, and branded PDF export per project.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Command dashboard:</strong> Attention feed for open
              reviews, client feedback, and overdue invoices — admin, marketing, and portal in one repo.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Impact</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Quoting</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Manual per-type math and hand-copied catalog prices → transparent calculators and catalog-driven custom
              scope with floors and modifiers.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Scope & change control</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Email and PDF loops with unclear diffs → review rounds with NEW/MODIFIED flags, client ticks, comments,
              and change-order audit history after baseline lock.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Billing</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Ad-hoc line items and weak overdue visibility → project-first billing hub with status badges, filters, and
              branded invoice PDFs.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Client access & ops visibility</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Screenshots or full account creation → typed magic links for scope review vs read-only docs; dashboard
              feed links directly to what needs action.
            </p>
          </div>
        </div>
      </section>

      <FeatureRow
        title="Dashboard & attention feed"
        description="Billing metrics — unpaid total, overdue count, MTD revenue, active projects — plus a needs-attention feed for unread client comments, open review rounds, and overdue invoices. Quick links jump straight to the project or invoice that needs action."
      />

      <FeatureRow
        title="Pricing & project workspace"
        description="Each engagement gets a typed project (portfolio, landing page, corporate site, or custom system) with a rules-based pricing engine, live breakdown, scope builder, requirements notebook, and live UML editor — all in one workspace."
        reverse
      />

      <FeatureRow
        title="Collaborative scope review"
        description="Admins publish review rounds and generate secure magic links. Clients tick lines, leave structured comments, and formally accept a locked baseline — replacing email back-and-forth with an auditable negotiation workflow."
      />

      <FeatureRow
        title="Billing & documents"
        description="Project-first billing hub with invoice CRUD, mark paid/unpaid, filters, and overdue detection. Branded PDF export for scope proposals, invoices, and baseline scope snapshots after client acceptance."
        reverse
      />

      <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Engineering Spotlight</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">01.</span> Server action architecture
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every mutation follows the same contract: Zod validation before Prisma,{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">requireSession()</code> on admin
              actions, standardized{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">{`{ success, data } | { success, error }`}</code>{" "}
              returns, and <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">revalidatePath()</code>{" "}
              for immediate UI consistency — scaling across 8+ action modules without ad-hoc error handling.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">02.</span> Client portal security + PDF strategy
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              32-byte random tokens with SHA-256 hash at rest, separate link types and expiry per route, scoped to a
              single project. PDF generation runs client-side via{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">@react-pdf/renderer</code> to stay
              within Vercel serverless limits; Prisma Decimals serialize to plain numbers before crossing the RSC
              boundary.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Audience snapshot</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Admin</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Session-gated staff hubs — clients, scopes, projects, billing, and the command dashboard.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Marketing</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Public lokatech.co site in the same monorepo, with its own theme — unchanged URLs, no admin pollution.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Client portal</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Token-based magic links, no account — separate URLs for interactive scope review vs read-only project docs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Tech Stack</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Full-stack TypeScript on Next.js App Router — PostgreSQL as the source of truth, validation at every mutation
          boundary.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-6xl mt-8 text-gray-800 dark:text-gray-200">
          <SiNextdotjs title="Next.js" />
          <SiReact title="React" className="text-sky-500" />
          <SiTailwindcss title="Tailwind CSS" className="text-sky-400" />
          <SiPrisma title="Prisma" />
          <SiPostgresql title="PostgreSQL" className="text-blue-600" />
          <DiNodejs title="Node.js" className="text-green-600" />
          <SiVercel title="Vercel" />
        </div>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-2 text-center text-sm">
          <p>
            <strong>Framework:</strong> Next.js (App Router), React, TypeScript · <strong>UI:</strong> Tailwind CSS v4,
            Shadcn UI
          </p>
          <p>
            <strong>Database:</strong> PostgreSQL (Neon) · <strong>ORM:</strong> Prisma · <strong>Auth:</strong> Auth.js
            v5 (credentials, JWT sessions)
          </p>
          <p>
            <strong>Validation:</strong> Zod · <strong>Diagrams:</strong> Mermaid · <strong>PDF:</strong>{" "}
            @react-pdf/renderer (client-side)
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future Roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Project status pipeline</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Lead → scoping → proposal sent → won → in progress → completed → archived, with gates for billing and
              scope edits.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Email notifications</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Resend integration for scope review published, invoice sent, payment received, and scheduled overdue
              reminders.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
