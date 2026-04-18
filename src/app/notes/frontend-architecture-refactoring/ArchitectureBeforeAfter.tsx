"use client"

import { MermaidDiagram } from "@/components/MermaidDiagram"
import { LEGACY_FE_ARCH, MODERN_FE_ARCH } from "@/content/frontend-refactoring-diagrams"

export function ArchitectureBeforeAfter() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
      <div className="flex min-w-0 flex-col space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Before — legacy duplication
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Separate add/edit routes, mirrored portal pages, and duplicated
            widgets (e.g. activity logs) meant every small change fanned out
            across many files.
          </p>
        </div>
        <MermaidDiagram
          chart={LEGACY_FE_ARCH}
          aria-label="Legacy frontend architecture with duplicated admin and agent portals"
        />
      </div>

      <div className="flex min-w-0 flex-col space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            After — unified, component-driven
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            One dynamic form per module driven by route params, shared list and
            log components, and RBAC to branch admin vs agent behavior without
            duplicating screens.
          </p>
        </div>
        <MermaidDiagram
          chart={MODERN_FE_ARCH}
          aria-label="Refactored frontend architecture with shared library and RBAC"
        />
      </div>
    </div>
  )
}
