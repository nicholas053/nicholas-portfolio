"use client"

import { adaptMermaidChart, patchMermaidSvgForTheme } from "@/lib/mermaid-chart-adapt"
import { initMermaidForMode, useMermaidTheme } from "@/lib/use-mermaid-theme"
import mermaid from "mermaid"
import { useEffect, useId, useRef } from "react"

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

type Props = {
  chart: string
  /** Short description for screen readers */
  "aria-label"?: string
  className?: string
}

export function MermaidDiagram({ chart, "aria-label": ariaLabel, className }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const baseId = useId().replace(/:/g, "")
  const renderNonce = useRef(0)
  const themeMode = useMermaidTheme()

  useEffect(() => {
    initMermaidForMode(themeMode)
  }, [themeMode])

  useEffect(() => {
    const el = panelRef.current
    if (!el) return

    let cancelled = false
    renderNonce.current += 1
    const renderId = `${baseId}-mmd-single-${renderNonce.current}`

    el.innerHTML =
      '<p class="py-8 text-center text-sm text-muted-foreground">Rendering diagram…</p>'

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
          el.innerHTML = `<div class="rounded-lg border border-red-200 bg-red-50 p-4 text-left text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"><strong class="mb-2 block">Could not render diagram</strong><pre class="whitespace-pre-wrap break-words font-mono text-xs text-red-800 dark:text-red-200">${escapeHtml(msg)}</pre></div>`
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [chart, baseId, themeMode])

  return (
    <div
      ref={panelRef}
      role="img"
      aria-label={ariaLabel ?? "Mermaid diagram"}
      className={
        className ??
        "min-h-[220px] overflow-x-auto rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4 [&_svg]:max-w-none [&_svg]:min-w-0"
      }
    />
  )
}
