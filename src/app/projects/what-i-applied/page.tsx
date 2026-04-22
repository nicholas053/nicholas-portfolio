import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { FiArrowLeft, FiExternalLink } from "react-icons/fi"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What I Applied — applicant tracking & career prep",
  description:
    "Case study: personal ATS with PostgreSQL, NextAuth, Prisma, Zod, and Gemini-assisted JD-specific prep. Live app on Vercel.",
  alternates: { canonical: "/projects/what-i-applied" },
}

export default function WhatIAppliedPage() {
  return (
    <main className="px-4 md:px-12 py-12 space-y-24 max-w-6xl mx-auto">
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
        <h1 className="text-4xl md:text-5xl font-bold">What I Applied</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A personal applicant-tracking and AI-assisted career prep web app: one profile, one record per application, and
          grounded, job-description-specific drafts without replacing your judgment.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://what-i-applied.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black inline-flex items-center gap-2 shadow"
          >
            Try the live app <FiExternalLink />
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Problem</span>
          </div>
          <h3 className="text-2xl font-bold">Pipeline chaos for one job seeker</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Job seekers juggle many employers, different job descriptions, and interview stages across spreadsheets,
            notes, and email. That leads to:
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Lost context</strong> — weeks later it is hard to
              recall what you applied for or where the posting&apos;s JD lives.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Weak reuse</strong> — each application restarts cover
              letter and prep instead of reusing a structured profile.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Forgotten follow-ups</strong> — opportunities go cold
              without a simple signal to nudge a recruiter.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
            Corporate ATS products are built for hiring teams, not for a single candidate managing their own pipeline. I
            wanted a small, honest workspace: one profile, one place per application, and AI only where it speeds up
            grounded, JD-specific prep.
          </p>
        </div>

        <div className="space-y-4 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Solution</span>
          </div>
          <h3 className="text-2xl font-bold">System of record + selective AI</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">Signed-in users can:</p>
          <ol className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-decimal list-inside">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Maintain a master profile</strong> — structured
              experience, education, skills, and an &quot;About me&quot; narrative; optional PDF-assisted extraction (text
              only — the file is not stored).
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Log each application</strong> — company (deduplicated
              by name), role, posting URL, full job description, and high-level status.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Track a per-job pipeline</strong> — stages (type,
              format, schedule, notes, links, status) as a lightweight timeline.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Generate tailored assets per job</strong> — one Gemini
              call produces a cover letter, elevator pitch, anticipated interview questions (with reasoning), and
              strategic focus points, validated against a strict schema and stored on the job.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Get operational nudges</strong> — jobs with no activity
              for seven days surface a non-AI follow-up email template (copy to clipboard); terminal outcomes (offer,
              rejected, withdrawn) turn reminders off while still allowing copy-friendly outreach for active statuses.
            </li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
            Authentication is email and password (bcrypt, NextAuth JWT). Data is scoped per user in PostgreSQL.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Impact (qualitative)</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          This is a personal portfolio build rather than a shipped product with analytics. The value is in day-to-day
          clarity and discipline.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Clarity &amp; velocity</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              One system of record for what you applied for and what each role asked. Parsing plus structured save reduces
              retyping; one-shot AI generation cuts time to a first draft of role-specific materials.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Discipline &amp; cost awareness</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Stale-job reminders and a static follow-up template encourage consistent outreach without building a mailer.
              The free-tier product choice limits successful AI regeneration to once per job in the UI so Gemini usage
              stays predictable; retry remains available when generation fails.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold">Product surface</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
              <li>Landing page for visitors; signed-in users land on the dashboard.</li>
              <li>Register and login with protected routes (Next.js proxy).</li>
              <li>Dashboard snapshot counts and shortcuts.</li>
              <li>Applications CRUD with company match-or-create by name.</li>
              <li>
                Job detail: inline edit of title, URL, description, status; pipeline stage CRUD; stage updates bump job{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">updatedAt</code> for reminder logic.
              </li>
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold">Profile, AI, and ops</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
              <li>Resume editor: load and save profile; PDF upload to parse API, human-in-the-loop edit, transactional save.</li>
              <li>Personal information: read-only review of stored profile.</li>
              <li>
                AI career coach: generate policy (first successful generation per job on free tier), static cover-letter
                fallback when AI fails.
              </li>
              <li>Follow-up helper: template email text plus clipboard; terminal statuses suppress the 7-day reminder.</li>
              <li>Responsive UI: mobile-friendly navigation and layouts.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-8">
        <h2 className="text-3xl font-semibold text-center mb-10">Engineering spotlight</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">01.</span> Grounded AI with guardrails
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Google Gemini is called server-side with a JSON MIME type and retries for transient errors. Outputs are
              validated with <strong>Zod</strong> against a strict schema before persistence so bad generations never
              corrupt the job record; the UI can fall back to a static template when the model path fails.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">02.</span> Privacy-minded resume intake
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>pdf-parse</strong> extracts text only for optional profile bootstrapping; the binary is not stored.
              Profile updates use a transactional replace of resume-related rows plus <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">aboutMe</code>{" "}
              so partial writes do not leave the profile half-migrated.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Tech stack</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Full-stack TypeScript on Next.js App Router, with PostgreSQL as the source of truth and validation at API and
          AI boundaries.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-6xl mt-8 text-gray-800 dark:text-gray-200">
          <SiNextdotjs title="Next.js" />
          <SiReact title="React" className="text-sky-500" />
          <SiTailwindcss title="Tailwind CSS" className="text-sky-400" />
          <SiPrisma title="Prisma" />
          <SiPostgresql title="PostgreSQL" className="text-blue-600" />
          <DiNodejs title="Node.js" className="text-green-600" />
        </div>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-2 text-center text-sm">
          <p>
            <strong>Framework:</strong> Next.js (App Router), React · <strong>Language:</strong> TypeScript
          </p>
          <p>
            <strong>Database:</strong> PostgreSQL (e.g. Neon) · <strong>ORM:</strong> Prisma 7 with Neon serverless adapter
          </p>
          <p>
            <strong>Auth:</strong> NextAuth.js (credentials, JWT sessions, bcryptjs)
          </p>
          <p>
            <strong>Validation:</strong> Zod (API bodies, AI JSON, resume shapes)
          </p>
          <p>
            <strong>AI:</strong> Google Gemini (<code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">@google/genai</code>)
          </p>
          <p>
            <strong>PDF:</strong> pdf-parse (text extraction) · <strong>Styling:</strong> Tailwind CSS 4
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Server-enforced generation limits</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Block duplicate successful <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/generate</code> per job
              (today the UI hides regenerate; the API could return 409 when an asset already exists).
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Paid tier</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Regenerate assets, optional email send, or higher quotas.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Richer pipeline</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Attachments, interviewer names, reminders (email or push) integrated with calendar.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">OAuth and export</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Google or LinkedIn sign-in alongside credentials; PDF or Markdown export of applications and AI assets.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Analytics, accessibility, i18n</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Personal funnel stats (applied to interview to offer); deeper a11y audit and localized templates.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
