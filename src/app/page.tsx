"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ExperienceHighlightBody } from "@/components/ExperienceHighlightBody"
import {
  EDUCATION,
  EXPERIENCE_TIMELINE,
  experienceUsesEmployerRichBlock,
  HERO,
  HOME_CONTACT,
  HOME_CTA,
  HOME_LOKATECH,
  HOME_NDA_FEATURE,
  HOME_PHILOSOPHY,
  HOME_PHILOSOPHY_INSTAGRAM_LABEL,
  HOME_PROJECTS,
  HOME_PROJECTS_SECTION_TITLE,
  HOME_TECH_NOTES_INTRO,
  HOME_WORKFLOW,
  LOKATECH,
  PERSON,
  TECH_STACK_MARQUEE_CAPTION,
} from "@/content/content"
import { marqueeTechIcons } from "@/content/tech-stack-marquee"
import { FaProjectDiagram, FaWhatsapp, FaLock, FaUsers, FaCode } from "react-icons/fa"
import { BiLogoGmail } from "react-icons/bi"
import { SiGithub } from "react-icons/si"
// import HeroLines from "@/components/HeroLines"

const WORKFLOW_ICONS = {
  users: FaUsers,
  diagram: FaProjectDiagram,
  code: FaCode,
} as const

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  // Scroll listener to update navbar highlight
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ["home", "projects", "about", "contact"]
  //     const scrollY = window.scrollY + 200
  //     for (const id of sections) {
  //       const el = document.getElementById(id)
  //       if (el && el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
  //         setActiveSection(id)
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  useEffect(() => {
    const sections = ["home", "projects", "about", "contact"]

    const handleScroll = () => {
      // Check if it is at the bottom of the page
      // (window.innerHeight + window.scrollY) is the position of the bottom of the viewport
      // document.body.offsetHeight is the total height of the page
      // We use a 50px buffer just to be safe
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50

      if (atBottom) {
        setActiveSection("contact")
        return
      }

      // If not at the bottom, find the section in the middle of the screen
      // window.scrollY + (window.innerHeight / 2) is the exact middle of the viewport
      const triggerPoint = window.scrollY + window.innerHeight / 2

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          // Check if the middle of the viewport is *within* this section's boundaries
          if (triggerPoint >= offsetTop && triggerPoint < (offsetTop + offsetHeight)) {
            setActiveSection(id)
            return // Found the correct section, no need to check others
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Run it once on load to set the initial state
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const techIcons = useMemo(() => marqueeTechIcons(), [])

  // Refs for marquee
  const trackRef = useRef<HTMLDivElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const posRef = useRef(0) // positive position in px (float)
  const groupWidthRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const measuringRetryRef = useRef<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    const measure = () => {
      // Try to measure the distance from the left edge of the first group
      // to the left edge of the second group. This includes any gap between groups
      // and ensures wrapping doesn't jump by the gap amount.
      const next = group.nextElementSibling as HTMLElement | null
      if (next) {
        const rect1 = group.getBoundingClientRect()
        const rect2 = next.getBoundingClientRect()
        // distance between left edges (includes gap)
        const w = Math.max(0, rect2.left - rect1.left);
        groupWidthRef.current = w
      } else {
        const groupWidth = group.getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

        groupWidthRef.current = groupWidth + gap;
      }

      // ensure pos inside [0, w)
      const w = groupWidthRef.current
      if (w > 0) {
        // keep pos within range to avoid huge numbers over time
        posRef.current = posRef.current % w
        if (posRef.current < 0) posRef.current += w
      }
    }

    // If icons/fonts/SVG still rendering, measurement may be zero;
    // try a few times with small delay.
    const tryMeasure = (attempt = 0) => {
      measure()
      // increase attempts a bit to handle font/SVG late load
      if (groupWidthRef.current === 0 && attempt < 8) {
        measuringRetryRef.current = window.setTimeout(() => tryMeasure(attempt + 1), 140)
      }
    }

    tryMeasure()

    const isMobile = () => window.innerWidth <= 767
    // speed in pixels per second
    const pxPerSecond = () => (isMobile() ? 45 : 30)

    const tick = (now: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = now
      const dt = Math.max(0, now - lastTimeRef.current) / 1000
      lastTimeRef.current = now

      const w = groupWidthRef.current
      // if width unknown, skip moving (keeps elements visible)
      if (w > 0) {
        // increase pos, wrap with modulo
        posRef.current = (posRef.current + pxPerSecond() * dt)
        // keep pos in [0, w)
        if (posRef.current >= w) posRef.current = posRef.current % w

        // IMPORTANT: do not round to integer pixels -> use sub-pixel translate for smoothness
        const x = -posRef.current
        if (track) {
          // ensure we let the browser composite this on its own (GPU-accelerated)
          track.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    // recompute on resize/orientation changes
    const onResize = () => {
      // re-measure
      tryMeasure()
      lastTimeRef.current = null
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)

    const ro = new ResizeObserver(() => {
      tryMeasure()
    })
    ro.observe(group)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (measuringRetryRef.current) clearTimeout(measuringRetryRef.current)
      ro.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
    }
  }, [techIcons.length])

  return (
    <main className="relative">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          <button onClick={() => scrollTo("home")} className="font-bold text-lg text-navy">Nic</button>
          <div className="flex items-center gap-4 sm:gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`transition-colors hover:text-navy ${
                  activeSection === link.id
                    ? "text-navy font-semibold underline decoration-mist underline-offset-4"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section id="home"
        // onViewportEnter={() => setActiveSection("home")}
        // viewport={{ margin: "-40% 0px -40% 0px" }}
        className="bg-background min-h-screen flex flex-col justify-center items-center text-center space-y-6 px-4">
        {/* <HeroLines /> */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-navy"
        >
          <span className="block">{HERO.greeting}</span>
          <span className="mt-2 block text-2xl font-semibold md:text-4xl">{HERO.roleLine}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl font-medium text-navy max-w-3xl"
        >
          {HERO.lead}
        </motion.p>

        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl"
        >
          My work covers a wide range of systems across different domains, always built with a focus on scalability, usability, and real-world impact.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.55 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="mx-auto grid w-max max-w-[min(100%-1.5rem,19rem)] grid-cols-2 gap-2 sm:max-w-none sm:w-auto sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="order-1 inline-flex min-h-[2.75rem] w-full min-w-0 items-center justify-center self-stretch rounded-xl border border-transparent bg-navy px-3 py-2.5 text-center text-xs font-medium leading-tight text-cream shadow transition hover:bg-navy-hover sm:order-1 sm:min-h-[3rem] sm:w-auto sm:justify-self-auto sm:px-5 sm:py-3 sm:text-base sm:leading-normal"
            >
              {HOME_CTA.seeProjects}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="order-2 inline-flex min-h-[2.75rem] w-full min-w-0 items-center justify-center self-stretch rounded-xl border border-border bg-card px-3 py-2.5 text-center text-xs font-medium leading-tight text-navy transition hover:bg-muted sm:order-3 sm:min-h-[3rem] sm:w-auto sm:justify-self-auto sm:px-5 sm:py-3 sm:text-base sm:leading-normal"
            >
              {HOME_CTA.contact}
            </button>
            <Link
              href="/notes"
              className="order-3 col-span-2 inline-flex min-h-[2.75rem] w-full items-center justify-center whitespace-nowrap rounded-xl border border-border bg-card px-3 py-2.5 text-center text-xs font-medium leading-tight text-navy transition hover:bg-muted sm:order-2 sm:col-span-1 sm:min-h-[3rem] sm:w-auto sm:px-5 sm:py-3 sm:text-base sm:leading-normal"
            >
              {HOME_CTA.technicalNotes}
            </Link>
          </div>
          <p className="max-w-md text-center text-xs text-muted-foreground dark:text-muted-foreground">
            {HERO.notesHint}
          </p>
        </motion.div>
      </motion.section>

      <motion.section className="py-20 bg-muted px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy">{HOME_WORKFLOW.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 relative">
            {HOME_WORKFLOW.steps.map((step) => {
              const Icon = WORKFLOW_ICONS[step.icon]
              return (
                <div key={step.title} className="flex flex-row md:flex-col items-start gap-4 md:gap-0 md:p-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-mist/40 text-navy rounded-lg flex items-center justify-center text-xl md:text-2xl md:mb-4 mt-1 md:mt-0 dark:bg-mist/25">
                    <Icon />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-navy">{step.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section id="projects"
        // onViewportEnter={() => setActiveSection("projects")}
        // viewport={{ margin: "-40% 0px -40% 0px" }}
        className="py-24 max-w-6xl mx-auto px-4 space-y-12 bg-background">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center">{HOME_PROJECTS_SECTION_TITLE}</motion.h2>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
          <div className="flex flex-col items-start gap-5 p-5 md:flex-row md:gap-8 md:p-6">
            <div className="shrink-0 space-y-2 md:max-w-[220px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-mist/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground dark:bg-surface">
                <FaLock className="text-muted-foreground" aria-hidden /> {HOME_NDA_FEATURE.badge}
              </div>
              <h3 className="text-lg font-bold leading-snug text-navy md:text-xl">
                {HOME_NDA_FEATURE.title}
              </h3>
              <p className="text-xs font-medium text-muted-foreground dark:text-muted-foreground md:text-sm">
                {HOME_NDA_FEATURE.role}
              </p>
            </div>

            <div className="min-w-0 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground">
              <p>{HOME_NDA_FEATURE.body}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-mist pt-3 text-sm dark:border-mist/50">
                <Link
                  href={HOME_NDA_FEATURE.financeNoteHref}
                  className="font-semibold text-navy hover:underline dark:text-mist"
                >
                  {HOME_NDA_FEATURE.financeNoteLabel}
                </Link>
                <Link href="/notes" className="font-medium text-muted-foreground hover:underline">
                  All technical notes →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-8 hide-scrollbar -mx-4 px-4 md:mx-0 md:flex-wrap md:justify-center md:gap-8 md:overflow-visible md:px-0"
        >
          {HOME_PROJECTS.map((project) => (
            <div
              key={project.linkPath}
              className="flex w-[85%] shrink-0 snap-center flex-col portfolio-card sm:w-[60%] md:w-[45%] lg:w-[30%]"
            >
              <div className="flex-grow space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <Link href={project.linkPath} className="text-navy font-medium mt-6 inline-block hover:underline dark:text-mist">
                {project.linkLabel}
              </Link>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section id="about"
        // onViewportEnter={() => setActiveSection("about")}
        // viewport={{ margin: "-40% 0px -40% 0px" }}
        className="py-24 px-4 bg-muted">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</motion.h2>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="relative border-l border-mist pl-6">
            {EXPERIENCE_TIMELINE.map((item, i) => (
              <motion.div key={item.period} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="mb-8">
                {!experienceUsesEmployerRichBlock(item) ? (
                  <div className="font-bold text-navy">
                    {item.roleTitle ? (
                      <>
                        {item.period}
                        {item.durationLabel ? (
                          <span className="font-normal text-muted-foreground dark:text-muted-foreground"> · {item.durationLabel}</span>
                        ) : null}{" "}
                        <span className="font-normal text-muted-foreground dark:text-muted-foreground">|</span> {item.roleTitle}
                      </>
                    ) : (
                      <>
                        {item.period}
                        {item.durationLabel ? (
                          <span className="font-normal text-muted-foreground dark:text-muted-foreground"> · {item.durationLabel}</span>
                        ) : null}
                      </>
                    )}
                  </div>
                ) : null}
                {item.employer && experienceUsesEmployerRichBlock(item) ? (
                  <div className="space-y-3 text-muted-foreground dark:text-muted-foreground">
                    <p className="flex flex-wrap items-baseline gap-x-1.5 text-base text-navy">
                      <span className="font-bold text-navy">
                        {item.period}
                        {item.durationLabel ? (
                          <span className="font-normal text-muted-foreground dark:text-muted-foreground"> · {item.durationLabel}</span>
                        ) : null}
                      </span>
                      <span className="select-none font-normal text-muted-foreground dark:text-muted-foreground" aria-hidden>
                        |
                      </span>
                      <a
                        href={item.employer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-navy hover:text-navy-hover"
                      >
                        {item.employer.name}
                      </a>
                    </p>
                    {item.jobTitle ? (
                      <p className="text-sm font-bold leading-snug text-navy">{item.jobTitle}</p>
                    ) : null}
                    {item.summaryLead ? <p className="italic leading-relaxed">{item.summaryLead}</p> : null}
                    {item.highlights?.length ? (
                      <ul className="list-disc space-y-3 pl-5 leading-relaxed">
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
                  <p className="mt-1 text-muted-foreground dark:text-muted-foreground">
                    Web Developer at{" "}
                    <a
                      href={item.employer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy dark:text-mist"
                    >
                      {item.employer.name}
                    </a>
                    . {item.body}
                  </p>
                ) : item.highlights?.length ? (
                  <div className="mt-2 space-y-3 text-muted-foreground dark:text-muted-foreground">
                    {item.summaryLead ? <p className="italic leading-relaxed">{item.summaryLead}</p> : null}
                    <ul className="list-disc space-y-3 pl-5">
                      {item.highlights
                        .filter((h) => h.label !== "Tech Stack:")
                        .map((h) => (
                        <li key={h.label} className="leading-relaxed">
                          <span className="font-semibold text-navy">{h.label}</span>{" "}
                          <ExperienceHighlightBody highlight={h} variant="home" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-1 text-muted-foreground dark:text-muted-foreground">{item.body}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-navy md:text-xl">Education</h3>
            <ul className="mt-4 space-y-3 border-l border-mist pl-6">
              {EDUCATION.map((e) => (
                <li key={e.institution} className="text-muted-foreground">
                  <span className="font-semibold text-navy">{e.credential}</span>
                  {e.note ? <span className="text-muted-foreground"> — {e.note}</span> : null}
                  <div className="text-sm">
                    {e.institution} · {e.years}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <h3 className="text-lg font-bold text-navy md:text-xl">Technical notes</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
              {HOME_TECH_NOTES_INTRO}
            </p>
            <ul className="mt-4 space-y-3 border-l border-mist pl-4 text-sm leading-relaxed text-muted-foreground dark:border-mist/50 dark:text-muted-foreground md:text-base">
              <li>
                <Link
                  href="/notes/flexible-financial-settlement"
                  className="font-semibold text-navy hover:underline dark:text-mist"
                >
                  Flexible financial settlement
                </Link>
                <span className="text-muted-foreground dark:text-muted-foreground"> — </span>
                Finance “shopping cart” batches, consolidated payment vouchers, commission states (NDA).
              </li>
              <li>
                <Link href="/notes/performance-evaluation-360" className="font-semibold text-navy hover:underline dark:text-mist">
                  360° performance evaluation
                </Link>
                <span className="text-muted-foreground dark:text-muted-foreground"> — </span>
                Assignment engine, JSONB, tokenized partner API, schema-driven Angular + mobile Likert layouts.
              </li>
              <li>
                <Link
                  href="/notes/frontend-architecture-refactoring"
                  className="font-semibold text-navy hover:underline dark:text-mist"
                >
                  Frontend architecture refactoring
                </Link>
                <span className="text-muted-foreground dark:text-muted-foreground"> — </span>
                Unified dynamic forms, shared library, RBAC across admin and agent portals.
              </li>
              <li>
                <Link href="/notes/fullstack-assessment-debugging" className="font-semibold text-navy hover:underline dark:text-mist">
                  Full-stack assessment reflection
                </Link>
                <span className="text-muted-foreground dark:text-muted-foreground"> — </span>
                Pooling, infinite scroll stability, a live merge-order bug, and a transparent post-interview follow-up.
              </li>
            </ul>
            <p className="mt-5 text-sm">
              <Link href="/notes" className="font-semibold text-navy hover:underline dark:text-mist">
                All technical notes →
              </Link>
            </p>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <h3 className="text-lg font-bold text-navy md:text-xl">{HOME_LOKATECH.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
              {HOME_LOKATECH.body}
            </p>
            <a
              href={LOKATECH.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline md:text-base dark:text-mist"
            >
              {HOME_LOKATECH.linkLabel}
            </a>
          </motion.div> */}
        </div>

        {/* Tech Stack Section */}
        <motion.div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">Tech Stack</h3>

          <div className="overflow-hidden p-6">
            <div className="marquee-wrapper mx-auto max-w-2xl md:max-w-3xl">
              <div
                ref={trackRef}
                className="marquee-track flex items-center gap-8 will-change-transform"
                style={{ transform: "translate3d(0,0,0)" } as any}
              >
                <div ref={groupRef} className="marquee-group flex items-center gap-8">
                  {techIcons.map((icon, idx) => (
                    <div key={`g1-${idx}`} className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                      {icon}
                    </div>
                  ))}
                </div>

                <div className="marquee-group flex items-center gap-8">
                  {techIcons.map((icon, idx) => (
                    <div key={`g2-${idx}`} className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">{TECH_STACK_MARQUEE_CAPTION}</p>
          </div>

          <style>{`
            .marquee-wrapper {
              overflow: hidden;
              -webkit-mask-image: linear-gradient(
                to right,
                transparent,
                black 1.25rem,
                black calc(100% - 1.25rem),
                transparent
              );
              mask-image: linear-gradient(
                to right,
                transparent,
                black 1.25rem,
                black calc(100% - 1.25rem),
                transparent
              );
            }
            @media (min-width: 768px) {
              .marquee-wrapper {
                -webkit-mask-image: linear-gradient(
                  to right,
                  transparent,
                  black 2.5rem,
                  black calc(100% - 2.5rem),
                  transparent
                );
                mask-image: linear-gradient(
                  to right,
                  transparent,
                  black 2.5rem,
                  black calc(100% - 2.5rem),
                  transparent
                );
              }
            }
            .marquee-track { display:flex; align-items:center; gap:2rem; 
                             /* GPU/compose hints to reduce flicker/jank */
                             backface-visibility: hidden;
                             transform-style: preserve-3d;
                             will-change: transform;
                           }
            .marquee-track > .marquee-group > div { background: transparent; display:flex; align-items:center; justify-content:center; }
            @media (max-width: 420px) {
              .marquee-track > .marquee-group > div { width:56px; height:56px; }
            }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </motion.div>

        {/* Personal philosophy */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <motion.p className="italic text-muted-foreground">{HOME_PHILOSOPHY}</motion.p>
          <p className="mt-3 text-sm text-muted-foreground">
            <a
              href={`https://www.instagram.com/${PERSON.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-navy hover:underline dark:text-mist"
            >
              {HOME_PHILOSOPHY_INSTAGRAM_LABEL}
            </a>
            {" "}(@{PERSON.instagramHandle})
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        // onViewportEnter={() => setActiveSection("contact")}
        // viewport={{ margin: "-30% 0px -30% 0px" }}
        className="py-24 px-4 max-w-3xl mx-auto text-center space-y-6 bg-background"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold"
        >
          Let’s Connect
        </motion.h2>
        <p className="text-muted-foreground">{HOME_CONTACT.lead}</p>

        {/* <div className="mx-auto max-w-xl rounded-2xl border border-mist bg-cream px-5 py-4 text-left shadow-sm dark:border-mist/50 dark:bg-surface/40">
          <p className="text-sm font-semibold text-navy">
            Hiring for a client or product?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground">
            I operate my independent business through{" "}
            <span className="text-navy dark:text-mist font-medium">LokaTech</span>
            . For services, scope, and how we can work together, open the site below.
          </p>
          <a
            href="https://lokatech.co"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline dark:text-mist"
          >
            lokatech.co →
          </a>
        </div> */}

        <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <a href={`mailto:${PERSON.email}`} className="w-full sm:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <BiLogoGmail className="w-8 h-8 text-navy flex-shrink-0" />
            <div className="text-left">
              <div className="text-sm font-semibold">Gmail</div>
              <div className="text-xs text-muted-foreground">{PERSON.email.split("@")[0]}</div>
            </div>
          </a>

          <a href={`https://github.com/${PERSON.githubUsername}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <SiGithub className="w-8 h-8 text-navy flex-shrink-0" />
            <div className="text-left">
              <div className="text-sm font-semibold">GitHub</div>
              <div className="text-xs text-muted-foreground">{PERSON.githubUsername}</div>
            </div>
          </a>

          <a href={`https://wa.me/${PERSON.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <FaWhatsapp className="w-8 h-8 text-navy flex-shrink-0" />
            <div className="text-left">
              <div className="text-sm font-semibold">WhatsApp</div>
              <div className="text-xs text-muted-foreground">{PERSON.phone}</div>
            </div>
          </a>
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 px-6 sm:flex-row sm:flex-wrap sm:items-center sm:px-10">
          <Link
            href="/resume"
            className="px-6 py-3 rounded-xl bg-mist/50 text-center hover:bg-mist transition shadow-sm text-navy"
          >
            {HOME_CTA.resume}
          </Link>
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 rounded-xl bg-navy text-center text-cream shadow hover:bg-navy-hover transition"
          >
            {HOME_CTA.seeProjects}
          </button>
        </div>
      </motion.section>
    </main>
  )
}
