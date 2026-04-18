import { SiNextdotjs, SiReact, SiTailwindcss, SiPrisma, SiPostgresql, SiNodedotjs, SiVercel } from 'react-icons/si'
import { DiNodejs } from "react-icons/di";
import { FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link';
import type { Metadata } from "next"
import FeatureRow from '@/components/FeatureRow'

export const metadata: Metadata = {
  title: "Church management system",
  description:
    "Case study: Next.js community management — event registration, attendance, outing approvals, roles, and Cloudinary walkthroughs.",
  alternates: { canonical: "/projects/church-system" },
}

export default function ChurchSystemPage() {
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
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Church / Community Management System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          An internal system for event registration, attendance tracking, outing requests, and role-based administration — optimized for busy ministry teams and student fellowships.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://zhuendazhuan.vercel.app"
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black inline-flex items-center gap-2 shadow"
          >
            Online Product <FiExternalLink />
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Problem</span>
          </div>
          <h3 className="text-2xl font-bold">Administrative Nightmare</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li><strong className="text-gray-800 dark:text-gray-200">Data Fragmentation:</strong> Relied on duplicating Google Forms for every event, causing scattered data.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Manual Logistics:</strong> Admins had to manually count participants by region to arrange transportation.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Data Duplication:</strong> Members frequently submitted multiple registrations due to uncertainty.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Painful Auditing:</strong> Year-end attendance tracking required manually cross-referencing massive Google Sheets.</li>
          </ul>
        </div>

        <div className="space-y-4 p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-6">
            <span className="font-bold">The Solution</span>
          </div>
          <h3 className="text-2xl font-bold">Centralized Automation</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
            <li><strong className="text-gray-800 dark:text-gray-200">Self-Service Portal:</strong> Members can track, update, or cancel their own registrations via internal accounts.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Automated Logistics:</strong> Dashboards auto-filter and aggregate transportation needs by area.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Smart Attendance:</strong> Cell Group Leaders get 1-click attendance checklists pre-filtered for their members, replacing Excel entirely.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Anti-Spam Architecture:</strong> Public registration is allowed, but strictly blocks duplicate phone numbers.</li>
          </ul>
        </div>
      </section>

      {/* Feature Rows */}
      <FeatureRow
        title="Event Registration"
        description="Visitors can register for open events directly from the navbar without logging in. Registration collects name, phone, and address. Each phone number can register only once per event to prevent duplicates. Logged-in users are redirected to the registration page and will see their default address prefilled; they can update or cancel their registration later."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757633/registration_lffclq.mp4"
      />

      <FeatureRow
        title="Event Management"
        description="Authorized roles can create and manage events, with filters by event type and date for quick lookup. When creating an event, you can mark it as a regular event (attendance required) and choose a regular event type, and optionally open it for public registration. Deleting events is restricted and discouraged, because regular events are linked to attendance records."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757544/eventmanagement_ckh13u.mp4"
        reverse
      />

      <FeatureRow
        title="Attendance"
        description="Regular events show an Attendance button visible only to specific roles. Cell Group Leaders see only their group’s active members, while senior leaders and the secretary can see all groups and filter by group. Taking attendance is intentionally simple: tick names and save. An attendance rate report (admin-only) can be generated for a selected date range and event type to list members who meet a target attendance rate."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757546/attendance_ujcsb9.mp4"
      />

      <FeatureRow
        title="Outing Request & Approvals"
        description="Cell Group Leaders and Trainee Leaders can request an outing by providing topic, date, time, venue, and description, and by adding participants from their own or other groups. Mentors (SV) and the Transportation Team Leader review requests in detail and can approve or reject them; statuses update in real time."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757597/outing_tvsxsk.mp4"
        reverse
      />

      <FeatureRow
        title="User Management & Roles"
        description="Users with sufficient role level can view member profiles; the Administrative Team can assign roles and groups, set members as inactive (with bulk operations), and changes propagate automatically — e.g., roles are auto-removed when a member becomes inactive. Lists are filterable by group and status. Clicking a phone number opens WhatsApp for quick contact."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757542/usermanagement_k6zxlk.mp4"
      />

      <FeatureRow
        title="CSV Import (Bulk Events & Users)"
        description="For internal use, sign-up is disabled. Admins import members and events via CSV. On import, new users automatically receive an email with their login credentials. CSV rules enforce clean data: specific date/time formats, lowercase yes/no flags for regular/open events, and strict event type names for regular events. For users, required fields include name, email, phone, gender, and area; phone must start with 0 and use no dashes; some areas require an address; baptism is a yes/no value."
        videoSrc="https://res.cloudinary.com/dqkjvme8f/video/upload/f_auto,q_auto/v1755757603/importcsv_peyipn.mp4"
        reverse
      />

      <section className="py-12 border-y border-gray-200 dark:border-gray-800 my-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Engineering Spotlight</h2>
        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">01.</span> Granular RBAC & Security
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To handle complex church hierarchies, I implemented a multi-tier Role-Based Access Control (RBAC) system. 
              Using Next.js Middleware and JWT, routes are strictly protected. On the client side, custom React hooks compute integer-based role levels (e.g., Level {'>'} 5 for Admins) to dynamically render UI components. 
              Account creation is entirely closed off from the public (handled exclusively via CSV import) to eliminate spam accounts.
            </p>
            
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-sky-500">02.</span> Prisma Aggregation & Data Integrity
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Replaced manual spreadsheet calculations with dynamic PostgreSQL queries via Prisma. The backend API handles pagination, multi-parameter filtering (by date and event type), and complex joins to generate instant attendance rate statistics. 
              Additionally, the system enforces strict unique constraints (like phone number validation) to prevent data duplication from visitors.
            </p>
          </div>

        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Tech Stack</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Built with a modern TypeScript/JavaScript stack for speed, maintainability, and low operational overhead.
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
          <p><strong>Auth:</strong> NextAuth.js with role levels and per-route guards</p>
          <p><strong>Deployment:</strong> Vercel</p>
        </div>
      </section>

      {/* Access Control Snapshot */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Access Control Snapshot</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Visitors</h3>
            <p className="text-gray-700 dark:text-gray-300">Register for open events without an account</p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Members</h3>
            <p className="text-gray-700 dark:text-gray-300">Manage their registrations, update profiles, view relevant lists</p>
          </div>
          <div className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Leaders & Admins</h3>
            <p className="text-gray-700 dark:text-gray-300">Create events, take attendance, request/approve outings, administer roles & groups</p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future Roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Attendance Insights</h3>
            <p className="text-gray-700 dark:text-gray-300">Advanced analytics for cohort trends and pastoral follow-up</p>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Automated Notifications</h3>
            <p className="text-gray-700 dark:text-gray-300">Email/WhatsApp reminders for registrations, approvals, and absences</p>
          </div>
        </div>
      </section>
    </main>
  )
}
