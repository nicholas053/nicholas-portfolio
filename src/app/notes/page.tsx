import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { FaLock } from "react-icons/fa"
import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { NOTES_PAGE } from "@/content/content"
import { breadcrumbList, pageSocialMeta } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes"
const TITLE = NOTES_PAGE.eyebrow
const DESCRIPTION = NOTES_PAGE.metadataDescription

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "website",
})

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
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-10 md:px-8 md:py-14">
      <PageJsonLd
        data={[
          {
            "@type": "CollectionPage",
            "@id": `${siteUrl}${PATH}/#collection`,
            name: TITLE,
            description: DESCRIPTION,
            url: `${siteUrl}${PATH}`,
            isPartOf: { "@id": `${siteUrl}/#website` },
          },
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Technical notes", path: PATH },
          ]),
        ]}
      />
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy dark:text-muted-foreground dark:hover:text-cream"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Home</span>
        </Link>
      </div>

      <header className="space-y-3 text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">
          {NOTES_PAGE.eyebrow}
        </p>
        <h1 className="text-3xl font-bold text-navy md:text-4xl">
          {NOTES_PAGE.heading}
        </h1>
        <p className="text-muted-foreground dark:text-muted-foreground md:text-lg">
          {NOTES_PAGE.intro}{" "}
          <Link href="/#projects" className="font-medium text-navy hover:underline dark:text-mist">
            {NOTES_PAGE.projectsLinkLabel}
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
                className="block rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-border hover:shadow-md md:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.badge === "NDA" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-mist/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground dark:bg-surface dark:text-muted-foreground">
                          <FaLock className="h-3 w-3" aria-hidden />
                          Confidential
                        </span>
                      )}
                      {item.badge === "Team" && (
                        <span className="inline-flex rounded-full bg-mist/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy dark:bg-surface/50 dark:text-mist">
                          Team practice
                        </span>
                      )}
                      {item.badge === "Reflection" && (
                        <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
                          Reflection
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-navy">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground md:text-base">
                      {item.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-navy dark:text-mist sm:pt-1">
                    Read →
                  </span>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted p-6 md:p-8">
                <h2 className="text-lg font-semibold text-muted-foreground dark:text-muted-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
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
