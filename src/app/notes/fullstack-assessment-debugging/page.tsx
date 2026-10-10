import { AssessmentFlowDiagram } from "./AssessmentFlowDiagram"
import type { Metadata } from "next"
import Link from "next/link"
import { PageJsonLd } from "@/components/PageJsonLd"
import {
  breadcrumbList,
  pageSocialMeta,
  techArticleJsonLd,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/fullstack-assessment-debugging"
const TITLE = "Full-stack assessment — performance & live debugging"
const DESCRIPTION =
  "Take-home reflection: Laravel Http pooling, Next.js + SWR infinite scroll, live-session bug, and a concise post-interview follow-up."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function FullstackAssessmentDebuggingPage() {
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-16 md:py-24">
      <PageJsonLd
        data={[
          techArticleJsonLd({
            siteUrl,
            headline: TITLE,
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Technical notes", path: "/notes" },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />
      <div className="pb-4 md:pb-8">
        <Link
          href="/notes"
          className="text-sm text-muted-foreground hover:text-navy"
        >
          ← Technical notes
        </Link>
      </div>

      <header className="space-y-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            Assessment reflection
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Full-Stack Assessment: Performance Optimization &amp; Live Debugging
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Product engineer (candidate) — a timed take-home using Laravel and
          Next.js, a live technical session where a subtle bug surfaced, and the
          work I did afterward to reproduce, fix, and explain it clearly.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          I am keeping this{" "}
          <strong className="text-navy">
            company-anonymous
          </strong>
          : no employer name, no verbatim brief, and no proprietary snippets.
          What follows is the engineering story—how I approached aggregation
          performance, UI stability, what broke under concurrency in the live
          session, and how I{" "}
          <strong className="text-navy">
            closed the loop
          </strong>{" "}
          with a written follow-up.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-3">
          <div className="label-problem">
            Challenge
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Aggregation cost, UI churn, and a live race
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            The exercise required paginated data backed by a{" "}
            <strong className="text-navy">
              third-party REST API
            </strong>
            . A naive implementation naturally trends toward{" "}
            <strong className="text-navy">
              N+1-style latency
            </strong>{" "}
            when list rows each need a detail fetch. On the client, infinite
            scrolling plus image loading can cause{" "}
            <strong className="text-navy">
              layout shift
            </strong>{" "}
            if the UI does not reserve space. During the live session, stress on{" "}
            <strong className="text-navy">
              concurrent fetches
            </strong>{" "}
            exposed a bug: responses completed out of order, the merge step
            assumed stable ordering, and{" "}
            <strong className="text-navy">
              SWR revalidation
            </strong>{" "}
            briefly fought in-flight requests—producing inconsistent rows until
            refresh.
          </p>
        </div>

        <div className="space-y-3">
          <div className="label-solution">
            Solution
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Pooling, skeleton-first UI, then a precise merge fix
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            On the server I replaced sequential per-row HTTP calls with{" "}
            <strong className="text-navy">
              concurrent requests via Laravel&apos;s HTTP client pooling
            </strong>{" "}
            so detail retrieval time tracks wall-clock parallelism instead of
            the sum of every round trip. On the client I used{" "}
            <strong className="text-navy">
              SWR
            </strong>{" "}
            for caching and deduplication,{" "}
            <strong className="text-navy">
              Intersection Observer
            </strong>{" "}
            to trigger the next page only when the sentinel enters view, and{" "}
            <strong className="text-navy">
              skeleton placeholders
            </strong>{" "}
            so the list height stays stable while data resolves. After the
            interview I reproduced the failure locally, fixed it by{" "}
            <strong className="text-navy">
              mapping pooled responses to explicit list indices before merge
            </strong>{" "}
            and tightening SWR keys so revalidation cannot clobber in-flight
            page fetches.
          </p>
        </div>
      </section>

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-lg">
          I treated the take-home as a chance to ship a small but coherent
          full-stack slice under time pressure—an honest best effort, not a
          claim to being flawless. After the interview, I still had open
          questions in my own head, so I went back, reproduced the issue locally,
          and tried to{" "}
          <strong className="text-navy">
            trace the cross-layer bug
          </strong>{" "}
          and write it up in plain language, mainly out of respect for the time
          the panel had already given me. I also documented{" "}
          <strong className="text-navy">
            where AI-assisted tooling helped
          </strong>{" "}
          (boilerplate, test scaffolding, wording)—and made clear it never
          replaced validating behavior against the network tab and server logs.
        </p>
      </section>

      <figure className="space-y-3 border-l border-border pl-5">
        <figcaption className="mb-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Communication — follow-up after the session
        </figcaption>
        <blockquote className="text-base italic leading-relaxed text-navy md:text-lg">
          I sent a short email summarizing what I observed under concurrent
          fetches, the ordering assumption that made the merge step fragile, and
          the exact guardrails I added (index-keyed merge + safer SWR keys). I
          included a minimal repro path and what I would monitor in production
          (pool timeouts, partial failures, and cache invalidation). The goal
          was not to re-litigate the interview—it was to leave a clear,
          respectful paper trail that the panel could skim in two minutes.
        </blockquote>
      </figure>

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Tools (used transparently)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
          Editor with inline assistance for repetitive typing, HTTP client docs
          for pool semantics, and browser devtools for waterfall verification. I
          treated AI like a fast scratchpad: suggestions still had to pass{" "}
          <strong className="text-navy">
            curl, logs, and UI behavior
          </strong>
          .
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-navy">
            Technical architecture
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            One sequence view: cache-first reads, pooled backend aggregation, the
            ordering bug class I hit live, and how the UI stays stable while
            paginating.
          </p>
        </div>

        <AssessmentFlowDiagram />
      </section>

      <footer className="border-t border-border pt-8">
        <Link
          href="/#technical-notes"
          className="text-sm text-[var(--accent-token)] hover:underline"
        >
          ← Technical notes on the home page
        </Link>
      </footer>
    </main>
  )
}
