import { ArchitectureBeforeAfter } from "./ArchitectureBeforeAfter"
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

const PATH = "/notes/frontend-architecture-refactoring"
const TITLE = "Frontend architecture refactoring"
const DESCRIPTION =
  "Component-driven refactor: unified forms, shared library, RBAC across admin and agent portals — less duplication and faster maintenance."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function FrontendArchitectureRefactoringPage() {
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
            Team / engineering practice
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
          Frontend Architecture Refactoring &amp; Component Standardization
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground dark:text-muted-foreground md:text-lg">
          Lead Frontend Engineer — reducing duplication across admin and agent
          experiences by moving toward a single source of truth for forms,
          lists, and shared UI.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-border bg-muted p-6 md:p-8">
          <div className="label-problem">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
            DRY violations and heavy maintenance
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            The legacy UI had deep structural duplication: separate{" "}
            <strong className="text-navy">
              add vs edit
            </strong>{" "}
            components, parallel pages across{" "}
            <strong className="text-navy">
              admin and agent
            </strong>{" "}
            portals, and utility widgets copied into multiple trees. Even a
            simple label or validation tweak required touching many isolated
            files, which slowed delivery and increased regression risk.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="label-solution">
            Solution
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
            Component-driven, unified surfaces
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            Led a refactor toward{" "}
            <strong className="text-navy">
              component-driven development
            </strong>
            : merged add/edit into{" "}
            <strong className="text-navy">
              one dynamic form
            </strong>{" "}
            keyed by route params (e.g.{" "}
            <code className="rounded bg-surface/80 px-1 py-0.5 text-xs dark:bg-surface/80">
              /:id
            </code>
            ), collapsed duplicated portal pages into{" "}
            <strong className="text-navy">
              shared views with RBAC
            </strong>
            , and hoisted repeated pieces (such as activity logs) into a{" "}
            <strong className="text-navy">
              centralized shared library
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-lg">
          Materially shrank the surface area of the UI codebase and cut ongoing
          maintenance cost: fixes and visual tweaks increasingly land in{" "}
          <strong className="text-navy">
            one place
          </strong>
          , propagating consistently across both portals instead of chasing
          copies in siloed folders.
        </p>
      </section>

      <section className="space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            Architecture transformation
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-muted-foreground dark:text-muted-foreground md:mx-0 md:text-base">
            High-level view of structure before vs after. Diagrams are
            illustrative of the pattern, not a literal repo map.
          </p>
        </div>

        <ArchitectureBeforeAfter />
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
