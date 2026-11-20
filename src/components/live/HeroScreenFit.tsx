"use client"

import { useLayoutEffect } from "react"

const DESKTOP = "(min-width: 768px)"

/** Visible CSS-pixel height. Pinch-zoom keeps the layout viewport. */
function visibleScreenHeight() {
  const inner = window.innerHeight
  const vv = window.visualViewport
  if (!vv || vv.scale > 1) return inner
  return Math.min(inner, vv.height)
}

/**
 * Pin the hero to the visible screen when vh/dvh/svh are taller than it.
 * No-op when the CSS units already match, so desktop layout stays on svh.
 */
export function HeroScreenFit() {
  useLayoutEffect(() => {
    const hero = document.querySelector<HTMLElement>(".home-hero")
    if (!hero) return
    const mq = window.matchMedia(DESKTOP)
    let frame = 0

    const apply = () => {
      if (!mq.matches) {
        hero.style.removeProperty("--vis-h")
        hero.classList.remove("is-pinned", "is-short")
        return
      }
      const visible = visibleScreenHeight()
      hero.classList.toggle("is-short", visible <= 640)
      if (hero.classList.contains("is-pinned")) {
        hero.classList.remove("is-pinned")
        hero.style.removeProperty("--vis-h")
      }
      const cssHeight = hero.getBoundingClientRect().height
      if (cssHeight - visible > 1) {
        hero.style.setProperty("--vis-h", `${visible}px`)
        hero.classList.add("is-pinned")
      }
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(apply)
    }

    apply()
    mq.addEventListener("change", schedule)
    window.addEventListener("resize", schedule)
    window.addEventListener("orientationchange", schedule)
    window.visualViewport?.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      mq.removeEventListener("change", schedule)
      window.removeEventListener("resize", schedule)
      window.removeEventListener("orientationchange", schedule)
      window.visualViewport?.removeEventListener("resize", schedule)
    }
  }, [])

  return null
}
