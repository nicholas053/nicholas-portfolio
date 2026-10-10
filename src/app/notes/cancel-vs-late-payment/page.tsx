import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { cancelVsLatePaymentDiagrams } from "@/content/cancel-vs-late-payment-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/cancel-vs-late-payment"
const TITLE = "Cancel vs a late or duplicate payment confirmation"
const DESCRIPTION =
  "NDA note: one locked mark-paid path so cancel, a late confirmation, and a background check cannot leave a checkout in two states."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function CancelVsLatePaymentPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="nda"
      title={TITLE}
      lede="Payment confirmation arrives asynchronously. It can race a cancel, arrive twice, or never arrive."
    >
      <PageJsonLd
        data={[
          techArticleJsonLd({ siteUrl, headline: TITLE, description: DESCRIPTION, path: PATH }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Technical notes", path: "/notes" },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Background</h2>
        <p>
          Payment confirmation arrives asynchronously. A buyer can cancel an unpaid checkout at the same moment the
          payment confirmation is on its way, the confirmation can arrive twice, or it can never arrive.
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">How it works</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-navy">Buyer cancels:</strong> before cancelling, the system asks the payment
            provider whether the payment actually went through. If paid, it marks the checkout paid and rejects the
            cancel. If the provider cannot be reached, it does <strong className="text-navy">not</strong> cancel.
            Otherwise it locks the session, re-checks, cancels the unpaid orders and releases the holds.
          </li>
          <li>
            <strong className="text-navy">Confirmation arrives:</strong> verify the signature, confirm with the
            provider, lock the session. Already paid means do nothing (duplicate). Cancelled means revive: mark
            paid, restore the orders, and settle the stock.
          </li>
          <li>
            <strong className="text-navy">Confirmation never arrives:</strong> a background job checks pending
            payments with the provider and runs the same mark-paid path.
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Design decisions</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-navy">One locked mark-paid path</strong> shared by the callback and the
            background check, so all three triggers serialise on the same row lock.
          </li>
          <li>
            <strong className="text-navy">Revive instead of auto-refund</strong> when money arrives after a cancel:
            the buyer paid, so the order should continue.
          </li>
          <li>
            <strong className="text-navy">Fail safe on uncertainty:</strong> an unreachable provider means
            don&apos;t cancel, because a wrong cancel on a paid order is worse than a slightly longer pending state.
          </li>
          <li>
            <strong className="text-navy">Re-check after acquiring the lock</strong>, because the state may have
            changed while waiting.
          </li>
        </ul>
      </section>

      <MermaidStack blocks={cancelVsLatePaymentDiagrams} />
    </TechNoteFrame>
  )
}
