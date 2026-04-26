import {
  EDUCATION,
  EXPERIENCE_TIMELINE,
  experienceUsesEmployerRichBlock,
  PERSON,
  RESUME_PROJECTS,
  type ResumeCaseStudy,
  RESUME_SKILL_ACCENT_IDS,
  RESUME_SUMMARY,
  RESUME_SUMMARY_ACCENT_PHRASE,
  TECH_STACK_ITEMS,
} from "@/content/content"
import { ExperienceHighlightBody } from "@/components/ExperienceHighlightBody"
import { splitResumeAccent } from "@/lib/resume-accent"
import { getSiteUrl } from "@/lib/site-config"
import { ResumeToolbar } from "./ResumeToolbar"

function resumeExperienceBody(entry: (typeof EXPERIENCE_TIMELINE)[number]) {
  return entry.resumeBody ?? entry.body
}

function CaseStudyBlocks({ items, siteUrl }: { items: ResumeCaseStudy[]; siteUrl: string }) {
  return (
    <div className="mt-2 space-y-5 print:mt-1.5 print:space-y-3.5">
      {items.map((item) => {
        const href = `${siteUrl}${item.linkPath}`
        const linkLabel = item.linkPath.startsWith("/notes") ? "Technical note" : "Case study"
        const impactParts = splitResumeAccent(item.impact, item.impactAccentPhrase)
        return (
          <section key={item.title} className="resume-case border-b border-zinc-100 pb-5 last:border-b-0 last:pb-0 print:pb-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug text-zinc-950 sm:text-base print:text-[10.5pt]">{item.title}</h3>
                {item.tag ? (
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500 print:text-[8pt]">{item.tag}</p>
                ) : null}
              </div>
              <a
                href={href}
                className="shrink-0 text-[10px] font-medium text-sky-600 underline decoration-sky-200 underline-offset-2 hover:text-sky-700 print:text-[8pt]"
              >
                {linkLabel} →
              </a>
            </div>
            <p className="resume-case-p mt-2 text-sm leading-snug text-zinc-800 sm:text-[15px] print:mt-1 print:text-[9.5pt]">{item.brief}</p>
            <dl className="mt-2 space-y-2 print:mt-1.5 print:space-y-1">
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500 print:text-[7.5pt]">Challenge</dt>
                <dd className="resume-case-p mt-0.5 text-sm leading-snug text-zinc-800 sm:text-[15px] print:text-[9.5pt]">{item.challenge}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500 print:text-[7.5pt]">Solution</dt>
                <dd className="resume-case-p mt-0.5 text-sm leading-snug text-zinc-800 sm:text-[15px] print:text-[9.5pt]">{item.solution}</dd>
              </div>
              <div>
                <dt className="text-[0.6rem] font-bold uppercase tracking-wider text-zinc-500 print:text-[7.5pt]">Impact</dt>
                <dd className="resume-case-p mt-0.5 text-sm leading-snug text-zinc-800 sm:text-[15px] print:text-[9.5pt]">
                  {impactParts.before}
                  {impactParts.highlight ? (
                    <span className="font-medium text-sky-600 print:text-[9.5pt]">{impactParts.highlight}</span>
                  ) : null}
                  {impactParts.after}
                </dd>
              </div>
            </dl>
          </section>
        )
      })}
    </div>
  )
}

