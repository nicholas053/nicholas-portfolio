import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { sellerOnboardingDiagrams } from "@/content/seller-onboarding-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/seller-onboarding-variants"
const TITLE = "Seller onboarding and product variants"
const DESCRIPTION =
  "NDA note: shop applications, category attributes, and up to two variant axes with a price and stock row per variant."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function SellerOnboardingVariantsPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="nda"
      title={TITLE}
      lede="Independent sellers needed to open shops inside an app whose accounts, addresses and categories already existed."
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
          Independent sellers needed to open shops inside an app whose accounts, addresses and categories already
          existed. Products needed variants (for example size and colour) with their own price and stock.
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            The seller applies using an existing account address and payout detail; the application copies them into
            the shop&apos;s default location and payout record.
          </li>
          <li>One shop per account. A rejected application is updated in place and resubmitted, not duplicated.</li>
          <li>Admin approves or rejects. Only an active shop can list products.</li>
          <li>
            Categories define attribute templates; the seller fills attributes and defines up to two variant axes.
          </li>
          <li>
            Every combination of axis values becomes a variant row with its own price and stock. The product keeps a
            denormalised minimum price for listing pages.
          </li>
          <li>
            Edits keep existing variant rows where possible, so stock and order references stay stable. Structural
            edits are blocked while stock is held by an unpaid checkout.
          </li>
        </ol>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Design decisions</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            Snapshot address and payout details onto the shop at apply time, so later edits to the buyer profile do
            not silently change the shop.
          </li>
          <li>
            Two fixed variant axes instead of an open-ended axis table: simpler queries and admin UI, matching what
            sellers actually need.
          </li>
          <li>
            Uniqueness enforced by database constraints (one shop per account, unique slug), with application checks
            in front.
          </li>
        </ul>
      </section>

      <MermaidStack blocks={sellerOnboardingDiagrams} />
    </TechNoteFrame>
  )
}
