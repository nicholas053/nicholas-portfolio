"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExperienceHighlightBody } from "@/components/ExperienceHighlightBody"
import { TechStackMarquee } from "@/components/TechStackMarquee"
import {
  EDUCATION,
  EXPERIENCE_TIMELINE,
  experienceUsesEmployerRichBlock,
  HERO,
  HOME_CONTACT,
  HOME_CTA,
  HOME_NDA_BANNERS,
  HOME_PHILOSOPHY,
  HOME_PHILOSOPHY_INSTAGRAM_LABEL,
  HOME_PROJECTS,
  HOME_PROJECTS_SECTION_TITLE,
  HOME_TECH_NOTE_LINKS,
  HOME_TECH_NOTES_INTRO,
  HOME_WORKFLOW,
  PERSON,
} from "@/content/content"
import { BiLogoGmail } from "react-icons/bi"
import { FaWhatsapp } from "react-icons/fa"
import { SiGithub } from "react-icons/si"

const sectionClass = "px-6 py-16 md:py-24"
const columnClass = "mx-auto max-w-3xl"
const headingClass = "text-2xl font-semibold tracking-tight text-navy md:text-3xl"

type WorkLink = { href: string; label: string; tone?: "primary" | "muted" }

const workRows: {
  key: string
  title: string
  description: string
  stack: string
  badge?: string
  links: readonly WorkLink[]
}[] = [
  ...HOME_PROJECTS.map((project) => ({
    key: project.linkPath,
    title: project.title,
    description: project.description,
    stack: project.stack,
    badge: project.badge,
    links: [{ href: project.linkPath, label: project.linkLabel }],
  })),
  ...HOME_NDA_BANNERS.map((banner) => ({
    key: banner.title,
    title: banner.title,
    description: banner.body,
    stack: banner.stack,
    badge: banner.badge,
    links: banner.links ?? [],
  })),
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const hash = window.location.hash
    const targetId = hash === "#projects" || hash === "#technical-notes" ? hash.slice(1) : null
    if (!targetId) return
    document.getElementById(targetId)?.scrollIntoView()
    setActiveSection("projects")
    const frame = window.requestAnimationFrame(() => {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      )
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const sections = ["home", "projects", "about", "contact"]

    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
      if (atBottom) {
        setActiveSection("contact")
        return
      }

      const triggerPoint = window.scrollY + window.innerHeight / 2
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (triggerPoint >= offsetTop && triggerPoint < offsetTop + offsetHeight) {
          setActiveSection(id)
          return
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/90 px-6 backdrop-blur-sm">
        <div className={`${columnClass} flex items-center justify-between px-0 py-3`}>
          <button onClick={() => scrollTo("home")} className="font-medium text-navy">
            Nic
          </button>
          <div className="flex items-center gap-4 sm:gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm transition-colors ${
                  activeSection === link.id
                    ? "text-[var(--accent-token)] underline decoration-[var(--accent-token)] underline-offset-4"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="flex min-h-dvh items-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={columnClass}
        >
          <p className="font-mono text-xs tracking-wide text-[var(--accent-token)]">{HERO.roleLine}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy md:text-6xl">
            {HERO.greeting}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{HERO.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollTo("projects")} className="btn-primary">
              {HOME_CTA.seeProjects}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="rounded-md border border-border px-5 py-2 text-sm font-medium text-navy transition hover:bg-muted"
            >
              {HOME_CTA.contact}
            </button>
            <Link
              href="/notes"
              className="rounded-md border border-border px-5 py-2 text-sm font-medium text-navy transition hover:bg-muted"
            >
              {HOME_CTA.technicalNotes}
            </Link>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{HERO.notesHint}</p>
        </motion.div>
      </section>

      <section className={sectionClass}>
        <div className={columnClass}>
          <h2 className={headingClass}>{HOME_WORKFLOW.title}</h2>
          <ol className="mt-8 space-y-8">
            {HOME_WORKFLOW.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className={sectionClass}>
        <div className={columnClass}>
          <h2 className={headingClass}>{HOME_PROJECTS_SECTION_TITLE}</h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {workRows.map((row) => (
              <li key={row.key} className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
                <div>
                  {row.badge ? (
                    <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {row.badge}
                    </p>
                  ) : null}
                  <h3 className="text-lg font-semibold text-navy">{row.title}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{row.description}</p>
                  {row.links.length ? (
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {row.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={
                            link.tone === "muted"
                              ? "text-muted-foreground hover:underline"
                              : "text-[var(--accent-token)] hover:underline"
                          }
                        >
                          {link.label}
                        </Link>
                      ))}
                    </p>
                  ) : null}
                </div>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground md:pt-1 md:text-right md:whitespace-nowrap">
                  {row.stack}
                </p>
              </li>
            ))}
          </ul>

          <div id="technical-notes" className="mt-12 scroll-mt-24">
            <h3 className="text-lg font-semibold text-navy">Technical notes</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{HOME_TECH_NOTES_INTRO}</p>
            <ul className="mt-4 space-y-2 border-l border-border pl-4 text-sm">
              {HOME_TECH_NOTE_LINKS.map((note) => (
                <li key={note.href} className={note.featureOnMobile ? undefined : "hidden md:list-item"}>
                  <Link href={note.href} className="text-navy hover:text-[var(--accent-token)]">
                    {note.title}
                  </Link>
                  <span className="hidden text-muted-foreground md:inline"> — {note.blurb}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/notes" className="text-[var(--accent-token)] hover:underline">
                All technical notes →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="about" className={sectionClass}>
        <div className={`${columnClass} space-y-12`}>
          <h2 className={headingClass}>About</h2>

          <div className="space-y-10 border-l border-border pl-5">
            {EXPERIENCE_TIMELINE.map((item) => (
              <div key={item.period}>
                {!experienceUsesEmployerRichBlock(item) ? (
                  <div className="text-navy">
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period}
                      {item.durationLabel ? ` · ${item.durationLabel}` : ""}
                    </span>
                    {item.roleTitle ? <span className="mt-1 block font-medium">{item.roleTitle}</span> : null}
                  </div>
                ) : null}

                {item.employer && experienceUsesEmployerRichBlock(item) ? (
                  <div className="space-y-2 text-muted-foreground">
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.period}
                      {item.durationLabel ? ` · ${item.durationLabel}` : ""}
                    </p>
                    <p className="font-medium text-navy">
                      {item.employer.url ? (
                        <a
                          href={item.employer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--accent-token)]"
                        >
                          {item.employer.name}
                        </a>
                      ) : (
                        item.employer.name
                      )}
                    </p>
                    {item.jobTitle ? <p className="text-sm text-[var(--accent-token)]">{item.jobTitle}</p> : null}
                    {item.summaryLead ? <p className="max-w-xl leading-relaxed">{item.summaryLead}</p> : null}
                    {item.highlights?.length ? (
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                        {item.highlights
                          .filter((h) => h.label !== "Tech Stack:")
                          .map((h) => (
                            <li key={h.label}>
                              <span className="text-navy">{h.label}</span>{" "}
                              <ExperienceHighlightBody highlight={h} variant="home" />
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </div>
                ) : item.employer ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Web Developer at{" "}
                    {item.employer.url ? (
                      <a href={item.employer.url} target="_blank" rel="noopener noreferrer" className="text-navy hover:text-[var(--accent-token)]">
                        {item.employer.name}
                      </a>
                    ) : (
                      <span className="text-navy">{item.employer.name}</span>
                    )}
                    . {item.body}
                  </p>
                ) : item.highlights?.length ? (
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {item.summaryLead ? <p className="max-w-xl">{item.summaryLead}</p> : null}
                    <ul className="list-disc space-y-2 pl-5">
                      {item.highlights
                        .filter((h) => h.label !== "Tech Stack:")
                        .map((h) => (
                          <li key={h.label}>
                            <span className="font-medium text-navy">{h.label}</span>{" "}
                            <ExperienceHighlightBody highlight={h} variant="home" />
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-navy">Education</h3>
            <ul className="mt-4 space-y-3 border-l border-border pl-5 text-sm text-muted-foreground">
              {EDUCATION.map((e) => (
                <li key={e.institution}>
                  <span className="font-medium text-navy">{e.credential}</span>
                  {e.note ? <span> — {e.note}</span> : null}
                  <div className="font-mono text-xs">
                    {e.institution} · {e.years}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <TechStackMarquee />

          <div className="max-w-xl">
            <p className="leading-relaxed text-muted-foreground">{HOME_PHILOSOPHY}</p>
            <p className="mt-3 text-sm">
              <a
                href={`https://www.instagram.com/${PERSON.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent-token)] hover:underline"
              >
                {HOME_PHILOSOPHY_INSTAGRAM_LABEL}
              </a>
              <span className="text-muted-foreground"> (@{PERSON.instagramHandle})</span>
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 md:py-24">
        <div className={columnClass}>
          <h2 className={headingClass}>Contact</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{HOME_CONTACT.lead}</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <a href={`mailto:${PERSON.email}`} className="inline-flex items-center gap-3 text-navy hover:text-[var(--accent-token)]">
                <BiLogoGmail className="h-4 w-4" aria-hidden />
                {PERSON.email}
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${PERSON.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-navy hover:text-[var(--accent-token)]"
              >
                <SiGithub className="h-4 w-4" aria-hidden />
                github.com/{PERSON.githubUsername}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${PERSON.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-navy hover:text-[var(--accent-token)]"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                {PERSON.phone}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/resume" className="rounded-md border border-border px-5 py-2 text-sm font-medium text-navy hover:bg-muted">
              {HOME_CTA.resume}
            </Link>
            <button type="button" onClick={() => scrollTo("projects")} className="btn-primary text-sm">
              {HOME_CTA.seeProjects}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