export default function ResumePage() {
  const siteUrl = getSiteUrl()
  const summaryParts = splitResumeAccent(RESUME_SUMMARY, RESUME_SUMMARY_ACCENT_PHRASE)

  return (
    <>
      <ResumeToolbar />
      <div className="resume-root min-h-screen bg-zinc-100 pb-16 pt-44 text-zinc-900 print:bg-white print:pb-0 print:pt-0 md:pt-40">
        <article className="resume-sheet mx-auto max-w-[210mm] bg-white px-6 py-8 shadow-sm print:mx-0 print:max-w-none print:px-0 print:py-0 print:shadow-none md:px-10 md:py-10">
          <header className="pb-2 print:border-zinc-300 print:pb-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">{PERSON.legalName}</h1>
            <p className="mt-0.5 text-sm font-medium text-zinc-600 md:text-base print:text-[10pt]">{PERSON.role}</p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-zinc-700 md:text-sm print:mt-1 print:text-[8.5pt]">
              <li>
                <a className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-950" href={`mailto:${PERSON.email}`}>
                  {PERSON.email}
                </a>
              </li>
              <li>
                <a className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-950" href={`tel:${PERSON.phone.replace(/\s/g, "")}`}>
                  {PERSON.phone}
                </a>
              </li>
              <li>
                <a
                  className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-950"
                  href={`https://github.com/${PERSON.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/{PERSON.githubUsername}
                </a>
              </li>
              <li>
                <a className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-950" href={siteUrl}>
                  {siteUrl.replace(/^https?:\/\//, "")}
                </a>
              </li>
              <li className="text-zinc-600">{PERSON.location}</li>
            </ul>
          </header>

          <section className="resume-section mt-6 print:mt-3">
            <h2 className="resume-h2">Summary</h2>
            <p className="resume-case-p mt-1.5 text-sm leading-snug text-zinc-800 md:text-[15px] print:text-[9.5pt]">
              {summaryParts.before}
              {summaryParts.highlight ? (
                <span className="font-medium text-sky-600 print:text-[9.5pt]">{summaryParts.highlight}</span>
              ) : null}
              {summaryParts.after}
            </p>
          </section>

          <section className="resume-section mt-6 print:mt-3">
            <h2 className="resume-h2">Skills</h2>
            <p className="resume-case-p mt-2 text-sm leading-relaxed text-zinc-800 print:text-[9.5pt]">
              {TECH_STACK_ITEMS.map((s, i) => (
                <span key={s.id}>
                  {i > 0 ? ", " : null}
                  <span className={RESUME_SKILL_ACCENT_IDS.has(s.id) ? "font-medium text-sky-600" : undefined}>{s.label}</span>
                </span>
              ))}
            </p>
          </section>

          <div className="resume-bg-edu-row mt-6 grid grid-cols-1 gap-6 print:mt-3 print:grid-cols-[minmax(0,70%)_minmax(0,30%)] print:gap-x-4 print:gap-y-0">
            <section className="resume-section mt-0 min-w-0 print:mt-0">
              <h2 className="resume-h2">Background</h2>
              <ul className="mt-2 space-y-5 print:mt-1.5 print:space-y-4">
                {EXPERIENCE_TIMELINE.map((entry) => (
                  <li key={entry.period} className="resume-timeline-block">
                    {experienceUsesEmployerRichBlock(entry) && entry.employer ? (
                      <div className="space-y-2 print:space-y-1.5">
                        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm print:text-[9.5pt]">
                          <span className="resume-timeline-date tabular-nums print:text-[8.25pt] print:px-1 print:py-0.5">
                            <span>{entry.period}</span>
                            {entry.durationLabel ? (
                              <span className="resume-timeline-date-muted print:text-[8pt]">· {entry.durationLabel}</span>
                            ) : null}
                          </span>
                          <span className="font-bold text-zinc-400 print:text-[9pt]" aria-hidden>
                            |
                          </span>
                          <a
                            href={entry.employer.url}
                            className="font-bold text-zinc-950 underline decoration-zinc-300 underline-offset-2 print:text-[9.5pt]"
                          >
                            {entry.employer.name}
                          </a>
                        </p>
                        {entry.jobTitle ? (
                          <p className="text-sm font-bold leading-snug text-sky-600 print:text-[9.5pt]">{entry.jobTitle}</p>
                        ) : null}
                        {entry.summaryLead ? (
                          <p className="resume-case-p text-sm italic leading-snug text-zinc-600 print:text-[8.75pt]">{entry.summaryLead}</p>
                        ) : null}
                        {entry.highlights?.length ? (
                          <ul className="list-disc space-y-2 pl-4 text-sm leading-snug text-zinc-800 print:space-y-1.5 print:pl-3.5 print:text-[9.5pt]">
                            {entry.highlights.map((h) => (
                              <li key={h.label}>
                                <span className="font-semibold text-zinc-950">{h.label}</span>{" "}
                                <ExperienceHighlightBody highlight={h} variant="resume" siteUrl={siteUrl} />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="resume-timeline-date tabular-nums print:text-[8.25pt] print:px-1 print:py-0.5">
                              <span>{entry.period}</span>
                              {entry.durationLabel ? (
                                <span className="resume-timeline-date-muted print:text-[8pt]">· {entry.durationLabel}</span>
                              ) : null}
                            </span>
                            {entry.roleTitle ? (
                              <span className="text-sm font-bold text-zinc-950 print:text-[9.5pt]">
                                <span className="font-normal text-zinc-400">|</span> {entry.roleTitle}
                              </span>
                            ) : null}
                          </div>
                          {entry.employer ? (
                            <span className="text-[11px] font-medium text-zinc-600 sm:text-xs print:text-[8.5pt]">
                              Web Developer ·{" "}
                              <a href={entry.employer.url} className="text-zinc-800 underline decoration-zinc-300 underline-offset-2">
                                {entry.employer.name}
                              </a>
                            </span>
                          ) : null}
                        </div>
                        {entry.employer ? (
                          <p className="resume-case-p mt-1 text-sm leading-snug text-zinc-800 print:text-[9.5pt]">{resumeExperienceBody(entry)}</p>
                        ) : entry.highlights?.length ? (
                          <div className="mt-1 space-y-2 print:space-y-1.5">
                            {entry.summaryLead ? (
                              <p className="resume-case-p text-sm italic leading-snug text-zinc-600 print:text-[8.75pt]">{entry.summaryLead}</p>
                            ) : null}
                            <ul className="list-disc space-y-2 pl-4 text-sm leading-snug text-zinc-800 print:space-y-1.5 print:pl-3.5 print:text-[9.5pt]">
                              {entry.highlights.map((h) => (
                                <li key={h.label}>
                                  <span className="font-semibold text-zinc-950">{h.label}</span>{" "}
                                  <ExperienceHighlightBody highlight={h} variant="resume" siteUrl={siteUrl} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="resume-case-p mt-1 text-sm leading-snug text-zinc-800 print:text-[9.5pt]">{resumeExperienceBody(entry)}</p>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-section mt-0 min-w-0 print:mt-0">
              <h2 className="resume-h2">Education</h2>
              <ul className="mt-2 space-y-2 print:mt-1 print:space-y-1">
                {EDUCATION.map((e) => (
                  <li key={e.institution} className="text-sm text-zinc-800 print:text-[9.5pt]">
                    <div className="font-semibold text-zinc-950">
                      {e.credential}
                      {e.note ? <span className="font-normal text-zinc-600"> — {e.note}</span> : null}
                    </div>
                    <div className="text-zinc-700">
                      {e.institution} · {e.years}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="resume-section mt-6 print:mt-3">
            <h2 className="resume-h2">Projects</h2>
            <p className="mt-1 text-xs text-zinc-600 print:hidden">Shipped apps — full case studies on the portfolio.</p>
            <CaseStudyBlocks items={RESUME_PROJECTS} siteUrl={siteUrl} />
          </section>

          {/* <section className="resume-section mt-6 print:mt-3">
            <h2 className="resume-h2">Freelance &amp; client work</h2>
            <p className="resume-case-p mt-1 text-sm leading-snug text-zinc-800 print:text-[9.5pt]">
              Scoped work via{" "}
              <Link href="/" className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2">
                portfolio
              </Link>{" "}
              and{" "}
              <a
                href="https://lokatech.co"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2"
              >
                lokatech.co
              </a>
              .
            </p>
          </section> */}

          {/* <p className="resume-case-p mt-6 border-t border-zinc-100 pt-3 text-xs italic leading-snug text-zinc-600 print:mt-4 print:border-zinc-200 print:pt-2 print:text-[8.5pt]">
            {RESUME_PHILOSOPHY}
          </p> */}
        </article>
      </div>
    </>
  )
}
