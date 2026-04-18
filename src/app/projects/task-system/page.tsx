import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiVercel, SiDotnet } from 'react-icons/si'
import { DiNodejs } from "react-icons/di";
import FeatureRow from '@/components/FeatureRow'
import { FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link';
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Task management system",
  description:
    "Case study: collaborative Kanban, drag-and-drop, comments, voting, dashboards — Next.js, Prisma, PostgreSQL, self-hosted friendly.",
  alternates: { canonical: "/projects/task-system" },
}

export default function ProjectTaskSystemPage() {
  return (
    <main className="px-4 md:px-12 py-12 space-y-24 max-w-6xl mx-auto">

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>
      {/* Page Title */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold ">Project & Task Management System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A collaborative project management system designed for teams to track progress, make decisions, and for individuals to clearly monitor their own contributions.
        </p>
        <div className="flex items-center justify-center gap-4">
            <a
                href="https://github.com/nicholas053/Wish-We-Don-t-Resign"
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black inline-flex items-center gap-2 shadow"
            >
                Code on Github <FiExternalLink />
            </a>
        </div>
      </section>

      {/* Overview */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 pb-10">
        <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Problem</span>
          </div>
          <h3 className="text-2xl font-bold">The Startup Dilemma</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A friend's interior design startup needed a reliable task management system to coordinate projects. However, enterprise tools like ClickUp were too expensive for a small team. More importantly, dealing with sensitive client floor plans and design assets required strict data privacy, making them hesitant to rely on third-party public cloud SaaS.
          </p>
        </div>

        <div className="space-y-4 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Solution</span>
          </div>
          <h3 className="text-2xl font-bold">A Self-Hosted Ecosystem</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I built a lightweight, performant project management platform designed specifically for self-hosting on a custom homelab. It delivers core enterprise features—like Kanban boards, project-level voting, and granular task assignments—without the bloat, ensuring 100% data sovereignty and zero recurring SaaS costs for the startup.
          </p>
        </div>
      </section>

      {/* Task Progress & Assignment */}
      <FeatureRow
        title="Task Progress & Assignment"
        description="Tasks move through multiple progress stages with an intuitive drag-and-drop interface. Admins can assign tasks to team members, with workload scores displayed for balanced distribution. If a task is unassigned, all members can update its progress. Once assigned, only the assignee and admins have control."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755755371/task-progress-assign_frrls6.mp4"
      />

      {/* Comments */}
      <FeatureRow
        title="Project & Task Comments"
        description="Communication is streamlined through dedicated chatboxes: one at the project level and another for each task. This allows teams to hold both broad and focused discussions. The system also supports user mentions for direct attention."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755755335/comments_trg2hl.mp4"
        reverse
      />

      {/* Voting */}
      <FeatureRow
        title="Voting"
        description="Decision-making within teams is supported by an integrated voting system. Members can create votes with options in text, image, or a combination of both. Each member can cast only one vote, ensuring fairness in the process."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755755379/voting_hrri4c.mp4"
      />

      {/* Dashboard */}
      <FeatureRow
        title="Personal Dashboard"
        description="Each member has a personalized dashboard that highlights tasks they are involved in, the teams they have joined, and their individual completion rate. This provides clarity on personal contributions and responsibilities."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755755372/dashboard_uuzr5i.mp4"
        reverse
      />

      {/* Dark Mode */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Dark Mode</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          The interface supports dark mode for a modern and user-friendly experience, ensuring accessibility and comfort across environments.
        </p>
      </section>

      <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Engineering Spotlight</h2>
        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">01.</span> Advanced Drag & Drop (DnD) Architecture
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Implementing the Kanban board wasn't just about UI; it required precise event handling across devices. I utilized <code>@dnd-kit/core</code> with custom sensor orchestration: <i>MouseSensors</i> for desktop precision, and <i>TouchSensors</i> with delay/tolerance constraints to allow native page scrolling on mobile without triggering accidental drags. 
              UI updates are handled optimistically on the client to ensure zero-latency feedback before syncing the new state to the PostgreSQL database.
            </p>
            
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">02.</span> Complex State Lifting & Component Decoupling
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To keep the architecture clean, I heavily decoupled the UI components. For example, when a task is moved or marked 'COMPLETE', the <code>ProjectBoard</code> computes real-time statistics (completion rates and priority distributions) and lifts this state via an <code>onStatsChange</code> callback to the parent <code>ClientProjectPage</code>. This ensures the dashboard header reflects live data without prop-drilling or relying on heavy state management libraries.
            </p>
          </div>

        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Tech Stack</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          This project is powered by a modern full-stack JavaScript ecosystem, leveraging both frontend and backend technologies for performance, scalability, and developer efficiency.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-6xl mt-8 text-gray-800 dark:text-gray-200">
          <SiNextdotjs title="Next.js" />
          <SiReact title="React" className="text-sky-500" />
          <SiTailwindcss title="TailwindCSS" className="text-sky-400" />
          <SiPrisma title="Prisma" />
          <SiPostgresql title="PostgreSQL" className="text-blue-600" />
          <DiNodejs title="Node.js" className="text-green-600" />
          <SiVercel title="Vercel" />
        </div>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-2 text-center">
          <p><strong>Frontend:</strong> React, Next.js, Tailwind CSS</p>
          <p><strong>Backend:</strong> Node.js, Next.js API Routes, Prisma</p>
          <p><strong>Database:</strong> PostgreSQL</p>
          <p><strong>Auth:</strong> NextAuth.js with JWT</p>
          <p><strong>Deployment:</strong> Vercel, PlanetScale</p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future Roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Gantt Chart</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Visualize task dependencies, ensuring sequential workflows are respected.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Audit Trail</h3>
            <p className="text-gray-700 dark:text-gray-300">
              When admins remove members, the system will generate a timestamped PDF report of their contributions and comments, safeguarding transparency and fairness.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Custom Categories</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Members will be able to group their projects into personal categories for easier management.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
