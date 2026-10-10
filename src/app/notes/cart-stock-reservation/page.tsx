import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { cartStockReservationDiagrams } from "@/content/cart-stock-reservation-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/cart-stock-reservation"
const TITLE = "Cart and stock reservation"
const DESCRIPTION =
  "NDA note: a shared cart that checks availability on add, and holds stock only when the buyer opens the checkout summary."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function CartStockReservationPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="nda"
      title={TITLE}
      lede="Both channels share one cart. Stock is per variant and limited: no overselling, and no stock locked by idle carts."
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
          Both channels share one cart. Stock is per variant and limited. The goal: no overselling, but no stock
          locked by idle carts.
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Add to cart checks live availability but does <strong className="text-navy">not</strong> reserve stock.
          </li>
          <li>
            Opening the checkout summary creates a session and a <strong className="text-navy">hold</strong> per
            line. Each hold locks the variant row, checks <code>on_hand - held &gt;= qty</code>, then increments{" "}
            <code>held</code>.
          </li>
          <li>
            Re-opening the summary with the same selection reuses the session and only adjusts holds whose quantity
            changed.
          </li>
          <li>Leaving checkout releases the holds. A scheduled job expires stale holds and summary sessions.</li>
          <li>
            On payment the hold is <strong className="text-navy">consumed</strong> and on-hand stock decreases. On
            cancel or expiry it is <strong className="text-navy">released</strong> and only <code>held</code>{" "}
            decreases.
          </li>
        </ol>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Design decisions</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-navy">Hold at checkout summary, not at add-to-cart or place-order.</strong>{" "}
            Holding at add-to-cart lets idle carts block stock; holding at place-order lets a buyer reach payment
            and then find the item gone.
          </li>
          <li>
            <strong className="text-navy">Separate held counter.</strong> On-hand stock only changes on a real sale
            or return, which keeps stock reports honest.
          </li>
          <li>
            <strong className="text-navy">Same lock order everywhere</strong> (variant, then hold) to avoid
            deadlocks.
          </li>
          <li>
            <strong className="text-navy">Idempotent transitions:</strong> releasing a hold that is no longer active
            does nothing, so overlapping expiry runs cannot double-release.
          </li>
        </ul>
      </section>

      <MermaidStack blocks={cartStockReservationDiagrams} />
    </TechNoteFrame>
  )
}
