import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiVercel, SiDotnet } from 'react-icons/si'
import { DiNodejs } from "react-icons/di";
import FeatureRow from '@/components/FeatureRow'
import { FiExternalLink } from 'react-icons/fi'
import Link from 'next/link';
import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import {
  breadcrumbList,
  creativeWorkJsonLd,
  pageSocialMeta,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/projects/task-system"
const TITLE = "Task management system"
const DESCRIPTION =
  "Case study: collaborative Kanban, drag-and-drop, comments, voting, dashboards — Next.js, Prisma, PostgreSQL, self-hosted friendly."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function ProjectTaskSystemPage() {
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-16 md:py-24">
      <PageJsonLd
        data={[
          creativeWorkJsonLd({
            siteUrl,
            name: TITLE,
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Task system", path: PATH },
          ]),
        ]}
      />

      <div>
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground hover:text-navy"
        >
          ← Back
        </Link>
      </div>
      {/* Page Title */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">Project & Task Management System</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          A collaborative project management system designed for teams to track progress, make decisions, and for individuals to clearly monitor their own contributions.
        </p>
        <div className="flex flex-wrap gap-3">
            <a
                href="https://github.com/nicholas053/Wish-We-Don-t-Resign"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
            >
                Code on Github <FiExternalLink />
            </a>
        </div>
      </section>

      {/* Overview */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 pb-10">
        <div className="space-y-3 border-l border-border pl-5">
          <div className="label-problem">The Problem</div>
          <h3 className="text-lg font-semibold text-navy">The Startup Dilemma</h3>
          <p className="text-muted-foreground leading-relaxed">
            A friend's interior design startup needed a reliable task management system to coordinate projects. However, enterprise tools like ClickUp were too expensive for a small team. More importantly, dealing with sensitive client floor plans and design assets required strict data privacy, making them hesitant to rely on third-party public cloud SaaS.
          </p>
        </div>

        <div className="space-y-3 border-l border-border pl-5">
          <div className="label-solution">The Solution</div>
          <h3 className="text-lg font-semibold text-navy">A Self-Hosted Ecosystem</h3>
          <p className="text-muted-foreground leading-relaxed">
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
        <h2 className="text-lg font-semibold text-navy">Dark Mode</h2>
        <p className="text-muted-foreground">
          The interface supports dark mode for a modern and user-friendly experience, ensuring accessibility and comfort across environments.
        </p>
      </section>

      <section className="space-y-6 border-y border-border py-10">
        <h2 className="mb-6 text-lg font-semibold text-navy">Engineering Spotlight</h2>
        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy flex items-center gap-2">
              <span className="text-navy">01.</span> Advanced Drag & Drop (DnD) Architecture
            </h3>
            <p className="text-muted-foreground">
              Implementing the Kanban board wasn't just about UI; it required precise event handling across devices. I utilized <code>@dnd-kit/core</code> with custom sensor orchestration: <i>MouseSensors</i> for desktop precision, and <i>TouchSensors</i> with delay/tolerance constraints to allow native page scrolling on mobile without triggering accidental drags. 
              UI updates are handled optimistically on the client to ensure zero-latency feedback before syncing the new state to the PostgreSQL database.
            </p>
            
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-navy flex items-center gap-2">
              <span className="text-navy">02.</span> Complex State Lifting & Component Decoupling
            </h3>
            <p className="text-muted-foreground">
              To keep the architecture clean, I heavily decoupled the UI components. For example, when a task is moved or marked 'COMPLETE', the <code>ProjectBoard</code> computes real-time statistics (completion rates and priority distributions) and lifts this state via an <code>onStatsChange</code> callback to the parent <code>ClientProjectPage</code>. This ensures the dashboard header reflects live data without prop-drilling or relying on heavy state management libraries.
            </p>
          </div>

        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-10">
        <h2 className="text-lg font-semibold text-navy">Tech Stack</h2>
        <p className="text-muted-foreground">
          This project is powered by a modern full-stack JavaScript ecosystem, leveraging both frontend and backend technologies for performance, scalability, and developer efficiency.
        </p>
        <div className="flex flex-wrap gap-6 text-3xl text-navy">
          <SiNextdotjs title="Next.js" className="text-navy" />
          <SiReact title="React" className="text-navy" />
          <SiTailwindcss title="TailwindCSS" className="text-navy" />
          <SiPrisma title="Prisma" className="text-navy" />
          <SiPostgresql title="PostgreSQL" className="text-navy" />
          <DiNodejs title="Node.js" className="text-navy" />
          <SiVercel title="Vercel" className="text-navy" />
        </div>
        <div className="space-y-2 text-muted-foreground">
          <p><strong>Frontend:</strong> React, Next.js, Tailwind CSS</p>
          <p><strong>Backend:</strong> Node.js, Next.js API Routes, Prisma</p>
          <p><strong>Database:</strong> PostgreSQL</p>
          <p><strong>Auth:</strong> NextAuth.js with JWT</p>
          <p><strong>Deployment:</strong> Vercel, PlanetScale</p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-8">
        <h2 className="text-lg font-semibold text-navy">Future Roadmap</h2>
        <div className="relative border-l border-border ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-navy">Gantt Chart</h3>
            <p className="text-muted-foreground">
              Visualize task dependencies, ensuring sequential workflows are respected.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-navy">Audit Trail</h3>
            <p className="text-muted-foreground">
              When admins remove members, the system will generate a timestamped PDF report of their contributions and comments, safeguarding transparency and fairness.
            </p>
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-navy">Custom Categories</h3>
            <p className="text-muted-foreground">
              Members will be able to group their projects into personal categories for easier management.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
