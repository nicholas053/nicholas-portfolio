import { PerformanceEvaluationDiagrams } from "./PerformanceEvaluationDiagrams"
import { FiArrowLeft } from "react-icons/fi"
import type { Metadata } from "next"
import Link from "next/link"
import { PageJsonLd } from "@/components/PageJsonLd"
import {
  breadcrumbList,
  pageSocialMeta,
  techArticleJsonLd,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/performance-evaluation-360"
const TITLE = "360° performance evaluation module"
const DESCRIPTION =
  "Full-stack HR 360°: generation engine and tokenized partner API on the backend; Angular schema-driven forms, shared UI, and responsive Likert layouts on the frontend."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function PerformanceEvaluation360Page() {
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-12 lg:space-y-20">
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
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy dark:text-muted-foreground dark:hover:text-cream"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Technical notes</span>
        </Link>
      </div>

      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full bg-mist/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy dark:bg-surface/50 dark:text-mist">
            Team / feature ownership
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
          End-to-End 360° Performance Evaluation Module
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground dark:text-muted-foreground md:text-lg">
          Full-stack developer &amp; feature owner — annual KPI-linked 360°
          reviews across peers, managers, and external partners. I owned both
          the assignment engine / public API and the Angular experience for
          complex, schema-driven forms on desktop and mobile.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="flex h-full min-h-0 flex-col space-y-4 rounded-2xl border border-border bg-muted p-6 md:p-8">
          <div className="label-problem self-start">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
            Engine, security model, and evaluator UX
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            The enterprise needed a comprehensive{" "}
            <strong className="text-navy">
              360° performance review
            </strong>{" "}
            tied to annual KPIs. The work split naturally in two directions: a
            backend that could resolve{" "}
            <strong className="text-navy">
              dynamic hierarchies
            </strong>
            , mint secure access for{" "}
            <strong className="text-navy">
              external partner feedback without logins
            </strong>
            , and persist audit-friendly payloads; and a frontend that could
            render{" "}
            <strong className="text-navy">
              schema-driven evaluation forms
            </strong>{" "}
            (many question types, dense matrices) with a smooth experience on
            both desktop and mobile.
          </p>
        </div>

        <div className="flex h-full min-h-0 flex-col space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="label-solution self-start">
            Solution
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
            Backend engine, Angular forms, responsive matrices
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            Owned the feature end-to-end—from persistence and APIs through the
            evaluator UI.
          </p>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            <li>
              <span className="font-semibold text-navy">
                Backend architecture:
              </span>{" "}
              Built a generation engine that{" "}
              <strong className="text-navy">
                auto-matches department members
              </strong>{" "}
              and assigns form types from rank and relationship; stored answers
              in{" "}
              <strong className="text-navy">
                JSONB
              </strong>
              ; exposed a{" "}
              <strong className="text-navy">
                stateless, token-based public API
              </strong>{" "}
              so partners submit securely without accounts.
            </li>
            <li>
              <span className="font-semibold text-navy">
                Frontend (Angular):
              </span>{" "}
              Modular app with{" "}
              <strong className="text-navy">
                shared UI components
              </strong>
              . A dynamic{" "}
              <strong className="text-navy">
                EvaluationFormComponent
              </strong>{" "}
              reads varying JSON schemas (flat vs. sectioned) and renders the
              right controls for each question type.
            </li>
            <li>
              <span className="font-semibold text-navy">
                Responsive UX:
              </span>{" "}
              Used programmatic viewport checks (
              <code className="rounded bg-surface/80 px-1 py-0.5 text-xs dark:bg-surface/80">
                matchMedia
              </code>
              ) so large Likert matrices reflow into a mobile-friendly layout
              without breaking{" "}
              <strong className="text-navy">
                reactive form groupings
              </strong>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-lg">
          Delivered a{" "}
          <strong className="text-navy">
            fully automated, scalable HR evaluation path
          </strong>{" "}
          from cycle activation through completion. The schema-driven Angular
          surface decoupled the UI from hardcoded questionnaires, so the
          business could introduce{" "}
          <strong className="text-navy">
            new evaluation types through configuration
          </strong>{" "}
          instead of shipping new form screens for every change—while keeping
          submissions reliable across desktop and mobile.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-muted-foreground dark:text-muted-foreground md:mx-0 md:text-base">
            Data model, admin and staff flows (including schema-driven form
            steps), then a sequence view contrasting authenticated staff calls
            with token-based partner submissions.
          </p>
        </div>

        <PerformanceEvaluationDiagrams />
      </section>

      <footer className="border-t border-mist pt-10 text-center dark:border-mist/50">
        <Link
          href="/"
          className="text-sm font-medium text-navy hover:underline dark:text-mist"
        >
          ← Back to portfolio home
        </Link>
      </footer>
    </main>
  )
}
