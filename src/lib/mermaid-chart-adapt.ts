import { THEME, type ThemeMode } from "@/lib/theme-colors"

/** Step section rects in sequence diagrams (was cornsilk yellow). */
const SEQ_RECT_STEP_LIGHT = "rgb(255, 248, 220)"
const SEQ_RECT_STEP_DARK = "rgb(61, 70, 96)"

/** Highlight rects e.g. Finance Selection Session (was alice blue). */
const SEQ_RECT_ACCENT_LIGHT = "rgb(240, 248, 255)"
const SEQ_RECT_ACCENT_DARK = "rgb(53, 61, 82)"

/** Swap hardcoded light rect fills before render so notes stay readable in dark mode. */
export function adaptMermaidChart(chart: string, mode: ThemeMode): string {
  if (mode === "light") return chart
  return chart
    .replaceAll(SEQ_RECT_STEP_LIGHT, SEQ_RECT_STEP_DARK)
    .replaceAll(SEQ_RECT_ACCENT_LIGHT, SEQ_RECT_ACCENT_DARK)
}

function parseRgb(fill: string): [number, number, number] | null {
  const m = fill.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

function isLightFill(fill: string | null): boolean {
  if (!fill || fill === "none" || fill === "transparent") return false
  const lower = fill.toLowerCase()
  if (lower === "#fff" || lower === "#ffffff" || lower === "white") return true
  const rgb = parseRgb(fill)
  if (!rgb) return false
  const [r, g, b] = rgb
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.72
}

function isDarkFill(fill: string | null): boolean {
  if (!fill) return false
  const rgb = parseRgb(fill)
  if (!rgb) {
    const lower = fill.toLowerCase()
    return lower === "#313851" || lower === "#252b3f" || lower === "#3d4660"
  }
  const [r, g, b] = rgb
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.45
}

/** Patch rendered SVG: light rects/labels from inline Mermaid styles → dark palette. */
export function patchMermaidSvgForTheme(container: HTMLElement, mode: ThemeMode) {
  const svg = container.querySelector("svg")
  if (!svg || mode !== "dark") return

  svg.querySelectorAll("rect").forEach((rect) => {
    const fill = rect.getAttribute("fill")
    if (isLightFill(fill)) {
      rect.setAttribute("fill", "#3D4660")
    }
  })

  svg.querySelectorAll("text, tspan").forEach((node) => {
    const fill = node.getAttribute("fill")
    if (!fill || fill === "none" || isDarkFill(fill) || fill.toLowerCase() === "#313851") {
      node.setAttribute("fill", THEME.cream)
    }
  })

  svg.querySelectorAll("line, path").forEach((node) => {
    const stroke = node.getAttribute("stroke")
    if (stroke && (stroke.toLowerCase() === "#ffffff" || stroke.toLowerCase() === "white")) {
      node.setAttribute("stroke", THEME.mist)
    }
  })
}
