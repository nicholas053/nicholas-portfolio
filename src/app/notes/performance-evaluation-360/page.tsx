import { PerformanceEvaluationDiagrams } from "./PerformanceEvaluationDiagrams"
import { FiArrowLeft } from "react-icons/fi"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "360° performance evaluation module",
  description:
    "End-to-end HR evaluation: auto-generated assignments, JSONB schema-driven forms, and token-based external partner submissions.",
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
          Full-stack developer &amp; feature owner — annual KPI-linked reviews
          across peers, managers, and external partners, with generated
          assignments and login-free partner access.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-2 inline-flex rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700 dark:bg-red-900/40 dark:text-red-200">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            360° scope, hierarchy, and external access
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            The business needed a full{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              360-degree
            </strong>{" "}
            review tied to annual KPIs: multiple evaluator types,{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              dynamic org hierarchy
            </strong>
            , and forms that could not be hand-maintained per release. External
            partners had to submit feedback{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              without accounts
            </strong>
            , while keeping data integrity and auditability.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 md:p-8 dark:border-sky-800 dark:bg-sky-900/20">
          <div className="mb-2 inline-flex rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
            Solution
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Generation engine, JSONB, and tokenized public API
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Owned the feature end-to-end: a backend engine that{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              auto-matches department members
            </strong>{" "}
            and assigns the right form schema from{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              employee rank and relationship
            </strong>
            ;{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              JSONB payloads
            </strong>{" "}
            plus a{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              schema-driven UI
            </strong>{" "}
            so new question sets do not require new React screens; and a{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              token-based, stateless public API
            </strong>{" "}
            so partners complete evaluations securely without logins.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
          Replaced manual HR tracking with a{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            fully automated pipeline
          </strong>{" "}
          from activation through completion. New evaluation types can be added
          with{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            configuration and schema
          </strong>{" "}
          rather than redeploying the whole frontend, keeping the module
          scalable as policy evolves.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:mx-0 md:text-base">
            Data model, end-user and admin flow, then a high-level sequence for
            internal vs token-based external submissions.
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
