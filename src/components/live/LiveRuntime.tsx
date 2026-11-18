"use client"

import { useEffect } from "react"

/** Starts the prototype's DOM behaviour after the page markup is in the document. */
export function LiveRuntime({ notes }: { notes: boolean }) {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (notes) {
        const mod = await import("@/lib/live/notes-runtime.js")
        if (cancelled) return
        mod.startNotesRuntime()
      }
      const app = await import("@/lib/live/app-runtime.js")
      if (cancelled) return
      app.startSiteRuntime()
    })()
    return () => {
      cancelled = true
    }
  }, [notes])

  return null
}
