"use client"

import { useEffect } from "react"

/** Darken the logo and menu while the sage hero block sits behind the topbar. */
export function HeroNavSync() {
  useEffect(() => {
    const nav = document.querySelector(".nav")
    const sage = document.querySelector(".home-hero .sage-col")
    if (!nav || !sage) return

    const sync = () => {
      const bar = nav.getBoundingClientRect()
      const block = sage.getBoundingClientRect()
      const onSage = block.top < bar.height * 0.5 && block.bottom > bar.height * 0.65
      nav.classList.toggle("nav-on-sage", onSage)
    }

    sync()
    window.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    return () => {
      window.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [])

  return null
}
