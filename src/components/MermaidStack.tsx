"use client"

import dynamic from "next/dynamic"
import type { MermaidTabItem } from "@/components/MermaidTabs"

const MermaidTabs = dynamic(
  () => import("@/components/MermaidTabs").then((m) => ({ default: m.MermaidTabs })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[220px] items-center justify-center rounded-md border border-border bg-card text-sm text-muted-foreground">
        Loading diagrams…
      </div>
    ),
  }
)

export type MermaidBlock = {
  id: string
  label: string
  chart: string
}

/** Tabbed charts, same control as the older architecture notes. */
export function MermaidStack({ blocks }: { blocks: readonly MermaidBlock[] }) {
  const tabs: MermaidTabItem[] = blocks.map((block) => ({
    id: block.id,
    label: block.label,
    chart: block.chart,
  }))

  return <MermaidTabs tabs={tabs} />
}
