"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiDotnet, SiVercel, SiCplusplus, SiGithub } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { FaJava, FaProjectDiagram, FaAngular, FaLaravel, FaPhp, FaWhatsapp, FaInstagram } from "react-icons/fa"
import { BiLogoTypescript, BiLogoGmail } from "react-icons/bi"
// import HeroLines from "@/components/HeroLines"

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // --- Tech icons order used in the marquee ---
  const techIcons = [
    <SiNextdotjs key="next" title="Next.js" className="w-12 h-12" />,
    <SiReact key="react" title="React" className="w-12 h-12" />,
    <SiTailwindcss key="tailwind" title="Tailwind CSS" className="w-12 h-12" />,
    <SiPrisma key="prisma" title="Prisma" className="w-12 h-12" />,
    <SiPostgresql key="pg" title="PostgreSQL" className="w-12 h-12" />,
    <DiNodejs key="dnode" title="Node.js" className="w-12 h-12" />,
    <SiDotnet key="dotnet" title=".NET (C#)" className="w-12 h-12" />,
    <SiVercel key="vercel" title="Vercel" className="w-12 h-12" />,
    <SiCplusplus key="cpp" title="C++" className="w-12 h-12" />,
    <FaJava key="java" title="Java" className="w-12 h-12" />,
    <SiGithub key="github" title="GitHub" className="w-12 h-12" />,
    <FaAngular key="angular" title="Angular" className="w-12 h-12" />,
    <FaLaravel key="laravel" title="Laravel" className="w-12 h-12" />,
    <FaPhp key="php" title="PHP" className="w-12 h-12" />,
    <BiLogoTypescript key="ts" title="TypeScript" className="w-12 h-12" />
  ]

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
  }, [techIcons])

  return (
    <main className="relative">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
          <button onClick={() => scrollTo("home")} className="font-bold text-lg">Nic</button>
          <div className="flex gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`hover:text-sky-500 ${activeSection === link.id ? "text-sky-500 font-semibold" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section id="home" className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center space-y-6 px-4">
        {/* <HeroLines /> */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Hi, I’m Nic — Full Stack Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl font-medium text-gray-800 max-w-3xl"
        >
          I design and develop end-to-end web applications, turning ideas into reliable and user-friendly products.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl"
        >
          My work covers a wide range of systems across different domains, always built with a focus on scalability, usability, and real-world impact.
        </motion.p>

        <div className="flex gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow hover:bg-sky-600 transition"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Contact Me
          </button>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section id="projects" className="py-24 max-w-6xl mx-auto px-4 space-y-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center">Selected Projects</motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Project Task Management System</h3>
            <p className="text-gray-600">A collaborative platform with task assignment, drag-and-drop stages, comments, votes, and dashboards.</p>
            <a
              href="/projects/task-system"
              target="_self"
              rel="noopener noreferrer"
              className="text-sky-500"
            >
              See Details →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Church / Community Management System</h3>
            <p className="text-gray-600">An internal system for event registration, attendance, outing requests, and user administration with role-based access.</p>
            <a
              href="/projects/church-system"
              target="_self"
              rel="noopener noreferrer"
              className="text-sky-500"
            >
              See Details →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">E-commerce System</h3>
            <p className="text-gray-600">A full-stack platform featuring JWT authentication, product catalog, cart & checkout, order management, and an admin dashboard with inventory tracking and reports.</p>
            <a
              href="/projects/ecommerce-system"
              target="_self"
              rel="noopener noreferrer"
              className="text-sky-500"
            >
              See Details →
            </a>
          </motion.div>
        </div>

        <div className="text-center">
          <button onClick={() => scrollTo("about")} className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow">Learn More About Me</button>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section id="about" className="py-24 px-4 bg-gray-50">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</motion.h2>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="relative border-l border-gray-300 pl-6">
            {[
              {
                year: "2020 Oct – 2024 Mar",
                text: "Pursued Software Engineering at University Malaysia Sabah. Self-funded studies while taking on freelance maintenance projects to support tuition."
              },
              {
                year: "2024 Mar – 2025 May",
                text: "Took a break from formal studies to manage family responsibilities. Continued freelancing — mostly system maintenance with some lightweight development, such as a Badminton Court Booking System and an HR Management System."
              },
              {
                year: "2025 Apr – 2025 Sept",
                text: "Designed and built three full-scale systems: a Church Management System, a Project & Task Management System (React, Next.js, Tailwind CSS, Prisma, PostgreSQL), and an Ecommerce Platform (C# .NET Core backend with React/Next.js/Tailwind frontend). Focused on creating scalable, workflow-driven solutions with advanced features like drag-and-drop task flows, voting, audit trails, and smooth backend–frontend integration."
              },
              {
                year: "2025 Oct – Now",
                text: (<>
                  Working as a Web Developer at{" "}
                  <a
                    href="https://www.dataflows.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sky-600"
                  >
                    Data Flows Sdn Bhd
                  </a>
                  . Contributing to various web applications and gaining hands-on
                  experience in a professional development environment.
                </>)
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="mb-8">
                <div className="font-semibold">{item.year}</div>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div className="mt-20 max-w-6xl mx-auto bg-gray-50">
          <h3 className="text-2xl font-semibold text-center mb-6">Tech Stack</h3>

          <div className="relative overflow-hidden p-6 bg-transparent">
            <div className="marquee-wrapper">
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

            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32" style={{ background: "linear-gradient(to right, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32" style={{ background: "linear-gradient(to left, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))" }} />

            <p className="mt-4 text-center text-sm text-gray-600">Core tools I use for building reliable, maintainable web apps.</p>
          </div>

          <style>{`
            .marquee-wrapper { overflow: hidden; }
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
          `}</style>
        </motion.div>

        {/* Personal philosophy */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <motion.p className="italic text-gray-700">
            “I enjoy solving problems with technology and creating tools that help communities work more effectively.
            Outside of coding, I also explore philosophy writing and photography — both of which influence my design thinking and creativity.”
          </motion.p>
        </div>

        <div className="text-center mt-12">
          <button onClick={() => scrollTo("projects")} className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow">View My Work</button>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        onViewportEnter={() => setActiveSection("contact")}
        viewport={{ amount: 0.2 }}
        className="py-24 px-4 max-w-3xl mx-auto text-center space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold"
        >
          Let’s Connect
        </motion.h2>
        <p className="text-gray-600">Enjoy working as a Web Developer in a Supportive and Inspiring company.</p>

        <div className="mt-6 grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:justify-center md:gap-2">
          {/* 'grid grid-cols-2 gap-4' applies on mobile.
            'md:flex md:flex-row ...' overrides it on medium screens and up.
          */}

          <a href="mailto:shiloong53bii@gmail.com" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <BiLogoGmail className="w-8 h-8 text-sky-500" />
            <div className="text-left">
              <div className="text-sm font-semibold">Email</div>
              <div className="text-xs text-gray-600">shiloong53bii@gmail.com</div>
            </div>
          </a>

          <a href="https://github.com/nicholas053" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <SiGithub className="w-8 h-8 text-sky-500" />
            <div className="text-left">
              <div className="text-sm font-semibold">GitHub</div>
              <div className="text-xs text-gray-600">github.com/nicholas053</div>
            </div>
          </a>

          <a href="https://wa.me/+60122657856" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <FaWhatsapp className="w-8 h-8 text-sky-500" />
            <div className="text-left">
              <div className="text-sm font-semibold">WhatsApp</div>
              <div className="text-xs text-gray-600">+60122657856</div>
            </div>
          </a>

          <a href="https://www.instagram.com/nicholas_loong" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <FaInstagram className="w-8 h-8 text-sky-500" />
            <div className="text-left">
              <div className="text-sm font-semibold">Instagram</div>
              <div className="text-xs text-gray-600">nicholas_loong</div>
            </div>
          </a>
        </div>

        {/* This button section is unchanged */}
        <div className="mt-8 px-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition shadow-sm"
          >
            Resume
          </a>
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 rounded-xl bg-sky-500 text-white shadow hover:bg-sky-600 transition"
          >
            View My Work
          </button>
        </div>
      </motion.section>
    </main>
  )
}
