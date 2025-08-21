"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiVercel, SiCplusplus, SiGithub } from "react-icons/si"
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

  return (
    <main className="relative">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-black shadow z-50">
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
          className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 max-w-3xl"
        >
          I design and build web applications that help teams collaborate effectively and communities stay connected.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
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
            className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Contact Me
          </button>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-24 max-w-6xl mx-auto px-4 space-y-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center">Selected Projects</motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Card Example */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Project Task Management System</h3>
            <p className="text-gray-600 dark:text-gray-300">A collaborative platform with task assignment, drag-and-drop stages, comments, votes, and dashboards.</p>
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
            className="rounded-2xl border p-6 space-y-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Church / Community Management System</h3>
            <p className="text-gray-600 dark:text-gray-300">An internal system for event registration, attendance, outing requests, and user administration with role-based access.</p>
            <a 
              href="/projects/church-system" 
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
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900 px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</motion.h2>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="relative border-l border-gray-300 dark:border-gray-700 pl-6">
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
                text: "Designed and built two full-scale systems — a Church Management System and a Project & Task Management System — using a modern and efficient tech stack (React, Next.js, Prisma, PostgreSQL, Tailwind). Focused on scalability, real-world workflows, and advanced features like drag-and-drop task management, voting, and audit trails."
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="mb-8">
                <div className="font-semibold">{item.year}</div>
                <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Core Strengths */}
          <div className="space-y-6 text-center p-6 rounded-2xl border dark:border-gray-700">
            <h3 className="text-2xl font-semibold">Core Strengths</h3>
            <div className="flex flex-wrap justify-center gap-6 text-5xl">
              <SiNextdotjs title="Next.js" />
              <SiReact title="React" className="text-sky-500" />
              <SiTailwindcss title="TailwindCSS" className="text-sky-400" />
              <SiNodedotjs title="Node.js" className="text-green-600" />
              <SiPrisma title="Prisma" />
              <SiPostgresql title="PostgreSQL" className="text-blue-600" />
              <SiVercel title="Vercel" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Daily tools I use to deliver production-ready full-stack applications with clean UI and reliable backend logic.
            </p>
          </div>

          {/* Additional Skills */}
          <div className="space-y-6 text-center p-6 rounded-2xl border dark:border-gray-700">
            <h3 className="text-2xl font-semibold">Additional Skills</h3>
            <div className="flex flex-wrap justify-center gap-6 text-4xl">
              <SiCplusplus title="C++" className="text-blue-500" />
              <FaJava title="Java" className="text-red-500" />
              <SiGithub title="GitHub" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Experience with C++ and Java for performance-critical or enterprise-level systems, along with Git & GitHub for version control and collaboration.
            </p>
          </div>

          {/* System Design */}
          <div className="space-y-6 text-center p-6 rounded-2xl border dark:border-gray-700">
            <h3 className="text-2xl font-semibold">System Design</h3>
            <div className="flex justify-center text-6xl text-sky-500">
              <FaProjectDiagram title="System Design & ERD" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Strong in database schema (ERD), scalable architecture, and workflow design. Attention to detail while keeping the big picture in mind — from initial design to deployment.
            </p>
          </div>
        </div>

        {/* Personal philosophy */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="italic text-gray-700 dark:text-gray-300">
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
        <p className="text-gray-600 dark:text-gray-300">Open to freelance projects, junior developer, and collaborations.</p>
        <div className="space-y-4">
          <a href="mailto:shiloong53bii@gmail.com" className="block text-sky-500">shiloong53bii@gmail.com</a>
          <a href="https://wa.me/+60122657856" target="_blank" rel="noreferrer" className="block text-sky-500">WhatsApp Contact</a>
          <a href="https://github.com/nicholas053" target="_blank" rel="noreferrer" className="block text-sky-500">GitHub</a>
        </div>
        <div className="mt-6">
          <a href="/resume.pdf" target="_blank" className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700">Resume</a>
        </div>
        <div className="mt-6">
          <button onClick={() => scrollTo("projects")} className="px-5 py-3 rounded-xl bg-sky-500 text-white shadow">View My Work</button>
        </div>
      </section>
    </main>
  )
}
