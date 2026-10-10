import type { Metadata } from "next"
import Link from "next/link"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { multiSellerMarketplaceDiagrams } from "@/content/multi-seller-marketplace-diagrams"
import {
  breadcrumbList,
  creativeWorkJsonLd,
  pageSocialMeta,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/projects/multi-seller-marketplace"
const TITLE = "Multi-Seller Marketplace Channel"
const DESCRIPTION =
  "Confidential case study: a second sales channel on an existing marketplace — seller onboarding, stock holds, multi-seller checkout, and refunds (Laravel, MySQL)."

const CHILD_NOTES = [
  {
    href: "/notes/seller-onboarding-variants",
    title: "Seller onboarding and product variants",
  },
  {
    href: "/notes/cart-stock-reservation",
    title: "Cart and stock reservation",
  },
  {
    href: "/notes/cancel-vs-late-payment",
    title: "Cancel vs a late or duplicate payment confirmation",
  },
  {
    href: "/notes/order-lifecycle-refunds",
    title: "Order lifecycle and refunds",
  },
] as const

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function MultiSellerMarketplacePage() {
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
            { name: TITLE, path: PATH },
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

      <header className="space-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">Confidential / NDA</p>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Multi-Seller Marketplace Channel
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Client, brand and business rules are white-labelled. Lead backend developer and designer
          (lead-approved) — Laravel, MySQL.
        </p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Overview</h2>
        <p>
          The client already ran a marketplace app with its own catalog, accounts and cart. They wanted a
          second channel where independent sellers open shops and sell their own products, inside the same
          app, the same cart and the same checkout. I designed the channel end to end (approved by my lead)
          and wrote most of its core services.
        </p>
        <p>
          <strong className="text-navy">What already existed (team / platform):</strong> buyer accounts and
          addresses, category tree, authentication, admin panel shell, media library, and the original
          channel&apos;s orders. Some later moderation features on shops (suspensions, visibility rules) were
          added by a colleague.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-3 border-l border-border pl-5">
          <div className="label-problem">The Problem</div>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <li>
              Two channels had to share one cart and one checkout, while stock, payment and order flows stayed
              separate per seller.
            </li>
            <li>
              Stock is limited per variant. Two buyers must never both get the last unit, but idle carts should
              not lock stock either.
            </li>
            <li>
              Payment confirmation is asynchronous. It can arrive late (after the buyer cancelled), twice, or
              not at all.
            </li>
            <li>
              One checkout can include orders from several sellers, and each can be cancelled or refunded on
              its own.
            </li>
          </ul>
        </div>
        <div className="space-y-3 border-l border-border pl-5">
          <div className="label-solution">The Solution</div>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <li>
              A seller onboarding and catalog module with up to two variant axes per product and a price and
              stock row per variant.
            </li>
            <li>A cart extended with a channel flag so both channels coexist in one basket.</li>
            <li>
              Stock is <strong className="text-navy">held when the buyer opens the checkout summary</strong>,
              not when they add to cart, and released when they leave or the hold expires.
            </li>
            <li>
              One <strong className="text-navy">checkout session</strong> groups child orders, one per seller,
              under one payment.
            </li>
            <li>
              Cancel, payment confirmation and a background payment check all go through the same locked path,
              so the order ends in one consistent state whichever arrives first.
            </li>
            <li>
              A per-seller order lifecycle with cancellation, return and refund cases, and seller income
              credited only after a buffer period.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-navy">Features</h2>
        <ul className="divide-y divide-border text-sm leading-relaxed text-muted-foreground">
          {[
            "Seller apply, re-apply after rejection, admin approve or reject",
            "Shop locations with operating hours, payout details, vacation mode",
            "Category-driven attributes; products with up to 2 variant axes and per-variant price and stock",
            "Shared cart across channels",
            "Checkout summary with stock holds and automatic expiry",
            "Multi-seller checkout under one payment",
            "Seller flow: confirm, ship (with tracking), mark delivered",
            "Buyer flow: received, cancel request, return and refund request, escalation",
            "Admin attention queue: disputes, forced cancels, manual refund confirmation",
            "Scheduled jobs: hold expiry, seller reminders, overdue cancellation, auto-complete, seller income release",
          ].map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-navy">Engineering highlights</h2>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            <strong className="text-navy">Stock correctness under concurrency:</strong> row locks on the variant
            before checking availability; a separate held counter, so on-hand stock only changes when an order is
            really paid or returned; a fixed lock order (variant, then hold) everywhere.
          </p>
          <p>
            <strong className="text-navy">Late and duplicate payment events:</strong> cancel asks the payment
            provider first and does not cancel if the provider is unreachable; a late confirmation revives a
            cancelled checkout instead of losing a paid order; a duplicate confirmation does nothing; a background
            check recovers payments whose confirmation never arrived.
          </p>
          <p>
            <strong className="text-navy">Idempotent refunds:</strong> every refund and restore step checks
            whether it already ran, so retries and double clicks are safe. A shared payment is marked partially
            refunded while other orders in the same checkout are still paid.
          </p>
          <p>
            <strong className="text-navy">Explicit state machines</strong> for shops, holds, orders, refunds and
            return cases, with a status history per order.
          </p>
          <p>
            <strong className="text-navy">Scheduled jobs that cannot overlap</strong>, and seller income credited
            once with a timestamp guard.
          </p>
        </div>
      </section>

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">Result</h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          The full flow from seller onboarding to checkout, fulfilment and refunds went live. I handed it over
          after delivery and the team continues to run and extend it.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-navy">Diagrams</h2>
        <MermaidStack blocks={multiSellerMarketplaceDiagrams} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-navy">Technical notes</h2>
        <ul className="space-y-3">
          {CHILD_NOTES.map((note) => (
            <li key={note.href}>
              <Link href={note.href} className="text-navy hover:text-[var(--accent-token)]">
                {note.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
