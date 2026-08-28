import { SettlementArchitectureDiagrams } from "./SettlementArchitectureDiagrams"
import { FiArrowLeft } from "react-icons/fi"
import { FaLock } from "react-icons/fa"
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
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-12 lg:space-y-20">
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
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy dark:text-muted-foreground dark:hover:text-cream"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Technical notes</span>
        </Link>
      </div>

      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-mist/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground dark:bg-surface">
            <FaLock className="text-muted-foreground" aria-hidden />
            Confidential / NDA
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
          Flexible Financial Settlement Engine for Enterprise CRM
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground dark:text-muted-foreground md:text-lg">
          Lead Developer &amp; Technical BA (acting) — mid-project discovery,
          schema redesign, and a batch-based payout model aligned with real
          commission accounting.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-border bg-muted p-6 md:p-8">
          <div className="label-problem">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
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

        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="label-solution">
            Solution
          </div>
          <h2 className="text-xl font-bold text-navy md:text-2xl">
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

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground dark:text-muted-foreground md:text-lg">
          Reduced the risk of a disruptive post-launch financial refactor by
          matching how payouts are actually prepared in accounting — granular
          inputs, explicit locks, and clear voucher outputs — before go-live.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-muted-foreground dark:text-muted-foreground md:mx-0 md:text-base">
            Four views of the same design: data shape, end-to-end flow,
            cross-system sequence, and commission record states including the
            finance selection &quot;lock&quot;.
          </p>
        </div>

        <SettlementArchitectureDiagrams />
      </section>

      <footer className="border-t border-mist pt-10 text-center dark:border-mist/50">
        <Link
          href="/"
          className="text-sm font-medium text-navy hover:underline dark:text-mist"
        >
          ← Back to portfolio home
        </Link>
      </footer>
    </main>
  )
}
