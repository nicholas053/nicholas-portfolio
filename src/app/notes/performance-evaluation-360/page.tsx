import { PerformanceEvaluationDiagrams } from "./PerformanceEvaluationDiagrams"
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
            Team / feature ownership
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          End-to-End 360° Performance Evaluation Module
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Full-stack developer &amp; feature owner — annual KPI-linked 360°
          reviews across peers, managers, and external partners. I owned both
          the assignment engine / public API and the Angular experience for
          complex, schema-driven forms on desktop and mobile.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-3">
          <div className="label-problem self-start">
            Challenge
          </div>
          <h2 className="text-lg font-semibold text-navy">
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

        <div className="space-y-3">
          <div className="label-solution self-start">
            Solution
          </div>
          <h2 className="text-lg font-semibold text-navy">
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
              <code className="rounded bg-muted px-1 font-mono text-xs">
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

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
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
        <div>
          <h2 className="text-lg font-semibold text-navy">
            Technical architecture
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Data model, admin and staff flows (including schema-driven form
            steps), then a sequence view contrasting authenticated staff calls
            with token-based partner submissions.
          </p>
        </div>

        <PerformanceEvaluationDiagrams />
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
