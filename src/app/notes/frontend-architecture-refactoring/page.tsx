import { ArchitectureBeforeAfter } from "./ArchitectureBeforeAfter"
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
            Team / engineering practice
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Frontend Architecture Refactoring &amp; Component Standardization
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Lead Frontend Engineer — reducing duplication across admin and agent
          experiences by moving toward a single source of truth for forms,
          lists, and shared UI.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-3">
          <div className="label-problem">
            Challenge
          </div>
          <h2 className="text-lg font-semibold text-navy">
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

        <div className="space-y-3">
          <div className="label-solution">
            Solution
          </div>
          <h2 className="text-lg font-semibold text-navy">
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
            <code className="rounded bg-muted px-1 font-mono text-xs">
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

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
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
        <div>
          <h2 className="text-lg font-semibold text-navy">
            Architecture transformation
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            High-level view of structure before vs after. Diagrams are
            illustrative of the pattern, not a literal repo map.
          </p>
        </div>

        <ArchitectureBeforeAfter />
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
