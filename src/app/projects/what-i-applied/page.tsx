import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { FiArrowLeft, FiExternalLink } from "react-icons/fi"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What I Applied — applicant tracking & career prep",
  description:
    "Case study: personal ATS with JD or no-JD flows, match score, pipeline overlap hints, job search direction (Gemini), PostgreSQL, NextAuth, Prisma, Zod. Live on Vercel.",
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
          AI where it speeds up grounded prep—whether that is JD-specific materials or speculative outreach when no
          posting exists—without replacing your judgment.
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
            notes apps, and email. That leads to:
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Lost context</strong> — &quot;What did I say I applied
              for?&quot; and &quot;Where is that posting&apos;s JD?&quot; are hard to answer weeks later.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Weak reuse</strong> — each new application restarts
              cover-letter and prep work from scratch instead of reusing a structured profile.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Forgotten follow-ups</strong> — opportunities go cold
              because there is no simple signal when to nudge a recruiter.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
            Corporate ATS tools are built for hiring teams, not for one candidate managing their own pipeline. I wanted a
            small, honest workspace: one profile, one place per application, and AI where it speeds up{" "}
            <strong className="text-gray-800 dark:text-gray-200">grounded</strong> prep—whether that is{" "}
            <strong className="text-gray-800 dark:text-gray-200">JD-specific</strong> materials or{" "}
            <strong className="text-gray-800 dark:text-gray-200">speculative outreach</strong> when no posting
            exists—without replacing judgment.
          </p>
        </div>

        <div className="space-y-4 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Solution</span>
          </div>
          <h3 className="text-2xl font-bold">System of record + selective AI</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">Signed-in users can:</p>
          <ol className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-decimal list-inside text-sm md:text-base">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Maintain a master profile</strong> — structured
              experience, education, skills, and an &quot;About me&quot; narrative; optional PDF-assisted extraction (text
              only — the file is not stored).
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Log each application</strong> — company (deduplicated
              by name), role, posting URL, optional full job description, or &quot;No JD available&quot; for speculative
              outreach (for example email without a posting). Status includes <strong>Exploring</strong> as the default for
              new roles, plus pipeline states such as Applied, Screening, <strong>Being ghosted</strong>, Offer, Rejected,
              Withdrawn.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Track a per-job pipeline</strong> — stages (type,
              format, schedule, notes, links, status) as a lightweight timeline.{" "}
              <strong className="text-gray-800 dark:text-gray-200">Schedule overlap hints</strong> (same user, about
              one-hour blocks on <code className="text-xs bg-white/60 dark:bg-gray-900/60 px-1 rounded">SCHEDULED</code>{" "}
              stages) show as informational warnings on list and detail views — they never block saves.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Generate tailored assets per job</strong> — one Gemini
              call returns a cover letter, elevator pitch, anticipated interview questions (with reasoning), strategic
              focus points, and a <strong className="text-gray-800 dark:text-gray-200">role match score (0–10)</strong> with{" "}
              <strong className="text-gray-800 dark:text-gray-200">honest justification</strong>, validated with Zod.
              With a saved JD, copy aligns to the posting; <strong>without a JD</strong>, the same JSON shape supports
              email-style inquiry and conservative fit versus title, company context, and resume only — no invented
              requirements. Assets live in <code className="text-xs bg-white/60 dark:bg-gray-900/60 px-1 rounded">AiAsset</code>; match score and rationale are copied to{" "}
              <code className="text-xs bg-white/60 dark:bg-gray-900/60 px-1 rounded">Job</code> for fast list and detail
              display. The coach prompt stresses <strong className="text-gray-800 dark:text-gray-200">humble, evidenced</strong> output — no fabricated credentials.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Job search direction (dashboard)</strong> — a gated
              questionnaire (profile or long About me required) captures industries, target roles, location and work
              preferences, priorities, optional avoid-list and context, and yes or no signals (remote, company size,
              geography, mission, relocation, visa, comp discussion). One Gemini call returns a narrative summary and at
              least ten company suggestions, stored in{" "}
              <code className="text-xs bg-white/60 dark:bg-gray-900/60 px-1 rounded">CareerDirectionInsight</code>.{" "}
              <strong className="text-gray-800 dark:text-gray-200">Rate limits</strong> (cooldown plus rolling 24-hour cap
              via request logs) protect the API; users can <strong className="text-gray-800 dark:text-gray-200">regenerate</strong> within those limits.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Get gentle operational nudges</strong> — jobs with no
              activity for seven days surface a non-AI follow-up email template (copy to clipboard),{" "}
              <strong className="text-gray-800 dark:text-gray-200">except</strong> while status is Exploring (no
              follow-up draft). Terminal outcomes (offer, rejected, withdrawn) turn the stale reminder off.{" "}
              <strong className="text-gray-800 dark:text-gray-200">Rejected</strong> applications get an optional
              thank-you or feedback-request email template.
            </li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 text-sm md:text-base">
            Authentication is email and password (bcrypt, NextAuth JWT). Data is scoped per user in PostgreSQL.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Impact (qualitative)</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          This is a personal portfolio build rather than a shipped product with analytics. The value is in day-to-day
          clarity, velocity, and disciplined communication — with explicit limits on spend.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Clarity</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              One system of record for what you applied for — including cases <strong>without</strong> a saved posting —
              and what each role asked when a JD exists.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Velocity</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Parsing plus structured save reduces retyping; one-shot AI cuts time to a first draft of role-specific or
              speculative outreach (plus an explicit fit score when enabled). The dashboard job-search-direction flow
              offers a structured starting point for <strong>where</strong> to look next.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Discipline</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Stale-job reminders and static email templates (follow-up plus post-rejection thank-you) encourage
              consistent communication without building a mailer.
            </p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Cost awareness</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <strong>Per-job coach:</strong> one successful full generation after match metadata exists (API returns{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">409</code> if repeated); one extra run is
              allowed when legacy rows have assets but no match score or justification yet. Retries stay available when
              generation fails. <strong>Job search direction:</strong> rate limits (spacing plus a daily-style cap) bound
              repeat Gemini calls while still allowing intentional regeneration.
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
              <li>Landing page for anonymous visitors; signed-in users go to the dashboard.</li>
              <li>
                Register and login with protected routes (Next.js <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">proxy</code>); login includes a password visibility toggle.
              </li>
              <li>
                Dashboard: snapshot counts, shortcuts, and <strong>Job search direction</strong> (questionnaire plus
                stored Gemini report when the profile is ready; rate-limited regeneration).
              </li>
              <li>
                Applications CRUD: list (whole row opens detail, <strong>match score</strong> in the meta line, pipeline
                schedule warnings), create, detail; company match-or-create by name; default status Exploring; optional JD
                via <strong>No JD available</strong>.
              </li>
              <li>
                Job detail: inline edit of title, URL, description (or none), <strong>No JD</strong> toggle, status;
                pipeline stage CRUD; stage updates bump <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">updatedAt</code> for reminder logic;{" "}
                <strong>match rationale</strong> when present; AI section respects one-generation plus legacy backfill
                rules; coach adapts when there is no posting text.
              </li>
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold">Profile, AI, and ops</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
              <li>
                Resume editor: load and save profile; PDF upload to parse API, human-in-the-loop edit, transactional save
                (replaces resume rows, updates <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">aboutMe</code>).
              </li>
              <li>Personal information: read-only review of stored profile.</li>
              <li>
                AI career coach: Gemini JSON validated with Zod; persists <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">AiAsset</code> plus{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">Job.matchScore</code> /{" "}
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">Job.matchJustification</code>; static
                cover-letter fallback when AI fails; clearer API errors for bad <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">GEMINI_MODEL</code> versus DB drift in development.
              </li>
              <li>
                Follow-up and rejection helpers: follow-up template and clipboard when eligible; Exploring skips
                follow-up; Rejected shows a post-rejection thank-you template; terminal statuses suppress stale reminders.
              </li>
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
              Google Gemini is called server-side with a JSON MIME type and <strong>single-attempt</strong> calls mapped to
              structured errors (versus open-ended retries). <strong>Zod</strong> validates payloads before persistence;
              the prompt favors humble, evidenced copy so the model does not invent credentials. Per-job assets live in{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">AiAsset</code>, with match score and
              rationale denormalized to <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">Job</code> for
              list performance. The API enforces one successful full generation once match fields exist (
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">409</code>), with a narrow backfill path
              for older rows missing match metadata.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">02.</span> Privacy-minded resume intake
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>pdf-parse</strong> extracts text only for optional profile bootstrapping; the binary is not stored.
              Profile updates use a transactional replace of resume-related rows plus{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">aboutMe</code> so partial writes do not
              leave the profile half-migrated.
            </p>
          </div>
          <div className="space-y-3 md:col-span-2 max-w-3xl mx-auto w-full">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">03.</span> Scheduling hints and bounded “direction” AI
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Overlap detection compares scheduled stage blocks for the same user and surfaces ~one-hour conflicts as{" "}
              <strong>informational</strong> UI warnings — never blocking saves. The career-direction feature gates on
              profile richness, then uses request logging for <strong>cooldown and rolling 24-hour caps</strong> so
              intentional regeneration stays possible without unbounded Gemini spend across the user base.
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
            <strong>Auth:</strong> NextAuth.js (credentials provider, JWT sessions, bcryptjs)
          </p>
          <p>
            <strong>Validation:</strong> Zod (API bodies, AI JSON, resume shapes)
          </p>
          <p>
            <strong>AI:</strong> Google Gemini (<code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">@google/genai</code>
            ), JSON MIME type, single-attempt calls with structured error mapping.
          </p>
          <p>
            <strong>PDF:</strong> pdf-parse (text extraction only) · <strong>Styling:</strong> Tailwind CSS 4, responsive shell
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Paid tier</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Relaxed per-job regenerate rules, higher job-search-direction quotas, optional email send (today: coach{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">409</code> when assets and match fields
              already exist, with one legacy backfill; career direction uses shared rate limits for all users).
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Calendar integration</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Push <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">JobStage</code> times to Google or
              Outlook instead of overlap warnings only.
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
              Google or LinkedIn sign-in alongside credentials; PDF or Markdown export of applications and AI assets for
              offline backup.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Analytics, accessibility, i18n</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Funnel stats (applied to interview to offer) for personal retrospectives; deeper accessibility audit and
              localized templates.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
