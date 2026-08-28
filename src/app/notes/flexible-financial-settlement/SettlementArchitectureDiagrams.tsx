"use client"

import dynamic from "next/dynamic"
import { settlementDiagramTabs } from "@/content/settlement-engine-diagrams"

const MermaidTabs = dynamic(
  () =>
    import("@/components/MermaidTabs").then((m) => ({ default: m.MermaidTabs })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        Loading diagrams…
      </div>
    ),
  }
)

export function SettlementArchitectureDiagrams() {
  return <MermaidTabs tabs={settlementDiagramTabs} />
}
