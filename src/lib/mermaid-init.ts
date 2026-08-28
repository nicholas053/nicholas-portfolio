import mermaid from "mermaid"
import { THEME, type ThemeMode } from "@/lib/theme-colors"

let configuredMode: ThemeMode | null = null

/** Elevated node fill — must read clearly against diagram canvas in dark mode. */
const DARK_NODE = "#3D4660"
const DARK_SECTION = "#353D52"

export function getMermaidThemeVariables(mode: ThemeMode) {
  if (mode === "dark") {
    return {
      darkMode: true,
      background: THEME.surfaceDark,
      mainBkg: DARK_NODE,
      secondBkg: THEME.surfaceDark,
      tertiaryBkg: DARK_NODE,
      primaryColor: DARK_NODE,
      primaryTextColor: THEME.cream,
      primaryBorderColor: THEME.mist,
      secondaryColor: "#4A5568",
      secondaryTextColor: THEME.cream,
      secondaryBorderColor: THEME.mist,
      tertiaryColor: DARK_NODE,
      tertiaryTextColor: THEME.cream,
      tertiaryBorderColor: THEME.mist,
      lineColor: THEME.mist,
      textColor: THEME.cream,
      nodeTextColor: THEME.cream,
      nodeBorder: THEME.mist,
      clusterBkg: DARK_SECTION,
      clusterBorder: THEME.mist,
      titleColor: THEME.cream,
      edgeLabelBackground: THEME.surfaceDark,
      edgeLabelText: THEME.cream,
      actorBorder: THEME.mist,
      actorBkg: DARK_NODE,
      actorTextColor: THEME.cream,
      actorLineColor: THEME.mist,
      signalColor: THEME.mist,
      signalTextColor: THEME.cream,
      labelBoxBkgColor: DARK_NODE,
      labelBoxBorderColor: THEME.mist,
      labelTextColor: THEME.cream,
      loopTextColor: THEME.cream,
      noteBkgColor: DARK_SECTION,
      noteTextColor: THEME.cream,
      noteBorderColor: THEME.mist,
      activationBkgColor: "#4A5568",
      activationBorderColor: THEME.mist,
      sequenceNumberColor: THEME.cream,
      sectionBkgColor: DARK_NODE,
      altSectionBkgColor: DARK_SECTION,
      sectionBkgColor2: DARK_SECTION,
      gridColor: THEME.mist,
      messageTextColor: THEME.cream,
      messageLineColor: THEME.mist,
    }
  }

  return {
    darkMode: false,
    background: THEME.surface,
    mainBkg: THEME.cream,
    secondBkg: THEME.surface,
    tertiaryBkg: THEME.cream,
    primaryColor: THEME.cream,
    primaryTextColor: THEME.navy,
    primaryBorderColor: THEME.navy,
    secondaryColor: THEME.mist,
    secondaryTextColor: THEME.navy,
    secondaryBorderColor: THEME.navy,
    tertiaryColor: THEME.surface,
    tertiaryTextColor: THEME.navy,
    tertiaryBorderColor: THEME.navy,
    lineColor: THEME.navy,
    textColor: THEME.navy,
    nodeTextColor: THEME.navy,
    nodeBorder: THEME.navy,
    clusterBkg: THEME.cream,
    clusterBorder: THEME.mist,
    titleColor: THEME.navy,
    edgeLabelBackground: THEME.cream,
    edgeLabelText: THEME.navy,
    actorBorder: THEME.navy,
    actorBkg: THEME.cream,
    actorTextColor: THEME.navy,
    actorLineColor: THEME.navy,
    signalColor: THEME.navy,
    signalTextColor: THEME.navy,
    labelBoxBkgColor: THEME.cream,
    labelBoxBorderColor: THEME.navy,
    labelTextColor: THEME.navy,
    loopTextColor: THEME.navy,
    noteBkgColor: THEME.cream,
    noteTextColor: THEME.navy,
    noteBorderColor: THEME.mist,
    activationBkgColor: THEME.mist,
    activationBorderColor: THEME.navy,
    sequenceNumberColor: THEME.navy,
    sectionBkgColor: THEME.cream,
    altSectionBkgColor: THEME.mist,
    sectionBkgColor2: THEME.mist,
    gridColor: THEME.mist,
    messageTextColor: THEME.navy,
    messageLineColor: THEME.navy,
  }
}

export function ensureMermaidInitialized(mode: ThemeMode = "light") {
  if (configuredMode === mode) return
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    fontFamily: "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif",
    themeVariables: getMermaidThemeVariables(mode),
  })
  configuredMode = mode
}

export function resetMermaidTheme(mode: ThemeMode) {
  configuredMode = null
  ensureMermaidInitialized(mode)
}
