import { PerformanceEvaluationDiagrams } from "./PerformanceEvaluationDiagrams"
import { FiArrowLeft } from "react-icons/fi"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "360° performance evaluation module",
  description:
    "Full-stack HR 360°: generation engine and tokenized partner API on the backend; Angular schema-driven forms, shared UI, and responsive Likert layouts on the frontend.",
  alternates: {
    canonical: "/notes/performance-evaluation-360",
  },
}

export default function PerformanceEvaluation360Page() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-12 lg:space-y-20">
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Technical notes</span>
        </Link>
      </div>

      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/50 dark:text-sky-200">
            Team / feature ownership
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          End-to-End 360° Performance Evaluation Module
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
          Full-stack developer &amp; feature owner — annual KPI-linked 360°
          reviews across peers, managers, and external partners. I owned both
          the assignment engine / public API and the Angular experience for
          complex, schema-driven forms on desktop and mobile.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="flex h-full min-h-0 flex-col space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-2 inline-flex self-start rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700 dark:bg-red-900/40 dark:text-red-200">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Engine, security model, and evaluator UX
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            The enterprise needed a comprehensive{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              360° performance review
            </strong>{" "}
            tied to annual KPIs. The work split naturally in two directions: a
            backend that could resolve{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              dynamic hierarchies
            </strong>
            , mint secure access for{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              external partner feedback without logins
            </strong>
            , and persist audit-friendly payloads; and a frontend that could
            render{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              schema-driven evaluation forms
            </strong>{" "}
            (many question types, dense matrices) with a smooth experience on
            both desktop and mobile.
          </p>
        </div>

        <div className="flex h-full min-h-0 flex-col space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 md:p-8 dark:border-sky-800 dark:bg-sky-900/20">
          <div className="mb-2 inline-flex self-start rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
            Solution
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Backend engine, Angular forms, responsive matrices
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Owned the feature end-to-end—from persistence and APIs through the
            evaluator UI.
          </p>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Backend architecture:
              </span>{" "}
              Built a generation engine that{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                auto-matches department members
              </strong>{" "}
              and assigns form types from rank and relationship; stored answers
              in{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                JSONB
              </strong>
              ; exposed a{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                stateless, token-based public API
              </strong>{" "}
              so partners submit securely without accounts.
            </li>
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Frontend (Angular):
              </span>{" "}
              Modular app with{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                shared UI components
              </strong>
              . A dynamic{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                EvaluationFormComponent
              </strong>{" "}
              reads varying JSON schemas (flat vs. sectioned) and renders the
              right controls for each question type.
            </li>
            <li>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Responsive UX:
              </span>{" "}
              Used programmatic viewport checks (
              <code className="rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-gray-900/80">
                matchMedia
              </code>
              ) so large Likert matrices reflow into a mobile-friendly layout
              without breaking{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                reactive form groupings
              </strong>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
          Delivered a{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            fully automated, scalable HR evaluation path
          </strong>{" "}
          from cycle activation through completion. The schema-driven Angular
          surface decoupled the UI from hardcoded questionnaires, so the
          business could introduce{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            new evaluation types through configuration
          </strong>{" "}
          instead of shipping new form screens for every change—while keeping
          submissions reliable across desktop and mobile.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:mx-0 md:text-base">
            Data model, admin and staff flows (including schema-driven form
            steps), then a sequence view contrasting authenticated staff calls
            with token-based partner submissions.
          </p>
        </div>

        <PerformanceEvaluationDiagrams />
      </section>

      <footer className="border-t border-gray-200 pt-10 text-center dark:border-gray-700">
        <Link
          href="/"
          className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          ← Back to portfolio home
        </Link>
      </footer>
    </main>
  )
}
