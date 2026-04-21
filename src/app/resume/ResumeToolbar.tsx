"use client"

import Link from "next/link"
import { useCallback, useState } from "react"

export function ResumeToolbar() {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadPdf = useCallback(async () => {
    setError(null)
    setDownloading(true)
    try {
      const res = await fetch("/api/resume/pdf")
      if (!res.ok) throw new Error(`Could not generate PDF (${res.status})`)
      const cd = res.headers.get("Content-Disposition")
      let filename = "Resume.pdf"
      const quoted = cd?.match(/filename="([^"]+)"/)
      const unquoted = cd?.match(/filename=([^;\s]+)/)
      if (quoted?.[1]) filename = quoted[1]
      else if (unquoted?.[1]) filename = unquoted[1].replace(/"/g, "")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.rel = "noopener"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed")
    } finally {
      setDownloading(false)
    }
  }, [])

  return (
    <div className="no-print fixed left-0 right-0 top-0 z-50 border-b border-gray-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
        >
          ← Portfolio
        </Link>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 disabled:opacity-60"
        >
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
        >
          Print
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] leading-snug text-gray-600 sm:text-right">
        <strong>Download PDF</strong> builds a real PDF on the server — email, GitHub, portfolio, and case-study links stay{" "}
        <strong>clickable</strong>. <strong>Print</strong> uses the browser (turn off headers/footers in print settings if
        you save that way).
      </p>
      {error ? <p className="mx-auto mt-1 max-w-3xl text-center text-xs text-red-600 sm:text-right">{error}</p> : null}
    </div>
  )
}
