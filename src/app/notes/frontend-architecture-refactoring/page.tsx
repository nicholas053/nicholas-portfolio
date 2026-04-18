import { ArchitectureBeforeAfter } from "./ArchitectureBeforeAfter"
import { FiArrowLeft } from "react-icons/fi"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frontend architecture refactoring",
  description:
    "Component-driven refactor: unified forms, shared library, RBAC across admin and agent portals — less duplication and faster maintenance.",
  alternates: {
    canonical: "/notes/frontend-architecture-refactoring",
  },
}

export default function FrontendArchitectureRefactoringPage() {
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
            Team / engineering practice
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Frontend Architecture Refactoring &amp; Component Standardization
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
          Lead Frontend Engineer — reducing duplication across admin and agent
          experiences by moving toward a single source of truth for forms,
          lists, and shared UI.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-2 inline-flex rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700 dark:bg-red-900/40 dark:text-red-200">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            DRY violations and heavy maintenance
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            The legacy UI had deep structural duplication: separate{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              add vs edit
            </strong>{" "}
            components, parallel pages across{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              admin and agent
            </strong>{" "}
            portals, and utility widgets copied into multiple trees. Even a
            simple label or validation tweak required touching many isolated
            files, which slowed delivery and increased regression risk.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 md:p-8 dark:border-sky-800 dark:bg-sky-900/20">
          <div className="mb-2 inline-flex rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
            Solution
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Component-driven, unified surfaces
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Led a refactor toward{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              component-driven development
            </strong>
            : merged add/edit into{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              one dynamic form
            </strong>{" "}
            keyed by route params (e.g.{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-gray-900/80">
              /:id
            </code>
            ), collapsed duplicated portal pages into{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              shared views with RBAC
            </strong>
            , and hoisted repeated pieces (such as activity logs) into a{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              centralized shared library
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
          Materially shrank the surface area of the UI codebase and cut ongoing
          maintenance cost: fixes and visual tweaks increasingly land in{" "}
          <strong className="text-gray-900 dark:text-gray-100">
            one place
          </strong>
          , propagating consistently across both portals instead of chasing
          copies in siloed folders.
        </p>
      </section>

      <section className="space-y-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Architecture transformation
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:mx-0 md:text-base">
            High-level view of structure before vs after. Diagrams are
            illustrative of the pattern, not a literal repo map.
          </p>
        </div>

        <ArchitectureBeforeAfter />
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
