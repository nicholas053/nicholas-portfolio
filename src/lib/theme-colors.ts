/** Light and dark palettes. `navy` is the readable ink in each mode. */

export const THEME = {
  cream: "#F6F3ED",
  mist: "#C5CED6",
  navy: "#2C3348",
  navyHover: "#1E2436",
  accent: "#9A4E32",
  surface: "#FBF9F4",
  surfaceDark: "#1C2230",
  pageWash: "#F3F0EA",
  pageDark: "#12151C",
  sectionWash: "#E8E4DC",
  mutedLight: "#5E6578",
  mutedDark: "#A8B1BE",
  /** Readable text on the dark page. */
  inkDark: "#E7E2D6",
  accentDark: "#E0B089",
} as const

export type ThemeMode = "light" | "dark"

/** RGB tuple for inline gradients (marquee fades, etc.). */
export const PAGE_WASH_RGB = "242, 244, 246" as const

/** @deprecated Use PAGE_WASH_RGB — kept for any legacy references */
export const CREAM_RGB = PAGE_WASH_RGB
