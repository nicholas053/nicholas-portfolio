import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiVercel } from 'react-icons/si'
import { DiNodejs } from "react-icons/di";
import FeatureRow from '@/components/FeatureRow'

export default function ProjectTaskSystemPage() {
  return (
    <main className="px-4 md:px-12 py-12 space-y-24 max-w-6xl mx-auto">
      {/* Page Title */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Project & Task Management System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A collaborative project management system designed for teams to track progress, make decisions, and for individuals to clearly monitor their own contributions.
        </p>
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Overview</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          This system enables multiple team members to collaborate effectively on projects, ensuring transparent progress tracking, fair task distribution, and structured decision-making. It is built to help both teams and individuals stay on top of their goals.
        </p>
        <video
          className="w-full rounded-2xl shadow-xl"
          src="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755755372/overview_xlc6mi.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
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
