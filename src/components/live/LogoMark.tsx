"use client"

import { useEffect, useRef } from "react"

const REPLAY_MS = 10_000

/** Signature wordmark 01a. Stroke draws, then fills; a sage swoosh and dot follow. */
export function LogoMark() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const fit = () => {
      const text = svg.querySelector("text")
      const swoosh = svg.querySelector(".sw")
      const dot = svg.querySelector(".d")
      if (!text || !swoosh || !dot) return
      const w = text.getComputedTextLength()
      swoosh.setAttribute("d", `M8 52 C${w * 0.5} 46 ${w * 0.9} 46 ${w + 6} 38`)
      dot.setAttribute("cx", String(w + 12))
      dot.setAttribute("cy", "34")
    }

    const replay = () => {
      fit()
      if (reduced) return
      svg.getAnimations({ subtree: true }).forEach((anim) => {
        anim.cancel()
        anim.play()
      })
    }

    let timer = 0
    const start = () => {
      replay()
      if (!reduced) timer = window.setInterval(replay, REPLAY_MS)
    }

    void document.fonts.ready.then(start)
    window.addEventListener("resize", fit)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener("resize", fit)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="v01a"
      height="48"
      viewBox="0 0 120 60"
      width="96"
    >
      <text x="4" y="42">
        Nic
      </text>
      <path className="sw" d="" />
      <circle className="d" cx="0" cy="0" r="3" />
    </svg>
  )
}
