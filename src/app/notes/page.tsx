import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { FaLock } from "react-icons/fa"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Technical notes",
  description:
    "Architecture and problem-solving write-ups — deeper than case-study cards, NDA-safe where noted.",
  alternates: {
    canonical: "/notes",
  },
}

const notes = [
  {
    href: "/notes/flexible-financial-settlement",
    title: "Flexible Financial Settlement Engine",
    blurb:
      "Enterprise CRM: shopping-cart batches, consolidated payment vouchers, and commission state design.",
    badge: "NDA" as const,
    ready: true,
  },
  {
    href: "/notes/frontend-architecture-refactoring",
    title: "Frontend Architecture Refactoring",
    blurb:
      "Unified dynamic forms, shared component library, and RBAC across admin and agent portals.",
    badge: "Team" as const,
    ready: true,
  },
  {
    href: "/notes/performance-evaluation-360",
    title: "360° Performance Evaluation Module",
    blurb:
      "Full-stack 360° HR: generation engine, JSONB, tokenized partner API, and Angular schema-driven forms with responsive Likert layouts.",
    badge: "NDA" as const,
    ready: true,
  },
  {
    href: "/notes/fullstack-assessment-debugging",
    title: "Full-Stack Assessment: Performance & Live Debugging",
    blurb:
      "Take-home and live session: concurrent API aggregation, SWR + infinite scroll, a merge-order bug, and a clear follow-up.",
    badge: "Reflection" as const,
    ready: true,
  },
] as const

export default function NotesIndexPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-10 md:px-8 md:py-14">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Home</span>
        </Link>
      </div>

      <header className="space-y-3 text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Technical notes
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Architecture &amp; Problem Solving
        </h1>
        <p className="text-gray-600 dark:text-gray-300 md:text-lg">
        Real-world engineering bottlenecks I've encountered, the strategies I used to untangle them, and the scalable systems I designed in response. Product case studies with demos
          stay under{" "}
          <Link href="/#projects" className="font-medium text-sky-600 hover:underline dark:text-sky-400">
            Projects
          </Link>
          .
        </p>
      </header>

      <ul className="space-y-4">
        {notes.map((item) => (
          <li key={item.title}>
            {item.ready ? (
              <Link
                href={item.href}
                className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-sky-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-sky-800 md:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.badge === "NDA" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          <FaLock className="h-3 w-3" aria-hidden />
                          Confidential
                        </span>
                      )}
                      {item.badge === "Team" && (
                        <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/50 dark:text-sky-200">
                          Team practice
                        </span>
                      )}
                      {item.badge === "Reflection" && (
                        <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
                          Reflection
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 md:text-base">
                      {item.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-sky-600 dark:text-sky-400 sm:pt-1">
                    Read →
                  </span>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 p-6 dark:border-gray-600 dark:bg-gray-800/30 md:p-8">
                <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  {item.blurb}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
