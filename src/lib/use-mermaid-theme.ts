"use client"

import { ensureMermaidInitialized, resetMermaidTheme } from "@/lib/mermaid-init"
import type { ThemeMode } from "@/lib/theme-colors"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useResolvedThemeMode(): ThemeMode {
  const { resolvedTheme } = useTheme()
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    setMode(resolvedTheme === "dark" ? "dark" : "light")
  }, [resolvedTheme])

  return mode
}

export function useMermaidTheme(): ThemeMode {
  const mode = useResolvedThemeMode()

  useEffect(() => {
    resetMermaidTheme(mode)
  }, [mode])

  return mode
}

export function initMermaidForMode(mode: ThemeMode) {
  ensureMermaidInitialized(mode)
}
