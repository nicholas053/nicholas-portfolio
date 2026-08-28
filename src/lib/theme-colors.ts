/** Single source of truth for the cream / mist / navy portfolio palette. */

export const THEME = {
  cream: "#F6F3ED",
  mist: "#C2CBD3",
  navy: "#313851",
  navyHover: "#252B3F",
  surface: "#FFFFFF",
  surfaceDark: "#252B3F",
  /** Light page wash — mist tint on white (not warm cream). */
  pageWash: "#F2F4F6",
  /** Light alternate section — slightly stronger mist wash. */
  sectionWash: "#E8ECF0",
  /** Secondary copy on light backgrounds (~65% navy). */
  mutedLight: "#5C6378",
  /** Secondary copy on dark backgrounds (~80% mist). */
  mutedDark: "#D4D9DE",
} as const

export type ThemeMode = "light" | "dark"

/** RGB tuple for inline gradients (marquee fades, etc.). */
export const PAGE_WASH_RGB = "242, 244, 246" as const

/** @deprecated Use PAGE_WASH_RGB — kept for any legacy references */
export const CREAM_RGB = PAGE_WASH_RGB
