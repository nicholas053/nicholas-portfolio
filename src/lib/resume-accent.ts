/** First occurrence of `highlight` in `source`, for resume/PDF recruiter accents (Tailwind sky-600 in UI). */
export type ResumeAccentParts = {
  before: string
  highlight: string | undefined
  after: string
}

export function splitResumeAccent(source: string, highlight: string | undefined): ResumeAccentParts {
  if (!highlight) {
    return { before: source, highlight: undefined, after: "" }
  }
  const i = source.indexOf(highlight)
  if (i === -1) {
    return { before: source, highlight: undefined, after: "" }
  }
  return {
    before: source.slice(0, i),
    highlight,
    after: source.slice(i + highlight.length),
  }
}
