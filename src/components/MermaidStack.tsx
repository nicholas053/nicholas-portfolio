"use client"

import dynamic from "next/dynamic"

const MermaidDiagram = dynamic(
  () => import("@/components/MermaidDiagram").then((m) => ({ default: m.MermaidDiagram })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        Loading diagram…
      </div>
    ),
  }
)

export type MermaidBlock = {
  id: string
  label: string
  chart: string
}

/** One chart per block, stacked — not tabbed. */
export function MermaidStack({ blocks }: { blocks: readonly MermaidBlock[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((block) => (
        <figure key={block.id} className="space-y-3">
          <figcaption className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">
            {block.label}
          </figcaption>
          <MermaidDiagram chart={block.chart} aria-label={block.label} />
        </figure>
      ))}
    </div>
  )
}
