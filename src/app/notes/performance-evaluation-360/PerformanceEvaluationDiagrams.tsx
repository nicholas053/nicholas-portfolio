"use client"

import dynamic from "next/dynamic"
import { performanceEvaluationDiagramTabs } from "@/content/performance-evaluation-diagrams"

const MermaidTabs = dynamic(
  () =>
    import("@/components/MermaidTabs").then((m) => ({ default: m.MermaidTabs })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
        Loading diagrams…
      </div>
    ),
  }
)

export function PerformanceEvaluationDiagrams() {
  return <MermaidTabs tabs={performanceEvaluationDiagramTabs} />
}
