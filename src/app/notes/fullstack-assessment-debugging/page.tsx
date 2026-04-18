import { AssessmentFlowDiagram } from "./AssessmentFlowDiagram"
import { FiArrowLeft } from "react-icons/fi"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Full-stack assessment — performance & live debugging",
  description:
    "Take-home reflection: Laravel Http pooling, Next.js + SWR infinite scroll, live-session bug, and a concise post-interview follow-up.",
  alternates: {
    canonical: "/notes/fullstack-assessment-debugging",
  },
}

export default function FullstackAssessmentDebuggingPage() {
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
          <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
            Assessment reflection
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Full-Stack Assessment: Performance Optimization &amp; Live Debugging
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
          Product engineer (candidate) — a timed take-home using Laravel and
          Next.js, a live technical session where a subtle bug surfaced, and the
          work I did afterward to reproduce, fix, and explain it clearly.
        </p>
      </header>

      <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50/80 p-6 text-left text-sm leading-relaxed text-gray-700 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300 md:p-8 md:text-base">
        <p>
          I am keeping this{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            company-anonymous
          </strong>
          : no employer name, no verbatim brief, and no proprietary snippets.
          What follows is the engineering story—how I approached aggregation
          performance, UI stability, what broke under concurrency in the live
          session, and how I{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            closed the loop
          </strong>{" "}
          with a written follow-up.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-2 inline-flex rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700 dark:bg-red-900/40 dark:text-red-200">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Aggregation cost, UI churn, and a live race
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            The exercise required paginated data backed by a{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              third-party REST API
            </strong>
            . A naive implementation naturally trends toward{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              N+1-style latency
            </strong>{" "}
            when list rows each need a detail fetch. On the client, infinite
            scrolling plus image loading can cause{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              layout shift
            </strong>{" "}
            if the UI does not reserve space. During the live session, stress on{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              concurrent fetches
            </strong>{" "}
            exposed a bug: responses completed out of order, the merge step
            assumed stable ordering, and{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              SWR revalidation
            </strong>{" "}
            briefly fought in-flight requests—producing inconsistent rows until
            refresh.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 md:p-8 dark:border-sky-800 dark:bg-sky-900/20">
          <div className="mb-2 inline-flex rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
            Solution
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Pooling, skeleton-first UI, then a precise merge fix
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            On the server I replaced sequential per-row HTTP calls with{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              concurrent requests via Laravel&apos;s HTTP client pooling
            </strong>{" "}
            so detail retrieval time tracks wall-clock parallelism instead of
            the sum of every round trip. On the client I used{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              SWR
            </strong>{" "}
            for caching and deduplication,{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              Intersection Observer
            </strong>{" "}
            to trigger the next page only when the sentinel enters view, and{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              skeleton placeholders
            </strong>{" "}
            so the list height stays stable while data resolves. After the
            interview I reproduced the failure locally, fixed it by{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              mapping pooled responses to explicit list indices before merge
            </strong>{" "}
            and tightening SWR keys so revalidation cannot clobber in-flight
            page fetches.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
          The take-home already showed I could ship a coherent full-stack slice
          under time pressure. The follow-up showed something rarer: I can{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            own uncertainty
          </strong>
          , trace a cross-layer bug, and explain the fix in plain language. I
          also documented{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            where I used AI-assisted tooling
          </strong>{" "}
          (boilerplate, test scaffolding, wording)—never as a substitute for
          validating behavior against the network tab and server logs.
        </p>
      </section>

      <figure className="relative overflow-hidden rounded-2xl border-l-4 border-violet-500 bg-violet-50/90 p-6 shadow-sm dark:border-violet-400 dark:bg-violet-950/30 md:p-8">
        <figcaption className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-800 dark:text-violet-200">
          Communication — follow-up after the session
        </figcaption>
        <blockquote className="text-base italic leading-relaxed text-gray-800 dark:text-gray-200 md:text-lg">
          I sent a short email summarizing what I observed under concurrent
          fetches, the ordering assumption that made the merge step fragile, and
          the exact guardrails I added (index-keyed merge + safer SWR keys). I
          included a minimal repro path and what I would monitor in production
          (pool timeouts, partial failures, and cache invalidation). The goal
          was not to re-litigate the interview—it was to leave a clear,
          respectful paper trail that the panel could skim in two minutes.
        </blockquote>
      </figure>

      <section className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-700 dark:bg-gray-800/30 md:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-200">
          Tools (used transparently)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
          Editor with inline assistance for repetitive typing, HTTP client docs
          for pool semantics, and browser devtools for waterfall verification. I
          treated AI like a fast scratchpad: suggestions still had to pass{" "}
          <strong className="text-gray-800 dark:text-gray-200">
            curl, logs, and UI behavior
          </strong>
          .
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:mx-0 md:text-base">
            One sequence view: cache-first reads, pooled backend aggregation, the
            ordering bug class I hit live, and how the UI stays stable while
            paginating.
          </p>
        </div>

        <AssessmentFlowDiagram />
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
