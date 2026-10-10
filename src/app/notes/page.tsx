import Link from "next/link"
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
    href: "/notes/seller-onboarding-variants",
    title: "Seller onboarding and product variants",
    blurb:
      "Shop applications on existing accounts, category attributes, and up to two variant axes with per-variant price and stock.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/cart-stock-reservation",
    title: "Cart and stock reservation",
    blurb:
      "A shared cart that checks availability on add, and holds stock only when the buyer opens the checkout summary.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/cancel-vs-late-payment",
    title: "Cancel vs a late or duplicate payment confirmation",
    blurb:
      "One locked mark-paid path so cancel, a late confirmation, and a background check end in one state.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/order-lifecycle-refunds",
    title: "Order lifecycle and refunds",
    blurb:
      "One child order per seller under a shared payment, with idempotent refunds and a buffer before seller income.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/multi-level-revenue-splits",
    title: "Multi-level revenue splits with a dry-run preview",
    blurb:
      "Percent-plus-fixed splits down a partner chain. Preview and settle call the same function.",
    badge: "Illustrative",
  },
  {
    href: "/notes/third-party-api-adapters",
    title: "One interface for many third-party APIs",
    blurb:
      "A registry of adapters for different auth, payloads, and status names, including an explicit pending flag.",
    badge: "Illustrative",
  },
  {
    href: "/notes/background-job-failures",
    title: "Making background job failures visible and safe to retry",
    blurb:
      "Claim a row before calling out, record the stage and last error, and retry without sending twice.",
    badge: "Illustrative",
  },
  {
    href: "/notes/flexible-financial-settlement",
    title: "Flexible Financial Settlement Engine",
    blurb:
      "Enterprise CRM: shopping-cart batches, consolidated payment vouchers, and commission state design.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/frontend-architecture-refactoring",
    title: "Frontend Architecture Refactoring",
    blurb:
      "Unified dynamic forms, shared component library, and RBAC across admin and agent portals.",
    badge: "Team practice",
  },
  {
    href: "/notes/performance-evaluation-360",
    title: "360° Performance Evaluation Module",
    blurb:
      "Full-stack 360° HR: generation engine, JSONB, tokenized partner API, and Angular schema-driven forms with responsive Likert layouts.",
    badge: "Confidential / NDA",
  },
  {
    href: "/notes/fullstack-assessment-debugging",
    title: "Full-Stack Assessment: Performance & Live Debugging",
    blurb:
      "Take-home and live session: concurrent API aggregation, SWR + infinite scroll, a merge-order bug, and a clear follow-up.",
    badge: "Reflection",
  },
] as const

export default function NotesIndexPage() {
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
      <Link href="/#technical-notes" className="text-sm text-muted-foreground hover:text-navy">
        ← Home
      </Link>

      <header className="mt-16 md:mt-20">
        <p className="font-mono text-xs tracking-wide text-[var(--accent-token)]">{NOTES_PAGE.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{NOTES_PAGE.heading}</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {NOTES_PAGE.intro}{" "}
          <Link href="/#projects" className="text-[var(--accent-token)] hover:underline">
            {NOTES_PAGE.projectsLinkLabel}
          </Link>
          .
        </p>
      </header>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {notes.map((item) => (
          <li key={item.href} className="py-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{item.badge}</p>
            <h2 className="mt-1 text-lg font-semibold text-navy">
              <Link href={item.href} className="hover:text-[var(--accent-token)]">
                {item.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
            <p className="mt-2 text-sm">
              <Link href={item.href} className="text-[var(--accent-token)] hover:underline">
                Read →
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
