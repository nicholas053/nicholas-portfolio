"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiDotnet, SiVercel, SiCplusplus, SiGithub } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { FaJava, FaProjectDiagram } from "react-icons/fa"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  // Scroll listener to update navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "about", "contact"]
      const scrollY = window.scrollY + 200
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
          setActiveSection(id)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        const w = Math.ceil(Math.max(0, rect2.left - rect1.left))
        groupWidthRef.current = w
      } else {
        // fallback: width of single group
        const w = Math.ceil(group.getBoundingClientRect().width)
        groupWidthRef.current = w
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
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center space-y-6 px-4">
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
          I design and build web applications that help teams collaborate effectively and communities stay connected.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl"
        >
          My work spans across different domains — such as project & task management systems and church/community management platforms — always with a focus on scalability, usability, and real-world impact.
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
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 max-w-6xl mx-auto px-4 space-y-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center">Selected Projects</motion.h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Project Task Management System</h3>
            <p className="text-gray-600">A collaborative platform with task assignment, drag-and-drop stages, comments, votes, and dashboards.</p>
            <a 
              href="/projects/task-system" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-500"
            >
              See Details →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Church / Community Management System</h3>
            <p className="text-gray-600">An internal system for event registration, attendance, outing requests, and user administration with role-based access.</p>
            <a 
              href="/projects/church-system" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-500"
            >
              See Details →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="w-full md:w-[45%] lg:w-[30%] rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">E-commerce System</h3>
            <p className="text-gray-600">A full-stack platform featuring JWT authentication, product catalog, cart & checkout, order management, and an admin dashboard with inventory tracking and reports.</p>
            <a 
              href="/projects/ecommerce-system" 
              target="_blank" 
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
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 px-4">
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
                year: "2025 Apr – Now",
                text: "Designed and built three full-scale systems: a Church Management System, a Project & Task Management System (React, Next.js, Tailwind CSS, Prisma, PostgreSQL), and an Ecommerce Platform (C# .NET Core backend with React/Next.js/Tailwind frontend). Focused on creating scalable, workflow-driven solutions with advanced features like drag-and-drop task flows, voting, audit trails, and smooth backend–frontend integration."
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
        <div className="mt-20 max-w-6xl mx-auto">
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

            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32" style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32" style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

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
        </div>

        {/* Personal philosophy */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="italic text-gray-700">
            “I enjoy solving problems with technology and creating tools that help communities work more effectively.
            Outside of coding, I also explore philosophy writing and photography — both of which influence my design thinking and creativity.”
          </p>
        </div>

        <div className="text-center mt-12">
          <button onClick={() => scrollTo("projects")} className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow">View My Work</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 max-w-3xl mx-auto text-center space-y-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold">Let’s Connect</motion.h2>
        <p className="text-gray-600">Open to freelance projects, job opportunity as junior developer, and collaborations.</p>

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-center gap-6">
          <a href="mailto:shiloong53bii@gmail.com" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 6.5V8.5L12 13 3 8.5V6.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-left">
              <div className="text-sm font-semibold">Email</div>
              <div className="text-xs text-gray-600">shiloong53bii@gmail.com</div>
            </div>
          </a>

          <a href="https://wa.me/+60122657856" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a4 4 0 0 1-4 4H8l-4 2 1-4A7 7 0 0 1 17 6a7 7 0 0 1 4 9z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-left">
              <div className="text-sm font-semibold">WhatsApp</div>
              <div className="text-xs text-gray-600">+60 12-265 7856</div>
            </div>
          </a>

          <a href="https://github.com/nicholas053" target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:shadow-md transition">
            <svg className="w-8 h-8 text-gray-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.65.5.75 5.4.75 11.75c0 4.85 3.15 8.95 7.5 10.4.55.1.75-.25.75-.55v-1.9c-3.05.65-3.7-1.45-3.7-1.45-.5-1.25-1.25-1.6-1.25-1.6-1.05-.7.05-.7.05-.7 1.15.1 1.75 1.2 1.75 1.2 1.05 1.8 2.75 1.25 3.4 1 .1-.8.4-1.25.7-1.55-2.45-.3-5-1.25-5-5.55 0-1.25.45-2.25 1.2-3.05-.1-.3-.55-1.6.1-3.35 0 0 .95-.3 3.15 1.2a10.9 10.9 0 0 1 5.75 0c2.2-1.5 3.15-1.2 3.15-1.2.65 1.75.2 3.05.1 3.35.75.8 1.2 1.8 1.2 3.05 0 4.3-2.55 5.25-5 5.55.45.4.85 1.15.85 2.35v3.45c0 .3.2.65.75.55 4.35-1.45 7.5-5.55 7.5-10.4C23.25 5.4 18.35.5 12 .5z"/></svg>
            <div className="text-left">
              <div className="text-sm font-semibold">GitHub</div>
              <div className="text-xs text-gray-600">github.com/nicholas053</div>
            </div>
          </a>
        </div>

        <div className="mt-6">
          <a href="/resume.pdf" target="_blank" className="px-5 py-3 rounded-xl bg-gray-200">Resume</a>
        </div>
        <div className="mt-6">
          <button onClick={() => scrollTo("projects")} className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow">View My Work</button>
        </div>
      </section>
    </main>
  )
}
