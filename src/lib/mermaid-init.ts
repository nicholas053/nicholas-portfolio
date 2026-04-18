import mermaid from "mermaid"

let configured = false

export function ensureMermaidInitialized() {
  if (configured) return
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    themeVariables: {
      primaryColor: "#f0f9ff",
      primaryTextColor: "#111827",
      primaryBorderColor: "#bae6fd",
      lineColor: "#64748b",
      secondaryColor: "#f8fafc",
      tertiaryColor: "#ffffff",
    },
  })
  configured = true
}
