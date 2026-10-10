"use client"

import { useEffect, useRef, useState } from "react"
import { marqueeTechIcons } from "@/content/tech-stack-marquee"

export function TechStackMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const icons = marqueeTechIcons()

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    const widthRef = { current: 0 }
    const posRef = { current: 0 }
    let lastTime: number | null = null
    let raf = 0
    let retry = 0

    const measure = () => {
      const next = group.nextElementSibling as HTMLElement | null
      if (next) {
        const a = group.getBoundingClientRect()
        const b = next.getBoundingClientRect()
        widthRef.current = Math.max(0, b.left - a.left)
      } else {
        const gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 0
        widthRef.current = group.getBoundingClientRect().width + gap
      }
      if (widthRef.current > 0) {
        posRef.current = posRef.current % widthRef.current
      }
    }

    const tryMeasure = (attempt = 0) => {
      measure()
      if (widthRef.current === 0 && attempt < 8) {
        retry = window.setTimeout(() => tryMeasure(attempt + 1), 140)
      }
    }

    const pxPerSecond = () => (window.innerWidth <= 767 ? 45 : 30)

    const tick = (now: number) => {
      if (lastTime == null) lastTime = now
      const dt = Math.max(0, now - lastTime) / 1000
      lastTime = now
      const w = widthRef.current
      if (w > 0) {
        posRef.current = (posRef.current + pxPerSecond() * dt) % w
        track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    tryMeasure()
    raf = requestAnimationFrame(tick)

    const onResize = () => {
      tryMeasure()
      lastTime = null
    }
    window.addEventListener("resize", onResize)
    const ro = new ResizeObserver(() => tryMeasure())
    ro.observe(group)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(retry)
      ro.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <ul className="flex max-w-xl flex-wrap gap-4 text-navy" aria-label="Tools and languages">
        {icons}
      </ul>
    )
  }

  return (
    <div className="marquee-wrapper max-w-xl" aria-label="Tools and languages">
      <div ref={trackRef} className="flex w-max items-center gap-6">
        <div ref={groupRef} className="flex items-center gap-6">
          {icons}
        </div>
        <div className="flex items-center gap-6" aria-hidden>
          {marqueeTechIcons()}
        </div>
      </div>
    </div>
  )
}
