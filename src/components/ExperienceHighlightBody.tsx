import Link from "next/link"
import type { ExperienceHighlight } from "@/content/content"
import { splitResumeAccent } from "@/lib/resume-accent"

type Props = {
  highlight: ExperienceHighlight
  /** `resume`: absolute URL for print/PDF-friendly links */
  variant: "home" | "resume"
  siteUrl?: string
}

const resumeAccentClass = "font-medium text-sky-600 print:text-[9pt]"

/** Body copy plus optional inline link to a technical note (e.g. Data Flows bullets). */
export function ExperienceHighlightBody({ highlight: h, variant, siteUrl = "" }: Props) {
  const accentPhrase = variant === "resume" ? h.resumeAccentPhrase : undefined
  const { before, highlight, after } = splitResumeAccent(h.body, accentPhrase)

  const bodyEl = (
    <>
      {before}
      {highlight ? <span className={resumeAccentClass}>{highlight}</span> : null}
      {after}
    </>
  )

  if (!h.technicalNotePath) {
    return bodyEl
  }

  const href = variant === "resume" ? `${siteUrl}${h.technicalNotePath}` : h.technicalNotePath
  const linkClass =
    variant === "resume"
      ? "whitespace-nowrap font-medium text-sky-600 underline decoration-sky-200 underline-offset-2 print:text-[8.75pt]"
      : "whitespace-nowrap font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"

  return (
    <>
      {bodyEl}{" "}
      {variant === "home" ? (
        <Link href={h.technicalNotePath} className={linkClass}>
          See full →
        </Link>
      ) : (
        <a href={href} className={linkClass}>
          See full →
        </a>
      )}
    </>
  )
}
