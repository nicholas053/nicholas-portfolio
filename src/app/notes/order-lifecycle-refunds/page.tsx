import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { orderLifecycleRefundsDiagrams } from "@/content/order-lifecycle-refunds-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/order-lifecycle-refunds"
const TITLE = "Order lifecycle and refunds"
const DESCRIPTION =
  "NDA note: one checkout, one child order per seller, and idempotent refunds on a payment those orders share."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function OrderLifecycleRefundsPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="nda"
      title={TITLE}
      lede="One checkout can contain orders from several sellers. Each seller order moves on its own, but they share one payment."
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

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">Background</h2>
        <p>
          One checkout can contain orders from several sellers. Each seller order moves on its own (ship, deliver,
          cancel, return), but they share one payment.
        </p>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Each seller gets a child order with its own items, address, fulfilment record, settlement record and
            status history.
          </li>
          <li>
            Paid flow: seller confirms, ships with tracking, marks delivered; the buyer confirms receipt or the order
            auto-completes after a window.
          </li>
          <li>
            Seller income is credited to the seller&apos;s balance only after a buffer period following completion.
          </li>
          <li>
            Cancellations: buyer request with seller approval, overdue cancellation by a scheduled job, or admin
            force-cancel.
          </li>
          <li>
            Returns: buyer requests, seller approves or rejects, buyer can escalate to admin; when goods come back,
            stock and any store credit are restored and the refund is issued.
          </li>
          <li>
            Store-credit refunds complete immediately; cash refunds stay pending until an admin confirms the transfer.
          </li>
        </ol>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">Design decisions</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-navy">Every refund and restore step is idempotent</strong>, guarded by a status
            or timestamp check, so retries are safe.
          </li>
          <li>
            <strong className="text-navy">Partial vs full refund on a shared payment:</strong> the payment is marked
            partially refunded while any other order in the same checkout is still paid.
          </li>
          <li>
            <strong className="text-navy">Seller income on a timer, not at delivery,</strong> to leave room for
            returns; credited once, guarded by a timestamp, with lock ordering and deadlock retry.
          </li>
          <li>
            <strong className="text-navy">Scheduled jobs never overlap.</strong>
          </li>
        </ul>
      </section>

      <MermaidStack blocks={orderLifecycleRefundsDiagrams} />
    </TechNoteFrame>
  )
}
