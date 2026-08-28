"use client"

import { adaptMermaidChart, patchMermaidSvgForTheme } from "@/lib/mermaid-chart-adapt"
import { initMermaidForMode, useMermaidTheme } from "@/lib/use-mermaid-theme"
import mermaid from "mermaid"
import { useEffect, useId, useRef, useState } from "react"

export type MermaidTabItem = {
  id: string
  label: string
  chart: string
}

export function MermaidTabs({ tabs }: { tabs: MermaidTabItem[] }) {
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const baseId = useId().replace(/:/g, "")
  const renderNonce = useRef(0)
  const themeMode = useMermaidTheme()

  useEffect(() => {
    initMermaidForMode(themeMode)
  }, [themeMode])

  useEffect(() => {
    const el = panelRef.current
    const chart = tabs[active]?.chart
    if (!el || chart === undefined) return

    let cancelled = false
    renderNonce.current += 1
    const renderId = `${baseId}-mmd-${active}-${renderNonce.current}`

    el.innerHTML =
      '<p class="py-10 text-center text-sm text-muted-foreground">Rendering diagram…</p>'

    void (async () => {
      try {
        initMermaidForMode(themeMode)
        const chartSource = adaptMermaidChart(chart, themeMode)
        const { svg } = await mermaid.render(renderId, chartSource)
        if (!cancelled) {
          el.innerHTML = svg
          patchMermaidSvgForTheme(el, themeMode)
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err)
          const safe = msg
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
          el.innerHTML = `<div class="rounded-lg border border-red-200 bg-red-50 p-4 text-left text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"><strong class="block mb-2">Could not render diagram</strong><pre class="whitespace-pre-wrap break-words font-mono text-xs text-red-800 dark:text-red-200">${safe}</pre></div>`
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [active, tabs, baseId, themeMode])

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Architecture diagrams"
        className="-mx-1 flex flex-nowrap gap-1 overflow-x-auto border-b border-border px-1 pb-3 sm:mx-0 sm:gap-2 sm:overflow-visible sm:px-0"
      >
        {tabs.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`mermaid-panel-${t.id}`}
              id={`mermaid-tab-${t.id}`}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-left text-[11px] font-medium leading-tight transition sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base ${
                selected
                  ? "bg-navy text-cream shadow-sm ring-1 ring-mist/60"
                  : "bg-mist/30 text-navy hover:bg-mist/50"
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        id={`mermaid-panel-${tabs[active]?.id ?? "active"}`}
        role="tabpanel"
        aria-labelledby={`mermaid-tab-${tabs[active]?.id ?? "active"}`}
        className="min-h-[280px] overflow-x-auto rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4 md:p-6 [&_svg]:max-w-none [&_svg]:min-w-0"
      />

      <p className="text-xs text-muted-foreground">
        Diagrams are generated from Mermaid source — zoom the page or scroll
        horizontally on small screens if a chart is wide.
      </p>
    </div>
  )
}
