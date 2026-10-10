import { SettlementArchitectureDiagrams } from "./SettlementArchitectureDiagrams"
import type { Metadata } from "next"
import Link from "next/link"
import { PageJsonLd } from "@/components/PageJsonLd"
import {
  breadcrumbList,
  pageSocialMeta,
  techArticleJsonLd,
} from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/flexible-financial-settlement"
const TITLE = "Flexible Financial Settlement Engine"
const DESCRIPTION =
  "Architecture notes: finance shopping cart model, consolidated payment vouchers, and enterprise CRM commission flow (NDA)."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function FlexibleFinancialSettlementPage() {
  const siteUrl = getSiteUrl()

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-16 md:py-24">
      <PageJsonLd
        data={[
          techArticleJsonLd({
            siteUrl,
            headline: TITLE,
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Technical notes", path: "/notes" },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />
      <div className="pb-4 md:pb-8">
        <Link
          href="/notes"
          className="text-sm text-muted-foreground hover:text-navy"
        >
          ← Technical notes
        </Link>
      </div>

      <header className="space-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">Confidential / NDA</p>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Flexible Financial Settlement Engine for Enterprise CRM
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Lead Developer &amp; Technical BA (acting) — mid-project discovery,
          schema redesign, and a batch-based payout model aligned with real
          commission accounting.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-3">
          <div className="label-problem">
            Challenge
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Rigid deal ↔ payout assumptions
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            Joined an ongoing enterprise CRM build mid-flight. Discovery
            surfaced a critical architectural mismatch: the system assumed a{" "}
            <strong className="text-navy">
              fixed one-to-one
            </strong>{" "}
            link between deals and payouts. In practice, the client needed{" "}
            <strong className="text-navy">
              partial line items
            </strong>{" "}
            (base, bonus, incentives) across hierarchical partners and
            timelines — consolidated into{" "}
            <strong className="text-navy">
              single payment vouchers
            </strong>{" "}
            per agent.
          </p>
        </div>

        <div className="space-y-3">
          <div className="label-solution">
            Solution
          </div>
          <h2 className="text-lg font-semibold text-navy">
            Finance &quot;shopping cart&quot; batching
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-base">
            Designed a model where finance selects specific commission rows from
            multiple deals, locks them into a draft batch, and generates one{" "}
            <strong className="text-navy">
              consolidated payment voucher (PV)
            </strong>{" "}
            per agent. Led alignment across UI/UX and engineering on schema,
            locking rules, and commission lifecycle states.
          </p>
        </div>
      </section>

      <section className="space-y-3 border-t border-border pt-8">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-lg">
          Reduced the risk of a disruptive post-launch financial refactor by
          matching how payouts are actually prepared in accounting — granular
          inputs, explicit locks, and clear voucher outputs — before go-live.
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-navy">
            Technical architecture
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Four views of the same design: data shape, end-to-end flow,
            cross-system sequence, and commission record states including the
            finance selection &quot;lock&quot;.
          </p>
        </div>

        <SettlementArchitectureDiagrams />
      </section>

      <footer className="border-t border-border pt-8">
        <Link
          href="/#technical-notes"
          className="text-sm text-[var(--accent-token)] hover:underline"
        >
          ← Technical notes on the home page
        </Link>
      </footer>
    </main>
  )
}
